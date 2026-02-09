"use client";

import { useState, useEffect } from "react";

const roles = [
    "Assistant Engineering Manager",
    "Engineering Lead",
    "Offline-first Specialist",
    "Full-Stack Developer",
];

export function FooterTypewriter() {
    const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentRole = roles[currentRoleIndex];
        const typingSpeed = isDeleting ? 40 : 80;

        const timeout = setTimeout(() => {
            if (!isDeleting) {
                // Typing
                if (displayText.length < currentRole.length) {
                    setDisplayText(currentRole.slice(0, displayText.length + 1));
                } else {
                    // Pause at the end before deleting
                    setTimeout(() => setIsDeleting(true), 2000);
                }
            } else {
                // Deleting
                if (displayText.length > 0) {
                    setDisplayText(currentRole.slice(0, displayText.length - 1));
                } else {
                    setIsDeleting(false);
                    setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
                }
            }
        }, typingSpeed);

        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, currentRoleIndex]);

    return (
        <div>
            <p className="text-base font-bold tracking-tight text-foreground">
                Rakesh Biswal<span className="text-muted-foreground">.</span>
            </p>
            <p className="mt-1 h-4 text-xs text-muted-foreground">
                <span className="inline-flex items-center">
                    {displayText}
                    <span className="ml-0.5 inline-block h-3 w-0.5 animate-pulse bg-primary" />
                </span>
            </p>
        </div>
    );
}
