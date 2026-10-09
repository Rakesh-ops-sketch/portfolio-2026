/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from "next/image";
import { ArrowUpRight, Code2, Layers3, MapPin, Rocket, Users2 } from "lucide-react";
import { Reveal, WordReveal } from "@/components/motion-primitives";
import { t, asset, rows, strings, iconFor, demoFor } from '@/cms/render-helpers';
import type { TemplateProps } from '@/cms/render-helpers';


export default function AboutSection2({data,shared}:TemplateProps){
return (<section className="section-paper"><div className="page-wrap section-pad about-story-grid">
        <WordReveal as="p" className="big-statement" text={t(data, 'field1')} />
        <Reveal delay={0.08} className="story-copy">
          <p>{t(data, 'field2')}</p>
          <p>{t(data, 'field3')}</p>
          <a className="text-link" href={`mailto:${shared.site.email}`}>{t(data, 'field5')}<ArrowUpRight className="size-4" /></a>
        </Reveal>
      </div></section>);
}
