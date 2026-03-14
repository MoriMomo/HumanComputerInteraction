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
            // Animate number counters
            stats.forEach((stat, i) => {
                const el = document.querySelector(`[data-counter="${i}"]`);
                if (!el) return;
                const obj = { val: 0 };
                gsap.to(obj, {
                    val: stat.value,
                    duration: 1.8,
                    ease: "power2.out",
                    onUpdate: () => {
                        el.textContent = Math.round(obj.val).toString();
                    },
                    scrollTrigger: {
                        trigger: "[data-stats-row]",
                        start: "top 80%",
                        once: true,
                    },
                });
            });

            // Spec rows stagger in
            gsap.from(".spec-row", {
                x: -30,
                opacity: 0,
                stagger: 0.07,
                duration: 0.6,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".spec-table",
                    start: "top 80%",
                },
            });

            gsap.from(".specs-title", {
                y: 40,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".specs-title",
                    start: "top 85%",
                },
            });
        },
        { scope: sectionRef }
    );

    return (
        <section
            id="specs"
            ref={sectionRef}
            className="py-28 bg-charcoal text-white relative overflow-hidden"
        >
            {/* Decorative arc */}
            <div
                aria-hidden
                className="blob-bronze pointer-events-none absolute top-[-30%] left-[-10%] w-[60vw] h-[60vw] rounded-full opacity-[0.04]"
            />

            <div className="max-w-350 mx-auto px-4 md:px-10 lg:px-20">
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
                            <p className="text-sm text-gray-400 tracking-widest uppercase font-medium">
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
                            className="spec-row flex items-start justify-between py-5 border-b border-white/10 gap-8"
                        >
                            <span className="text-sm text-gray-400 font-medium tracking-wide shrink-0 w-36">
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
