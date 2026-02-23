import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SHOWCASE_SPECS } from '../constants/index.js'
import { usePrefersReducedMotion } from '../hooks/useGsapAnimation.js'

gsap.registerPlugin(ScrollTrigger)

function AnimatedShowcase() {
    const containerRef = useRef(null)
    const cardRef = useRef(null)
    const prefersReducedMotion = usePrefersReducedMotion()

    useEffect(() => {
        if (!containerRef.current || !cardRef.current || prefersReducedMotion) return

        const ctx = gsap.context(() => {
            gsap.to('.main-card', {
                y: -20,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
            })

            gsap.to('.glow-border', {
                rotation: 360,
                duration: 8,
                repeat: -1,
                ease: 'none',
            })

            gsap.from('.spec-card', {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 70%',
                },
                opacity: 0,
                y: 30,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power2.out',
            })

            gsap.from('.main-card', {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 80%',
                },
                opacity: 0,
                scale: 0.85,
                duration: 1,
                ease: 'power3.out',
            })
        }, containerRef)

        const handleMouseMove = (event) => {
            const { clientX, clientY } = event
            const x = (clientX / window.innerWidth - 0.5) * 20
            const y = (clientY / window.innerHeight - 0.5) * 20

            gsap.to(cardRef.current, {
                rotationY: x,
                rotationX: -y,
                duration: 0.5,
                ease: 'power2.out',
            })
        }

        const handleMouseLeave = () => {
            gsap.to(cardRef.current, {
                rotationY: 0,
                rotationX: 0,
                duration: 0.6,
                ease: 'power2.out',
            })
        }

        const container = containerRef.current
        container.addEventListener('mousemove', handleMouseMove)
        container.addEventListener('mouseleave', handleMouseLeave)

        return () => {
            container.removeEventListener('mousemove', handleMouseMove)
            container.removeEventListener('mouseleave', handleMouseLeave)
            ctx.revert()
        }
    }, [prefersReducedMotion])

    return (
        <section id="showcase" ref={containerRef} className="section-padding relative overflow-hidden">
            <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.4em] text-gray-500">
                        Modular Showcase
                    </p>
                    <h2 className="mt-4 text-3xl font-semibold text-white md:text-4xl">
                        The Aura-Link core floats between form and function.
                    </h2>
                    <p className="mt-4 text-base leading-relaxed text-gray-400">
                        A glass-clad chassis, a luminous outline, and precision module rails create a
                        futuristic silhouette built for daily carry.
                    </p>
                </div>

                <div className="relative flex items-center justify-center">
                    <div
                        ref={cardRef}
                        className="main-card relative h-72 w-56 rounded-[28px] border border-electric-cyan/40 bg-white/5 p-6 text-center text-white shadow-[0_0_40px_rgba(0,250,255,0.25)]"
                        style={{ transformStyle: 'preserve-3d' }}
                    >
                        <div className="glow-border absolute inset-0 rounded-[28px] border border-electric-cyan/50" />
                        <div className="relative z-10 flex h-full flex-col justify-between">
                            <span className="text-xs uppercase tracking-[0.3em] text-gray-400">MODUSNAP</span>
                            <div className="text-2xl font-semibold">Aura-Link</div>
                            <div className="text-xs text-gray-400">Rear Clamp System</div>
                        </div>
                        <span className="module-left absolute -left-6 top-1/2 h-10 w-4 -translate-y-1/2 rounded-full bg-electric-cyan/60" />
                        <span className="module-right absolute -right-6 top-1/2 h-10 w-4 -translate-y-1/2 rounded-full bg-neon-mint/70" />
                    </div>

                    <div className="absolute -left-8 -top-8 h-20 w-20 rounded-full border border-electric-cyan/30" />
                    <div className="absolute -right-10 -bottom-6 h-16 w-16 rounded-full border border-neon-mint/30" />
                </div>
            </div>

            <div className="mx-auto mt-12 grid max-w-4xl gap-4 md:grid-cols-3">
                {SHOWCASE_SPECS.map((spec) => (
                    <div key={spec.label} className="spec-card glass rounded-2xl p-4">
                        <p className="text-xs uppercase tracking-[0.3em] text-gray-500">{spec.label}</p>
                        <p className="mt-2 text-lg font-semibold text-white">{spec.value}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default AnimatedShowcase
