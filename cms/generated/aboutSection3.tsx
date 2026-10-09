/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from "next/image";
import { ArrowUpRight, Code2, Layers3, MapPin, Rocket, Users2 } from "lucide-react";
import { Reveal, WordReveal } from "@/components/motion-primitives";
import { t, asset, rows, strings, iconFor, demoFor } from '@/cms/render-helpers';
import type { TemplateProps } from '@/cms/render-helpers';


export default function AboutSection3({data,shared}:TemplateProps){
const careerChapters = shared.career.map(item => ({...item, icon:iconFor(item.icon)}));
return (<section id="career-roadmap" className="about-career-section scroll-mt-20"><div className="page-wrap section-pad">
        <Reveal><div className="section-kicker section-kicker-dark"><span>{t(data, 'field1')}</span> {t(data, 'field2')}</div></Reveal>
        <div className="about-career-heading mt-10 md:mt-16">
          <WordReveal as="h2" className="display-heading" text={t(data, 'field3')} />
          <Reveal delay={.08}><p>{t(data, 'field4')}</p><div className="about-career-axis"><span>{t(data, 'field5')}</span><i /><span>{t(data, 'field6')}</span><i /><span>{t(data, 'field7')}</span><i /><span>{t(data, 'field8')}</span></div></Reveal>
        </div>

        <div className="about-career-roadmap">
          {careerChapters.map(({ period, role, company, icon: Icon, chapter, headline, summary, responsibilities, growth }, index) => (
            <Reveal key={role} className="about-career-chapter" delay={index * .04}>
              <div className="about-career-rail"><span>{period}</span><i aria-hidden="true" /><b>{t(data, 'field9')}{index + 1}</b></div>
              <article>
                <div className="about-career-card-head"><div><span>{chapter}</span><p>{company}</p></div><Icon /></div>
                <h3>{role}</h3>
                <h4>{headline}</h4>
                <p className="about-career-summary">{summary}</p>
                <div className="about-career-responsibilities">{responsibilities.map(item => <span key={item}>{item}</span>)}</div>
                <div className="about-career-growth"><span>{t(data, 'field10')}</span><p>{growth}</p></div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="about-career-now">
          <div><span>{t(data, 'field11')}</span><h3>{t(data, 'field12')}</h3></div>
          <p>{t(data, 'field13')}</p>
          <a href={t(data, 'field14')} target="_blank" rel="noreferrer">{t(data, 'field15')}<ArrowUpRight /></a>
        </Reveal>
      </div></section>);
}
