"use client";

import { type ReactElement, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Play } from "lucide-react";
import { Input } from "@/components/ui/input";

type RecursionNode = {
    value: number;
    result?: number;
    children: RecursionNode[];
    x?: number;
    y?: number;
};

type Algorithm = "fibonacci" | "factorial";

export function RecursionVisualizer() {
    const [algorithm, setAlgorithm] = useState<Algorithm>("fibonacci");
    const [inputValue, setInputValue] = useState("5");
    const [tree, setTree] = useState<RecursionNode | null>(null);
    const [result, setResult] = useState<number | null>(null);

    const buildFibonacciTree = (n: number): RecursionNode => {
        if (n <= 1) {
            return { value: n, result: n, children: [] };
        }

        const left = buildFibonacciTree(n - 1);
        const right = buildFibonacciTree(n - 2);
        const result = left.result! + right.result!;

        return {
            value: n,
            result,
            children: [left, right],
        };
    };

    const buildFactorialTree = (n: number): RecursionNode => {
        if (n <= 1) {
            return { value: n, result: 1, children: [] };
        }

        const child = buildFactorialTree(n - 1);
        const result = n * child.result!;

        return {
            value: n,
            result,
            children: [child],
        };
    };

    const calculatePositions = (
        node: RecursionNode,
        x: number,
        y: number,
        offset: number
    ): void => {
        node.x = x;
        node.y = y;

        if (node.children.length === 2) {
            // Fibonacci - increase spacing to prevent overlaps
            calculatePositions(node.children[0], x - offset, y + 100, offset * 0.7);
            calculatePositions(node.children[1], x + offset, y + 100, offset * 0.7);
        } else if (node.children.length === 1) {
            // Factorial - vertical layout
            calculatePositions(node.children[0], x, y + 100, offset * 0.7);
        }
    };

    const visualize = () => {
        const n = parseInt(inputValue);
        if (isNaN(n) || n < 0 || n > 10) {
            return;
        }

        let newTree: RecursionNode;
        if (algorithm === "fibonacci") {
            newTree = buildFibonacciTree(n);
        } else {
            newTree = buildFactorialTree(n);
        }

        const startX = algorithm === "fibonacci" ? 400 : 400;
        calculatePositions(newTree, startX, 50, algorithm === "fibonacci" ? 150 : 100);

        setTree(newTree);
        setResult(newTree.result!);
    };

    const renderTree = (node: RecursionNode): ReactElement[] => {
        const elements: ReactElement[] = [];

        node.children.forEach((child) => {
            if (node.x !== undefined && node.y !== undefined && child.x !== undefined && child.y !== undefined) {
                elements.push(
                    <line
                        key={`line-${node.value}-${child.value}-${child.x}`}
                        x1={node.x}
                        y1={node.y}
                        x2={child.x}
                        y2={child.y}
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-purple-300"
                    />
                );
            }
            elements.push(...renderTree(child));
        });

        if (node.x !== undefined && node.y !== undefined) {
            const isBaseCase = node.children.length === 0;
            elements.push(
                <g key={`node-${node.value}-${node.x}-${node.y}`} className="animate-in fade-in zoom-in duration-500">
                    {/* Animated pulsing glow effect */}
                    <circle
                        cx={node.x}
                        cy={node.y}
                        r="32"
                        className={isBaseCase ? "fill-emerald-500/20 animate-pulse" : "fill-purple-500/20 animate-pulse"}
                        filter="blur(8px)"
                    />
                    {/* Main circle with gradient and scale animation */}
                    <circle
                        cx={node.x}
                        cy={node.y}
                        r="30"
                        className={`transition-all duration-500 hover:scale-110 ${isBaseCase
                            ? "fill-gradient-to-br from-emerald-400 to-green-600 stroke-emerald-300"
                            : "fill-gradient-to-br from-purple-500 to-indigo-600 stroke-purple-300"
                            }`}
                        strokeWidth="3"
                        style={{
                            fill: isBaseCase
                                ? "url(#greenGradient)"
                                : "url(#purpleGradient)",
                            animation: isBaseCase
                                ? "none"
                                : "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
                        }}
                    />
                    {/* Function call text with fade-in animation */}
                    <text
                        x={node.x}
                        y={node.y - 5}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="text-sm font-bold fill-white drop-shadow-lg animate-in fade-in duration-700"
                        style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}
                    >
                        {algorithm === "fibonacci" ? `F(${node.value})` : `${node.value}!`}
                    </text>
                    {/* Result text with delayed fade-in */}
                    <text
                        x={node.x}
                        y={node.y + 10}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="text-xs font-semibold fill-white drop-shadow-lg animate-in fade-in duration-1000"
                        style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}
                    >
                        = {node.result}
                    </text>
                </g>
            );
        }

        return elements;
    };

    return (
        <div className="w-full">
            {/* Controls */}
            <div className="mb-6 space-y-4">
                <div className="flex flex-wrap gap-2">
                    <Button
                        variant={algorithm === "fibonacci" ? "default" : "outline"}
                        onClick={() => setAlgorithm("fibonacci")}
                    >
                        Fibonacci
                    </Button>
                    <Button
                        variant={algorithm === "factorial" ? "default" : "outline"}
                        onClick={() => setAlgorithm("factorial")}
                    >
                        Factorial
                    </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                    <Input
                        type="number"
                        min="0"
                        max="10"
                        placeholder="Enter n (0-10)"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && visualize()}
                        className="w-full min-w-0 sm:w-32"
                    />
                    <Button onClick={visualize} className="gap-2">
                        <Play className="size-4" />
                        Visualize
                    </Button>
                </div>

                {result !== null && (
                    <Badge variant="secondary" className="text-sm">
                        Result: {algorithm === "fibonacci" ? `F(${inputValue})` : `${inputValue}!`} = {result}
                    </Badge>
                )}
            </div>

            {/* Tree Visualization */}
            <div className="border-2 border-border rounded-lg bg-card p-2 sm:p-4 overflow-x-auto">
                {tree ? (
                    <svg viewBox="0 0 800 500" className="w-full max-w-full h-auto min-h-[280px] sm:min-h-[320px]" preserveAspectRatio="xMidYMid meet">
                        {/* Define gradients */}
                        <defs>
                            <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#a855f7" />
                                <stop offset="100%" stopColor="#4f46e5" />
                            </linearGradient>
                            <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#34d399" />
                                <stop offset="100%" stopColor="#059669" />
                            </linearGradient>
                        </defs>
                        {renderTree(tree)}
                    </svg>
                ) : (
                    <div className="flex items-center justify-center h-64 text-muted-foreground">
                        <p>Select an algorithm and click Visualize</p>
                    </div>
                )}
            </div>

            {/* Info */}
            <Card className="mt-6 border-border/50 bg-accent/20">
                <CardContent className="py-4">
                    <p className="text-sm text-muted-foreground text-center">
                        <span className="font-semibold text-foreground">Recursion Tree:</span> Visualize how recursive
                        algorithms break down problems. Green nodes are base cases. Each node shows the function call and its result.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
