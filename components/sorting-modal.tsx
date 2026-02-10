"use client";

import { useState } from "react";
import { BarChart3, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { SortingVisualizer } from "@/components/sorting-visualizer";

export function SortingModal() {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    size="lg"
                    className="group relative overflow-hidden rounded-full bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 px-8 py-6 text-base font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/50"
                >
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    <div className="absolute -inset-1 animate-pulse rounded-full bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 opacity-30 blur-lg" />
                    <span className="relative flex items-center gap-2">
                        <BarChart3 className="size-5" />
                        Sorting
                        <Sparkles className="size-4 animate-pulse" />
                    </span>
                </Button>
            </DialogTrigger>
            <DialogContent className="w-[calc(100vw-1rem)] max-w-[calc(100vw-1rem)] sm:max-w-5xl max-h-[88dvh] sm:max-h-[90vh] overflow-y-auto overflow-x-hidden p-4 sm:p-6">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-lg sm:text-2xl">
                        <BarChart3 className="size-6 text-orange-500" />
                        Sorting Algorithm Visualizer
                    </DialogTitle>
                    <DialogDescription>
                        Watch different sorting algorithms in action. Compare their performance!
                    </DialogDescription>
                </DialogHeader>
                <div className="mt-4">
                    <SortingVisualizer />
                </div>
            </DialogContent>
        </Dialog>
    );
}
