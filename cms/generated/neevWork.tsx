/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Blocks, CheckCircle2, Code2, Gamepad2, GraduationCap, Presentation, Rocket, Users2 } from "lucide-react";
import { Reveal, WordReveal } from "@/components/motion-primitives";
import { t, asset, rows, strings, iconFor, demoFor } from '@/cms/render-helpers';
import type { TemplateProps } from '@/cms/render-helpers';
export default function ProjectWork({data,shared}:TemplateProps){return (<Reveal className="work-feature work-feature-neev mt-10 md:mt-16">
        <div className="work-feature-top"><span>{t(data, 'field3')}</span><b>{t(data, 'field4')}</b></div>
        <div className="work-feature-main"><div className="work-feature-copy"><p className="work-feature-role">{t(data, 'field5')}</p><WordReveal as="h2" text={t(data, 'field6')} /><p>{t(data, 'field7')}</p><div className="work-feature-tags"><span>{t(data, 'field8')}</span><span>{t(data, 'field9')}</span><span>{t(data, 'field10')}</span><span>{t(data, 'field11')}</span><span>{t(data, 'field12')}</span></div></div><div className="work-feature-proof"><span>{t(data, 'field13')}</span><strong>{t(data, 'field14')}<i>{t(data, 'field15')}</i> {t(data, 'field16')}</strong><p>{t(data, 'field17')}</p></div></div>
        <div className="work-feature-metrics"><div><strong>{t(data, 'field18')}</strong><span>{t(data, 'field19')}</span></div><div><strong>{t(data, 'field20')}</strong><span>{t(data, 'field21')}</span></div><div><strong>{t(data, 'field22')}</strong><span>{t(data, 'field23')}</span></div><div><strong>{t(data, 'field24')}</strong><span>{t(data, 'field25')}</span></div></div>
        <div className="work-feature-highlights"><p><CheckCircle2 />{t(data, 'field26')}</p><p><CheckCircle2 />{t(data, 'field27')}</p><p><CheckCircle2 />{t(data, 'field28')}</p></div>
      </Reveal>);}
