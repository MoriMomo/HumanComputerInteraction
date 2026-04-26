"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
    { value: 18, suffix: "g", label: "Weight" },
    { value: 8, suffix: "", label: "Card Capacity" },
    { value: 2, suffix: "yr", label: "Warranty" },
    { value: 100, suffix: "%", label: "RFID Blocked" },
];

const specs = [
    { label: "Material", value: "6061-T6 Aerospace Aluminium" },
    { label: "Finish", value: "PVD + Micro-Blasted Anodise" },
    { label: "Dimensions", value: "85 × 54 × 8 mm" },
    { label: "Weight", value: "18 g (empty)" },
    { label: "Capacity", value: "4 – 8 standard ISO cards" },
    { label: "RFID", value: "13.56 MHz full-block" },
    { label: "Compatibility", value: "Visa, Mastercard, Amex, ID, Transit" },
    { label: "Warranty", value: "24-month manufacturer" },
];

export default function SpecsSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            const sectionEl = sectionRef.current;
            if (!sectionEl) return;

            const runCounters = () => {
                stats.forEach((stat, i) => {
                    const el = sectionEl.querySelector<HTMLElement>(`[data-counter="${i}"]`);
                    if (!el) return;

                    const obj = { val: 0 };
                    gsap.to(obj, {
                        val: stat.value,
                        duration: 1.8,
                        ease: "power2.out",
                        onUpdate: () => {
                            el.textContent = Math.round(obj.val).toString();
                        },
                    });
                });
            };

            gsap.set(".specs-title, .spec-row", { clearProps: "all" });

            if (ScrollTrigger.isInViewport(sectionEl, 0.12)) {
                gsap.set(".specs-title, .spec-row", {
                    x: 0,
                    y: 0,
                    autoAlpha: 1,
                    clearProps: "transform,opacity,visibility,translate,rotate,scale",
                });
                runCounters();
                return;
            }

            gsap.fromTo(
                ".specs-title",
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
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
                ".spec-row",
                { x: -30, autoAlpha: 0 },
                {
                    x: 0,
                    autoAlpha: 1,
                    stagger: 0.07,
                    duration: 0.6,
                    ease: "power2.out",
                    immediateRender: false,
                    scrollTrigger: {
                        trigger: sectionEl,
                        start: "top 92%",
                        once: true,
                    },
                }
            );

            ScrollTrigger.create({
                trigger: sectionEl,
                start: "top 92%",
                once: true,
                onEnter: runCounters,
            });

            gsap.to(".specs-orb", {
                xPercent: -8,
                yPercent: -12,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionEl,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                },
            });

            ScrollTrigger.refresh();
        },
        { scope: sectionRef }
    );

    return (
        <section
            id="specs"
            ref={sectionRef}
            className="relative py-32 md:py-40 overflow-hidden bg-[#584738] text-white"
        >
            <div aria-hidden className="absolute inset-0 bg-linear-to-b from-[#584738] via-[#584738] to-[#584738]" />

            {/* Animated ambient gradient orbs */}
            <div aria-hidden className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/4 rounded-full blur-3xl animate-pulse" />
            <div aria-hidden className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-purple-500/3 rounded-full blur-3xl animate-pulse [animation-delay:1s]" />
            <div aria-hidden className="specs-orb section-orb pointer-events-none absolute right-[-6%] top-10 h-112 w-md rounded-full bg-[#584738]/12 blur-3xl" />

            <div className="relative z-10 max-w-350 mx-auto px-6 md:px-12 lg:px-20">
                {/* Label + title */}
                <p className="specs-title text-xs font-semibold tracking-[0.25em] text-primary uppercase mb-4">
                    Technical Specifications
                </p>
                <h2 className="specs-title font-serif text-white text-4xl md:text-5xl font-bold leading-tight mb-20 max-w-2xl">
                    Every millimetre{" "}
                    <span className="text-primary italic">matters</span>.
                </h2>

                {/* Stat counters */}
                <div
                    data-stats-row
                    className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-24 pb-16 border-b border-white/10"
                >
                    {stats.map((stat, i) => (
                        <div key={stat.label} className="flex flex-col gap-2">
                            <p className="stat-number font-serif text-5xl md:text-6xl font-bold text-white leading-none">
                                <span data-counter={i}>0</span>
                                <span className="text-primary">{stat.suffix}</span>
                            </p>
                            <p className="text-sm text-white/40 tracking-widest uppercase font-medium">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Spec table */}
                <div className="spec-table grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-0">
                    {specs.map(({ label, value }) => (
                        <div
                            key={label}
                            className="spec-row flex items-start justify-between py-5 border-b border-white/10 gap-8 transition-all duration-300 hover:border-white/20"
                        >
                            <span className="text-sm text-white/50 font-medium tracking-wide shrink-0 w-36">
                                {label}
                            </span>
                            <span className="text-sm text-white font-medium text-right">{value}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
