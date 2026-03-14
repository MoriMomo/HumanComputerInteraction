"use client";

import { useEffect, useState } from "react";

interface LoadingOverlayProps {
    progressValue?: number;
}

export default function LoadingOverlay({ progressValue }: LoadingOverlayProps = {}) {
    const [simulatedProgress, setSimulatedProgress] = useState(0);

    const progress =
        typeof progressValue === "number"
            ? Math.min(Math.max(progressValue, 0), 100)
            : simulatedProgress;

    useEffect(() => {
        if (typeof progressValue === "number") {
            return;
        }

        const progressInterval = window.setInterval(() => {
            setSimulatedProgress((prev) => {
                if (prev >= 96) {
                    return 96;
                }
                return Math.min(96, prev + Math.random() * 6);
            });
        }, 150);

        return () => {
            window.clearInterval(progressInterval);
        };
    }, [progressValue]);

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-stone-900 via-neutral-900 to-stone-950 transition-opacity duration-500 ease-out ${progress >= 100 ? "pointer-events-none opacity-0" : "pointer-events-auto opacity-100"}`}
        >
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -inset-2.5 opacity-50">
                    <div className="absolute left-1/4 top-1/4 h-96 w-96 animate-pulse rounded-full bg-amber-900/20 blur-3xl" />
                    <div
                        className="absolute bottom-1/4 right-1/4 h-96 w-96 animate-pulse rounded-full bg-stone-800/20 blur-3xl"
                        style={{ animationDelay: "1s" }}
                    />
                </div>
            </div>

            <div className="relative z-10 flex flex-col items-center space-y-8 px-4">
                <div className="space-y-2 text-center animate-[fadeIn_0.8s_ease-out]">
                    <h1 className="text-5xl font-black tracking-tight md:text-7xl">
                        <span className="bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-600 bg-clip-text text-transparent">
                            SatSet
                        </span>
                    </h1>
                    <p className="text-sm font-medium tracking-wider text-stone-400 md:text-base animate-[fadeIn_0.8s_ease-out_0.2s_both]">
                        PREMIUM CARD HOLDER
                    </p>
                </div>

                <div className="relative h-32 w-32 animate-[fadeIn_0.8s_ease-out]">
                    <div className="absolute inset-0 rounded-full border-4 border-stone-800" />

                    <svg className="absolute inset-0 h-full w-full -rotate-90">
                        <circle
                            cx="64"
                            cy="64"
                            r="60"
                            stroke="url(#gradient)"
                            strokeWidth="4"
                            fill="none"
                            strokeDasharray={377}
                            strokeDashoffset={377 - (377 * Math.min(progress, 100)) / 100}
                            className="transition-all duration-300 ease-out"
                            strokeLinecap="round"
                        />
                        <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#00FAFF" />
                                <stop offset="50%" stopColor="#39FF14" />
                                <stop offset="100%" stopColor="#00FAFF" />
                            </linearGradient>
                        </defs>
                    </svg>

                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-gradient-to-br from-cyan-200 to-cyan-500 bg-clip-text text-3xl font-bold text-transparent">
                            {Math.round(Math.min(progress, 100))}%
                        </div>
                    </div>

                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/10 to-emerald-500/10 blur-xl animate-pulse" />
                </div>

                <div className="space-y-3 text-center">
                    <p className="text-sm font-medium text-stone-400">
                        {progress < 30 && "Preparing Experience..."}
                        {progress >= 30 && progress < 60 && "Loading Assets..."}
                        {progress >= 60 && progress < 90 && "Almost Ready..."}
                        {progress >= 90 && progress < 100 && "Finalizing..."}
                        {progress >= 100 && "Ready!"}
                    </p>

                    <div className="flex justify-center space-x-1">
                        <div className="h-2 w-2 animate-bounce rounded-full bg-cyan-400" />
                        <div className="h-2 w-2 animate-bounce rounded-full bg-cyan-400" style={{ animationDelay: "150ms" }} />
                        <div className="h-2 w-2 animate-bounce rounded-full bg-cyan-400" style={{ animationDelay: "300ms" }} />
                    </div>
                </div>

                <div className="absolute bottom-12 text-center">
                    <p className="text-xs uppercase tracking-widest text-stone-600">
                        Define Your Carry. Snap Your World.
                    </p>
                </div>
            </div>
        </div>
    );
}