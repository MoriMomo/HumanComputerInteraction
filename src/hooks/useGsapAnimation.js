import { useEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function usePrefersReducedMotion() {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
        const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches)

        updatePreference()
        mediaQuery.addEventListener('change', updatePreference)

        return () => mediaQuery.removeEventListener('change', updatePreference)
    }, [])

    return prefersReducedMotion
}

export function useScrollReveal(options = {}) {
    const elementRef = useRef(null)
    const mergedOptions = useMemo(() => options, [options])
    const prefersReducedMotion = usePrefersReducedMotion()

    useEffect(() => {
        if (!elementRef.current || prefersReducedMotion) return

        const ctx = gsap.context(() => {
            gsap.from(elementRef.current, {
                scrollTrigger: {
                    trigger: elementRef.current,
                    start: 'top 80%',
                    ...mergedOptions.scrollTrigger,
                },
                opacity: 0,
                y: 50,
                duration: 0.8,
                ease: 'power2.out',
                ...mergedOptions,
            })
        }, elementRef)

        return () => ctx.revert()
    }, [mergedOptions, prefersReducedMotion])

    return elementRef
}
