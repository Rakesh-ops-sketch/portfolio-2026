/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Blocks, CheckCircle2, Code2, Gamepad2, GraduationCap, Presentation, Rocket, Users2 } from "lucide-react";
import { Reveal, WordReveal } from "@/components/motion-primitives";
import { t, asset, rows, strings, iconFor, demoFor } from '@/cms/render-helpers';
import type { TemplateProps } from '@/cms/render-helpers';


export default function WorkSection4({data,shared}:TemplateProps){
const deliverySteps = rows(data, 'field12').map(row => ({number: String(row.number ?? ''),icon: iconFor(String(row.icon)),title: String(row.title ?? ''),copy: String(row.copy ?? ''),tags: strings(row, 'tags')}));
return (<section className="work-leadership-section"><div className="page-wrap section-pad">
      <div className="section-kicker section-kicker-dark"><span>{t(data, 'field1')}</span> {t(data, 'field2')}</div>
      <div className="work-leadership-heading mt-10 md:mt-16"><WordReveal as="h2" className="display-heading" text={t(data, 'field3')} /><p>{t(data, 'field4')}</p></div>
      <div className="work-delivery-flow">{deliverySteps.map(({ number, icon: Icon, title, copy, tags }, index) => <Reveal key={title} className="work-delivery-step" delay={index * .05}><div className="work-delivery-step-head"><span>{number}</span><Icon /></div><h3>{title}</h3><p>{copy}</p><div>{tags.map(tag => <small key={tag}>{tag}</small>)}</div>{index < deliverySteps.length - 1 && <ArrowRight className="work-delivery-arrow" aria-hidden="true" />}</Reveal>)}</div>
      <Reveal className="work-collaboration-strip"><div><GraduationCap /><span>{t(data, 'field5')}</span></div><b>{t(data, 'field6')}</b><div><Code2 /><span>{t(data, 'field7')}</span></div><b>{t(data, 'field8')}</b><div><CheckCircle2 /><span>{t(data, 'field9')}</span></div><b>{t(data, 'field10')}</b><div><Rocket /><span>{t(data, 'field11')}</span></div></Reveal>
    </div></section>);
}
