import Link from 'next/link';
import { RootPage, generatePageMetadata } from '@payloadcms/next/views';
import config from '@payload-config';
import { importMap } from '../importMap';
type Props = {params:Promise<{segments:string[]}>;searchParams:Promise<Record<string,string|string[]>>};
export const dynamic="force-dynamic";
export const generateMetadata = ({params,searchParams}:Props) => !process.env.DATABASE_URL ? Promise.resolve({title:"CMS setup"}) : generatePageMetadata({config,params,searchParams});
export default function Admin({params,searchParams}:Props) {if(!process.env.DATABASE_URL)return <main style={{maxWidth:640,margin:"80px auto",fontFamily:"system-ui",padding:24}}><h1>Set up your portfolio CMS</h1><p>The portfolio still uses its original content. To enable editing, configure DATABASE_URL and PAYLOAD_SECRET in .env.local, run the migration, owner setup, and seed commands, then restart the dev server.</p><pre>npm run cms:migrate<br/>npm run cms:owner<br/>npm run cms:seed</pre><Link href="/">Back to portfolio</Link></main>;return RootPage({config,params,searchParams,importMap});}
