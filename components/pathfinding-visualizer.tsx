"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Play, RotateCcw, Eraser } from "lucide-react";

type Cell = {
    row: number;
    col: number;
    isStart: boolean;
    isEnd: boolean;
    isWall: boolean;
    isVisited: boolean;
    isPath: boolean;
    distance: number;
    previousNode: Cell | null;
};

type Algorithm = "astar" | "dijkstra" | "bfs" | "dfs";

const ROWS = 15;
const COLS = 25;

export function PathfindingVisualizer() {
    const [grid, setGrid] = useState<Cell[][]>([]);
    const [isDrawing, setIsDrawing] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const [algorithm, setAlgorithm] = useState<Algorithm>("astar");
    const [startNode, setStartNode] = useState({ row: 7, col: 5 });
    const [endNode, setEndNode] = useState({ row: 7, col: 19 });

    useEffect(() => {
        initializeGrid();
    }, []);

    const initializeGrid = () => {
        const newGrid: Cell[][] = [];
        for (let row = 0; row < ROWS; row++) {
            const currentRow: Cell[] = [];
            for (let col = 0; col < COLS; col++) {
                currentRow.push({
                    row,
                    col,
                    isStart: row === startNode.row && col === startNode.col,
                    isEnd: row === endNode.row && col === endNode.col,
                    isWall: false,
                    isVisited: false,
                    isPath: false,
                    distance: Infinity,
                    previousNode: null,
                });
            }
            newGrid.push(currentRow);
        }
        setGrid(newGrid);
    };

    const resetGrid = () => {
        setGrid((prevGrid) =>
            prevGrid.map((row) =>
                row.map((cell) => ({
                    ...cell,
                    isVisited: false,
                    isPath: false,
                    distance: Infinity,
                    previousNode: null,
                }))
            )
        );
    };

    const clearWalls = () => {
        setGrid((prevGrid) =>
            prevGrid.map((row) =>
                row.map((cell) => ({
                    ...cell,
                    isWall: false,
                    isVisited: false,
                    isPath: false,
                    distance: Infinity,
                    previousNode: null,
                }))
            )
        );
    };

    const toggleWall = (row: number, col: number) => {
        if (isRunning) return;
        const cell = grid[row][col];
        if (cell.isStart || cell.isEnd) return;

        setGrid((prevGrid) =>
            prevGrid.map((r, rIdx) =>
                r.map((c, cIdx) =>
                    rIdx === row && cIdx === col ? { ...c, isWall: !c.isWall } : c
                )
            )
        );
    };

    const getNeighbors = (cell: Cell): Cell[] => {
        const neighbors: Cell[] = [];
        const { row, col } = cell;
        if (row > 0) neighbors.push(grid[row - 1][col]);
        if (row < ROWS - 1) neighbors.push(grid[row + 1][col]);
        if (col > 0) neighbors.push(grid[row][col - 1]);
        if (col < COLS - 1) neighbors.push(grid[row][col + 1]);
        return neighbors.filter((n) => !n.isWall);
    };

    const heuristic = (cell: Cell): number => {
        return Math.abs(cell.row - endNode.row) + Math.abs(cell.col - endNode.col);
    };

    const visualize = async () => {
        resetGrid();
        setIsRunning(true);

        const start = grid[startNode.row][startNode.col];
        const end = grid[endNode.row][endNode.col];

        let visitedNodesInOrder: Cell[] = [];

        if (algorithm === "astar") {
            visitedNodesInOrder = await astar(start, end);
        } else if (algorithm === "dijkstra") {
            visitedNodesInOrder = await dijkstra(start, end);
        } else if (algorithm === "bfs") {
            visitedNodesInOrder = await bfs(start, end);
        } else if (algorithm === "dfs") {
            visitedNodesInOrder = await dfs(start, end);
        }

        await animateVisited(visitedNodesInOrder);
        await animatePath(end);
        setIsRunning(false);
    };

    const astar = async (start: Cell, end: Cell): Promise<Cell[]> => {
        const visitedNodes: Cell[] = [];
        const openSet: Cell[] = [start];
        start.distance = 0;

        while (openSet.length > 0) {
            openSet.sort((a, b) => (a.distance + heuristic(a)) - (b.distance + heuristic(b)));
            const current = openSet.shift()!;

            if (current.isVisited) continue;
            current.isVisited = true;
            visitedNodes.push(current);

            if (current === end) return visitedNodes;

            const neighbors = getNeighbors(current);
            for (const neighbor of neighbors) {
                const tentativeDistance = current.distance + 1;
                if (tentativeDistance < neighbor.distance) {
                    neighbor.distance = tentativeDistance;
                    neighbor.previousNode = current;
                    if (!openSet.includes(neighbor)) {
                        openSet.push(neighbor);
                    }
                }
            }
        }
        return visitedNodes;
    };

    const dijkstra = async (start: Cell, end: Cell): Promise<Cell[]> => {
        const visitedNodes: Cell[] = [];
        const unvisitedNodes: Cell[] = [];

        for (const row of grid) {
            for (const cell of row) {
                unvisitedNodes.push(cell);
            }
        }

        start.distance = 0;

        while (unvisitedNodes.length > 0) {
            unvisitedNodes.sort((a, b) => a.distance - b.distance);
            const current = unvisitedNodes.shift()!;

            if (current.distance === Infinity) return visitedNodes;
            if (current.isWall) continue;

            current.isVisited = true;
            visitedNodes.push(current);

            if (current === end) return visitedNodes;

            const neighbors = getNeighbors(current);
            for (const neighbor of neighbors) {
                const tentativeDistance = current.distance + 1;
                if (tentativeDistance < neighbor.distance) {
                    neighbor.distance = tentativeDistance;
                    neighbor.previousNode = current;
                }
            }
        }
        return visitedNodes;
    };

    const bfs = async (start: Cell, end: Cell): Promise<Cell[]> => {
        const visitedNodes: Cell[] = [];
        const queue: Cell[] = [start];
        start.isVisited = true;

        while (queue.length > 0) {
            const current = queue.shift()!;
            visitedNodes.push(current);

            if (current === end) return visitedNodes;

            const neighbors = getNeighbors(current);
            for (const neighbor of neighbors) {
                if (!neighbor.isVisited) {
                    neighbor.isVisited = true;
                    neighbor.previousNode = current;
                    queue.push(neighbor);
                }
            }
        }
        return visitedNodes;
    };

    const dfs = async (start: Cell, end: Cell): Promise<Cell[]> => {
        const visitedNodes: Cell[] = [];
        const stack: Cell[] = [start];

        while (stack.length > 0) {
            const current = stack.pop()!;

            if (current.isVisited) continue;
            current.isVisited = true;
            visitedNodes.push(current);

            if (current === end) return visitedNodes;

            const neighbors = getNeighbors(current);
            for (const neighbor of neighbors) {
                if (!neighbor.isVisited) {
                    neighbor.previousNode = current;
                    stack.push(neighbor);
                }
            }
        }
        return visitedNodes;
    };

    const animateVisited = async (visitedNodes: Cell[]) => {
        for (let i = 0; i < visitedNodes.length; i++) {
            await new Promise((resolve) => setTimeout(resolve, 10));
            const node = visitedNodes[i];
            setGrid((prevGrid) =>
                prevGrid.map((row) =>
                    row.map((cell) =>
                        cell.row === node.row && cell.col === node.col
                            ? { ...cell, isVisited: true }
                            : cell
                    )
                )
            );
        }
    };

    const animatePath = async (endNode: Cell) => {
        const path: Cell[] = [];
        let current: Cell | null = endNode;
        while (current !== null) {
            path.unshift(current);
            current = current.previousNode;
        }

        for (const node of path) {
            await new Promise((resolve) => setTimeout(resolve, 30));
            setGrid((prevGrid) =>
                prevGrid.map((row) =>
                    row.map((cell) =>
                        cell.row === node.row && cell.col === node.col
                            ? { ...cell, isPath: true }
                            : cell
                    )
                )
            );
        }
    };

    return (
        <div className="w-full">
            {/* Controls */}
            <div className="mb-6 space-y-4">
                <div className="flex flex-wrap gap-2">
                    <Button
                        variant={algorithm === "astar" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setAlgorithm("astar")}
                        disabled={isRunning}
                    >
                        A* Search
                    </Button>
                    <Button
                        variant={algorithm === "dijkstra" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setAlgorithm("dijkstra")}
                        disabled={isRunning}
                    >
                        Dijkstra
                    </Button>
                    <Button
                        variant={algorithm === "bfs" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setAlgorithm("bfs")}
                        disabled={isRunning}
                    >
                        BFS
                    </Button>
                    <Button
                        variant={algorithm === "dfs" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setAlgorithm("dfs")}
                        disabled={isRunning}
                    >
                        DFS
                    </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                    <Button onClick={visualize} disabled={isRunning} className="gap-2">
                        <Play className="size-4" />
                        Visualize
                    </Button>
                    <Button onClick={resetGrid} disabled={isRunning} variant="outline" className="gap-2">
                        <RotateCcw className="size-4" />
                        Reset
                    </Button>
                    <Button onClick={clearWalls} disabled={isRunning} variant="outline" className="gap-2">
                        <Eraser className="size-4" />
                        Clear Walls
                    </Button>
                </div>

                <div className="flex flex-wrap gap-3 text-xs">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-green-500 rounded" />
                        <span>Start</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-red-500 rounded" />
                        <span>End</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-foreground rounded" />
                        <span>Wall</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-blue-400 rounded" />
                        <span>Visited</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-yellow-400 rounded" />
                        <span>Path</span>
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="overflow-x-auto">
                <div className="inline-block min-w-full">
                    {grid.map((row, rowIdx) => (
                        <div key={rowIdx} className="flex">
                            {row.map((cell, colIdx) => (
                                <div
                                    key={colIdx}
                                    onMouseDown={() => {
                                        setIsDrawing(true);
                                        toggleWall(rowIdx, colIdx);
                                    }}
                                    onMouseEnter={() => {
                                        if (isDrawing) toggleWall(rowIdx, colIdx);
                                    }}
                                    onMouseUp={() => setIsDrawing(false)}
                                    className={`w-6 h-6 border border-border/30 cursor-pointer transition-colors duration-100 ${cell.isStart
                                            ? "bg-green-500"
                                            : cell.isEnd
                                                ? "bg-red-500"
                                                : cell.isWall
                                                    ? "bg-foreground"
                                                    : cell.isPath
                                                        ? "bg-yellow-400"
                                                        : cell.isVisited
                                                            ? "bg-blue-400"
                                                            : "bg-card hover:bg-accent"
                                        }`}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            {/* Info */}
            <Card className="mt-6 border-border/50 bg-accent/20">
                <CardContent className="py-4">
                    <p className="text-sm text-muted-foreground text-center">
                        <span className="font-semibold text-foreground">Click and drag</span> to draw walls.
                        Choose an algorithm and click Visualize to see how it finds the shortest path from start to end.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
