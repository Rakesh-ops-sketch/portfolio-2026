import { restoreVersionOperationGlobal, restoreVersionOperation } from 'payload';
import type { CollectionSlug, Endpoint, GlobalSlug } from 'payload';
// Every admin/API restoration starts as a draft; publishing remains explicit.
export function restoreCollection(slug:CollectionSlug):Endpoint {
 return {path:'/versions/:id',method:'post',handler:async req=>{
  if(!req.user)return new Response('Authentication required.',{status:401});
  const doc=await restoreVersionOperation({collection:req.payload.collections[slug],id:String(req.routeParams?.id),draft:true,req,overrideAccess:false});
  return Response.json({...doc,message:'Version restored as a draft.'});
 }};
}
export function restoreGlobal(slug:GlobalSlug):Endpoint {
 return {path:'/versions/:id',method:'post',handler:async req=>{
  if(!req.user)return new Response('Authentication required.',{status:401});
  const globalConfig=req.payload.globals.config.find(global=>global.slug===slug)!;
  const doc=await restoreVersionOperationGlobal({globalConfig,id:String(req.routeParams?.id),draft:true,req,overrideAccess:false});
  return Response.json({doc,message:'Version restored as a draft.'});
 }};
}
