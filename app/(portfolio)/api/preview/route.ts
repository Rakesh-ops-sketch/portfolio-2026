import { draftMode } from 'next/headers';
import { NextResponse } from 'next/server';
import { currentOwner, payloadClient } from '@/cms/data';
import { validSlug } from '@/cms/security';
export async function GET(request:Request){
 const user=await currentOwner();if(!user)return new NextResponse('Sign in to the CMS to preview drafts.',{status:401});
 const slug=new URL(request.url).searchParams.get('slug')||'home';if(validSlug(slug)!==true)return new NextResponse('Invalid page slug.',{status:400});
 const payload=await payloadClient();const result=await payload.find({collection:'pages',where:{slug:{equals:slug}},draft:true,user,overrideAccess:false,limit:1});
 if(!result.docs.length)return new NextResponse('Page not found.',{status:404});
 (await draftMode()).enable();return NextResponse.redirect(new URL(slug==='home'?'/':`/${slug}`,request.url));
}
