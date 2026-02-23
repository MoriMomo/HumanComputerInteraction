import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useLenis } from '@studio-freight/react-lenis'
import { usePrefersReducedMotion } from '../hooks/useGsapAnimation.js'

function HeroSection() {
    const sectionRef = useRef(null)
    const prefersReducedMotion = usePrefersReducedMotion()
    const lenis = useLenis()

    useEffect(() => {
        if (!sectionRef.current || prefersReducedMotion) return

        const ctx = gsap.context(() => {
            gsap.from('.hero-badge', {
                opacity: 0,
                y: -20,
                duration: 0.8,
                ease: 'power2.out',
            })
            gsap.from('.hero-heading', {
                opacity: 0,
                y: 30,
                duration: 1,
                delay: 0.2,
                ease: 'power2.out',
            })
            gsap.from('.hero-subtitle', {
                opacity: 0,
                y: 20,
                duration: 0.8,
                delay: 0.3,
                ease: 'power2.out',
            })
            gsap.from('.hero-buttons', {
                opacity: 0,
                y: 20,
                duration: 0.8,
                delay: 0.4,
                stagger: 0.1,
                ease: 'power2.out',
            })

            gsap.to('.gradient-text', {
                backgroundPosition: '200% center',
                duration: 3,
                repeat: -1,
                ease: 'none',
            })

            gsap.to('.hero-orb', {
                y: -30,
                duration: 6,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                stagger: 0.4,
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [prefersReducedMotion])

    return (
        <section
            id="top"
            ref={sectionRef}
            className="relative flex min-h-screen items-center justify-center overflow-hidden bg-deep-black px-6 pb-24 pt-32"
        >
            <div className="hero-orb absolute -left-32 top-12 h-96 w-96 rounded-full bg-electric-cyan/20 blur-3xl" />
            <div className="hero-orb absolute -right-28 bottom-16 h-[28rem] w-[28rem] rounded-full bg-neon-mint/20 blur-[140px]" />

            <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
                <span className="hero-badge rounded-full border border-electric-cyan/40 px-4 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-electric-cyan">
                    The Tactical Nexus
                </span>
                <h1 className="hero-heading mt-6 text-4xl font-semibold tracking-tight text-white md:text-6xl">
                    Define Your Carry.
                    <span className="gradient-text block text-5xl font-bold md:text-7xl">
                        Snap Your World.
                    </span>
                </h1>
                <p className="hero-subtitle mt-6 max-w-2xl text-base leading-relaxed text-gray-400 md:text-lg">
                    Aura-Link ModuSnap reimagines modular carry with a cybernetic chassis,
                    featuring <span className="text-electric-cyan">rear-clamped precision</span> and
                    <span className="text-neon-mint"> signal-friendly materials</span> built for the
                    future.
                </p>

                <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
                    <a
                        href="#showcase"
                        onClick={(event) => {
                            event.preventDefault()
                            if (lenis) {
                                lenis.scrollTo('#showcase')
                                return
                            }
                            document.querySelector('#showcase')?.scrollIntoView({ behavior: 'smooth' })
                        }}
                        className="hero-buttons rounded-full bg-electric-cyan px-6 py-3 text-sm font-semibold text-deep-black transition hover:shadow-[0_0_25px_rgba(0,250,255,0.6)]"
                    >
                        Explore Showcase
                    </a>
                    <a
                        href="#customizer"
                        onClick={(event) => {
                            event.preventDefault()
                            if (lenis) {
                                lenis.scrollTo('#customizer')
                                return
                            }
                            document.querySelector('#customizer')?.scrollIntoView({ behavior: 'smooth' })
                        }}
                        className="hero-buttons rounded-full border border-neon-mint px-6 py-3 text-sm font-semibold text-neon-mint transition hover:glow-mint"
                    >
                        Customize Yours
                    </a>
                </div>

                <div className="mt-12 flex flex-wrap items-center justify-center gap-4 text-xs uppercase tracking-[0.3em] text-gray-500">
                    <span className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-electric-cyan" />
                        Ultra Slim
                    </span>
                    <span className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-neon-mint" />
                        Modular Core
                    </span>
                    <span className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-electric-cyan" />
                        RFID Safe
                    </span>
                </div>
            </div>
        </section>
    )
}

export default HeroSection
