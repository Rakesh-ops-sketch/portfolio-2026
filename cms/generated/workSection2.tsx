import { ProjectTemplate, projectRecords } from '@/components/cms/project-template';
/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Blocks, CheckCircle2, Code2, Gamepad2, GraduationCap, Presentation, Rocket, Users2 } from "lucide-react";
import { Reveal, WordReveal } from "@/components/motion-primitives";
import { t, asset, rows, strings, iconFor, demoFor } from '@/cms/render-helpers';
import type { TemplateProps } from '@/cms/render-helpers';


export default function WorkSection2({data,shared}:TemplateProps){
return (<section className="work-featured-section"><div className="page-wrap section-pad">
      <div className="section-kicker section-kicker-dark"><span>{t(data, 'field1')}</span> {t(data, 'field2')}</div>

      {projectRecords(data.projects, shared.projects).map(project => <ProjectTemplate key={String(project.id)} project={project} variant="work" shared={shared} />)}

      

      
    </div></section>);
}
