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


export default function HomeSection4({data,shared}:TemplateProps){
return (<section id="etalk" className="etalk-section scroll-mt-20">
        <div className="page-wrap section-pad">
          <div className="section-kicker"><span>{t(data, 'field1')}</span> {t(data, 'field2')}</div>

          <div className="etalk-hero mt-10 md:mt-16">
            <CaseStudyReveal direction="left" className="etalk-intro">
              <p className="etalk-overline">{t(data, 'field3')}</p>
              <WordReveal as="h2" text={t(data, 'field4')} />
              <h3>{t(data, 'field5')}</h3>
              <p>{t(data, 'field6')}</p>
              <div className="etalk-tech-list">
                {strings(data, 'field7').map((tech) => <span key={tech}>{tech}</span>)}
              </div>
              <Link href={t(data, 'field8')} target="_blank" rel="noreferrer" className="etalk-link">
                {t(data, 'field9')}<ArrowUpRight />
              </Link>
            </CaseStudyReveal>

            <CaseStudyReveal direction="right" delay={.08} className="etalk-positioning">
              <span>{t(data, 'field10')}</span>
              <strong>{t(data, 'field11')}</strong>
              <p>{t(data, 'field12')}</p>
              <div><b>{t(data, 'field13')}</b><small>{t(data, 'field14')}</small></div>
            </CaseStudyReveal>
          </div>

          <CaseStudyReveal className="etalk-metrics" delay={.08}>
            <div><strong>{t(data, 'field15')}</strong><span>{t(data, 'field16')}</span></div>
            <div><strong>{t(data, 'field17')}</strong><span>{t(data, 'field18')}</span></div>
            <div><strong>{t(data, 'field19')}</strong><span>{t(data, 'field20')}</span></div>
            <div><strong>{t(data, 'field21')}</strong><span>{t(data, 'field22')}</span></div>
          </CaseStudyReveal>

          <CaseStudyReveal className="etalk-cms" delay={.1}>
            <div className="etalk-cms-copy">
              <span>{t(data, 'field23')}</span>
              <h3>{t(data, 'field24')}</h3>
              <p>{t(data, 'field25')}</p>
              <ul>
                <li>{t(data, 'field26')}</li>
                <li>{t(data, 'field27')}</li>
                <li>{t(data, 'field28')}</li>
                <li>{t(data, 'field29')}</li>
              </ul>
            </div>
            <div className="etalk-cms-visual">
              <Image
                src={asset(data, 'field30')}
                alt={t(data, 'field31')}
                width={1664}
                height={928}
              />
              <span>{t(data, 'field32')}</span>
            </div>
          </CaseStudyReveal>

          <CaseStudyReveal className="etalk-detail-grid" delay={.12}>
            <article><span>{t(data, 'field33')}</span><h3>{t(data, 'field34')}</h3><p>{t(data, 'field35')}</p></article>
            <article><span>{t(data, 'field36')}</span><h3>{t(data, 'field37')}</h3><p>{t(data, 'field38')}</p></article>
            <article><span>{t(data, 'field39')}</span><h3>{t(data, 'field40')}</h3><p>{t(data, 'field41')}</p></article>
          </CaseStudyReveal>
        </div>
      </section>);
}
