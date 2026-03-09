"use client";
import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap';
import { CUSTOMIZER_MATERIALS } from '../constants'

/**
 * Interactive customizer component
 * Allows users to select materials and see real-time preview
 */
function ModularCustomizer() {
    const [selectedColor, setSelectedColor] = useState(CUSTOMIZER_MATERIALS[0].id)
    const selected = CUSTOMIZER_MATERIALS.find(c => c.id === selectedColor)
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.customizer-header', {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 80%',
                },
                opacity: 0,
                y: 30,
                duration: 1,
                ease: 'power3.out',
            });

            gsap.from('.customizer-content > *', {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 70%',
                },
                opacity: 0,
                y: 40,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power3.out',
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="max-w-7xl mx-auto px-6 py-20 relative">
            {/* Background Element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-charcoal/5 rounded-full blur-[150px] pointer-events-none"></div>

            {/* Header */}
            <div className="text-center mb-16 customizer-header relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-charcoal font-serif">
                    Design Your{' '}
                    <span className="text-primary italic">ModuSnap</span>
                </h2>
                <p className="text-gray-500 font-light">
                    Choose your material and see it transform in real-time
                </p>
            </div>

            {/* Customizer Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center customizer-content relative z-10">
                {/* Preview Side */}
                <div className="relative h-full">
                    <div className="glass rounded-3xl p-12 aspect-square flex items-center justify-center shadow-premium-lg border border-white/40 h-full relative overflow-hidden">
                        {/* Ambient glow inside preview */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/50 to-transparent pointer-events-none"></div>

                        <div className="relative z-10">
                            {/* Main chassis preview */}
                            <div
                                className="w-48 h-64 rounded-xl flex items-center justify-center transition-all duration-700 transform-gpu will-change-transform shadow-2xl border border-white/20"
                                style={{
                                    backgroundColor: selected?.hex,
                                    boxShadow: `0 20px 40px ${selected?.hex}60, inset 0 2px 4px rgba(255,255,255,0.4)`,
                                }}
                            >
                                <span className="text-white font-bold tracking-widest text-xl opacity-60" aria-label="ModuSnap preview">
                                    MODUSNAP
                                </span>
                            </div>

                            {/* Module indicators */}
                            <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-6 h-28 rounded-l-lg transform-gpu will-change-transform opacity-90 backdrop-blur-sm" style={{ background: `linear-gradient(to right, ${selected?.hex}90, ${selected?.hex}20)`, border: `1px solid ${selected?.hex}40`, borderRight: 'none' }} />
                            <div className="absolute -right-6 top-1/2 -translate-y-1/2 w-6 h-28 rounded-r-lg transform-gpu will-change-transform opacity-90 backdrop-blur-sm" style={{ background: `linear-gradient(to left, ${selected?.hex}90, ${selected?.hex}20)`, border: `1px solid ${selected?.hex}40`, borderLeft: 'none' }} />
                        </div>
                    </div>
                </div>

                {/* Material Selection Side */}
                <div className="flex flex-col justify-center h-full">
                    <div className="space-y-4">
                        {CUSTOMIZER_MATERIALS.map((color) => {
                            const active = selectedColor === color.id
                            return (
                                <button
                                    key={color.id}
                                    onClick={() => setSelectedColor(color.id)}
                                    aria-pressed={active}
                                    className={`w-full p-5 rounded-2xl text-left transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 relative overflow-hidden group ${active ? 'glass border-primary/50 shadow-md transform scale-[1.02]' : 'bg-white/50 border border-white/20 hover:bg-white/80 shadow-sm'}`}
                                >
                                    {/* Active background subtle glow */}
                                    {active && <div className="absolute inset-0 bg-primary/5 pointer-events-none"></div>}

                                    <div className="flex items-center gap-5 relative z-10">
                                        {/* Color swatch */}
                                        <div
                                            className="w-14 h-14 rounded-xl flex-shrink-0 border border-white/50 transition-all duration-500"
                                            style={{
                                                backgroundColor: color.hex,
                                                boxShadow: active ? `0 8px 16px ${color.hex}50` : '0 2px 8px rgba(0,0,0,0.1)',
                                                transform: active ? 'scale(1.05)' : 'scale(1)'
                                            }}
                                        />

                                        {/* Material info */}
                                        <div className="flex-1">
                                            <h4 className="text-charcoal font-bold mb-1">{color.name}</h4>
                                            <p className="text-gray-500 text-sm">Material: {color.material}</p>
                                        </div>

                                        {/* Selected indicator */}
                                        {active && (
                                            <div
                                                className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 bg-primary/20 text-primary border border-primary/30"
                                            >
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                </button>
                            )
                        })}
                    </div>

                    {/* Technical specs */}
                    <div className="mt-8 glass p-6 rounded-2xl border border-white/20 shadow-premium">
                        <h4 className="text-charcoal font-bold mb-4 font-serif text-lg tracking-wide">Technical Specifications</h4>
                        <div className="space-y-3 text-sm text-charcoal/70">
                            <div className="flex justify-between items-center border-b border-soft-grey/30 pb-2">
                                <span className="font-light">Dimensions:</span>
                                <span className="font-medium">85.6mm × 53.98mm × 6mm</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-soft-grey/30 pb-2">
                                <span className="font-light">Weight:</span>
                                <span className="font-medium">18g (chassis)</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-soft-grey/30 pb-2">
                                <span className="font-light">Layer Height:</span>
                                <span className="font-medium">0.12mm</span>
                            </div>
                            <div className="flex justify-between items-center pb-1">
                                <span className="font-light">Infill:</span>
                                <span className="font-medium">20% Gyroid</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ModularCustomizer
