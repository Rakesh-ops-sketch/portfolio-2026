import type { NextConfig } from 'next';
import { withPayload } from '@payloadcms/next/withPayload';
const nextConfig: NextConfig = {
 images:{remotePatterns:[{protocol:'https',hostname:'**.public.blob.vercel-storage.com'},...(process.env.NODE_ENV==='development'?[{protocol:'http' as const,hostname:'localhost',port:'3000',pathname:'/api/media/file/**'}]:[])]},
 async headers(){return [{source:'/admin/:path*',headers:[{key:'Cache-Control',value:'private, no-store'},{key:'X-Robots-Tag',value:'noindex, nofollow'}]},{source:'/api/:path*',headers:[{key:'Cache-Control',value:'private, no-store'}]}];},
};
export default withPayload(nextConfig);
