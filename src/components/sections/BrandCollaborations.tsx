"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GridMap from "@/components/ui/GridMap";

gsap.registerPlugin(ScrollTrigger);

const COLLABORATIONS = [
    {
        id: "prada",
        name: "PRADA",
        image: "/ALLBRANDS/prada.png",
        edition: "Saffiano Steel Edition",
        details: "Co-designed with Prada's iconic Saffiano leather inserts and signature silver insignia. Built for timeless style and structural strength.",
        color: "#000000",
    },
    {
        id: "gucci",
        name: "GUCCI",
        image: "/ALLBRANDS/images (1).png",
        edition: "GG Monogram Bronze",
        details: "Featuring classic monogram canvas accents with hand-brushed warm bronze hardware. A bold fusion of traditional luxury and daily durability.",
        color: "#B59E7D",
    },
    {
        id: "hermes",
        name: "HERMÈS",
        image: "/ALLBRANDS/images (2).png",
        edition: "Orange Epsom Edition",
        details: "Bound in genuine Epsom leather in Hermès' signature orange hue, hand-sewn with wax-coated linen thread. Premium luxury in every stitch.",
        color: "#FF5E00",
    },
    {
        id: "saint-laurent",
        name: "SAINT LAURENT",
        image: "/ALLBRANDS/images (3).png",
        edition: "YSL Noir Matte Lambskin",
        details: "A sleek, black-on-black minimalist carry with a carbon fiber frame wrapped in YSL's premium full-grain lambskin. Timeless elegance, reinforced.",
        color: "#333333",
    },
    {
        id: "balenciaga",
        name: "BALENCIAGA",
        image: "/ALLBRANDS/balenciaga-logo-png_seeklogo-365962.png",
        edition: "Distressed Raw Titanium",
        details: "Designed in collaboration with Balenciaga's industrial design team. Features a heavily sand-blasted, raw titanium finish with an oversized logo engraving.",
        color: "#111111",
    },
    {
        id: "chanel",
        name: "CHANEL",
        image: "/ALLBRANDS/Chanel_logo_interlocking_cs.svg.png",
        edition: "Double-C Quilted Obsidian",
        details: "Crafted with diamond-quilted calfskin and interlocking double-C emblem in polished silver. Classic Parisian couture meets high-tech security.",
        color: "#000000",
    },
    {
        id: "louis-vuitton",
        name: "LOUIS VUITTON",
        image: "/ALLBRANDS/Louis_Vuitton_logo_and_wordmark.svg.png",
        edition: "LV Monogram Eclipse",
        details: "Wrapped in robust Monogram Eclipse canvas with a stealth carbon-reinforced clip mechanism. Built for the modern luxury traveler.",
        color: "#111111",
    },
    {
        id: "rolex",
        name: "ROLEX",
        image: "/ALLBRANDS/Rolex-Logo-PNG-Pic.png",
        edition: "Oyster Steel & Gold",
        details: "Featuring genuine Oystersteel casing accents with a fluted 18ct gold spring mechanism. Precision engineered to the standards of luxury chronometers.",
        color: "#006039",
    },
];

