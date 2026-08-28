"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

export function PortfolioMotion() {
  const reduceMotion = useReducedMotion();
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealItems = [...document.querySelectorAll<HTMLElement>("[data-reveal]")];
    const textItems = [...document.querySelectorAll<HTMLElement>(
      ".display-heading, .evaluation-case-intro h2, .capability-card h3, .experience-role h3, .contact-section h2",
    )];

    const introTimer = window.setTimeout(() => {
      document.documentElement.dataset.intro = "complete";
      setShowIntro(false);
    }, reduced ? 0 : 1050);

    if (reduced) {
      revealItems.forEach((item) => item.dataset.visible = "true");
      textItems.forEach((item) => item.classList.add("premium-text-reveal", "is-visible"));
    } else {
      textItems.forEach((item) => item.classList.add("premium-text-reveal"));
    }

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).dataset.visible = "true";
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.14, rootMargin: "0px 0px -8%" },
    );
    revealItems.forEach((item) => observer.observe(item));

    const textObserver = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          textObserver.unobserve(entry.target);
        }
      }),
      { threshold: .18, rootMargin: "0px 0px -5%" },
    );
    if (!reduced) textItems.forEach((item) => textObserver.observe(item));

    let frame = 0;
    const updateScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - innerHeight;
        root.style.setProperty("--scroll-progress", `${max > 0 ? scrollY / max : 0}`);
        root.style.setProperty("--hero-shift", `${Math.min(scrollY * 0.14, 110)}px`);
      });
    };
    const updatePointer = (event: PointerEvent) => {
      root.style.setProperty("--pointer-x", `${event.clientX}px`);
      root.style.setProperty("--pointer-y", `${event.clientY}px`);
    };
    const createRipple = (event: PointerEvent) => {
      const target = (event.target as HTMLElement).closest<HTMLElement>(
        ".button-lime, .button-ghost-dark, .circle-arrow, .text-link, .site-nav-link, .capabilities-playground",
      );
      if (!target || reduced) return;
      const rect = target.getBoundingClientRect();
      const ripple = document.createElement("span");
      ripple.className = "premium-click-ripple";
      const size = Math.max(rect.width, rect.height) * 1.7;
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${event.clientY - rect.top - size / 2}px`;
      target.appendChild(ripple);
      ripple.addEventListener("animationend", () => ripple.remove(), { once: true });
    };

    updateScroll();
    addEventListener("scroll", updateScroll, { passive: true });
    addEventListener("pointermove", updatePointer, { passive: true });
    document.addEventListener("pointerdown", createRipple);
    return () => {
      observer.disconnect();
      textObserver.disconnect();
      clearTimeout(introTimer);
      cancelAnimationFrame(frame);
      removeEventListener("scroll", updateScroll);
      removeEventListener("pointermove", updatePointer);
      document.removeEventListener("pointerdown", createRipple);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {showIntro && (
          <motion.div
            className="page-intro-curtain page-intro-trace"
            initial={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
            animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
            exit={{
              opacity: 0,
              filter: "blur(16px)",
              scale: 1.025,
              transition: { duration: reduceMotion ? 0 : .85, ease: [0.76, 0, 0.24, 1] },
            }}
            transition={{ duration: reduceMotion ? 0 : .2 }}
          >
            <motion.svg className="page-intro-trace-svg" viewBox="0 0 1000 400" preserveAspectRatio="none" aria-hidden="true">
              <motion.path
                d="M -40 270 C 150 28, 315 360, 505 188 S 810 22, 1040 218"
                initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: reduceMotion ? 0 : 1.05, ease: [0.65, 0, 0.35, 1] }}
              />
              <motion.path
                className="page-intro-trace-echo"
                d="M -40 294 C 170 54, 330 382, 520 212 S 825 48, 1040 242"
                initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: .18 }}
                transition={{ duration: reduceMotion ? 0 : 1.15, delay: .08, ease: [0.65, 0, 0.35, 1] }}
              />
            </motion.svg>
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: .98 }}
              transition={{ duration: reduceMotion ? 0 : .65, delay: .22, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="page-intro-monogram">RB</span><i /><small>Designing dependable systems</small>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        className="premium-ambient-canvas"
        aria-hidden="true"
        animate={reduceMotion ? undefined : { rotate: [0, 3, 0], scale: [1, 1.035, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="premium-pointer-light" aria-hidden="true" />
      <div className="scroll-progress" aria-hidden="true" />
    </>
  );
}
