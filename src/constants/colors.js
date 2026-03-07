/**
 * Color palette and material definitions
 * Centralized color constants for consistency across the app
 * SatSet palette: Tobacco / Mahogany / Sand / Vanilla
 */

// ── 3D Showcase material swatches ──────────────────────────────────────────
export const MATERIAL_COLORS = [
    { id: 'mahogany', label: 'Mahogany', hex: '#584738' },
    { id: 'tobacco', label: 'Tobacco', hex: '#B59E7D' },
    { id: 'charcoal', label: 'Charcoal', hex: '#333333' },
    { id: 'vanilla', label: 'Vanilla', hex: '#F0EDE6' },
    { id: 'sand', label: 'Sand', hex: '#C6C1AB' },
    { id: 'walnut', label: 'Dark Walnut', hex: '#3B2F23' },
    { id: 'linen', label: 'Linen', hex: '#E8DFD0' },
    { id: 'bronze', label: 'Bronze', hex: '#8B6A3E' },
]

// ── Brand palette tokens ────────────────────────────────────────────────────
export const THEME_COLORS = {
    vanilla: '#F6F6F4',
    sand: '#C6C1AB',
    tobacco: '#B59E7D',
    mahogany: '#584738',
    charcoal: '#333333',
    textMuted: '#666666',
}

// ── ModularCustomizer materials ─────────────────────────────────────────────
export const CUSTOMIZER_MATERIALS = [
    { id: 'mahogany', name: 'Mahogany PLA', hex: '#584738', material: 'PLA' },
    { id: 'tobacco', name: 'Tobacco PETG', hex: '#B59E7D', material: 'PETG' },
    { id: 'charcoal', name: 'Carbon Black PA', hex: '#333333', material: 'CF-Nylon' },
]

// ── Feature card accent colors (SatSet palette) ────────────────────────────
export const FEATURE_ACCENT_COLORS = {
    primary: {
        gradient: 'from-[#B59E7D]/10',
        glow: 'from-[#B59E7D]/20',
        border: 'border-[#B59E7D]/50',
    },
    secondary: {
        gradient: 'from-[#584738]/10',
        glow: 'from-[#584738]/20',
        border: 'border-[#584738]/50',
    },
}