export default function BrandCollaborations() {
    const [hoveredBrand, setHoveredBrand] = useState<typeof COLLABORATIONS[number] | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const sectionEl = containerRef.current;
            if (!sectionEl) return;

            gsap.set(".collab-header, .collab-grid, .collab-details", {
                clearProps: "all",
            });

            const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

            if (ScrollTrigger.isInViewport(sectionEl, 0.1) || prefersReducedMotion) {
                gsap.set(".collab-header, .collab-grid, .collab-details", {
                    y: 0,
                    opacity: 1,
                    clearProps: "transform,opacity,visibility",
                });
                return;
            }

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionEl,
                    start: "top 85%",
                    once: true,
                },
            });

            tl.fromTo(
                ".collab-header",
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
            )
                .fromTo(
                    ".collab-grid",
                    { y: 25, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
                    "-=0.4"
                )
                .fromTo(
                    ".collab-details",
                    { opacity: 0 },
                    { opacity: 1, duration: 0.6 },
                    "-=0.2"
                );
        },
        { scope: containerRef }
    );

    return (
        <section
            ref={containerRef}
            className="relative py-24 md:py-32 overflow-hidden bg-white border-t border-black/5"
        >
            <GridMap spacing={120} opacity={0.02} />

            <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 lg:px-20">
                {/* Header */}
                <div className="collab-header text-center mb-16 md:mb-20">
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-primary mb-4">
                        Premium Collaborations
                    </p>
                    <h2 className="text-4xl md:text-5xl font-bold text-brand-dark tracking-tight leading-tight max-w-2xl mx-auto">
                        Co-Designed with <span className="italic text-brand-primary">Luxury Icons</span>.
                    </h2>
                    <p className="mt-4 text-sm md:text-base text-brand-dark/62 max-w-xl mx-auto leading-relaxed">
                        In exclusive collaboration with the world&apos;s most distinguished fashion and watch houses, we create limited edition carry objects that merge high craftsmanship with mechanical precision.
                    </p>
                </div>

                {/* Brand Grid */}
                <div className="collab-grid mb-12 border-y border-black/5 py-10 md:py-14">
                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 items-center justify-items-center gap-10 md:gap-14">
                        {COLLABORATIONS.map((brand) => {
                            const isHovered = hoveredBrand?.id === brand.id;
                            const isAnyHovered = hoveredBrand !== null;

                            return (
                                <div
                                    key={brand.id}
                                    className="cursor-pointer transition-all duration-300 transform w-full max-w-[160px] flex items-center justify-center h-24 group"
                                    onMouseEnter={() => setHoveredBrand(brand)}
                                    onMouseLeave={() => setHoveredBrand(null)}
                                    style={{
                                        opacity: isAnyHovered ? (isHovered ? 1 : 0.28) : 0.7,
                                        transform: isHovered ? "scale(1.08)" : "scale(1)",
                                    }}
                                    aria-label={`View collaboration with ${brand.name}`}
                                >
                                    <div className="relative w-full h-14 transition-transform duration-300">
                                        <Image
                                            src={brand.image}
                                            alt={`${brand.name} Logo`}
                                            fill
                                            sizes="160px"
                                            className="object-contain filter grayscale opacity-60 group-hover:opacity-100 group-hover:grayscale-0 mix-blend-multiply transition-all duration-300"
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Details Panel - Animated Showcase */}
                <div className="collab-details min-h-[140px] md:min-h-[120px] rounded-3xl border border-brand-primary/10 bg-brand-cream/15 p-6 md:p-8 backdrop-blur-md transition-all duration-300 shadow-soft">
                    {hoveredBrand ? (
                        <div className="animate-fade-in flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-8">
                            <div className="max-w-2xl">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-[10px] font-bold uppercase tracking-widest bg-brand-primary text-white px-2.5 py-1 rounded-full">
                                        Special Edition
                                    </span>
                                    <h4 className="text-lg font-bold text-brand-dark">
                                        {hoveredBrand.edition}
                                    </h4>
                                </div>
                                <p className="text-sm md:text-[0.95rem] text-brand-dark/78 leading-relaxed">
                                    {hoveredBrand.details}
                                </p>
                            </div>
                            <div className="shrink-0 text-left md:text-right">
                                <p className="text-xs uppercase tracking-widest text-brand-primary font-bold mb-1">
                                    Availability
                                </p>
                                <p className="text-sm font-semibold text-brand-dark">
                                    Limited Release · VIP Tier
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-full text-center py-4">
                            <p className="text-xs md:text-sm font-medium uppercase tracking-[0.2em] text-brand-dark/45">
                                Hover over a fashion or watch house to preview special edition releases
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
