import type { Block, Field } from 'payload';
import specs from './generated/templates.json';
import { validLink } from './security';
const displayFields: Field[] = [
  { name: 'hidden', type: 'checkbox', defaultValue: false },
  { name: 'anchor', type: 'text', admin: { description: 'Optional section ID for navigation links.' }, validate: (value: string | null | undefined) => !value || /^[a-z][a-z0-9-]*$/.test(value) || 'Use lowercase letters, numbers, and hyphens.' },
];
function templateFields(fields: unknown[]): Field[] {
  return fields.map(raw => {
    const f = raw as { name:string; type:string; label?:string; fields?:unknown[] };
    return { ...f, ...(f.fields ? { fields:templateFields(f.fields) } : {}), ...(f.label && (/^href:|URL/i.test(f.label)) ? { validate:validLink } : {}) } as Field;
  });
}
export const legacyBlocks: Block[] = specs.map(spec => ({
  slug: spec.slug, imageURL:"/cms/section-preview.svg",imageAltText:spec.label, labels: { singular:spec.label, plural:spec.label },
  admin: { group: 'Existing portfolio sections' },
  fields: [...displayFields, ...templateFields(spec.fields)],
}));
const heading: Field[] = [{ name:'eyebrow',type:'text' },{name:'heading',type:'text',required:true},{name:'description',type:'textarea'}];
const link: Field[] = [{name:'label',type:'text',required:true},{name:'href',type:'text',required:true,validate:validLink}];
const layout: Field = {name:'layout',type:'select',defaultValue:'grid',options:['grid','list']};
const tone: Field = {name:'tone',type:'select',defaultValue:'light',options:['light','dark','paper']};
function block(slug:string,label:string,fields:Field[]):Block {return {slug,imageURL:"/cms/section-preview.svg",imageAltText:label,labels:{singular:label,plural:label},admin:{group:'Reusable sections'},fields:[...displayFields,tone,...fields]};}
export const reusableBlocks: Block[] = [
  block('hero','Hero',[...heading,{name:'layout',type:'select',defaultValue:'centered',options:['centered','split']},{name:'image',type:'upload',relationTo:'media'},{name:'links',type:'array',maxRows:2,fields:link}]),
  block('richText','Rich text',[...heading,{name:'body',type:'richText',required:true}]),
  block('imageText','Image and text',[...heading,{name:'body',type:'richText'},{name:'image',type:'upload',relationTo:'media',required:true},{name:'side',type:'select',defaultValue:'right',options:['left','right']}]),
  block('capabilities','Capabilities',[...heading,layout,{name:'items',type:'array',fields:[{name:'title',type:'text',required:true},{name:'description',type:'textarea'}]}]),
  block('projects','Project showcase',[...heading,layout,{name:'projects',type:'relationship',relationTo:'projects',hasMany:true,required:true}]),
  block('timeline','Career timeline',[...heading,{name:'entries',type:'relationship',relationTo:'career',hasMany:true,required:true}]),
  block('quotes','Testimonials',[...heading,layout,{name:'entries',type:'relationship',relationTo:'testimonials',hasMany:true,required:true}]),
  block('playground','Playground listings',[...heading,layout,{name:'entries',type:'relationship',relationTo:'playground',hasMany:true,required:true}]),
  block('cta','Call to action',[...heading,{name:'links',type:'array',fields:link}]),
  block('projectPresentation','Project presentation',[{name:'project',type:'relationship',relationTo:'projects',required:true},{name:'variant',type:'select',defaultValue:'home',options:['home','work']}]),
];
export const blocks = [...reusableBlocks,...legacyBlocks.filter(block=>!['homeSection2','homeSection3','homeSection4','neevWork','evaluationWork','etalkWork'].includes(block.slug))];
