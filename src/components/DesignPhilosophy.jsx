"use client";
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/**
 * Design Philosophy section
 * Describes the product's design principles using premium typography and glass cards
 */
function DesignPhilosophy() {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.philosophy-header', {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 80%',
                },
                opacity: 0,
                y: 30,
                duration: 1,
                ease: 'power3.out',
            });

            gsap.from('.philosophy-text > *', {
                scrollTrigger: {
                    trigger: '.philosophy-text',
                    start: 'top 80%',
                },
                opacity: 0,
                x: -30,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power3.out',
            });

            gsap.from('.philosophy-card', {
                scrollTrigger: {
                    trigger: '.philosophy-card',
                    start: 'top 80%',
                },
                opacity: 0,
                x: 30,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power3.out',
            });

            gsap.from('.philosophy-cta', {
                scrollTrigger: {
                    trigger: '.philosophy-cta',
                    start: 'top 90%',
                },
                opacity: 0,
                scale: 0.95,
                duration: 1,
                ease: 'power3.out',
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="max-w-7xl mx-auto px-6 py-20 overflow-hidden">
            {/* Header */}
            <div className="text-center mb-20 philosophy-header">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-charcoal font-serif">
                    Design <span className="text-primary italic">Philosophy</span>
                </h2>
                <p className="text-charcoal/70 max-w-2xl mx-auto text-lg font-light">
                    Where mechanical integrity meets everyday carry elegance
                </p>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 mb-20">
                {/* Left: Main narrative */}
                <div className="space-y-10 philosophy-text">
                    <div>
                        <h3 className="text-2xl font-bold text-charcoal mb-4 font-serif">The Modular Ecosystem</h3>
                        <p className="text-charcoal/70 leading-relaxed font-light">
                            Aura-Link ModuSnap isn't just a lanyard or ID holder. It's a carefully engineered
                            <span className="text-primary font-medium tracking-wide"> modular ecosystem</span> designed
                            for those who demand both functionality and aesthetics in their daily carry.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-2xl font-bold text-charcoal mb-4 font-serif">Mechanical Precision</h3>
                        <p className="text-charcoal/70 leading-relaxed font-light">
                            The rear-clamped design allows you to carry your ID card at the front while hiding
                            functional modules behind—preserving a clean profile while maximizing utility.
                            Every tolerance measured to{' '}
                            <span className="text-primary font-medium tracking-wide">0.1mm precision</span>.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-2xl font-bold text-charcoal mb-4 font-serif">Material Integrity</h3>
                        <p className="text-charcoal/70 leading-relaxed font-light">
                            3D-printed from premium engineering-grade nylon, the chassis is lightweight yet
                            remarkably durable. The signal-friendly polymer structure ensures your RFID/NFC
                            cards work flawlessly—no more fumbling to remove your ID at turnstiles.
                        </p>
                    </div>
                </div>

                {/* Right: Visual breakdown */}
                <div className="space-y-6 relative">
                    {/* Decorative background glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[120%] bg-gradient-to-b from-primary/5 via-primary/10 to-transparent blur-3xl -z-10 rounded-[100%] pointer-events-none"></div>

                    {/* Card 1 */}
                    <div className="glass p-8 rounded-2xl border-l-4 border-l-primary/50 shadow-premium border-y border-y-white/20 border-r border-r-white/20 philosophy-card hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300"></div>
                        <h4 className="text-charcoal font-bold mb-3 flex items-center gap-3 relative z-10">
                            <span className="text-primary font-serif italic text-xl">01.</span>
                            Spatial Awareness Design
                        </h4>
                        <p className="text-charcoal/60 text-sm font-light leading-relaxed relative z-10">
                            Modules exist in the &quot;shadow&quot; of your ID card, adding zero visual bulk to
                            the front face while providing maximum functionality.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="glass p-8 rounded-2xl border-l-4 border-l-primary shadow-premium border-y border-y-white/20 border-r border-r-white/20 philosophy-card hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300"></div>
                        <h4 className="text-charcoal font-bold mb-3 flex items-center gap-3 relative z-10">
                            <span className="text-primary font-serif italic text-xl">02.</span>
                            Tactical Modularity
                        </h4>
                        <p className="text-charcoal/60 text-sm font-light leading-relaxed relative z-10">
                            Swap modules based on your daily needs. Fragrance for meetings, tech storage
                            for travel, or custom modules from our growing ecosystem.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="glass p-8 rounded-2xl border-l-4 border-l-secondary shadow-premium border-y border-y-white/20 border-r border-r-white/20 philosophy-card hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300"></div>
                        <h4 className="text-charcoal font-bold mb-3 flex items-center gap-3 relative z-10">
                            <span className="text-primary font-serif italic text-xl">03.</span>
                            Executive Aesthetic
                        </h4>
                        <p className="text-charcoal/60 text-sm font-light leading-relaxed relative z-10">
                            Inspired by warm minimalism—clean lines, functional beauty, and a warm tobacco
                            palette that elevates your professional carry.
                        </p>
                    </div>

                    {/* Quote */}
                    <div className="p-8 rounded-2xl border-l-2 border-primary/30 mt-10 philosophy-card relative">
                        <div className="absolute -left-2 -top-2 text-6xl text-primary/10 font-serif rotate-180 select-none">"</div>
                        <p className="text-charcoal/70 italic text-lg leading-relaxed mb-4">
                            We don&apos;t design products. We engineer solutions that disappear into your workflow
                            while elevating your everyday carry.
                        </p>
                        <p className="text-primary tracking-wider text-xs font-bold uppercase">— Design Team, Aura-Link</p>
                    </div>
                </div>
            </div>

            {/* Bottom CTA */}
            <div className="text-center glass p-12 lg:p-16 rounded-3xl border border-white/30 shadow-premium-lg philosophy-cta relative overflow-hidden group">
                {/* Shine effect */}
                <div className="absolute top-0 -inset-full h-full w-1/2 z-0 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />

                <div className="relative z-10">
                    <h3 className="text-3xl md:text-4xl font-serif font-bold text-charcoal mb-4">
                        Ready to <span className="text-primary italic">Redefine</span> Your Carry?
                    </h3>
                    <p className="text-charcoal/70 mb-10 text-lg font-light max-w-xl mx-auto">
                        Join the waitlist for early access and exclusive launch pricing
                    </p>
                    <button
                        className="px-10 py-4 font-bold tracking-wide rounded-full transition-all bg-primary text-white hover:bg-secondary shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-primary/50 transform hover:-translate-y-0.5"
                    >
                        Reserve Your ModuSnap
                    </button>
                </div>
            </div>
        </section>
    )
}

export default DesignPhilosophy
