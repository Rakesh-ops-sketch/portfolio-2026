"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

type Drop = { x: number; y: number; vx: number; vy: number; life: number };

/** A spring surface responds to scroll impulses and settles at rest. */
export function NavWater() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const points = Array.from({ length: 25 }, () => ({ offset: 0, velocity: 0 }));
    let drops: Drop[] = [];
    let width = 0, height = 0, target = 0, level = 0, speed = 0;
    let frame = 0, previous = 0, lastSplash = 0;
    let dark = document.documentElement.classList.contains("dark");

    const measure = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const ratio = Math.min(devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      update();
    };
    const update = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      target = max > 0 ? Math.max(0, Math.min(1, scrollY / max)) : 0;
      wake();
    };
    const draw = (time: number) => {
      frame = 0;
      const dt = Math.min((time - previous) / 16.667 || 1, 2);
      previous = time;
      const before = level;
      level = reduced.matches ? target : level + (target - level) * (1 - Math.pow(.83, dt));
      speed = (level - before) * width / dt;
      const impulse = Math.max(-12, Math.min(12, speed));
      const edge = level * width;
      const boundary = Math.min(1, edge / 25, (width - edge) / 25);
      const offsets = points.map(p => p.offset);
      points.forEach((p, i) => {
        if (reduced.matches) { p.offset = p.velocity = 0; return; }
        const neighbor = (offsets[Math.max(0, i - 1)] + offsets[Math.min(points.length - 1, i + 1)]) / 2;
        // Couple neighboring points into broad rolling swells with a smaller trailing ripple.
        const swell = Math.sin(i * .26 + time * .002);
        const ripple = Math.sin(i * .52 - time * .0028) * .2;
        p.velocity += ((neighbor - p.offset) * .3 - p.offset * .018 + impulse * (swell + ripple) * .028) * dt;
        p.velocity *= Math.pow(.94, dt);
        p.offset += p.velocity * dt;
      });
      if (!reduced.matches && Math.abs(speed) > 2 && boundary > .8 && time - lastSplash > 65) {
        lastSplash = time;
        const y = height * (.2 + Math.random() * .6);
        drops.push({ x: edge, y, vx: Math.sign(speed) * (1 + Math.random() * 3), vy: -1 - Math.random() * 2, life: 1 });
      }
      ctx.clearRect(0, 0, width, height);
      const surface = points.map((p, i) => ({ x: edge + 12 * Math.tanh(p.offset / 12) * boundary, y: i * height / (points.length - 1) }));
      const trace = () => {
        ctx.moveTo(surface[0].x, 0);
        for (let i = 1; i < surface.length - 1; i++) {
          const p = surface[i], next = surface[i + 1];
          ctx.quadraticCurveTo(p.x, p.y, (p.x + next.x) / 2, (p.y + next.y) / 2);
        }
        ctx.lineTo(surface[surface.length - 1].x, height);
      };
      if (edge > .1) {
        ctx.beginPath();
        trace();
        ctx.lineTo(0, height);
        ctx.lineTo(0, 0);
        ctx.closePath();
        const water = ctx.createLinearGradient(0, 0, 0, height);
        water.addColorStop(0, dark ? "rgba(180,203,206,.045)" : "rgba(156,181,185,.035)");
        water.addColorStop(.5, dark ? "rgba(133,170,177,.065)" : "rgba(131,165,174,.065)");
        water.addColorStop(1, dark ? "rgba(172,202,206,.10)" : "rgba(148,179,185,.10)");
        ctx.fillStyle = water; ctx.fill();
        ctx.save(); ctx.clip();
        // Broad reflected ribbons bend with the surface's residual energy.
        for (let j = 0; j < 2; j++) {
          ctx.beginPath();
          for (let x = 0; x <= edge + 25; x += 8) {
            const y = height * (.25 + j * .5) + Math.sin(x * .018 + j * 2 + points[10].offset * .06) * 2;
            if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
          }
          ctx.strokeStyle = dark ? "rgba(211,227,230,.055)" : "rgba(255,255,255,.14)";
          ctx.lineWidth = .75; ctx.stroke();
        }
        ctx.restore();
        if (target < 1 || Math.abs(target - level) > .001) {
          ctx.beginPath(); trace(); ctx.strokeStyle = dark ? "rgba(207,229,234,.28)" : "rgba(255,255,255,.48)";
          ctx.lineWidth = 1; ctx.shadowColor = "rgba(174,202,209,.15)"; ctx.shadowBlur = 3; ctx.stroke(); ctx.shadowBlur = 0;
        }
      }
      drops = drops.filter(d => d.life > 0);
      for (const d of drops) {
        d.x += d.vx * dt; d.y += d.vy * dt; d.vy += .12 * dt; d.life -= .025 * dt;
        ctx.beginPath(); ctx.ellipse(d.x, d.y, 1.4, 2.3, -.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${dark ? "173,231,242" : "72,164,187"},${d.life * .65})`; ctx.fill();
      }
      const moving = Math.abs(target - level) > .00005 || points.some(p => Math.abs(p.velocity) + Math.abs(p.offset) > .03) || drops.length > 0;
      if (moving && !reduced.matches) frame = requestAnimationFrame(draw);
    };
    function wake() {
      if (!frame) { previous = performance.now(); frame = requestAnimationFrame(draw); }
    }
    const observer = new ResizeObserver(measure);
    observer.observe(canvas);
    const bodyObserver = new ResizeObserver(update);
    bodyObserver.observe(document.body);
    const themeObserver = new MutationObserver(() => { dark = document.documentElement.classList.contains("dark"); wake(); });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    measure(); level = target;
    addEventListener("scroll", update, { passive: true });
    addEventListener("resize", measure);
    reduced.addEventListener("change", wake);
    return () => {
      cancelAnimationFrame(frame); observer.disconnect(); bodyObserver.disconnect(); themeObserver.disconnect();
      removeEventListener("scroll", update); removeEventListener("resize", measure); reduced.removeEventListener("change", wake);
    };
  }, [pathname]);

  return <canvas ref={canvasRef} className="site-header-water" aria-hidden="true" />;
}
