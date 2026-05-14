"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { preloadAssets } from "@/lib/assets";

interface LoadingOverlayProps {
    minimumDuration?: number;
    onComplete?: () => void;
}

function getStatus(progress: number) {
    if (progress < 30) {
        return "Initializing";
    }

    if (progress < 60) {
        return "Loading Assets";
    }

    if (progress < 90) {
        return "Preparing Experience";
    }

    if (progress < 100) {
        return "Finalizing";
    }

    return "Ready";
}

export default function LoadingOverlay({
    minimumDuration = 2500,
    onComplete,
}: LoadingOverlayProps) {
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState("Initializing");
    const [isVisible, setIsVisible] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);
    const startTimeRef = useRef(0);
    const completionTimeoutRef = useRef<number | null>(null);
    const isCompletingRef = useRef(false);
    const progressTweenRef = useRef({ value: 0 });
    const topProgressRef = useRef<HTMLDivElement>(null);
    const railProgressRef = useRef<HTMLDivElement>(null);

    const animateProgress = useCallback((nextProgress: number) => {
        const clampedProgress = Math.min(100, Math.max(0, nextProgress));

        gsap.to(progressTweenRef.current, {
            value: clampedProgress,
            duration: 0.45,
            ease: "power2.out",
            onUpdate: () => {
                const roundedProgress = Math.round(progressTweenRef.current.value);
                setProgress(roundedProgress);
                setStatus(getStatus(roundedProgress));
            },
        });
    }, []);

    const updateProgress = useCallback((completed: number, total: number) => {
        if (total <= 0) {
            animateProgress(100);
            return;
        }

        const calculated = Math.min(100, Math.round((completed / total) * 100));
        animateProgress(calculated);
    }, [animateProgress]);

    const completeLoading = useCallback(() => {
        if (isCompletingRef.current) {
            return;
        }

        isCompletingRef.current = true;
        animateProgress(100);
        setStatus("Complete");
        const scopedSelector = gsap.utils.selector(containerRef);

        const timeline = gsap.timeline({
            onComplete: () => {
                setIsVisible(false);
                onComplete?.();
            },
        });

        timeline
            .to(containerRef.current, {
                opacity: 0,
                duration: 0.8,
                ease: "power3.inOut",
            })
            .to(
                scopedSelector(".loading-content"),
                {
                    y: -50,
                    opacity: 0,
                    duration: 0.6,
                    ease: "power3.in",
                },
                "-=0.6"
            )
            .to(
                scopedSelector(".loading-bar-fill"),
                {
                    scaleX: 1.2,
                    opacity: 0,
                    duration: 0.4,
                    ease: "power2.in",
                },
                "-=0.8"
            );
    }, [animateProgress, onComplete]);

    const finishWhenAllowed = useCallback(() => {
        const elapsed = Date.now() - startTimeRef.current;
        const remaining = Math.max(0, minimumDuration - elapsed);

        if (remaining === 0) {
            completeLoading();
            return;
        }

        if (completionTimeoutRef.current !== null) {
            window.clearTimeout(completionTimeoutRef.current);
        }

        completionTimeoutRef.current = window.setTimeout(() => {
            completeLoading();
        }, remaining);
    }, [completeLoading, minimumDuration]);

    useEffect(() => {
        gsap.set(topProgressRef.current, { scaleX: progress / 100, transformOrigin: "left center" });
        gsap.set(railProgressRef.current, { scaleX: progress / 100, transformOrigin: "left center" });
    }, [progress]);

    useEffect(() => {
        let isCancelled = false;
        const isMobile = window.matchMedia("(max-width: 768px), (pointer: coarse)").matches;

        startTimeRef.current = Date.now();
        animateProgress(0);

        void preloadAssets({
            includeMobileVideo: isMobile,
            onProgress: ({ completed, total }) => {
                if (!isCancelled) {
                    updateProgress(completed, total);
                }
            },
        }).finally(() => {
            if (!isCancelled) {
                finishWhenAllowed();
            }
        });

        return () => {
            isCancelled = true;

            if (completionTimeoutRef.current !== null) {
                window.clearTimeout(completionTimeoutRef.current);
            }
        };
    }, [animateProgress, finishWhenAllowed, updateProgress]);

    useGSAP(
        () => {
            if (!containerRef.current) {
                return;
            }

            gsap.set(".loading-content", { y: 30, opacity: 0 });
            gsap.set(".loading-bar", { scaleX: 0, transformOrigin: "left center" });

            const timeline = gsap.timeline({ delay: 0.2 });

            timeline
                .to(".loading-content", {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power3.out",
                })
                .to(
                    ".loading-bar",
                    {
                        scaleX: 1,
                        duration: 1.2,
                        ease: "power3.inOut",
                    },
                    "-=0.6"
                );
        },
        { scope: containerRef }
    );

    if (!isVisible) {
        return null;
    }

    return (
        <div
            ref={containerRef}
            className={`loading-overlay-root fixed inset-0 flex items-center justify-center bg-[#231711] ${isVisible ? "loading-overlay-active" : "loading-overlay-inactive"}`}
        >
            <div className="absolute inset-0 bg-linear-to-br from-[#231711] via-[#231711] to-[#231711]" />

            <div className="loading-grid absolute inset-0 opacity-[0.03]" />

            <div className="absolute top-0 left-0 right-0 h-1 overflow-hidden bg-white/5">
                <div
                    ref={topProgressRef}
                    className="loading-bar-fill h-full origin-left bg-linear-to-r from-white/20 via-white/60 to-white/20"
                />
            </div>

            <div className="loading-content relative z-10 px-6 text-center">
                <div className="mb-8">
                    <h1 className="text-6xl font-bold tracking-tight text-white md:text-8xl">
                        SatSet
                    </h1>
                    <p className="text-xs uppercase tracking-[0.35em] text-white/40">
                        Office Utility. Refined.
                    </p>
                </div>

                <div className="mb-6">
                    <span className="text-5xl font-light tabular-nums text-white/80 md:text-7xl">
                        {progress.toString().padStart(2, "0")}
                    </span>
                    <span className="text-xl text-white/40">%</span>
                </div>

                <div className="relative mx-auto mb-6 h-px w-64 overflow-hidden bg-white/10 md:w-80">
                    <div
                        ref={railProgressRef}
                        className="loading-bar absolute left-0 top-0 h-full bg-linear-to-r from-transparent via-white/60 to-transparent"
                    />
                </div>

                <p className="text-sm uppercase tracking-[0.25em] text-white/40">
                    {status}
                </p>
            </div>
        </div>
    );
}
