"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { RotateCcw, Play, Pause, Trophy, Zap, SkipForward } from "lucide-react";

type Move = { from: number; to: number };

export function TowerOfHanoi() {
    const [numDisks, setNumDisks] = useState(3);
    const [towers, setTowers] = useState<number[][]>([[], [], []]);
    const [moves, setMoves] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [solution, setSolution] = useState<Move[]>([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [speed, setSpeed] = useState(500);

    useEffect(() => {
        resetGame();
    }, [numDisks]);

    const resetGame = () => {
        const initialTower = Array.from({ length: numDisks }, (_, i) => numDisks - i);
        setTowers([initialTower, [], []]);
        setMoves(0);
        setIsAnimating(false);
        setIsPaused(false);
        setSolution([]);
        setCurrentStep(0);
    };

    const generateSolution = (n: number, from: number, to: number, aux: number, movesList: Move[] = []): Move[] => {
        if (n === 1) {
            movesList.push({ from, to });
            return movesList;
        }
        generateSolution(n - 1, from, aux, to, movesList);
        movesList.push({ from, to });
        generateSolution(n - 1, aux, to, from, movesList);
        return movesList;
    };

    const moveDisk = (from: number, to: number) => {
        setTowers((prev) => {
            const newTowers = prev.map((tower) => [...tower]);
            const disk = newTowers[from].pop();
            if (disk !== undefined) {
                newTowers[to].push(disk);
            }
            return newTowers;
        });
        setMoves((prev) => prev + 1);
    };

    const solvePuzzle = async () => {
        const solutionMoves = generateSolution(numDisks, 0, 2, 1);
        setSolution(solutionMoves);
        setIsAnimating(true);
        setIsPaused(false);
        setCurrentStep(0);

        for (let i = 0; i < solutionMoves.length; i++) {
            if (!isAnimating) break;
            setCurrentStep(i);
            await new Promise((resolve) => setTimeout(resolve, speed));
            moveDisk(solutionMoves[i].from, solutionMoves[i].to);
        }

        setIsAnimating(false);
    };

    const stepForward = () => {
        if (currentStep < solution.length) {
            moveDisk(solution[currentStep].from, solution[currentStep].to);
            setCurrentStep((prev) => prev + 1);
        }
    };

    const optimalMoves = Math.pow(2, numDisks) - 1;
    const isComplete = towers[2].length === numDisks;

    const diskColors = [
        "bg-red-500",
        "bg-orange-500",
        "bg-yellow-500",
        "bg-green-500",
        "bg-blue-500",
        "bg-indigo-500",
        "bg-purple-500",
    ];

    return (
        <div className="w-full max-w-4xl mx-auto">
            {/* Controls */}
            <div className="mb-6 space-y-4">
                <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Disks:</span>
                        <div className="flex gap-1">
                            {[3, 4, 5, 6, 7].map((n) => (
                                <Button
                                    key={n}
                                    variant={numDisks === n ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setNumDisks(n)}
                                    disabled={isAnimating}
                                >
                                    {n}
                                </Button>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Speed:</span>
                        <div className="flex gap-1">
                            {[
                                { label: "Slow", value: 1000 },
                                { label: "Normal", value: 500 },
                                { label: "Fast", value: 200 },
                            ].map((s) => (
                                <Button
                                    key={s.value}
                                    variant={speed === s.value ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setSpeed(s.value)}
                                >
                                    {s.label}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2">
                    <Button onClick={solvePuzzle} disabled={isAnimating || isComplete} className="gap-2">
                        <Play className="size-4" />
                        Auto Solve
                    </Button>
                    <Button onClick={stepForward} disabled={isAnimating || currentStep >= solution.length} variant="outline" className="gap-2">
                        <SkipForward className="size-4" />
                        Step
                    </Button>
                    <Button onClick={resetGame} variant="outline" className="gap-2">
                        <RotateCcw className="size-4" />
                        Reset
                    </Button>
                </div>
            </div>

            {/* Stats */}
            <div className="mb-6 flex flex-wrap gap-3">
                <Badge variant="secondary" className="gap-2 px-4 py-2">
                    <Zap className="size-4" />
                    Moves: {moves}
                </Badge>
                <Badge variant="secondary" className="gap-2 px-4 py-2">
                    <Trophy className="size-4" />
                    Optimal: {optimalMoves}
                </Badge>
                {isComplete && (
                    <Badge variant="default" className="gap-2 px-4 py-2">
                        ✨ Completed!
                    </Badge>
                )}
            </div>

            {/* Towers */}
            <div className="mb-6 grid grid-cols-3 gap-4">
                {towers.map((tower, towerIndex) => (
                    <div key={towerIndex} className="flex flex-col items-center">
                        <div className="text-sm font-medium mb-2 text-muted-foreground">
                            Tower {String.fromCharCode(65 + towerIndex)}
                        </div>
                        <div className="relative w-full h-64 flex flex-col-reverse items-center justify-start pt-4">
                            {/* Base */}
                            <div className="absolute bottom-0 w-full h-2 bg-border rounded" />
                            {/* Rod */}
                            <div className="absolute bottom-2 w-1 h-60 bg-border" />
                            {/* Disks */}
                            <div className="relative flex flex-col-reverse items-center gap-0.5 pb-2">
                                {tower.map((disk, diskIndex) => {
                                    const width = 40 + disk * 20;
                                    return (
                                        <div
                                            key={diskIndex}
                                            className={`h-6 rounded transition-all duration-300 ${diskColors[disk - 1]} shadow-md`}
                                            style={{ width: `${width}px` }}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Info */}
            <Card className="border-border/50 bg-accent/20">
                <CardContent className="py-4">
                    <p className="text-sm text-muted-foreground text-center">
                        <span className="font-semibold text-foreground">Tower of Hanoi:</span> Move all disks from Tower A to Tower C.
                        Only one disk can be moved at a time, and a larger disk cannot be placed on a smaller disk.
                        The optimal solution uses <span className="font-semibold text-foreground">2ⁿ - 1</span> moves (recursive algorithm).
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
