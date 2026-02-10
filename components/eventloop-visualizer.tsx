"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Zap, Database, Globe, FileText, Timer } from "lucide-react";

type TaskType = "setTimeout" | "fetch" | "fs" | "crypto" | "setImmediate" | "nextTick";
type TaskStatus = "pending" | "executing" | "completed";

type Task = {
    id: number;
    type: TaskType;
    name: string;
    status: TaskStatus;
    phase: "callstack" | "webapi" | "taskqueue" | "microtask" | "threadpool" | "completed";
    duration: number;
    color: string;
};

const TASK_TYPES = [
    { type: "setTimeout" as TaskType, name: "setTimeout", icon: Timer, color: "from-blue-400 to-blue-600", duration: 2000 },
    { type: "fetch" as TaskType, name: "fetch API", icon: Globe, color: "from-green-400 to-green-600", duration: 3000 },
    { type: "fs" as TaskType, name: "fs.readFile", icon: FileText, color: "from-purple-400 to-purple-600", duration: 2500 },
    { type: "crypto" as TaskType, name: "crypto.pbkdf2", icon: Database, color: "from-orange-400 to-orange-600", duration: 3500 },
    { type: "setImmediate" as TaskType, name: "setImmediate", icon: Zap, color: "from-pink-400 to-pink-600", duration: 1000 },
    { type: "nextTick" as TaskType, name: "nextTick", icon: Zap, color: "from-cyan-400 to-cyan-600", duration: 500 },
];

