/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from "next/image";
import { ArrowUpRight, Code2, Layers3, MapPin, Rocket, Users2 } from "lucide-react";
import { Reveal, WordReveal } from "@/components/motion-primitives";
import { t, asset, rows, strings, iconFor, demoFor } from '@/cms/render-helpers';
import type { TemplateProps } from '@/cms/render-helpers';


export default function AboutSection4({data,shared}:TemplateProps){
const values = rows(data, 'field3').map(row => [String(row.column1 ?? ''),String(row.column2 ?? ''),String(row.column3 ?? '')]);
return (<section className="section-light"><div className="page-wrap section-pad">
        <Reveal><div className="section-kicker"><span>{t(data, 'field1')}</span> {t(data, 'field2')}</div></Reveal>
        <div className="principles-grid">
          {values.map(([number, title, copy], index) => (
            <article key={title} className="principle-card" style={{ transitionDelay: `${index * 70}ms` }}>
              <span>{number}</span><WordReveal as="h2" text={title} amount={0.6} /><p>{copy}</p>
            </article>
          ))}
        </div>
      </div></section>);
}
