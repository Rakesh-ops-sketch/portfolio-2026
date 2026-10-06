"use client";

import { useState } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useReducedMotion } from "@/lib/use-reduced-motion";

const lines = [
  ["Software", "for", "demanding"],
  ["environments,", "built", "to", "endure."],
];

export function PremiumHeroHeadline() {
  const reduceMotion = useReducedMotion();
  const [isRevealed, setIsRevealed] = useState(Boolean(reduceMotion));
  let wordIndex = 0;
  const finalWordIndex = lines.flat().length - 1;
  const revealDelay = 0.28;

  return (
    <h1
      id="hero-title"
      className={`hero-title premium-hero-title${isRevealed ? " is-revealed" : ""}`}
      aria-label="Software for demanding environments, built to endure."
    >
      {lines.map((line, lineIndex) => (
        <span className="premium-hero-line" aria-hidden="true" key={lineIndex}>
          {line.map((word) => {
            const index = wordIndex++;
            return (
              <span className="premium-word-mask" key={word}>
                <motion.span
                  className={word === "endure." ? "premium-word premium-word-accent" : "premium-word"}
                  initial={reduceMotion ? false : { opacity: 0, y: "108%", rotate: 2.2 }}
                  animate={{ opacity: 1, y: "0%", rotate: 0 }}
                  transition={{
                    duration: 1.18,
                    delay: revealDelay + index * 0.14,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  onAnimationComplete={() => {
                    if (index === finalWordIndex) setIsRevealed(true);
                  }}
                >
                  {word}
                </motion.span>
              </span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}

export function PremiumHeroAmbient() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.22], [0, reduceMotion ? 0 : 95]);
  const rotate = useTransform(scrollYProgress, [0, 0.22], [0, reduceMotion ? 0 : 11]);
  const counterRotate = useTransform(rotate, value => -value * 0.65);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0.72, 0.08]);

  return (
    <div className="premium-ambient" aria-hidden="true">
      <motion.div className="premium-ambient-orb" style={{ y, rotate, opacity }} />
      <motion.div className="premium-ambient-ring premium-ambient-ring-one" style={{ y, rotate }} />
      <motion.div className="premium-ambient-ring premium-ambient-ring-two" style={{ y, rotate: counterRotate }} />
    </div>
  );
}

export function PremiumHeroActions() {
  return (
    <motion.div
      className="mt-8 flex flex-wrap justify-center gap-3"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 1.72, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.a href="/work" className="button-lime" whileHover={{ y: -3, scale: 1.015 }} whileTap={{ scale: 0.97 }}>
        Explore my work <ArrowDown className="size-4" />
      </motion.a>
      <motion.a href="mailto:hsekar.bat@gmail.com" className="button-ghost-dark" whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
        Let&apos;s talk <ArrowUpRight className="size-4" />
      </motion.a>
    </motion.div>
  );
}
