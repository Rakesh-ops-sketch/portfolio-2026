/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from "next/image";
import { ArrowUpRight, Code2, Layers3, MapPin, Rocket, Users2 } from "lucide-react";
import { Reveal, WordReveal } from "@/components/motion-primitives";
import { t, asset, rows, strings, iconFor, demoFor } from '@/cms/render-helpers';
import type { TemplateProps } from '@/cms/render-helpers';


export default function AboutSection1({data,shared}:TemplateProps){
return (<section className="inner-hero about-hero page-wrap">
        <div className="about-hero-grid">
          <div className="about-hero-copy">
            <div className="section-kicker"><span>{t(data, 'field1')}</span> {t(data, 'field2')}</div>
            <WordReveal className="inner-title" text={t(data, 'field3')} delay={0.08} eager />
            <div className="inner-hero-foot">
              <p>{t(data, 'field4')}</p>
              <span><MapPin className="size-4" /> {shared.site.location}</span>
            </div>
          </div>
          <div className="about-hero-visual" aria-hidden="true">
            <Image src={asset(data, 'field6')} alt={t(data, 'field7')} width={420} height={504} className="block dark:hidden" priority />
            <Image src={asset(data, 'field8')} alt={t(data, 'field9')} width={420} height={504} className="hidden dark:block" priority />
          </div>
        </div>
      </section>);
}
