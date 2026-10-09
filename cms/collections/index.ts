import type { CollectionConfig, Field, TextField } from 'payload';
import { restoreCollection } from '../restore';
import { blocks, legacyBlocks } from '../blocks';
import { owner, published, validSlug } from '../security';
import { contentChanged, contentDeleted } from '../hooks';
const versions = { drafts:{autosave:{interval:1500}},maxPerDoc:30 };
const access = {readVersions:owner,read:published,create:owner,update:owner,delete:owner};
const hooks = {afterChange:[contentChanged],afterDelete:[contentDeleted]};
const strings = (name:string):Field => ({name,type:'array',fields:[{name:'value',type:'text',required:true}]});
const text = (name:string,required=false):TextField => ({name,type:'text',required});
const textarea = (name:string):Field => ({name,type:'textarea'});
const preview = ({data}:{data:Record<string,unknown>}) => `/api/preview?slug=${encodeURIComponent(String(data.slug || 'home'))}`;
export const Users:CollectionConfig = {
  slug:'users',auth:{maxLoginAttempts:5,lockTime:600000},
  admin:{useAsTitle:'email',group:'Settings'},
  access:{admin:owner,read:owner,create:()=>false,update:owner,delete:()=>false},
  endpoints:process.env.CMS_LOCAL_SETUP==='1' && process.env.NODE_ENV==='development' ? [] : [{path:'/first-register',method:'post',handler:()=>new Response('Use the owner setup script.',{status:403})}],
  fields:[text('name',true)],
};
export const Pages:CollectionConfig = {
 slug:'pages',access,versions,hooks,endpoints:[restoreCollection('pages')],
 admin:{useAsTitle:'title',group:'Content',defaultColumns:['title','slug','_status','updatedAt'],preview:(doc)=>preview({data:doc}),livePreview:{url:preview}},
 fields:[text('title',true),{...text('slug',true),unique:true,index:true,validate:validSlug},
  {name:'shell',type:'select',defaultValue:'inner-page',options:['portfolio-shell','inner-page','inner-page work-page work-page-detailed','inner-page playground-page','contact-page']},
  {name:'seo',type:'group',fields:[text('title'),textarea('description'),{name:'image',type:'upload',relationTo:'media'},{name:'noIndex',type:'checkbox'}]},
  {name:'sections',type:'blocks',blocks,required:true},
 ],
};
export const Projects:CollectionConfig = {
 slug:'projects',access,versions,hooks,endpoints:[restoreCollection('projects')],admin:{useAsTitle:'title',group:'Content',preview:()=>'/api/preview?slug=work'},
 fields:[text('title',true),{...text('slug',true),unique:true},textarea('summary'),text('role'),text('category'),strings('technologies'),
 {name:'image',type:'upload',relationTo:'media'},
 {name:'presentations',type:'blocks',blocks:legacyBlocks.filter(b=>['homeSection2','homeSection3','homeSection4','neevWork','evaluationWork','etalkWork'].includes(b.slug))}],
};
export const Career:CollectionConfig = {
 slug:'career',access,versions,hooks,endpoints:[restoreCollection('career')],admin:{useAsTitle:'role',group:'Content',preview:()=>'/api/preview?slug=about'},
 fields:[text('role',true),text('company'),text('period'),{name:'order',type:'number',defaultValue:0},text('chapter'),text('headline'),textarea('summary'),textarea('homeSummary'),strings('responsibilities'),textarea('growth'),{name:'icon',type:'select',options:['Code2','Layers3','Rocket','Users2'],defaultValue:'Code2'}],
};
export const Testimonials:CollectionConfig = {
 slug:'testimonials',access,versions,hooks,endpoints:[restoreCollection('testimonials')],admin:{useAsTitle:'name',group:'Content',preview:()=>'/api/preview?slug=home'},
 fields:[text('name',true),text('role'),{name:'quote',type:'textarea',required:true},{name:'order',type:'number',defaultValue:0}],
};
export const demoIDs = ['MemoryGameModal','TicTacToeModal','SnakeGameModal','Game2048Modal','SimonSaysModal','TowerOfHanoiModal','PathfindingModal','SortingModal','BSTModal','NQueensModal','MazeModal','EventLoopModal','PromiseModal'];
export const Playground:CollectionConfig = {
 slug:'playground',access,versions,hooks,endpoints:[restoreCollection('playground')],admin:{useAsTitle:'title',group:'Content',preview:()=>'/api/preview?slug=playground'},
 fields:[text('title',true),textarea('description'),{name:'demo',type:'select',required:true,options:demoIDs},{name:'category',type:'select',required:true,options:['game','system']},{name:'order',type:'number',defaultValue:0},{name:'hidden',type:'checkbox',defaultValue:false}],
};
export const Media:CollectionConfig = {
 slug:'media',access:{read:()=>true,create:owner,update:owner,delete:owner},
 admin:{useAsTitle:'alt',group:'Content'},
 upload:{staticDir:'media',mimeTypes:['image/jpeg','image/png','image/webp','image/avif','image/gif'],imageSizes:[{name:'thumbnail',width:400},{name:'large',width:1600}],focalPoint:true},
 fields:[text('alt',true),textarea('caption'),{...text('sourcePath'),unique:true,admin:{hidden:true}}],
};
export const collections = [Users,Pages,Projects,Career,Testimonials,Playground,Media];
