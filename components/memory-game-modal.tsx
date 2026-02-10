"use client";

import { useState } from "react";
import { Gamepad2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { MemoryGame } from "@/components/memory-game";

export function MemoryGameModal() {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    size="lg"
                    className="group relative overflow-hidden rounded-full bg-gradient-to-r from-primary via-purple-600 to-pink-600 px-8 py-6 text-base font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/50"
                >
                    {/* Animated background shimmer */}
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                    {/* Pulsing glow effect */}
                    <div className="absolute -inset-1 animate-pulse rounded-full bg-gradient-to-r from-primary via-purple-600 to-pink-600 opacity-30 blur-lg" />

                    {/* Button content */}
                    <span className="relative flex items-center gap-2">
                        <Gamepad2 className="size-5 animate-bounce" />
                        Play Memory Game
                        <Sparkles className="size-4 animate-pulse" />
                    </span>
                </Button>
            </DialogTrigger>
            <DialogContent className="w-[calc(100vw-1rem)] max-w-[calc(100vw-1rem)] sm:max-w-4xl max-h-[88dvh] sm:max-h-[90vh] overflow-y-auto overflow-x-hidden p-4 sm:p-6">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-lg sm:text-2xl">
                        <Gamepad2 className="size-6 text-primary" />
                        Tech Stack Memory Game
                    </DialogTitle>
                    <DialogDescription>
                        Match pairs of tech logos and test your memory! Try to complete the
                        game in the fewest moves possible.
                    </DialogDescription>
                </DialogHeader>
                <div className="mt-4">
                    <MemoryGame />
                </div>
            </DialogContent>
        </Dialog>
    );
}
