import type { ComponentType } from 'react';
import { Code2, Layers3, Rocket, Users2, Smartphone, Presentation } from 'lucide-react';
import { MemoryGameModal } from '@/components/memory-game-modal';
import { TicTacToeModal } from '@/components/tic-tac-toe-modal';
import { SnakeGameModal } from '@/components/snake-game-modal';
import { Game2048Modal } from '@/components/2048-game-modal';
import { SimonSaysModal } from '@/components/simon-says-modal';
import { TowerOfHanoiModal } from '@/components/tower-of-hanoi-modal';
import { PathfindingModal } from '@/components/pathfinding-modal';
import { SortingModal } from '@/components/sorting-modal';
import { BSTModal } from '@/components/bst-modal';
import { NQueensModal } from '@/components/nqueens-modal';
import { MazeModal } from '@/components/maze-modal';
import { EventLoopModal } from '@/components/eventloop-modal';
import { PromiseModal } from '@/components/promise-modal';
import { defaultSite, defaultCareer, defaultTestimonials, defaultPlayground } from './defaults';
export type Content = Record<string,unknown>;
export type Shared = {
 site:typeof defaultSite;
 career:typeof defaultCareer;
 testimonials:typeof defaultTestimonials;
 playground:typeof defaultPlayground;
 projects:Content[];
};
export type TemplateProps={data:Content;shared:Shared};
export function t(data:Content,key:string){return typeof data[key]==='string'?data[key] as string:'';}
export function asset(data:Content,key:string){
 const value=data[key];const url=typeof value==='string'?value:value&&typeof value==='object'&&'url' in value?String(value.url||''):'/file.svg';
 if(/^https?:\/\//.test(url)){try{const parsed=new URL(url);if(parsed.pathname.startsWith('/api/media/file/'))return parsed.pathname;}catch{}}
 return url||'/file.svg';
}
export function rows(data:Content,key:string):Content[]{return Array.isArray(data[key])?(data[key] as Content[]):[];}
export function strings(data:Content,key:string):string[]{return rows(data,key).map(item=>String(item.value??''));}
const icons={Code2,Layers3,Rocket,Users2,Smartphone,Presentation};
export function iconFor(name:string){return icons[name as keyof typeof icons]||Code2;}
export const demos:Record<string,ComponentType>={MemoryGameModal,TicTacToeModal,SnakeGameModal,Game2048Modal,SimonSaysModal,TowerOfHanoiModal,PathfindingModal,SortingModal,BSTModal,NQueensModal,MazeModal,EventLoopModal,PromiseModal};
export function demoFor(name:string){return demos[name]||(()=>null);}
