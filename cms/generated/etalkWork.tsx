/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Blocks, CheckCircle2, Code2, Gamepad2, GraduationCap, Presentation, Rocket, Users2 } from "lucide-react";
import { Reveal, WordReveal } from "@/components/motion-primitives";
import { t, asset, rows, strings, iconFor, demoFor } from '@/cms/render-helpers';
import type { TemplateProps } from '@/cms/render-helpers';
export default function ProjectWork({data,shared}:TemplateProps){return (<Reveal className="work-feature work-feature-etalk" delay={.06}>
        <div className="work-feature-top"><span>{t(data, 'field50')}</span><b>{t(data, 'field51')}</b></div>
        <div className="work-etalk-grid"><div className="work-feature-copy"><p className="work-feature-role">{t(data, 'field52')}</p><WordReveal as="h2" text={t(data, 'field53')} /><p>{t(data, 'field54')}</p><div className="work-feature-tags"><span>{t(data, 'field55')}</span><span>{t(data, 'field56')}</span><span>{t(data, 'field57')}</span><span>{t(data, 'field58')}</span><span>{t(data, 'field59')}</span></div><Link href={t(data, 'field60')} target="_blank" rel="noreferrer" className="work-external-link">{t(data, 'field61')}<ArrowUpRight /></Link></div><div className="work-etalk-image"><Image src={asset(data, 'field62')} alt={t(data, 'field63')} width={1664} height={928} /><span>{t(data, 'field64')}</span></div></div>
        <div className="work-feature-metrics"><div><strong>{t(data, 'field65')}</strong><span>{t(data, 'field66')}</span></div><div><strong>{t(data, 'field67')}</strong><span>{t(data, 'field68')}</span></div><div><strong>{t(data, 'field69')}</strong><span>{t(data, 'field70')}</span></div><div><strong>{t(data, 'field71')}</strong><span>{t(data, 'field72')}</span></div></div>
        <div className="work-feature-highlights"><p><CheckCircle2 />{t(data, 'field73')}</p><p><CheckCircle2 />{t(data, 'field74')}</p><p><CheckCircle2 />{t(data, 'field75')}</p></div>
      </Reveal>);}