export function EventLoopVisualizer() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [taskIdCounter, setTaskIdCounter] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [currentPhase, setCurrentPhase] = useState<string>("Idle");

    const addTask = (taskType: TaskType) => {
        const taskInfo = TASK_TYPES.find(t => t.type === taskType)!;
        const newTask: Task = {
            id: taskIdCounter,
            type: taskType,
            name: taskInfo.name,
            status: "pending",
            phase: "callstack",
            duration: taskInfo.duration,
            color: taskInfo.color,
        };

        setTasks(prev => [...prev, newTask]);
        setTaskIdCounter(prev => prev + 1);

        if (!isRunning) {
            setIsRunning(true);
        }
    };

    useEffect(() => {
        if (!isRunning || tasks.length === 0) return;

        const interval = setInterval(() => {
            setTasks(prevTasks => {
                let updated = [...prevTasks];
                let hasChanges = false;

                // Process tasks through event loop phases
                updated = updated.map(task => {
                    if (task.status === "completed") return task;

                    switch (task.phase) {
                        case "callstack":
                            // Move to appropriate queue based on type
                            hasChanges = true;
                            if (task.type === "nextTick") {
                                return { ...task, phase: "microtask", status: "pending" };
                            } else if (task.type === "setImmediate") {
                                return { ...task, phase: "taskqueue", status: "pending" };
                            } else if (task.type === "fs" || task.type === "crypto") {
                                return { ...task, phase: "threadpool", status: "executing" };
                            } else {
                                return { ...task, phase: "webapi", status: "executing" };
                            }

                        case "webapi":
                        case "threadpool":
                            // Simulate async operation completion
                            if (Math.random() > 0.7) {
                                hasChanges = true;
                                return { ...task, phase: "taskqueue", status: "pending" };
                            }
                            return task;

                        case "microtask":
                            // Process microtasks immediately
                            if (Math.random() > 0.5) {
                                hasChanges = true;
                                setCurrentPhase("Processing Microtask Queue");
                                return { ...task, phase: "completed", status: "completed" };
                            }
                            return task;

                        case "taskqueue":
                            // Process task queue
                            if (Math.random() > 0.6) {
                                hasChanges = true;
                                setCurrentPhase("Processing Task Queue");
                                return { ...task, phase: "completed", status: "completed" };
                            }
                            return task;

                        default:
                            return task;
                    }
                });

                // Remove completed tasks after a delay
                const activeTasksExist = updated.some(t => t.status !== "completed");
                if (!activeTasksExist) {
                    setCurrentPhase("Idle");
                    setIsRunning(false);
                }

                return updated;
            });
        }, 800);

        return () => clearInterval(interval);
    }, [isRunning, tasks.length]);

    const getTasksByPhase = (phase: string) => {
        return tasks.filter(t => t.phase === phase && t.status !== "completed");
    };

    const clearCompleted = () => {
        setTasks(prev => prev.filter(t => t.status !== "completed"));
    };

    const reset = () => {
        setTasks([]);
        setIsRunning(false);
        setCurrentPhase("Idle");
    };

    return (
        <div className="w-full max-w-6xl mx-auto">
            {/* Controls */}
            <div className="mb-6 space-y-4">
                <div className="flex flex-wrap gap-2">
                    {TASK_TYPES.map(({ type, name, icon: Icon, color }) => (
                        <Button
                            key={type}
                            onClick={() => addTask(type)}
                            className={`gap-2 bg-gradient-to-r ${color} hover:opacity-90`}
                            size="sm"
                        >
                            <Icon className="size-4" />
                            {name}
                        </Button>
                    ))}
                </div>

                <div className="flex gap-2">
                    <Button onClick={clearCompleted} variant="outline" size="sm">
                        Clear Completed
                    </Button>
                    <Button onClick={reset} variant="outline" size="sm">
                        Reset All
                    </Button>
                </div>

                <div className="flex items-center gap-4">
                    <Badge variant="secondary" className="px-4 py-2">
                        Status: {currentPhase}
                    </Badge>
                    <Badge variant="secondary" className="px-4 py-2">
                        Active Tasks: {tasks.filter(t => t.status !== "completed").length}
                    </Badge>
                </div>
            </div>

            {/* Event Loop Visualization */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Call Stack */}
                <Card className="border-2 border-blue-500/30 bg-gradient-to-br from-blue-500/5 to-blue-600/5">
                    <CardContent className="p-4">
                        <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse" />
                            Call Stack
                        </h3>
                        <div className="space-y-2 min-h-[100px]">
                            {getTasksByPhase("callstack").map(task => (
                                <div
                                    key={task.id}
                                    className={`p-2 rounded bg-gradient-to-r ${task.color} text-white text-xs font-medium animate-in slide-in-from-bottom`}
                                >
                                    {task.name} #{task.id}
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Web APIs / libuv */}
                <Card className="border-2 border-green-500/30 bg-gradient-to-br from-green-500/5 to-green-600/5">
                    <CardContent className="p-4">
                        <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                            Web APIs / libuv
                        </h3>
                        <div className="space-y-2 min-h-[100px]">
                            {getTasksByPhase("webapi").map(task => (
                                <div
                                    key={task.id}
                                    className={`p-2 rounded bg-gradient-to-r ${task.color} text-white text-xs font-medium animate-pulse`}
                                >
                                    {task.name} #{task.id} ⏳
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Thread Pool */}
                <Card className="border-2 border-purple-500/30 bg-gradient-to-br from-purple-500/5 to-purple-600/5">
                    <CardContent className="p-4">
                        <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-purple-500 animate-pulse" />
                            Thread Pool (4 threads)
                        </h3>
                        <div className="space-y-2 min-h-[100px]">
                            {getTasksByPhase("threadpool").slice(0, 4).map(task => (
                                <div
                                    key={task.id}
                                    className={`p-2 rounded bg-gradient-to-r ${task.color} text-white text-xs font-medium animate-pulse`}
                                >
                                    {task.name} #{task.id} 🔄
                                </div>
                            ))}
                            {getTasksByPhase("threadpool").length > 4 && (
                                <div className="text-xs text-muted-foreground text-center">
                                    +{getTasksByPhase("threadpool").length - 4} waiting...
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Microtask Queue */}
                <Card className="border-2 border-cyan-500/30 bg-gradient-to-br from-cyan-500/5 to-cyan-600/5">
                    <CardContent className="p-4">
                        <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-cyan-500 animate-pulse" />
                            Microtask Queue
                        </h3>
                        <div className="space-y-2 min-h-[100px]">
                            {getTasksByPhase("microtask").map(task => (
                                <div
                                    key={task.id}
                                    className={`p-2 rounded bg-gradient-to-r ${task.color} text-white text-xs font-medium animate-in slide-in-from-right`}
                                >
                                    {task.name} #{task.id} ⚡
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Task Queue (Callback Queue) */}
                <Card className="border-2 border-orange-500/30 bg-gradient-to-br from-orange-500/5 to-orange-600/5">
                    <CardContent className="p-4">
                        <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-orange-500 animate-pulse" />
                            Task Queue
                        </h3>
                        <div className="space-y-2 min-h-[100px]">
                            {getTasksByPhase("taskqueue").map(task => (
                                <div
                                    key={task.id}
                                    className={`p-2 rounded bg-gradient-to-r ${task.color} text-white text-xs font-medium animate-in slide-in-from-left`}
                                >
                                    {task.name} #{task.id} 📋
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Completed */}
                <Card className="border-2 border-green-500/30 bg-gradient-to-br from-green-500/5 to-green-600/5">
                    <CardContent className="p-4">
                        <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-green-500" />
                            Completed
                        </h3>
                        <div className="space-y-2 min-h-[100px] max-h-[200px] overflow-y-auto">
                            {tasks.filter(t => t.status === "completed").map(task => (
                                <div
                                    key={task.id}
                                    className={`p-2 rounded bg-gradient-to-r ${task.color} opacity-50 text-white text-xs font-medium`}
                                >
                                    {task.name} #{task.id} ✓
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Info */}
            <Card className="mt-6 border-border/50 bg-accent/20">
                <CardContent className="py-4">
                    <p className="text-sm text-muted-foreground text-center">
                        <span className="font-semibold text-foreground">Node.js Event Loop:</span> Click buttons to fire async
                        operations. Watch how tasks flow through the Call Stack → Web APIs/Thread Pool → Queues → Completion.
                        Microtasks (nextTick) have priority over regular tasks!
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
