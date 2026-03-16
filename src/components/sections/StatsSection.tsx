"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
    {
        value: "18g",
        label: "ULTRALIGHT WEIGHT",
        description: "Aircraft-grade aluminum body machined to featherlight specifications.",
    },
    {
        value: "8",
        label: "CARD CAPACITY",
        description: "Spring-tensioned clip holds 4-8 cards securely with single-hand access.",
    },
    {
        value: "100%",
        label: "RFID PROTECTION",
        description: "Military-grade blocking layer protects from digital skimming and is always active.",
    },
    {
        value: "2yr",
        label: "WARRANTY",
        description: "Two-year warranty coverage with repair or replacement support.",
    },
];

interface StatsSectionProps {
    videoSrc?: string;
    title?: string;
    subtitle?: string;
}

export default function StatsSection({
    videoSrc = "/video/vecteezy_workers-hands-sorting-plastic-waste-moving-on-conveyor_5485455.mp4",
    title = "Engineered & Verified",
    subtitle = "Built for the detail-oriented professional.",
}: StatsSectionProps) {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            const sectionEl = sectionRef.current;
            if (!sectionEl) return;

            gsap.set(".stats-title, .stats-subtitle, .stats-row, .stats-image", {
                clearProps: "all",
            });

            if (ScrollTrigger.isInViewport(sectionEl, 0.1)) {
                gsap.set(".stats-title, .stats-subtitle, .stats-row, .stats-image", {
                    y: 0,
                    autoAlpha: 1,
                    clearProps: "transform,opacity,visibility",
                });
                return;
            }

            gsap.fromTo(
                ".stats-image",
                { scale: 1.08, autoAlpha: 0.8 },
                {
                    scale: 1,
                    autoAlpha: 1,
                    duration: 1.4,
                    ease: "power3.out",
                    immediateRender: false,
                    scrollTrigger: {
                        trigger: sectionEl,
                        start: "top 85%",
                        once: true,
                    },
                }
            );

            gsap.fromTo(
                ".stats-title",
                { y: 48, autoAlpha: 0 },
                {
                    y: 0,
                    autoAlpha: 1,
                    duration: 0.9,
                    ease: "power3.out",
                    immediateRender: false,
                    scrollTrigger: {
                        trigger: sectionEl,
                        start: "top 88%",
                        once: true,
                    },
                }
            );

            gsap.fromTo(
                ".stats-subtitle",
                { y: 32, autoAlpha: 0 },
                {
                    y: 0,
                    autoAlpha: 1,
                    duration: 0.7,
                    ease: "power3.out",
                    immediateRender: false,
                    scrollTrigger: {
                        trigger: sectionEl,
                        start: "top 88%",
                        once: true,
                    },
                }
            );

            gsap.fromTo(
                ".stats-row",
                { x: 40, autoAlpha: 0 },
                {
                    x: 0,
                    autoAlpha: 1,
                    stagger: 0.12,
                    duration: 0.7,
                    ease: "power3.out",
                    immediateRender: false,
                    scrollTrigger: {
                        trigger: sectionEl,
                        start: "top 85%",
                        once: true,
                    },
                }
            );
        },
        { scope: sectionRef }
    );

    return (
        <section id="specs" ref={sectionRef} className="relative z-20 bg-[#0a0f16]">
            {/* Top seam matches hero dark fade */}
            <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b from-[#0a0f16] to-transparent z-10" />
            <div className="grid min-h-[92vh] grid-cols-1 lg:grid-cols-2">
                <div className="stats-image relative min-h-[58vh] overflow-hidden lg:min-h-[92vh]">
                    <video
                        className="absolute inset-0 h-full w-full object-cover"
                        src={videoSrc}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        aria-hidden
                    />
                    <div
                        aria-hidden
                        className="absolute inset-0 bg-linear-to-r from-[#0a0f16]/72 via-[#0a0f16]/38 to-transparent lg:hidden"
                    />
                    <div
                        aria-hidden
                        className="absolute inset-0 bg-linear-to-t from-[#0a0f16] via-transparent to-[#0a0f16]/18"
                    />
                </div>

                <div className="relative flex flex-col justify-center px-8 py-18 md:px-14 lg:px-20 lg:py-0">
                    <div className="max-w-xl">
                        <p className="stats-subtitle mb-4 text-xs font-semibold tracking-[0.28em] text-white/40 uppercase">
                            Performance Snapshot
                        </p>
                        <h2 className="stats-title text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
                            {title}
                        </h2>
                        <p className="stats-subtitle mt-5 mb-10 max-w-md text-lg text-white/58">
                            {subtitle}
                        </p>

                        <div>
                            {STATS.map((stat) => (
                                <div
                                    key={stat.label}
                                    className="stats-row group flex items-start justify-between gap-6 border-b border-white/10 py-7 last:border-0"
                                >
                                    <div>
                                        <div className="flex items-baseline gap-4">
                                            <span className="text-4xl font-light tracking-tight text-white md:text-5xl">
                                                {stat.value}
                                            </span>
                                            <span className="text-[11px] tracking-[0.26em] text-white/40 uppercase transition-colors group-hover:text-white/66">
                                                {stat.label}
                                            </span>
                                        </div>
                                        <p className="mt-2 text-sm leading-relaxed text-white/52 md:hidden">
                                            {stat.description}
                                        </p>
                                    </div>

                                    <p className="hidden max-w-xs text-right text-sm text-white/52 transition-colors group-hover:text-white/72 md:block">
                                        {stat.description}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <p className="stats-row mt-7 max-w-md text-xs leading-relaxed text-white/30">
                            Specifications are validated through internal tests and partner verification flows before release.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}