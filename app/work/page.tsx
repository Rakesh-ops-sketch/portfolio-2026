"use client";

import Link from "next/link";
import { ArrowUpRight, CloudOff, Database, Smartphone } from "lucide-react";
import { motion } from "motion/react";
import { Reveal, WordReveal } from "@/components/motion-primitives";

const projects = [
  { number: "01", title: "Neev Assessments", kind: "National FLN platform", result: "100K+ assessments", icon: CloudOff, accent: "lime", copy: "Secure, offline-first assessment workflows for classrooms operating with intermittent connectivity." },
  { number: "02", title: "Field Operations", kind: "Deployment system", result: "Multi-state rollout", icon: Smartphone, accent: "blue", copy: "Tools and operational workflows that helped distributed teams deploy, verify, and support assessment programs." },
  { number: "03", title: "Data Infrastructure", kind: "Platform architecture", result: "Reliable reporting", icon: Database, accent: "amber", copy: "Backend services and data pipelines designed to turn field records into trustworthy program intelligence." },
];

export default function WorkPage() {
  return <div className="inner-page work-page">
    <section className="inner-hero page-wrap">
      <div className="section-kicker"><span>02</span> Selected work</div>
      <WordReveal className="inner-title" text="Systems built for consequential work." />
      <div className="inner-hero-foot"><p>A selection of platforms where reliability, coordination, and real-world outcomes mattered more than novelty.</p><span>2023—2026</span></div>
    </section>
    <section className="work-index page-wrap section-pad">
      {projects.map(({ number, title, kind, result, icon: Icon, accent, copy }, index) => (
        <Reveal key={title} delay={index * .05}>
          <motion.article className={`work-card work-card-${accent}`} whileHover="hover">
            <div className="work-card-head"><span>{number} / 03</span><span>{kind}</span></div>
            <div className="work-card-body">
              <motion.div className="work-icon" variants={{ hover: { rotate: 8, scale: 1.08 } }}><Icon /></motion.div>
              <div><h2>{title}</h2><p>{copy}</p></div>
              <div className="work-result"><span>OUTCOME</span><strong>{result}</strong></div>
              <motion.span className="circle-arrow" variants={{ hover: { rotate: 45 } }}><ArrowUpRight /></motion.span>
            </div>
          </motion.article>
        </Reveal>
      ))}
    </section>
    <section className="contact-strip"><Reveal className="page-wrap"><p>Want the deeper technical story?</p><a href="mailto:hsekar.bat@gmail.com">Let&apos;s discuss the work <ArrowUpRight /></a></Reveal></section>
  </div>;
}
