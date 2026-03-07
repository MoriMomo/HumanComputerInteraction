import gsap from 'gsap'

/**
 * Returns the GSAP instance (already imported from npm).
 * Previously loaded via CDN — migrated to npm package for reliability,
 * TypeScript types, and tree-shaking support.
 * @returns {object} GSAP instance
 */
export function useGsap() {
    return gsap
}
