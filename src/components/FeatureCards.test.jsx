import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import FeatureCards from './FeatureCards'
import { FEATURES } from '../constants'

describe('FeatureCards component', () => {
    it('renders the section title', () => {
        render(<FeatureCards />)
        expect(screen.getByText(/Engineered for/i)).toBeInTheDocument()
        expect(screen.getByText(/Urban Professionals/i)).toBeInTheDocument()
    })

    it('renders all feature cards from constants', () => {
        render(<FeatureCards />)
        FEATURES.forEach(feature => {
            expect(screen.getByText(feature.title)).toBeInTheDocument()
            expect(screen.getByText(feature.description)).toBeInTheDocument()
        })
    })

    it('renders the correct number of feature cards', () => {
        const { container } = render(<FeatureCards />)
        // Check if the number of rendered feature elements matches the FEATURES array length.
        const gridItems = container.querySelectorAll('.grid > div')
        expect(gridItems.length).toBe(FEATURES.length)
    })
})
