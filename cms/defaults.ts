import seed from './generated/seed.json';
export const defaultSite = {
 name:'Rakesh Biswal',description:'Engineering Lead building offline-first mobile and backend platforms for large-scale education initiatives.',email:'hsekar.bat@gmail.com',location:'Bengaluru, India',availability:'Available for meaningful work',logo:'/logo-wordmark-v2.png?v=20260821-2',
 navigation:[{href:'/',label:'Home'},{href:'/about',label:'About'},{href:'/work',label:'Work'},{href:'/playground',label:'Playground'}],contactLabel:"Let's talk",contactHref:'/contact',
 socials:[{label:'GitHub',href:'https://github.com/Rakesh-ops-sketch'},{label:'LinkedIn',href:'https://www.linkedin.com/in/lucifermsloh/'}],
};
export const defaultDesign = {
 light:{background:'#ffffff',foreground:'#11120f',paper:'#f7f7f4',ink:'#11120f',accent:'#6f8cff',warmAccent:'#d38b67'},
 dark:{background:'#11120f',foreground:'#f7f7f4',paper:'#171815',ink:'#080907',accent:'#6f8cff',warmAccent:'#d38b67'},
 font:'current',defaultTheme:'system',textScale:1,contentWidth:1380,spacing:1,radius:1,motion:'full',
};
export const defaultCareer = seed.shared.careerChapters.map((item,index)=>({...item,id:index+1,order:index,homeSummary:seed.shared.roles.find(role=>role.title===item.role)?.summary||item.summary}));
export const defaultTestimonials=seed.shared.testimonials.map((item,index)=>({...item,order:index}));
export const defaultPlayground=[...seed.shared.games,...seed.shared.visualizers].map((item,index)=>({...item,id:index+1,demo:item.action,order:index,category:index<seed.shared.games.length?'game':'system',hidden:false}));
export const defaultPages=seed.pages;

export const defaultProjects=seed.projects;
