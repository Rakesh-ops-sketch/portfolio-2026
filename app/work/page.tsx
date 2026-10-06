import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Blocks, CheckCircle2, Code2, Gamepad2, GraduationCap, Presentation, Rocket, Users2 } from "lucide-react";
import { Reveal, WordReveal } from "@/components/motion-primitives";

const deliverySteps = [
  { number: "01", icon: Users2, title: "Align the room", copy: "Turn product goals, field constraints, and stakeholder expectations into a shared scope, milestones, ownership, and risks.", tags: ["Roadmaps", "Estimation", "Stakeholder alignment"] },
  { number: "02", icon: Code2, title: "Stay hands-on", copy: "Shape the architecture, review critical paths, unblock engineers, and code where technical depth has the highest leverage.", tags: ["Architecture", "Code reviews", "Implementation"] },
  { number: "03", icon: Presentation, title: "Make complexity visible", copy: "Use technical presentations, design walkthroughs, and operating dashboards to give teams a clear model of the system.", tags: ["Technical presentations", "Design reviews", "Demos"] },
  { number: "04", icon: Rocket, title: "Carry it through release", copy: "Work alongside QA, deployment, product, and field teams through validation, rollout, monitoring, and production response.", tags: ["QA partnership", "Deployment", "Release operations"] },
];

export const metadata = {
  title: "Work — Rakesh Biswal",
  description: "Selected platforms, learning products, interactive experiences, and engineering leadership work by Rakesh Biswal.",
};

