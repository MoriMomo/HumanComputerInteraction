"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

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
    const assetsLoadedRef = useRef(0);
    const totalAssetsRef = useRef(0);

    const criticalAssets = useRef<string[]>([
        "/satset3d/glb/bener-final.glb",
    ]);

    const animateProgress = useCallback((nextProgress: number) => {
        const clampedProgress = Math.min(100, Math.max(0, nextProgress));

        gsap.to(progressTweenRef.current, {
            value: clampedProgress,
            duration: 0.45,
            ease: "power2.out",
            overwrite: true,
            onUpdate: () => {
                const roundedProgress = Math.round(progressTweenRef.current.value);
                setProgress(roundedProgress);
                setStatus(getStatus(roundedProgress));
            },
        });
    }, []);

    const updateProgress = useCallback(() => {
        if (totalAssetsRef.current <= 0) {
            animateProgress(100);
            return;
        }

        const calculated = Math.min(
            100,
            Math.round((assetsLoadedRef.current / totalAssetsRef.current) * 100)
        );

        animateProgress(calculated);
    }, [animateProgress]);

    const preloadAssets = useCallback(async () => {
        const cleanupFns: Array<() => void> = [];
        assetsLoadedRef.current = 0;
        totalAssetsRef.current = 0;

        const markLoaded = () => {
            assetsLoadedRef.current += 1;
            updateProgress();
        };

        const markAndDetach = (detach?: () => void) => {
            markLoaded();
            detach?.();
        };

        const isMobile = window.matchMedia("(max-width: 768px), (pointer: coarse)").matches;
        const assets = [
            ...criticalAssets.current,
            isMobile ? "/video/vecteezy-workers-mobile.mp4" : "/video/vecteezy-workers-optimized.mp4",
        ];
        totalAssetsRef.current += assets.length;

        assets.forEach((src) => {
            if (src.endsWith(".glb") || src.endsWith(".gltf") || src.endsWith(".stl")) {
                fetch(src, { cache: "force-cache" })
                    .then((res) => res.arrayBuffer())
                    .then(() => markLoaded())
                    .catch(() => markLoaded());
                return;
            }

            if (src.endsWith(".mp4") || src.endsWith(".webm")) {
                const video = document.createElement("video");
                const onDone = () => markAndDetach(cleanup);
                const cleanup = () => {
                    video.oncanplaythrough = null;
                    video.onerror = null;
                    video.removeAttribute("src");
                    video.load();
                };

                video.preload = "metadata";
                video.muted = true;
                video.playsInline = true;
                video.onloadedmetadata = onDone;
                video.onerror = onDone;
                video.src = src;
                video.load();
                return;
            }

            const image = new Image();
            const onDone = () => markAndDetach(cleanup);
            const cleanup = () => {
                image.onload = null;
                image.onerror = null;
            };

            image.onload = onDone;
            image.onerror = onDone;
            image.src = src;
        });

        const domImages = Array.from(document.querySelectorAll("img"));
        const domVideos = Array.from(document.querySelectorAll("video"));

        totalAssetsRef.current += domImages.length + domVideos.length;

        domImages.forEach((img) => {
            if (img.complete) {
                markLoaded();
                return;
            }

            const onDone = () => markAndDetach(detach);
            const detach = () => {
                img.removeEventListener("load", onDone);
                img.removeEventListener("error", onDone);
            };

            img.addEventListener("load", onDone, { once: true });
            img.addEventListener("error", onDone, { once: true });
            cleanupFns.push(detach);
        });

        domVideos.forEach((video) => {
            if (video.readyState >= 3) {
                markLoaded();
                return;
            }

            const onDone = () => markAndDetach(detach);
            const detach = () => {
                video.removeEventListener("canplaythrough", onDone);
                video.removeEventListener("error", onDone);
            };

            video.addEventListener("canplaythrough", onDone, { once: true });
            video.addEventListener("error", onDone, { once: true });
            cleanupFns.push(detach);
        });

        updateProgress();

        return () => {
            cleanupFns.forEach((fn) => fn());
        };
    }, [updateProgress]);

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

    useEffect(() => {
        gsap.set(topProgressRef.current, { scaleX: progress / 100, transformOrigin: "left center" });
        gsap.set(railProgressRef.current, { scaleX: progress / 100, transformOrigin: "left center" });
    }, [progress]);

    useEffect(() => {
        let isCancelled = false;
        let settleIntervalId: number | null = null;
        let detachTrackedListeners: (() => void) | undefined;

        startTimeRef.current = Date.now();

        const finishWhenAllowed = () => {
            const elapsed = Date.now() - startTimeRef.current;
            const remaining = Math.max(0, minimumDuration - elapsed);

            if (remaining === 0) {
                completeLoading();
                return;
            }

            completionTimeoutRef.current = window.setTimeout(() => {
                if (!isCancelled) {
                    completeLoading();
                }
            }, remaining);
        };

        void preloadAssets().then((detach) => {
            detachTrackedListeners = detach;
        });

        settleIntervalId = window.setInterval(() => {
            if (isCancelled || isCompletingRef.current) {
                return;
            }

            if (assetsLoadedRef.current < totalAssetsRef.current) {
                assetsLoadedRef.current += 1;
                updateProgress();
                return;
            }

            if (totalAssetsRef.current > 0 && assetsLoadedRef.current >= totalAssetsRef.current) {
                animateProgress(100);
                finishWhenAllowed();
                if (settleIntervalId !== null) {
                    window.clearInterval(settleIntervalId);
                    settleIntervalId = null;
                }
            }
        }, 140);

        return () => {
            isCancelled = true;

            if (completionTimeoutRef.current !== null) {
                window.clearTimeout(completionTimeoutRef.current);
            }

            if (settleIntervalId !== null) {
                window.clearInterval(settleIntervalId);
            }

            detachTrackedListeners?.();
        };
    }, [animateProgress, completeLoading, minimumDuration, preloadAssets, updateProgress]);

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
            className={`fixed inset-0 z-9999 flex items-center justify-center bg-[#0a0f16] ${isVisible ? "loading-overlay-active" : "loading-overlay-inactive"}`}
        >
            <div className="absolute inset-0 bg-linear-to-br from-[#0a0f16] via-[#131b24] to-[#0a0f16]" />

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

                <div className="mt-8 flex justify-center gap-2">
                    <div className="loading-dot loading-dot-1" />
                    <div className="loading-dot loading-dot-2" />
                    <div className="loading-dot loading-dot-3" />
                </div>
            </div>

            <div className="absolute bottom-8 left-0 right-0 text-center">
                <p className="text-xs uppercase tracking-widest text-white/30">
                    Define Your Carry. Snap Your World.
                </p>
            </div>
        </div>
    );
}