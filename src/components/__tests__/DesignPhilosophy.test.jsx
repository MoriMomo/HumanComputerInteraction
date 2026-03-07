import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import DesignPhilosophy from '../DesignPhilosophy'

describe('DesignPhilosophy Component', () => {
    it('renders the philosophy header', () => {
        render(<DesignPhilosophy />)
        expect(screen.getByRole('heading', { name: /Design Philosophy/i })).toBeInTheDocument()
    })

    it('renders the tactical modularity section', () => {
        render(<DesignPhilosophy />)
        expect(screen.getByText(/Tactical Modularity/i)).toBeInTheDocument()
    })

    it('renders the call to action button', () => {
        render(<DesignPhilosophy />)
        const button = screen.getByRole('button', { name: /Reserve Your ModuSnap/i })
        expect(button).toBeInTheDocument()
    })
})
