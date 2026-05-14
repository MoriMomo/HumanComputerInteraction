/**
 * GSAP animation presets and timing configurations
 * Centralized animation timing values and easing functions
 */

/**
 * GSAP easing function presets
 * These are commonly used easing functions across the application
 */
export const EASING = {
    POWER1_IN: "power1.in",
    POWER1_OUT: "power1.out",
    POWER1_INOUT: "power1.inOut",

    POWER2_IN: "power2.in",
    POWER2_OUT: "power2.out",
    POWER2_INOUT: "power2.inOut",

    POWER3_IN: "power3.in",
    POWER3_OUT: "power3.out",
    POWER3_INOUT: "power3.inOut",

    POWER4_IN: "power4.in",
    POWER4_OUT: "power4.out",
    POWER4_INOUT: "power4.inOut",

    BACK_IN: "back.in",
    BACK_OUT: "back.out",
    BACK_INOUT: "back.inOut",

    ELASTIC_IN: "elastic.in",
    ELASTIC_OUT: "elastic.out",

    BOUNCE_OUT: "bounce.out",

    LINEAR: "linear",
    NONE: "none",
} as const;

/**
 * Default GSAP timeline configuration
 */
export const TIMELINE_DEFAULTS = {
    ease: EASING.POWER3_OUT,
} as const;

/**
 * Common animation durations
 * Use these for consistent timing across animations
 */
export const DURATION = {
    INSTANT: 0,
    VERY_SHORT: 0.2,
    SHORT: 0.35,
    MEDIUM: 0.55,
    LONG: 0.85,
    VERY_LONG: 1,
    EXTRA_LONG: 1.2,
} as const;

/**
 * Page transition animation configuration
 */
export const PAGE_TRANSITION = {
    DURATION: 1.05,
    EASING: "cubic-bezier(0.22, 1, 0.36, 1)",
    CLASS_INITIAL: "opacity-0",
    CLASS_LOADED: "loaded",
    CLASS_WRAPPER: "page-content",
} as const;

/**
 * Scroll trigger common settings
 */
export const SCROLL_TRIGGER = {
    START: "top top",
    END_BASE: "bottom",
    END_OFFSET: 120,
    SCRUB: true,
    PARALLAX_START: "top bottom",
    PARALLAX_END: "bottom top",
} as const;

/**
 * Stagger animation configuration
 * Used when animating multiple items in sequence
 */
export const STAGGER = {
    TIGHT: 0.05,
    NORMAL: 0.08,
    LOOSE: 0.12,
    WIDE: 0.15,
} as const;

/**
 * IntersectionObserver animation triggers
 * Configuration for triggering animations on element visibility
 */
export const VISIBILITY_TRIGGER = {
    THRESHOLD: 0.1,
    ROOT_MARGIN: "-100px 0px -100px 0px",
} as const;

/**
 * Preset animation patterns for common use cases
 */
export const ANIMATION_PRESETS = {
    // Fade in from bottom with opacity
    fadeInUp: {
        from: { y: 60, opacity: 0 },
        to: { y: 0, opacity: 1 },
        duration: DURATION.MEDIUM,
        ease: EASING.POWER3_OUT,
    },

    // Scale in from center
    scaleIn: {
        from: { scale: 0.95, opacity: 0 },
        to: { scale: 1, opacity: 1 },
        duration: DURATION.LONG,
        ease: EASING.POWER3_OUT,
    },

    // Fade out and slide down
    fadeOutDown: {
        from: { y: 0, opacity: 1 },
        to: { y: 60, opacity: 0 },
        duration: DURATION.MEDIUM,
        ease: EASING.POWER3_OUT,
    },

    // Parallax scroll effect
    parallaxScroll: {
        duration: SCROLL_TRIGGER.SCRUB,
        ease: EASING.NONE,
    },

    // Menu link stagger
    menuLinkStagger: {
        from: { x: -40, opacity: 0 },
        to: { x: 0, opacity: 1 },
        duration: DURATION.SHORT,
        stagger: STAGGER.NORMAL,
        ease: EASING.POWER3_OUT,
    },
} as const;

/**
 * Reduced motion preferences
 * Returns true if user prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

/**
 * Safe animation wrapper
 * Returns duration 0 if reduced motion is preferred
 */
export const getSafeDuration = (duration: number): number => {
    return prefersReducedMotion() ? 0 : duration;
};
