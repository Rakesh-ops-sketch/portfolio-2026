"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ClipboardList,
  Gamepad2,
  GitBranch,
  Kanban,
  Layers,
  Rocket,
  Smartphone,
  Users,
  WifiOff,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const STAGGER_MS = 70;
const TILT_MAX = 12;

const ITEMS: {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  countUp?: { end: number; format: (n: number) => string };
}[] = [
  {
    icon: Users,
    title: "3+ years lead",
    subtitle: "Cross-functional teams",
    countUp: { end: 3, format: (n) => `${Math.round(n)}+` },
  },
  {
    icon: Layers,
    title: "100K+",
    subtitle: "Assessments",
    countUp: { end: 100, format: (n) => `${Math.round(n)}K+` },
  },
  {
    icon: WifiOff,
    title: "Offline-first",
    subtitle: "Low-connectivity",
  },
  {
    icon: Smartphone,
    title: "Mobile apps",
    subtitle: "Native & cross-platform",
  },
  {
    icon: GitBranch,
    title: "End-to-end",
    subtitle: "Full dev cycle",
  },
  {
    icon: ClipboardList,
    title: "Planning",
    subtitle: "Roadmaps & scope",
  },
  {
    icon: Kanban,
    title: "Agile",
    subtitle: "Leadership",
  },
  {
    icon: Gamepad2,
    title: "Games",
    subtitle: "HTML5 & WebGL",
  },
];

function useCountUp(visible: boolean, end: number, durationMs: number) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!visible) return;
    let start: number | null = null;
    const step = (t: number) => {
      if (start === null) start = t;
      const elapsed = t - start;
      const progress = Math.min(elapsed / durationMs, 1);
      const eased = 1 - (1 - progress) ** 2;
      setValue(end * eased);
      if (progress < 1) requestAnimationFrame(step);
    };
    const id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, [visible, end, durationMs]);
  return value;
}

export function ImpactSnapshotCard() {
  const ref = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [reduceMotion, setReduceMotion] = useState(false);

  const count0 = useCountUp(visible, 3, 1000);
  const count1 = useCountUp(visible, 100, 1400);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setVisible(true);
      },
      { threshold: 0.2, rootMargin: "0px 0px -20px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const handler = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reduceMotion) return;
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setTilt({
        x: -y * TILT_MAX,
        y: x * TILT_MAX,
      });
    },
    [reduceMotion]
  );

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  const hasTilt = !reduceMotion && (tilt.x !== 0 || tilt.y !== 0);
  const showFloat = visible && !hasTilt && !reduceMotion;
  const tiltStyle =
    hasTilt
      ? {
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.02, 1.02, 1.02)`,
          boxShadow:
            "0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0,0,0,0.05)",
        }
      : undefined;

  return (
    <div ref={ref} className="w-full shrink-0 lg:w-96">
      <div
        className="impact-tilt-wrapper"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <Card
          ref={cardRef}
          className={`impact-tilt-card border-border/60 shadow-md transition-shadow duration-300 ${visible ? "impact-snapshot-card impact-visible shadow-lg" : "impact-snapshot-card"} ${showFloat ? "impact-float" : ""}`}
          style={tiltStyle}
        >
          <CardHeader className="pb-2 pt-4">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold">
            <Rocket className="size-3.5 text-muted-foreground" />
            Impact Snapshot
          </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-x-3 gap-y-2.5 pb-4 pt-0">
          {ITEMS.map((item, index) => {
            const Icon = item.icon;
            const delay = index * STAGGER_MS;
            return (
              <div
                key={item.title}
                className="impact-snapshot-item rounded-md transition-colors hover:bg-accent/30"
                style={{
                  animationDelay: `${delay}ms`,
                }}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="impact-snapshot-icon flex size-7 shrink-0 items-center justify-center rounded-md bg-accent"
                    style={{ animationDelay: `${delay}ms` }}
                  >
                    <Icon className="size-3.5 text-foreground" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground">
                      {item.countUp
                        ? index === 0
                          ? item.countUp.format(count0)
                          : item.countUp.format(count1)
                        : item.title}
                    </p>
                    <p className="text-xs leading-snug text-muted-foreground">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
