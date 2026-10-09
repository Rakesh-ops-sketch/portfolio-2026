import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants';
import { getSnapshot } from '@/cms/data';
export default async function sitemap():Promise<MetadataRoute.Sitemap>{
 const {pages}=await getSnapshot();
 return pages.filter(page=>!((page.seo||{}) as {noIndex?:boolean}).noIndex).map(page=>({url:`${SITE_URL}${page.slug==='home'?'':`/${page.slug}`}`,lastModified:page.updatedAt?new Date(String(page.updatedAt)):undefined,changeFrequency:'monthly',priority:page.slug==='home'?1:.8}));
}
