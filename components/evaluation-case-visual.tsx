"use client";

import { Clock3, Database, Monitor, Radio, RefreshCw, Server, Waypoints } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

function Connector({ bidirectional = false }: { bidirectional?: boolean }) {
  const reduceMotion = useReducedMotion();

  if (bidirectional) {
    return (
      <div className="ws-connector ws-duplex" aria-label="Full duplex WebSocket connection">
        <div className="ws-duplex-lane ws-duplex-send">
          <span>events</span><b>→</b>
          {!reduceMotion && <motion.i className="ws-pulse-desktop" animate={{ left: ["0%", "100%"], opacity: [0, 1, 1, 0] }} transition={{ duration: 1.55, repeat: Infinity, ease: "linear", repeatDelay: .25 }} />}
          {!reduceMotion && <motion.i className="ws-pulse-mobile" animate={{ top: ["0%", "100%"], opacity: [0, 1, 1, 0] }} transition={{ duration: 1.55, repeat: Infinity, ease: "linear", repeatDelay: .25 }} />}
        </div>
        <div className="ws-duplex-lane ws-duplex-return">
          <span>ack / broadcast</span><b>←</b>
          {!reduceMotion && <motion.i className="ws-pulse-desktop" animate={{ right: ["0%", "100%"], opacity: [0, 1, 1, 0] }} transition={{ duration: 1.55, repeat: Infinity, ease: "linear", delay: .55, repeatDelay: .25 }} />}
          {!reduceMotion && <motion.i className="ws-pulse-mobile" animate={{ bottom: ["0%", "100%"], opacity: [0, 1, 1, 0] }} transition={{ duration: 1.55, repeat: Infinity, ease: "linear", delay: .55, repeatDelay: .25 }} />}
        </div>
      </div>
    );
  }

  return (
    <div className="ws-connector" aria-hidden="true">
      <span>→</span>
      {!reduceMotion && <motion.i animate={{ left: ["0%", "100%"], opacity: [0, 1, 1, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "linear", repeatDelay: .35 }} />}
    </div>
  );
}

export function EvaluationCaseVisual() {
  const reduceMotion = useReducedMotion();
  const reveal = (index: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: .55 },
    transition: { duration: .55, delay: index * .08, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  });

  return (
    <div className="ws-architecture" aria-label="Browser scoring events are classified as isolated or burst activity. Isolated events send immediately; bursts enter a persistent queue that flushes after five seconds of inactivity. A reconnecting WebSocket client sends data to the WebSocket server and receives acknowledgements before scoring and audit persistence.">
      <div className="ws-architecture-head"><span>WebSocket scoring architecture</span><strong><i /> Connection active</strong></div>

      <div className="ws-flow">
        <motion.div className="ws-node ws-events-node" {...reveal(0)}>
          <span className="ws-node-icon"><Monitor /></span><small>Browser</small><strong>User events</strong>
          <p>Score · rubric · evidence</p>
        </motion.div>
        <Connector />

        <motion.div className="ws-node ws-dispatch-node" {...reveal(1)}>
          <span className="ws-node-icon"><Waypoints /></span><small>Event controller</small><strong>Burst detection</strong>
          <div className="ws-lanes"><span><b>Isolated</b> Send now</span><span><b>Burst</b> Form queue</span></div>
        </motion.div>
        <Connector />

        <motion.div className="ws-node ws-queue-node" {...reveal(2)}>
          <span className="ws-node-icon"><Clock3 /></span><small>Delivery buffer</small><strong>Persistent queue</strong>
          <p>Flush after 5s inactivity</p>
          <span className="ws-retry"><RefreshCw /> Retry enabled</span>
        </motion.div>
        <Connector />

        <motion.div className="ws-node ws-client-node" {...reveal(3)}>
          <span className="ws-node-icon"><Radio /></span><small>Browser transport</small><strong>WebSocket client</strong>
          <p>Reconnect · broadcast</p>
        </motion.div>
        <Connector bidirectional />

        <motion.div className="ws-node ws-server-node" {...reveal(4)}>
          <span className="ws-node-icon"><Server /></span><small>Backend</small><strong>WebSocket server</strong>
          <p>Receive · validate · acknowledge</p>
        </motion.div>
      </div>

      <motion.div className="ws-persistence" {...reveal(5)}>
        <Database /><span><small>Scoring persistence</small><strong>Versioned scores · activity history · audit trail</strong></span>
      </motion.div>
    </div>
  );
}
