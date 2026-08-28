import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  Globe2,
  Layers3,
  Mail,
  MapPin,
  Smartphone,
  Sparkles,
  Users2,
} from "lucide-react";
import { PremiumHeroActions, PremiumHeroAmbient, PremiumHeroHeadline } from "@/components/premium-hero-motion";
import { CaseStudyVisual } from "@/components/case-study-visual";
import { EvaluationCaseVisual } from "@/components/evaluation-case-visual";
import { CaseStudyAtmosphere, CaseStudyReveal } from "@/components/case-study-motion";
import { AnimatedCaseMetrics } from "@/components/animated-case-metrics";

const roles = [
  {
    period: "2025 — NOW",
    title: "Assistant Engineering Manager",
    company: "Educational Initiatives",
    summary:
      "Leading engineering teams, architecture decisions, and cross-functional delivery for large-scale education platforms.",
  },
  {
    period: "2024 — 2025",
    title: "Engineering Lead",
    company: "Educational Initiatives",
    summary:
      "Led the Neev rebuild and high-stakes state deployments, turning field constraints into dependable product systems.",
  },
  {
    period: "2023 — 2024",
    title: "Lead Developer",
    company: "Educational Initiatives",
    summary:
      "Owned full-stack delivery across mobile, backend, quality, and release operations for offline-first assessment tools.",
  },
  {
    period: "2022 — 2023",
    title: "HTML5 Interactive Developer",
    company: "Educational Initiatives",
    summary:
      "Built interactive learning experiences and established the hands-on product foundation that grew into broader mobile, backend, and platform ownership.",
  },
];

const capabilities = [
  {
    icon: Layers3,
    number: "01",
    title: "Systems architecture",
    copy: "Designing resilient platforms from product requirements through data models, APIs, sync protocols, and observability.",
  },
  {
    icon: Smartphone,
    number: "02",
    title: "Offline-first products",
    copy: "Building mobile experiences for low-connectivity environments where every saved record and retry path matters.",
  },
  {
    icon: Users2,
    number: "03",
    title: "Technical leadership",
    copy: "Creating clarity across engineering, QA, deployment, and stakeholder teams to move complex programs forward.",
  },
];

export const metadata = {
  title: "Rakesh Biswal — Engineering Leader",
  description:
    "Engineering leader building reliable, offline-first platforms for high-impact education initiatives across India.",
};

