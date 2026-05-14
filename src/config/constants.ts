/**
 * Global constants and configuration values
 * Centralized source for magic numbers, thresholds, and configuration
 */

/* ── Features & Feature Flags ── */
export const ENABLE_3D_MODEL = true;
export const ENABLE_PERFORMANCE_MONITORING = true;
export const ENABLE_DEBUG_GPU_MONITOR = false;

/* ── Animation Durations (seconds) ── */
export const ANIMATION = {
    // Page transitions
    PAGE_TRANSITION_IN: 1.05,
    PAGE_TRANSITION_CUBIC: "cubic-bezier(0.22, 1, 0.36, 1)",

    // Hero section timings
    HERO_TITLE: 0.85,
    HERO_KICKER: 0.55,
    HERO_TOP_RIGHT: 0.55,
    HERO_CANVAS: 1,
    HERO_META: 0.55,
    HERO_RAIL: 0.55,

    // Stagger delays
    HERO_KICKER_DELAY: 0.35,
    HERO_TOP_RIGHT_DELAY: 0.4,
    HERO_CANVAS_OVERLAP: 1,
    HERO_META_DELAY: 0.45,
    HERO_RAIL_DELAY: 0.45,

    // Scroll animations
    HERO_CANVAS_SCROLL_DURATION: 0.36,
    HERO_META_SCROLL_DURATION: 0.36,

    // Material section
    MATERIAL_TITLE: 0.6,
    MATERIAL_SUBTITLE: 0.5,
    MATERIAL_VIEWER: 0.8,
    MATERIAL_CONTROLS: 0.5,
    MATERIAL_STAGGER: 0.08,
    MATERIAL_VIEWER_READY_DELAY: 0.6,

    // Navbar
    NAVBAR_INIT: 1.2,
    NAVBAR_MENU_LINK: 0.5,
    NAVBAR_MENU_STAGGER: 0.08,

    // Easing functions
    EASE_POWER3_OUT: "power3.out",
    EASE_POWER4_OUT: "power4.out",
    EASE_NONE: "none",
} as const;

/* ── Z-Index Layers ── */
export const Z_INDEX = {
    CANVAS: 0,
    BACKGROUND: 5,
    CONTENT: 10,
    OVERLAY: 20,
    MODAL: 50,
    NAV: 100,
    LOADING: 9999,
} as const;

/* ── Section IDs ── */
export const SECTION_IDS = {
    SHOWCASE: "showcase",
    MATERIALS: "materials",
    FEATURES: "features",
    SPECS: "specs",
    SHOP: "shop",
    STATS: "stats",
    ABOUT: "about",
} as const;

/* ── 3D Model Configuration ── */
export const MODEL_CONFIG = {
    // Camera positioning
    CAMERA_POSITION: [0, 0, 8] as [number, number, number],
    CAMERA_LOOK_AT: [0, 0, 0] as [number, number, number],

    // Intro animation
    INTRO_FROM_POSITION: [1.8, 2.2, 12] as [number, number, number],
    INTRO_DURATION: 1.15,

    // Model rotation (lock X axis to prevent gimbal lock)
    LOCK_MODEL_ORIENTATION_X: Math.PI / 2,
    INITIAL_MODEL_ROTATION: [Math.PI / 2, 0.22, 0] as [number, number, number],
    INITIAL_MODEL_OFFSET: [0, 0, 0] as [number, number, number],

    // Scale
    MODEL_SCALE_MULTIPLIER: 2.4,

    // Material properties
    MATERIAL_TINT_BIAS: 0.78,
    MATERIAL_EMISSIVE_INTENSITY: 0.12,
    MATERIAL_METALNESS: 0.85,
    MATERIAL_ROUGHNESS: 0.2,

    // Contact shadows
    CONTACT_SHADOW: {
        OPACITY: 0.28,
        BLUR: 4.8,
        RESOLUTION: 512,
        FAR: 7,
        COLOR: "#2d241d",
    },

    // Background color
    CANVAS_BG_COLOR: "#ffffff",
} as const;

/* ── Responsive Breakpoints (Tailwind) ── */
export const BREAKPOINTS = {
    XS: 0,
    SM: 640,
    MD: 768,
    LG: 1024,
    XL: 1280,
    "2XL": 1536,
} as const;

/* ── Scroll Triggers & Thresholds ── */
export const SCROLL = {
    // IntersectionObserver thresholds
    HERO_THRESHOLD: 0.1,
    HERO_MARGIN: "-100px 0px -100px 0px",

    // Scroll detection sensitivity
    SCROLL_DEBOUNCE: 100,

    // GSAP ScrollTrigger settings
    SCRUB_VALUE: true,
    SCROLL_TRIGGER_START: "top top",
    SCROLL_TRIGGER_END_OFFSET: 120,
    SCROLL_TRIGGER_PARALLAX_END: "bottom top",
    PARALLAX_START: "top bottom",
    PARALLAX_END: "bottom top",
} as const;

/* ── Color References (for JS, use CSS variables in styles) ── */
export const COLORS = {
    // Brand palette
    BRAND_CREAM: "#F1EADA",
    BRAND_SAND: "#CEC1A8",
    BRAND_MOUNTAIN: "#AAA396",
    BRAND_PRIMARY: "#B59E7D",
    BRAND_DARK: "#584738",
    BRAND_DARKER: "#413429",
    BRAND_DARK_HEX: "#231711",

    // UI colors
    WHITE: "#FFFFFF",
    BLACK: "#111111",
    BLACK_RGBA: "rgba(17, 17, 17, 0.12)",
} as const;

/* ── UI Configuration ── */
export const UI = {
    // Button
    BUTTON_HEIGHT: "h-11",
    BUTTON_PADDING: "px-6",
    BUTTON_RADIUS: "rounded-full",

    // Border radius
    RADIUS_2XL: "1rem",
    RADIUS_3XL: "1.5rem",

    // Max widths
    MAX_W_4XL: "56rem",
    MAX_W_5XL: "64rem",
    MAX_W_SM: "24rem",
    MAX_W_MD: "28rem",
    MAX_W_LG: "32rem",
    MAX_W_XL: "36rem",
    MAX_W_2XL: "42rem",

    // Paddings
    PADDING_X_SM: "px-4",
    PADDING_X_MD: "px-6",
    PADDING_X_LG: "px-12",
    PADDING_X_XL: "px-20",

    // Padding Y
    PADDING_TOP_HERO: "pt-32 sm:pt-36 md:pt-16 lg:pt-20",
    PADDING_BOTTOM_HERO: "pb-8 sm:pb-12 md:pb-16 lg:pb-20",
} as const;

/* ── Device Detection ── */
export const DEVICE = {
    GPU_MONITOR_FONT_SIZE: 11,
    MOBILE_MENU_ID: "mobile-site-menu",
} as const;

/* ── Performance Thresholds ── */
export const PERFORMANCE = {
    // FPS monitoring
    GOOD_FPS: 60,
    OK_FPS: 30,

    // GPU memory
    HIGH_MEMORY_MB: 1024,
    MEDIUM_MEMORY_MB: 512,
    LOW_MEMORY_MB: 256,

    // Frame time (ms)
    GOOD_FRAME_TIME: 16.67,
    OK_FRAME_TIME: 33.33,
} as const;

/* ── Video Configuration ── */
export const VIDEO = {
    OPACITY_FULL: "opacity-100",
    OPACITY_TRANSITION_DURATION: "duration-300",
    EASE: "ease-linear",
    ASPECT_RATIO_HERO: "aspect-[4/3]",
    ASPECT_RATIO_HERO_MD: "aspect-video",
} as const;
