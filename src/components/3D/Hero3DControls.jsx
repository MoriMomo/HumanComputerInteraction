import PropTypes from 'prop-types'
import { MATERIAL_COLORS } from '../../constants'

// SatSet palette tokens
const C = {
    bg: '#C6C1AB',
    secondary: '#584738',
    primary: '#B59E7D',
    textMain: '#333333',
    textMuted: '#666666',
    border: 'rgba(88,71,56,0.12)',
    cardBg: 'rgba(255,255,255,0.80)',
}

const RENDER_MODES = [
    { id: 'normal', label: 'Normal (PBR)', icon: '▦' },
    { id: 'glass', label: 'Glass', icon: '◎' },
    { id: 'wireframe', label: 'Wireframe', icon: '⊞' },
]

function Hero3DControls({ mode, setMode, materialColor, setMaterialColor }) {
    const panelStyle = {
        background: C.bg,
        border: `1px solid ${C.border}`,
        borderRadius: '12px',
        padding: '18px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
    }

    const sectionHeaderStyle = {
        fontSize: '11px',
        letterSpacing: '0.15em',
        color: C.secondary,
        textTransform: 'uppercase',
        fontWeight: 700,
        marginBottom: '14px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
    }

    return (
        <div className="flex flex-col gap-4 w-full lg:w-60 flex-shrink-0 py-4">

            {/* ── Render Mode Panel ── */}
            <div style={panelStyle}>
                <div style={sectionHeaderStyle}>
                    <span style={{ fontSize: '14px' }}>◈</span> Render Mode
                </div>
                <div className="space-y-2">
                    {RENDER_MODES.map((renderMode) => {
                        const active = mode === renderMode.id
                        return (
                            <button
                                key={renderMode.id}
                                onClick={() => setMode(renderMode.id)}
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    background: active ? 'rgba(255,255,255,1)' : C.cardBg,
                                    border: active ? `1px solid ${C.secondary}` : `1px solid ${C.border}`,
                                    borderRadius: '8px',
                                    padding: '10px 12px',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    textAlign: 'left',
                                }}
                            >
                                <span style={{ fontSize: '16px', color: active ? C.secondary : C.textMuted }}>
                                    {renderMode.icon}
                                </span>
                                <span style={{ flex: 1, fontSize: '13px', fontWeight: 600, color: active ? C.textMain : C.textMuted }}>
                                    {renderMode.label}
                                </span>
                                <span style={{
                                    width: '16px', height: '16px', borderRadius: '50%',
                                    border: active ? `2px solid ${C.secondary}` : `2px solid ${C.primary}60`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                                }}>
                                    {active && <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: C.secondary }} />}
                                </span>
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* ── Divider ── */}
            <div style={{ borderTop: `1px solid ${C.border}`, margin: '0 4px' }} />

            {/* ── Material Color Panel ── */}
            <div style={panelStyle}>
                <div style={sectionHeaderStyle}>
                    <span style={{ fontSize: '14px' }}>◈</span> Material Color
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '12px' }}>
                    {MATERIAL_COLORS.map((colorOption) => {
                        const active = materialColor === colorOption.hex
                        return (
                            <button
                                key={colorOption.id}
                                onClick={() => setMaterialColor(colorOption.hex)}
                                title={colorOption.label}
                                aria-label={`Select ${colorOption.label} material`}
                                style={{
                                    width: '34px', height: '34px', borderRadius: '50%',
                                    background: colorOption.hex,
                                    border: active ? '2px solid white' : '2px solid transparent',
                                    outline: active ? `3px solid ${C.secondary}` : '3px solid transparent',
                                    outlineOffset: '2px',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    boxShadow: active ? `0 0 12px ${colorOption.hex}80` : '0 2px 6px rgba(0,0,0,0.12)',
                                }}
                            />
                        )
                    })}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: materialColor, boxShadow: `0 0 6px ${materialColor}80` }} />
                    <span style={{ fontSize: '11px', color: C.textMuted, fontFamily: 'monospace' }}>
                        {MATERIAL_COLORS.find((c) => c.hex === materialColor)?.label ?? 'Custom'}
                    </span>
                </div>
            </div>

            {/* ── Status Panel ── */}
            <div style={{ ...panelStyle, padding: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#22c55e', display: 'inline-block', animation: 'pulse 2s infinite' }} />
                    <span style={{ fontSize: '11px', color: C.secondary, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700 }}>
                        Input: Active
                    </span>
                </div>
                <p style={{ fontSize: '10px', color: C.textMuted, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Render_Tier: High
                </p>
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
