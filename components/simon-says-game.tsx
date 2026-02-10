"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Play, RotateCcw, Trophy } from "lucide-react";

type Color = "red" | "blue" | "green" | "yellow";

const COLORS: Color[] = ["red", "blue", "green", "yellow"];

const COLOR_CLASSES = {
    red: "bg-red-500 hover:bg-red-400 active:bg-red-300",
    blue: "bg-blue-500 hover:bg-blue-400 active:bg-blue-300",
    green: "bg-green-500 hover:bg-green-400 active:bg-green-300",
    yellow: "bg-yellow-500 hover:bg-yellow-400 active:bg-yellow-300",
};

export function SimonSaysGame() {
    const [sequence, setSequence] = useState<Color[]>([]);
    const [playerSequence, setPlayerSequence] = useState<Color[]>([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isShowingSequence, setIsShowingSequence] = useState(false);
    const [activeColor, setActiveColor] = useState<Color | null>(null);
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("simon-best-score");
        if (saved) setBestScore(parseInt(saved));
    }, []);

    const startGame = () => {
        const firstColor = COLORS[Math.floor(Math.random() * COLORS.length)];
        setSequence([firstColor]);
        setPlayerSequence([]);
        setScore(0);
        setGameOver(false);
        setIsPlaying(true);
        setTimeout(() => showSequence([firstColor]), 500);
    };

    const showSequence = async (seq: Color[]) => {
        setIsShowingSequence(true);
        for (const color of seq) {
            await new Promise((resolve) => setTimeout(resolve, 200));
            setActiveColor(color);
            await new Promise((resolve) => setTimeout(resolve, 600));
            setActiveColor(null);
        }
        setIsShowingSequence(false);
    };

    const handleColorClick = async (color: Color) => {
        if (isShowingSequence || gameOver || !isPlaying) return;

        setActiveColor(color);
        setTimeout(() => setActiveColor(null), 300);

        const newPlayerSequence = [...playerSequence, color];
        setPlayerSequence(newPlayerSequence);

        if (color !== sequence[newPlayerSequence.length - 1]) {
            setGameOver(true);
            setIsPlaying(false);
            return;
        }

        if (newPlayerSequence.length === sequence.length) {
            const newScore = score + 1;
            setScore(newScore);
            if (newScore > bestScore) {
                setBestScore(newScore);
                localStorage.setItem("simon-best-score", newScore.toString());
            }

            const nextColor = COLORS[Math.floor(Math.random() * COLORS.length)];
            const newSequence = [...sequence, nextColor];
            setSequence(newSequence);
            setPlayerSequence([]);

            setTimeout(() => showSequence(newSequence), 1000);
        }
    };

    const resetGame = () => {
        setSequence([]);
        setPlayerSequence([]);
        setScore(0);
        setGameOver(false);
        setIsPlaying(false);
        setIsShowingSequence(false);
        setActiveColor(null);
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            {/* Controls */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <div className="flex gap-2">
                    {!isPlaying && (
                        <Button onClick={startGame} className="gap-2">
                            <Play className="size-4" />
                            Start Game
                        </Button>
                    )}
                    <Button onClick={resetGame} variant="outline" className="gap-2">
                        <RotateCcw className="size-4" />
                        Reset
                    </Button>
                </div>

                <div className="flex gap-3">
                    <Badge variant="secondary" className="gap-2 px-4 py-2">
                        Level: {score}
                    </Badge>
                    <Badge variant="secondary" className="gap-2 px-4 py-2">
                        <Trophy className="size-4" />
                        Best: {bestScore}
                    </Badge>
                </div>
            </div>

            {/* Game Status */}
            {isPlaying && (
                <div className="mb-4 text-center">
                    <p className="text-sm font-medium text-muted-foreground">
                        {isShowingSequence
                            ? "Watch the sequence..."
                            : `Your turn! (${playerSequence.length}/${sequence.length})`}
                    </p>
                </div>
            )}

            {/* Game Board */}
            <div className="relative aspect-square max-w-md mx-auto">
                <div className="grid grid-cols-2 gap-4 h-full">
                    {COLORS.map((color) => (
                        <button
                            key={color}
                            onClick={() => handleColorClick(color)}
                            disabled={isShowingSequence || gameOver || !isPlaying}
                            className={`rounded-lg transition-all duration-200 ${COLOR_CLASSES[color]} ${activeColor === color ? "scale-95 brightness-150" : "scale-100"
                                } ${isShowingSequence || !isPlaying ? "cursor-not-allowed opacity-60" : "cursor-pointer"
                                } disabled:cursor-not-allowed`}
                        />
                    ))}
                </div>

                {/* Game Over Overlay */}
                {gameOver && (
                    <div className="absolute inset-0 bg-black/80 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                            <h3 className="text-2xl font-bold text-white mb-2">Game Over!</h3>
                            <p className="text-white mb-4">You reached level {score}</p>
                            <Button onClick={startGame}>Play Again</Button>
                        </div>
                    </div>
                )}

                {/* Start Overlay */}
                {!isPlaying && !gameOver && (
                    <div className="absolute inset-0 bg-black/60 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                            <h3 className="text-xl font-bold text-white mb-2">Simon Says</h3>
                            <p className="text-sm text-white/80">Press Start to begin</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Instructions */}
            <Card className="mt-6 border-border/50 bg-accent/20">
                <CardContent className="py-4">
                    <p className="text-sm text-muted-foreground text-center">
                        <span className="font-semibold text-foreground">Simon Says:</span> Watch the sequence of colors,
                        then repeat it by clicking the colored buttons in the same order. Each level adds one more color!
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
