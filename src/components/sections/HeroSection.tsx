"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const GLOW_CLASS: Record<string, string> = {
    "#B48A63": "bg-[#B48A63]",
    "#1C1C1E": "bg-[#1C1C1E]",
    "#8E9AA6": "bg-[#8E9AA6]",
    "#BCA782": "bg-[#BCA782]",
    "#3C2F24": "bg-[#3C2F24]",
    "#8A683A": "bg-[#8A683A]",
};

const HERO_CAROUSEL_ITEMS = [
    {
        id: "standard",
        name: "SatSet Standard",
        subtitle: "Storm Grey",
        price: "$79",
        bgClass: "from-[#EEF1F4] to-[#DDE3E8]",
        accentClass: "text-[#627387]",
    },
    {
        id: "pro",
        name: "SatSet Pro",
        subtitle: "Desert Bronze",
        price: "$129",
        bgClass: "from-[#F3E8DE] to-[#E6D3BE]",
        accentClass: "text-[#9D6D43]",
    },
    {
        id: "executive",
        name: "SatSet Executive",
        subtitle: "Midnight Black",
        price: "$199",
        bgClass: "from-[#E2E2E5] to-[#C8C8CC]",
        accentClass: "text-[#2B2B31]",
    },
];

interface HeroSectionProps {
    activeColor: string;
}

