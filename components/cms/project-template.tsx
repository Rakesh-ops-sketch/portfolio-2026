import type { ComponentType } from 'react';
import { templates } from '@/cms/generated/registry';
import type { Content, Shared, TemplateProps } from '@/cms/render-helpers';
export function projectRecords(values:unknown,projects:Content[]):Content[]{return Array.isArray(values)?values.map(value=>{const id=typeof value==='object'&&value?value.id:value;return projects.find(p=>String(p.id)===String(id)||p.slug===id);}).filter((v):v is Content=>Boolean(v)):[];}
export function ProjectTemplate({project,variant,shared}:{project:Content;variant:string;shared:Shared}){
 const data=(project.presentations as Content[]||[]).find(p=>variant==='work'?String(p.blockType).endsWith('Work'):String(p.blockType).startsWith('home'));
 if(!data)return null;
 const Template=(templates as Record<string,ComponentType<TemplateProps>>)[String(data.blockType)];if(!Template)return null;
 const titleKey=variant==='home'?(project.slug==='etalk'?'field4':'field4'):(project.slug==='neev'?'field6':project.slug==='evaluation'?'field32':'field53');
 return <Template data={{...data,[titleKey]:project.title}} shared={shared}/>;
}
