import { notFound } from 'next/navigation';
import { getPage } from '@/cms/data';
import { PortfolioPage } from '@/components/cms/page-renderer';
import { pageMetadata } from '@/cms/metadata';
export const generateMetadata=()=>pageMetadata('home');
export default async function Home(){const {page,shared}=await getPage('home');if(!page)notFound();return <PortfolioPage page={page} shared={shared}/>;}
