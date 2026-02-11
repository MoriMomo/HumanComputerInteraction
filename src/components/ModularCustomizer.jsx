import { useState } from 'react'

function ModularCustomizer() {
    const [selectedColor, setSelectedColor] = useState('neon-mint')

    const colors = [
        { id: 'neon-mint', name: 'Neon Mint PLA', hex: '#39FF14', material: 'PLA' },
        { id: 'electric-cyan', name: 'Electric Cyan PETG', hex: '#00FAFF', material: 'PETG' },
        { id: 'matte-black', name: 'Carbon Fiber Black', hex: '#1A1A1A', material: 'CF-Nylon' }
    ]

    return (
        <section className="max-w-7xl mx-auto px-6 py-20">
            {/* Header */}
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                    Design Your{' '}
                    <span className="bg-gradient-to-r from-electric-cyan to-neon-mint bg-clip-text text-transparent">
                        ModuSnap
                    </span>
                </h2>
                <p className="text-gray-400">
                    Choose your material and see it transform in real-time
                </p>
            </div>

            {/* Customizer Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Preview Side */}
                <div className="relative">
                    <div className="glass-dark rounded-2xl p-12 aspect-square flex items-center justify-center">
                        {/* Simple visual representation */}
                        <div className="relative">
                            {/* Main chassis */}
                            <div
                                className="w-48 h-64 rounded-lg flex items-center justify-center transition-all duration-500"
                                style={{
                                    backgroundColor: colors.find(c => c.id === selectedColor)?.hex,
                                    boxShadow: `0 0 40px ${colors.find(c => c.id === selectedColor)?.hex}40`
                                }}
                            >
                                <span className="text-white font-bold text-2xl opacity-50">MODUSNAP</span>
                            </div>

                            {/* Module indicators */}
                            <div className="absolute -left-8 top-1/2 -translate-y-1/2 w-6 h-24 bg-gradient-to-r from-electric-cyan to-transparent rounded-l-lg"></div>
                            <div className="absolute -right-8 top-1/2 -translate-y-1/2 w-6 h-24 bg-gradient-to-l from-neon-mint to-transparent rounded-r-lg"></div>
                        </div>
                    </div>
                </div>

                {/* Material Selection Side */}
                <div>
                    <h3 className="text-2xl font-bold text-white mb-6">Material Selection</h3>

                    <div className="space-y-4">
                        {colors.map((color) => (
                            <button
                                key={color.id}
                                onClick={() => setSelectedColor(color.id)}
                                className={`w-full glass p-6 rounded-xl text-left transition-all duration-300 ${selectedColor === color.id
                                        ? 'border-2 border-electric-cyan glow-cyan'
                                        : 'border border-gray-700 hover:border-gray-600'
                                    }`}
                            >
                                <div className="flex items-center gap-4">
                                    {/* Color swatch */}
                                    <div
                                        className="w-16 h-16 rounded-lg"
                                        style={{
                                            backgroundColor: color.hex,
                                            boxShadow: selectedColor === color.id ? `0 0 20px ${color.hex}60` : 'none'
                                        }}
                                    ></div>

                                    {/* Material info */}
                                    <div className="flex-1">
                                        <h4 className="text-white font-bold mb-1">{color.name}</h4>
                                        <p className="text-gray-400 text-sm">Material: {color.material}</p>
                                    </div>

                                    {/* Selected indicator */}
                                    {selectedColor === color.id && (
                                        <div className="w-6 h-6 bg-electric-cyan rounded-full flex items-center justify-center">
                                            <svg className="w-4 h-4 text-deep-black" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Technical specs */}
                    <div className="mt-8 glass-dark p-6 rounded-xl">
                        <h4 className="text-white font-bold mb-4">Technical Specifications</h4>
                        <div className="space-y-2 text-sm text-gray-400">
                            <div className="flex justify-between">
                                <span>Dimensions:</span>
                                <span className="text-white">85.6mm × 53.98mm × 6mm</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Weight:</span>
                                <span className="text-white">18g (chassis only)</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Layer Height:</span>
                                <span className="text-white">0.12mm</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Infill:</span>
                                <span className="text-white">20% Gyroid</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ModularCustomizer
