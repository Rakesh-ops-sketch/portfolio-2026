import { closePayload } from './close-payload';
import env from '@next/env';
import path from 'node:path';
import { getPayload } from 'payload';
import { defaultPages, defaultSite, defaultDesign, defaultCareer, defaultTestimonials, defaultPlayground, defaultProjects } from '../cms/defaults';
import specs from '../cms/generated/templates.json';
import type { CollectionSlug, Where, RequiredDataFromCollectionSlug } from 'payload';
import type { Content } from '../cms/render-helpers';
env.loadEnvConfig(process.cwd());
export async function seedPortfolio(payload:Awaited<ReturnType<typeof getPayload>>){
 const context={skipRevalidation:true};
 async function ensure<C extends CollectionSlug>(collection:C,data:Content,where:Where){
  const existing=await payload.find({collection,where,limit:1,overrideAccess:true});
  if(existing.docs[0])return existing.docs[0];
  const clean={...data};delete clean.id;
  return payload.create({collection,data:clean as RequiredDataFromCollectionSlug<C>,overrideAccess:true,context});
 }
 const uploads=new Map<string,number>();
 async function upload(sourcePath:string,alt:string){
  if(uploads.has(sourcePath))return uploads.get(sourcePath)!;
  const existing=await payload.find({collection:'media',where:{sourcePath:{equals:sourcePath}},limit:1,overrideAccess:true});
  const doc=existing.docs[0]||await payload.create({collection:'media',data:{alt:alt||'Portfolio illustration',sourcePath},filePath:path.join(process.cwd(),'public',sourcePath.split('?')[0]),overrideAccess:true,context});
  uploads.set(sourcePath,doc.id);return doc.id;
 }
 async function hydrateImages(sections:Content[]){
  for(const section of sections){const spec=specs.find(s=>s.slug===section.blockType);if(!spec)continue;
   for(const field of spec.fields){if(field.type==='upload'&&typeof section[field.name]==='string'){const source=section[field.name] as string;section[field.name]=await upload(source,field.label.replace(/^src: /,''));}}
  }return sections;
 }
 const projectIDs=new Map<string,number>();
 for(const source of defaultProjects){const data=structuredClone(source) as unknown as Content;data.presentations=await hydrateImages(data.presentations as Content[]);const doc=await ensure('projects',data,{slug:{equals:source.slug}});projectIDs.set(source.slug,doc.id);}
 for(const item of defaultCareer)await ensure('career',{...item,_status:'published',responsibilities:item.responsibilities.map(value=>({value}))},{role:{equals:item.role}});
 for(const item of defaultTestimonials)await ensure('testimonials',{...item,_status:'published'},{name:{equals:item.name}});
 for(const item of defaultPlayground)await ensure('playground',{...item,_status:'published'},{demo:{equals:item.demo}});
 for(const source of defaultPages){
  const data=structuredClone(source) as unknown as Content;const sections=await hydrateImages(data.sections as Content[]);
  for(const section of sections){if(section.blockType==='projectPresentation')section.project=projectIDs.get(String(section.project));if(section.blockType==='workSection2')section.projects=(section.projects as string[]).map(slug=>projectIDs.get(slug));}
  await ensure('pages',data,{slug:{equals:source.slug}});
 }
 const site=await payload.findGlobal({slug:'site',overrideAccess:true});
 if(!site.name)await payload.updateGlobal({slug:'site',data:{...defaultSite,logo:await upload('/logo-wordmark-v2.png','Rakesh Biswal logo'),_status:'published'},overrideAccess:true,context});
 const design=await payload.findGlobal({slug:'design',overrideAccess:true});
 if(!design._status)await payload.updateGlobal({slug:'design',data:{...defaultDesign,font:'current',defaultTheme:'system',motion:'full',_status:'published'},overrideAccess:true,context});
}
if(process.argv[1]?.endsWith('/seed.ts')){
 if(!process.env.DATABASE_URL)throw new Error('Set DATABASE_URL in .env.local first.');
 const {default:config}=await import('../payload.config');const payload=await getPayload({config});
 try{await seedPortfolio(payload);console.log('Portfolio seeded. Existing records and edits were preserved.');}finally{await closePayload(payload);}
}
