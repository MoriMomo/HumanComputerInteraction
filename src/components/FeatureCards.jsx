import { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FEATURES } from '../constants/index.js'
import { usePrefersReducedMotion } from '../hooks/useGsapAnimation.js'

gsap.registerPlugin(ScrollTrigger)

function FeatureCard({ feature }) {
    const glowClass =
        feature.color === 'neon-mint' ? 'bg-neon-mint/20' : 'bg-electric-cyan/20'
    const glowHoverClass =
        feature.color === 'neon-mint' ? 'group-hover:bg-neon-mint/40' : 'group-hover:bg-electric-cyan/40'
    const shadowClass =
        feature.color === 'neon-mint'
            ? 'hover:shadow-[0_0_25px_rgba(57,255,20,0.35)]'
            : 'hover:shadow-[0_0_25px_rgba(0,250,255,0.35)]'

    return (
        <div
            className={`feature-card glass group rounded-2xl border border-gray-700/40 p-6 transition duration-300 hover:-translate-y-1 ${shadowClass}`}
        >
            <div className="flex items-center justify-between">
                <span className="text-3xl">{feature.icon}</span>
                <span
                    className={`h-10 w-10 rounded-full blur-lg transition duration-300 ${glowClass} ${glowHoverClass}`}
                />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-white">{feature.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-gray-400">{feature.description}</p>
        </div>
    )
}

FeatureCard.propTypes = {
    feature: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
    }).isRequired,
}

function FeatureCards() {
    const containerRef = useRef(null)
    const prefersReducedMotion = usePrefersReducedMotion()

    useEffect(() => {
        if (!containerRef.current || prefersReducedMotion) return

        const ctx = gsap.context(() => {
            gsap.from('.feature-card', {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 80%',
                },
                opacity: 0,
                y: 50,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power2.out',
            })
        }, containerRef)

        return () => ctx.revert()
    }, [prefersReducedMotion])

    return (
        <section id="features" ref={containerRef} className="section-padding">
            <div className="mx-auto max-w-6xl">
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-gray-500">
                    Features
                </p>
                <h2 className="mt-4 text-3xl font-semibold text-white md:text-4xl">
                    Modular performance, engineered for daily carry.
                </h2>
                <div className="mt-10 grid gap-6 md:grid-cols-2">
                    {FEATURES.map((feature) => (
                        <FeatureCard key={feature.title} feature={feature} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default FeatureCards
