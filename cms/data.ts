import 'server-only';
import { cache } from 'react';
import { unstable_cache } from 'next/cache';
import { draftMode, headers } from 'next/headers';
import { getPayload } from 'payload';
import config from '@payload-config';
import { defaultPages, defaultSite, defaultDesign, defaultCareer, defaultTestimonials, defaultPlayground, defaultProjects } from './defaults';
import type { Content, Shared } from './render-helpers';
import type { User, Career, Playground } from '@/payload-types';
export const cmsConfigured=Boolean(process.env.DATABASE_URL);
export const payloadClient=()=>getPayload({config});
export const currentOwner=cache(async()=>{
 if(!cmsConfigured)return null;
 const payload=await payloadClient();
 const {user}=await payload.auth({headers:await headers()});
 return user;
});
async function readSnapshot(user:User|null=null){
 if(!cmsConfigured)return {pages:defaultPages as unknown as Content[],shared:{site:defaultSite,career:defaultCareer,testimonials:defaultTestimonials,playground:defaultPlayground,projects:defaultProjects} as Shared,design:defaultDesign as unknown as Content};
 const payload=await payloadClient();const draft=Boolean(user);
 const collections=['pages','career','testimonials','playground','projects'] as const;
 const results=await Promise.all(collections.map(collection=>payload.find({collection,draft,user,overrideAccess:false,depth:2,limit:1000,pagination:false,sort:collection==='pages'||collection==='projects'?'createdAt':'order'})));
 // Globals have no anonymous API access. Only this server-side published read bypasses it.
 const [site,design]=await Promise.all([payload.findGlobal({slug:'site',draft,user,overrideAccess:true,depth:1}),payload.findGlobal({slug:'design',draft,user,overrideAccess:true,depth:1})]);
 const [pages,career,testimonials,playground,projects]=results.map(r=>r.docs);
 const shared={site:{...site,navigation:site.navigation||[],socials:site.socials||[],logo:typeof site.logo==='object'&&site.logo?site.logo.url:defaultSite.logo},career:(career as Career[]).map(c=>({...c,responsibilities:(c.responsibilities||[]).map(r=>r.value)})),testimonials,playground:(playground as Playground[]).filter(p=>!p.hidden),projects} as unknown as Shared;
 return {pages:pages as unknown as Content[],shared,design:design as unknown as Content};
}
const publishedSnapshot=unstable_cache(()=>readSnapshot(),['portfolio-cms',cmsConfigured?'connected':'seed'],{tags:['portfolio'],revalidate:300});
export const getSnapshot=cache(async()=>{
 const {isEnabled}=await draftMode();
 if(isEnabled){const user=await currentOwner();if(user)return {...await readSnapshot(user),preview:true};}
 return {...await publishedSnapshot(),preview:false};
});
export async function getPage(slug:string){const snapshot=await getSnapshot();return {...snapshot,page:snapshot.pages.find(p=>p.slug===slug)};}
