import Image from 'next/image';
import Link from 'next/link';
import { RichText } from '@payloadcms/richtext-lexical/react';
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import { ArrowUpRight, Quote } from 'lucide-react';
import { Reveal, WordReveal } from '@/components/motion-primitives';
import { asset, t, rows, demoFor, type TemplateProps, type Content } from '@/cms/render-helpers';
function Rich({value}:{value:unknown}){return value&&typeof value==='object'&&'root' in value?<RichText data={value as SerializedEditorState} />:null;}
function resolve(values:unknown,records:Content[]):Content[]{return Array.isArray(values)?values.map(value=>{const id=typeof value==='object'&&value?value.id:value;return records.find(record=>String(record.id)===String(id));}).filter((v):v is Content=>Boolean(v)):[];}
export function ReusableSection({data,shared}:TemplateProps){
 const type=t(data,'blockType'); const items=type==='projects'?resolve(data.projects,shared.projects):type==='timeline'?resolve(data.entries,shared.career as unknown as Content[]):type==='quotes'?resolve(data.entries,shared.testimonials as unknown as Content[]):type==='playground'?resolve(data.entries,shared.playground as unknown as Content[]):rows(data,'items');
 return <section className={`cms-section cms-tone-${t(data,'tone')||'light'} cms-${type} cms-layout-${t(data,'layout')||'grid'} cms-image-${t(data,'side')||'right'}`}>
  <div className="page-wrap section-pad">
   <Reveal><div className="cms-section-heading">{data.eyebrow?<p className="section-kicker">{t(data,'eyebrow')}</p>:null}<WordReveal as={type==='hero'?'h1':'h2'} className={type==='hero'?'inner-title':'display-heading'} text={t(data,'heading')} />{data.description?<p className="cms-lede">{t(data,'description')}</p>:null}</div></Reveal>
   {type==='richText'||type==='imageText'?<div className="cms-richtext"><Rich value={data.body}/></div>:null}
   {(type==='hero'||type==='imageText')&&data.image?<div className="cms-image"><Image src={asset(data,'image')} alt={typeof data.image==='object'&&data.image&&'alt' in data.image?String(data.image.alt):''} width={1200} height={900} style={{objectPosition:typeof data.image==='object'&&data.image&&'focalX' in data.image?`${data.image.focalX??50}% ${'focalY' in data.image?data.image.focalY??50:50}%`:undefined}} /></div>:null}
   {items.length?<div className={`cms-items ${type==='timeline'?'cms-timeline':''}`}>{items.map((item,index)=><Reveal key={String(item.id||index)}><article className="cms-card">
    {type==='quotes'?<><Quote/><blockquote>{t(item,'quote')}</blockquote><strong>{t(item,'name')}</strong><p>{t(item,'role')}</p></>:<><span className="section-kicker">{t(item,'period')||t(item,'category')||String(index+1).padStart(2,'0')}</span><h3>{t(item,'title')||t(item,'role')}</h3><p>{t(item,'summary')||t(item,'description')}</p>{type==='projects'&&item.image?<Image src={asset(item,'image')} alt={t(item,'title')} width={800} height={500}/>:null}{type==='playground'?(()=>{const Demo=demoFor(t(item,'demo'));return <Demo/>;})():null}</>}
   </article></Reveal>)}</div>:null}
   {data.links?<div className="cms-links">{rows(data,'links').map((link,index)=><Link key={index} className="button-lime" href={t(link,'href')}>{t(link,'label')}<ArrowUpRight className="size-4"/></Link>)}</div>:null}
  </div>
 </section>;
}
