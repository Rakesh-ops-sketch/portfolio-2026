import type { Metadata } from 'next';
import { getPage } from './data';
import { SITE_URL } from '@/lib/constants';
import type { Content } from './render-helpers';
export async function pageMetadata(slug:string):Promise<Metadata>{
 const {page,shared,preview}=await getPage(slug);if(!page)return {title:'Page not found'};
 const seo=(page.seo||{}) as Content;const title=String(seo.title||page.title);const description=String(seo.description||shared.site.description);const url=`${SITE_URL}${slug==='home'?'':`/${slug}`}`;
 const media=seo.image||(shared.site as unknown as Content).seoImage;
 const image=media&&typeof media==='object'&&'url' in media?String(media.url):undefined;
 return {title,description,alternates:{canonical:url},robots:preview||seo.noIndex?{index:false,follow:false}:undefined,openGraph:{title,description,url,type:'website',...(image?{images:[image]}:{})},twitter:{card:'summary_large_image',title,description,...(image?{images:[image]}:{})}};
}
