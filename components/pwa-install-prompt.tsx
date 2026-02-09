"use client";

import { useState, useEffect } from "react";
import { X, Download, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function PwaInstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [showPrompt, setShowPrompt] = useState(false);
    const [isIOS, setIsIOS] = useState(false);

    useEffect(() => {
        // Check if already installed (standalone mode)
        const isStandalone = window.matchMedia("(display-mode: standalone)").matches
            || (window.navigator as unknown as { standalone?: boolean }).standalone === true;

        if (isStandalone) return;

        // Check if dismissed before (within last 7 days)
        const dismissed = localStorage.getItem("pwa-prompt-dismissed");
        if (dismissed) {
            const dismissedDate = new Date(dismissed);
            const daysSinceDismissed = (Date.now() - dismissedDate.getTime()) / (1000 * 60 * 60 * 24);
            if (daysSinceDismissed < 7) return;
        }

        // Check for iOS
        const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent);
        setIsIOS(isIOSDevice);

        // For iOS, show the prompt after a delay (since there's no beforeinstallprompt)
        if (isIOSDevice) {
            const timer = setTimeout(() => setShowPrompt(true), 3000);
            return () => clearTimeout(timer);
        }

        // For other browsers, listen for beforeinstallprompt
        const handleBeforeInstall = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e as BeforeInstallPromptEvent);
            // Show prompt after a small delay for better UX
            setTimeout(() => setShowPrompt(true), 3000);
        };

        window.addEventListener("beforeinstallprompt", handleBeforeInstall);

        return () => {
            window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
        };
    }, []);

    const handleInstall = async () => {
        if (!deferredPrompt) return;

        await deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === "accepted") {
            setShowPrompt(false);
        }
        setDeferredPrompt(null);
    };

    const handleDismiss = () => {
        setShowPrompt(false);
        localStorage.setItem("pwa-prompt-dismissed", new Date().toISOString());
    };

    if (!showPrompt) return null;

    return (
        <div className="fixed bottom-4 left-4 right-4 z-50 animate-in slide-in-from-bottom-5 duration-500 sm:left-auto sm:right-6 sm:max-w-sm">
            <div className="relative overflow-hidden rounded-xl border border-border bg-card/95 p-4 shadow-2xl backdrop-blur-xl">
                {/* Gradient accent */}
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-primary/80 to-primary/50" />

                {/* Close button */}
                <button
                    onClick={handleDismiss}
                    className="absolute right-3 top-3 rounded-md p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                    aria-label="Dismiss"
                >
                    <X className="size-4" />
                </button>

                <div className="flex items-start gap-3 pr-6">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <Smartphone className="size-5 text-primary" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-semibold text-foreground">Install App</h3>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                            {isIOS
                                ? "Tap the share button and 'Add to Home Screen'"
                                : "Install for quick access and offline viewing"}
                        </p>
                    </div>
                </div>

                {!isIOS && (
                    <div className="mt-3 flex gap-2">
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={handleDismiss}
                            className="flex-1 text-xs"
                        >
                            Not now
                        </Button>
                        <Button
                            size="sm"
                            onClick={handleInstall}
                            className="flex-1 gap-1.5 text-xs"
                        >
                            <Download className="size-3.5" />
                            Install
                        </Button>
                    </div>
                )}

                {isIOS && (
                    <div className="mt-3">
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={handleDismiss}
                            className="w-full text-xs"
                        >
                            Got it
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
