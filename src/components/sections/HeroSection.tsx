"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScroll } from "@/contexts/ScrollProvider";
const ReactiveBackground = dynamic(() => import("@/components/ui/ReactiveBackground"), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

const CardHolderScene = dynamic(() => import("../3d/CardHolderScene"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full flex items-center justify-center rounded-3xl border border-white/12 bg-[#111820]">
            <p className="text-[11px] uppercase tracking-[0.18em] text-white/58">Preparing 3D Scene</p>
        </div>
    ),
});

const GLOW_CLASS: Record<string, string> = {
    "#59636E": "bg-[#59636E]",
    "#B48A63": "bg-[#B48A63]",
    "#1C1C1E": "bg-[#1C1C1E]",
    "#8E9AA6": "bg-[#8E9AA6]",
    "#BCA782": "bg-[#BCA782]",
    "#3C2F24": "bg-[#3C2F24]",
    "#8A683A": "bg-[#8A683A]",
};

interface HeroSectionProps {
    activeColor: string;
    show3DModel?: boolean;
    loadingComplete?: boolean;
    on3DReady?: () => void;
}

const LOCK_MODEL_ORIENTATION_X = Math.PI / 2;

export default function HeroSection({
    activeColor,
    show3DModel = true,
    loadingComplete = true,
    on3DReady,
}: HeroSectionProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isInView, setIsInView] = useState(true);
    const { isScrolling } = useScroll();

    useEffect(() => {
        const sectionEl = containerRef.current;
        if (!sectionEl) {
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting);
            },
            {
                threshold: 0.1,
                rootMargin: "-100px 0px -100px 0px",
            }
        );

        observer.observe(sectionEl);

        return () => {
            observer.disconnect();
        };
    }, []);

    useGSAP(
        () => {
            const sectionEl = containerRef.current;
            if (!sectionEl) return;
            const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

            gsap.set(".hero-title, .hero-kicker, .hero-top-right, .hero-canvas, .hero-meta, .hero-rail", {
                clearProps: "all",
            });

            if (prefersReducedMotion) {
                gsap.set(".hero-title, .hero-kicker, .hero-top-right, .hero-canvas, .hero-meta, .hero-rail", {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    clearProps: "transform,opacity,visibility",
                });
                return;
            }

            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            tl.fromTo(
                ".hero-title",
                { y: 70, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.85, immediateRender: false }
            )
                .fromTo(
                    ".hero-kicker",
                    { y: 24, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.55, immediateRender: false },
                    "-=0.35"
                )
                .fromTo(
                    ".hero-top-right",
                    { y: 24, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.55, immediateRender: false },
                    "-=0.4"
                )
                .fromTo(
                    ".hero-canvas",
                    { opacity: 0, scale: 0.95 },
                    { opacity: 1, scale: 1, duration: 1, immediateRender: false },
                    "-=1"
                )
                .fromTo(
                    ".hero-meta",
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.55, immediateRender: false },
                    "-=0.45"
                )
                .fromTo(
                    ".hero-rail",
                    { y: 18, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.55, immediateRender: false },
                    "-=0.45"
                );

            gsap.to(".hero-canvas", {
                y: 92,
                scale: 0.86,
                opacity: 0.38,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionEl,
                    start: "top top",
                    end: "bottom top+=120",
                    scrub: true,
                },
            });

            gsap.to(".hero-meta, .hero-kicker, .hero-top-right", {
                y: -22,
                opacity: 0.56,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionEl,
                    start: "top top",
                    end: "bottom top+=120",
                    scrub: true,
                },
            });

            gsap.to(".hero-orb-a", {
                xPercent: 10,
                yPercent: 14,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionEl,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                },
            });

            gsap.to(".hero-orb-b", {
                xPercent: -8,
                yPercent: -18,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionEl,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                },
            });

            ScrollTrigger.create({
                trigger: sectionEl,
                start: "top bottom",
                end: "bottom top",
                onEnter: () => setIsInView(true),
                onEnterBack: () => setIsInView(true),
                onLeave: () => setIsInView(false),
                onLeaveBack: () => setIsInView(false),
            });
        },
        { scope: containerRef }
    );

    return (
        <section
            id="showcase"
            ref={containerRef}
            className="relative min-h-screen w-full overflow-hidden bg-linear-to-b from-[#0f141c] via-[#131b24] to-[#0f141c]"
        >
            {isInView && (
                <ReactiveBackground
                    color="#3b82f6"
                    blockCount={9}
                    opacity={0.06}
                    mode="absolute"
                    active={!isScrolling}
                />
            )}

            {/* Grid overlay */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-10 [background:linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[120px_120px]"
            />

            {/* Background glows */}
            <div
                aria-hidden
                className="hero-orb-a section-orb pointer-events-none absolute inset-0 z-10 [background:radial-gradient(circle_at_18%_18%,rgba(188,201,214,0.22),transparent_42%),radial-gradient(circle_at_82%_24%,rgba(133,146,160,0.18),transparent_38%),radial-gradient(circle_at_50%_80%,rgba(106,120,134,0.16),transparent_50%)] blur-2xl"
            />
            <div
                aria-hidden
                className="hero-orb-b section-orb pointer-events-none absolute right-[-12%] top-[22%] z-10 h-104 w-104 rounded-full bg-[#d9e1e7]/12 blur-2xl"
            />

            {/* Bottom fade to dark – matches StatsSection bg */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-48 section-seam-dark"
            />

            {/* Horizontal dividers */}
            <div aria-hidden className="absolute top-1/2 left-0 right-0 z-10 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

            {/* Main Content - COMPACT LAYOUT */}
            <div className="relative z-20 min-h-screen flex flex-col justify-between pt-20 pb-8 md:pt-24 md:pb-10 px-8 md:px-16 max-w-480 mx-auto">

                {/* Top Content - REMOVED min-h constraint */}
                <div className="flex items-end justify-between pb-5 md:pb-7">
                    <div className="max-w-4xl">
                        <h1 className="hero-title text-5xl md:text-7xl lg:text-[7.25rem] font-bold text-white leading-none tracking-tight">
                            <span className="hero-word inline-block">SatSet</span>
                            <span className="hero-word inline-block align-top text-[0.5em]">™</span>
                        </h1>
                        <p className="hero-kicker text-xs uppercase tracking-[0.35em] text-white/60 mt-3">
                            Office Utility. Refined.
                        </p>
                        <div className="mt-6 flex items-center gap-3">
                            <a
                                href="#shop"
                                className="inline-flex items-center justify-center rounded-full h-11 px-6 bg-white/14 border border-white/30 text-white text-sm font-semibold tracking-wide hover:bg-white/20 transition-colors"
                            >
                                Shop Collection
                            </a>
                            <a
                                href="#features"
                                className="inline-flex items-center justify-center rounded-full h-11 px-6 border border-white/24 text-white/86 text-sm font-medium hover:text-white hover:border-white/40 transition-colors"
                            >
                                See Features
                            </a>
                        </div>
                    </div>

                    <div className="hero-top-right hidden md:block max-w-xs text-right">
                        <p className="text-xs text-white/85 leading-relaxed">
                            A compact carry object tuned for meetings, desks, and daily professional movement.
                        </p>
                    </div>
                </div>

                {/* Canvas - LARGER container for premium 3D presentation */}
                <div className="hero-canvas flex items-center justify-center py-6 md:py-8 min-h-[40vh] md:min-h-[50vh]">
                    <div className="relative w-full max-w-3xl md:max-w-4xl aspect-video md:aspect-video">
                        <div
                            aria-hidden
                            className={`absolute inset-[10%] rounded-full blur-2xl opacity-30 ${GLOW_CLASS[activeColor] ?? "bg-swatch-bronze"}`}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-full h-full ">
                                {show3DModel && loadingComplete ? (
                                    <CardHolderScene
                                        color={activeColor}
                                        autoRotate={isInView && !isScrolling}
                                        show3DModel={true}
                                        isActive={isInView}
                                        renderMode="normal"
                                        enableZoom={false}
                                        cameraPosition={[0, 0, 8]}
                                        cameraLookAt={[0, 0, 0]}
                                        introFromPosition={[1.8, 2.2, 12]}
                                        introDuration={1.15}
                                        modelRotation={[LOCK_MODEL_ORIENTATION_X, 0.22, 0]}
                                        modelOffset={[0, 0, 0]}
                                        modelScaleMultiplier={4}
                                        onModelReady={on3DReady}
                                        className="w-full h-full"
                                    />
                                ) : (
                                    <div className="h-full w-full rounded-4xl border border-white/14 bg-linear-to-br from-[#1c2631] via-[#1a2430] to-[#141b24] flex items-center justify-center">
                                        <div className="text-center px-6">
                                            <p className="text-[11px] uppercase tracking-[0.18em] text-white/60">Showcase Mode</p>
                                            <p className="mt-2 text-2xl md:text-3xl font-semibold text-white/90">3D Preview Loading...</p>
                                            <p className="mt-3 max-w-md text-sm text-white/64 leading-relaxed">
                                                Finishing asset initialization so the model appears instantly.
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Content - REMOVED min-h constraint */}
                <div className="flex items-start justify-between pt-4 md:pt-6">
                    <div className="hero-meta max-w-xl">
                        <h2 className="text-2xl md:text-4xl font-bold text-white leading-tight mb-2.5">
                            Built For Workdays.
                            <br />
                            Ready For Every Move.
                        </h2>
                        <p className="text-white/68 text-sm leading-relaxed max-w-md">
                            Minimal enough for the boardroom, durable enough for the commute, and clean enough to feel native on a desk.
                        </p>
                    </div>

                    <div className="hero-top-right hidden md:block max-w-xs text-right">
                        <p className="text-xs uppercase tracking-[0.2em] text-white/58 mb-2">
                            Compact Work Carry Format
                        </p>
                        <p className="text-sm text-white/84">
                            Precision-built for cards, cash, and daily essentials.
                        </p>
                    </div>
                </div>

                {/* Bottom Rail */}
                <div className="hero-rail flex items-center justify-between pt-4 border-t border-white/10 mt-4 flex-wrap gap-y-2.5">
                    <div className="flex gap-8 md:gap-12 flex-wrap">
                        <span className="text-xs uppercase tracking-[0.2em] text-white/58">Utility Profile</span>
                        <span className="text-xs uppercase tracking-[0.2em] text-white/58">Slim Desk Carry</span>
                        <span className="text-xs uppercase tracking-[0.2em] text-white/58">Focus</span>
                    </div>
                    <div className="flex gap-8 md:gap-12 flex-wrap md:justify-end">
                        <span className="text-xs uppercase tracking-[0.2em] text-white/58">Surface</span>
                        <span className="text-xs uppercase tracking-[0.2em] text-white/58">Graphite, Steel, Sand</span>
                    </div>
                </div>
            </div>
        </section >
    );
}
