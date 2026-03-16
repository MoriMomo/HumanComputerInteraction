"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
    {
        icon: "shield_person",
        title: "RFID Shielding",
        description: "Military-grade blocking layer protects your contactless cards from digital skimming — invisible, always active.",
        accent: "from-[#6f8ea9]/30 to-[#8caec7]/22",
        glowClass: "from-[#6f8ea9]/40 to-transparent",
        stat: "100%",
    },
    {
        icon: "scale",
        title: "Ultralight 18g",
        description: "Aircraft-grade aluminium body machined to 18 grams. Barely there in your pocket, unmistakable in your hand.",
        accent: "from-[#8a95a4]/28 to-[#a7b2be]/20",
        glowClass: "from-[#8a95a4]/40 to-transparent",
        stat: "18g",
    },
    {
        icon: "widgets",
        title: "Modular System",
        description: "Click-and-lock accessory rails. Attach a cash strap, AirTag slot, or USB-C key — your carry, your config.",
        accent: "from-[#68879c]/28 to-[#89a3b4]/20",
        glowClass: "from-[#68879c]/40 to-transparent",
        stat: "4+",
    },
    {
        icon: "check_circle",
        title: "Premium Finish",
        description: "Micro-blasted and PVD-coated by hand. Scratch-resistant surface that only gets better character over time.",
        accent: "from-[#8d9aa8]/30 to-[#6f7c8a]/22",
        glowClass: "from-[#8d9aa8]/40 to-transparent",
        stat: "5H",
    },
    {
        icon: "credit_card",
        title: "8-Card Capacity",
        description: "Spring-tensioned clip holds 4–8 cards securely. Single-hand thumb access — cards fan out instantly.",
        accent: "from-[#6b92a1]/28 to-[#8db3c1]/20",
        glowClass: "from-[#6b92a1]/40 to-transparent",
        stat: "8",
    },
    {
        icon: "verified",
        title: "2-Year Warranty",
        description: "Every SatSet ships with a full two-year warranty. If it breaks, we fix or replace it. No questions asked.",
        accent: "from-[#758595]/28 to-[#9ba9b5]/20",
        glowClass: "from-[#758595]/40 to-transparent",
        stat: "2yr",
    },
];

