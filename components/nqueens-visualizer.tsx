"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Play, RotateCcw, Zap, AlertCircle } from "lucide-react";

type Position = { row: number; col: number };

export function NQueensVisualizer() {
    const [boardSize, setBoardSize] = useState(8);
    const [queens, setQueens] = useState<Position[]>([]);
    const [solving, setSolving] = useState(false);
    const [solved, setSolved] = useState(false);
    const [currentRow, setCurrentRow] = useState(-1);
    const [tryingPosition, setTryingPosition] = useState<Position | null>(null);
    const [statusMessage, setStatusMessage] = useState("");

    const isSafe = (board: Position[], row: number, col: number): boolean => {
        for (const queen of board) {
            if (queen.col === col) return false;
            if (queen.row === row) return false;
            if (Math.abs(queen.row - row) === Math.abs(queen.col - col)) return false;
        }
        return true;
    };

    const solveNQueens = async (
        board: Position[],
        row: number
    ): Promise<boolean> => {
        if (row === boardSize) {
            setSolved(true);
            setStatusMessage("✓ Solution Found!");
            return true;
        }

        setCurrentRow(row);
        setStatusMessage(`Trying to place queen in row ${row + 1}...`);

        for (let col = 0; col < boardSize; col++) {
            setTryingPosition({ row, col });
            await new Promise((resolve) => setTimeout(resolve, 300));

            if (isSafe(board, row, col)) {
                setStatusMessage(`✓ Safe position found at (${row + 1}, ${col + 1})`);
                const newBoard = [...board, { row, col }];
                setQueens(newBoard);
                setTryingPosition(null);
                await new Promise((resolve) => setTimeout(resolve, 400));

                if (await solveNQueens(newBoard, row + 1)) {
                    return true;
                }

                setStatusMessage(`✗ Backtracking from row ${row + 1}...`);
                setQueens(board);
                await new Promise((resolve) => setTimeout(resolve, 300));
            } else {
                setStatusMessage(`✗ Position (${row + 1}, ${col + 1}) is under attack`);
                await new Promise((resolve) => setTimeout(resolve, 200));
            }
        }

        setTryingPosition(null);
        return false;
    };

    const solve = async () => {
        setSolving(true);
        setSolved(false);
        setQueens([]);
        setCurrentRow(-1);
        setTryingPosition(null);
        setStatusMessage("Starting backtracking algorithm...");

        await new Promise((resolve) => setTimeout(resolve, 500));
        const success = await solveNQueens([], 0);

        if (!success) {
            setStatusMessage("No solution found!");
        }
        setSolving(false);
        setCurrentRow(-1);
    };

    const reset = () => {
        setQueens([]);
        setSolved(false);
        setCurrentRow(-1);
        setTryingPosition(null);
        setStatusMessage("");
    };

    const isQueenAt = (row: number, col: number): boolean => {
        return queens.some((q) => q.row === row && q.col === col);
    };

    const isUnderAttack = (row: number, col: number): boolean => {
        if (isQueenAt(row, col)) return false;

        for (const queen of queens) {
            if (queen.col === col || queen.row === row) return true;
            if (Math.abs(queen.row - row) === Math.abs(queen.col - col)) return true;
        }
        return false;
    };

    const isTrying = (row: number, col: number): boolean => {
        return tryingPosition?.row === row && tryingPosition?.col === col;
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
            {/* Controls */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <div className="flex gap-2">
                    <Button onClick={solve} disabled={solving} className="gap-2">
                        <Play className="size-4" />
                        {solving ? "Solving..." : "Solve"}
                    </Button>
                    <Button onClick={reset} variant="outline" className="gap-2" disabled={solving}>
                        <RotateCcw className="size-4" />
                        Reset
                    </Button>
                </div>

                <div className="flex gap-2">
                    {[4, 5, 6, 7, 8].map((size) => (
                        <Button
                            key={size}
                            variant={boardSize === size ? "default" : "outline"}
                            onClick={() => {
                                setBoardSize(size);
                                reset();
                            }}
                            disabled={solving}
                            size="sm"
                        >
                            {size}×{size}
                        </Button>
                    ))}
                </div>

                <div className="flex gap-3">
                    <Badge variant="secondary" className="gap-2 px-4 py-2">
                        <Zap className="size-4" />
                        Queens: {queens.length}/{boardSize}
                    </Badge>
                    {solved && (
                        <Badge className="gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 animate-pulse">
                            ✓ Solved!
                        </Badge>
                    )}
                </div>
            </div>

            {/* Status Message */}
            {statusMessage && (
                <div className="mb-4 p-3 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                    <p className="text-sm font-medium text-center flex items-center justify-center gap-2">
                        <AlertCircle className="size-4" />
                        {statusMessage}
                    </p>
                </div>
            )}

            {/* Chessboard */}
            <div className="border-4 border-border rounded-lg overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 shadow-2xl mx-auto">
                <div
                    className="grid gap-0 p-4"
                    style={{
                        gridTemplateColumns: `repeat(${boardSize}, 1fr)`,
                        gridTemplateRows: `repeat(${boardSize}, 1fr)`,
                        aspectRatio: "1/1",
                    }}
                >
                    {Array.from({ length: boardSize * boardSize }).map((_, index) => {
                        const row = Math.floor(index / boardSize);
                        const col = index % boardSize;
                        const isLight = (row + col) % 2 === 0;
                        const hasQueen = isQueenAt(row, col);
                        const underAttack = isUnderAttack(row, col);
                        const trying = isTrying(row, col);
                        const isCurrentRow = row === currentRow;

                        return (
                            <div
                                key={index}
                                className={`relative flex items-center justify-center transition-all duration-300 rounded-sm ${hasQueen
                                        ? "bg-gradient-to-br from-cyan-400 to-blue-500 shadow-lg shadow-cyan-500/50 scale-105"
                                        : trying
                                            ? "bg-gradient-to-br from-yellow-400 to-orange-500 animate-pulse shadow-lg shadow-yellow-500/50"
                                            : underAttack
                                                ? "bg-gradient-to-br from-red-500/30 to-pink-500/30 shadow-inner"
                                                : isCurrentRow
                                                    ? isLight
                                                        ? "bg-purple-200/20"
                                                        : "bg-purple-400/20"
                                                    : isLight
                                                        ? "bg-slate-700/50"
                                                        : "bg-slate-600/50"
                                    }`}
                                style={{
                                    aspectRatio: "1/1",
                                }}
                            >
                                {/* Attack indicator lines */}
                                {underAttack && !hasQueen && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-full h-0.5 bg-red-500/50 animate-pulse" />
                                        <div className="absolute w-0.5 h-full bg-red-500/50 animate-pulse" />
                                    </div>
                                )}

                                {/* Queen */}
                                {hasQueen && (
                                    <div className="relative">
                                        <div className="absolute inset-0 blur-xl bg-cyan-400 animate-pulse" />
                                        <div className="relative text-3xl sm:text-4xl md:text-5xl select-none animate-in zoom-in duration-500">
                                            ♛
                                        </div>
                                    </div>
                                )}

                                {/* Trying indicator */}
                                {trying && (
                                    <div className="text-2xl sm:text-3xl md:text-4xl animate-bounce">
                                        ?
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Legend */}
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="flex items-center gap-2 p-2 rounded bg-gradient-to-br from-cyan-400/10 to-blue-500/10 border border-cyan-500/20">
                    <div className="w-6 h-6 rounded bg-gradient-to-br from-cyan-400 to-blue-500" />
                    <span className="text-xs font-medium">Queen Placed</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded bg-gradient-to-br from-yellow-400/10 to-orange-500/10 border border-yellow-500/20">
                    <div className="w-6 h-6 rounded bg-gradient-to-br from-yellow-400 to-orange-500" />
                    <span className="text-xs font-medium">Trying Position</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded bg-gradient-to-br from-red-500/10 to-pink-500/10 border border-red-500/20">
                    <div className="w-6 h-6 rounded bg-gradient-to-br from-red-500/30 to-pink-500/30" />
                    <span className="text-xs font-medium">Under Attack</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded bg-gradient-to-br from-purple-500/10 to-purple-500/10 border border-purple-500/20">
                    <div className="w-6 h-6 rounded bg-purple-400/20" />
                    <span className="text-xs font-medium">Current Row</span>
                </div>
            </div>

            {/* Info */}
            <Card className="mt-6 border-border/50 bg-accent/20">
                <CardContent className="py-4">
                    <p className="text-sm text-muted-foreground text-center">
                        <span className="font-semibold text-foreground">N-Queens Problem:</span> Watch the backtracking
                        algorithm try different positions (yellow), place queens (cyan), and avoid attacks (red). Purple
                        highlights the current row being solved.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
