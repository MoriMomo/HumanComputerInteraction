/**
 * Central export for all constants
 */

export * from './colors'

// Model URLs
export const MODEL_URL = '/models/card/tes.gltf'

// Camera positions for different views
export const CAMERA_POSITIONS = {
    default: [0, 0, 5],
    topView: [0, 5, 0],
    closeup: [0, 0, 3],
}

// Animation durations (in seconds)
export const ANIMATION_DURATION = {
    fast: 0.3,
    normal: 0.5,
    slow: 1.0,
}

// Feature data — accentColor keys must match FEATURE_ACCENT_COLORS
export const FEATURES = [
    {
        title: 'Rear-Clamped Modularity',
        description: 'Patent-pending clamping system allows dual-module mounting without obscuring your primary ID card.',
        icon: '🔧',
        accentColor: 'primary',
    },
    {
        title: 'Fragrance Module',
        description: 'Sleek glass atomizer for instant freshness. Refillable, leak-proof, and perfectly balanced.',
        icon: '✨',
        accentColor: 'secondary',
    },
    {
        title: 'Tech-Storage Module',
        description: 'Hidden compartment for micro-SD cards, SIM ejector tools, or emergency backup keys.',
        icon: '🔐',
        accentColor: 'primary',
    },
    {
        title: 'Signal-Friendly Chassis',
        description: 'Premium 3D-printed polymer ensures RFID/NFC cards remain fully functional.',
        icon: '📡',
        accentColor: 'secondary',
    },
]
