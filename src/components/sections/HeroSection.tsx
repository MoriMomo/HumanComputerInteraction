"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ReactiveBackground from "@/components/ui/ReactiveBackground";

gsap.registerPlugin(ScrollTrigger);

const CardHolderScene = dynamic(() => import("../3d/CardHolderScene"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full flex items-center justify-center">
            <div className="w-10 h-10 rounded-full border-2 border-white/45 border-t-transparent animate-spin" />
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
}

const LOCK_MODEL_ORIENTATION_X = Math.PI / 2;

export default function HeroSection({ activeColor, show3DModel = true }: HeroSectionProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const sectionEl = containerRef.current;
            if (!sectionEl) return;

            gsap.set(".hero-title, .hero-kicker, .hero-top-right, .hero-canvas, .hero-meta, .hero-rail", {
                clearProps: "all",
            });

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
        },
        { scope: containerRef }
    );

    return (
        <section
            id="showcase"
            ref={containerRef}
            className="relative min-h-screen w-full overflow-hidden bg-linear-to-b from-[#0f141c] via-[#131b24] to-[#0f141c]"
        >
            <ReactiveBackground color="#3b82f6" blockCount={10} opacity={0.08} />

            {/* Grid overlay */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-10 [background:linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[120px_120px]"
            />

            {/* Background glows */}
            <div
                aria-hidden
                className="hero-orb-a section-orb pointer-events-none absolute inset-0 z-10 [background:radial-gradient(circle_at_18%_18%,rgba(188,201,214,0.22),transparent_42%),radial-gradient(circle_at_82%_24%,rgba(133,146,160,0.18),transparent_38%),radial-gradient(circle_at_50%_80%,rgba(106,120,134,0.16),transparent_50%)] blur-3xl"
            />
            <div
                aria-hidden
                className="hero-orb-b section-orb pointer-events-none absolute right-[-12%] top-[22%] z-10 h-104 w-104 rounded-full bg-[#d9e1e7]/12 blur-3xl"
            />

            {/* Bottom fade to dark – matches StatsSection bg */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-48 section-seam-dark"
            />

            {/* Horizontal dividers */}
            <div aria-hidden className="absolute top-1/3 left-0 right-0 z-10 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
            <div aria-hidden className="absolute top-2/3 left-0 right-0 z-10 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

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
                    </div>

                    <div className="hero-top-right hidden md:block max-w-xs text-right">
                        <p className="text-xs text-white/76 leading-relaxed">
                            A compact carry object tuned for meetings, desks, and daily professional movement.
                        </p>
                    </div>
                </div>

                {/* Canvas - COMPACT, centered */}
                <div className="hero-canvas flex items-center justify-center py-3 md:py-4 min-h-[30vh] md:min-h-[36vh]">
                    <div className="relative w-full max-w-xl md:max-w-2xl aspect-5/4 md:aspect-4/3">
                        <div
                            aria-hidden
                            className={`absolute inset-[10%] rounded-full blur-3xl opacity-30 ${GLOW_CLASS[activeColor] ?? "bg-swatch-bronze"}`}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-full h-full">
                                {show3DModel ? (
                                    <CardHolderScene
                                        color={activeColor}
                                        autoRotate={true}
                                        renderMode="normal"
                                        enableZoom={false}
                                        cameraPosition={[0.18, 0.05, 3.35]}
                                        cameraLookAt={[0, 0.02, 0]}
                                        introFromPosition={[0.95, 1.45, 4.9]}
                                        introDuration={1.15}
                                        modelRotation={[LOCK_MODEL_ORIENTATION_X, 0.22, 0]}
                                        modelOffset={[0, -0.03, 0]}
                                        modelScaleMultiplier={1.04}
                                        className="w-full h-full"
                                    />
                                ) : (
                                    <div className="h-full w-full rounded-4xl border border-white/14 bg-linear-to-br from-[#1c2631] via-[#1a2430] to-[#141b24] flex items-center justify-center">
                                        <div className="text-center px-6">
                                            <p className="text-[11px] uppercase tracking-[0.18em] text-white/60">Showcase Mode</p>
                                            <p className="mt-2 text-2xl md:text-3xl font-semibold text-white/90">3D Preview Disabled</p>
                                            <p className="mt-3 max-w-md text-sm text-white/64 leading-relaxed">
                                                Focusing on layout and storefront refinement. Interactive product model is temporarily turned off.
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
                        <p className="text-xs uppercase tracking-[0.2em] text-white/45 mb-2">
                            Compact Work Carry Format
                        </p>
                        <p className="text-sm text-white/74">
                            Precision-built for cards, cash, and daily essentials.
                        </p>
                    </div>
                </div>

                {/* Bottom Rail */}
                <div className="hero-rail flex items-center justify-between pt-4 border-t border-white/10 mt-4 flex-wrap gap-y-2.5">
                    <div className="flex gap-8 md:gap-12 flex-wrap">
                        <span className="text-xs uppercase tracking-[0.2em] text-white/45">Utility Profile</span>
                        <span className="text-xs uppercase tracking-[0.2em] text-white/45">Slim Desk Carry</span>
                        <span className="text-xs uppercase tracking-[0.2em] text-white/45">Focus</span>
                    </div>
                    <div className="flex gap-8 md:gap-12 flex-wrap md:justify-end">
                        <span className="text-xs uppercase tracking-[0.2em] text-white/45">Surface</span>
                        <span className="text-xs uppercase tracking-[0.2em] text-white/45">Graphite, Steel, Sand</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
