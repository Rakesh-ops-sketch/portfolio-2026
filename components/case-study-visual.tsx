"use client";

import { Archive, Database, RefreshCw, Server, Smartphone } from "lucide-react";
import { motion } from "motion/react";
import { useReducedMotion } from "@/lib/use-reduced-motion";

const stages = [
  { icon: Smartphone, label: "Assessment app", detail: "Field capture" },
  { icon: Database, label: "Local Realm", detail: "Offline storage" },
  { icon: RefreshCw, label: "Sync button", detail: "User-triggered" },
  { icon: Server, label: "Go / Gin API", detail: "Realm data upload" },
  { icon: Archive, label: "S3 backup", detail: "Data files" },
  { icon: Database, label: "MongoDB", detail: "Persistence attempt" },
];

export function CaseStudyVisual() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="system-flow" aria-label="Assessment data is stored in local Realm, then a user-triggered sync uploads it through Go and Gin APIs, creates S3 backup files, and attempts MongoDB persistence">
      <div className="system-flow-track" aria-hidden="true">
        {!reduceMotion && (
          <motion.span
            className="system-flow-pulse"
            animate={{ left: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: "linear", repeatDelay: 0.45 }}
          />
        )}
      </div>
      <div className="system-flow-track-mobile" aria-hidden="true">
        {!reduceMotion && (
          <motion.span
            className="system-flow-pulse-mobile"
            animate={{ top: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: "linear", repeatDelay: 0.45 }}
          />
        )}
      </div>

      <div className="system-flow-stages">
        {stages.map((stage, index) => {
          const Icon = stage.icon;
          return (
            <motion.div
              key={stage.label}
              className="system-stage"
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.55, delay: index * 0.09, ease: [0.16, 1, 0.3, 1] }}
              whileHover={reduceMotion ? undefined : { y: -5 }}
            >
              <span className="system-stage-icon"><Icon className="size-4" /></span>
              <span className="system-stage-copy">
                <strong>{stage.label}</strong>
                <small>{stage.detail}</small>
              </span>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        className="system-proof"
        initial={reduceMotion ? false : { opacity: 0, scale: .96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: .7, delay: .35, ease: [0.16, 1, 0.3, 1] }}
      >
        <span>Production validation</span>
        <strong>50–60% observed data loss <b>→</b> zero</strong>
      </motion.div>
    </div>
  );
}
