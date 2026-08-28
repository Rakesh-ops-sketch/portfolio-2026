"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

export function CaseStudyAtmosphere({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -150]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 18]);

  return (
    <div className={`case-atmosphere case-atmosphere-${tone}`} aria-hidden="true">
      <motion.span className="case-atmosphere-orb" style={{ y }} />
      <motion.span className="case-atmosphere-ring" style={{ y, rotate }} />
    </div>
  );
}

export function CaseStudyReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right";
}) {
  const reduceMotion = useReducedMotion();
  const offset = direction === "left" ? { x: -34, y: 0 } : direction === "right" ? { x: 34, y: 0 } : { x: 0, y: 34 };

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: .78, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
