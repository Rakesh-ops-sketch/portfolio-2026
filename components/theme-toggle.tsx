"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";

/**
 * Fire eating: old theme overlay is MASKED by an SVG. The mask has
 * black circles that spawn at the edges and grow — so the overlay
 * is "eaten away" (transparent holes) revealing the new theme.
 * Irregular overlap = organic fire front.
 */
function fireBurn(oldColor: string, onSwap: () => void, onDone: () => void) {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const perimeter = 2 * (w + h);
  const numEmbers = 100;
  const maxR = Math.max(w, h) * 0.6;

  const container = document.createElement("div");
  container.style.cssText = `
    position: fixed;
    inset: 0;
    z-index: 9999;
    pointer-events: none;
  `;

  // Points along the four edges (where "fire" starts)
  const points: { x: number; y: number }[] = [];
  for (let i = 0; i < numEmbers; i++) {
    const t = (i / numEmbers) * perimeter + Math.random() * (perimeter / numEmbers);
    if (t < w) points.push({ x: t, y: 0 });
    else if (t < w + h) points.push({ x: w, y: t - w });
    else if (t < w * 2 + h) points.push({ x: w - (t - w - h), y: h });
    else points.push({ x: 0, y: h - (t - w * 2 - h) });
  }

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", String(w));
  svg.setAttribute("height", String(h));
  svg.setAttribute("id", "fire-mask-svg");
  svg.style.cssText = "position:absolute;inset:0;width:100%;height:100%;";

  // Mask: white = show overlay (old theme), black = hole (show new theme)
  const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
  const mask = document.createElementNS("http://www.w3.org/2000/svg", "mask");
  mask.setAttribute("id", "fire-mask");

  const whiteRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  whiteRect.setAttribute("width", String(w));
  whiteRect.setAttribute("height", String(h));
  whiteRect.setAttribute("fill", "white");
  mask.appendChild(whiteRect);

  const circles: SVGCircleElement[] = [];
  points.forEach((p) => {
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", String(p.x));
    circle.setAttribute("cy", String(p.y));
    circle.setAttribute("r", "0");
    circle.setAttribute("fill", "black");
    mask.appendChild(circle);
    circles.push(circle);
  });

  defs.appendChild(mask);
  svg.appendChild(defs);
  container.appendChild(svg);

  const overlay = document.createElement("div");
  overlay.style.cssText = `
    position: absolute;
    inset: 0;
    background: ${oldColor};
    mask: url(#fire-mask);
    -webkit-mask: url(#fire-mask);
    mask-size: ${w}px ${h}px;
    -webkit-mask-size: ${w}px ${h}px;
  `;
  container.appendChild(overlay);

  document.body.appendChild(container);

  requestAnimationFrame(() => onSwap());

  const animations: Animation[] = [];
  circles.forEach((circle, i) => {
    const r = maxR * (0.5 + Math.random() * 0.6);
    const duration = 1600 + Math.random() * 900;
    const delay = Math.random() * 500;
    const anim = circle.animate([{ r: 0 }, { r }], {
      duration,
      delay,
      easing: "cubic-bezier(0.15, 0.9, 0.5, 1)",
      fill: "forwards",
    });
    animations.push(anim);
  });

  const cleanup = () => {
    container.remove();
    onDone();
  };

  Promise.all(animations.map((a) => a.finished)).then(() => {
    overlay.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: 350,
      fill: "forwards",
    }).onfinish = cleanup;
  });

  return cleanup;
}

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [animating, setAnimating] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    // Function to apply theme based on system preference or stored value
    const applyTheme = (prefersDark: boolean) => {
      // If no stored preference, follow system
      const dark = stored === "dark" || stored === "light"
        ? stored === "dark"
        : prefersDark;
      setIsDark(dark);
      document.documentElement.classList.toggle("dark", dark);
    };

    // Initial theme application
    applyTheme(mediaQuery.matches);
    setMounted(true);

    // Listen for system theme changes (only if no stored preference)
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      const stored = localStorage.getItem("theme");
      // Only auto-switch if user hasn't manually set a preference
      if (!stored) {
        setIsDark(e.matches);
        document.documentElement.classList.toggle("dark", e.matches);
      }
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);
    return () => mediaQuery.removeEventListener("change", handleSystemThemeChange);
  }, []);

  const toggle = useCallback(() => {
    if (animating) return;
    setAnimating(true);

    const next = !isDark;
    const oldColor = isDark ? "oklch(0.145 0 0)" : "oklch(1 0 0)";

    fireBurn(
      oldColor,
      () => {
        setIsDark(next);
        document.documentElement.classList.toggle("dark", next);
        localStorage.setItem("theme", next ? "dark" : "light");
      },
      () => setAnimating(false)
    );
  }, [isDark, animating]);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" disabled>
        <Sun className="size-4" />
      </Button>
    );
  }

  return (
    <Button
      ref={buttonRef}
      variant="ghost"
      size="icon"
      onClick={toggle}
      disabled={animating}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </Button>
  );
}
