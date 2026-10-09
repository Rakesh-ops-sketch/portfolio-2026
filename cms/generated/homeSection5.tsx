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


export default function HomeSection5({data,shared}:TemplateProps){
const capabilities = rows(data, 'field9').map(row => ({icon: iconFor(String(row.icon)),number: String(row.number ?? ''),title: String(row.title ?? ''),copy: String(row.copy ?? '')}));
return (<section id="skills" className="capabilities-section scroll-mt-20">
        <div className="page-wrap section-pad">
          <div className="section-kicker"><span>{t(data, 'field1')}</span> {t(data, 'field2')}</div>
          <CaseStudyReveal className="capabilities-heading mt-10 md:mt-16">
            <WordReveal as="h2" className="display-heading" text={t(data, 'field3')} />
            <p>{t(data, 'field4')}</p>
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
          <Link href={t(data, 'field5')} prefetch={false} className="playground-card capabilities-playground mt-14 md:mt-24">
            <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.18em]"><Sparkles className="size-4" /> {t(data, 'field6')}</div>
            <div className="mt-12 flex flex-col gap-6 md:mt-20 md:flex-row md:items-end md:justify-between">
              <div><h3>{t(data, 'field7')}</h3><p>{t(data, 'field8')}</p></div>
              <span className="circle-arrow"><ArrowUpRight /></span>
            </div>
          </Link>
          </CaseStudyReveal>
        </div>
      </section>);
}