export default function Home() {
  return (
    <div className="portfolio-shell">
      <section className="hero-section" aria-labelledby="hero-title">
        <div className="hero-grid" aria-hidden="true" />
        <PremiumHeroAmbient />

        <div className="page-wrap relative z-10 flex min-h-[calc(100svh-4rem)] flex-col justify-between py-8 md:py-12">
          <div className="hero-meta flex items-center justify-between gap-4 text-[11px] font-medium uppercase tracking-[0.22em]">
            <span className="flex items-center gap-2">
              <span className="status-dot" /> Available for meaningful work
            </span>
            <span className="hidden items-center gap-2 sm:flex">
              <MapPin className="size-3.5" /> Bengaluru, India
            </span>
          </div>

          <div className="hero-content py-16 text-center md:py-24">
            <p className="hero-intro mb-7 flex items-center justify-center gap-3 text-sm">
              <span className="h-px w-10 bg-black" /> Engineering leader · Product builder <span className="h-px w-10 bg-black" />
            </p>
            <PremiumHeroHeadline />
            <div className="mx-auto mt-8 max-w-3xl md:mt-12">
              <p className="hero-lede text-base leading-7 md:text-lg md:leading-8">
                I&apos;m Rakesh Biswal. I lead teams building dependable mobile and backend platforms for education programs operating at national scale.
              </p>
              <PremiumHeroActions />
            </div>
          </div>

          <div className="hero-footer flex items-end justify-between pt-5 text-xs">
            <span>SCROLL TO DISCOVER</span>
            <span className="font-mono">© {new Date().getFullYear()} / RB</span>
          </div>
        </div>
      </section>

      <section id="work" className="section-ink scroll-mt-20">
        <CaseStudyAtmosphere tone="dark" />
        <div className="page-wrap section-pad" data-reveal>
          <div className="section-kicker section-kicker-dark"><span>01</span> Selected case study</div>
          <div className="mt-10 grid gap-12 lg:mt-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <CaseStudyReveal direction="left">
              <p className="eyebrow-lime">National FLN platform</p>
              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] text-white sm:text-5xl lg:text-6xl">
                Ei Neev Assessments
              </h2>
              <p className="mt-7 max-w-xl text-base leading-7 text-white/58 md:text-lg md:leading-8">
                An offline-first foundational literacy and numeracy platform built for government-backed education programs operating across low-connectivity classrooms.
              </p>
              <div className="mt-9 flex flex-wrap gap-2">
                {["React Native", "Realm", "Go / Gin", "S3", "MongoDB"].map((tech) => (
                  <span key={tech} className="tech-pill">{tech}</span>
                ))}
              </div>
            </CaseStudyReveal>

            <CaseStudyReveal direction="right" delay={.1}>
            <div className="case-panel motion-case-panel" data-tilt>
              <div className="case-topline">
                <span>OFFLINE-FIRST FIELD SYSTEM / 2022—NOW</span>
                <Globe2 className="size-5" />
              </div>
              <CaseStudyVisual />
              <div className="grid gap-5 border-t border-white/10 pt-6 sm:grid-cols-2">
                <div><span className="case-label">My role</span><p>Engineering Lead · Architecture & delivery</p></div>
                <div><span className="case-label">Core stack</span><p>React Native · Realm · Go/Gin · S3 · MongoDB</p></div>
              </div>
            </div>
            </CaseStudyReveal>
          </div>

          <AnimatedCaseMetrics
            className="case-impact-grid mt-12 md:mt-16"
            itemClassName="case-impact-stat"
            metrics={[
              { value: "57K", label: "assessments delivered" },
              { value: "27.5K", label: "students supported" },
              { value: "4K", label: "schools reached" },
              { value: "11", label: "languages supported" },
            ]}
          />

          <CaseStudyReveal className="case-detail-grid motion-detail-grid mt-10" delay={.12}>
            <article><span>01 / Reliability</span><h3>Resilient synchronization</h3><p>Re-architected Go/Gin APIs and client-side retry workflows, taking observed development-stage data loss from 50–60% to zero in production validation.</p></article>
            <article><span>02 / Field stability</span><h3>Built for difficult conditions</h3><p>Hardened audio recording, autosave, crash recovery, and offline synchronization for assessment teams working with intermittent connectivity.</p></article>
            <article><span>03 / Modernization</span><h3>A smaller, faster application</h3><p>Migrated to React Native&apos;s New Architecture with TurboModules and C++ integrations, reducing the Android application from more than 100 MB to 48 MB.</p></article>
          </CaseStudyReveal>

          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-white/10 md:mt-20 md:grid-cols-3">
            {[
              "NIPUN Bharat delivery across Odisha, Uttar Pradesh, and Rajasthan",
              "Automated Bitbucket and Jenkins pipelines across QA, staging, and AWS production",
              "Roadmaps and releases aligned across product, QA, deployment, and government stakeholders",
            ].map((item) => (
              <div key={item} className="flex gap-3 bg-[#11120f] p-6 text-sm leading-6 text-white/68 md:p-8">
                <Check className="mt-1 size-4 shrink-0 text-[#d38b67]" /> {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="evaluation-platform" className="section-paper evaluation-case-section scroll-mt-20">
        <CaseStudyAtmosphere tone="light" />
        <div className="page-wrap section-pad" data-reveal>
          <div className="section-kicker"><span>02</span> Selected case study</div>
          <div className="evaluation-case-hero mt-10 lg:mt-16">
            <CaseStudyReveal direction="left" className="evaluation-case-intro">
              <p className="evaluation-eyebrow">Real-time scoring infrastructure</p>
              <h2>Evaluator &amp;<br />Scoring Portal</h2>
              <p>A high-throughput evaluator workspace designed to keep scoring fast, recoverable, and traceable while thousands of browser events compete for delivery.</p>
              <div className="mt-9 flex flex-wrap gap-2">
                {["Full-duplex WebSockets", "Persistent event queues", "Audit trails", "AI-assisted scoring"].map((tech) => <span key={tech} className="evaluation-pill">{tech}</span>)}
              </div>
            </CaseStudyReveal>
            <CaseStudyReveal direction="right" delay={.08} className="evaluation-case-statement">
              <span>The operating constraint</span>
              <strong>1K–2K</strong>
              <h3>evaluators scoring concurrently</h3>
              <p>Every interaction must survive bursts, reconnects, and temporary delivery failures without slowing the evaluator down.</p>
            </CaseStudyReveal>
          </div>

          <CaseStudyReveal className="evaluation-architecture-wrap mt-12 lg:mt-20" delay={.1}>
            <div className="evaluation-architecture-label"><span>System response</span><p>Browser-first reliability with controlled server delivery</p></div>
            <EvaluationCaseVisual />
          </CaseStudyReveal>

          <AnimatedCaseMetrics
            className="evaluation-impact-grid mt-10 md:mt-12"
            itemClassName="evaluation-impact-stat"
            metrics={[
              { value: "51,773", label: "total assessments scored" },
              { value: "515,289", label: "total subtests completed" },
              { value: "20,455", label: "students represented" },
            ]}
          />

          <CaseStudyReveal className="evaluation-detail-grid motion-detail-grid mt-12 md:mt-16" delay={.12}>
            <article><span>01 / Data integrity</span><h3>Autosave that handles evaluator bursts</h3><p>Isolated browser events can send as single requests, while rapid activity forms a persistent queue that flushes after five seconds of inactivity, with retry handling for failed delivery.</p></article>
            <article><span>02 / Traceability</span><h3>Every scoring decision has history</h3><p>Added versioned scoring workflows, audit trails, evaluator activity tracking, and scrutiny controls for stronger quality and operational oversight.</p></article>
            <article><span>03 / Assisted scoring</span><h3>AI support inside the workflow</h3><p>Integrated Sarvam, Gemini Flash, and in-house models to support evaluators, shorten scoring cycles, and reduce scorer staffing requirements.</p></article>
            <article><span>04 / Live operations</span><h3>Improvement without interruption</h3><p>Improved evaluator UI and extended workflows while active scoring operations continued.</p></article>
          </CaseStudyReveal>

          <CaseStudyReveal className="evaluation-outcome-strip mt-8" delay={.14}>
            <span>Operational outcome</span>
            <p>Scoring workflows could evolve without interrupting active evaluation operations, while version history, scrutiny controls, and evaluator activity remained visible.</p>
          </CaseStudyReveal>
        </div>
      </section>

      <section id="skills" className="capabilities-section scroll-mt-20">
        <div className="page-wrap section-pad">
          <div className="section-kicker"><span>03</span> What I bring</div>
          <CaseStudyReveal className="capabilities-heading mt-10 md:mt-16">
            <h2 className="display-heading">Direction for the team.<br />Depth in the implementation.</h2>
            <p>I work across the product stack—from the interface people touch to the architecture, delivery systems, and engineering practices that keep it dependable.</p>
          </CaseStudyReveal>

          <CaseStudyReveal className="capability-card-grid mt-12 md:mt-20" delay={.08}>
              {capabilities.map(({ icon: Icon, number, title, copy }) => (
                <article key={title} className="capability-card">
                  <div className="capability-card-top"><span>{number}</span><Icon className="size-5" strokeWidth={1.5} /></div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </article>
              ))}
          </CaseStudyReveal>

          <CaseStudyReveal delay={.12}>
          <Link href="/playground" className="playground-card capabilities-playground mt-14 md:mt-24">
            <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.18em]"><Sparkles className="size-4" /> Interactive lab</div>
            <div className="mt-12 flex flex-col gap-6 md:mt-20 md:flex-row md:items-end md:justify-between">
              <div><h3>See how I think in motion.</h3><p>Algorithms, games, and small experiments—built to be explored.</p></div>
              <span className="circle-arrow"><ArrowUpRight /></span>
            </div>
          </Link>
          </CaseStudyReveal>
        </div>
      </section>

      <section id="experience" className="experience-section scroll-mt-20">
        <div className="page-wrap section-pad">
          <div className="section-kicker section-kicker-dark"><span>04</span> Career ladder</div>
          <div className="experience-layout mt-10 lg:mt-16">
            <CaseStudyReveal className="experience-intro" direction="left">
              <p className="experience-overline">March 2022 — Present</p>
              <h2 className="display-heading">Four roles. One continuous rise in ownership.</h2>
              <p>From building HTML5 learning experiences to leading architecture, delivery, and engineering teams—while remaining close to the implementation.</p>
            </CaseStudyReveal>
            <CaseStudyReveal className="experience-timeline" direction="right" delay={.1}>
              {roles.map((role, index) => (
                <article key={role.title} className="experience-role">
                  <span className="experience-marker" aria-hidden="true" />
                  <div className="experience-role-head"><span>{role.period}</span><b>0{index + 1}</b></div>
                  <p className="experience-company">{role.company}</p>
                  <h3>{role.title}</h3>
                  <p>{role.summary}</p>
                </article>
              ))}
            </CaseStudyReveal>
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section scroll-mt-20">
        <div className="page-wrap section-pad text-center" data-reveal>
          <div className="mx-auto flex size-12 items-center justify-center rounded-full border border-[#6f8cff]/35 text-[#6f8cff]"><Mail className="size-5" /></div>
          <p className="mt-6 text-xs font-medium uppercase tracking-[0.24em] text-white/45">Have a hard problem worth solving?</p>
          <h2 className="mx-auto mt-7 max-w-5xl text-5xl font-semibold tracking-[-0.06em] text-white sm:text-6xl lg:text-8xl">Bring me the problem that needs more than a quick fix.</h2>
          <a href="mailto:hsekar.bat@gmail.com" className="button-lime mx-auto mt-10 w-fit">Start a conversation <ArrowUpRight className="size-4" /></a>
          <div className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row">
            <span>RAKESH BISWAL — ENGINEERING LEADER</span>
            <div className="flex gap-6"><Link href="https://github.com/Rakesh-ops-sketch" target="_blank">GITHUB</Link><Link href="https://www.linkedin.com/in/lucifermsloh/" target="_blank">LINKEDIN</Link></div>
          </div>
        </div>
      </section>
    </div>
  );
}
