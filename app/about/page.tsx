import Image from "next/image";
import { ArrowUpRight, Code2, Layers3, MapPin, Rocket, Users2 } from "lucide-react";
import { Reveal, WordReveal } from "@/components/motion-primitives";

const values = [
  ["01", "Field reality first", "The best architecture starts with the people, devices, and constraints it must serve."],
  ["02", "Clarity compounds", "Clear decisions, ownership, and feedback loops help teams move quickly without creating chaos."],
  ["03", "Reliability is a feature", "Offline behavior, recovery paths, and observability deserve the same care as the visible interface."],
];

const careerChapters = [
  {
    period: "2022 — 2023",
    role: "HTML5 Interactive Developer",
    company: "Educational Initiatives",
    icon: Code2,
    chapter: "Foundation",
    headline: "Learning to build through interaction.",
    summary: "Started with browser-based educational experiences, translating learning objectives into responsive interactions, state-driven behavior, and clear learner feedback.",
    responsibilities: ["HTML5 educational games", "Interactive learning flows", "Cross-device behavior", "Iteration with content and QA teams"],
    growth: "Built the product instincts and implementation discipline that later expanded into mobile, backend, and platform ownership.",
  },
  {
    period: "2023 — 2024",
    role: "Lead Developer",
    company: "Educational Initiatives",
    icon: Layers3,
    chapter: "System ownership",
    headline: "From individual experiences to connected products.",
    summary: "Moved beyond the interaction layer to own full-stack delivery across mobile applications, backend services, quality workflows, and releases for offline-first assessment products.",
    responsibilities: ["React Native delivery", "Go/Gin backend services", "Offline sync and recovery", "Release and production support"],
    growth: "Shifted from feature execution to reasoning about reliability, data integrity, architecture, and the full lifecycle of a field product.",
  },
  {
    period: "2024 — 2025",
    role: "Engineering Lead",
    company: "Educational Initiatives",
    icon: Rocket,
    chapter: "Scaled delivery",
    headline: "Making architecture and execution move together.",
    summary: "Led the Neev rebuild and high-stakes state deployments, coordinating engineering decisions with product priorities, QA validation, deployment readiness, and field realities.",
    responsibilities: ["Architecture and roadmaps", "Team planning and execution", "QA and deployment coordination", "Stakeholder and field alignment"],
    growth: "Expanded from owning systems to creating the clarity, operating rhythm, and technical direction required for multiple teams to deliver together.",
  },
  {
    period: "2025 — NOW",
    role: "Assistant Engineering Manager",
    company: "Educational Initiatives",
    icon: Users2,
    chapter: "Engineering leadership",
    headline: "Growing teams without moving away from the work.",
    summary: "Leads engineering teams, architecture decisions, cross-functional planning, and dependable delivery for large-scale education platforms while remaining close to critical implementation details.",
    responsibilities: ["People and technical leadership", "Portfolio-level planning", "Architecture reviews", "Executive and stakeholder communication"],
    growth: "Balances team development, delivery accountability, and hands-on engineering judgment across products with consequential real-world use.",
  },
];

export default function AboutPage() {
  return (
    <div className="inner-page">
      <section className="inner-hero about-hero page-wrap">
        <div className="about-hero-grid">
          <div className="about-hero-copy">
            <div className="section-kicker"><span>01</span> About</div>
            <WordReveal className="inner-title" text="Builder, leader, and systems thinker." delay={0.08} eager />
            <div className="inner-hero-foot">
              <p>I work across product, engineering, and operations to turn complicated field problems into dependable software.</p>
              <span><MapPin className="size-4" /> Bengaluru, India</span>
            </div>
          </div>
          <div className="about-hero-visual" aria-hidden="true">
            <Image src="/about-illustration-light.png" alt="" width={420} height={504} className="block dark:hidden" priority />
            <Image src="/about-illustration-dark.png" alt="" width={420} height={504} className="hidden dark:block" priority />
          </div>
        </div>
      </section>

      <section className="section-paper"><div className="page-wrap section-pad about-story-grid">
        <WordReveal as="p" className="big-statement" text="I care about the moment software leaves the demo environment and meets the real world." />
        <Reveal delay={0.08} className="story-copy">
          <p>My path started with browser games and interactive experiences. That work taught me to think in systems: inputs, state, performance, and feedback.</p>
          <p>Today I lead teams building mobile and backend platforms used for large-scale education programs. I remain close to the code while shaping architecture, delivery, and the conditions teams need to do excellent work.</p>
          <a className="text-link" href="mailto:hsekar.bat@gmail.com">Start a conversation <ArrowUpRight className="size-4" /></a>
        </Reveal>
      </div></section>

      <section id="career-roadmap" className="about-career-section scroll-mt-20"><div className="page-wrap section-pad">
        <Reveal><div className="section-kicker section-kicker-dark"><span>02</span> Career roadmap</div></Reveal>
        <div className="about-career-heading mt-10 md:mt-16">
          <WordReveal as="h2" className="display-heading" text="Four roles. A continuous expansion of ownership." />
          <Reveal delay={.08}><p>Each chapter added a new layer—from crafting interactions, to owning systems, to leading delivery, architecture, and people.</p><div className="about-career-axis"><span>CRAFT</span><i /><span>SYSTEMS</span><i /><span>TEAMS</span><i /><span>STRATEGY</span></div></Reveal>
        </div>

        <div className="about-career-roadmap">
          {careerChapters.map(({ period, role, company, icon: Icon, chapter, headline, summary, responsibilities, growth }, index) => (
            <Reveal key={role} className="about-career-chapter" delay={index * .04}>
              <div className="about-career-rail"><span>{period}</span><i aria-hidden="true" /><b>0{index + 1}</b></div>
              <article>
                <div className="about-career-card-head"><div><span>{chapter}</span><p>{company}</p></div><Icon /></div>
                <h3>{role}</h3>
                <h4>{headline}</h4>
                <p className="about-career-summary">{summary}</p>
                <div className="about-career-responsibilities">{responsibilities.map(item => <span key={item}>{item}</span>)}</div>
                <div className="about-career-growth"><span>What changed</span><p>{growth}</p></div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="about-career-now">
          <div><span>PARALLEL CHAPTER · MARCH 2026 — PRESENT</span><h3>CTO, E‑Talk</h3></div>
          <p>Applying the full arc—product strategy, architecture, hands-on development, AI content infrastructure, delivery, and commercial thinking—to build an Odisha-first English-learning venture from the ground up.</p>
          <a href="https://www.e-talk.in/en" target="_blank" rel="noreferrer">Visit E‑Talk <ArrowUpRight /></a>
        </Reveal>
      </div></section>

      <section className="section-light"><div className="page-wrap section-pad">
        <Reveal><div className="section-kicker"><span>03</span> Principles</div></Reveal>
        <div className="principles-grid">
          {values.map(([number, title, copy], index) => (
            <article key={title} className="principle-card" style={{ transitionDelay: `${index * 70}ms` }}>
              <span>{number}</span><WordReveal as="h2" text={title} amount={0.6} /><p>{copy}</p>
            </article>
          ))}
        </div>
      </div></section>
    </div>
  );
}
