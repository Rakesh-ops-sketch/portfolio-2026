import { cloneElement, type ReactElement } from 'react';
import { templates } from '@/cms/generated/registry';
import specs from '@/cms/generated/templates.json';
import { ProjectTemplate, projectRecords } from './project-template';
import { ReusableSection } from './reusable-sections';
import type { Content, Shared, TemplateProps } from '@/cms/render-helpers';
export function RenderSection({data,shared}:TemplateProps):ReactElement|null{
 if(data.hidden)return null;
 if(data.blockType==='projectPresentation'){
  const project=projectRecords([data.project],shared.projects)[0];
  return project?<ProjectTemplate project={project} variant={String(data.variant||'home')} shared={shared}/>:null;
 }
 const Template=(templates as Record<string,(props:TemplateProps)=>ReactElement>)[String(data.blockType)];
 if(Template){
  const defaults=specs.find(spec=>spec.slug===data.blockType)?.defaults||{};
  const node=Template({data:{...defaults,...data},shared});
  return data.anchor?cloneElement(node,{id:data.anchor} as Record<string,unknown>):node;
 }
 return <ReusableSection data={data} shared={shared}/>;
}
export function PortfolioPage({page,shared}:{page:Content;shared:Shared}){
 return <div className={String(page.shell||'inner-page')}>{(page.sections as Content[]||[]).map((data,index)=><RenderSection key={String(data.id||index)} data={data} shared={shared}/>)}</div>;
}
