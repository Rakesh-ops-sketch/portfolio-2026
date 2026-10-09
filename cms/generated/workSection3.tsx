/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Blocks, CheckCircle2, Code2, Gamepad2, GraduationCap, Presentation, Rocket, Users2 } from "lucide-react";
import { Reveal, WordReveal } from "@/components/motion-primitives";
import { t, asset, rows, strings, iconFor, demoFor } from '@/cms/render-helpers';
import type { TemplateProps } from '@/cms/render-helpers';


export default function WorkSection3({data,shared}:TemplateProps){
return (<section className="work-craft-section"><div className="page-wrap section-pad">
      <div className="section-kicker"><span>{t(data, 'field1')}</span> {t(data, 'field2')}</div>
      <div className="work-craft-heading mt-10 md:mt-16"><WordReveal as="h2" className="display-heading" text={t(data, 'field3')} /><p>{t(data, 'field4')}</p></div>
      <div className="work-craft-grid">
        <Reveal className="work-craft-card"><div className="work-craft-icon"><Blocks /></div><span>{t(data, 'field5')}</span><h3>{t(data, 'field6')}</h3><p>{t(data, 'field7')}</p><ul><li>{t(data, 'field8')}</li><li>{t(data, 'field9')}</li><li>{t(data, 'field10')}</li><li>{t(data, 'field11')}</li></ul></Reveal>
        <Reveal className="work-craft-card work-craft-card-dark" delay={.06}><div className="work-craft-icon"><Gamepad2 /></div><span>{t(data, 'field12')}</span><h3>{t(data, 'field13')}</h3><p>{t(data, 'field14')}</p><ul><li>{t(data, 'field15')}</li><li>{t(data, 'field16')}</li><li>{t(data, 'field17')}</li><li>{t(data, 'field18')}</li></ul></Reveal>
      </div>
    </div></section>);
}
