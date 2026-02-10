import Link from "next/link";
import { ArrowLeft, Gamepad2, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
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
    description:
        "Interactive games and algorithm visualizers showcasing game development and computer science fundamentals.",
};

export default function PlaygroundPage() {
    return (
        <div className="relative flex flex-col min-h-screen">
            {/* Background gradient */}
            <div
                className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_80%_70%_at_50%_10%,_var(--color-hero-glow)_0%,_transparent_55%)]"
                aria-hidden
            />

            {/* Header */}
            <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="mx-auto flex h-16 w-full items-center justify-between px-6 sm:px-10 lg:px-16">
                    <Link href="/" className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
                        <ArrowLeft className="size-4" />
                        Back to Portfolio
                    </Link>
                    <h1 className="text-lg font-bold">Interactive Playground</h1>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1">
                {/* Hero Section */}
                <section className="border-b border-border/40">
                    <div className="mx-auto flex w-full flex-col gap-6 px-6 py-16 sm:px-10 md:py-20 lg:px-16">
                        <div className="space-y-3 text-center">
                            <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                                Interactive Playground
                            </h1>
                            <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                                Explore interactive games and algorithm visualizers that showcase game development skills
                                and computer science fundamentals.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Games Section */}
                <section id="games" className="scroll-mt-16 border-b border-border/40 bg-accent/30">
                    <div className="mx-auto flex w-full flex-col gap-10 px-6 py-16 sm:px-10 md:py-24 lg:px-16">
                        <div className="space-y-2">
                            <p className="flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                                <Gamepad2 className="size-4" />
                                Interactive Games
                            </p>
                            <h2 className="text-center text-3xl font-bold text-foreground sm:text-4xl">
                                Mini Games
                            </h2>
                            <p className="mx-auto max-w-2xl text-center text-sm text-muted-foreground">
                                Fun, interactive games built with React showcasing UI/UX design and game logic.
                            </p>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
                            {/* Memory Game */}
                            <Card className="overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Gamepad2 className="size-5 text-primary" />
                                        Tech Stack Memory Game
                                    </CardTitle>
                                    <CardDescription>
                                        Match pairs of tech logos and test your memory skills
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="flex flex-col items-center gap-4">
                                    <MemoryGameModal />
                                </CardContent>
                            </Card>

                            {/* Tic-Tac-Toe */}
                            <Card className="overflow-hidden border-2 border-purple-500/20 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Gamepad2 className="size-5 text-purple-500" />
                                        Tic-Tac-Toe vs AI
                                    </CardTitle>
                                    <CardDescription>
                                        Challenge an unbeatable AI powered by minimax algorithm
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="flex flex-col items-center gap-4">
                                    <TicTacToeModal />
                                </CardContent>
                            </Card>

                            {/* Snake Game */}
                            <Card className="overflow-hidden border-2 border-green-500/20 bg-gradient-to-br from-green-500/5 via-emerald-500/5 to-teal-500/5">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Gamepad2 className="size-5 text-green-500" />
                                        Classic Snake Game
                                    </CardTitle>
                                    <CardDescription>
                                        Control the snake and eat food to grow longer
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="flex flex-col items-center gap-4">
                                    <SnakeGameModal />
                                </CardContent>
                            </Card>

                            {/* 2048 Game */}
                            <Card className="overflow-hidden border-2 border-yellow-500/20 bg-gradient-to-br from-amber-500/5 via-yellow-500/5 to-orange-500/5">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Gamepad2 className="size-5 text-yellow-600" />
                                        2048 Puzzle Game
                                    </CardTitle>
                                    <CardDescription>
                                        Merge tiles to reach 2048 and beyond
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="flex flex-col items-center gap-4">
                                    <Game2048Modal />
                                </CardContent>
                            </Card>

                            {/* Simon Says */}
                            <Card className="overflow-hidden border-2 border-pink-500/20 bg-gradient-to-br from-rose-500/5 via-pink-500/5 to-fuchsia-500/5">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Gamepad2 className="size-5 text-pink-500" />
                                        Simon Says Memory
                                    </CardTitle>
                                    <CardDescription>
                                        Watch the pattern and repeat it perfectly
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="flex flex-col items-center gap-4">
                                    <SimonSaysModal />
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* Algorithm Visualizers Section */}
                <section id="algorithms" className="scroll-mt-16 border-b border-border/40">
                    <div className="mx-auto flex w-full flex-col gap-10 px-6 py-16 sm:px-10 md:py-24 lg:px-16">
                        <div className="space-y-2">
                            <p className="flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                                <Cpu className="size-4" />
                                Algorithm Visualizers
                            </p>
                            <h2 className="text-center text-3xl font-bold text-foreground sm:text-4xl">
                                Intresting Concepts Visualized
                            </h2>
                            <p className="mx-auto max-w-2xl text-center text-sm text-muted-foreground">
                                Interactive visualizations of classic algorithms and data structures.
                            </p>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
                            {/* Tower of Hanoi */}
                            <Card className="overflow-hidden border-2 border-teal-500/20 bg-gradient-to-br from-emerald-500/5 via-teal-500/5 to-cyan-500/5">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Cpu className="size-5 text-teal-500" />
                                        Tower of Hanoi
                                    </CardTitle>
                                    <CardDescription>
                                        Recursive algorithm • 2ⁿ - 1 optimal moves
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="flex flex-col items-center gap-4">
                                    <TowerOfHanoiModal />
                                </CardContent>
                            </Card>

                            {/* Pathfinding */}
                            <Card className="overflow-hidden border-2 border-purple-500/20 bg-gradient-to-br from-violet-500/5 via-purple-500/5 to-fuchsia-500/5">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Cpu className="size-5 text-purple-500" />
                                        Pathfinding Algorithms
                                    </CardTitle>
                                    <CardDescription>
                                        A* • Dijkstra • BFS • DFS
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="flex flex-col items-center gap-4">
                                    <PathfindingModal />
                                </CardContent>
                            </Card>

                            {/* Sorting */}
                            <Card className="overflow-hidden border-2 border-red-500/20 bg-gradient-to-br from-orange-500/5 via-red-500/5 to-pink-500/5">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Cpu className="size-5 text-red-500" />
                                        Sorting Algorithms
                                    </CardTitle>
                                    <CardDescription>
                                        Quick • Merge • Bubble • More
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="flex flex-col items-center gap-4">
                                    <SortingModal />
                                </CardContent>
                            </Card>

                            {/* Binary Search Tree */}
                            <Card className="overflow-hidden border-2 border-blue-500/20 bg-gradient-to-br from-indigo-500/5 via-blue-500/5 to-cyan-500/5">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Cpu className="size-5 text-blue-500" />
                                        Binary Search Tree
                                    </CardTitle>
                                    <CardDescription>
                                        Insert • Search • Delete operations
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="flex flex-col items-center gap-4">
                                    <BSTModal />
                                </CardContent>
                            </Card>

                            {/* N-Queens */}
                            <Card className="overflow-hidden border-2 border-amber-500/20 bg-gradient-to-br from-amber-500/5 via-yellow-500/5 to-orange-500/5">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Cpu className="size-5 text-amber-500" />
                                        N-Queens Problem
                                    </CardTitle>
                                    <CardDescription>
                                        Backtracking • Classic puzzle
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="flex flex-col items-center gap-4">
                                    <NQueensModal />
                                </CardContent>
                            </Card>

                            {/* Maze Solver */}
                            <Card className="overflow-hidden border-2 border-slate-500/20 bg-gradient-to-br from-slate-500/5 via-gray-500/5 to-zinc-500/5">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Cpu className="size-5 text-slate-500" />
                                        Maze Solver
                                    </CardTitle>
                                    <CardDescription>
                                        A* • BFS • DFS pathfinding
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="flex flex-col items-center gap-4">
                                    <MazeModal />
                                </CardContent>
                            </Card>

                            {/* Node.js Event Loop */}
                            <Card className="overflow-hidden border-2 border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 via-teal-500/5 to-cyan-500/5">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Cpu className="size-5 text-emerald-500" />
                                        Node.js Event Loop
                                    </CardTitle>
                                    <CardDescription>
                                        Call Stack • Microtasks • Libuv
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="flex flex-col items-center gap-4">
                                    <EventLoopModal />
                                </CardContent>
                            </Card>

                            {/* Promise Combinators */}
                            <Card className="overflow-hidden border-2 border-violet-500/20 bg-gradient-to-br from-violet-500/5 via-purple-500/5 to-fuchsia-500/5">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Cpu className="size-5 text-violet-500" />
                                        Promise Visualizer
                                    </CardTitle>
                                    <CardDescription>
                                        Promise.all • race • allSettled • any
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="flex flex-col items-center gap-4">
                                    <PromiseModal />
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="border-t border-border/40 py-8">
                <div className="mx-auto px-6 sm:px-10 lg:px-16 text-center">
                    <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                        <ArrowLeft className="size-4" />
                        Back to Main Portfolio
                    </Link>
                </div>
            </footer>
        </div>
    );
}
