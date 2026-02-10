"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RotateCcw, Trophy, Timer, Zap } from "lucide-react";
import {
    SiReact,
    SiNextdotjs,
    SiTypescript,
    SiJavascript,
    SiNodedotjs,
    SiGo,
    SiUnity,
    SiFirebase,
} from "react-icons/si";

type CardType = {
    id: number;
    icon: React.ComponentType<{ className?: string }>;
    name: string;
    matched: boolean;
    flipped: boolean;
};

const techIcons = [
    { icon: SiReact, name: "React", color: "#61DAFB" },
    { icon: SiNextdotjs, name: "Next.js", color: "#000000" },
    { icon: SiTypescript, name: "TypeScript", color: "#3178C6" },
    { icon: SiJavascript, name: "JavaScript", color: "#F7DF1E" },
    { icon: SiNodedotjs, name: "Node.js", color: "#339933" },
    { icon: SiGo, name: "Go", color: "#00ADD8" },
    { icon: SiUnity, name: "Unity", color: "#FFFFFF" },
    { icon: SiFirebase, name: "Firebase", color: "#FFCA28" },
];

export function MemoryGame() {
    const [cards, setCards] = useState<CardType[]>([]);
    const [flippedCards, setFlippedCards] = useState<number[]>([]);
    const [moves, setMoves] = useState(0);
    const [matches, setMatches] = useState(0);
    const [gameWon, setGameWon] = useState(false);
    const [timer, setTimer] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [bestScore, setBestScore] = useState<number | null>(null);

    // Initialize game
    useEffect(() => {
        initializeGame();
        // Load best score from localStorage
        const saved = localStorage.getItem("memoryGameBestScore");
        if (saved) setBestScore(parseInt(saved));
    }, []);

    // Timer
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying && !gameWon) {
            interval = setInterval(() => {
                setTimer((prev) => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isPlaying, gameWon]);

    const initializeGame = () => {
        // Create pairs of cards
        const cardPairs = techIcons.flatMap((tech, index) => [
            {
                id: index * 2,
                icon: tech.icon,
                name: tech.name,
                matched: false,
                flipped: false,
            },
            {
                id: index * 2 + 1,
                icon: tech.icon,
                name: tech.name,
                matched: false,
                flipped: false,
            },
        ]);

        // Shuffle cards
        const shuffled = cardPairs.sort(() => Math.random() - 0.5);
        setCards(shuffled);
        setFlippedCards([]);
        setMoves(0);
        setMatches(0);
        setGameWon(false);
        setTimer(0);
        setIsPlaying(false);
    };

    const handleCardClick = (id: number) => {
        if (!isPlaying) setIsPlaying(true);

        const card = cards.find((c) => c.id === id);
        if (!card || card.matched || card.flipped || flippedCards.length === 2) {
            return;
        }

        const newCards = cards.map((c) =>
            c.id === id ? { ...c, flipped: true } : c
        );
        setCards(newCards);

        const newFlipped = [...flippedCards, id];
        setFlippedCards(newFlipped);

        if (newFlipped.length === 2) {
            setMoves((prev) => prev + 1);
            const [first, second] = newFlipped;
            const firstCard = newCards.find((c) => c.id === first);
            const secondCard = newCards.find((c) => c.id === second);

            if (firstCard?.name === secondCard?.name) {
                // Match found!
                setTimeout(() => {
                    setCards((prev) =>
                        prev.map((c) =>
                            c.id === first || c.id === second
                                ? { ...c, matched: true, flipped: false }
                                : c
                        )
                    );
                    setFlippedCards([]);
                    setMatches((prev) => {
                        const newMatches = prev + 1;
                        if (newMatches === techIcons.length) {
                            setGameWon(true);
                            setIsPlaying(false);
                            // Update best score
                            if (!bestScore || moves + 1 < bestScore) {
                                setBestScore(moves + 1);
                                localStorage.setItem(
                                    "memoryGameBestScore",
                                    (moves + 1).toString()
                                );
                            }
                        }
                        return newMatches;
                    });
                }, 600);
            } else {
                // No match
                setTimeout(() => {
                    setCards((prev) =>
                        prev.map((c) =>
                            c.id === first || c.id === second ? { ...c, flipped: false } : c
                        )
                    );
                    setFlippedCards([]);
                }, 1000);
            }
        }
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    return (
        <div className="w-full">
            {/* Game Stats */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-3">
                    <Badge variant="secondary" className="gap-2 px-4 py-2 text-sm">
                        <Zap className="size-4" />
                        Moves: {moves}
                    </Badge>
                    <Badge variant="secondary" className="gap-2 px-4 py-2 text-sm">
                        <Trophy className="size-4" />
                        Matches: {matches}/{techIcons.length}
                    </Badge>
                    <Badge variant="secondary" className="gap-2 px-4 py-2 text-sm">
                        <Timer className="size-4" />
                        Time: {formatTime(timer)}
                    </Badge>
                    {bestScore && (
                        <Badge variant="outline" className="gap-2 px-4 py-2 text-sm">
                            <Trophy className="size-4 text-yellow-500" />
                            Best: {bestScore} moves
                        </Badge>
                    )}
                </div>
                <Button
                    onClick={initializeGame}
                    variant="outline"
                    size="sm"
                    className="gap-2"
                >
                    <RotateCcw className="size-4" />
                    New Game
                </Button>
            </div>

            {/* Win Message */}
            {gameWon && (
                <div className="mb-6 animate-in fade-in slide-in-from-top-4 duration-500">
                    <Card className="border-2 border-primary bg-primary/5">
                        <CardContent className="flex flex-col items-center gap-3 py-6 text-center">
                            <Trophy className="size-12 text-primary" />
                            <div>
                                <h3 className="text-2xl font-bold text-foreground">
                                    🎉 Congratulations!
                                </h3>
                                <p className="mt-2 text-sm text-muted-foreground">
                                    You completed the game in{" "}
                                    <span className="font-semibold text-foreground">
                                        {moves} moves
                                    </span>{" "}
                                    and{" "}
                                    <span className="font-semibold text-foreground">
                                        {formatTime(timer)}
                                    </span>
                                    !
                                </p>
                                {bestScore === moves && (
                                    <Badge variant="default" className="mt-3">
                                        🏆 New Best Score!
                                    </Badge>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* Game Board */}
            <div className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-3 lg:grid-cols-4">
                {cards.map((card) => {
                    const Icon = card.icon;
                    return (
                        <button
                            key={card.id}
                            onClick={() => handleCardClick(card.id)}
                            disabled={card.matched || card.flipped}
                            className="group relative aspect-square w-full"
                            aria-label={`${card.name} card`}
                        >
                            <div
                                className={`relative h-full w-full transition-all duration-500 [transform-style:preserve-3d] ${card.flipped || card.matched ? "[transform:rotateY(180deg)]" : ""
                                    }`}
                            >
                                {/* Card Back */}
                                <div className="absolute inset-0 flex items-center justify-center rounded-lg border-2 border-border bg-gradient-to-br from-accent to-accent/50 shadow-md [backface-visibility:hidden] group-hover:border-primary group-hover:shadow-lg group-disabled:cursor-not-allowed">
                                    <div className="text-2xl sm:text-3xl opacity-20">?</div>
                                </div>

                                {/* Card Front */}
                                <div
                                    className={`absolute inset-0 flex items-center justify-center rounded-lg border-2 shadow-md [backface-visibility:hidden] [transform:rotateY(180deg)] ${card.matched
                                        ? "border-primary bg-primary/10"
                                        : "border-border bg-card"
                                        }`}
                                >
                                    <Icon
                                        className={`size-8 sm:size-10 md:size-12 transition-all ${card.matched ? "text-primary" : "text-foreground"
                                            }`}
                                    />
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Instructions */}
            <div className="mt-6 rounded-lg border border-border/50 bg-accent/20 p-4">
                <p className="text-center text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">How to play:</span>{" "}
                    Click on cards to flip them and find matching pairs of tech logos.
                    Try to complete the game in the fewest moves possible!
                </p>
            </div>
        </div>
    );
}
