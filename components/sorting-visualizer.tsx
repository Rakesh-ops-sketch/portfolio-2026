"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Play, RotateCcw, Shuffle } from "lucide-react";

type Algorithm = "bubble" | "quick" | "merge" | "insertion" | "selection";

export function SortingVisualizer() {
    const [array, setArray] = useState<number[]>([]);
    const [arraySize, setArraySize] = useState(50);
    const [algorithm, setAlgorithm] = useState<Algorithm>("quick");
    const [isRunning, setIsRunning] = useState(false);
    const [comparing, setComparing] = useState<number[]>([]);
    const [sorted, setSorted] = useState<number[]>([]);
    const [speed, setSpeed] = useState(10);

    useEffect(() => {
        generateArray();
    }, [arraySize]);

    const generateArray = () => {
        const newArray = Array.from({ length: arraySize }, () =>
            Math.floor(Math.random() * 400) + 10
        );
        setArray(newArray);
        setComparing([]);
        setSorted([]);
    };

    const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    const bubbleSort = async () => {
        const arr = [...array];
        const n = arr.length;

        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                setComparing([j, j + 1]);
                await sleep(speed);

                if (arr[j] > arr[j + 1]) {
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                    setArray([...arr]);
                }
            }
            setSorted((prev) => [...prev, n - i - 1]);
        }
        setSorted(Array.from({ length: n }, (_, i) => i));
        setComparing([]);
    };

    const quickSort = async (arr: number[], low: number, high: number): Promise<void> => {
        if (low < high) {
            const pi = await partition(arr, low, high);
            await quickSort(arr, low, pi - 1);
            await quickSort(arr, pi + 1, high);
        }
    };

    const partition = async (arr: number[], low: number, high: number): Promise<number> => {
        const pivot = arr[high];
        let i = low - 1;

        for (let j = low; j < high; j++) {
            setComparing([j, high]);
            await sleep(speed);

            if (arr[j] < pivot) {
                i++;
                [arr[i], arr[j]] = [arr[j], arr[i]];
                setArray([...arr]);
            }
        }
        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        setArray([...arr]);
        setSorted((prev) => [...prev, i + 1]);
        return i + 1;
    };

    const mergeSort = async (arr: number[], left: number, right: number): Promise<void> => {
        if (left < right) {
            const mid = Math.floor((left + right) / 2);
            await mergeSort(arr, left, mid);
            await mergeSort(arr, mid + 1, right);
            await merge(arr, left, mid, right);
        }
    };

    const merge = async (arr: number[], left: number, mid: number, right: number): Promise<void> => {
        const leftArr = arr.slice(left, mid + 1);
        const rightArr = arr.slice(mid + 1, right + 1);

        let i = 0, j = 0, k = left;

        while (i < leftArr.length && j < rightArr.length) {
            setComparing([left + i, mid + 1 + j]);
            await sleep(speed);

            if (leftArr[i] <= rightArr[j]) {
                arr[k] = leftArr[i];
                i++;
            } else {
                arr[k] = rightArr[j];
                j++;
            }
            setArray([...arr]);
            k++;
        }

        while (i < leftArr.length) {
            arr[k] = leftArr[i];
            setArray([...arr]);
            i++;
            k++;
        }

        while (j < rightArr.length) {
            arr[k] = rightArr[j];
            setArray([...arr]);
            j++;
            k++;
        }
    };

    const insertionSort = async () => {
        const arr = [...array];
        const n = arr.length;

        for (let i = 1; i < n; i++) {
            const key = arr[i];
            let j = i - 1;

            setComparing([i, j]);
            await sleep(speed);

            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                setArray([...arr]);
                setComparing([j, j + 1]);
                await sleep(speed);
                j--;
            }
            arr[j + 1] = key;
            setArray([...arr]);
            setSorted((prev) => [...prev, i]);
        }
        setSorted(Array.from({ length: n }, (_, i) => i));
        setComparing([]);
    };

    const selectionSort = async () => {
        const arr = [...array];
        const n = arr.length;

        for (let i = 0; i < n - 1; i++) {
            let minIdx = i;

            for (let j = i + 1; j < n; j++) {
                setComparing([minIdx, j]);
                await sleep(speed);

                if (arr[j] < arr[minIdx]) {
                    minIdx = j;
                }
            }

            if (minIdx !== i) {
                [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
                setArray([...arr]);
            }
            setSorted((prev) => [...prev, i]);
        }
        setSorted(Array.from({ length: n }, (_, i) => i));
        setComparing([]);
    };

    const visualize = async () => {
        setIsRunning(true);
        setSorted([]);
        setComparing([]);

        const arr = [...array];

        switch (algorithm) {
            case "bubble":
                await bubbleSort();
                break;
            case "quick":
                await quickSort(arr, 0, arr.length - 1);
                setSorted(Array.from({ length: arr.length }, (_, i) => i));
                setComparing([]);
                break;
            case "merge":
                await mergeSort(arr, 0, arr.length - 1);
                setSorted(Array.from({ length: arr.length }, (_, i) => i));
                setComparing([]);
                break;
            case "insertion":
                await insertionSort();
                break;
            case "selection":
                await selectionSort();
                break;
        }

        setIsRunning(false);
    };

    const algorithmInfo = {
        bubble: { name: "Bubble Sort", complexity: "O(n²)" },
        quick: { name: "Quick Sort", complexity: "O(n log n)" },
        merge: { name: "Merge Sort", complexity: "O(n log n)" },
        insertion: { name: "Insertion Sort", complexity: "O(n²)" },
        selection: { name: "Selection Sort", complexity: "O(n²)" },
    };

    return (
        <div className="w-full">
            {/* Controls */}
            <div className="mb-6 space-y-4">
                <div className="flex flex-wrap gap-2">
                    {(["bubble", "quick", "merge", "insertion", "selection"] as Algorithm[]).map((algo) => (
                        <Button
                            key={algo}
                            variant={algorithm === algo ? "default" : "outline"}
                            size="sm"
                            onClick={() => setAlgorithm(algo)}
                            disabled={isRunning}
                            className="capitalize"
                        >
                            {algorithmInfo[algo].name}
                        </Button>
                    ))}
                </div>

                <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Size:</span>
                        <input
                            type="range"
                            min="10"
                            max="100"
                            value={arraySize}
                            onChange={(e) => setArraySize(Number(e.target.value))}
                            disabled={isRunning}
                            className="w-32"
                        />
                        <span className="text-sm text-muted-foreground">{arraySize}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Speed:</span>
                        <input
                            type="range"
                            min="1"
                            max="100"
                            value={101 - speed}
                            onChange={(e) => setSpeed(101 - Number(e.target.value))}
                            className="w-32"
                        />
                    </div>
                </div>

                <div className="flex flex-wrap gap-2">
                    <Button onClick={visualize} disabled={isRunning} className="gap-2">
                        <Play className="size-4" />
                        Sort
                    </Button>
                    <Button onClick={generateArray} disabled={isRunning} variant="outline" className="gap-2">
                        <Shuffle className="size-4" />
                        Generate New
                    </Button>
                </div>

                <Badge variant="secondary" className="text-sm">
                    Time Complexity: {algorithmInfo[algorithm].complexity}
                </Badge>
            </div>

            {/* Visualization */}
            <div className="flex items-end justify-center gap-[1px] h-96 bg-card border border-border rounded-lg p-4">
                {array.map((value, idx) => (
                    <div
                        key={idx}
                        className="flex-1 transition-all duration-100"
                        style={{
                            height: `${(value / 410) * 100}%`,
                            backgroundColor: sorted.includes(idx)
                                ? "rgb(34, 197, 94)" // green
                                : comparing.includes(idx)
                                    ? "rgb(239, 68, 68)" // red
                                    : "rgb(59, 130, 246)", // blue
                        }}
                    />
                ))}
            </div>

            {/* Info */}
            <Card className="mt-6 border-border/50 bg-accent/20">
                <CardContent className="py-4">
                    <p className="text-sm text-muted-foreground text-center">
                        <span className="font-semibold text-foreground">Sorting Visualizer:</span> Watch different sorting algorithms in action.
                        Red bars are being compared, blue bars are unsorted, and green bars are in their final sorted position.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
