"use client";

import React from "react";

interface GridMapProps {
    color?: string;
    spacing?: number; // pixels
    opacity?: number;
}

export default function GridMap({ color = "rgba(0,0,0,0.03)", spacing = 120, opacity = 0.06 }: GridMapProps) {
    // Use Tailwind arbitrary value syntax to avoid inline styles
    const bgClass = `[background:linear-gradient(${color}_1px,transparent_1px),linear-gradient(90deg,${color}_1px,transparent_1px)]`;
    const sizeClass = `bg-size-[${spacing}px_${spacing}px]`;
    const opacityClass = `opacity-[${opacity}]`;

    return <div aria-hidden className={`pointer-events-none absolute inset-0 z-10 ${bgClass} ${sizeClass} ${opacityClass}`} />;
}
