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


export default function HomeSection6({data,shared}:TemplateProps){
const roles = shared.career.slice().reverse().map(item => ({...item, title:item.role, summary:item.homeSummary||item.summary}));
return (<section id="experience" className="experience-section scroll-mt-20">
        <div className="page-wrap section-pad">
          <div className="section-kicker section-kicker-dark"><span>{t(data, 'field1')}</span> {t(data, 'field2')}</div>
          <div className="experience-layout mt-10 lg:mt-16">
            <CaseStudyReveal className="experience-intro" direction="left">
              <p className="experience-overline">{t(data, 'field3')}</p>
              <WordReveal as="h2" className="display-heading" text={t(data, 'field4')} />
              <p>{t(data, 'field5')}</p>
            </CaseStudyReveal>
            <CaseStudyReveal className="experience-timeline" direction="right" delay={.1}>
              {roles.map((role, index) => (
                <article key={role.title} className="experience-role">
                  <span className="experience-marker" aria-hidden="true" />
                  <div className="experience-role-head"><span>{role.period}</span><b>{t(data, 'field6')}{index + 1}</b></div>
                  <p className="experience-company">{role.company}</p>
                  <h3>{role.title}</h3>
                  <p>{role.summary}</p>
                </article>
              ))}
            </CaseStudyReveal>
          </div>
        </div>
      </section>);
}
