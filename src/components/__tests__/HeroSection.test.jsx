import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import HeroSection from '../HeroSection'

describe('HeroSection Component', () => {
    it('renders the main hero text', () => {
        render(<HeroSection />)
        expect(screen.getByText(/Elevate Your/i)).toBeInTheDocument()
    })

    it('renders the call to action buttons', () => {
        render(<HeroSection />)
        expect(screen.getByRole('button', { name: /Pre-order Now/i })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /View Collection/i })).toBeInTheDocument()
    })

    it('renders the showcase image', () => {
        render(<HeroSection />)
        const image = screen.getByAltText(/Premium ModuSnap Card Holder/i)
        expect(image).toBeInTheDocument()
        expect(image).toHaveAttribute('src')
    })

    it('renders feature specs', () => {
        render(<HeroSection />)
        expect(screen.getByText(/RFID Protection/i)).toBeInTheDocument()
        expect(screen.getByText(/Ultralight 18g/i)).toBeInTheDocument()
        expect(screen.getByText(/Modular System/i)).toBeInTheDocument()
        expect(screen.getByText(/Premium Finish/i)).toBeInTheDocument()
    })
})
