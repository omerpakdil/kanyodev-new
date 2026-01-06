"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface TypewriterTextProps {
    words: string[];
    className?: string;
    typingSpeed?: number;
    deletingSpeed?: number;
    pauseDuration?: number;
}

export function TypewriterText({
    words,
    className,
    typingSpeed = 80,
    deletingSpeed = 50,
    pauseDuration = 1500,
}: TypewriterTextProps) {
    const [wordIndex, setWordIndex] = useState(0);
    const [text, setText] = useState("");
    const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">("typing");

    useEffect(() => {
        const currentWord = words[wordIndex];

        let timeout: NodeJS.Timeout;

        switch (phase) {
            case "typing":
                if (text.length < currentWord.length) {
                    timeout = setTimeout(() => {
                        setText(currentWord.slice(0, text.length + 1));
                    }, typingSpeed);
                } else {
                    // Finished typing, pause
                    timeout = setTimeout(() => {
                        setPhase("deleting");
                    }, pauseDuration);
                }
                break;

            case "deleting":
                if (text.length > 0) {
                    timeout = setTimeout(() => {
                        setText(text.slice(0, -1));
                    }, deletingSpeed);
                } else {
                    // Finished deleting, move to next word
                    setWordIndex((prev) => (prev + 1) % words.length);
                    setPhase("typing");
                }
                break;
        }

        return () => clearTimeout(timeout);
    }, [text, phase, wordIndex, words, typingSpeed, deletingSpeed, pauseDuration]);

    return (
        <span className={cn("inline-block", className)}>
            {text}
            <span className="animate-pulse ml-0.5">|</span>
        </span>
    );
}
