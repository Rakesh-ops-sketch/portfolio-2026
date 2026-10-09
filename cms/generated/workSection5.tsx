/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Blocks, CheckCircle2, Code2, Gamepad2, GraduationCap, Presentation, Rocket, Users2 } from "lucide-react";
import { Reveal, WordReveal } from "@/components/motion-primitives";
import { t, asset, rows, strings, iconFor, demoFor } from '@/cms/render-helpers';
import type { TemplateProps } from '@/cms/render-helpers';


export default function WorkSection5({data,shared}:TemplateProps){
return (<section className="contact-strip"><Reveal className="page-wrap"><WordReveal as="p" text={t(data, 'field1')} /><a href={`mailto:${shared.site.email}`}>{t(data, 'field3')}<ArrowUpRight /></a></Reveal></section>);
}
