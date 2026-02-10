"use client";

import { useState } from "react";
import { Network, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { BSTVisualizer } from "@/components/bst-visualizer";

export function BSTModal() {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    size="lg"
                    className="group relative overflow-hidden rounded-full bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 px-8 py-6 text-base font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50"
                >
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    <div className="absolute -inset-1 animate-pulse rounded-full bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 opacity-30 blur-lg" />
                    <span className="relative flex items-center gap-2">
                        <Network className="size-5" />
                        Binary Search Tree
                        <Sparkles className="size-4 animate-pulse" />
                    </span>
                </Button>
            </DialogTrigger>
            <DialogContent className="w-[calc(100vw-1rem)] max-w-[calc(100vw-1rem)] sm:max-w-5xl max-h-[88dvh] sm:max-h-[90vh] overflow-y-auto overflow-x-hidden p-4 sm:p-6">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-lg sm:text-2xl">
                        <Network className="size-6 text-blue-500" />
                        Binary Search Tree Visualizer
                    </DialogTitle>
                    <DialogDescription>
                        Insert, search, and delete nodes in a BST. Watch the tree structure update in real-time.
                    </DialogDescription>
                </DialogHeader>
                <div className="mt-4">
                    <BSTVisualizer />
                </div>
            </DialogContent>
        </Dialog>
    );
}
