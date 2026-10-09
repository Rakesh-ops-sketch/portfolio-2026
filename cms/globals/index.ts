import type { GlobalConfig, Field } from 'payload';
import { restoreGlobal } from '../restore';
import { owner, validColor, validLink } from '../security';
import { settingsChanged } from '../hooks';
const base = {access:{readVersions:owner,read:owner,update:owner},versions:{drafts:{autosave:{interval:1500}},max:30},hooks:{afterChange:[settingsChanged]},admin:{group:'Settings',preview:()=>'/api/preview?slug=home'}};
export const Site:GlobalConfig = {
 ...base,slug:'site',endpoints:[restoreGlobal('site')],label:'Site settings',
 fields:[{name:'name',type:'text',required:true},{name:'description',type:'textarea'},{name:'email',type:'email',required:true},{name:'location',type:'text'},{name:'availability',type:'text'},
 {name:'logo',type:'upload',relationTo:'media'},
 {name:'navigation',type:'array',fields:[{name:'label',type:'text',required:true},{name:'href',type:'text',required:true,validate:validLink}]},
 {name:'contactLabel',type:'text',defaultValue:"Let's talk"},{name:'contactHref',type:'text',defaultValue:'/contact',validate:validLink},
 {name:'socials',type:'array',fields:[{name:'label',type:'text',required:true},{name:'href',type:'text',required:true,validate:validLink}]},
 {name:'seoImage',type:'upload',relationTo:'media'},
 ],
};
function palette(name:string,defaults:string[]):Field {return {name,type:'group',fields:['background','foreground','paper','ink','accent','warmAccent'].map((key,i)=>({name:key,type:'text',required:true,defaultValue:defaults[i],validate:validColor}))};}
export const Design:GlobalConfig = {
 ...base,slug:'design',endpoints:[restoreGlobal('design')],label:'Design settings',
 fields:[
 palette('light',['#ffffff','#11120f','#f7f7f4','#11120f','#6f8cff','#d38b67']),
 palette('dark',['#11120f','#f7f7f4','#171815','#080907','#6f8cff','#d38b67']),
 {name:'font',type:'select',defaultValue:'current',options:[{label:'Current · Baloo Thambi',value:'current'},{label:'System sans serif',value:'sans'},{label:'System serif',value:'serif'}]},
 {name:'defaultTheme',type:'select',defaultValue:'system',options:['system','light','dark']},
 {name:'textScale',type:'number',defaultValue:1,min:0.85,max:1.2},
 {name:'contentWidth',type:'number',defaultValue:1380,min:960,max:1600},
 {name:'spacing',type:'number',defaultValue:1,min:0.6,max:1.5},
 {name:'radius',type:'number',defaultValue:1,min:0,max:2},
 {name:'motion',type:'select',defaultValue:'full',options:['full','reduced']},
 ],
};
export const globals = [Site,Design];
