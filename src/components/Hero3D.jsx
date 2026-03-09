"use client";
import { useState } from 'react'
import { useGsap, useWebGLSupport } from '../hooks'
import Hero3DCanvas from './3D/Hero3DCanvas'
import Hero3DControls from './3D/Hero3DControls'

function Hero3D() {
    const [mode, setMode] = useState('normal')
    const [materialColor, setMaterialColor] = useState('#B59E7D')
    const gsap = useGsap()
    const webglSupported = useWebGLSupport()

    if (!webglSupported) {
        return (
            <div className="flex items-center justify-center w-full h-screen bg-background-light text-charcoal">
                <div className="text-center max-w-md px-8 glass p-10 rounded-3xl shadow-premium-lg border border-white/20">
                    <div className="text-6xl mb-6">🎨</div>
                    <h2 className="text-3xl font-bold mb-4 font-serif">WebGL Not Supported</h2>
                    <p className="mb-6 font-light text-gray-500">Please enable WebGL or use a modern browser to interact with the 3D showcase.</p>
                    <a href="https://get.webgl.org/" target="_blank" rel="noopener noreferrer"
                        className="inline-block px-8 py-3 bg-secondary text-white rounded-full font-medium transition-all hover:bg-primary hover:shadow-lg hover:-translate-y-0.5">
                        Learn More
                    </a>
                </div>
            </div>
        )
    }

    return (
        <section
            data-lenis-prevent
            className="relative w-full min-h-[100dvh] overflow-hidden flex flex-col items-center justify-center lg:h-screen lg:max-h-[900px] lg:min-h-[700px] bg-background-light"
        >
            {/* Subtle ambient blobs */}
            <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[150px] pointer-events-none"></div>
            <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: 'radial-gradient(var(--color-charcoal) 1px, transparent 1px)', backgroundSize: '40px 40px', maskImage: 'linear-gradient(to bottom, transparent, black, transparent)' }}></div>

            <div className="relative z-10 w-full max-w-screen-xl mx-auto px-6 py-12 lg:py-8 flex flex-col lg:flex-row gap-8 lg:gap-6 items-stretch flex-1">

                {/* ── LEFT PANEL ── */}
                <div className="flex flex-col justify-between w-full lg:w-80 flex-shrink-0 py-4 relative z-10">
                    <div>
                        {/* Series badge */}
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-[2px] w-10 bg-primary/60"></div>
                            <span className="text-[11px] text-charcoal/60 tracking-[0.2em] uppercase font-bold">
                                Executive Series
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className="font-serif text-charcoal text-[clamp(2.5rem,4vw,3.5rem)] font-bold leading-[1.1] mb-6">
                            Premium<br />
                            <span className="text-primary italic">3D Showcase</span>
                        </h1>

                        {/* Description */}
                        <p className="text-sm text-gray-500 leading-relaxed mb-8 font-light">
                            Explore the ModuSnap chassis from every angle. Use your mouse to rotate, zoom, and interact with the modular components. Experience the precision engineering before you buy.
                        </p>

                        {/* CTA Buttons */}
                        {/* CTA Buttons */}
                        <div className="flex gap-4 flex-wrap mb-10">
                            <button className="flex items-center gap-2 px-6 py-3 bg-secondary text-white text-sm font-medium rounded-full shadow-md hover:bg-primary transition-colors focus:ring-4 focus:ring-primary/50">
                                <span className="material-symbols-outlined text-[18px]">tune</span>
                                Customize
                            </button>
                            <button className="flex items-center gap-2 px-6 py-3 glass border-white/40 text-charcoal text-sm font-medium rounded-full hover:border-primary/40 hover:bg-white transition-colors focus:ring-4 focus:ring-primary/50 shadow-sm">
                                <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
                                Add to Cart
                            </button>
                        </div>
                    </div>

                    {/* Info Cards */}
                    <div className="space-y-4">
                        {[
                            { icon: '360', title: 'Orbit Controls', desc: 'Left click & drag to rotate. Scroll to zoom in/out.', highlight: false },
                            { icon: 'speed', title: 'Performance', desc: '60 FPS / High Quality', highlight: true },
                        ].map(card => (
                            <div key={card.title} className="flex items-start gap-4 glass p-4 rounded-2xl border border-white/20 shadow-sm group">
                                <span className="material-symbols-outlined text-secondary pt-0.5 group-hover:text-primary transition-colors">{card.icon}</span>
                                <div>
                                    <p className="text-[13px] font-bold text-charcoal mb-1">{card.title}</p>
                                    <p className="text-[12px] flex items-center gap-1.5 font-light text-gray-500">
                                        {card.highlight && <span className="w-[6px] h-[6px] rounded-full bg-green-500 animate-pulse" />}
                                        {card.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── CENTER CANVAS ── */}
                <div
                    className="w-full lg:w-auto flex-1 relative min-h-[350px] lg:min-h-[500px] flex items-center justify-center rounded-3xl overflow-hidden border border-white/30 shadow-premium-lg bg-black/5 backdrop-blur-3xl"
                >
                    <Hero3DCanvas mode={mode} gsap={gsap} materialColor={materialColor} />
                </div>

                {/* ── RIGHT PANEL ── */}
                <Hero3DControls
                    mode={mode}
                    setMode={setMode}
                    materialColor={materialColor}
                    setMaterialColor={setMaterialColor}
                />
            </div>
        </section>
    )
}

export default Hero3D
