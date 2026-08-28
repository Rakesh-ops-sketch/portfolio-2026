"use client";

import Link from "next/link";
import { ArrowUpRight, Copy, Mail } from "lucide-react";
import { motion } from "motion/react";
import { WordReveal } from "@/components/motion-primitives";

export default function ContactPage() {
  const email = "hsekar.bat@gmail.com";
  return <div className="contact-page">
    <section className="page-wrap contact-page-inner">
      <div className="section-kicker section-kicker-dark"><span>04</span> Contact</div>
      <WordReveal className="contact-title" text="Good work starts with an honest conversation." />
      <p className="contact-lede">If you&apos;re building a serious product, untangling a difficult system, or assembling a team around meaningful work, I&apos;d like to hear about it.</p>
      <motion.a href={`mailto:${email}`} className="contact-email" whileHover={{ x: 10 }} whileTap={{ scale: .98 }}>
        <span><Mail /> Email me</span><strong>{email}</strong><ArrowUpRight />
      </motion.a>
      <div className="contact-socials"><span>ELSEWHERE</span><Link href="https://github.com/Rakesh-ops-sketch" target="_blank">GitHub ↗</Link><Link href="https://www.linkedin.com/in/lucifermsloh/" target="_blank">LinkedIn ↗</Link></div>
    </section>
  </div>;
}
