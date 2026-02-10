"use client";

import { type ReactElement, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Trash2, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";

type TreeNode = {
    value: number;
    left: TreeNode | null;
    right: TreeNode | null;
    x?: number;
    y?: number;
};

export function BSTVisualizer() {
    const [root, setRoot] = useState<TreeNode | null>(null);
    const [inputValue, setInputValue] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [highlightedNodes, setHighlightedNodes] = useState<Set<number>>(new Set());
    const [message, setMessage] = useState("");

    const insert = (node: TreeNode | null, value: number): TreeNode => {
        if (node === null) {
            return { value, left: null, right: null };
        }

        if (value < node.value) {
            node.left = insert(node.left, value);
        } else if (value > node.value) {
            node.right = insert(node.right, value);
        }

        return node;
    };

    const handleInsert = () => {
        const value = parseInt(inputValue);
        if (isNaN(value)) {
            setMessage("Please enter a valid number");
            return;
        }

        setRoot((prevRoot) => insert(prevRoot, value));
        setInputValue("");
        setMessage(`Inserted ${value}`);
        setTimeout(() => setMessage(""), 2000);
    };

    const searchBST = async (node: TreeNode | null, value: number, path: number[] = []): Promise<boolean> => {
        if (node === null) {
            setMessage(`${value} not found in tree`);
            return false;
        }

        path.push(node.value);
        setHighlightedNodes(new Set(path));
        await new Promise((resolve) => setTimeout(resolve, 500));

        if (value === node.value) {
            setMessage(`Found ${value}!`);
            return true;
        }

        if (value < node.value) {
            return searchBST(node.left, value, path);
        } else {
            return searchBST(node.right, value, path);
        }
    };

    const handleSearch = async () => {
        const value = parseInt(searchValue);
        if (isNaN(value)) {
            setMessage("Please enter a valid number");
            return;
        }

        setHighlightedNodes(new Set());
        await searchBST(root, value);
        setTimeout(() => setHighlightedNodes(new Set()), 2000);
    };

    const findMin = (node: TreeNode): TreeNode => {
        while (node.left !== null) {
            node = node.left;
        }
        return node;
    };

    const deleteNode = (node: TreeNode | null, value: number): TreeNode | null => {
        if (node === null) return null;

        if (value < node.value) {
            node.left = deleteNode(node.left, value);
        } else if (value > node.value) {
            node.right = deleteNode(node.right, value);
        } else {
            if (node.left === null) return node.right;
            if (node.right === null) return node.left;

            const minRight = findMin(node.right);
            node.value = minRight.value;
            node.right = deleteNode(node.right, minRight.value);
        }

        return node;
    };

    const handleDelete = () => {
        const value = parseInt(searchValue);
        if (isNaN(value)) {
            setMessage("Please enter a valid number");
            return;
        }

        setRoot((prevRoot) => deleteNode(prevRoot, value));
        setMessage(`Deleted ${value}`);
        setTimeout(() => setMessage(""), 2000);
    };

    const calculatePositions = (node: TreeNode | null, x: number, y: number, offset: number): void => {
        if (node === null) return;

        node.x = x;
        node.y = y;

        if (node.left) {
            calculatePositions(node.left, x - offset, y + 80, offset / 2);
        }
        if (node.right) {
            calculatePositions(node.right, x + offset, y + 80, offset / 2);
        }
    };

    if (root) {
        calculatePositions(root, 400, 50, 150);
    }

    const renderTree = (node: TreeNode | null): ReactElement[] => {
        if (node === null) return [];

        const elements: ReactElement[] = [];

        if (node.left && node.x !== undefined && node.y !== undefined && node.left.x !== undefined && node.left.y !== undefined) {
            elements.push(
                <line
                    key={`line-${node.value}-${node.left.value}`}
                    x1={node.x}
                    y1={node.y}
                    x2={node.left.x}
                    y2={node.left.y}
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-border"
                />
            );
            elements.push(...renderTree(node.left));
        }

        if (node.right && node.x !== undefined && node.y !== undefined && node.right.x !== undefined && node.right.y !== undefined) {
            elements.push(
                <line
                    key={`line-${node.value}-${node.right.value}`}
                    x1={node.x}
                    y1={node.y}
                    x2={node.right.x}
                    y2={node.right.y}
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-border"
                />
            );
            elements.push(...renderTree(node.right));
        }

        if (node.x !== undefined && node.y !== undefined) {
            const isHighlighted = highlightedNodes.has(node.value);
            elements.push(
                <g key={`node-${node.value}`}>
                    <circle
                        cx={node.x}
                        cy={node.y}
                        r="25"
                        className={`transition-all duration-300 ${isHighlighted ? "fill-primary stroke-primary" : "fill-card stroke-border"
                            }`}
                        strokeWidth="2"
                    />
                    <text
                        x={node.x}
                        y={node.y}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className={`text-sm font-bold ${isHighlighted ? "fill-primary-foreground" : "fill-foreground"}`}
                    >
                        {node.value}
                    </text>
                </g>
            );
        }

        return elements;
    };

    const clearTree = () => {
        setRoot(null);
        setMessage("Tree cleared");
        setTimeout(() => setMessage(""), 2000);
    };

    return (
        <div className="w-full">
            {/* Controls */}
            <div className="mb-6 space-y-4">
                <div className="flex flex-wrap gap-2">
                    <div className="flex flex-wrap gap-2">
                        <Input
                            type="number"
                            placeholder="Enter value"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && handleInsert()}
                            className="w-full min-w-0 sm:w-32"
                        />
                        <Button onClick={handleInsert} className="gap-2">
                            <Plus className="size-4" />
                            Insert
                        </Button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <Input
                            type="number"
                            placeholder="Search/Delete"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                            className="w-full min-w-0 sm:w-32"
                        />
                        <Button onClick={handleSearch} variant="outline" className="gap-2">
                            <Play className="size-4" />
                            Search
                        </Button>
                        <Button onClick={handleDelete} variant="outline" className="gap-2">
                            <Trash2 className="size-4" />
                            Delete
                        </Button>
                    </div>

                    <Button onClick={clearTree} variant="outline" className="gap-2">
                        <Trash2 className="size-4" />
                        Clear All
                    </Button>
                </div>

                {message && (
                    <Badge variant="secondary" className="text-sm">
                        {message}
                    </Badge>
                )}
            </div>

            {/* Tree Visualization */}
            <div className="border-2 border-border rounded-lg bg-card p-2 sm:p-4 overflow-x-auto">
                {root ? (
                    <svg viewBox="0 0 800 400" className="w-full max-w-full h-auto min-h-[240px] sm:min-h-[280px]" preserveAspectRatio="xMidYMid meet">
                        {renderTree(root)}
                    </svg>
                ) : (
                    <div className="flex items-center justify-center h-64 text-muted-foreground">
                        <p>Insert values to build the tree</p>
                    </div>
                )}
            </div>

            {/* Info */}
            <Card className="mt-6 border-border/50 bg-accent/20">
                <CardContent className="py-4">
                    <p className="text-sm text-muted-foreground text-center">
                        <span className="font-semibold text-foreground">Binary Search Tree:</span> Insert values to build the tree.
                        Search highlights the path taken. Smaller values go left, larger values go right.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
