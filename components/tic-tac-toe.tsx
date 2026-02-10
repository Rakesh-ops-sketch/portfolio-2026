"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RotateCcw, Trophy, Brain, User, Zap } from "lucide-react";

type Player = "X" | "O" | null;
type Board = Player[];
type Difficulty = "easy" | "medium" | "impossible";

interface GameStats {
    wins: number;
    losses: number;
    draws: number;
}

export function TicTacToe() {
    const [board, setBoard] = useState<Board>(Array(9).fill(null));
    const [isPlayerTurn, setIsPlayerTurn] = useState(true);
    const [winner, setWinner] = useState<Player | "draw" | null>(null);
    const [difficulty, setDifficulty] = useState<Difficulty>("impossible");
    const [stats, setStats] = useState<GameStats>({ wins: 0, losses: 0, draws: 0 });
    const [winningLine, setWinningLine] = useState<number[] | null>(null);

    // Load stats from localStorage
    useEffect(() => {
        const saved = localStorage.getItem("ticTacToeStats");
        if (saved) setStats(JSON.parse(saved));
    }, []);

    // Save stats to localStorage
    useEffect(() => {
        localStorage.setItem("ticTacToeStats", JSON.stringify(stats));
    }, [stats]);

    // AI move
    useEffect(() => {
        if (!isPlayerTurn && !winner) {
            const timer = setTimeout(() => {
                makeAIMove();
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [isPlayerTurn, winner, board]);

    const checkWinner = (currentBoard: Board): { winner: Player | "draw" | null; line: number[] | null } => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (const [a, b, c] of lines) {
            if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) {
                return { winner: currentBoard[a], line: [a, b, c] };
            }
        }

        if (currentBoard.every((cell) => cell !== null)) {
            return { winner: "draw", line: null };
        }

        return { winner: null, line: null };
    };

    const minimax = (currentBoard: Board, depth: number, isMaximizing: boolean): number => {
        const { winner } = checkWinner(currentBoard);

        if (winner === "O") return 10 - depth;
        if (winner === "X") return depth - 10;
        if (winner === "draw") return 0;

        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i = 0; i < 9; i++) {
                if (currentBoard[i] === null) {
                    currentBoard[i] = "O";
                    const score = minimax(currentBoard, depth + 1, false);
                    currentBoard[i] = null;
                    bestScore = Math.max(score, bestScore);
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < 9; i++) {
                if (currentBoard[i] === null) {
                    currentBoard[i] = "X";
                    const score = minimax(currentBoard, depth + 1, true);
                    currentBoard[i] = null;
                    bestScore = Math.min(score, bestScore);
                }
            }
            return bestScore;
        }
    };

    const makeAIMove = () => {
        const newBoard = [...board];
        let move: number;

        if (difficulty === "easy") {
            // Random move
            const availableMoves = newBoard.map((cell, idx) => (cell === null ? idx : null)).filter((idx) => idx !== null) as number[];
            move = availableMoves[Math.floor(Math.random() * availableMoves.length)];
        } else if (difficulty === "medium") {
            // 50% minimax, 50% random
            if (Math.random() < 0.5) {
                move = getBestMove(newBoard);
            } else {
                const availableMoves = newBoard.map((cell, idx) => (cell === null ? idx : null)).filter((idx) => idx !== null) as number[];
                move = availableMoves[Math.floor(Math.random() * availableMoves.length)];
            }
        } else {
            // Impossible - always minimax
            move = getBestMove(newBoard);
        }

        newBoard[move] = "O";
        setBoard(newBoard);

        const { winner: gameWinner, line } = checkWinner(newBoard);
        if (gameWinner) {
            setWinner(gameWinner);
            setWinningLine(line);
            updateStats(gameWinner);
        } else {
            setIsPlayerTurn(true);
        }
    };

    const getBestMove = (currentBoard: Board): number => {
        let bestScore = -Infinity;
        let bestMove = 0;

        for (let i = 0; i < 9; i++) {
            if (currentBoard[i] === null) {
                currentBoard[i] = "O";
                const score = minimax(currentBoard, 0, false);
                currentBoard[i] = null;
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = i;
                }
            }
        }

        return bestMove;
    };

    const handleCellClick = (index: number) => {
        if (board[index] || !isPlayerTurn || winner) return;

        const newBoard = [...board];
        newBoard[index] = "X";
        setBoard(newBoard);

        const { winner: gameWinner, line } = checkWinner(newBoard);
        if (gameWinner) {
            setWinner(gameWinner);
            setWinningLine(line);
            updateStats(gameWinner);
        } else {
            setIsPlayerTurn(false);
        }
    };

    const updateStats = (gameWinner: Player | "draw") => {
        setStats((prev) => {
            if (gameWinner === "X") return { ...prev, wins: prev.wins + 1 };
            if (gameWinner === "O") return { ...prev, losses: prev.losses + 1 };
            return { ...prev, draws: prev.draws + 1 };
        });
    };

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setIsPlayerTurn(true);
        setWinner(null);
        setWinningLine(null);
    };

    const resetStats = () => {
        setStats({ wins: 0, losses: 0, draws: 0 });
        localStorage.removeItem("ticTacToeStats");
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            {/* Difficulty Selector */}
            <div className="mb-6">
                <p className="text-sm font-semibold text-muted-foreground mb-3">AI Difficulty:</p>
                <div className="flex flex-wrap gap-2">
                    <Button
                        variant={difficulty === "easy" ? "default" : "outline"}
                        size="sm"
                        onClick={() => {
                            setDifficulty("easy");
                            resetGame();
                        }}
                        className="gap-2"
                    >
                        <Zap className="size-3" />
                        Easy
                    </Button>
                    <Button
                        variant={difficulty === "medium" ? "default" : "outline"}
                        size="sm"
                        onClick={() => {
                            setDifficulty("medium");
                            resetGame();
                        }}
                        className="gap-2"
                    >
                        <Brain className="size-3" />
                        Medium
                    </Button>
                    <Button
                        variant={difficulty === "impossible" ? "default" : "outline"}
                        size="sm"
                        onClick={() => {
                            setDifficulty("impossible");
                            resetGame();
                        }}
                        className="gap-2"
                    >
                        <Trophy className="size-3" />
                        Impossible
                    </Button>
                </div>
            </div>

            {/* Stats */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-3">
                    <Badge variant="secondary" className="gap-2 px-4 py-2 text-sm">
                        <Trophy className="size-4 text-green-500" />
                        Wins: {stats.wins}
                    </Badge>
                    <Badge variant="secondary" className="gap-2 px-4 py-2 text-sm">
                        <Trophy className="size-4 text-red-500" />
                        Losses: {stats.losses}
                    </Badge>
                    <Badge variant="secondary" className="gap-2 px-4 py-2 text-sm">
                        <Trophy className="size-4 text-yellow-500" />
                        Draws: {stats.draws}
                    </Badge>
                </div>
                <Button onClick={resetStats} variant="ghost" size="sm" className="text-xs">
                    Reset Stats
                </Button>
            </div>

            {/* Game Status */}
            <div className="mb-4 text-center">
                {!winner && (
                    <div className="flex items-center justify-center gap-2 text-lg font-semibold">
                        {isPlayerTurn ? (
                            <>
                                <User className="size-5 text-primary" />
                                <span>Your Turn (X)</span>
                            </>
                        ) : (
                            <>
                                <Brain className="size-5 text-purple-500 animate-pulse" />
                                <span>AI Thinking (O)...</span>
                            </>
                        )}
                    </div>
                )}
                {winner && (
                    <Card className={`border-2 ${winner === "X" ? "border-green-500 bg-green-500/10" : winner === "O" ? "border-red-500 bg-red-500/10" : "border-yellow-500 bg-yellow-500/10"}`}>
                        <CardContent className="py-4">
                            <div className="text-center">
                                <div className="text-2xl font-bold">
                                    {winner === "X" && "🎉 You Win!"}
                                    {winner === "O" && "🤖 AI Wins!"}
                                    {winner === "draw" && "🤝 It's a Draw!"}
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">
                                    {winner === "X" && "Congratulations! You beat the AI!"}
                                    {winner === "O" && difficulty === "impossible" && "The AI is unbeatable in Impossible mode!"}
                                    {winner === "O" && difficulty !== "impossible" && "Better luck next time!"}
                                    {winner === "draw" && "Well played by both sides!"}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>

            {/* Game Board */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6 max-w-md mx-auto">
                {board.map((cell, index) => {
                    const isWinningCell = winningLine?.includes(index);
                    return (
                        <button
                            key={index}
                            onClick={() => handleCellClick(index)}
                            disabled={!isPlayerTurn || !!winner || !!cell}
                            className={`aspect-square flex items-center justify-center text-4xl sm:text-5xl font-bold rounded-lg border-2 transition-all duration-200 ${isWinningCell
                                    ? "border-primary bg-primary/20 scale-105"
                                    : "border-border bg-card hover:border-primary hover:bg-accent"
                                } ${!cell && isPlayerTurn && !winner
                                    ? "cursor-pointer hover:scale-105"
                                    : "cursor-not-allowed"
                                } disabled:opacity-50`}
                        >
                            {cell === "X" && <span className="text-primary">✕</span>}
                            {cell === "O" && <span className="text-purple-500">◯</span>}
                        </button>
                    );
                })}
            </div>

            {/* Reset Button */}
            <div className="flex justify-center">
                <Button onClick={resetGame} variant="outline" className="gap-2">
                    <RotateCcw className="size-4" />
                    New Game
                </Button>
            </div>

            {/* Instructions */}
            <div className="mt-6 rounded-lg border border-border/50 bg-accent/20 p-4">
                <p className="text-center text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">How to play:</span> You are X, AI is O.
                    Get three in a row to win! Try the Impossible mode to face an unbeatable AI powered by the minimax algorithm.
                </p>
            </div>
        </div>
    );
}
