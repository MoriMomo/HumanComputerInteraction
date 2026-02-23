import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useLenis } from '@studio-freight/react-lenis'
import { NAV_LINKS } from '../constants/index.js'
import { usePrefersReducedMotion } from '../hooks/useGsapAnimation.js'

function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const navRef = useRef(null)
    const lenis = useLenis()
    const prefersReducedMotion = usePrefersReducedMotion()

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 24)
        window.addEventListener('scroll', handleScroll)
        handleScroll()

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        if (!navRef.current || prefersReducedMotion) return

        gsap.from(navRef.current, {
            y: -32,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out',
        })
    }, [prefersReducedMotion])

    const handleNavClick = (href) => (event) => {
        event.preventDefault()
        if (lenis) {
            lenis.scrollTo(href)
            return
        }
        const target = document.querySelector(href)
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <nav
            className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'glass-dark shadow-lg shadow-black/40' : 'bg-transparent'
                }`}
        >
            <div ref={navRef} className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                <a
                    href="#top"
                    className="flex items-center gap-3"
                    onClick={handleNavClick('#top')}
                >
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-electric-cyan to-neon-mint text-lg font-bold text-deep-black">
                        A
                    </span>
                    <div className="hidden text-left sm:block">
                        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-gray-400">
                            Aura-Link
                        </p>
                        <p className="text-sm font-semibold tracking-tight text-white">MODUSNAP</p>
                    </div>
                </a>

                <div className="hidden items-center gap-8 text-sm font-medium text-gray-300 md:flex">
                    {NAV_LINKS.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={handleNavClick(link.href)}
                            className="transition hover:text-electric-cyan"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>

                <button
                    type="button"
                    className="rounded-full border border-electric-cyan px-5 py-2 text-sm font-semibold text-electric-cyan transition hover:glow-cyan"
                    onClick={handleNavClick('#customizer')}
                >
                    Pre-Order
                </button>
            </div>
        </nav>
    )
}

export default Navbar
