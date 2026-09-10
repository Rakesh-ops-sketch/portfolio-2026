"use client";

import { useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";

export function PortfolioMotion() {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealItems = [...document.querySelectorAll<HTMLElement>("[data-reveal]")];
    const textItems = [...document.querySelectorAll<HTMLElement>(
      ".display-heading, .evaluation-case-intro h2, .capability-card h3, .experience-role h3, .contact-section h2",
    )];

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
      cancelAnimationFrame(frame);
      removeEventListener("scroll", updateScroll);
      removeEventListener("pointermove", updatePointer);
      document.removeEventListener("pointerdown", createRipple);
    };
  }, []);

  return (
    <>
      <motion.div
        className="premium-ambient-canvas"
        aria-hidden="true"
        animate={reduceMotion ? undefined : { rotate: [0, 3, 0], scale: [1, 1.035, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="premium-pointer-light" aria-hidden="true" />
    </>
  );
}
