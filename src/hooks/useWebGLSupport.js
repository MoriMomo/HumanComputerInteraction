import { useState, useEffect } from 'react'

/**
 * Hook to detect WebGL support in the browser
 * @returns {boolean} Whether WebGL is supported
 */
export function useWebGLSupport() {
    const [isSupported, setIsSupported] = useState(true)

    useEffect(() => {
        try {
            const canvas = document.createElement('canvas')
            const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
            setIsSupported(!!gl)
        } catch (e) {
            setIsSupported(false)
        }
    }, [])

    return isSupported
}
