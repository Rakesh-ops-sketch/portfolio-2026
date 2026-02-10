"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { RotateCcw, Trophy, Zap } from "lucide-react";

type Tile = {
    value: number;
    id: number;
};

type Grid = (Tile | null)[][];

const GRID_SIZE = 4;

export function Game2048() {
    const [grid, setGrid] = useState<Grid>([]);
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [won, setWon] = useState(false);
    let tileIdCounter = 0;

    useEffect(() => {
        const saved = localStorage.getItem("2048-best-score");
        if (saved) setBestScore(parseInt(saved));
        initializeGame();
    }, []);

    const createEmptyGrid = (): Grid => {
        return Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(null));
    };

    const addRandomTile = (currentGrid: Grid): Grid => {
        const emptyCells: { row: number; col: number }[] = [];
        currentGrid.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                if (cell === null) {
                    emptyCells.push({ row: rowIndex, col: colIndex });
                }
            });
        });

        if (emptyCells.length === 0) return currentGrid;

        const { row, col } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        const newGrid = currentGrid.map(r => [...r]);
        newGrid[row][col] = { value: Math.random() < 0.9 ? 2 : 4, id: tileIdCounter++ };
        return newGrid;
    };

    const initializeGame = () => {
        let newGrid = createEmptyGrid();
        newGrid = addRandomTile(newGrid);
        newGrid = addRandomTile(newGrid);
        setGrid(newGrid);
        setScore(0);
        setGameOver(false);
        setWon(false);
    };

    const move = useCallback((direction: "up" | "down" | "left" | "right") => {
        if (gameOver) return;

        let newGrid = grid.map(row => [...row]);
        let moved = false;
        let newScore = score;

        const moveAndMerge = (line: (Tile | null)[]): (Tile | null)[] => {
            const filtered = line.filter(tile => tile !== null);
            const merged: (Tile | null)[] = [];

            for (let i = 0; i < filtered.length; i++) {
                if (i < filtered.length - 1 && filtered[i]!.value === filtered[i + 1]!.value) {
                    const mergedValue = filtered[i]!.value * 2;
                    merged.push({ value: mergedValue, id: tileIdCounter++ });
                    newScore += mergedValue;
                    if (mergedValue === 2048 && !won) setWon(true);
                    i++;
                } else {
                    merged.push(filtered[i]);
                }
            }

            while (merged.length < GRID_SIZE) {
                merged.push(null);
            }

            return merged;
        };

        if (direction === "left") {
            newGrid = newGrid.map(row => {
                const newRow = moveAndMerge(row);
                if (JSON.stringify(row) !== JSON.stringify(newRow)) moved = true;
                return newRow;
            });
        } else if (direction === "right") {
            newGrid = newGrid.map(row => {
                const reversed = [...row].reverse();
                const newRow = moveAndMerge(reversed).reverse();
                if (JSON.stringify(row) !== JSON.stringify(newRow)) moved = true;
                return newRow;
            });
        } else if (direction === "up") {
            for (let col = 0; col < GRID_SIZE; col++) {
                const column = newGrid.map(row => row[col]);
                const newColumn = moveAndMerge(column);
                if (JSON.stringify(column) !== JSON.stringify(newColumn)) moved = true;
                newColumn.forEach((tile, row) => {
                    newGrid[row][col] = tile;
                });
            }
        } else if (direction === "down") {
            for (let col = 0; col < GRID_SIZE; col++) {
                const column = newGrid.map(row => row[col]).reverse();
                const newColumn = moveAndMerge(column).reverse();
                if (JSON.stringify(column.reverse()) !== JSON.stringify(newColumn)) moved = true;
                newColumn.forEach((tile, row) => {
                    newGrid[row][col] = tile;
                });
            }
        }

        if (moved) {
            newGrid = addRandomTile(newGrid);
            setGrid(newGrid);
            setScore(newScore);
            if (newScore > bestScore) {
                setBestScore(newScore);
                localStorage.setItem("2048-best-score", newScore.toString());
            }

            if (isGameOver(newGrid)) {
                setGameOver(true);
            }
        }
    }, [grid, score, gameOver, won, bestScore]);

    const isGameOver = (currentGrid: Grid): boolean => {
        for (let row = 0; row < GRID_SIZE; row++) {
            for (let col = 0; col < GRID_SIZE; col++) {
                if (currentGrid[row][col] === null) return false;
                if (col < GRID_SIZE - 1 && currentGrid[row][col]!.value === currentGrid[row][col + 1]!.value) return false;
                if (row < GRID_SIZE - 1 && currentGrid[row][col]!.value === currentGrid[row + 1][col]!.value) return false;
            }
        }
        return true;
    };

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
                e.preventDefault();
            }
            switch (e.key) {
                case "ArrowUp":
                    move("up");
                    break;
                case "ArrowDown":
                    move("down");
                    break;
                case "ArrowLeft":
                    move("left");
                    break;
                case "ArrowRight":
                    move("right");
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, [move]);

    const getTileColor = (value: number): string => {
        const colors: { [key: number]: string } = {
            2: "bg-yellow-200 text-gray-800",
            4: "bg-yellow-300 text-gray-800",
            8: "bg-orange-400 text-white",
            16: "bg-orange-500 text-white",
            32: "bg-red-500 text-white",
            64: "bg-red-600 text-white",
            128: "bg-yellow-500 text-white",
            256: "bg-yellow-600 text-white",
            512: "bg-yellow-700 text-white",
            1024: "bg-orange-600 text-white",
            2048: "bg-orange-700 text-white",
        };
        return colors[value] || "bg-gray-800 text-white";
    };

    return (
        <div className="w-full max-w-lg mx-auto">
            {/* Controls */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <Button onClick={initializeGame} variant="outline" className="gap-2">
                    <RotateCcw className="size-4" />
                    New Game
                </Button>

                <div className="flex gap-3">
                    <Badge variant="secondary" className="gap-2 px-4 py-2">
                        <Zap className="size-4" />
                        Score: {score}
                    </Badge>
                    <Badge variant="secondary" className="gap-2 px-4 py-2">
                        <Trophy className="size-4" />
                        Best: {bestScore}
                    </Badge>
                </div>
            </div>

            {/* Game Board */}
            <div className="relative bg-accent/50 p-3 rounded-lg">
                <div className="grid grid-cols-4 gap-3">
                    {grid.map((row, rowIndex) =>
                        row.map((tile, colIndex) => (
                            <div
                                key={`${rowIndex}-${colIndex}`}
                                className="relative aspect-square bg-card border-2 border-border rounded-lg flex items-center justify-center"
                            >
                                {tile && (
                                    <div
                                        className={`absolute inset-1 rounded-lg flex items-center justify-center text-2xl font-bold transition-all duration-200 ${getTileColor(
                                            tile.value
                                        )}`}
                                    >
                                        {tile.value}
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>

                {/* Game Over Overlay */}
                {gameOver && (
                    <div className="absolute inset-0 bg-black/80 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                            <h3 className="text-2xl font-bold text-white mb-2">Game Over!</h3>
                            <p className="text-white mb-4">Final Score: {score}</p>
                            <Button onClick={initializeGame}>Try Again</Button>
                        </div>
                    </div>
                )}

                {/* Win Overlay */}
                {won && !gameOver && (
                    <div className="absolute inset-0 bg-green-500/90 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                            <h3 className="text-3xl font-bold text-white mb-2">You Win! 🎉</h3>
                            <p className="text-white mb-4">You reached 2048!</p>
                            <Button onClick={() => setWon(false)} variant="secondary">
                                Continue Playing
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            {/* Instructions */}
            <Card className="mt-6 border-border/50 bg-accent/20">
                <CardContent className="py-4">
                    <p className="text-sm text-muted-foreground text-center">
                        <span className="font-semibold text-foreground">2048:</span> Use arrow keys to move tiles.
                        When two tiles with the same number touch, they merge into one. Reach 2048 to win!
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
