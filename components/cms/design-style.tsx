import { defaultDesign } from '@/cms/defaults';
import type { Content } from '@/cms/render-helpers';
const hex=(value:unknown,fallback:string)=>typeof value==='string'&&/^#[\da-f]{6}$/i.test(value)?value:fallback;
const bounded=(value:unknown,fallback:number,min:number,max:number)=>typeof value==='number'&&Number.isFinite(value)?Math.max(min,Math.min(max,value)):fallback;
export function DesignStyle({design}:{design:Content}){
 function palette(name:'light'|'dark'){
  const colors=(design[name]||{}) as Content;const defaults=defaultDesign[name];
  const originalColors:Record<string,keyof typeof defaults>={'6f8cff':'accent','8ea3ff':'accent','8f8aff':'accent','d38b67':'warmAccent','a65332':'warmAccent','11120f':'ink','080907':'ink','ffffff':'background','f7f7f4':'paper','e7e6de':'paper','f2f1eb':'paper'};
  const overrides=Object.entries(originalColors).map(([color,key])=>`--cms-color-${color}:${colors[key]&&colors[key]!==defaults[key]?hex(colors[key],`#${color}`):`#${color}`}`).join(';');
  return overrides+';'+Object.entries(defaults).map(([key,value])=>`--cms-${key.replace(/[A-Z]/g,c=>`-${c.toLowerCase()}`)}:${hex(colors[key],value)}`).join(';');
 }
 const fonts:Record<string,string>={current:'var(--font-baloo-thambi)',sans:'system-ui, sans-serif',serif:'Georgia, serif'};
 const font=fonts[String(design.font)]||fonts.current;
 const scale=bounded(design.textScale,1,.85,1.2),spacing=bounded(design.spacing,1,.6,1.5),width=bounded(design.contentWidth,1380,960,1600),radius=bounded(design.radius,1,0,2);
 function customStyles(name:'light'|'dark'){
  const values=(design[name]||{}) as Content, defaults=defaultDesign[name];const root=name==='dark'?'html.dark':'html:not(.dark)';
  const rules:string[]=[];
  const groups:Record<string,string[]>={background:['body','.hero-section'],foreground:['body','.hero-title','.inner-title','.display-heading'],paper:['.section-paper','.section-light','.capabilities-section','.testimonials-section','.work-craft-section'],ink:['.section-ink','.experience-section','.contact-section','.contact-page','.work-featured-section','.about-career-section']};
  for(const [key,selectors] of Object.entries(groups))if(values[key]&&values[key]!==defaults[key as keyof typeof defaults]){
   const color=hex(values[key],defaults[key as keyof typeof defaults]);
   rules.push(`${selectors.map(selector=>`${root} ${selector}`).join(',')}{${key==='foreground'?'color':'background'}:${color}}`);
  }
  return rules.join('');
 }
 return <style>{`html:root{${palette('light')};--cms-font:${font};--cms-spacing:${spacing};--cms-width:${width}px;--cms-radius:${radius};font-size:${scale*100}%}html.dark{${palette('dark')}}${customStyles('light')}${customStyles('dark')}`}</style>;
}
