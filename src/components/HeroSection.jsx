"use client";
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';

function HeroSection() {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.hero-text-stagger > *', {
                opacity: 0,
                y: 30,
                duration: 1,
                stagger: 0.15,
                ease: 'power3.out',
            });

            gsap.from('.hero-spec-item', {
                opacity: 0,
                y: 20,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power3.out',
                delay: 0.5,
            });

            gsap.from('.hero-image-reveal', {
                opacity: 0,
                x: 50,
                duration: 1.5,
                ease: 'power3.out',
                delay: 0.2,
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative min-h-[90vh] flex flex-col justify-center bg-background-light overflow-hidden pt-20">
            {/* Ambient Background Glows */}
            <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[150px] pointer-events-none"></div>
            <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-10 lg:px-20 w-full">
                {/* Main content grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[600px]">
                    {/* LEFT CONTENT */}
                    <div className="flex flex-col justify-center gap-8 pl-4 lg:pl-8 hero-text-stagger">
                        {/* Main Heading */}
                        <h1 className="font-serif text-charcoal text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.15] tracking-tight">
                            Elevate Your <br />
                            <span className="text-primary italic">Everyday</span>.<br />
                            Refine Your <span className="text-secondary">Carry</span>.
                        </h1>

                        {/* Subtitle */}
                        <p className="text-gray-600 text-base md:text-lg font-sans max-w-xl leading-relaxed">
                            Discover the intersection of minimalist design and premium functionality. The ModuSnap card holder system—crafted for the modern professional workspace.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap gap-4 mt-4">
                            <button className="flex items-center justify-center rounded-full h-12 px-8 bg-primary text-white text-sm font-medium transition-all duration-300 hover:bg-secondary shadow-premium focus:outline-none focus:ring-4 focus:ring-primary/50 transform hover:-translate-y-0.5">
                                <span className="truncate">Pre-order Now</span>
                            </button>
                            <button className="flex items-center justify-center rounded-full h-12 px-8 glass border border-soft-grey/50 text-charcoal text-sm font-medium transition-all duration-300 hover:border-primary/50 hover:bg-white/50 focus:outline-none focus:ring-4 focus:ring-primary/50">
                                <span className="truncate">View Collection</span>
                            </button>
                        </div>

                        {/* Specs Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 py-6 border-t border-soft-grey/30">
                            <div className="flex flex-col items-center sm:items-start gap-3 glass p-4 rounded-xl border border-white/20 hero-spec-item">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                    <span className="material-symbols-outlined text-lg">shield_person</span>
                                </div>
                                <span className="text-xs text-charcoal font-semibold tracking-wide text-center sm:text-left">RFID Protection</span>
                            </div>
                            <div className="flex flex-col items-center sm:items-start gap-3 glass p-4 rounded-xl border border-white/20 hero-spec-item">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                    <span className="material-symbols-outlined text-lg">scale</span>
                                </div>
                                <span className="text-xs text-charcoal font-semibold tracking-wide text-center sm:text-left">Ultralight 18g</span>
                            </div>
                            <div className="flex flex-col items-center sm:items-start gap-3 glass p-4 rounded-xl border border-white/20 hero-spec-item">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                    <span className="material-symbols-outlined text-lg">widgets</span>
                                </div>
                                <span className="text-xs text-charcoal font-semibold tracking-wide text-center sm:text-left">Modular System</span>
                            </div>
                            <div className="flex flex-col items-center sm:items-start gap-3 glass p-4 rounded-xl border border-white/20 hero-spec-item">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                    <span className="material-symbols-outlined text-lg">check_circle</span>
                                </div>
                                <span className="text-xs text-charcoal font-semibold tracking-wide text-center sm:text-left">Premium Finish</span>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SHOWCASE */}
                    <div className="relative flex justify-center items-center h-[500px] lg:h-[700px] w-full mt-10 lg:mt-0 px-4 hero-image-reveal">
                        <div className="relative w-full max-w-[500px] aspect-[3/4] overflow-hidden rounded-2xl glass p-2 shadow-premium-lg group">
                            <div className="relative w-full h-full rounded-xl overflow-hidden">
                                <Image
                                    alt="Premium ModuSnap Card Holder on executive desk"
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVLnBBctRTny20xXQFATtDoFDFgs2dRPk8EkAknFojIdfEQrr3voE0MCNKyia787tCxWjdyLSjpqe-0g4rAvi6thIW6vQxRlJ1PuGmi3n58oPsYVBxGkQhEjbAydsFgOQ2C2k-CO4q0QW5zxCFCnCf1Bnw5R8bheoCNTXukUEVwizDdaXFAZCYIEMRWLCw7yB_WtvMECcTB-cyx0Ay61KkIHVpk8c3mwhKH9Zjz2ABtOkPt8HpSWAi8FxkhEB1ghiPV37VVSLjjBg"
                                    fill
                                    priority
                                    sizes="(max-width: 768px) 100vw, 500px"
                                />
                                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection
