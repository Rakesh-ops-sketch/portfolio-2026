/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Blocks, CheckCircle2, Code2, Gamepad2, GraduationCap, Presentation, Rocket, Users2 } from "lucide-react";
import { Reveal, WordReveal } from "@/components/motion-primitives";
import { t, asset, rows, strings, iconFor, demoFor } from '@/cms/render-helpers';
import type { TemplateProps } from '@/cms/render-helpers';


export default function WorkSection1({data,shared}:TemplateProps){
return (<section className="work-detail-hero page-wrap">
      <div className="section-kicker"><span>{t(data, 'field1')}</span> {t(data, 'field2')}</div>
      <WordReveal className="inner-title" text={t(data, 'field3')} delay={0.08} eager />
      <div className="work-detail-hero-foot"><p>{t(data, 'field4')}</p><div><strong>{t(data, 'field5')}</strong><span>{t(data, 'field6')}</span></div></div>
    </section>);
}
