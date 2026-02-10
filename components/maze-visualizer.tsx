"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Play, RotateCcw, Shuffle } from "lucide-react";

type Cell = {
    row: number;
    col: number;
    isWall: boolean;
    isStart: boolean;
    isEnd: boolean;
    isPath: boolean;
    isVisited: boolean;
};

const ROWS = 15;
const COLS = 25;

export function MazeVisualizer() {
    const [grid, setGrid] = useState<Cell[][]>(createEmptyGrid());
    const [isGenerating, setIsGenerating] = useState(false);
    const [isSolving, setIsSolving] = useState(false);
    const [algorithm, setAlgorithm] = useState<"bfs" | "dfs" | "astar">("astar");

    function createEmptyGrid(): Cell[][] {
        const grid: Cell[][] = [];
        for (let row = 0; row < ROWS; row++) {
            const currentRow: Cell[] = [];
            for (let col = 0; col < COLS; col++) {
                currentRow.push({
                    row,
                    col,
                    isWall: false,
                    isStart: row === 7 && col === 2,
                    isEnd: row === 7 && col === COLS - 3,
                    isPath: false,
                    isVisited: false,
                });
            }
            grid.push(currentRow);
        }
        return grid;
    }

    const generateMaze = async () => {
        setIsGenerating(true);
        const newGrid = createEmptyGrid();

        // Create walls
        for (let row = 0; row < ROWS; row++) {
            for (let col = 0; col < COLS; col++) {
                if (Math.random() < 0.3 && !newGrid[row][col].isStart && !newGrid[row][col].isEnd) {
                    newGrid[row][col].isWall = true;
                }
            }
        }

        setGrid([...newGrid]);
        setIsGenerating(false);
    };

    const solveMaze = async () => {
        setIsSolving(true);
        const newGrid = grid.map(row => row.map(cell => ({ ...cell, isVisited: false, isPath: false })));

        const start = newGrid.flat().find(cell => cell.isStart)!;
        const end = newGrid.flat().find(cell => cell.isEnd)!;

        if (algorithm === "bfs") {
            await bfs(newGrid, start, end);
        } else if (algorithm === "dfs") {
            await dfs(newGrid, start, end);
        } else {
            await astar(newGrid, start, end);
        }

        setIsSolving(false);
    };

    const bfs = async (grid: Cell[][], start: Cell, end: Cell) => {
        const queue: Cell[] = [start];
        const visited = new Set<string>();
        const parent = new Map<string, Cell>();

        while (queue.length > 0) {
            const current = queue.shift()!;
            const key = `${current.row},${current.col}`;

            if (visited.has(key)) continue;
            visited.add(key);

            grid[current.row][current.col].isVisited = true;
            setGrid([...grid]);
            await new Promise(resolve => setTimeout(resolve, 20));

            if (current.row === end.row && current.col === end.col) {
                reconstructPath(grid, parent, end);
                return;
            }

            const neighbors = getNeighbors(grid, current);
            for (const neighbor of neighbors) {
                const nKey = `${neighbor.row},${neighbor.col}`;
                if (!visited.has(nKey)) {
                    queue.push(neighbor);
                    parent.set(nKey, current);
                }
            }
        }
    };

    const dfs = async (grid: Cell[][], start: Cell, end: Cell) => {
        const stack: Cell[] = [start];
        const visited = new Set<string>();
        const parent = new Map<string, Cell>();

        while (stack.length > 0) {
            const current = stack.pop()!;
            const key = `${current.row},${current.col}`;

            if (visited.has(key)) continue;
            visited.add(key);

            grid[current.row][current.col].isVisited = true;
            setGrid([...grid]);
            await new Promise(resolve => setTimeout(resolve, 20));

            if (current.row === end.row && current.col === end.col) {
                reconstructPath(grid, parent, end);
                return;
            }

            const neighbors = getNeighbors(grid, current);
            for (const neighbor of neighbors) {
                const nKey = `${neighbor.row},${neighbor.col}`;
                if (!visited.has(nKey)) {
                    stack.push(neighbor);
                    parent.set(nKey, current);
                }
            }
        }
    };

    const astar = async (grid: Cell[][], start: Cell, end: Cell) => {
        const openSet: Cell[] = [start];
        const closedSet = new Set<string>();
        const gScore = new Map<string, number>();
        const fScore = new Map<string, number>();
        const parent = new Map<string, Cell>();

        gScore.set(`${start.row},${start.col}`, 0);
        fScore.set(`${start.row},${start.col}`, heuristic(start, end));

        while (openSet.length > 0) {
            openSet.sort((a, b) => {
                const aKey = `${a.row},${a.col}`;
                const bKey = `${b.row},${b.col}`;
                return (fScore.get(aKey) || Infinity) - (fScore.get(bKey) || Infinity);
            });

            const current = openSet.shift()!;
            const currentKey = `${current.row},${current.col}`;

            if (current.row === end.row && current.col === end.col) {
                reconstructPath(grid, parent, end);
                return;
            }

            closedSet.add(currentKey);
            grid[current.row][current.col].isVisited = true;
            setGrid([...grid]);
            await new Promise(resolve => setTimeout(resolve, 20));

            const neighbors = getNeighbors(grid, current);
            for (const neighbor of neighbors) {
                const neighborKey = `${neighbor.row},${neighbor.col}`;
                if (closedSet.has(neighborKey)) continue;

                const tentativeG = (gScore.get(currentKey) || 0) + 1;

                if (!openSet.includes(neighbor)) {
                    openSet.push(neighbor);
                } else if (tentativeG >= (gScore.get(neighborKey) || Infinity)) {
                    continue;
                }

                parent.set(neighborKey, current);
                gScore.set(neighborKey, tentativeG);
                fScore.set(neighborKey, tentativeG + heuristic(neighbor, end));
            }
        }
    };

    const heuristic = (a: Cell, b: Cell) => {
        return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
    };

    const getNeighbors = (grid: Cell[][], cell: Cell): Cell[] => {
        const neighbors: Cell[] = [];
        const { row, col } = cell;

        if (row > 0) neighbors.push(grid[row - 1][col]);
        if (row < ROWS - 1) neighbors.push(grid[row + 1][col]);
        if (col > 0) neighbors.push(grid[row][col - 1]);
        if (col < COLS - 1) neighbors.push(grid[row][col + 1]);

        return neighbors.filter(n => !n.isWall);
    };

    const reconstructPath = (grid: Cell[][], parent: Map<string, Cell>, end: Cell) => {
        let current: Cell | undefined = end;
        while (current) {
            grid[current.row][current.col].isPath = true;
            const key = `${current.row},${current.col}`;
            current = parent.get(key);
        }
        setGrid([...grid]);
    };

    const reset = () => {
        setGrid(createEmptyGrid());
    };

    return (
        <div className="w-full">
            {/* Controls */}
            <div className="mb-6 space-y-4">
                <div className="flex flex-wrap gap-2">
                    <Button onClick={generateMaze} disabled={isGenerating || isSolving} className="gap-2">
                        <Shuffle className="size-4" />
                        Generate Maze
                    </Button>
                    <Button onClick={solveMaze} disabled={isSolving || isGenerating} className="gap-2">
                        <Play className="size-4" />
                        Solve
                    </Button>
                    <Button onClick={reset} variant="outline" className="gap-2" disabled={isGenerating || isSolving}>
                        <RotateCcw className="size-4" />
                        Reset
                    </Button>
                </div>

                <div className="flex gap-2">
                    {(["astar", "bfs", "dfs"] as const).map((algo) => (
                        <Button
                            key={algo}
                            variant={algorithm === algo ? "default" : "outline"}
                            onClick={() => setAlgorithm(algo)}
                            disabled={isSolving || isGenerating}
                            size="sm"
                        >
                            {algo === "astar" ? "A*" : algo.toUpperCase()}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Maze Grid */}
            <div className="border-2 border-border rounded-lg bg-card p-2 overflow-x-auto">
                <div className="inline-block">
                    {grid.map((row, rowIdx) => (
                        <div key={rowIdx} className="flex">
                            {row.map((cell, colIdx) => (
                                <div
                                    key={colIdx}
                                    className={`w-6 h-6 border border-border/20 transition-all duration-200 ${cell.isStart
                                            ? "bg-green-500"
                                            : cell.isEnd
                                                ? "bg-red-500"
                                                : cell.isWall
                                                    ? "bg-gray-800"
                                                    : cell.isPath
                                                        ? "bg-yellow-400"
                                                        : cell.isVisited
                                                            ? "bg-blue-300"
                                                            : "bg-white"
                                        }`}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            {/* Legend */}
            <div className="mt-4 flex flex-wrap gap-4 justify-center">
                <Badge variant="outline" className="gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded" />
                    Start
                </Badge>
                <Badge variant="outline" className="gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded" />
                    End
                </Badge>
                <Badge variant="outline" className="gap-2">
                    <div className="w-4 h-4 bg-gray-800 rounded" />
                    Wall
                </Badge>
                <Badge variant="outline" className="gap-2">
                    <div className="w-4 h-4 bg-blue-300 rounded" />
                    Visited
                </Badge>
                <Badge variant="outline" className="gap-2">
                    <div className="w-4 h-4 bg-yellow-400 rounded" />
                    Path
                </Badge>
            </div>

            {/* Info */}
            <Card className="mt-6 border-border/50 bg-accent/20">
                <CardContent className="py-4">
                    <p className="text-sm text-muted-foreground text-center">
                        <span className="font-semibold text-foreground">Maze Solver:</span> Generate random mazes and watch
                        different pathfinding algorithms find the shortest path!
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