export default function HeroSection({ activeColor }: HeroSectionProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            gsap.set(".hero-word, .hero-sub, .hero-cta, .hero-badge, .hero-canvas", {
                clearProps: "all",
            });

            gsap.set(".hero-carousel-card", { clearProps: "all" });

            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            tl.fromTo(
                ".hero-word",
                { y: 70, opacity: 0 },
                { y: 0, opacity: 1, stagger: 0.1, duration: 0.9, immediateRender: false }
            )
                .fromTo(
                    ".hero-sub",
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.7, immediateRender: false },
                    "-=0.4"
                )
                .fromTo(
                    ".hero-cta",
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, stagger: 0.12, duration: 0.6, immediateRender: false },
                    "-=0.3"
                )
                .fromTo(
                    ".hero-badge",
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, stagger: 0.08, duration: 0.5, immediateRender: false },
                    "-=0.2"
                )
                .fromTo(
                    ".hero-canvas",
                    { opacity: 0, scale: 0.95 },
                    { opacity: 1, scale: 1, duration: 1, immediateRender: false },
                    "-=1"
                )
                .fromTo(
                    ".hero-carousel-card",
                    { y: 24, opacity: 0 },
                    { y: 0, opacity: 1, stagger: 0.06, duration: 0.55, immediateRender: false },
                    "-=0.55"
                );
        },
        { scope: containerRef }
    );

    return (
        <section
            id="showcase"
            ref={containerRef}
            className="relative min-h-[calc(100vh-5rem)] flex items-center py-8 md:py-12"
        >
            {/* Decorative background gradient blob */}
            <div
                aria-hidden
                className="blob-bronze pointer-events-none absolute top-[-10%] right-[-5%] w-[55vw] h-[55vw] rounded-full opacity-[0.06]"
            />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">
                {/* ── Left copy ── */}
                <div className="flex flex-col gap-8 px-1 lg:px-2">
                    {/* Headline — each span animates individually */}
                    <h1 className="font-serif text-charcoal text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.12] tracking-tight overflow-hidden">
                        <span className="hero-word inline-block">Elevate</span>{" "}
                        <span className="hero-word inline-block">Your</span>
                        <br />
                        <span className="hero-word inline-block text-primary italic">Everyday</span>
                        <span className="hero-word inline-block">.</span>
                        <br />
                        <span className="hero-word inline-block">Refine</span>{" "}
                        <span className="hero-word inline-block">Your</span>{" "}
                        <span className="hero-word inline-block text-secondary">Carry</span>
                        <span className="hero-word inline-block">.</span>
                    </h1>

                    <p className="hero-sub text-gray-500 text-base md:text-lg max-w-lg leading-relaxed">
                        The <strong className="text-charcoal font-semibold">ModuSnap</strong> card holder system — crafted at the
                        intersection of minimalist design and premium functionality for the modern professional.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-wrap gap-4 items-center">
                        <a
                            href="#shop"
                            className="hero-cta flex items-center justify-center rounded-full h-12 px-8 bg-primary text-white text-sm font-semibold tracking-wide transition-all duration-300 hover:bg-secondary shadow-lg hover:shadow-xl"
                        >
                            Pre-order Now
                        </a>
                        <a
                            href="#features"
                            className="hero-cta flex items-center justify-center rounded-full h-12 px-8 bg-transparent border border-gray-300 text-charcoal text-sm font-medium transition-all duration-300 hover:border-primary hover:text-primary"
                        >
                            View Collection
                        </a>
                    </div>

                    {/* Feature badges */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-7 border-t border-soft-grey">
                        {[
                            { icon: "shield_person", label: "RFID Protection" },
                            { icon: "scale", label: "Ultralight 18g" },
                            { icon: "widgets", label: "Modular System" },
                            { icon: "check_circle", label: "Premium Finish" },
                        ].map(({ icon, label }) => (
                            <div key={label} className="hero-badge flex flex-col items-start gap-3">
                                <div className="w-10 h-10 rounded-full bg-soft-grey flex items-center justify-center text-secondary">
                                    <span className="material-symbols-outlined text-lg">{icon}</span>
                                </div>
                                <span className="text-xs text-charcoal font-semibold tracking-widest uppercase">
                                    {label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Right product carousel ── */}
                <div className="hero-canvas relative flex justify-center items-center h-105 md:h-130 lg:h-155 w-full">
                    <div
                        aria-hidden
                        className={`absolute inset-0 m-auto w-72 h-72 md:w-80 md:h-80 rounded-full blur-3xl opacity-20 pointer-events-none ${GLOW_CLASS[activeColor] ?? "bg-[#B48A63]"}`}
                    />

                    <div className="hero-carousel relative w-[72%] max-w-110 min-w-70 h-107.5 md:h-132.5 lg:h-155 overflow-hidden rounded-4xl border border-white/70 bg-white/50 backdrop-blur-sm shadow-[0_24px_52px_rgba(48,44,43,0.16)]">
                        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 bg-linear-to-b from-white/95 to-transparent" />
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-16 bg-linear-to-t from-white/95 to-transparent" />

                        <div className="hero-carousel-track flex flex-col gap-4 p-4">
                            {[...HERO_CAROUSEL_ITEMS, ...HERO_CAROUSEL_ITEMS].map((item, index) => (
                                <article
                                    key={`${item.id}-${index}`}
                                    className="hero-carousel-card relative flex items-center gap-4 rounded-2xl border border-white/70 bg-white p-4 shadow-[0_10px_26px_rgba(48,44,43,0.12)]"
                                >
                                    <div className={`absolute inset-0 rounded-2xl bg-linear-to-r opacity-45 ${item.bgClass}`} />

                                    <div className="relative z-1 shrink-0 w-18 md:w-20">
                                        <Image
                                            src="/models/card/hero-card.svg"
                                            alt={`${item.name} product preview`}
                                            width={220}
                                            height={290}
                                            priority={index < 3}
                                            className="w-full h-auto drop-shadow-[0_10px_14px_rgba(48,44,43,0.18)]"
                                        />
                                    </div>

                                    <div className="relative z-1 min-w-0">
                                        <p className="text-[11px] uppercase tracking-[0.22em] text-charcoal/55 mb-1">
                                            {item.subtitle}
                                        </p>
                                        <h3 className="font-serif text-charcoal text-xl leading-tight truncate">
                                            {item.name}
                                        </h3>
                                        <p className={`mt-2 text-sm font-semibold ${item.accentClass}`}>
                                            From {item.price}
                                        </p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
