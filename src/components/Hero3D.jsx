import { useState } from 'react'
import { useGsap, useWebGLSupport } from '../hooks'
import Hero3DCanvas from './3D/Hero3DCanvas'
import Hero3DControls from './3D/Hero3DControls'

// SatSet palette
const C = {
    bg: '#F6F6F4',         // Vanilla
    bgGrad: '#EAEAEC',     // slightly darker vanilla
    secondary: '#584738',  // Mahogany
    primary: '#B59E7D',    // Tobacco
    sand: '#C6C1AB',       // Sand
    textMain: '#333333',
    textMuted: '#666666',
}

function Hero3D() {
    const [mode, setMode] = useState('normal')
    const [materialColor, setMaterialColor] = useState('#B59E7D')
    const gsap = useGsap()
    const webglSupported = useWebGLSupport()

    if (!webglSupported) {
        return (
            <div className="flex items-center justify-center w-full h-screen" style={{ background: C.bg, color: C.textMain }}>
                <div className="text-center max-w-md px-8">
                    <div className="text-6xl mb-4">🎨</div>
                    <h2 className="text-3xl font-bold mb-4">WebGL Not Supported</h2>
                    <p className="mb-4" style={{ color: C.textMuted }}>Please enable WebGL or use a modern browser.</p>
                    <a href="https://get.webgl.org/" target="_blank" rel="noopener noreferrer"
                        style={{ display: 'inline-block', padding: '12px 24px', background: C.secondary, color: 'white', borderRadius: '4px', fontWeight: 700, textDecoration: 'none' }}>
                        Learn More
                    </a>
                </div>
            </div>
        )
    }

    return (
        <section
            data-lenis-prevent
            style={{
                background: `radial-gradient(circle at center, ${C.bg} 0%, ${C.bgGrad} 100%)`,
                fontFamily: "'Space Grotesk', sans-serif",
            }}
            className="relative w-full min-h-[100dvh] overflow-hidden flex flex-col items-center justify-center lg:h-screen lg:max-h-[900px] lg:min-h-[700px]"
        >
            {/* Top border accent */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, transparent, ${C.primary}, ${C.secondary}, ${C.primary}, transparent)` }} />

            {/* Subtle ambient blobs */}
            <div style={{ position: 'absolute', top: '10%', left: '5%', width: '320px', height: '320px', background: `radial-gradient(circle, ${C.primary}30 0%, transparent 70%)`, borderRadius: '50%', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '10%', right: '5%', width: '260px', height: '260px', background: `radial-gradient(circle, ${C.secondary}25 0%, transparent 70%)`, borderRadius: '50%', pointerEvents: 'none' }} />

            <div className="relative z-10 w-full max-w-screen-xl mx-auto px-6 py-12 lg:py-8 flex flex-col lg:flex-row gap-8 lg:gap-6 items-stretch flex-1">

                {/* ── LEFT PANEL ── */}
                <div className="flex flex-col justify-between w-full lg:w-72 flex-shrink-0 py-4">
                    <div>
                        {/* Series badge */}
                        <div className="flex items-center gap-2 mb-6">
                            <div style={{ width: '32px', height: '2px', background: C.secondary }} />
                            <span style={{ fontSize: '11px', color: C.secondary, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700 }}>
                                Executive Series
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className="font-black leading-tight mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: C.textMain }}>
                            Premium<br />
                            <span style={{ color: C.secondary }}>3D Showcase</span>
                        </h1>

                        {/* Description */}
                        <p style={{ fontSize: '14px', color: C.textMuted, lineHeight: '1.75', marginBottom: '32px' }}>
                            Explore the ModuSnap chassis from every angle. Use your mouse to rotate, zoom, and interact with the modular components. Experience the precision engineering before you buy.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex gap-3 flex-wrap mb-8">
                            <button
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '8px',
                                    background: C.secondary, color: 'white',
                                    fontWeight: 700, fontSize: '13px',
                                    padding: '11px 20px', borderRadius: '4px',
                                    border: 'none', cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    boxShadow: `0 4px 14px ${C.secondary}50`
                                }}
                                onMouseEnter={e => e.currentTarget.style.boxShadow = `0 6px 20px ${C.secondary}80`}
                                onMouseLeave={e => e.currentTarget.style.boxShadow = `0 4px 14px ${C.secondary}50`}
                            >
                                ⊹ Customize
                            </button>
                            <button
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '8px',
                                    background: 'white', color: C.secondary,
                                    fontWeight: 700, fontSize: '13px',
                                    padding: '11px 20px', borderRadius: '4px',
                                    border: `1px solid ${C.secondary}30`, cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                                }}
                                onMouseEnter={e => { e.currentTarget.style.background = `${C.secondary}08`; e.currentTarget.style.borderColor = `${C.secondary}60` }}
                                onMouseLeave={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.borderColor = `${C.secondary}30` }}
                            >
                                🛒 Add to Cart
                            </button>
                        </div>
                    </div>

                    {/* Info Cards */}
                    <div className="space-y-3">
                        {[
                            { icon: '↻', title: 'Orbit Controls', desc: 'Left click & drag to rotate. Scroll to zoom in/out.', highlight: false },
                            { icon: '⚡', title: 'Performance', desc: '60 FPS / High Quality', highlight: true },
                        ].map(card => (
                            <div key={card.title} style={{
                                display: 'flex', alignItems: 'flex-start', gap: '14px',
                                background: 'rgba(255,255,255,0.95)',
                                border: `1px solid ${C.secondary}15`,
                                borderRadius: '10px', padding: '14px',
                                transform: 'translateZ(0)',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                            }}>
                                <span style={{ color: C.secondary, fontSize: '20px', marginTop: '1px' }}>{card.icon}</span>
                                <div>
                                    <p style={{ fontSize: '13px', fontWeight: 700, color: C.textMain, marginBottom: '4px' }}>{card.title}</p>
                                    <p style={{ fontSize: '12px', color: card.highlight ? '#22c55e' : C.textMuted, display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        {card.highlight && <span style={{ display: 'inline-block', width: '7px', height: '7px', borderRadius: '50%', background: '#22c55e', animation: 'pulse 2s infinite' }} />}
                                        {card.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── CENTER CANVAS ── */}
                <div
                    className="w-full lg:w-auto flex-1 relative min-h-[320px] lg:min-h-[400px] flex items-center justify-center"
                    style={{
                        borderRadius: '12px',
                        overflow: 'hidden',
                        border: `1px solid ${C.secondary}15`,
                        boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                        background: '#F0EDE8',
                    }}
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

            <style dangerouslySetInnerHTML={{
                __html: `
                @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;900&display=swap');
                body { margin: 0; font-family: 'Space Grotesk', sans-serif; }
                @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
            ` }} />
        </section>
    )
}

export default Hero3D
