"use client";
import PropTypes from 'prop-types'
import { MATERIAL_COLORS } from '../../constants'

const RENDER_MODES = [
    { id: 'normal', label: 'Normal (PBR)', icon: 'view_in_ar' },
    { id: 'glass', label: 'Glass', icon: 'lens_blur' },
    { id: 'wireframe', label: 'Wireframe', icon: 'grid_3x3' },
]

function Hero3DControls({ mode, setMode, materialColor, setMaterialColor }) {
    return (
        <div className="flex flex-col gap-6 w-full lg:w-72 flex-shrink-0 py-4 relative z-10">

            {/* ── Render Mode Panel ── */}
            <div className="glass p-6 rounded-3xl border border-white/20 shadow-premium">
                <div className="text-[11px] tracking-[0.15em] text-secondary uppercase font-bold mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[14px]">tune</span> Render Mode
                </div>
                <div className="space-y-3">
                    {RENDER_MODES.map((renderMode) => {
                        const active = mode === renderMode.id
                        return (
                            <button
                                key={renderMode.id}
                                onClick={() => setMode(renderMode.id)}
                                className={`w-full flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-all duration-300 text-left border ${active
                                        ? 'bg-white/80 border-primary shadow-sm transform scale-[1.02]'
                                        : 'bg-white/30 border-white/20 hover:bg-white/50 hover:border-white/40'
                                    }`}
                            >
                                <span className={`material-symbols-outlined text-[18px] ${active ? 'text-primary' : 'text-gray-500'}`}>
                                    {renderMode.icon}
                                </span>
                                <span className={`flex-1 text-[13px] font-semibold ${active ? 'text-charcoal' : 'text-gray-500'}`}>
                                    {renderMode.label}
                                </span>

                                {/* Custom radio button UI */}
                                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${active ? 'border-primary' : 'border-gray-300'
                                    }`}>
                                    {active && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                                </div>
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* ── Divider ── */}
            <div className="border-t border-soft-grey/40 mx-2" />

            {/* ── Material Color Panel ── */}
            <div className="glass p-6 rounded-3xl border border-white/20 shadow-premium">
                <div className="text-[11px] tracking-[0.15em] text-secondary uppercase font-bold mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[14px]">palette</span> Material Color
                </div>
                <div className="flex flex-wrap gap-4 mb-4">
                    {MATERIAL_COLORS.map((colorOption) => {
                        const active = materialColor === colorOption.hex
                        return (
                            <button
                                key={colorOption.id}
                                onClick={() => setMaterialColor(colorOption.hex)}
                                title={colorOption.label}
                                aria-label={`Select ${colorOption.label} material`}
                                className={`w-10 h-10 rounded-[14px] cursor-pointer transition-all duration-300 relative overflow-hidden`}
                                style={{
                                    backgroundColor: colorOption.hex,
                                    boxShadow: active ? `0 6px 16px ${colorOption.hex}80` : '0 2px 6px rgba(0,0,0,0.1)',
                                    transform: active ? 'scale(1.1) translateY(-2px)' : 'scale(1)',
                                }}
                            >
                                {/* Subtle inner shadow/border for 3D realism */}
                                <div className={`absolute inset-0 rounded-[14px] border ${active ? 'border-white/60' : 'border-white/20'} mix-blend-overlay`} />
                            </button>
                        )
                    })}
                </div>
                <div className="flex items-center gap-2.5 bg-white/40 py-2 px-3 rounded-xl border border-white/30">
                    <div className="w-3 h-3 rounded-full" style={{ background: materialColor, boxShadow: `0 0 8px ${materialColor}90` }} />
                    <span className="text-xs text-charcoal/80 font-mono tracking-wide">
                        {MATERIAL_COLORS.find((c) => c.hex === materialColor)?.label ?? 'Custom'}
                    </span>
                </div>
            </div>

            {/* ── Status Panel ── */}
            <div className="glass p-5 rounded-2xl border border-white/20 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                    <span className="text-[11px] text-secondary tracking-[0.12em] uppercase font-bold">
                        WebGL Active
                    </span>
                </div>
                <span className="material-symbols-outlined text-secondary text-sm">check_circle</span>
            </div>
        </div>
    )
}

Hero3DControls.propTypes = {
    /** Current active render mode */
    mode: PropTypes.oneOf(['normal', 'glass', 'wireframe']).isRequired,
    /** Setter for render mode */
    setMode: PropTypes.func.isRequired,
    /** Hex string of the currently selected material color */
    materialColor: PropTypes.string.isRequired,
    /** Setter for material color */
    setMaterialColor: PropTypes.func.isRequired,
}

export default Hero3DControls
