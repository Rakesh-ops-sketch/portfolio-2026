/* eslint-disable @typescript-eslint/no-unused-vars */
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  Check,
  Globe2,
  Layers3,
  Mail,
  MapPin,
  Quote,
  Smartphone,
  Sparkles,
  Users2,
} from "lucide-react";
import { PremiumHeroActions, PremiumHeroAmbient, PremiumHeroHeadline } from "@/components/premium-hero-motion";
import { CaseStudyVisual } from "@/components/case-study-visual";
import { EvaluationCaseVisual } from "@/components/evaluation-case-visual";
import { CaseStudyAtmosphere, CaseStudyReveal } from "@/components/case-study-motion";
import { AnimatedCaseMetrics } from "@/components/animated-case-metrics";
import { WordReveal } from "@/components/motion-primitives";
import { t, asset, rows, strings, iconFor, demoFor } from '@/cms/render-helpers';
import type { TemplateProps } from '@/cms/render-helpers';


export default function HomeSection2({data,shared}:TemplateProps){
return (<section id="work" className="section-ink scroll-mt-20">
        <CaseStudyAtmosphere tone="dark" />
        <div className="page-wrap section-pad" data-reveal>
          <div className="section-kicker section-kicker-dark"><span>{t(data, 'field1')}</span> {t(data, 'field2')}</div>
          <div className="mt-10 grid gap-12 lg:mt-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <CaseStudyReveal direction="left">
              <p className="eyebrow-lime">{t(data, 'field3')}</p>
              <WordReveal as="h2" className="mt-5 text-4xl font-semibold tracking-[-0.045em] text-white sm:text-5xl lg:text-6xl" text={t(data, 'field4')} />
              <p className="mt-7 max-w-xl text-base leading-7 text-white/58 md:text-lg md:leading-8">
                {t(data, 'field5')}</p>
              <div className="mt-9 flex flex-wrap gap-2">
                {strings(data, 'field6').map((tech) => (
                  <span key={tech} className="tech-pill">{tech}</span>
                ))}
              </div>
            </CaseStudyReveal>

            <CaseStudyReveal direction="right" delay={.1}>
            <div className="case-panel motion-case-panel" data-tilt>
              <div className="case-topline">
                <span>{t(data, 'field7')}</span>
                <Globe2 className="size-5" />
              </div>
              <CaseStudyVisual />
              <div className="grid gap-5 border-t border-white/10 pt-6 sm:grid-cols-2">
                <div><span className="case-label">{t(data, 'field8')}</span><p>{t(data, 'field9')}</p></div>
                <div><span className="case-label">{t(data, 'field10')}</span><p>{t(data, 'field11')}</p></div>
              </div>
            </div>
            </CaseStudyReveal>
          </div>

          <AnimatedCaseMetrics
            className="case-impact-grid mt-12 md:mt-16"
            itemClassName="case-impact-stat"
            metrics={rows(data, 'field12').map(row => ({value: String(row.value ?? ''),label: String(row.label ?? '')}))}
          />

          <CaseStudyReveal className="case-detail-grid motion-detail-grid mt-10" delay={.12}>
            <article><span>{t(data, 'field13')}</span><h3>{t(data, 'field14')}</h3><p>{t(data, 'field15')}</p></article>
            <article><span>{t(data, 'field16')}</span><h3>{t(data, 'field17')}</h3><p>{t(data, 'field18')}</p></article>
            <article><span>{t(data, 'field19')}</span><h3>{t(data, 'field20')}</h3><p>{t(data, 'field21')}</p></article>
          </CaseStudyReveal>

          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-white/10 md:mt-20 md:grid-cols-3">
            {strings(data, 'field22').map((item) => (
              <div key={item} className="flex gap-3 bg-[#11120f] p-6 text-sm leading-6 text-white/68 md:p-8">
                <Check className="mt-1 size-4 shrink-0 text-[#d38b67]" /> {item}
              </div>
            ))}
          </div>
        </div>
      </section>);
}
