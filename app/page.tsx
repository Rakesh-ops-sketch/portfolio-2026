import Link from "next/link";
import {
  ArrowUpRight,
  Briefcase,
  CheckCircle2,
  Code2,
  Gamepad2,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Rocket,
  Server,
  Smartphone,
  Users,
} from "lucide-react";
import {FaGithub, FaLinkedin} from 'react-icons/fa';

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HeroTypewriter } from "@/components/hero-typewriter";
import { ImpactSnapshotCard } from "@/components/impact-snapshot-card";
import { projects } from "@/lib/projects";

export const metadata = {
  title: "Rakesh Biswal | Engineering Lead",
  description:
    "Engineering Lead specializing in offline-first platforms and large-scale education initiatives across India.",
};

export default function Home() {
  return (
    <div className="relative flex flex-col">
      {/* Full-page subtle gradient */}
      <div
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_80%_70%_at_30%_10%,_var(--color-hero-glow)_0%,_transparent_55%)]"
        aria-hidden
      />
      {/* ─── HERO ─── */}
      <section>
        <div className="mx-auto flex w-full flex-col gap-8 px-6 pb-16 pt-20 sm:px-10 md:pb-24 md:pt-28 lg:flex-row lg:items-center lg:gap-16 lg:px-16">
          <div className="flex-1 space-y-6">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="gap-1.5 px-3 py-1">
                <MapPin className="size-3" />
                India
              </Badge>
              <Badge variant="outline" className="gap-1.5 px-3 py-1">
                <Briefcase className="size-3" />
                Engineering Lead
              </Badge>
            </div>

            <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              <HeroTypewriter />
            </h1>

            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              I lead engineering teams that build{" "}
              <span className="font-medium text-foreground">
                production-grade systems
              </span>{" "}
              across frontend, backend, and mobile—for environments where
              connectivity is limited and reliability matters.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Button
                size="lg"
                asChild
                className="gap-2 rounded-full"
              >
                <a href="#projects">
                  View Case Studies
                  <ArrowUpRight className="size-4" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="gap-2 rounded-full"
              >
                <a href="#contact">
                  <Mail className="size-4" />
                  Contact Me
                </a>
              </Button>
            </div>
          </div>

          <ImpactSnapshotCard />
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section id="about" className="scroll-mt-16 border-t border-border/40">
        <div className="mx-auto flex w-full flex-col gap-10 px-6 py-16 sm:px-10 md:py-24 lg:px-16">
          <div className="space-y-2">
            <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              <Users className="size-4" />
              About
            </p>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              Engineering leader focused on impact, reliability, and scale
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="size-4 text-muted-foreground" />
                  Professional Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
                <p>
                  Hands-on engineering leader with full-stack ownership across
                  mobile apps and backend services. I specialize in building
                  systems that work reliably in low-to-no internet environments
                  and scale to hundreds of thousands of real users.
                </p>
                <p>
                  Strong background in system architecture, roadmap planning,
                  and coordinating across engineering, QA, deployment, and
                  government stakeholders.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="size-4 text-muted-foreground" />
                  Education
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p className="text-lg font-semibold text-foreground">
                  B.Sc. in Computer Science
                </p>
                <p>Sambalpur University, Odisha, India</p>
                <Badge variant="secondary" className="mt-2">
                  Graduated 2020
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ─── EARLY CAREER ─── */}
      <section
        id="early-career"
        className="scroll-mt-16 border-t border-border/40 bg-accent/30"
      >
        <div className="mx-auto flex w-full flex-col gap-10 px-6 py-16 sm:px-10 md:py-24 lg:px-16">
          <div className="space-y-2">
            <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              <Gamepad2 className="size-4" />
              Early career
            </p>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              Games and interactive experiences
            </h2>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gamepad2 className="size-4 text-muted-foreground" />
                HTML5 & Unity WebGL
              </CardTitle>
              <CardDescription>
                Browser-based games and playable demos from my earlier work
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
              <p>
                In my early career I built many{" "}
                <span className="font-medium text-foreground">HTML5</span> and{" "}
                <span className="font-medium text-foreground">Unity WebGL</span>{" "}
                games—ranging from casual browser games to interactive demos and
                playable prototypes. That foundation in game logic, performance
                tuning, and cross-browser delivery still informs how I approach
                frontend and real-time systems today.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ─── EXPERIENCE ─── */}
      <section
        id="experience"
        className="scroll-mt-16 border-t border-border/40"
      >
        <div className="mx-auto flex w-full flex-col gap-10 px-6 py-16 sm:px-10 md:py-24 lg:px-16">
          <div className="space-y-2">
            <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              <Briefcase className="size-4" />
              Experience
            </p>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              Career Journey at Educational Initiatives
            </h2>
          </div>

          {/* Timeline */}
          <div className="relative space-y-0">
            {/* Timeline line with gradient */}
            <div className="absolute left-[7px] top-3 hidden h-[calc(100%-24px)] w-0.5 bg-gradient-to-b from-primary via-primary/50 to-muted md:block" />

            {/* Role 4: Assistant Engineering Manager */}
            <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 md:ml-8">
              <div className="absolute -left-[25px] top-4 hidden size-4 rounded-full border-2 border-primary bg-background shadow-[0_0_8px_rgba(var(--primary),0.4)] transition-shadow duration-300 group-hover:shadow-[0_0_12px_rgba(var(--primary),0.6)] md:block" />
              <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <CardHeader className="px-4 py-3">
                <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <CardTitle className="text-base">Assistant Engineering Manager</CardTitle>
                    <CardDescription className="text-xs">Bengaluru · Hybrid</CardDescription>
                  </div>
                  <Badge variant="default" className="w-fit text-xs">Jul 2025 - Present</Badge>
                </div>
              </CardHeader>
              <CardContent className="px-4 pb-3 pt-0">
                <ul className="space-y-1">
                  <li className="flex gap-2 text-xs text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-primary" />
                    <span>Leading engineering teams and driving technical excellence</span>
                  </li>
                  <li className="flex gap-2 text-xs text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-primary" />
                    <span>Overseeing architecture decisions and cross-team coordination</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Role 3: Engineering Lead */}
            <Card className="group relative mt-3 overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 md:ml-8">
              <div className="absolute -left-[25px] top-4 hidden size-4 rounded-full border-2 border-primary bg-background transition-shadow duration-300 group-hover:shadow-[0_0_8px_rgba(var(--primary),0.4)] md:block" />
              <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <CardHeader className="px-4 py-3">
                <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <CardTitle className="text-base">Engineering Lead</CardTitle>
                    <CardDescription className="text-xs">Bengaluru · Hybrid</CardDescription>
                  </div>
                  <Badge variant="outline" className="w-fit text-xs">Nov 2024 - Jul 2025</Badge>
                </div>
              </CardHeader>
              <CardContent className="px-4 pb-3 pt-0">
                <div className="mb-2 flex flex-wrap gap-1.5">
                  <Badge variant="secondary" className="text-[10px] px-2 py-0.5">🏆 Recognition Award</Badge>
                  <Badge variant="secondary" className="text-[10px] px-2 py-0.5">⭐ Spot Award</Badge>
                </div>
                <ul className="space-y-1">
                  <li className="flex gap-2 text-xs text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-primary" />
                    <span>Led Neev app rebuild — resolved critical production issues</span>
                  </li>
                  <li className="flex gap-2 text-xs text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-primary" />
                    <span>Delivered LiftEd Endline for Rajasthan under tight timelines</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Role 2: Lead Developer */}
            <Card className="group relative mt-3 overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 md:ml-8">
              <div className="absolute -left-[25px] top-4 hidden size-4 rounded-full border-2 border-muted-foreground bg-background transition-shadow duration-300 group-hover:shadow-[0_0_8px_rgba(var(--muted-foreground),0.3)] md:block" />
              <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-muted-foreground/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <CardHeader className="px-4 py-3">
                <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <CardTitle className="text-base">Lead Developer</CardTitle>
                    <CardDescription className="text-xs">Bengaluru · Hybrid</CardDescription>
                  </div>
                  <Badge variant="outline" className="w-fit text-xs">Jul 2023 - Nov 2024</Badge>
                </div>
              </CardHeader>
              <CardContent className="px-4 pb-3 pt-0">
                <div className="mb-2">
                  <Badge variant="secondary" className="text-[10px] px-2 py-0.5">🎖️ Maestro Award</Badge>
                </div>
                <ul className="space-y-1">
                  <li className="flex gap-2 text-xs text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-primary" />
                    <span>Built 2D/3D educational games in Unity Engine</span>
                  </li>
                  <li className="flex gap-2 text-xs text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-primary" />
                    <span>Developed 2 full-stack Angular portals for clients</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Role 1: Interactive Developer */}
            <Card className="group relative mt-3 overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 md:ml-8">
              <div className="absolute -left-[25px] top-4 hidden size-4 rounded-full border-2 border-muted-foreground bg-background transition-shadow duration-300 group-hover:shadow-[0_0_8px_rgba(var(--muted-foreground),0.3)] md:block" />
              <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-muted-foreground/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <CardHeader className="px-4 py-3">
                <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <CardTitle className="text-base">Interactive Developer</CardTitle>
                    <CardDescription className="text-xs">Bengaluru</CardDescription>
                  </div>
                  <Badge variant="outline" className="w-fit text-xs">Mar 2022 - Jul 2023</Badge>
                </div>
              </CardHeader>
              <CardContent className="px-4 pb-3 pt-0">
                <ul className="space-y-1">
                  <li className="flex gap-2 text-xs text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-primary" />
                    <span>Games blending entertainment with education</span>
                  </li>
                  <li className="flex gap-2 text-xs text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-primary" />
                    <span>Unity Engine & Angular Framework specialist</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ─── PROJECTS ─── */}
      <section id="projects" className="scroll-mt-16 border-t border-border/40">
        <div className="mx-auto flex w-full flex-col gap-10 px-6 py-16 sm:px-10 md:py-24 lg:px-16">
          <div className="space-y-2">
            <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              <Rocket className="size-4" />
              Projects
            </p>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              Case studies from real-world deployments
            </h2>
            <p className="max-w-2xl text-sm text-muted-foreground">
              Each project reflects production-grade delivery, leadership, and
              measurable outcomes in low-connectivity environments.
            </p>
          </div>

          {projects.map((project) => (
            <Card key={project.slug} className="overflow-hidden">
              <CardHeader className="border-b border-border bg-card">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <CardTitle className="text-xl">{project.title}</CardTitle>
                    <CardDescription className="mt-1">
                      {project.summary}
                    </CardDescription>
                  </div>
                  <div className="flex shrink-0 flex-wrap gap-2">
                    <Badge variant="secondary">{project.role}</Badge>
                    <Badge variant="outline">{project.scale}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="grid gap-8 pt-6 md:grid-cols-2">
                <div className="space-y-3">
                  <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    <Code2 className="size-3.5" />
                    Contributions
                  </p>
                  <ul className="space-y-2">
                    {project.contributions.map((item) => (
                      <li
                        key={item}
                        className="flex gap-2 text-sm text-muted-foreground"
                      >
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-foreground" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-3">
                  <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    <Rocket className="size-3.5" />
                    Impact
                  </p>
                  <ul className="space-y-2">
                    {project.impact.map((item) => (
                      <li
                        key={item}
                        className="flex gap-2 text-sm text-muted-foreground"
                      >
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-foreground" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              <div className="flex flex-wrap gap-2 border-t border-border px-6 py-4">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* ─── SKILLS ─── */}
      <section
        id="skills"
        className="scroll-mt-16 border-t border-border/40 bg-accent/30"
      >
        <div className="mx-auto flex w-full flex-col gap-10 px-6 py-16 sm:px-10 md:py-24 lg:px-16">
          <div className="space-y-2">
            <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              <Code2 className="size-4" />
              Skills
            </p>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              Technical toolkit
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Code2 className="size-4 text-muted-foreground" />
                  Languages
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {["Go", "JavaScript", "TypeScript", "C#", "C++", "Core Java"].map((lang) => (
                  <Badge key={lang} variant="secondary">
                    {lang}
                  </Badge>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Server className="size-4 text-muted-foreground" />
                  Frameworks & Tools
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {[
                  "React Native",
                  "Node.js",
                  "Express",
                  "Gin (Go)",
                  "Firebase",
                  "SQLite",
                  "Unity",
                ].map((tool) => (
                  <Badge key={tool} variant="secondary">
                    {tool}
                  </Badge>
                ))}
              </CardContent>
            </Card>

            <Card className="sm:col-span-2 lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Smartphone className="size-4 text-muted-foreground" />
                  Practices
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {[
                  "CI/CD Pipelines",
                  "Offline-First Architecture",
                  "Secure Data Syncing",
                  "Agile Delivery",
                ].map((practice) => (
                  <Badge key={practice} variant="secondary">
                    {practice}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section id="contact" className="scroll-mt-16 border-t border-border/40">
        <div className="mx-auto flex w-full flex-col gap-10 px-6 py-16 sm:px-10 md:py-24 lg:px-16">
          <div className="space-y-2">
            <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              <Mail className="size-4" />
              Contact
            </p>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              Let&apos;s build something reliable together
            </h2>
            <p className="max-w-2xl text-sm text-muted-foreground">
              I&apos;m open to engineering leadership roles and collaborations
              that require dependable systems at scale.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            <Card>
              <CardContent className="flex items-start gap-3 pt-6">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent">
                  <Mail className="size-4 text-foreground" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">Email</p>
                  <Link
                    href="mailto:hsekar.bat@gmail.com"
                    className="block truncate text-sm font-medium text-foreground hover:underline"
                  >
                    hsekar.bat@gmail.com
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-start gap-3 pt-6">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent">
                  <Phone className="size-4 text-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <Link
                    href="tel:+918917319650"
                    className="text-sm font-medium text-foreground hover:underline"
                  >
                    +91-8917319650
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-start gap-3 pt-6">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent">
                  <FaGithub className="size-4 text-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">GitHub</p>
                  <Link
                    href="https://github.com/Rakesh-ops-sketch"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-sm font-medium text-foreground hover:underline"
                  >
                    Rakesh-ops-sketch
                    <ArrowUpRight className="size-3" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-start gap-3 pt-6">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent">
                  <FaLinkedin className="size-4 text-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">LinkedIn</p>
                  <Link
                    href="https://www.linkedin.com/in/lucifermsloh/"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-sm font-medium text-foreground hover:underline"
                  >
                    lucifermsloh
                    <ArrowUpRight className="size-3" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button size="lg" asChild className="gap-2 rounded-full">
              <Link href="mailto:hsekar.bat@gmail.com">
                <Mail className="size-4" />
                Email Me
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="gap-2 rounded-full"
            >
              <Link
                href="https://www.linkedin.com/in/lucifermsloh/"
                target="_blank"
              >
                <FaLinkedin className="size-4" />
                Connect on LinkedIn
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
