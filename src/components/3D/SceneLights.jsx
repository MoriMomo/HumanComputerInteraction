import { Environment } from '@react-three/drei'

/**
 * Scene lighting — warm studio tones, SatSet palette.
 * background={false} on Environment means IBL only (no skybox rendered).
 */
function SceneLights() {
    return (
        <>
            {/* IBL only — no environment background rendered */}
            <Environment preset="studio" background={false} />
            <ambientLight intensity={2.0} color="#F8F2EA" />
            {/* Warm key light from upper-right */}
            <spotLight position={[5, 8, 5]} angle={0.25} penumbra={1} intensity={3} color="#FFF5E0" />
            {/* Soft fill from left */}
            <pointLight position={[-6, 3, -3]} intensity={1.5} color="#C9A882" />
            {/* Subtle rim from below-behind */}
            <pointLight position={[0, -2, -5]} intensity={0.8} color="#B59E7D" />
        </>
    )
}

export default SceneLights
