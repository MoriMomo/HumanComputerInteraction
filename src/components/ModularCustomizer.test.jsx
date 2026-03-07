import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import ModularCustomizer from '../components/ModularCustomizer'
import { CUSTOMIZER_MATERIALS } from '../constants'

// Mock react-icons to avoid ESM issues in test environment
vi.mock('react-icons/fa', () => ({
    FaTwitter: () => null,
    FaInstagram: () => null,
    FaGithub: () => null,
    FaDiscord: () => null,
}))

describe('ModularCustomizer', () => {
    it('renders the section heading', () => {
        render(<ModularCustomizer />)
        expect(screen.getByText('Material Selection')).toBeInTheDocument()
    })

    it('renders a button for each CUSTOMIZER_MATERIAL', () => {
        render(<ModularCustomizer />)
        CUSTOMIZER_MATERIALS.forEach((mat) => {
            expect(screen.getByText(mat.name)).toBeInTheDocument()
        })
    })

    it('shows technical specifications', () => {
        render(<ModularCustomizer />)
        expect(screen.getByText('Technical Specifications')).toBeInTheDocument()
        expect(screen.getByText('85.6mm × 53.98mm × 6mm')).toBeInTheDocument()
        expect(screen.getByText('18g (chassis only)')).toBeInTheDocument()
        expect(screen.getByText('0.12mm')).toBeInTheDocument()
        expect(screen.getByText('20% Gyroid')).toBeInTheDocument()
    })

    it('renders material type for each swatch', () => {
        render(<ModularCustomizer />)
        CUSTOMIZER_MATERIALS.forEach((mat) => {
            expect(screen.getByText(`Material: ${mat.material}`)).toBeInTheDocument()
        })
    })

    it('changes selected material on button click without crashing', () => {
        render(<ModularCustomizer />)
        if (CUSTOMIZER_MATERIALS.length > 1) {
            const secondBtn = screen.getByText(CUSTOMIZER_MATERIALS[1].name).closest('button')
            fireEvent.click(secondBtn)
            // All materials still rendered after state change
            CUSTOMIZER_MATERIALS.forEach((mat) => {
                expect(screen.getByText(mat.name)).toBeInTheDocument()
            })
        }
    })
})
