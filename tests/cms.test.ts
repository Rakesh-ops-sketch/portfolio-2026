import { asset } from '../cms/render-helpers';
import { closePayload } from '../scripts/close-payload';
import test from 'node:test';
import assert from 'node:assert/strict';
import { PGlite } from '@electric-sql/pglite';
import { PGLiteSocketServer } from '@electric-sql/pglite-socket';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { validSlug, validLink, validColor } from '../cms/security';
import { defaultPages, defaultProjects, defaultCareer, defaultTestimonials, defaultPlayground } from '../cms/defaults';

test('validate reserved routes, links, and theme colors',()=>{
 for(const slug of ['admin','api','preview','../about','hello/world','About'])assert.notEqual(validSlug(slug),true);
 for(const slug of ['home','about','my-new-page'])assert.equal(validSlug(slug),true);
 for(const url of ['javascript:alert(1)','//evil.test','data:text/html,x'])assert.notEqual(validLink(url),true);
 for(const url of ['/work','#contact','https://example.com','mailto:owner@example.com'])assert.equal(validLink(url),true);
 assert.equal(validColor('#abcdef'),true);assert.notEqual(validColor('red;display:none'),true);
});

test('local uploads use portable paths and hosted uploads retain their URLs',()=>{
 assert.equal(asset({image:{url:'http://localhost:3000/api/media/file/photo.png'}},'image'),'/api/media/file/photo.png');
 assert.equal(asset({image:{url:'https://abc.public.blob.vercel-storage.com/photo.png'}},'image'),'https://abc.public.blob.vercel-storage.com/photo.png');
});

test('migration seeds every page, project, career record, testimonial, and demo',()=>{
 assert.equal(defaultPages.length,5);assert.equal(defaultProjects.length,3);assert.equal(defaultCareer.length,4);assert.equal(defaultTestimonials.length,3);assert.equal(defaultPlayground.length,13);
 assert.ok(defaultPages[0].sections.some(section=>section.blockType==='projectPresentation'));
 assert.ok(!JSON.stringify(defaultPages).includes('&apos;'));
});

test('Postgres migration, owner access, draft isolation, publish, restore, seed safety, and uploads', {timeout:120000},async()=>{
 const root=await mkdtemp(path.join(tmpdir(),'portfolio-cms-test-'));const db=await PGlite.create();
 const server=new PGLiteSocketServer({db,path:path.join(root,'.s.PGSQL.5432'),maxConnections:10});
 let payload:Awaited<ReturnType<typeof import('payload').getPayload>>|undefined;
 try{
  await server.start();
  process.env.DATABASE_URL=`postgresql://postgres:postgres@localhost/postgres?host=${encodeURIComponent(root)}`;
  process.env.PAYLOAD_SECRET='isolated-test-secret-with-at-least-32-characters';
  process.env.CMS_DB_POOL_MAX='5';
  const {getPayload}=await import('payload');const {default:base}=await import('../payload.config');
  const config=await base;const media=config.collections.find(c=>c.slug==='media')!;
  if(typeof media.upload==='object')media.upload.staticDir=path.join(root,'media');
  payload=await getPayload({config});
  await payload.db.migrate();
  await assert.rejects(()=>payload!.create({collection:'users',data:{name:'Intruder',email:'intruder@example.test',password:'test-password-long'},overrideAccess:false}));
  const user=await payload.create({collection:'users',data:{name:'Owner',email:'owner@example.test',password:'test-password-long'},overrideAccess:true});
  const owner={...user,collection:'users' as const};
  const {seedPortfolio}=await import('../scripts/seed');await seedPortfolio(payload);
  assert.equal((await payload.count({collection:'pages'})).totalDocs,5);
  assert.equal((await payload.count({collection:'playground'})).totalDocs,13);
  const project=await payload.find({collection:'projects',where:{slug:{equals:'neev'}},overrideAccess:true});assert.equal(project.docs[0].presentations?.length,2);
  const page=(await payload.find({collection:'pages',where:{slug:{equals:'home'}},overrideAccess:false})).docs[0];
  await assert.rejects(()=>payload!.update({collection:'pages',id:page.id,data:{title:'Intrusion'},overrideAccess:false}));
  await assert.rejects(()=>payload!.findGlobal({slug:'site',overrideAccess:false}));
  const draft=await payload.create({collection:'pages',data:{title:'Private draft',slug:'draft-test',sections:[{blockType:'hero',heading:'Private'}],_status:'draft'},draft:true,user:owner,overrideAccess:false,context:{skipRevalidation:true}});
  assert.equal((await payload.find({collection:'pages',draft:true,where:{id:{equals:draft.id}},overrideAccess:false})).docs.length,0);
  assert.equal((await payload.find({collection:'pages',draft:true,where:{id:{equals:draft.id}},user:owner,overrideAccess:false})).docs[0].title,'Private draft');
  await payload.update({collection:'pages',id:page.id,data:{title:'Draft home'},draft:true,user:owner,overrideAccess:false,context:{skipRevalidation:true}});
  const publicHome=await payload.findByID({collection:'pages',id:page.id,overrideAccess:false});assert.equal(publicHome.title,'Home');
  await payload.update({collection:'pages',id:page.id,data:{title:'Published home',_status:'published'},user:owner,overrideAccess:false,context:{skipRevalidation:true}});
  assert.equal((await payload.findByID({collection:'pages',id:page.id,overrideAccess:false})).title,'Published home');
  await assert.rejects(()=>payload!.findVersions({collection:'pages',overrideAccess:false}));
  const versions=await payload.findVersions({collection:'pages',where:{parent:{equals:page.id}},user:owner,overrideAccess:false,limit:30});
  const old=versions.docs.find(v=>v.version.title==='Home')!;
  const {createLocalReq}=await import('payload');const {restoreCollection}=await import('../cms/restore');
  const restoreReq=await createLocalReq({user:owner,context:{skipRevalidation:true}},payload);restoreReq.routeParams={id:String(old.id)};
  await restoreCollection('pages').handler(restoreReq);
  assert.equal((await payload.findByID({collection:'pages',id:page.id,overrideAccess:false})).title,'Published home');
  await payload.updateGlobal({slug:'site',data:{name:'Unpublished name'},draft:true,user:owner,overrideAccess:false,context:{skipRevalidation:true}});
  assert.equal((await payload.findGlobal({slug:'site',draft:false,overrideAccess:true})).name,'Rakesh Biswal');
  const upload=await payload.find({collection:'media',overrideAccess:false});assert.ok(upload.docs.length>=4);assert.ok(upload.docs[0].url);
  await seedPortfolio(payload);assert.equal((await payload.count({collection:'pages'})).totalDocs,6);
  assert.equal((await payload.findByID({collection:'pages',id:page.id,overrideAccess:false})).title,'Published home');
  await payload.update({collection:'pages',id:draft.id,data:{_status:'published'},user:owner,overrideAccess:false,context:{skipRevalidation:true}});
  await payload.update({collection:'pages',id:draft.id,data:{_status:'draft'},user:owner,overrideAccess:false,context:{skipRevalidation:true}});
  assert.equal((await payload.find({collection:'pages',where:{id:{equals:draft.id}},overrideAccess:false})).docs.length,0);
 }catch(error){console.error(error);throw error;}finally{if(payload)await closePayload(payload);await server.stop();await db.close();await rm(root,{recursive:true,force:true});}
});
