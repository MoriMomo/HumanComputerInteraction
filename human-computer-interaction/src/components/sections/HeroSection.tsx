"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import dynamic from "next/dynamic";

// Dynamically import the 3D scene so it only runs on the client
const CardHolderScene = dynamic(() => import("../3d/CardHolderScene"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full flex items-center justify-center">
            <div className="w-16 h-16 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>
    ),
});

interface HeroSectionProps {
    activeColor: string;
}

export default function HeroSection({ activeColor }: HeroSectionProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            tl.from(".hero-word", {
                y: 70,
                opacity: 0,
                stagger: 0.1,
                duration: 0.9,
            })
                .from(
                    ".hero-sub",
                    { y: 30, opacity: 0, duration: 0.7 },
                    "-=0.4"
                )
                .from(
                    ".hero-cta",
                    { y: 20, opacity: 0, stagger: 0.12, duration: 0.6 },
                    "-=0.3"
                )
                .from(
                    ".hero-badge",
                    { y: 20, opacity: 0, stagger: 0.08, duration: 0.5 },
                    "-=0.2"
                )
                .from(
                    ".hero-canvas",
                    { opacity: 0, scale: 0.95, duration: 1 },
                    "-=1"
                );
        },
        { scope: containerRef }
    );

    return (
        <section
            id="showcase"
            ref={containerRef}
            className="relative min-h-screen flex items-center py-20"
        >
            {/* Decorative background gradient blob */}
            <div
                aria-hidden
                className="blob-bronze pointer-events-none absolute top-[-10%] right-[-5%] w-[55vw] h-[55vw] rounded-full opacity-[0.06]"
            />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">
                {/* ── Left copy ── */}
                <div className="flex flex-col gap-8 pl-2 lg:pl-4">
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
                    <div className="flex flex-wrap gap-4">
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
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-8 pt-8 border-t border-soft-grey">
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

                {/* ── Right 3D canvas ── */}
                <div className="hero-canvas relative flex justify-center items-center h-130 lg:h-170 w-full">
                    {/* Glow ring behind the model */}
                    <div
                        aria-hidden
                        className="absolute inset-0 m-auto w-72 h-72 rounded-full blur-3xl opacity-20 pointer-events-none"
                        style={{ background: activeColor }}
                    />
                    <CardHolderScene
                        color={activeColor}
                        className="w-full h-full"
                        autoRotate={true}
                        enableZoom={false}
                        cameraPosition={[1.1, 0.28, 4.2]}
                        cameraLookAt={[0, 0, 0]}
                        introFromPosition={[2.6, 1.3, 7.2]}
                        introDuration={1.8}
                        modelRotation={[0.06, -0.42, 0]}
                        modelOffset={[0, 0, 0]}
                        modelScaleMultiplier={1.06}
                    />
                    {/* Drag hint */}
                    <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-gray-400 tracking-widest uppercase flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-base">drag_pan</span>
                        Drag to rotate
                    </p>
                </div>
            </div>
        </section>
    );
}
