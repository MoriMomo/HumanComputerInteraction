import { useState } from 'react'
import { CUSTOMIZER_MATERIALS } from '../constants'

/**
 * Interactive customizer component
 * Allows users to select materials and see real-time preview
 */
function ModularCustomizer() {
    const [selectedColor, setSelectedColor] = useState(CUSTOMIZER_MATERIALS[0].id)
    const selected = CUSTOMIZER_MATERIALS.find(c => c.id === selectedColor)

    return (
        <section className="max-w-7xl mx-auto px-6 py-20">
            {/* Header */}
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-charcoal">
                    Design Your{' '}
                    <span className="text-secondary">ModuSnap</span>
                </h2>
                <p className="text-gray-500">
                    Choose your material and see it transform in real-time
                </p>
            </div>

            {/* Customizer Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Preview Side */}
                <div className="relative">
                    <div className="bg-[#EAEAEC] rounded-2xl p-12 aspect-square flex items-center justify-center border border-[#584738]/10">
                        <div className="relative">
                            {/* Main chassis preview */}
                            <div
                                className="w-48 h-64 rounded-lg flex items-center justify-center transition-all duration-500 transform-gpu will-change-transform"
                                style={{
                                    backgroundColor: selected?.hex,
                                    boxShadow: `0 4px 20px ${selected?.hex}40`,
                                }}
                            >
                                <span className="text-white font-bold text-2xl opacity-50" aria-label="ModuSnap preview">
                                    MODUSNAP
                                </span>
                            </div>

                            {/* Module indicators */}
                            <div className="absolute -left-8 top-1/2 -translate-y-1/2 w-6 h-24 rounded-l-lg transform-gpu will-change-transform" style={{ background: `linear-gradient(to right, ${selected?.hex}30, transparent)` }} />
                            <div className="absolute -right-8 top-1/2 -translate-y-1/2 w-6 h-24 rounded-r-lg transform-gpu will-change-transform" style={{ background: `linear-gradient(to left, ${selected?.hex}30, transparent)` }} />
                        </div>
                    </div>
                </div>

                {/* Material Selection Side */}
                <div>
                    <h3 className="text-2xl font-bold text-charcoal mb-6">Material Selection</h3>

                    <div className="space-y-4">
                        {CUSTOMIZER_MATERIALS.map((color) => {
                            const active = selectedColor === color.id
                            return (
                                <button
                                    key={color.id}
                                    onClick={() => setSelectedColor(color.id)}
                                    aria-pressed={active}
                                    className="w-full bg-white p-5 rounded-xl text-left transition-all duration-300 shadow-sm focus:outline-none focus:ring-4 focus:ring-primary/50"
                                    style={{
                                        border: active ? `2px solid #584738` : '1px solid rgba(88,71,56,0.15)',
                                        boxShadow: active ? '0 4px 16px rgba(88,71,56,0.15)' : '0 1px 4px rgba(0,0,0,0.05)',
                                    }}
                                >
                                    <div className="flex items-center gap-4">
                                        {/* Color swatch */}
                                        <div
                                            className="w-14 h-14 rounded-lg flex-shrink-0"
                                            style={{
                                                backgroundColor: color.hex,
                                                boxShadow: active ? `0 0 16px ${color.hex}60` : 'none',
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
                                                className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                                                style={{ background: '#584738' }}
                                            >
                                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
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
                    <div className="mt-8 bg-[#F6F6F4] p-6 rounded-xl border border-[#584738]/10">
                        <h4 className="text-charcoal font-bold mb-4">Technical Specifications</h4>
                        <div className="space-y-2 text-sm text-gray-500">
                            <div className="flex justify-between">
                                <span>Dimensions:</span>
                                <span className="text-charcoal font-medium">85.6mm × 53.98mm × 6mm</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Weight:</span>
                                <span className="text-charcoal font-medium">18g (chassis only)</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Layer Height:</span>
                                <span className="text-charcoal font-medium">0.12mm</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Infill:</span>
                                <span className="text-charcoal font-medium">20% Gyroid</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ModularCustomizer
