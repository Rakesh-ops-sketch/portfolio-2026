import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob';
import sharp from 'sharp';
import { collections } from './cms/collections';
import { globals } from './cms/globals';
const dirname=path.dirname(fileURLToPath(import.meta.url));
if(process.env.DATABASE_URL && !process.env.PAYLOAD_SECRET)throw new Error('Set PAYLOAD_SECRET before enabling the CMS.');
export default buildConfig({
 secret:process.env.PAYLOAD_SECRET || 'development-only-set-PAYLOAD_SECRET-before-deploying',
 serverURL:process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
 admin:{user:'users',disable:!process.env.DATABASE_URL,importMap:{baseDir:dirname},components:{beforeDashboard:['/components/cms/admin-guide#AdminGuide']},meta:{titleSuffix:' · Portfolio CMS'}},
 collections,globals,editor:lexicalEditor(),sharp,
 db:postgresAdapter({blocksAsJSON:true,pool:{connectionString:process.env.DATABASE_URL || 'postgres://localhost:5432/portfolio',max:Number(process.env.CMS_DB_POOL_MAX||5)},push:false,migrationDir:path.resolve(dirname,'cms/migrations')}),
 plugins:[vercelBlobStorage({alwaysInsertFields:true,enabled:Boolean(process.env.BLOB_READ_WRITE_TOKEN),collections:{media:{disablePayloadAccessControl:true}},token:process.env.BLOB_READ_WRITE_TOKEN || ''})],
 typescript:{outputFile:path.resolve(dirname,'payload-types.ts')},
 onInit:()=>{if(process.env.NODE_ENV==='production' && (!process.env.PAYLOAD_SECRET || !process.env.BLOB_READ_WRITE_TOKEN))throw new Error('Production CMS requires PAYLOAD_SECRET and BLOB_READ_WRITE_TOKEN.');},
});
