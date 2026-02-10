"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, RotateCcw, Plus, Activity, XCircle, Timer, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type PromiseMode = "all" | "allSettled" | "race" | "any";
type PromiseStatus = "idle" | "pending" | "fulfilled" | "rejected";

type PromiseItem = {
    id: number;
    duration: number;
    status: PromiseStatus;
    progress: number;
    shouldFail: boolean;
};

export function PromiseVisualizer() {
    const [promises, setPromises] = useState<PromiseItem[]>([
        { id: 1, duration: 2000, status: "idle", progress: 0, shouldFail: false },
        { id: 2, duration: 1500, status: "idle", progress: 0, shouldFail: false },
        { id: 3, duration: 3000, status: "idle", progress: 0, shouldFail: true },
    ]);
    const [mode, setMode] = useState<PromiseMode>("all");
    const [isRunning, setIsRunning] = useState(false);
    const [overallStatus, setOverallStatus] = useState<PromiseStatus>("idle");
    const [resultMessage, setResultMessage] = useState("");
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const startTimeRef = useRef<number>(0);

    const addPromise = () => {
        const id = Math.max(0, ...promises.map(p => p.id)) + 1;
        setPromises([...promises, {
            id,
            duration: Math.floor(Math.random() * 3000) + 1000,
            status: "idle",
            progress: 0,
            shouldFail: Math.random() > 0.7
        }]);
    };

    const removePromise = (id: number) => {
        if (promises.length <= 1) return;
        setPromises(promises.filter(p => p.id !== id));
    };

    const toggleFail = (id: number) => {
        if (isRunning) return;
        setPromises(promises.map(p =>
            p.id === id ? { ...p, shouldFail: !p.shouldFail } : p
        ));
    };

    const reset = () => {
        setIsRunning(false);
        setOverallStatus("idle");
        setResultMessage("");
        if (intervalRef.current) clearInterval(intervalRef.current);
        setPromises(promises.map(p => ({ ...p, status: "idle", progress: 0 })));
    };

    const runSimulation = () => {
        if (isRunning) return;

        setOverallStatus("pending");
        setResultMessage("");
        setIsRunning(true);
        startTimeRef.current = Date.now();

        setPromises(prev => prev.map(p => ({ ...p, status: "pending", progress: 0 })));

        intervalRef.current = setInterval(() => {
            const now = Date.now();
            const elapsed = now - startTimeRef.current;

            setPromises(currentPromises => {
                const nextPromises = currentPromises.map(p => {
                    if (p.status !== "pending") return p;

                    const newProgress = Math.min(100, (elapsed / p.duration) * 100);
                    const isFinished = newProgress >= 100;

                    return {
                        ...p,
                        progress: newProgress,
                        status: (isFinished ? (p.shouldFail ? "rejected" : "fulfilled") : "pending") as PromiseStatus
                    };
                });

                const fulfilledCount = nextPromises.filter(p => p.status === "fulfilled").length;
                const rejectedCount = nextPromises.filter(p => p.status === "rejected").length;
                const total = nextPromises.length;

                let shouldStop = false;
                let finalStatus: PromiseStatus = "pending";
                let msg = "";

                if (mode === "all") {
                    if (rejectedCount > 0) {
                        shouldStop = true;
                        finalStatus = "rejected";
                        msg = "Promise.all() rejected because one promise failed.";
                    } else if (fulfilledCount === total) {
                        shouldStop = true;
                        finalStatus = "fulfilled";
                        msg = "Promise.all() fulfilled because all promises succeeded.";
                    }
                } else if (mode === "allSettled") {
                    if (fulfilledCount + rejectedCount === total) {
                        shouldStop = true;
                        finalStatus = "fulfilled";
                        msg = "Promise.allSettled() finished. It never rejects.";
                    }
                } else if (mode === "race") {
                    const firstSettled = nextPromises.find(p => p.status !== "pending");
                    if (firstSettled) {
                        shouldStop = true;
                        finalStatus = firstSettled.status;
                        msg = `Promise.race() settled with P${firstSettled.id} (${firstSettled.status}).`;
                    }
                } else if (mode === "any") {
                    if (fulfilledCount > 0) {
                        shouldStop = true;
                        finalStatus = "fulfilled";
                        msg = "Promise.any() fulfilled because one promise succeeded.";
                    } else if (rejectedCount === total) {
                        shouldStop = true;
                        finalStatus = "rejected";
                        msg = "Promise.any() rejected because ALL promises failed (AggregateError).";
                    }
                }

                if (shouldStop) {
                    setOverallStatus(finalStatus);
                    setResultMessage(msg);
                    setIsRunning(false);
                    setTimeout(() => {
                        if (intervalRef.current) clearInterval(intervalRef.current);
                    }, 0);
                }

                return nextPromises;
            });
        }, 16);
    };

    useEffect(() => {
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    return (
        <div className="w-full max-w-5xl mx-auto p-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Controls Card */}
                <Card className="col-span-1 lg:col-span-3 border-border bg-card shadow-sm">
                    <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                            <div className="relative w-full sm:w-[200px]">
                                <select
                                    value={mode}
                                    onChange={(e) => { reset(); setMode(e.target.value as PromiseMode); }}
                                    disabled={isRunning}
                                    className="w-full h-10 px-3 py-2 text-sm rounded-md border border-input bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
                                >
                                    <option value="all">Promise.all()</option>
                                    <option value="allSettled">Promise.allSettled()</option>
                                    <option value="race">Promise.race()</option>
                                    <option value="any">Promise.any()</option>
                                </select>
                                <div className="absolute right-3 top-3 pointer-events-none opacity-50">
                                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>

                            <div className="flex gap-2 w-full sm:w-auto">
                                <Button onClick={runSimulation} disabled={isRunning || overallStatus !== "idle"} className="flex-1 sm:flex-none gap-2 bg-primary hover:bg-primary/90">
                                    <Play className="size-4" />
                                    Run
                                </Button>

                                <Button onClick={reset} variant="outline" size="icon" disabled={isRunning} className="shrink-0">
                                    <RotateCcw className="size-4" />
                                </Button>
                            </div>
                        </div>

                        <Button onClick={addPromise} variant="secondary" size="sm" className="gap-2 w-full md:w-auto" disabled={isRunning}>
                            <Plus className="size-4" /> Add Promise
                        </Button>
                    </CardContent>
                </Card>

                {/* Status Card */}
                <Card className={`col-span-1 lg:col-span-3 border-2 transition-all duration-300 ${overallStatus === "idle" ? "border-muted bg-muted/20" :
                    overallStatus === "pending" ? "border-blue-500 bg-blue-500/10" :
                        overallStatus === "fulfilled" ? "border-green-500 bg-green-500/10" :
                            "border-red-500 bg-red-500/10"
                    }`}>
                    <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-2">
                            <Activity className={`size-6 ${overallStatus === "idle" ? "text-muted-foreground" :
                                overallStatus === "pending" ? "text-blue-500 animate-pulse" :
                                    overallStatus === "fulfilled" ? "text-green-500" : "text-red-500"
                                }`} />
                            <h3 className="text-xl font-bold">
                                {overallStatus === "idle" ? "Ready" :
                                    mode === "all" ? "Promise.all()" :
                                        mode === "allSettled" ? "Promise.allSettled()" :
                                            mode === "race" ? "Promise.race()" :
                                                "Promise.any()"
                                }
                            </h3>
                            {overallStatus !== "idle" && (
                                <Badge variant={overallStatus === "fulfilled" ? "default" : overallStatus === "rejected" ? "destructive" : "secondary"} className="ml-auto">
                                    {overallStatus === "pending" ? "PENDING" : overallStatus.toUpperCase()}
                                </Badge>
                            )}
                        </div>
                        <p className="text-muted-foreground text-sm pl-9">
                            {resultMessage || "Configure promises below and click Run to visualize the combinator logic."}
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Promises Grid */}
            <div className="grid gap-4">
                {promises.map((p) => (
                    <div key={p.id} className="relative group">
                        {/* Background Container */}
                        <div className="absolute inset-0 bg-card rounded-xl border border-border shadow-sm overflow-hidden" />

                        {/* Progress Background Fill */}
                        <div
                            className={`absolute inset-y-0 left-0 transition-all duration-100 ease-linear ${p.status === "fulfilled" ? "bg-green-500/10" :
                                p.status === "rejected" ? "bg-red-500/10" :
                                    "bg-blue-500/5"
                                }`}
                            style={{ width: `${p.progress}%` }}
                        />

                        {/* Content */}
                        <div className="relative p-4 flex flex-col sm:flex-row items-center gap-4 z-10">
                            {/* ID & Status Icon */}
                            <div className="flex items-center gap-4 w-full sm:w-48 shrink-0">
                                <div className={`size-10 rounded-full flex items-center justify-center font-bold text-sm border-2 shadow-sm ${p.status === "fulfilled" ? "border-green-500 text-green-500 bg-green-100 dark:bg-green-950" :
                                    p.status === "rejected" ? "border-red-500 text-red-500 bg-red-100 dark:bg-red-950" :
                                        "border-muted-foreground text-muted-foreground bg-secondary"
                                    }`}>
                                    {p.status === "fulfilled" ? <CheckCircle2 className="size-5" /> :
                                        p.status === "rejected" ? <XCircle className="size-5" /> :
                                            <span className="text-xs">P{p.id}</span>
                                    }
                                </div>
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-2 text-sm font-medium">
                                        <Timer className="size-3 text-muted-foreground" />
                                        {(p.duration / 1000).toFixed(1)}s
                                    </div>
                                    <span className={`text-xs capitalize ${p.status === "fulfilled" ? "text-green-600 font-semibold" :
                                        p.status === "rejected" ? "text-red-600 font-semibold" :
                                            "text-muted-foreground"
                                        }`}>
                                        {p.status}
                                    </span>
                                </div>
                            </div>

                            {/* Progress Bar (Visual) */}
                            <div className="w-full bg-secondary/50 rounded-full h-3 overflow-hidden border border-border/50">
                                <div
                                    className={`h-full transition-all duration-100 ease-linear rounded-full ${p.status === "fulfilled" ? "bg-green-500" :
                                        p.status === "rejected" ? "bg-red-500" :
                                            "bg-blue-500"
                                        }`}
                                    style={{ width: `${p.progress}%` }}
                                />
                            </div>

                            {/* Controls */}
                            <div className="flex items-center gap-2 shrink-0">
                                <Button
                                    variant={p.shouldFail ? "destructive" : "outline"}
                                    size="sm"
                                    onClick={() => toggleFail(p.id)}
                                    disabled={isRunning}
                                    className={`w-32 transition-colors ${!p.shouldFail && !isRunning ? "hover:border-green-500 hover:text-green-600" : ""
                                        }`}
                                >
                                    {p.shouldFail ? "Will Fail" : "Will Resolve"}
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removePromise(p.id)}
                                    disabled={isRunning || promises.length <= 1}
                                    className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                                >
                                    <XCircle className="size-5" />
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
