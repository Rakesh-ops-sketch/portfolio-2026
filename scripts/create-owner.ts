import { closePayload } from './close-payload';
import env from '@next/env';
import { createInterface } from 'node:readline/promises';
import { Writable } from 'node:stream';
env.loadEnvConfig(process.cwd());
if(!process.env.DATABASE_URL)throw new Error('Set DATABASE_URL in .env.local first.');
if(!process.env.PAYLOAD_SECRET)throw new Error('Set PAYLOAD_SECRET in .env.local first.');
const {getPayload}=await import('payload');const {default:config}=await import('../payload.config');
const payload=await getPayload({config});
try{
 const existing=await payload.count({collection:'users',overrideAccess:true});
 if(existing.totalDocs)throw new Error('Owner already exists. Change the password through /admin/account.');
 let muted=false;const output=new Writable({write(chunk,_encoding,callback){if(!muted)process.stdout.write(chunk);callback();}});
 const rl=createInterface({input:process.stdin,output,terminal:true});
 try{
  const name=await rl.question('Owner name: ');const email=await rl.question('Owner email: ');
  process.stdout.write('Password (at least 12 characters; hidden): ');muted=true;const password=await rl.question('');muted=false;process.stdout.write('\n');
  if(password.length<12)throw new Error('Use a password with at least 12 characters.');
  await payload.create({collection:'users',data:{name,email,password},overrideAccess:true});
  console.log('Owner created. Sign in at /admin.');
 }finally{rl.close();}
}finally{await closePayload(payload);}
