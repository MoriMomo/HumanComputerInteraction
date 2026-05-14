/**
 * Material swatches and render mode configurations
 * Centralized swatch data for the material selector
 */

export interface Swatch {
    id: string;
    label: string;
    hex: string;
    description: string;
}

export interface RenderMode {
    id: "normal" | "glass" | "wireframe";
    label: string;
    icon: string;
}

/**
 * Available color swatches for the card holder
 * Uses CSS variables for consistency with globals.css
 */
export const SWATCHES: Swatch[] = [
    {
        id: "graphite",
        label: "Graphite",
        hex: "#B59E7D",
        description: "Muted graphite anodized finish",
    },
    {
        id: "onyx",
        label: "Onyx",
        hex: "#584738",
        description: "Low-glare black finish",
    },
    {
        id: "steel",
        label: "Steel",
        hex: "#AAA396",
        description: "Cool brushed alloy tone",
    },
    {
        id: "stone",
        label: "Stone",
        hex: "#CEC1A8",
        description: "Soft archival stone tone",
    },
    {
        id: "walnut",
        label: "Walnut",
        hex: "#413429",
        description: "Dark walnut tone",
    },
    {
        id: "champagne",
        label: "Champagne",
        hex: "#F1EADA",
        description: "Muted metallic champagne",
    },
];

/**
 * Render mode options for 3D viewer
 */
export const RENDER_MODES: RenderMode[] = [
    { id: "normal", label: "Normal", icon: "grid_view" },
    { id: "glass", label: "Glass", icon: "blur_on" },
    { id: "wireframe", label: "Wireframe", icon: "view_in_ar" },
];

/**
 * Maps CSS variable references to Tailwind background classes
 * Used when applying the active swatch color to background elements
 */
export const SWATCH_BG_CLASS: Record<string, string> = {
    "var(--color-swatch-bronze)": "bg-swatch-bronze",
    "var(--color-swatch-midnight)": "bg-swatch-midnight",
    "var(--color-swatch-steel)": "bg-swatch-steel",
    "var(--color-brand-sand)": "bg-swatch-stone",
    "var(--color-brand-darker)": "bg-swatch-walnut",
    "var(--color-brand-cream)": "bg-swatch-champagne",
};

/**
 * Get the Tailwind class for a swatch hex value
 * Falls back to primary color if mapping not found
 */
export const getSwatchBgClass = (hex: string): string => {
    return SWATCH_BG_CLASS[hex] || "bg-brand-primary";
};

/**
 * Get swatch by ID
 */
export const getSwatchById = (id: string): Swatch | undefined => {
    return SWATCHES.find((s) => s.id === id);
};

/**
 * Get swatch by hex value
 */
export const getSwatchByHex = (hex: string): Swatch | undefined => {
    return SWATCHES.find((s) => s.hex === hex);
};
