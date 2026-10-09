/* eslint-disable @typescript-eslint/no-unused-vars */
import type { ComponentType } from "react";
import { Cpu, Gamepad2 } from "lucide-react";
import { Reveal, WordReveal } from "@/components/motion-primitives";
import { MemoryGameModal } from "@/components/memory-game-modal";
import { TicTacToeModal } from "@/components/tic-tac-toe-modal";
import { SnakeGameModal } from "@/components/snake-game-modal";
import { Game2048Modal } from "@/components/2048-game-modal";
import { SimonSaysModal } from "@/components/simon-says-modal";
import { TowerOfHanoiModal } from "@/components/tower-of-hanoi-modal";
import { PathfindingModal } from "@/components/pathfinding-modal";
import { SortingModal } from "@/components/sorting-modal";
import { BSTModal } from "@/components/bst-modal";
import { NQueensModal } from "@/components/nqueens-modal";
import { MazeModal } from "@/components/maze-modal";
import { EventLoopModal } from "@/components/eventloop-modal";
import { PromiseModal } from "@/components/promise-modal";
import { t, asset, rows, strings, iconFor, demoFor } from '@/cms/render-helpers';
import type { TemplateProps } from '@/cms/render-helpers';
function DemoGrid({ items, type }: { items: Demo[]; type: "game" | "system" }) {
  return (
    <div className="playground-grid">
      {items.map(({ title, description, action: Action }, index) => (
        <Reveal key={title} delay={(index % 3) * 0.06}>
          <article className="demo-card">
            <div className="demo-card-top">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <span>{type}</span>
            </div>
            <div className="demo-icon">{type === "game" ? <Gamepad2 /> : <Cpu />}</div>
            <h3>{title}</h3>
            <p>{description}</p>
            <div className="demo-action"><Action /></div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}


type Demo = { title:string; description:string; action:ComponentType };
export default function PlaygroundSection3({data,shared}:TemplateProps){
const visualizers = shared.playground.filter(item=>item.category==='system').map(item=>({...item, action:demoFor(item.demo)}));
return (<section className="playground-section section-light">
        <div className="page-wrap section-pad">
          <Reveal><div className="section-kicker"><span>{t(data, 'field1')}</span> {t(data, 'field2')}</div><WordReveal as="h2" className="playground-heading" text={t(data, 'field3')} /></Reveal>
          <DemoGrid items={visualizers} type="system" />
        </div>
      </section>);
}
