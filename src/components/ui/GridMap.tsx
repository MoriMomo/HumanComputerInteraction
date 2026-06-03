"use client";

import React from "react";

interface GridMapProps {
    color?: string;
    spacing?: number; // pixels
    opacity?: number;
    variant?: "lines" | "squares";
}

export default function GridMap({
    color = "rgba(0,0,0,0.03)",
    spacing = 120,
    opacity = 0.06,
    variant = "lines",
}: GridMapProps) {
    // Use Tailwind arbitrary value syntax to avoid inline styles
    let bgClass = "";

    if (variant === "lines") {
        bgClass = `[background:linear-gradient(${color}_1px,transparent_1px),linear-gradient(90deg,${color}_1px,transparent_1px)]`;
    } else {
        // squares: draw both lines and light filled squares using radial-gradient overlay
        // first two gradients create grid lines, third creates subtle square spots
        bgClass = `[background:linear-gradient(${color}_1px,transparent_1px),linear-gradient(90deg,${color}_1px,transparent_1px),radial-gradient(circle at 0 0,${color} 6%,transparent 7%)]`;
    }

    const sizeClass = `bg-size-[${spacing}px_${spacing}px]`;
    const opacityClass = `opacity-[${opacity}]`;

    return <div aria-hidden className={`pointer-events-none absolute inset-0 z-10 ${bgClass} ${sizeClass} ${opacityClass}`} />;
}
