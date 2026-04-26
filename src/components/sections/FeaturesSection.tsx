"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, Draggable);

const AUTO_SCROLL_MS = 3200;

const FEATURES = [
    {
        icon: "shield_person",
        title: "RFID Shielding",
        description: "Military-grade blocking layer protects your contactless cards from digital skimming — invisible, always active.",
        accent: "from-[#B59E7D]/30 to-[#B59E7D]/22",
        glowClass: "from-[#B59E7D]/40 to-transparent",
        stat: "100%",
    },
    {
        icon: "scale",
        title: "Ultralight 18g",
        description: "Aircraft-grade aluminium body machined to 18 grams. Barely there in your pocket, unmistakable in your hand.",
        accent: "from-[#B59E7D]/28 to-[#B59E7D]/20",
        glowClass: "from-[#B59E7D]/40 to-transparent",
        stat: "18g",
    },
    {
        icon: "widgets",
        title: "Modular System",
        description: "Click-and-lock accessory rails. Attach a cash strap, AirTag slot, or USB-C key — your carry, your config.",
        accent: "from-[#B59E7D]/28 to-[#B59E7D]/20",
        glowClass: "from-[#B59E7D]/40 to-transparent",
        stat: "4+",
    },
    {
        icon: "check_circle",
        title: "Premium Finish",
        description: "Micro-blasted and PVD-coated by hand. Scratch-resistant surface that only gets better character over time.",
        accent: "from-[#B59E7D]/30 to-[#B59E7D]/22",
        glowClass: "from-[#B59E7D]/40 to-transparent",
        stat: "5H",
    },
    {
        icon: "credit_card",
        title: "8-Card Capacity",
        description: "Spring-tensioned clip holds 4–8 cards securely. Single-hand thumb access — cards fan out instantly.",
        accent: "from-[#B59E7D]/28 to-[#B59E7D]/20",
        glowClass: "from-[#B59E7D]/40 to-transparent",
        stat: "8",
    },
    {
        icon: "verified",
        title: "2-Year Warranty",
        description: "Every SatSet ships with a full two-year warranty. If it breaks, we fix or replace it. No questions asked.",
        accent: "from-[#B59E7D]/28 to-[#B59E7D]/20",
        glowClass: "from-[#B59E7D]/40 to-transparent",
        stat: "2yr",
    },
];

