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


export default function HomeSection3({data,shared}:TemplateProps){
return (<section id="evaluation-platform" className="section-paper evaluation-case-section scroll-mt-20">
        <CaseStudyAtmosphere tone="light" />
        <div className="page-wrap section-pad" data-reveal>
          <div className="section-kicker"><span>{t(data, 'field1')}</span> {t(data, 'field2')}</div>
          <div className="evaluation-case-hero mt-10 lg:mt-16">
            <CaseStudyReveal direction="left" className="evaluation-case-intro">
              <p className="evaluation-eyebrow">{t(data, 'field3')}</p>
              <WordReveal as="h2" text={t(data, 'field4')} />
              <p>{t(data, 'field5')}</p>
              <div className="mt-9 flex flex-wrap gap-2">
                {strings(data, 'field6').map((tech) => <span key={tech} className="evaluation-pill">{tech}</span>)}
              </div>
            </CaseStudyReveal>
            <CaseStudyReveal direction="right" delay={.08} className="evaluation-case-statement">
              <span>{t(data, 'field7')}</span>
              <strong>{t(data, 'field8')}</strong>
              <h3>{t(data, 'field9')}</h3>
              <p>{t(data, 'field10')}</p>
            </CaseStudyReveal>
          </div>

          <CaseStudyReveal className="evaluation-architecture-wrap mt-12 lg:mt-20" delay={.1}>
            <div className="evaluation-architecture-label"><span>{t(data, 'field11')}</span><p>{t(data, 'field12')}</p></div>
            <EvaluationCaseVisual />
          </CaseStudyReveal>

          <AnimatedCaseMetrics
            className="evaluation-impact-grid mt-10 md:mt-12"
            itemClassName="evaluation-impact-stat"
            metrics={rows(data, 'field13').map(row => ({value: String(row.value ?? ''),label: String(row.label ?? '')}))}
          />

          <CaseStudyReveal className="evaluation-detail-grid motion-detail-grid mt-12 md:mt-16" delay={.12}>
            <article><span>{t(data, 'field14')}</span><h3>{t(data, 'field15')}</h3><p>{t(data, 'field16')}</p></article>
            <article><span>{t(data, 'field17')}</span><h3>{t(data, 'field18')}</h3><p>{t(data, 'field19')}</p></article>
            <article><span>{t(data, 'field20')}</span><h3>{t(data, 'field21')}</h3><p>{t(data, 'field22')}</p></article>
            <article><span>{t(data, 'field23')}</span><h3>{t(data, 'field24')}</h3><p>{t(data, 'field25')}</p></article>
          </CaseStudyReveal>

          <CaseStudyReveal className="evaluation-outcome-strip mt-8" delay={.14}>
            <span>{t(data, 'field26')}</span>
            <p>{t(data, 'field27')}</p>
          </CaseStudyReveal>
        </div>
      </section>);
}
