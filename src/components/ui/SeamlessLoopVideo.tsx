"use client";

import { useEffect, useRef, useState } from "react";

interface SeamlessLoopVideoProps {
    src: string;
    className?: string;
}

const LOOP_FADE_SECONDS = 0.45;

export default function SeamlessLoopVideo({ src, className = "" }: SeamlessLoopVideoProps) {
    const firstVideoRef = useRef<HTMLVideoElement | null>(null);
    const secondVideoRef = useRef<HTMLVideoElement | null>(null);
    const activeVideoRef = useRef<HTMLVideoElement | null>(null);
    const standbyVideoRef = useRef<HTMLVideoElement | null>(null);
    const activeIndexRef = useRef(0);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const firstVideo = firstVideoRef.current;
        const secondVideo = secondVideoRef.current;

        if (!firstVideo || !secondVideo) {
            return;
        }

        activeVideoRef.current = firstVideo;
        standbyVideoRef.current = secondVideo;

        const pauseIfReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (pauseIfReducedMotion) {
            firstVideo.pause();
            secondVideo.pause();
            return;
        }

        const primeStandby = async () => {
            try {
                const frontVideo = activeIndexRef.current === 0 ? firstVideo : secondVideo;
                const backVideo = activeIndexRef.current === 0 ? secondVideo : firstVideo;

                activeVideoRef.current = frontVideo;
                standbyVideoRef.current = backVideo;

                backVideo.currentTime = 0;
                backVideo.pause();
                await frontVideo.play();
            } catch {
                // Silent fallback for browsers that block autoplay until paint.
            }
        };

        const onTimeUpdate = () => {
            const frontVideo = activeIndexRef.current === 0 ? firstVideo : secondVideo;
            const backVideo = activeIndexRef.current === 0 ? secondVideo : firstVideo;

            if (!frontVideo || !backVideo || !frontVideo.duration || activeIndexRef.current === 1) {
                return;
            }

            if (frontVideo.duration - frontVideo.currentTime <= LOOP_FADE_SECONDS) {
                backVideo.currentTime = 0;
                backVideo.play().catch(() => undefined);
                frontVideo.pause();
                activeVideoRef.current = backVideo;
                standbyVideoRef.current = frontVideo;
                activeIndexRef.current = 1;
                setActiveIndex(1);
            }
        };

        const onStandbyTimeUpdate = () => {
            const frontVideo = activeIndexRef.current === 0 ? firstVideo : secondVideo;
            const backVideo = activeIndexRef.current === 0 ? secondVideo : firstVideo;

            if (!frontVideo || !backVideo || !backVideo.duration || activeIndexRef.current === 0) {
                return;
            }

            if (backVideo.duration - backVideo.currentTime <= LOOP_FADE_SECONDS) {
                frontVideo.currentTime = 0;
                frontVideo.play().catch(() => undefined);
                backVideo.pause();
                activeVideoRef.current = frontVideo;
                standbyVideoRef.current = backVideo;
                activeIndexRef.current = 0;
                setActiveIndex(0);
            }
        };

        firstVideo.addEventListener("timeupdate", onTimeUpdate);
        secondVideo.addEventListener("timeupdate", onStandbyTimeUpdate);
        primeStandby();

        return () => {
            firstVideo.removeEventListener("timeupdate", onTimeUpdate);
            secondVideo.removeEventListener("timeupdate", onStandbyTimeUpdate);
        };
    }, [src]);

    const videoClassName = `absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ease-linear ${className}`;

    return (
        <>
            <video
                ref={firstVideoRef}
                className={`${videoClassName} ${activeIndex === 0 ? "opacity-100" : "opacity-0"}`}
                autoPlay
                muted
                loop={false}
                playsInline
                preload="metadata"
                disablePictureInPicture
                aria-hidden="true"
            >
                <source src={src} type="video/mp4" />
            </video>
            <video
                ref={secondVideoRef}
                className={`${videoClassName} ${activeIndex === 1 ? "opacity-100" : "opacity-0"}`}
                muted
                loop={false}
                playsInline
                preload="metadata"
                disablePictureInPicture
                aria-hidden="true"
            >
                <source src={src} type="video/mp4" />
            </video>
        </>
    );
}