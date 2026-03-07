import { Html, useProgress } from '@react-three/drei'

/**
 * 3D Loading indicator component
 * Displays loading progress for 3D models
 */
function Loader3D() {
    const { progress } = useProgress()
    const isComplete = progress >= 100

    return (
        <Html center>
            <div style={{ color: '#584738', textAlign: 'center', fontFamily: 'monospace' }}>
                <div style={{ fontSize: '22px', fontWeight: 900, marginBottom: '8px' }}>
                    {isComplete ? 'Ready' : 'Loading'}
                </div>

                {/* Progress bar */}
                <div style={{ width: '160px', height: '2px', background: 'rgba(88,71,56,0.15)', borderRadius: '99px', overflow: 'hidden' }}>
                    <div
                        style={{
                            height: '100%',
                            width: `${progress}%`,
                            background: '#584738',
                            transition: 'width 0.3s ease',
                        }}
                    />
                </div>

                {/* Percentage */}
                <div style={{ marginTop: '8px', fontSize: '11px', color: '#B59E7D', letterSpacing: '0.3em', textTransform: 'uppercase' }}>
                    {Math.round(progress)}%
                </div>
            </div>
        </Html>
    )
}

export default Loader3D
