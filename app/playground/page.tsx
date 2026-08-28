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

export const metadata = {
  title: "Interactive Playground | Rakesh Biswal",
  description: "Interactive games and algorithm visualizers built with React.",
};

type Demo = { title: string; description: string; action: ComponentType };

const games: Demo[] = [
  { title: "Tech Stack Memory", description: "Pattern recognition and memory, built around familiar engineering tools.", action: MemoryGameModal },
  { title: "Tic-Tac-Toe AI", description: "An unbeatable opponent powered by the minimax algorithm.", action: TicTacToeModal },
  { title: "Classic Snake", description: "Grid movement, collision logic, and an escalating score loop.", action: SnakeGameModal },
  { title: "2048", description: "Tile merging, keyboard controls, and state-driven puzzle mechanics.", action: Game2048Modal },
  { title: "Simon Says", description: "A sequence memory challenge with increasingly difficult patterns.", action: SimonSaysModal },
];

const visualizers: Demo[] = [
  { title: "Tower of Hanoi", description: "Recursive problem-solving visualized move by move.", action: TowerOfHanoiModal },
  { title: "Pathfinding", description: "Compare A*, Dijkstra, breadth-first, and depth-first search.", action: PathfindingModal },
  { title: "Sorting", description: "See how classic sorting strategies transform the same data.", action: SortingModal },
  { title: "Binary Search Tree", description: "Explore insert, search, and delete operations spatially.", action: BSTModal },
  { title: "N-Queens", description: "Watch backtracking navigate a classic constraint problem.", action: NQueensModal },
  { title: "Maze Solver", description: "Generate a maze and compare routes through it.", action: MazeModal },
  { title: "Node.js Event Loop", description: "Follow work through the stack, microtasks, and libuv phases.", action: EventLoopModal },
  { title: "Promise Combinators", description: "Compare all, race, allSettled, and any in real time.", action: PromiseModal },
];

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

export default function PlaygroundPage() {
  return (
    <div className="inner-page playground-page">
      <section className="inner-hero page-wrap">
        <div className="section-kicker"><span>03</span> Interactive playground</div>
        <WordReveal className="inner-title" text="Small experiments. Serious curiosity." />
        <div className="inner-hero-foot">
          <p>Playable ideas and visual explanations built to make algorithms, state, and browser behavior tangible.</p>
          <span>13 EXPERIMENTS / ALWAYS EVOLVING</span>
        </div>
      </section>

      <section className="playground-section section-paper">
        <div className="page-wrap section-pad">
          <Reveal><div className="section-kicker"><span>01</span> Games</div><h2 className="playground-heading">Logic you can play.</h2></Reveal>
          <DemoGrid items={games} type="game" />
        </div>
      </section>

      <section className="playground-section section-light">
        <div className="page-wrap section-pad">
          <Reveal><div className="section-kicker"><span>02</span> Visual systems</div><h2 className="playground-heading">Concepts you can see.</h2></Reveal>
          <DemoGrid items={visualizers} type="system" />
        </div>
      </section>
    </div>
  );
}
