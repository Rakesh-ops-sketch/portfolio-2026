"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "motion/react";
import { useReducedMotion } from "@/lib/use-reduced-motion";

type Metric = { value: string; label: string };

function CountValue({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: .75 });
  const reduceMotion = useReducedMotion();
  const numeric = Number(value.replace(/[^0-9.]/g, ""));
  const decimals = value.includes(".") ? value.split(".")[1].replace(/\D/g, "").length : 0;
  const suffix = value.replace(/[0-9.,]/g, "");
  const usesGrouping = value.includes(",");
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setCurrent(numeric);
      return;
    }
    const controls = animate(0, numeric, {
      duration: numeric > 10000 ? 1.9 : 1.35,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: setCurrent,
    });
    return () => controls.stop();
  }, [inView, numeric, reduceMotion]);

  const formatted = current.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping: usesGrouping,
  });

  return <span ref={ref}>{formatted}{suffix}</span>;
}

export function AnimatedCaseMetrics({ metrics, className, itemClassName }: { metrics: Metric[]; className: string; itemClassName: string }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: .25 }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: .09 } } }}
    >
      {metrics.map((metric) => (
        <motion.div
          key={metric.label}
          className={itemClassName}
          variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: .65, ease: [0.16, 1, 0.3, 1] }}
        >
          <strong><CountValue value={metric.value} /></strong><span>{metric.label}</span>
        </motion.div>
      ))}
    </motion.div>
  );
}
