import type { ReactNode } from 'react';
import { RootLayout, handleServerFunctions } from '@payloadcms/next/layouts';
import type { ServerFunctionClient } from 'payload';
import config from '@payload-config';
import '@payloadcms/next/css';
import { importMap } from './admin/importMap';
const serverFunction:ServerFunctionClient = async args => {
 'use server';
 return handleServerFunctions({...args,config,importMap});
};
export default function Layout({children}:{children:ReactNode}) {if(!process.env.DATABASE_URL)return <html lang="en"><body>{children}</body></html>;return <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>{children}</RootLayout>;}
