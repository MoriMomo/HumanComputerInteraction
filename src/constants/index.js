export const COLORS = {
    deepBlack: '#050505',
    electricCyan: '#00FAFF',
    neonMint: '#39FF14',
    charcoal: '#1A1A1A',
    white: '#FFFFFF',
    gray400: '#9CA3AF',
    gray700: '#374151',
}

export const FEATURES = [
    {
        title: 'Rear-Clamped Modularity',
        description:
            'Patent-pending clamping system allows dual-module mounting without obscuring your primary ID card.',
        icon: '🔧',
        color: 'electric-cyan',
    },
    {
        title: 'Fragrance Module',
        description:
            'Sleek glass atomizer for instant freshness. Refillable, leak-proof, and perfectly balanced.',
        icon: '✨',
        color: 'neon-mint',
    },
    {
        title: 'Tech-Storage Module',
        description:
            'Hidden compartment for micro-SD cards, SIM ejector tools, or emergency backup keys.',
        icon: '🔐',
        color: 'electric-cyan',
    },
    {
        title: 'Signal-Friendly Chassis',
        description:
            'Premium 3D-printed polymer ensures RFID/NFC cards remain fully functional.',
        icon: '📡',
        color: 'neon-mint',
    },
]

export const MATERIALS = [
    { id: 'neon-mint', name: 'Neon Mint PLA', hex: '#39FF14', material: 'PLA' },
    { id: 'electric-cyan', name: 'Electric Cyan PETG', hex: '#00FAFF', material: 'PETG' },
    { id: 'matte-black', name: 'Carbon Fiber Black', hex: '#1A1A1A', material: 'CF-Nylon' },
]

export const NAV_LINKS = [
    { label: 'Showcase', href: '#showcase' },
    { label: 'Features', href: '#features' },
    { label: 'Customizer', href: '#customizer' },
    { label: 'Design', href: '#philosophy' },
]

export const SHOWCASE_SPECS = [
    { label: 'Dimensions', value: '89 x 54 x 6mm' },
    { label: 'Weight', value: '18g' },
    { label: 'Material', value: 'Sintered Polymer' },
]

export const PHILOSOPHY_POINTS = [
    {
        title: 'The Modular Ecosystem',
        copy: 'Every module clicks into a unified chassis, giving you a tactical carry setup that scales with your day.',
    },
    {
        title: 'Mechanical Precision',
        copy: 'Engineered with 0.1mm tolerances for a satisfying snap and reliable retention on the move.',
    },
    {
        title: 'Material Integrity',
        copy: 'Advanced polymers balance durability with a featherweight feel, keeping your essentials protected.',
    },
]

export const PHILOSOPHY_CARDS = [
    {
        number: 1,
        title: 'Zero Obstruction',
        copy: 'Front ID remains visible while secondary modules lock behind the card.',
        accent: 'electric-cyan',
    },
    {
        number: 2,
        title: 'Magnet-Free',
        copy: 'RFID performance stays intact with precision rear-clamp mechanics.',
        accent: 'neon-mint',
    },
    {
        number: 3,
        title: 'Rapid Swap',
        copy: 'Modules detach in seconds using a secure micro-latch system.',
        accent: 'electric-cyan',
    },
]
