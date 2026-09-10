"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";

const motionHeadings = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
};

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

export function WordReveal({
  text,
  className = "",
  as = "h1",
  delay = 0,
  amount = 0.35,
  eager = false,
}: {
  text: string;
  className?: string;
  as?: keyof typeof motionHeadings;
  delay?: number;
  amount?: number;
  eager?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const MotionHeading = motionHeadings[as];
  const [revealComplete, setRevealComplete] = useState(false);
  const words = text.split(" ");

  return (
    <MotionHeading
      className={`staggered-text${revealComplete ? " is-revealed" : ""} ${className}`}
      aria-label={text}
      initial="hidden"
      animate={eager ? "visible" : undefined}
      whileInView={eager ? undefined : "visible"}
      viewport={eager ? undefined : { once: true, amount }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren: reduceMotion ? 0 : delay,
            staggerChildren: reduceMotion ? 0 : 0.115,
          },
        },
      }}
    >
      {words.map((word, index) => (
        <span
          className={`motion-word-mask${eager ? " eager-word-mask" : ""}`}
          aria-hidden="true"
          key={`${word}-${index}`}
          style={eager ? { animationDelay: `${delay + index * 0.115 + 1.05}s` } : undefined}
        >
          {eager ? (
            <span
              className="eager-reveal-word"
              style={{ animationDelay: `${delay + index * 0.115}s` }}
            >{word}</span>
          ) : (
            <motion.span
              variants={{
                hidden: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: "112%", rotate: 2 },
                visible: { opacity: 1, y: 0, rotate: 0 },
              }}
              transition={{ duration: reduceMotion ? 0 : 1.05, ease: [0.16, 1, 0.3, 1] }}
              onAnimationComplete={() => {
                if (index === words.length - 1) setRevealComplete(true);
              }}
            >{word}</motion.span>
          )}
        </span>
      ))}
    </MotionHeading>
  );
}
