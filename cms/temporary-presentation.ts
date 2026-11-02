import type { Content, Shared } from './render-helpers';

// Temporary portfolio presentation. Original CMS records and case studies stay
// intact; remove this adapter from getSnapshot() to restore them.
export function temporaryPresentation<T extends { pages: Content[]; shared: Shared }>(snapshot: T): T {
 const sectionsToPause = new Set(['homeSection2', 'homeSection3', 'homeSection4', 'neevWork', 'evaluationWork', 'etalkWork', 'workSection2', 'projectPresentation']);
 const pages: Content[] = snapshot.pages.filter(page => page.slug !== 'work').map(page => ({
  ...page,
  ...(page.slug==='home'?{seo:{title:'Rakesh Biswal — Software Engineer',description:'Software engineer working across system design, web applications, backend services, and engineering teams.'}}:{}),
  sections: (page.sections as Content[] || []).flatMap(section => {
   const type = String(section.blockType);
   if (sectionsToPause.has(type)) return [];
   if (type === 'homeSection1') return [{...section, field3:'Rakesh Biswal · Software engineer', field4:'I build web applications, backend services, and the tools teams need to ship them. My work spans architecture, implementation, code reviews, and helping other engineers work through difficult problems.', field8:'I build software.\nAnd help teams ship it.', field9:'Read my engineering notes', field10:'/principles'}];
   if (type === 'aboutSection3') return [{...section, field11:'',field12:'',field13:'',field14:'',field15:'',pauseParallelChapter:true}];
   if (type === 'homeSection5') return [{blockType:'engineeringIntro'}, {...section, field1:'02',field3:'Architecture, code, and the people building it.',field4:'I stay involved from the first design discussion through implementation and release. These are the parts of engineering I spend the most time on.',field9:[
    {icon:'Layers3',number:'01',title:'System design',copy:'Data models, API boundaries, background jobs, and the trade-offs between keeping a system simple and making room for growth.'},
    {icon:'Code2',number:'02',title:'Implementation',copy:'Building interfaces and services, reviewing code, and tracing bugs across the application when the cause is not obvious.'},
    {icon:'Users2',number:'03',title:'Working with the team',copy:'Breaking down changes, discussing options in reviews, and helping engineers take ownership of the systems they maintain.'},
   ]}];
   if (type === 'homeSection6') return [{...section,field1:'03'}];
   if (type === 'homeSection7') return [{...section,field1:'04'}];
   return [section];
  }),
 }));
 pages.push({slug:'principles',title:'Design principles',shell:'inner-page',seo:{title:'Design principles — Rakesh Biswal',description:'Notes on application boundaries, background jobs, and database migrations.'},sections:[{blockType:'designPrinciples',}]});
 return {...snapshot, pages, shared:{
  ...snapshot.shared,
  site:{...snapshot.shared.site,description:'Software engineer working across system design, web applications, backend services, and engineering teams.',navigation:[{href:'/',label:'Home'},{href:'/about',label:'About'},{href:'/principles',label:'Principles'},{href:'/playground',label:'Playground'}]},
  projects:[],
  career:snapshot.shared.career.filter(item=>!(/cto|e[‑–-]?talk/i.test(item.role+' '+item.company))).map(item=>({...item,company:'',homeSummary:item.homeSummary.replace(/Led the Neev rebuild and high-stakes state deployments/i,'Led platform improvements and complex releases'),summary:item.summary.replace(/Led the Neev rebuild and high-stakes state deployments/i,'Led platform improvements and complex releases')})),
  testimonials:snapshot.shared.testimonials.map(item=>({...item,role:item.role.split(',')[0]})),
 }};
}
