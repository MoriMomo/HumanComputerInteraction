import { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import gsap from 'gsap'
import { MATERIALS } from '../constants/index.js'
import { usePrefersReducedMotion } from '../hooks/useGsapAnimation.js'

function MaterialButton({ material, isActive, onSelect }) {
    return (
        <button
            type="button"
            onClick={() => onSelect(material)}
            className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left text-sm transition ${isActive
                    ? 'border-electric-cyan bg-white/5 text-white shadow-[0_0_20px_rgba(0,250,255,0.25)]'
                    : 'border-gray-700/60 text-gray-400 hover:border-electric-cyan/50'
                }`}
            aria-pressed={isActive}
        >
            <div>
                <p className="font-semibold">{material.name}</p>
                <p className="text-xs uppercase tracking-[0.3em] text-gray-500">{material.material}</p>
            </div>
            <span className="h-6 w-6 rounded-full" style={{ backgroundColor: material.hex }} />
        </button>
    )
}

MaterialButton.propTypes = {
    material: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        hex: PropTypes.string.isRequired,
        material: PropTypes.string.isRequired,
    }).isRequired,
    isActive: PropTypes.bool.isRequired,
    onSelect: PropTypes.func.isRequired,
}

function ModularCustomizer() {
    const [selectedMaterial, setSelectedMaterial] = useState(MATERIALS[0])
    const previewRef = useRef(null)
    const prefersReducedMotion = usePrefersReducedMotion()

    useEffect(() => {
        if (!previewRef.current || prefersReducedMotion) return

        gsap.to(previewRef.current, {
            backgroundColor: selectedMaterial.hex,
            boxShadow: `0 0 40px ${selectedMaterial.hex}55`,
            rotateY: 6,
            duration: 0.6,
            ease: 'power2.inOut',
        })
    }, [selectedMaterial, prefersReducedMotion])

    useEffect(() => {
        if (!previewRef.current) return
        if (!prefersReducedMotion) return

        previewRef.current.style.backgroundColor = selectedMaterial.hex
        previewRef.current.style.boxShadow = `0 0 30px ${selectedMaterial.hex}33`
    }, [prefersReducedMotion, selectedMaterial])

    return (
        <section id="customizer" className="section-padding bg-charcoal/40">
            <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="flex items-center justify-center">
                    <div
                        ref={previewRef}
                        className="glass flex h-80 w-56 flex-col items-center justify-center rounded-[26px] border border-white/10 text-center"
                        style={{ backgroundColor: selectedMaterial.hex, boxShadow: `0 0 30px ${selectedMaterial.hex}33` }}
                    >
                        <p className="text-xs uppercase tracking-[0.3em] text-white/70">Selected Finish</p>
                        <p className="mt-3 text-2xl font-semibold text-deep-black">ModuSnap</p>
                        <p className="mt-1 text-xs text-deep-black/80">{selectedMaterial.material}</p>
                    </div>
                </div>

                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.4em] text-gray-500">
                        Customizer
                    </p>
                    <h2 className="mt-4 text-3xl font-semibold text-white md:text-4xl">
                        Dial in the material signature that matches your flow.
                    </h2>
                    <p className="mt-4 text-base text-gray-400">
                        Select a chassis material and experience a live color preview with glowing accents.
                    </p>

                    <div className="mt-6 space-y-3">
                        {MATERIALS.map((material) => (
                            <MaterialButton
                                key={material.id}
                                material={material}
                                isActive={material.id === selectedMaterial.id}
                                onSelect={setSelectedMaterial}
                            />
                        ))}
                    </div>

                    <div className="mt-8 grid gap-4 rounded-2xl border border-gray-700/50 bg-black/20 p-6 text-sm text-gray-400">
                        <div className="flex items-center justify-between">
                            <span>Module Slots</span>
                            <span className="text-white">Dual Mount</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span>Latch System</span>
                            <span className="text-white">Precision Rear Clamp</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span>Finish</span>
                            <span className="text-white">Matte Microtexture</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ModularCustomizer
