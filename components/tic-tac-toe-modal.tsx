"use client";

import { useState } from "react";
import { Brain, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { TicTacToe } from "@/components/tic-tac-toe";

export function TicTacToeModal() {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    size="lg"
                    className="group relative overflow-hidden rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-8 py-6 text-base font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50"
                >
                    {/* Animated background shimmer */}
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                    {/* Pulsing glow effect */}
                    <div className="absolute -inset-1 animate-pulse rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-30 blur-lg" />

                    {/* Button content */}
                    <span className="relative flex items-center gap-2">
                        <Brain className="size-5 animate-pulse" />
                        Challenge AI
                        <Sparkles className="size-4 animate-pulse" />
                    </span>
                </Button>
            </DialogTrigger>
            <DialogContent className="w-[calc(100vw-1rem)] max-w-[calc(100vw-1rem)] sm:max-w-3xl max-h-[88dvh] sm:max-h-[90vh] overflow-y-auto overflow-x-hidden p-4 sm:p-6">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-lg sm:text-2xl">
                        <Brain className="size-6 text-purple-500" />
                        Tic-Tac-Toe vs AI
                    </DialogTitle>
                    <DialogDescription>
                        Challenge the AI in three difficulty levels. Can you beat the unbeatable minimax algorithm?
                    </DialogDescription>
                </DialogHeader>
                <div className="mt-4">
                    <TicTacToe />
                </div>
            </DialogContent>
        </Dialog>
    );
}
