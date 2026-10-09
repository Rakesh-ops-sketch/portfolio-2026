"use client";

import { useEffect, useState } from "react";
import { useReducedMotionConfig as useFramerReducedMotion } from "motion/react";

/**
 * Framer Motion's `useReducedMotion` reads `matchMedia` synchronously on the
 * client but always returns `null` during SSR. For visitors with reduced
 * motion enabled, that mismatch (SSR renders motion-on, client renders
 * motion-off on the very first paint) triggers a hydration error. Deferring
 * to the real value until after mount keeps the first client render
 * identical to the server-rendered HTML.
 */
export function useReducedMotion() {
  const prefersReducedMotion = useFramerReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return mounted && Boolean(prefersReducedMotion);
}
