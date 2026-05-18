"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GridMap from "@/components/ui/GridMap";

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIALS = [
    {
        name: "Alya Pratama",
        role: "Creative Director",
        quote: "The 3D preview makes the finish feel real before I buy. It removed the usual hesitation.",
        rating: 5,
        initials: "AP",
    },
    {
        name: "Rizky Aditya",
        role: "Product Manager",
        quote: "Fast cart flow, clear specs, and the WhatsApp help line made the whole purchase feel easy.",
        rating: 5,
        initials: "RA",
    },
    {
        name: "Nadya Sari",
        role: "Design Consultant",
        quote: "I could compare colors, read the specs, and check social proof without leaving the page.",
        rating: 4,
        initials: "NS",
    },
];

export default function TestimonialsSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            const sectionEl = sectionRef.current;
            if (!sectionEl) return;

            const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

            gsap.set(".testimonial-card", { clearProps: "all" });

            if (ScrollTrigger.isInViewport(sectionEl, 0.1) || prefersReducedMotion) {
                gsap.set(".testimonial-card", {
                    y: 0,
                    opacity: 1,
                    clearProps: "transform,opacity",
                });
                return;
            }

            // Staggered scroll-triggered animations
            gsap.fromTo(
                ".testimonial-card",
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.15,
                    duration: 0.8,
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
        <section ref={sectionRef} className="relative overflow-hidden bg-white px-6 py-28 text-[#231711] md:px-12 lg:px-20">
            <GridMap spacing={140} opacity={0.02} color="rgba(35,23,17,0.02)" />
            <div className="relative mx-auto max-w-7xl">
                <div className="max-w-2xl">
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">Social proof</p>
                    <h2 className="mt-4 font-serif text-4xl font-bold md:text-5xl text-[#231711]">Trusted by people who want the product to feel real before they commit.</h2>
                    <p className="mt-4 max-w-xl text-[#231711]/64">
                        Dummy testimonials are in place for now so the site can prove the visual and trust-building pattern.
                    </p>
                </div>

                <div className="mt-10 grid gap-6 md:grid-cols-3">
                    {TESTIMONIALS.map((testimonial) => (
                        <article
                            key={testimonial.name}
                            className="testimonial-card group relative overflow-hidden rounded-3xl border border-black/8 bg-white p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-all duration-300 hover:border-primary/20 hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)]"
                        >
                            {/* Gradient accent bar - top left */}
                            <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-primary via-primary/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                            {/* Hover glow background */}
                            <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/5 blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                            <div className="relative z-10">
                                {/* Quote icon */}
                                <div className="mb-4 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                    <span className="text-lg font-serif text-primary/70">&quot;</span>
                                </div>

                                {/* Star rating with enhanced styling */}
                                <div className="mb-5 flex gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <span
                                            key={i}
                                            className={`text-lg transition-all duration-300 ${i < testimonial.rating ? "text-primary drop-shadow-[0_0_4px_rgba(181,158,125,0.4)] [animation-delay:${i * 50}ms]" : "text-[#231711]/20"}`}
                                        >
                                            ★
                                        </span>
                                    ))}
                                </div>

                                {/* Testimonial quote */}
                                <p className="text-sm leading-7 text-[#231711]/88 mb-6 min-h-16">
                                    {testimonial.quote}
                                </p>

                                {/* Divider */}
                                <div className="mb-6 h-px bg-linear-to-r from-black/6 via-black/3 to-transparent" />

                                {/* Author info with avatar */}
                                <div className="flex items-center gap-4">
                                    {/* Avatar placeholder */}
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-primary/20 to-primary/10 text-xs font-semibold text-primary">
                                        {testimonial.initials}
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold text-[#231711] group-hover:text-primary/90 transition-colors">
                                            {testimonial.name}
                                        </p>
                                        <p className="text-xs uppercase tracking-[0.2em] text-[#231711]/44">
                                            {testimonial.role}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}