export default function FeaturesSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const sectionEl = sectionRef.current;
            const gridEl = gridRef.current;
            const headerEl = headerRef.current;

            if (!sectionEl || !gridEl || !headerEl) return;

            const ctx = gsap.context(() => {
                const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

                // Clear any stale styles
                gsap.set([".feat-title-line", ".feat-subtitle", ".feat-card", ".feat-icon", ".feat-stat-badge"], {
                    clearProps: "all",
                });

                if (ScrollTrigger.isInViewport(sectionEl, 0.15) || prefersReducedMotion) {
                    gsap.set([".feat-title-line", ".feat-subtitle", ".feat-card", ".feat-icon", ".feat-stat-badge"], {
                        y: 0,
                        autoAlpha: 1,
                        scale: 1,
                        clearProps: "transform,opacity,visibility",
                    });
                    return;
                }

                // Title lines animation
                gsap.fromTo(
                    ".feat-title-line",
                    { y: 60, autoAlpha: 0 },
                    {
                        y: 0,
                        autoAlpha: 1,
                        duration: 1,
                        ease: "power4.out",
                        stagger: 0.12,
                        scrollTrigger: {
                            trigger: headerEl,
                            start: "top 85%",
                            once: true,
                        },
                    }
                );

                // Subtitle fade
                gsap.fromTo(
                    ".feat-subtitle",
                    { y: 40, autoAlpha: 0 },
                    {
                        y: 0,
                        autoAlpha: 1,
                        duration: 0.9,
                        ease: "power3.out",
                        delay: 0.2,
                        scrollTrigger: {
                            trigger: headerEl,
                            start: "top 85%",
                            once: true,
                        },
                    }
                );

                // Cards stagger animation
                gsap.fromTo(
                    ".feat-card",
                    { y: 80, autoAlpha: 0, scale: 0.94 },
                    {
                        y: 0,
                        autoAlpha: 1,
                        scale: 1,
                        stagger: 0.1,
                        duration: 0.9,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: gridEl,
                            start: "top 80%",
                            once: true,
                        },
                    }
                );

                // Icons with bounce
                gsap.fromTo(
                    ".feat-icon",
                    { scale: 0, rotation: -30, autoAlpha: 0 },
                    {
                        scale: 1,
                        rotation: 0,
                        autoAlpha: 1,
                        duration: 0.6,
                        ease: "back.out(1.7)",
                        stagger: 0.1,
                        delay: 0.3,
                        scrollTrigger: {
                            trigger: gridEl,
                            start: "top 78%",
                            once: true,
                        },
                    }
                );

                // Stat badges pop
                gsap.fromTo(
                    ".feat-stat-badge",
                    { scale: 0, autoAlpha: 0 },
                    {
                        scale: 1,
                        autoAlpha: 1,
                        duration: 0.5,
                        ease: "power3.out",
                        stagger: 0.1,
                        delay: 0.5,
                        scrollTrigger: {
                            trigger: gridEl,
                            start: "top 78%",
                            once: true,
                        },
                    }
                );

                // Orb parallax
                gsap.to(".feat-orb-1", {
                    xPercent: 15,
                    yPercent: 20,
                    scale: 1.2,
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionEl,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 2,
                    },
                });

                gsap.to(".feat-orb-2", {
                    xPercent: -12,
                    yPercent: -15,
                    scale: 1.3,
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionEl,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 2.5,
                    },
                });

                // Grid subtle float
                gsap.to(".feat-grid", {
                    y: -12,
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionEl,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1.5,
                    },
                });
            }, sectionRef);

            return () => ctx.revert();
        },
        { scope: sectionRef }
    );

    return (
        <section
            id="features"
            ref={sectionRef}
            className="relative py-40 md:py-52 bg-[#0a0f16] overflow-hidden"
            aria-labelledby="features-heading"
        >
            {/* Top border */}
            <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent"
            />

            {/* Ambient orbs */}
            <div
                aria-hidden
                className="feat-orb-1 pointer-events-none absolute left-[5%] top-[15%] h-72 w-72 rounded-full bg-linear-to-br from-[#6f8ea9]/20 to-[#8caec7]/12 blur-3xl"
            />
            <div
                aria-hidden
                className="feat-orb-2 pointer-events-none absolute right-[8%] top-[40%] h-96 w-96 rounded-full bg-linear-to-br from-[#758595]/18 to-[#9ba9b5]/10 blur-3xl"
            />

            {/* Subtle grid pattern */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.03] [background:linear-gradient(rgba(255,255,255,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.3)_1px,transparent_1px)] bg-size-[80px_80px]"
            />

            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 relative z-10">
                {/* Header */}
                <div ref={headerRef} className="mb-28 md:mb-36 max-w-4xl">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-px bg-linear-to-r from-white/60 to-transparent" />
                        <p className="text-xs font-semibold tracking-[0.35em] text-white/60 uppercase">
                            Why SatSet
                        </p>
                    </div>
                    <h2
                        id="features-heading"
                        className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6"
                    >
                        <span className="feat-title-line inline-block">Engineered for the</span>{" "}
                        <span className="feat-title-line inline-block text-white/60 font-light italic">
                            detail-oriented.
                        </span>
                    </h2>
                    <p className="feat-subtitle text-lg text-white/62 max-w-2xl leading-relaxed">
                        Every element purposefully designed. Nothing added without reason.
                        Nothing removed without consideration.
                    </p>
                </div>

                {/* Feature Cards Grid */}
                <div
                    ref={gridRef}
                    className="feat-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                >
                    {FEATURES.map((feature) => (
                        <div
                            key={feature.title}
                            className="feat-card group relative rounded-4xl p-8 md:p-10 bg-[#0f1620]/60 backdrop-blur-sm border border-white/8 hover:border-white/18 transition-all duration-500 cursor-default overflow-hidden"
                            tabIndex={0}
                            role="article"
                            aria-label={feature.title}
                        >
                            {/* Gradient overlay on hover */}
                            <div
                                aria-hidden
                                className={`absolute inset-0 bg-linear-to-br ${feature.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}
                            />

                            {/* Glow effect */}
                            <div
                                aria-hidden
                                className={`absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none blur-3xl bg-linear-to-br ${feature.glowClass}`}
                            />

                            {/* Stat badge */}
                            <div className="absolute top-0 right-0 px-4 py-2 rounded-full bg-white/8 border border-white/10">
                                <span className="feat-stat-badge text-sm font-semibold text-white/80">
                                    {feature.stat}
                                </span>
                            </div>

                            <div className="relative z-10">
                                {/* Icon */}
                                <div className="feat-icon-wrapper w-14 h-14 rounded-2xl bg-linear-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:border-white/20 transition-all duration-400">
                                    <span className="material-symbols-outlined text-2xl text-white/80 feat-icon group-hover:text-white transition-colors">
                                        {feature.icon}
                                    </span>
                                </div>

                                {/* Content */}
                                <h3 className="font-medium text-xl text-white mb-4 group-hover:text-white transition-colors duration-300">
                                    {feature.title}
                                </h3>
                                <p className="text-white/62 text-sm leading-relaxed group-hover:text-white/76 transition-colors duration-300">
                                    {feature.description}
                                </p>

                                {/* Bottom accent line */}
                                <div
                                    className="absolute bottom-0 left-8 right-8 h-px bg-linear-to-r from-transparent via-white/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"
                                />
                            </div>

                            {/* Corner accent */}
                            <div
                                aria-hidden
                                className="absolute bottom-0 right-0 w-24 h-24 bg-linear-to-tl from-white/3 to-transparent rounded-tl-full pointer-events-none"
                            />
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-24 md:mt-32 text-center">
                    <p className="text-white/52 text-sm mb-6">
                        Every feature verified through real-world testing
                    </p>
                    <a
                        href="#shop"
                        className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium hover:bg-white/20 hover:border-white/30 transition-all duration-300 group"
                    >
                        Explore All Features
                        <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">
                            arrow_forward
                        </span>
                    </a>
                </div>
            </div>

            {/* Bottom border */}
            <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent"
            />
        </section>
    );
}
