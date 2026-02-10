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
import { SimonSaysGame } from "@/components/simon-says-game";

export function SimonSaysModal() {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    size="lg"
                    className="group relative overflow-hidden rounded-full bg-gradient-to-r from-rose-600 via-pink-600 to-fuchsia-600 px-8 py-6 text-base font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/50"
                >
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    <div className="absolute -inset-1 animate-pulse rounded-full bg-gradient-to-r from-rose-600 via-pink-600 to-fuchsia-600 opacity-30 blur-lg" />
                    <span className="relative flex items-center gap-2">
                        <Gamepad2 className="size-5 animate-pulse" />
                        Play Simon Says
                        <Sparkles className="size-4 animate-pulse" />
                    </span>
                </Button>
            </DialogTrigger>
            <DialogContent className="w-[calc(100vw-1rem)] max-w-[calc(100vw-1rem)] sm:max-w-3xl max-h-[88dvh] sm:max-h-[90vh] overflow-y-auto overflow-x-hidden p-4 sm:p-6">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-lg sm:text-2xl">
                        <Gamepad2 className="size-6 text-pink-500" />
                        Simon Says Memory Game
                    </DialogTitle>
                    <DialogDescription>
                        Watch the pattern and repeat it! Each level adds one more step.
                    </DialogDescription>
                </DialogHeader>
                <div className="mt-4">
                    <SimonSaysGame />
                </div>
            </DialogContent>
        </Dialog>
    );
}