export default function FeaturesSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const carouselRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const isDraggingRef = useRef(false);
    const isHoveringRef = useRef(false);
    const currentSlideRef = useRef(0);
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        currentSlideRef.current = currentSlide;
    }, [currentSlide]);

    // Memoized slide navigation
    const goToSlide = useCallback((index: number) => {
        const track = trackRef.current;
        const carousel = carouselRef.current;
        if (!track || !carousel) return;

        const clampedIndex = Math.max(0, Math.min(index, FEATURES.length - 1));
        const slideWidth = carousel.clientWidth;
        setCurrentSlide(clampedIndex);

        gsap.to(track, {
            x: -slideWidth * clampedIndex,
            duration: 0.6,
            ease: "power3.inOut",
            overwrite: "auto",
        });
    }, []);

    const nextSlide = useCallback(() => {
        goToSlide((currentSlide + 1) % FEATURES.length);
    }, [currentSlide, goToSlide]);

    const prevSlide = useCallback(() => {
        goToSlide((currentSlide - 1 + FEATURES.length) % FEATURES.length);
    }, [currentSlide, goToSlide]);

    useGSAP(
        () => {
            const sectionEl = sectionRef.current;
            const carouselEl = carouselRef.current;
            const trackEl = trackRef.current;
            const headerEl = headerRef.current;

            if (!sectionEl || !carouselEl || !trackEl || !headerEl) return;

            const ctx = gsap.context(() => {
                const selector = gsap.utils.selector(sectionRef);
                const animatedTargets = ".feat-title-line, .feat-subtitle, .feat-card-slide";
                const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

                ScrollTrigger.getAll().forEach((trigger) => {
                    const triggerElement = trigger.vars.trigger;

                    if (
                        triggerElement === sectionEl ||
                        triggerElement === headerEl ||
                        triggerElement === carouselEl
                    ) {
                        trigger.kill();
                    }
                });

                Draggable.get(trackEl)?.kill();

                // Clear stale styles
                gsap.set(selector(animatedTargets), {
                    clearProps: "all",
                });

                if (ScrollTrigger.isInViewport(sectionEl, 0.15) || prefersReducedMotion) {
                    gsap.set(selector(animatedTargets), {
                        y: 0,
                        autoAlpha: 1,
                        clearProps: "transform,opacity,visibility",
                    });
                    return;
                }

                // Header animations
                gsap.fromTo(
                    selector(".feat-title-line"),
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

                gsap.fromTo(
                    selector(".feat-subtitle"),
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

                // Carousel slide animations
                gsap.fromTo(
                    selector(".feat-card-slide"),
                    { x: 100, autoAlpha: 0 },
                    {
                        x: 0,
                        autoAlpha: 1,
                        stagger: 0.15,
                        duration: 0.8,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: carouselEl,
                            start: "top 80%",
                            once: true,
                        },
                    }
                );

                // Draggable carousel
                const [draggable] = Draggable.create(trackEl, {
                    type: "x",
                    bounds: {
                        minX: -carouselEl.clientWidth * (FEATURES.length - 1),
                        maxX: 0,
                    },
                    inertia: true,
                    edgeResistance: 0.65,
                    throwProps: true,
                    onDragStart: () => {
                        isDraggingRef.current = true;
                    },
                    onDragEnd: function () {
                        isDraggingRef.current = false;
                        const slideWidth = carouselEl.clientWidth;
                        const currentIndex = Math.round(-this.x / slideWidth);
                        goToSlide(currentIndex);
                    },
                });

                // Update slide on window resize
                const handleResize = () => {
                    const slideWidth = carouselEl.clientWidth;
                    gsap.set(trackEl, { x: -slideWidth * currentSlideRef.current });
                };

                window.addEventListener("resize", handleResize);

                return () => {
                    window.removeEventListener("resize", handleResize);
                    draggable.kill();
                };
            }, sectionRef);

            return () => ctx.revert();
        },
        { scope: sectionRef }
    );

    // Keyboard navigation
    useEffect(() => {
        const handleKeydown = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") nextSlide();
            if (e.key === "ArrowLeft") prevSlide();
        };
        window.addEventListener("keydown", handleKeydown);
        return () => window.removeEventListener("keydown", handleKeydown);
    }, [nextSlide, prevSlide]);

    // Auto-scroll from left to right; pause while user interacts.
    useEffect(() => {
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReducedMotion) return;

        const intervalId = window.setInterval(() => {
            const sectionEl = sectionRef.current;
            if (!sectionEl) return;
            if (isDraggingRef.current || isHoveringRef.current) return;
            if (!ScrollTrigger.isInViewport(sectionEl, 0.2)) return;

            goToSlide((currentSlide + 1) % FEATURES.length);
        }, AUTO_SCROLL_MS);

        return () => window.clearInterval(intervalId);
    }, [currentSlide, goToSlide]);

    return (
        <section
            id="features"
            ref={sectionRef}
            className="relative py-40 md:py-52 bg-[#584738] overflow-hidden"
            aria-labelledby="features-heading"
        >
            {/* Top border */}
            <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent"
            />

            {/* Ambient orbs - Reduced blur for performance */}
            <div
                aria-hidden
                className="feat-orb-1 pointer-events-none absolute left-[5%] top-[15%] h-72 w-72 rounded-full bg-linear-to-br from-[#B59E7D]/20 to-[#B59E7D]/12 blur-2xl"
            />
            <div
                aria-hidden
                className="feat-orb-2 pointer-events-none absolute right-[8%] top-[40%] h-96 w-96 rounded-full bg-linear-to-br from-[#B59E7D]/18 to-[#B59E7D]/10 blur-2xl"
            />

            {/* Subtle grid pattern */}
            <div
                aria-hidden
                className="feat-grid-overlay pointer-events-none absolute inset-0 opacity-[0.03]"
            />

            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 relative z-10">
                {/* Header */}
                <div ref={headerRef} className="mb-16 md:mb-24 max-w-4xl">
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
                    <p className="feat-subtitle text-lg text-white/74 max-w-2xl leading-relaxed">
                        Every element purposefully designed. Nothing added without reason.
                        Nothing removed without consideration.
                    </p>
                </div>

                {/* Carousel Container */}
                <div
                    ref={carouselRef}
                    className="relative overflow-hidden cursor-grab touch-pan-y active:cursor-grabbing"
                    onPointerEnter={() => {
                        isHoveringRef.current = true;
                    }}
                    onPointerLeave={() => {
                        isHoveringRef.current = false;
                    }}
                >
                    {/* Track */}
                    <div
                        ref={trackRef}
                        className="flex"
                    >
                        {FEATURES.map((feature) => (
                            <div
                                key={feature.title}
                                className="feat-card-slide feat-card group relative mx-2 basis-full shrink-0 overflow-hidden rounded-4xl border border-white/14 bg-[#584738]/92 p-8 transition-all duration-500 hover:border-white/22 md:mx-3 md:p-10"
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
                                    className={`absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none blur-2xl bg-linear-to-br ${feature.glowClass}`}
                                />

                                {/* Stat badge */}
                                <div className="absolute top-0 right-0 px-4 py-2 rounded-full bg-white/8 border border-white/10">
                                    <span className="feat-stat-badge text-sm font-semibold text-white/80">
                                        {feature.stat}
                                    </span>
                                </div>

                                <div className="relative z-10">
                                    {/* Icon */}
                                    <div className="feat-icon-wrapper mb-8 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-linear-to-br from-white/10 to-white/5 transition-all duration-400 group-hover:scale-110 group-hover:border-white/20">
                                        <span className="material-symbols-outlined text-2xl text-white/80 feat-icon group-hover:text-white transition-colors">
                                            {feature.icon}
                                        </span>
                                    </div>

                                    {/* Content */}
                                    <h3 className="font-medium text-xl text-white mb-4 group-hover:text-white transition-colors duration-300">
                                        {feature.title}
                                    </h3>
                                    <p className="text-white/74 text-sm leading-relaxed group-hover:text-white/88 transition-colors duration-300">
                                        {feature.description}
                                    </p>

                                    {/* Bottom accent line */}
                                    <div
                                        className="absolute bottom-0 left-8 right-8 h-px bg-linear-to-r from-transparent via-white/40 to-transparent scale-x-0 origin-center transition-transform duration-500 group-hover:scale-x-100"
                                    />
                                </div>

                                {/* Corner accent */}
                                <div
                                    aria-hidden
                                    className="absolute bottom-0 right-0 w-24 h-24 rounded-tl-full bg-linear-to-tl from-white/3 to-transparent pointer-events-none"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Navigation Arrows */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-2 md:left-3 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 z-20"
                        aria-label="Previous feature"
                    >
                        <span className="material-symbols-outlined">chevron_left</span>
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 z-20"
                        aria-label="Next feature"
                    >
                        <span className="material-symbols-outlined">chevron_right</span>
                    </button>
                </div>

                {/* Pagination Dots */}
                <div className="flex justify-center gap-3 mt-8">
                    {FEATURES.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${currentSlide === index
                                ? "w-8 bg-white"
                                : "bg-white/30 hover:bg-white/50"
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
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
