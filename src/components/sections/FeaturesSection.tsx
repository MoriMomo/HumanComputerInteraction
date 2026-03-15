"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
    {
        icon: "shield_person",
        title: "RFID Shielding",
        description:
            "Military-grade blocking layer protects your contactless cards from digital skimming — invisible, always active.",
    },
    {
        icon: "scale",
        title: "Ultralight 18 g",
        description:
            "Aircraft-grade aluminium body machined to 18 grams. Barely there in your pocket, unmistakable in your hand.",
    },
    {
        icon: "widgets",
        title: "Modular System",
        description:
            "Click-and-lock accessory rails. Attach a cash strap, AirTag slot, or USB-C key — your carry, your config.",
    },
    {
        icon: "check_circle",
        title: "Premium Finish",
        description:
            "Micro-blasted and PVD-coated by hand. Scratch-resistant surface that only gets better character over time.",
    },
    {
        icon: "credit_card",
        title: "8-Card Capacity",
        description:
            "Spring-tensioned clip holds 4–8 cards securely. Single-hand thumb access — cards fan out instantly.",
    },
    {
        icon: "verified",
        title: "2-Year Warranty",
        description:
            "Every ModuSnap ships with a full two-year warranty. If it breaks, we fix or replace it. No questions asked.",
    },
];

export default function FeaturesSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            const sectionEl = sectionRef.current;
            if (!sectionEl) return;

            // Clear stale inline styles left by previous GSAP runs/hot reloads.
            gsap.set(".feat-title, .feat-card", { clearProps: "all" });

            // If already in viewport, force visible state and skip intro animation.
            if (ScrollTrigger.isInViewport(sectionEl, 0.1)) {
                gsap.set(".feat-title, .feat-card", {
                    y: 0,
                    autoAlpha: 1,
                    clearProps: "transform,opacity,visibility,translate,rotate,scale",
                });
                return;
            }

            gsap.fromTo(
                ".feat-title",
                { y: 50, autoAlpha: 0 },
                {
                    y: 0,
                    autoAlpha: 1,
                    duration: 0.8,
                    ease: "power3.out",
                    immediateRender: false,
                    scrollTrigger: {
                        trigger: sectionEl,
                        start: "top 94%",
                        once: true,
                    },
                }
            );

            gsap.fromTo(
                ".feat-card",
                { y: 60, autoAlpha: 0 },
                {
                    y: 0,
                    autoAlpha: 1,
                    stagger: 0.12,
                    duration: 0.75,
                    ease: "power3.out",
                    immediateRender: false,
                    scrollTrigger: {
                        trigger: sectionEl,
                        start: "top 91%",
                        once: true,
                    },
                }
            );

            ScrollTrigger.refresh();
        },
        { scope: sectionRef }
    );

    return (
        <section
            id="features"
            ref={sectionRef}
            className="py-28 bg-white relative"
        >
            {/* Top edge fade */}
            <div
                aria-hidden
                className="fade-top-bg absolute inset-x-0 top-0 h-24 pointer-events-none"
            />

            <div className="max-w-350 mx-auto px-4 md:px-10 lg:px-20">
                {/* Section label */}
                <p className="feat-title text-xs font-semibold tracking-[0.25em] text-primary uppercase mb-4">
                    Why ModuSnap
                </p>
                <h2 className="feat-title font-serif text-charcoal text-4xl md:text-5xl font-bold leading-tight mb-16 max-w-xl">
                    Engineered for the{" "}
                    <span className="text-primary italic">detail-oriented</span>.
                </h2>

                {/* Cards grid */}
                <div className="feat-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map(({ icon, title, description }) => (
                        <div
                            key={title}
                            className="feat-card group relative bg-background-light rounded-2xl p-8 border border-soft-grey hover:border-primary/40 hover:shadow-[0_8px_40px_rgba(180,138,99,0.12)] transition-all duration-300 cursor-default"
                        >
                            {/* Icon */}
                            <div className="w-12 h-12 rounded-full bg-soft-grey flex items-center justify-center text-secondary mb-6 group-hover:bg-primary/10 group-hover:text-primary transition-colors duration-300">
                                <span className="material-symbols-outlined text-2xl">{icon}</span>
                            </div>

                            <h3 className="font-serif text-charcoal text-xl font-semibold mb-3">
                                {title}
                            </h3>
                            <p className="text-gray-500 text-sm leading-relaxed">{description}</p>

                            {/* Hover accent line */}
                            <div className="absolute bottom-0 left-8 right-8 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