export default function WorkPage() {
  return <div className="inner-page work-page work-page-detailed">
    <section className="work-detail-hero page-wrap">
      <div className="section-kicker"><span>02</span> Selected work</div>
      <WordReveal className="inner-title" text="Products, platforms, and teams built to move together." delay={0.08} eager />
      <div className="work-detail-hero-foot"><p>From offline assessment systems and real-time scoring infrastructure to an AI learning venture—my work connects product thinking, engineering depth, and dependable execution.</p><div><strong>2022—NOW</strong><span>PRODUCT · PLATFORM · PEOPLE</span></div></div>
    </section>

    <section className="work-featured-section"><div className="page-wrap section-pad">
      <div className="section-kicker section-kicker-dark"><span>01</span> Flagship systems</div>

      <Reveal className="work-feature work-feature-neev mt-10 md:mt-16">
        <div className="work-feature-top"><span>National FLN platform</span><b>01 / 03</b></div>
        <div className="work-feature-main"><div className="work-feature-copy"><p className="work-feature-role">Engineering Lead · Architecture & delivery</p><WordReveal as="h2" text="Ei Neev Assessments" /><p>An offline-first assessment platform built for government-backed education programs where weak connectivity, large rollouts, and field reliability are everyday constraints.</p><div className="work-feature-tags"><span>React Native</span><span>Realm</span><span>Go / Gin</span><span>S3</span><span>MongoDB</span></div></div><div className="work-feature-proof"><span>Reliability shift</span><strong>50–60% <i>→</i> 0</strong><p>Observed development-stage data loss reduced to zero in production validation.</p></div></div>
        <div className="work-feature-metrics"><div><strong>57K</strong><span>Assessments delivered</span></div><div><strong>27.5K</strong><span>Students supported</span></div><div><strong>4K</strong><span>Schools reached</span></div><div><strong>11</strong><span>Languages supported</span></div></div>
        <div className="work-feature-highlights"><p><CheckCircle2 />Resilient client sync, retry paths, autosave, and crash recovery</p><p><CheckCircle2 />React Native New Architecture, TurboModules, and C++ integrations</p><p><CheckCircle2 />QA-to-production pipelines across Bitbucket, Jenkins, and AWS</p></div>
      </Reveal>

      <Reveal className="work-feature work-feature-evaluation" delay={.06}>
        <div className="work-feature-top"><span>Real-time scoring infrastructure</span><b>02 / 03</b></div>
        <div className="work-feature-main"><div className="work-feature-copy"><p className="work-feature-role">Platform architecture · Live operations</p><WordReveal as="h2" text="Evaluator & Scoring Portal" /><p>A browser-first evaluator workspace where thousands of scoring events must remain fast, recoverable, and traceable through bursts and reconnects.</p><div className="work-feature-tags"><span>WebSockets</span><span>Persistent queues</span><span>Audit trails</span><span>AI-assisted scoring</span></div></div><div className="work-feature-proof"><span>Operating scale</span><strong>1K–2K</strong><p>Evaluators scoring concurrently without interrupting active operations.</p></div></div>
        <div className="work-feature-metrics work-feature-metrics-three"><div><strong>51,773</strong><span>Assessments scored</span></div><div><strong>515,289</strong><span>Subtests completed</span></div><div><strong>20,455</strong><span>Students represented</span></div></div>
        <div className="work-feature-highlights"><p><CheckCircle2 />Persistent browser queues with controlled inactivity-based flushing</p><p><CheckCircle2 />Versioned scores, scrutiny controls, and evaluator audit history</p><p><CheckCircle2 />Sarvam, Gemini Flash, and in-house model integrations</p></div>
      </Reveal>

      <Reveal className="work-feature work-feature-etalk" delay={.06}>
        <div className="work-feature-top"><span>AI English-learning venture</span><b>03 / 03</b></div>
        <div className="work-etalk-grid"><div className="work-feature-copy"><p className="work-feature-role">CTO · Product & engineering</p><WordReveal as="h2" text="E‑Talk" /><p>An Odisha-first English-learning product spanning a Next.js launch experience, Flutter learner app, Node/TypeScript services, MongoDB, and a custom content operations platform.</p><div className="work-feature-tags"><span>Flutter</span><span>Next.js</span><span>Node / Express</span><span>MongoDB</span><span>Google Cloud</span></div><Link href="https://www.e-talk.in/en" target="_blank" rel="noreferrer" className="work-external-link">Visit E‑Talk <ArrowUpRight /></Link></div><div className="work-etalk-image"><Image src="/work/etalk-cms-redacted.png" alt="Redacted E-Talk content generation CMS showing batch progress and recovery states." width={1664} height={928} /><span>Proprietary lesson content anonymized</span></div></div>
        <div className="work-feature-metrics"><div><strong>138</strong><span>Canonical topics</span></div><div><strong>12</strong><span>Learner goals</span></div><div><strong>60–70</strong><span>Topics per roadmap</span></div><div><strong>A1–B2</strong><span>CEFR progression</span></div></div>
        <div className="work-feature-highlights"><p><CheckCircle2 />Batch AI generation designed to control cost at catalogue scale</p><p><CheckCircle2 />Asset-level retries preserve successful output when one item fails</p><p><CheckCircle2 />CMS workflows for planning, generation, review, approval, and repair</p></div>
      </Reveal>
    </div></section>

    <section className="work-craft-section"><div className="page-wrap section-pad">
      <div className="section-kicker"><span>02</span> Interactive craft</div>
      <div className="work-craft-heading mt-10 md:mt-16"><WordReveal as="h2" className="display-heading" text="Learning experiences made to be played, not just consumed." /><p>Before leading larger platforms, I built the interaction layer directly—turning educational goals into responsive, understandable, and rewarding experiences.</p></div>
      <div className="work-craft-grid">
        <Reveal className="work-craft-card"><div className="work-craft-icon"><Blocks /></div><span>Browser-based learning</span><h3>HTML5 interactive educational games</h3><p>Built curriculum-aligned interactions that translate learning objectives into clear mechanics, immediate feedback, and experiences that work reliably across classroom devices.</p><ul><li>Interaction and state logic</li><li>Responsive browser delivery</li><li>Accessible learner feedback</li><li>Education-first game mechanics</li></ul></Reveal>
        <Reveal className="work-craft-card work-craft-card-dark" delay={.06}><div className="work-craft-icon"><Gamepad2 /></div><span>Game development</span><h3>Unity 2D learning games</h3><p>Created 2D game experiences where visual systems, progression, input, and feedback support learning without allowing the game layer to overwhelm the objective.</p><ul><li>Gameplay loops and progression</li><li>2D scenes and interaction systems</li><li>Performance-conscious implementation</li><li>Testing and iterative refinement</li></ul></Reveal>
      </div>
    </div></section>

    <section className="work-leadership-section"><div className="page-wrap section-pad">
      <div className="section-kicker section-kicker-dark"><span>03</span> How I lead delivery</div>
      <div className="work-leadership-heading mt-10 md:mt-16"><WordReveal as="h2" className="display-heading" text="From the first plan to the production handoff." /><p>Leadership stays useful when it creates clarity and remains close enough to the work to resolve real constraints.</p></div>
      <div className="work-delivery-flow">{deliverySteps.map(({ number, icon: Icon, title, copy, tags }, index) => <Reveal key={title} className="work-delivery-step" delay={index * .05}><div className="work-delivery-step-head"><span>{number}</span><Icon /></div><h3>{title}</h3><p>{copy}</p><div>{tags.map(tag => <small key={tag}>{tag}</small>)}</div>{index < deliverySteps.length - 1 && <ArrowRight className="work-delivery-arrow" aria-hidden="true" />}</Reveal>)}</div>
      <Reveal className="work-collaboration-strip"><div><GraduationCap /><span>Product & domain</span></div><b>↔</b><div><Code2 /><span>Engineering</span></div><b>↔</b><div><CheckCircle2 /><span>QA</span></div><b>↔</b><div><Rocket /><span>Deployment & field teams</span></div></Reveal>
    </div></section>

    <section className="contact-strip"><Reveal className="page-wrap"><WordReveal as="p" text="Want the deeper technical story?" /><a href="mailto:hsekar.bat@gmail.com">Let&apos;s discuss the work <ArrowUpRight /></a></Reveal></section>
  </div>;
}
