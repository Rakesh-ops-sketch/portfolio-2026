"use client";

import { useState } from "react";
import { Zap, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { EventLoopVisualizer } from "@/components/eventloop-visualizer";

export function EventLoopModal() {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    size="lg"
                    className="group relative overflow-hidden rounded-full bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 px-8 py-6 text-base font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/50"
                >
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    <div className="absolute -inset-1 animate-pulse rounded-full bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 opacity-30 blur-lg" />
                    <span className="relative flex items-center gap-2">
                        <Activity className="size-5" />
                        Node.js Event Loop
                        <Zap className="size-4 animate-pulse" />
                    </span>
                </Button>
            </DialogTrigger>
            <DialogContent className="w-[calc(100vw-1rem)] max-w-[calc(100vw-1rem)] sm:max-w-7xl max-h-[88dvh] sm:max-h-[90vh] overflow-y-auto overflow-x-hidden p-4 sm:p-6">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-lg sm:text-2xl">
                        <Activity className="size-6 text-emerald-500" />
                        Node.js Event Loop Visualizer
                    </DialogTitle>
                    <DialogDescription>
                        Visualize how Node.js handles async operations, microtasks, and the libuv thread pool!
                    </DialogDescription>
                </DialogHeader>
                <div className="mt-4">
                    <EventLoopVisualizer />
                </div>
            </DialogContent>
        </Dialog>
    );
}
