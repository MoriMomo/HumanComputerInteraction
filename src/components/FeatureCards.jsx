"use client";
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FEATURES, FEATURE_ACCENT_COLORS } from '../constants'

/**
 * Feature cards section component
 * Displays product features in a responsive grid with glassmorphism
 */
function FeatureCards() {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.feature-card', {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 80%',
                },
                opacity: 0,
                y: 30,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power3.out',
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);
    /**
     * Get accent classes for a feature card
     * @param {string} accentColor - 'primary' | 'secondary'
     */
    const getAccentClasses = (accentColor) =>
        FEATURE_ACCENT_COLORS[accentColor] ?? FEATURE_ACCENT_COLORS.primary

    return (
        <section ref={containerRef} className="max-w-7xl mx-auto px-6 py-20 relative">
            {/* Subtle Background Pattern */}
            <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: 'radial-gradient(var(--color-charcoal) 1px, transparent 1px)', backgroundSize: '40px 40px', maskImage: 'linear-gradient(to bottom, transparent, black, transparent)' }}></div>

            {/* Section Header */}
            <div className="text-center mb-16 relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-charcoal font-serif">
                    Engineered for <span className="text-primary italic">Professionals</span>
                </h2>
                <p className="text-gray-500 max-w-2xl mx-auto font-light">
                    Every detail designed with mechanical precision and daily utility in mind
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                {FEATURES.map((feature, index) => {
                    const accentClasses = getAccentClasses(feature.accentColor)

                    return (
                        <div
                            key={index}
                            className={`feature-card relative group glass p-8 rounded-2xl border border-white/20 transition-all duration-500 overflow-hidden shadow-premium hover:shadow-premium-lg hover:-translate-y-1`}
                        >
                            {/* Subtle mix-blend overlay on hover */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${accentClasses.gradient} to-transparent opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                            {/* Content */}
                            <div className="relative z-10">
                                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 glass text-secondary group-hover:text-primary transition-colors border border-white/40">
                                    <div className="text-2xl" aria-hidden="true">{feature.icon}</div>
                                </div>
                                <h3 className="text-xl font-bold text-charcoal mb-3 group-hover:text-primary transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-500 text-sm leading-relaxed font-light">
                                    {feature.description}
                                </p>
                            </div>

                            {/* Corner accent glow */}
                            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${accentClasses.glow} to-transparent rounded-bl-full opacity-30 group-hover:opacity-60 transition-opacity duration-500`} />
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

export default FeatureCards
