import { describe, it, expect, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useWebGLSupport } from './useWebGLSupport'

describe('useWebGLSupport hook', () => {
    it('should return true if WebGL is supported', async () => {
        const mockGetContext = vi.fn().mockReturnValue({})
        const spyContext = vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockImplementation(mockGetContext)

        const { result } = renderHook(() => useWebGLSupport())

        expect(result.current).toBe(true)
        spyContext.mockRestore()
    })

    it('should return false if WebGL is not supported', async () => {
        const mockGetContext = vi.fn().mockReturnValue(null)
        const spyContext = vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockImplementation(mockGetContext)

        const { result } = renderHook(() => useWebGLSupport())

        // Let the useEffect run and state to update
        await new Promise(r => setTimeout(r, 0))
        expect(result.current).toBe(false)
        spyContext.mockRestore()
    })

    it('should return false if creating canvas throws an error', async () => {
        const originalCreateElement = document.createElement.bind(document)
        const spyCreate = vi.spyOn(document, 'createElement').mockImplementation((tagName) => {
            if (tagName === 'canvas') {
                throw new Error('Canvas not supported')
            }
            return originalCreateElement(tagName)
        })

        const { result } = renderHook(() => useWebGLSupport())

        await new Promise(r => setTimeout(r, 0))
        expect(result.current).toBe(false)
        spyCreate.mockRestore()
    })
})
