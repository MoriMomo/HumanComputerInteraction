import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useGsap } from './useGsap'
import gsap from 'gsap'

describe('useGsap hook', () => {
    it('should return the gsap instance', () => {
        const { result } = renderHook(() => useGsap())
        expect(result.current).toBe(gsap)
        expect(typeof result.current.to).toBe('function')
        expect(typeof result.current.from).toBe('function')
    })
})
