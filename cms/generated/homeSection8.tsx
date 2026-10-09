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


export default function HomeSection8({data,shared}:TemplateProps){
return (<section id="contact" className="contact-section scroll-mt-20">
        <div className="page-wrap section-pad text-center" data-reveal>
          <div className="mx-auto flex size-12 items-center justify-center rounded-full border border-[#6f8cff]/35 text-[#6f8cff]"><Mail className="size-5" /></div>
          <p className="mt-6 text-xs font-medium uppercase tracking-[0.24em] text-white/45">{t(data, 'field1')}</p>
          <WordReveal as="h2" className="mx-auto mt-7 max-w-5xl text-5xl font-semibold tracking-[-0.06em] text-white sm:text-6xl lg:text-8xl" text={t(data, 'field2')} />
          <a href={`mailto:${shared.site.email}`} className="button-lime mx-auto mt-10 w-fit">{t(data, 'field4')}<ArrowUpRight className="size-4" /></a>
          <div className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row">
            <span>{t(data, 'field5')}</span>
            <div className="flex gap-6">{shared.site.socials.map(link=><Link key={link.href} href={link.href} target="_blank" rel="noreferrer">{link.label.toUpperCase()}</Link>)}</div>
          </div>
        </div>
      </section>);
}
