"use client";

import { motion, useReducedMotion } from "motion/react";

export function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 42 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function WordReveal({ text, className = "" }: { text: string; className?: string }) {
  const reduceMotion = useReducedMotion();
  return (
    <h1 className={className} aria-label={text}>
      {text.split(" ").map((word, index) => (
        <span className="motion-word-mask" aria-hidden="true" key={`${word}-${index}`}>
          <motion.span
            initial={reduceMotion ? false : { y: "115%", rotate: 2 }}
            animate={{ y: 0, rotate: 0 }}
            transition={{ duration: 0.9, delay: 0.06 * index, ease: [0.16, 1, 0.3, 1] }}
          >{word}&nbsp;</motion.span>
        </span>
      ))}
    </h1>
  );
}
