import { describe, it, expect } from 'vitest'
import { MATERIAL_COLORS, CUSTOMIZER_MATERIALS, THEME_COLORS, FEATURES } from '../constants'

describe('MATERIAL_COLORS', () => {
    it('is a non-empty array', () => {
        expect(Array.isArray(MATERIAL_COLORS)).toBe(true)
        expect(MATERIAL_COLORS.length).toBeGreaterThan(0)
    })

    it('every entry has id, label, and hex fields', () => {
        MATERIAL_COLORS.forEach((color) => {
            expect(color).toHaveProperty('id')
            expect(color).toHaveProperty('label')
            expect(color).toHaveProperty('hex')
        })
    })

    it('all hex values are valid CSS color strings starting with #', () => {
        MATERIAL_COLORS.forEach((color) => {
            expect(color.hex).toMatch(/^#[0-9A-Fa-f]{3,6}$/)
        })
    })

    it('all ids are unique', () => {
        const ids = MATERIAL_COLORS.map((c) => c.id)
        expect(new Set(ids).size).toBe(ids.length)
    })
})

describe('CUSTOMIZER_MATERIALS', () => {
    it('is a non-empty array', () => {
        expect(Array.isArray(CUSTOMIZER_MATERIALS)).toBe(true)
        expect(CUSTOMIZER_MATERIALS.length).toBeGreaterThan(0)
    })

    it('every entry has id, name, hex, and material fields', () => {
        CUSTOMIZER_MATERIALS.forEach((mat) => {
            expect(mat).toHaveProperty('id')
            expect(mat).toHaveProperty('name')
            expect(mat).toHaveProperty('hex')
            expect(mat).toHaveProperty('material')
        })
    })
})

describe('THEME_COLORS', () => {
    it('contains the core SatSet palette tokens', () => {
        expect(THEME_COLORS).toHaveProperty('vanilla')
        expect(THEME_COLORS).toHaveProperty('sand')
        expect(THEME_COLORS).toHaveProperty('tobacco')
        expect(THEME_COLORS).toHaveProperty('mahogany')
        expect(THEME_COLORS).toHaveProperty('charcoal')
    })

    it('mahogany is the correct brand hex', () => {
        expect(THEME_COLORS.mahogany).toBe('#584738')
    })
})

describe('FEATURES', () => {
    it('has exactly 4 features', () => {
        expect(FEATURES).toHaveLength(4)
    })

    it('every feature has title, description, icon, and accentColor', () => {
        FEATURES.forEach((feature) => {
            expect(feature).toHaveProperty('title')
            expect(feature).toHaveProperty('description')
            expect(feature).toHaveProperty('icon')
            expect(feature).toHaveProperty('accentColor')
        })
    })

    it('every accentColor is a valid FEATURE_ACCENT_COLORS key', () => {
        const validKeys = ['primary', 'secondary']
        FEATURES.forEach((feature) => {
            expect(validKeys).toContain(feature.accentColor)
        })
    })
})
