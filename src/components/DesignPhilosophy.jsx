import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PHILOSOPHY_CARDS, PHILOSOPHY_POINTS } from '../constants/index.js'
import { usePrefersReducedMotion } from '../hooks/useGsapAnimation.js'

gsap.registerPlugin(ScrollTrigger)

function DesignPhilosophy() {
    const sectionRef = useRef(null)
    const numberRefs = useRef([])
    const prefersReducedMotion = usePrefersReducedMotion()

    useEffect(() => {
        if (!sectionRef.current || prefersReducedMotion) return

        const ctx = gsap.context(() => {
            gsap.from('.philosophy-text', {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 75%',
                },
                opacity: 0,
                x: -30,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power2.out',
            })

            gsap.from('.philosophy-card', {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 75%',
                },
                opacity: 0,
                x: 40,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power2.out',
            })

            numberRefs.current.forEach((numberEl, index) => {
                if (!numberEl) return
                const target = PHILOSOPHY_CARDS[index]?.number ?? 0
                const counter = { value: 0 }

                gsap.to(counter, {
                    value: target,
                    duration: 2,
                    ease: 'power1.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 75%',
                    },
                    onUpdate: () => {
                        numberEl.textContent = String(Math.round(counter.value)).padStart(2, '0')
                    },
                })
            })

            gsap.to('.philosophy-cta', {
                boxShadow: '0 0 60px rgba(0, 250, 255, 0.6)',
                duration: 1.5,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [prefersReducedMotion])

    useEffect(() => {
        if (!prefersReducedMotion) return

        numberRefs.current.forEach((numberEl, index) => {
            if (!numberEl) return
            const target = PHILOSOPHY_CARDS[index]?.number ?? 0
            numberEl.textContent = String(target).padStart(2, '0')
        })
    }, [prefersReducedMotion])

    return (
        <section id="philosophy" ref={sectionRef} className="section-padding">
            <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="space-y-8">
                    {PHILOSOPHY_POINTS.map((point) => (
                        <div key={point.title} className="philosophy-text">
                            <h3 className="text-xl font-semibold text-white">{point.title}</h3>
                            <p className="mt-3 text-sm leading-relaxed text-gray-400">{point.copy}</p>
                        </div>
                    ))}
                </div>

                <div className="space-y-4">
                    {PHILOSOPHY_CARDS.map((card, index) => {
                        const accentClass =
                            card.accent === 'neon-mint'
                                ? 'border-neon-mint/50 text-neon-mint'
                                : 'border-electric-cyan/50 text-electric-cyan'

                        return (
                            <div
                                key={card.title}
                                className="philosophy-card glass flex items-center gap-4 rounded-2xl border border-gray-700/50 p-5"
                            >
                                <div
                                    className={`flex h-12 w-12 items-center justify-center rounded-full border text-sm font-semibold ${accentClass}`}
                                >
                                    <span ref={(el) => (numberRefs.current[index] = el)}>0{card.number}</span>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-white">{card.title}</p>
                                    <p className="mt-1 text-xs text-gray-400">{card.copy}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="mx-auto mt-12 flex max-w-6xl flex-col items-start justify-between gap-6 rounded-2xl border border-electric-cyan/40 bg-electric-cyan/5 p-6 sm:flex-row sm:items-center">
                <div>
                    <p className="text-xs uppercase tracking-[0.4em] text-electric-cyan">Reserve</p>
                    <h3 className="mt-3 text-2xl font-semibold text-white">Reserve your ModuSnap today.</h3>
                    <p className="mt-2 text-sm text-gray-400">
                        Early access bundles include exclusive module trims and travel-ready accessories.
                    </p>
                </div>
                <button
                    type="button"
                    className="philosophy-cta rounded-full border border-electric-cyan px-6 py-3 text-sm font-semibold text-electric-cyan"
                >
                    Reserve Your ModuSnap
                </button>
            </div>
        </section>
    )
}

export default DesignPhilosophy
