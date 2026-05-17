"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScroll } from "@/contexts/ScrollProvider";
import { ANIMATION, SCROLL } from "@/config/constants";
import { EASING, TIMELINE_DEFAULTS } from "@/config/animations";
import HeroActions from "./HeroActions";
const ReactiveBackground = dynamic(() => import("@/components/ui/ReactiveBackground"), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

const CardHolderScene = dynamic(() => import("@/components/3d/CardHolderScene"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full flex items-center justify-center rounded-3xl border border-white/12 bg-brand-dark">
            <p className="text-[11px] uppercase tracking-[0.18em] text-white/58">Preparing 3D Scene</p>
        </div>
    ),
});

interface HeroSectionProps {
    activeColor: string;
    show3DModel?: boolean;
}

export default function HeroSection({
    activeColor,
    show3DModel = true,
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

            const tl = gsap.timeline({ defaults: TIMELINE_DEFAULTS });

            tl.fromTo(
                ".hero-title",
                { y: 70, opacity: 0 },
                { y: 0, opacity: 1, duration: ANIMATION.HERO_TITLE, immediateRender: false }
            )
                .fromTo(
                    ".hero-kicker",
                    { y: 24, opacity: 0 },
                    { y: 0, opacity: 1, duration: ANIMATION.HERO_KICKER, immediateRender: false },
                    `-=${ANIMATION.HERO_KICKER_DELAY}`
                )
                .fromTo(
                    ".hero-top-right",
                    { y: 24, opacity: 0 },
                    { y: 0, opacity: 1, duration: ANIMATION.HERO_TOP_RIGHT, immediateRender: false },
                    `-=${ANIMATION.HERO_TOP_RIGHT_DELAY}`
                )
                .fromTo(
                    ".hero-canvas",
                    { opacity: 0, scale: 0.95 },
                    { opacity: 1, scale: 1, duration: ANIMATION.HERO_CANVAS, immediateRender: false },
                    `-=${ANIMATION.HERO_CANVAS_OVERLAP}`
                )
                .fromTo(
                    ".hero-meta",
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: ANIMATION.HERO_META, immediateRender: false },
                    `-=${ANIMATION.HERO_META_DELAY}`
                )
                .fromTo(
                    ".hero-rail",
                    { y: 18, opacity: 0 },
                    { y: 0, opacity: 1, duration: ANIMATION.HERO_RAIL, immediateRender: false },
                    `-=${ANIMATION.HERO_RAIL_DELAY}`
                );

            gsap.to(".hero-canvas", {
                y: 92,
                scale: 0.86,
                opacity: 0.38,
                ease: EASING.NONE,
                scrollTrigger: {
                    trigger: sectionEl,
                    start: SCROLL.SCROLL_TRIGGER_START,
                    end: `bottom top+=${SCROLL.SCROLL_TRIGGER_END_OFFSET}`,
                    scrub: true,
                },
            });

            gsap.to(".hero-meta, .hero-kicker, .hero-top-right", {
                y: -22,
                opacity: 0.56,
                ease: EASING.NONE,
                scrollTrigger: {
                    trigger: sectionEl,
                    start: SCROLL.SCROLL_TRIGGER_START,
                    end: `bottom top+=${SCROLL.SCROLL_TRIGGER_END_OFFSET}`,
                    scrub: SCROLL.SCRUB_VALUE,
                },
            });

            gsap.to(".hero-orb-a", {
                xPercent: 10,
                yPercent: 14,
                ease: EASING.NONE,
                scrollTrigger: {
                    trigger: sectionEl,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: SCROLL.SCRUB_VALUE,
                },
            });

            gsap.to(".hero-orb-b", {
                xPercent: -8,
                yPercent: -18,
                ease: EASING.NONE,
                scrollTrigger: {
                    trigger: sectionEl,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: SCROLL.SCRUB_VALUE,
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
            className="relative min-h-screen w-full overflow-hidden bg-white"
        >
            {isInView && (
                <ReactiveBackground
                    color="var(--color-brand-primary)"
                    blockCount={12}
                    opacity={0.045}
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
                className="hero-orb-a section-orb pointer-events-none absolute inset-0 z-10 [background:radial-gradient(circle_at_18%_18%,rgba(0,0,0,0.05),transparent_42%),radial-gradient(circle_at_82%_24%,rgba(0,0,0,0.04),transparent_38%),radial-gradient(circle_at_50%_80%,rgba(0,0,0,0.03),transparent_50%)] blur-2xl"
            />
            <div
                aria-hidden
                className="hero-orb-b section-orb pointer-events-none absolute right-[-12%] top-[22%] z-10 h-104 w-104 rounded-full bg-black/5 blur-2xl"
            />

            {/* Bottom fade to dark – matches StatsSection bg */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-48 section-seam-light"
            />

            {/* Horizontal dividers */}
            <div aria-hidden className="absolute top-1/2 left-0 right-0 z-10 h-px bg-linear-to-r from-transparent via-black/10 to-transparent" />

            {/* Keep the nav-to-hero gap clean on load */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-20 z-15 h-4 bg-white"
            />

            {/* Main Content - FULL WIDTH RESPONSIVE LAYOUT */}
            <div className="relative z-20 w-full min-h-screen flex flex-col justify-between px-4 sm:px-6 md:px-12 lg:px-20 pt-32 pb-8 sm:pt-36 sm:pb-12 md:py-16 lg:py-20 pointer-events-none mt-10">

                {/* Top Content */}
                <div className="flex items-start justify-between pb-5 md:pb-7 pointer-events-auto">
                    <div className="max-w-4xl">
                        <h1 className="hero-title text-7xl sm:text-8xl md:text-9xl lg:text-[9.5rem] xl:text-[10.5rem] font-bold text-[#231711] leading-none tracking-tight">
                            <span className="hero-word inline-block">SatSet</span>
                            <span className="hero-word inline-block align-top text-[0.5em]">™</span>
                        </h1>
                        <p className="hero-kicker text-base md:text-lg uppercase tracking-[0.24em] text-[#231711]/78 mt-4">
                            Premium Card Holder. Engineered.
                        </p>
                        <div className="mt-8">
                            <HeroActions />
                        </div>
                    </div>

                    <div className="hero-top-right hidden md:block max-w-xs text-right">
                        <p className="text-[11px] uppercase tracking-[0.18em] text-[#231711]/62 mb-2">
                            For Professionals
                        </p>
                        <p className="text-sm lg:text-[0.95rem] text-[#231711]/82 leading-relaxed font-medium">
                            Precision-engineered aluminum. Military-grade RFID shielding. Built for those who refuse to compromise.
                        </p>
                    </div>
                </div>

                {/* Canvas - CENTER FULL RESPONSIVE */}
                <div className="hero-canvas absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
                    <div className="relative w-full max-w-xs sm:max-w-md md:max-w-xl lg:max-w-4xl xl:max-w-6xl aspect-4/3 md:aspect-video pointer-events-auto">
                        <div
                            aria-hidden
                            className="absolute inset-[10%] rounded-full blur-3xl opacity-30 bg-black/5"
                        />
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            {/* Gradient fades: model fades into text zones above/below */}
                            {/* <div className="absolute inset-x-0 top-0 z-10 h-24 bg-linear-to-b from-white/80 via-white/25 to-transparent" /> */}
                            {/* <div className="absolute inset-x-0 bottom-0 z-10 h-24 bg-linear-to-t from-white/80 via-white/25 to-transparent" /> */}
                            <div className="w-full h-[110%] md:h-full mt-[-5%] md:mt-0 pointer-events-auto">
                                {show3DModel ? (
                                    <CardHolderScene
                                        color={activeColor}
                                        enableZoom={false}
                                    />
                                ) : (
                                    <div className="h-full w-full rounded-4xl border border-black/10 bg-white flex items-center justify-center">
                                        <div className="text-center px-4 sm:px-6">
                                            <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-black/60">Showcase Mode</p>
                                            <p className="mt-2 text-lg sm:text-2xl md:text-3xl font-semibold text-black/90">3D Preview Loading...</p>
                                            <p className="mt-3 max-w-xs sm:max-w-md text-xs sm:text-sm text-black/64 leading-relaxed">
                                                Finishing asset initialization so the model appears instantly.
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Content - Wrapped to stick together at bottom */}
                <div className="flex flex-col gap-6 w-full relative z-30 pointer-events-auto">
                    {/* Bottom Corners */}
                    <div className="flex flex-col sm:flex-row items-end justify-between gap-8">
                        <div className="hero-meta flex-1 max-w-xl">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#231711] leading-tight mb-3">
                                Engineered for Excellence.
                            </h2>
                            <ul className="text-[#231711]/76 text-sm sm:text-[0.95rem] leading-relaxed space-y-2 max-w-sm sm:max-w-md">
                                <li>• <strong>18g</strong> aircraft-grade aluminum</li>
                                <li>• <strong>4–8 card</strong> capacity with spring tension</li>
                                <li>• <strong>100% RFID protection</strong> — always active</li>
                                <li>• <strong>2-year warranty</strong> with repair guarantee</li>
                            </ul>
                        </div>

                        <div className="hero-top-right hidden lg:block shrink-0 max-w-xs text-right">
                            <p className="text-[12px] uppercase tracking-[0.18em] text-[#231711]/62 mb-2">
                                Proven Durability
                            </p>
                            <p className="text-sm text-[#231711]/84">
                                Trusted by professionals worldwide. Engineered to withstand daily use. Backed by our 2-year warranty.
                            </p>
                        </div>
                    </div>

                    {/* Bottom Rail - Bottom Edge */}
                    <div className="hero-rail flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 pt-5 border-t border-black/10 flex-wrap">
                        <div className="flex flex-wrap gap-6 sm:gap-8 md:gap-12">
                            <span className="text-[11px] sm:text-xs uppercase tracking-[0.18em] text-[#231711]/58">Capacity</span>
                            <span className="text-[11px] sm:text-xs uppercase tracking-[0.18em] font-medium text-[#231711]/84">4–8 Cards</span>
                        </div>
                        <div className="flex flex-wrap gap-6 sm:gap-8 md:gap-12 sm:justify-end w-full sm:w-auto">
                            <span className="text-[11px] sm:text-xs uppercase tracking-[0.18em] text-[#231711]/58">Materials</span>
                            <span className="text-[11px] sm:text-xs uppercase tracking-[0.18em] font-medium text-[#231711]/84">Aluminum + RFID Shielding</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
