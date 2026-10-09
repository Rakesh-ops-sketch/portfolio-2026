/* eslint-disable @typescript-eslint/no-unused-vars */
import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { WordReveal } from "@/components/motion-primitives";
import { t, asset, rows, strings, iconFor, demoFor } from '@/cms/render-helpers';
import type { TemplateProps } from '@/cms/render-helpers';


export default function ContactSection1({data,shared}:TemplateProps){
const email = shared.site.email;
return (<section className="page-wrap contact-page-inner">
      <div className="section-kicker section-kicker-dark"><span>{t(data, 'field1')}</span> {t(data, 'field2')}</div>
      <WordReveal className="contact-title" text={t(data, 'field3')} delay={0.08} eager />
      <p className="contact-lede">{t(data, 'field4')}</p>
      <a href={`mailto:${email}`} className="contact-email">
        <span><Mail /> {t(data, 'field5')}</span><strong>{email}</strong><ArrowUpRight />
      </a>
      <div className="contact-socials"><span>{t(data, 'field6')}</span>{shared.site.socials.map(link=><Link key={link.href} href={link.href} target="_blank" rel="noreferrer">{link.label} ↗</Link>)}</div>
    </section>);
}
