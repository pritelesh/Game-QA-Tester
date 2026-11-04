"use client";

import React, { useEffect, useState, useMemo, useRef } from "react";
import { cn } from "@/lib/utils";

interface PerspectiveGridProps {
    /** Additional CSS classes for the grid container */
    className?: string;
    /** Number of tiles per row/column (default: 40) */
    gridSize?: number;
    /** Whether to show the gradient overlay (default: true) */
    showOverlay?: boolean;
    /** Fade radius percentage for the gradient overlay (default: 80) */
    fadeRadius?: number;
}

export function PerspectiveGrid({
    className,
    gridSize = 40,
    showOverlay = true,
    fadeRadius = 80,
}: PerspectiveGridProps) {
    const [mounted, setMounted] = useState(false);

    const hostRef = useRef<HTMLDivElement | null>(null);
    const rippleRef = useRef<HTMLDivElement | null>(null);
    const lastRippleRef = useRef(0);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Mouse-follow ripple: works even though the grid sits behind content
    // layers (no per-tile hover). Drives a CSS radial glow + expanding pulse.
    useEffect(() => {
        const host = hostRef.current;
        if (!host || typeof window === "undefined") return;

        const onMove = (e: MouseEvent) => {
            const rect = host.getBoundingClientRect();
            if (rect.width === 0 || rect.height === 0) return;
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            host.style.setProperty("--mx", `${x}%`);
            host.style.setProperty("--my", `${y}%`);

            const now = performance.now();
            const ripple = rippleRef.current;
            if (ripple && now - lastRippleRef.current > 70) {
                lastRippleRef.current = now;
                ripple.style.animation = "none";
                void ripple.offsetWidth;
                ripple.style.animation = "pg-ripple 0.7s ease-out";
            }
        };

        window.addEventListener("mousemove", onMove);
        return () => window.removeEventListener("mousemove", onMove);
    }, []);

    // Memoize tiles array to prevent unnecessary re-renders
    const tiles = useMemo(() => Array.from({ length: gridSize * gridSize }), [gridSize]);

    return (
        <div
            ref={hostRef}
            className={cn(
                "relative w-full h-full overflow-hidden bg-transparent",
                "[--fade-stop:#121212]",
                "[--mx:50%] [--my:50%]",
                className
            )}
            style={{
                perspective: "2000px",
                transformStyle: "preserve-3d",
            }}
        >
            {/* Persistent cursor glow that follows the mouse */}
            <div className="pg-cursor absolute inset-0 pointer-events-none" />
            {/* Expanding ripple pulse */}
            <div ref={rippleRef} className="pg-ripple absolute pointer-events-none" />

            <div
                className="absolute w-[80rem] aspect-square grid origin-center"
                style={{
                    left: "50%",
                    top: "50%",
                    transform:
                        "translate(-50%, -50%) rotateX(30deg) rotateY(-5deg) rotateZ(20deg) scale(2)",
                    transformStyle: "preserve-3d",
                    gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                    gridTemplateRows: `repeat(${gridSize}, 1fr)`,
                }}
            >
                {/* Tiles */}
                {mounted &&
                    tiles.map((_, i) => (
                        <div
                            key={i}
                            className="tile min-h-[1px] min-w-[1px] border border-white/[0.06] bg-transparent transition-colors duration-[1500ms] hover:duration-0 hover:bg-white/[0.05] hover:border-white/15"
                        />
                    ))}
            </div>

            {/* Radial Gradient Mask (Overlay) */}
            {showOverlay && (
                <div
                    className="absolute inset-0 pointer-events-none z-10"
                    style={{
                        background: `radial-gradient(circle, transparent 25%, var(--fade-stop) ${fadeRadius}%)`,
                    }}
                />
            )}
        </div>
    );
}

export default PerspectiveGrid;

