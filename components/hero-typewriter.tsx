"use client";

import { useEffect, useState } from "react";

const PHRASES = [
  "Rakesh Biswal",
  "Full-stack engineer",
  "Frontend specialist",
];

const TYPE_MS = 90;
const PAUSE_MS = 2200;
const DELETE_MS = 50;

export function HeroTypewriter() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [display, setDisplay] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const handler = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;

    const phrase = PHRASES[phraseIndex];
    const isAtEnd = !isDeleting && display.length === phrase.length;
    const isAtStart = isDeleting && display.length === 0;

    if (isAtEnd) {
      const id = setTimeout(() => setIsDeleting(true), PAUSE_MS);
      return () => clearTimeout(id);
    }

    if (isAtStart) {
      setIsDeleting(false);
      setPhraseIndex((i) => (i + 1) % PHRASES.length);
      return;
    }

    const timeout = setTimeout(
      () => {
        setDisplay((prev) =>
          isDeleting ? phrase.slice(0, prev.length - 1) : phrase.slice(0, prev.length + 1)
        );
      },
      isDeleting ? DELETE_MS : TYPE_MS
    );

    return () => clearTimeout(timeout);
  }, [phraseIndex, display, isDeleting, reduceMotion]);

  if (reduceMotion) {
    return <span className="hero-typewriter-gradient">{PHRASES[0]}</span>;
  }

  return (
    <span className="inline-block min-h-[1.2em]">
      <span className="text-muted-foreground">I&apos;m </span>
      <span className="hero-typewriter-gradient">{display}</span>
      <span
        className="hero-typewriter-cursor ml-0.5 inline-block h-[0.9em] w-0.5 animate-cursor-blink align-middle"
        aria-hidden
      />
    </span>
  );
}
