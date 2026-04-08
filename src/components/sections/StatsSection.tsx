"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
    {
        value: "18g",
        label: "ULTRALIGHT WEIGHT",
        description: "Aircraft-grade aluminum body machined to featherlight specifications.",
    },
    {
        value: "8",
        label: "CARD CAPACITY",
        description: "Spring-tensioned clip holds 4-8 cards securely with single-hand access.",
    },
    {
        value: "100%",
        label: "RFID PROTECTION",
        description: "Military-grade blocking layer protects from digital skimming and is always active.",
    },
    {
        value: "2yr",
        label: "WARRANTY",
        description: "Two-year warranty coverage with repair or replacement support.",
    },
];

interface StatsSectionProps {
    videoSrc?: string;
    title?: string;
    subtitle?: string;
}

export default function StatsSection({
    videoSrc = "/video/vecteezy-workers-optimized.mp4",
    title = "Engineered & Verified",
    subtitle = "Built for the detail-oriented professional.",
}: StatsSectionProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const isVideoPlayingRef = useRef(false);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [videoStalled, setVideoStalled] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod/i.test(navigator.userAgent));
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);

        return () => {
            window.removeEventListener("resize", checkMobile);
        };
    }, []);

    const optimizedVideoSrc = isMobile
        ? "/video/vecteezy-workers-mobile.mp4"
        : videoSrc;

    const handleVideoLoad = useCallback(() => {
        setIsVideoLoaded(true);
        setVideoStalled(false);

        const video = videoRef.current;
        if (!video) return;

        video.playbackRate = 1;
        video.muted = true;
        video.defaultMuted = true;
    }, []);

    const handleVideoWaiting = useCallback(() => {
        setVideoStalled(true);
    }, []);

    const handleVideoPlaying = useCallback(() => {
        setVideoStalled(false);
    }, []);

    useEffect(() => {
        const safePlay = async () => {
            const video = videoRef.current;
            if (!video || isVideoPlayingRef.current) return;

            try {
                await video.play();
                isVideoPlayingRef.current = true;
            } catch (err) {
                console.warn("Video autoplay failed:", err);
            }
        };

        const safePause = () => {
            const video = videoRef.current;
            if (!video || !isVideoPlayingRef.current) return;

            video.pause();
            isVideoPlayingRef.current = false;
        };

        const observer = new IntersectionObserver(
            ([entry]) => {
                // Hysteresis avoids rapid play/pause thrashing while scrolling.
                if (entry.intersectionRatio >= 0.4) {
                    void safePlay();
                    return;
                }

                if (entry.intersectionRatio <= 0.12) {
                    safePause();
                }
            },
            { threshold: [0, 0.12, 0.4, 0.7], rootMargin: "80px 0px" }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            observer.disconnect();
            safePause();
        };
    }, []);

    useGSAP(
        () => {
            const sectionEl = sectionRef.current;
            if (!sectionEl) return;

            const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

            gsap.set(".stats-title, .stats-subtitle, .stats-row, .stats-image", {
                clearProps: "all",
            });

            if (ScrollTrigger.isInViewport(sectionEl, 0.1) || prefersReducedMotion) {
                gsap.set(".stats-title, .stats-subtitle, .stats-row, .stats-image", {
                    y: 0,
                    autoAlpha: 1,
                    clearProps: "transform,opacity,visibility",
                });
                return;
            }

            // Opacity-only animation reduces transform workload during decode.
            gsap.fromTo(
                ".stats-image",
                { autoAlpha: 0 },
                {
                    autoAlpha: 1,
                    duration: 0.85,
                    ease: "power2.out",
                    immediateRender: false,
                    scrollTrigger: {
                        trigger: sectionEl,
                        start: "top 85%",
                        once: true,
                    },
                }
            );

            gsap.fromTo(
                ".stats-title",
                { y: 48, autoAlpha: 0 },
                {
                    y: 0,
                    autoAlpha: 1,
                    duration: 0.9,
                    ease: "power3.out",
                    immediateRender: false,
                    scrollTrigger: {
                        trigger: sectionEl,
                        start: "top 88%",
                        once: true,
                    },
                }
            );

            gsap.fromTo(
                ".stats-subtitle",
                { y: 32, autoAlpha: 0 },
                {
                    y: 0,
                    autoAlpha: 1,
                    duration: 0.7,
                    ease: "power3.out",
                    immediateRender: false,
                    scrollTrigger: {
                        trigger: sectionEl,
                        start: "top 88%",
                        once: true,
                    },
                }
            );

            gsap.fromTo(
                ".stats-row",
                { x: 40, autoAlpha: 0 },
                {
                    x: 0,
                    autoAlpha: 1,
                    stagger: 0.12,
                    duration: 0.7,
                    ease: "power3.out",
                    immediateRender: false,
                    scrollTrigger: {
                        trigger: sectionEl,
                        start: "top 85%",
                        once: true,
                    },
                }
            );
        },
        { scope: sectionRef }
    );

    return (
        <section id="specs" ref={sectionRef} className="relative z-20 bg-[#0a0f16]">
            <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#0a0f16] to-transparent z-10" />

            <div className="grid min-h-[92vh] grid-cols-1 lg:grid-cols-2">
                <div className="stats-image relative min-h-[58vh] overflow-hidden lg:min-h-[92vh]">
                    <video
                        ref={videoRef}
                        className="stats-video absolute inset-0 h-full w-full object-cover"
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        onLoadedMetadata={handleVideoLoad}
                        onLoadedData={handleVideoLoad}
                        onCanPlayThrough={handleVideoLoad}
                        onPlaying={handleVideoPlaying}
                        onWaiting={handleVideoWaiting}
                        aria-hidden
                        disablePictureInPicture
                        controlsList="nofullscreen nodownload noremoteplayback"
                    >
                        <source src={optimizedVideoSrc} type="video/mp4" />
                        {!isMobile && <source src={videoSrc} type="video/mp4" />}
                        Your browser does not support the video tag.
                    </video>

                    <div
                        aria-hidden
                        className="absolute inset-0 bg-gradient-to-r from-[#0a0f16]/80 via-[#0a0f16]/40 to-transparent lg:hidden"
                    />
                    <div
                        aria-hidden
                        className="absolute inset-0 bg-gradient-to-t from-[#0a0f16] via-transparent to-[#0a0f16]/20"
                    />

                    {(!isVideoLoaded || videoStalled) && (
                        <div className="absolute inset-0 flex items-center justify-center bg-[#0a0f16]" aria-hidden="true">
                            <div className="w-12 h-12 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                        </div>
                    )}

                    <div className="absolute inset-0 lg:hidden bg-[#0a0f16]/20" />
                </div>

                <div className="relative flex flex-col justify-center px-8 py-18 md:px-14 lg:px-20 lg:py-0">
                    <div className="max-w-xl">
                        <p className="stats-subtitle mb-4 text-xs font-semibold tracking-[0.28em] text-white/52 uppercase">
                            Performance Snapshot
                        </p>
                        <h2 className="stats-title text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
                            {title}
                        </h2>
                        <p className="stats-subtitle mt-5 mb-10 max-w-md text-lg text-white/68">
                            {subtitle}
                        </p>

                        <dl>
                            {STATS.map((stat) => (
                                <div
                                    key={stat.label}
                                    className="stats-row border-b border-white/10 py-7 last:border-0"
                                >
                                    <div className="group flex flex-col md:flex-row md:items-start md:justify-between gap-2 md:gap-6 transition-transform duration-500 ease-out hover:translate-x-2">
                                        <dt className="flex items-baseline gap-4">
                                            <span className="text-4xl font-light tracking-tight text-white md:text-5xl">
                                                {stat.value}
                                            </span>
                                            <span className="text-[11px] tracking-[0.26em] text-white/52 uppercase transition-colors group-hover:text-white/72">
                                                {stat.label}
                                            </span>
                                        </dt>
                                        <dd className="max-w-xs text-sm leading-relaxed text-white/62 transition-colors group-hover:text-white/80 md:text-right">
                                            {stat.description}
                                        </dd>
                                    </div>
                                </div>
                            ))}
                        </dl>

                        <p className="stats-row mt-7 max-w-md text-xs leading-relaxed text-white/45">
                            Specifications are validated through internal tests and partner verification flows before release.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}