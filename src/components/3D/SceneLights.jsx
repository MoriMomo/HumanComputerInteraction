"use client";
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
            {/* Soft fill from left (Primary color) */}
            <pointLight position={[-6, 3, -3]} intensity={1.6} color="#B48A63" />
            {/* Subtle rim from below-behind (Secondary color) */}
            <pointLight position={[0, -2, -5]} intensity={1.2} color="#573111" />
        </>
    )
}

export default SceneLights
