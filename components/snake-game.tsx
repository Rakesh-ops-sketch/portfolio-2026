"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Play, RotateCcw, Trophy, Zap, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

type Position = { x: number; y: number };
type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SNAKE: Position[] = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION: Direction = "RIGHT";
const GAME_SPEED = 150;

export function SnakeGame() {
    const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
    const [food, setFood] = useState<Position>({ x: 15, y: 10 });
    const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION);
    const [nextDirection, setNextDirection] = useState<Direction>(INITIAL_DIRECTION);
    const [isPlaying, setIsPlaying] = useState(false);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const touchStartRef = useRef<{ x: number; y: number } | null>(null);

    const setDirectionFromInput = useCallback((newDir: Direction) => {
        const opposite: Record<Direction, Direction> = { UP: "DOWN", DOWN: "UP", LEFT: "RIGHT", RIGHT: "LEFT" };
        setNextDirection((prev) => (direction !== opposite[newDir] ? newDir : prev));
    }, [direction]);

    useEffect(() => {
        const saved = localStorage.getItem("snake-high-score");
        if (saved) setHighScore(parseInt(saved));
    }, []);

    const generateFood = useCallback((currentSnake: Position[]): Position => {
        let newFood: Position;
        do {
            newFood = {
                x: Math.floor(Math.random() * GRID_SIZE),
                y: Math.floor(Math.random() * GRID_SIZE),
            };
        } while (currentSnake.some((segment) => segment.x === newFood.x && segment.y === newFood.y));
        return newFood;
    }, []);

    const resetGame = () => {
        setSnake(INITIAL_SNAKE);
        setFood(generateFood(INITIAL_SNAKE));
        setDirection(INITIAL_DIRECTION);
        setNextDirection(INITIAL_DIRECTION);
        setScore(0);
        setGameOver(false);
        setIsPlaying(false);
    };

    const checkCollision = (head: Position, body: Position[]): boolean => {
        if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
            return true;
        }
        return body.some((segment) => segment.x === head.x && segment.y === head.y);
    };

    useEffect(() => {
        if (!isPlaying || gameOver) return;

        const handleKeyPress = (e: KeyboardEvent) => {
            switch (e.key) {
                case "ArrowUp":
                    if (direction !== "DOWN") setNextDirection("UP");
                    break;
                case "ArrowDown":
                    if (direction !== "UP") setNextDirection("DOWN");
                    break;
                case "ArrowLeft":
                    if (direction !== "RIGHT") setNextDirection("LEFT");
                    break;
                case "ArrowRight":
                    if (direction !== "LEFT") setNextDirection("RIGHT");
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, [direction, isPlaying, gameOver]);

    const handleTouchStart = useCallback((e: React.TouchEvent) => {
        touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }, []);

    const handleTouchEnd = useCallback((e: React.TouchEvent) => {
        const start = touchStartRef.current;
        if (!start || !isPlaying || gameOver) return;
        const end = e.changedTouches[0];
        const dx = end.clientX - start.x;
        const dy = end.clientY - start.y;
        const minSwipe = 30;
        if (Math.abs(dx) > Math.abs(dy)) {
            if (dx > minSwipe) setDirectionFromInput("RIGHT");
            else if (dx < -minSwipe) setDirectionFromInput("LEFT");
        } else {
            if (dy > minSwipe) setDirectionFromInput("DOWN");
            else if (dy < -minSwipe) setDirectionFromInput("UP");
        }
        touchStartRef.current = null;
    }, [isPlaying, gameOver, setDirectionFromInput]);

    useEffect(() => {
        if (!isPlaying || gameOver) return;

        const gameLoop = setInterval(() => {
            setDirection(nextDirection);

            setSnake((prevSnake) => {
                const head = prevSnake[0];
                let newHead: Position;

                switch (nextDirection) {
                    case "UP":
                        newHead = { x: head.x, y: head.y - 1 };
                        break;
                    case "DOWN":
                        newHead = { x: head.x, y: head.y + 1 };
                        break;
                    case "LEFT":
                        newHead = { x: head.x - 1, y: head.y };
                        break;
                    case "RIGHT":
                        newHead = { x: head.x + 1, y: head.y };
                        break;
                }

                if (checkCollision(newHead, prevSnake)) {
                    setGameOver(true);
                    setIsPlaying(false);
                    return prevSnake;
                }

                const newSnake = [newHead, ...prevSnake];

                if (newHead.x === food.x && newHead.y === food.y) {
                    setScore((prev) => {
                        const newScore = prev + 10;
                        if (newScore > highScore) {
                            setHighScore(newScore);
                            localStorage.setItem("snake-high-score", newScore.toString());
                        }
                        return newScore;
                    });
                    setFood(generateFood(newSnake));
                    return newSnake;
                }

                newSnake.pop();
                return newSnake;
            });
        }, GAME_SPEED);

        return () => clearInterval(gameLoop);
    }, [isPlaying, gameOver, nextDirection, food, generateFood, highScore]);

    return (
        <div className="w-full max-w-2xl mx-auto">
            {/* Controls */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <div className="flex gap-2">
                    {!isPlaying && !gameOver && (
                        <Button onClick={() => setIsPlaying(true)} className="gap-2">
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
                        <Zap className="size-4" />
                        Score: {score}
                    </Badge>
                    <Badge variant="secondary" className="gap-2 px-4 py-2">
                        <Trophy className="size-4" />
                        Best: {highScore}
                    </Badge>
                </div>
            </div>

            {/* Game Board - scrollable on small screens; swipe to control on touch devices */}
            <div
                className="max-w-full overflow-auto rounded-lg touch-pan-y"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                <div
                    className="relative mx-auto border-4 border-border rounded-lg bg-card overflow-hidden shadow-xl shrink-0 touch-none"
                    style={{ width: GRID_SIZE * CELL_SIZE, height: GRID_SIZE * CELL_SIZE }}
                >
                {/* Grid lines */}
                <svg
                    className="absolute inset-0 pointer-events-none opacity-20"
                    width={GRID_SIZE * CELL_SIZE}
                    height={GRID_SIZE * CELL_SIZE}
                >
                    {Array.from({ length: GRID_SIZE + 1 }).map((_, i) => (
                        <line
                            key={`h-${i}`}
                            x1="0"
                            y1={i * CELL_SIZE}
                            x2={GRID_SIZE * CELL_SIZE}
                            y2={i * CELL_SIZE}
                            stroke="currentColor"
                            strokeWidth="1"
                        />
                    ))}
                    {Array.from({ length: GRID_SIZE + 1 }).map((_, i) => (
                        <line
                            key={`v-${i}`}
                            x1={i * CELL_SIZE}
                            y1="0"
                            x2={i * CELL_SIZE}
                            y2={GRID_SIZE * CELL_SIZE}
                            stroke="currentColor"
                            strokeWidth="1"
                        />
                    ))}
                </svg>

                {/* Snake */}
                {snake.map((segment, index) => (
                    <div
                        key={index}
                        className={`absolute ${index === 0 ? "bg-green-500" : "bg-green-600"} rounded-sm`}
                        style={{
                            left: segment.x * CELL_SIZE + 1,
                            top: segment.y * CELL_SIZE + 1,
                            width: CELL_SIZE - 2,
                            height: CELL_SIZE - 2,
                        }}
                    />
                ))}

                {/* Food */}
                <div
                    className="absolute bg-red-500 rounded-full animate-pulse"
                    style={{
                        left: food.x * CELL_SIZE + 3,
                        top: food.y * CELL_SIZE + 3,
                        width: CELL_SIZE - 6,
                        height: CELL_SIZE - 6,
                    }}
                />

                {/* Game Over Overlay */}
                {gameOver && (
                    <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
                        <div className="text-center">
                            <h3 className="text-2xl font-bold text-white mb-2">Game Over!</h3>
                            <p className="text-white mb-4">Score: {score}</p>
                            <Button onClick={resetGame}>Play Again</Button>
                        </div>
                    </div>
                )}

                {/* Start Overlay */}
                {!isPlaying && !gameOver && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <div className="text-center">
                            <h3 className="text-xl font-bold text-white mb-2">Press Start to Play</h3>
                            <p className="text-sm text-white/80">Use arrow keys to control</p>
                        </div>
                    </div>
                )}
                </div>
            </div>

            {/* Mobile / touch: on-screen direction buttons */}
            <div className="mt-4 flex flex-col items-center gap-2">
                <p className="text-xs text-muted-foreground sm:hidden">Swipe on the game or use buttons below</p>
                <div className="grid grid-cols-3 grid-rows-3 gap-1 place-items-center w-[140px] sm:w-[120px]">
                    <div className="col-start-2">
                        <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="h-12 w-12 sm:h-10 sm:w-10 touch-manipulation"
                            onClick={() => setDirectionFromInput("UP")}
                            disabled={!isPlaying || gameOver}
                            aria-label="Move up"
                        >
                            <ChevronUp className="size-6 sm:size-5" />
                        </Button>
                    </div>
                    <div className="col-start-1 row-start-2">
                        <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="h-12 w-12 sm:h-10 sm:w-10 touch-manipulation"
                            onClick={() => setDirectionFromInput("LEFT")}
                            disabled={!isPlaying || gameOver}
                            aria-label="Move left"
                        >
                            <ChevronLeft className="size-6 sm:size-5" />
                        </Button>
                    </div>
                    <div className="col-start-3 row-start-2">
                        <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="h-12 w-12 sm:h-10 sm:w-10 touch-manipulation"
                            onClick={() => setDirectionFromInput("RIGHT")}
                            disabled={!isPlaying || gameOver}
                            aria-label="Move right"
                        >
                            <ChevronRight className="size-6 sm:size-5" />
                        </Button>
                    </div>
                    <div className="col-start-2 row-start-3">
                        <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="h-12 w-12 sm:h-10 sm:w-10 touch-manipulation"
                            onClick={() => setDirectionFromInput("DOWN")}
                            disabled={!isPlaying || gameOver}
                            aria-label="Move down"
                        >
                            <ChevronDown className="size-6 sm:size-5" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Instructions */}
            <Card className="mt-6 border-border/50 bg-accent/20">
                <CardContent className="py-4">
                    <p className="text-sm text-muted-foreground text-center">
                        <span className="font-semibold text-foreground">Snake Game:</span>{" "}
                        <span className="hidden sm:inline">Use arrow keys </span>
                        <span className="sm:hidden">Swipe or use the direction buttons </span>
                        to control the snake. Eat the red food to grow and score points. Don&apos;t hit the walls or yourself!
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
