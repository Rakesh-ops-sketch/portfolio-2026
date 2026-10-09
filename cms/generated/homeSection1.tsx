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


export default function HomeSection1({data,shared}:TemplateProps){
return (<section className="hero-section" aria-labelledby="hero-title">
        <div className="hero-grid" aria-hidden="true" />
        <PremiumHeroAmbient />

        <div className="page-wrap relative z-10 flex min-h-screen flex-col justify-between pb-8 pt-24 md:pb-12 md:pt-28">
          <div className="hero-meta flex items-center justify-between gap-4 text-[11px] font-medium uppercase tracking-[0.22em]">
            <span className="flex items-center gap-2">
              <span className="status-dot" /> {shared.site.availability}</span>
            <span className="hidden items-center gap-2 sm:flex">
              <MapPin className="size-3.5" /> {shared.site.location}</span>
          </div>

          <div className="hero-content py-16 text-center md:py-24">
            <p className="hero-intro mb-7 flex items-center justify-center gap-3 text-sm">
              <span className="h-px w-10 bg-black" /> {t(data, 'field3')}<span className="h-px w-10 bg-black" />
            </p>
            <PremiumHeroHeadline text={t(data,'field8')} />
            <div className="mx-auto mt-8 max-w-3xl md:mt-12">
              <p className="hero-lede text-base leading-7 md:text-lg md:leading-8">
                {t(data, 'field4')}</p>
              <PremiumHeroActions primaryLabel={t(data,'field9')} primaryHref={t(data,'field10')} secondaryLabel={t(data,'field11')} secondaryHref={t(data,'field12')} />
            </div>
          </div>

          <div className="hero-footer flex items-end justify-between pt-5 text-xs">
            <span>{t(data, 'field5')}</span>
            <span className="font-mono">{t(data, 'field6')}{new Date().getFullYear()} {t(data, 'field7')}</span>
          </div>
        </div>
      </section>);
}
