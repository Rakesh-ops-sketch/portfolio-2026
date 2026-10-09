/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Blocks, CheckCircle2, Code2, Gamepad2, GraduationCap, Presentation, Rocket, Users2 } from "lucide-react";
import { Reveal, WordReveal } from "@/components/motion-primitives";
import { t, asset, rows, strings, iconFor, demoFor } from '@/cms/render-helpers';
import type { TemplateProps } from '@/cms/render-helpers';
export default function ProjectWork({data,shared}:TemplateProps){return (<Reveal className="work-feature work-feature-evaluation" delay={.06}>
        <div className="work-feature-top"><span>{t(data, 'field29')}</span><b>{t(data, 'field30')}</b></div>
        <div className="work-feature-main"><div className="work-feature-copy"><p className="work-feature-role">{t(data, 'field31')}</p><WordReveal as="h2" text={t(data, 'field32')} /><p>{t(data, 'field33')}</p><div className="work-feature-tags"><span>{t(data, 'field34')}</span><span>{t(data, 'field35')}</span><span>{t(data, 'field36')}</span><span>{t(data, 'field37')}</span></div></div><div className="work-feature-proof"><span>{t(data, 'field38')}</span><strong>{t(data, 'field39')}</strong><p>{t(data, 'field40')}</p></div></div>
        <div className="work-feature-metrics work-feature-metrics-three"><div><strong>{t(data, 'field41')}</strong><span>{t(data, 'field42')}</span></div><div><strong>{t(data, 'field43')}</strong><span>{t(data, 'field44')}</span></div><div><strong>{t(data, 'field45')}</strong><span>{t(data, 'field46')}</span></div></div>
        <div className="work-feature-highlights"><p><CheckCircle2 />{t(data, 'field47')}</p><p><CheckCircle2 />{t(data, 'field48')}</p><p><CheckCircle2 />{t(data, 'field49')}</p></div>
      </Reveal>);}
