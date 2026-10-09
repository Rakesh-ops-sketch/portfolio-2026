import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getPage } from '@/cms/data';
import { PortfolioPage } from '@/components/cms/page-renderer';
import { pageMetadata } from '@/cms/metadata';
type Props={params:Promise<{slug:string}>};
export async function generateMetadata({params}:Props):Promise<Metadata>{const {slug}=await params;return pageMetadata(slug);}
export default async function Page({params}:Props){const {slug}=await params;const {page,shared}=await getPage(slug);if(!page)notFound();return <PortfolioPage page={page} shared={shared}/>;}
