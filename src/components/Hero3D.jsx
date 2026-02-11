import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { PresentationControls, Environment, PerspectiveCamera, Float } from '@react-three/drei'
import * as THREE from 'three'

// Product Model Component
function ProductModel() {
    const groupRef = useRef()

    // Reduce animation intensity
    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.03
        }
    })

    return (
        <group ref={groupRef} position={[0, 0, 0]}>
            {/* Main Chassis - ID Card Holder */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[2, 3, 0.1]} />
                <meshStandardMaterial
                    color="#0a0a0a"
                    metalness={0.8}
                    roughness={0.2}
                />
            </mesh>

            {/* Glowing Edge/Border */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[2.02, 3.02, 0.08]} />
                <meshBasicMaterial color="#00FAFF" toneMapped={false} />
            </mesh>
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[2, 3, 0.12]} />
                <meshStandardMaterial color="#0a0a0a" metalness={0.9} roughness={0.1} />
            </mesh>

            {/* Fragrance Module (Left) - Optimized Glass */}
            <mesh position={[-1.2, 0, -0.1]} rotation={[0, 0, 0]}>
                <cylinderGeometry args={[0.2, 0.2, 1.8, 16]} />
                <meshPhysicalMaterial
                    color="#00FAFF"
                    metalness={0.1}
                    roughness={0.1}
                    transmission={0.9}
                    thickness={0.5}
                    transparent
                    opacity={0.3}
                />
            </mesh>

            {/* Core Fluid inside Glass */}
            <mesh position={[-1.2, 0, -0.1]}>
                <cylinderGeometry args={[0.15, 0.15, 1.6, 12]} />
                <meshStandardMaterial
                    color="#00FAFF"
                    emissive="#00FAFF"
                    emissiveIntensity={1.5}
                />
            </mesh>

            {/* Tech Storage Module (Right) - Solid compartment */}
            <mesh position={[1.2, 0, -0.1]}>
                <boxGeometry args={[0.6, 1.8, 0.4]} />
                <meshStandardMaterial
                    color="#111"
                    metalness={0.9}
                    roughness={0.2}
                />
            </mesh>

            {/* Cyberpunk LED Strip on Tech Module */}
            <mesh position={[1.2, 0.8, 0.11]}>
                <boxGeometry args={[0.4, 0.05, 0.01]} />
                <meshStandardMaterial
                    color="#39FF14"
                    emissive="#39FF14"
                    emissiveIntensity={2}
                />
            </mesh>

            <mesh position={[1.2, -0.8, 0.11]}>
                <boxGeometry args={[0.4, 0.05, 0.01]} />
                <meshStandardMaterial
                    color="#39FF14"
                    emissive="#39FF14"
                    emissiveIntensity={2}
                />
            </mesh>

            {/* Clamp/Connector indicators */}
            <mesh position={[-1.2, 0, 0.05]}>
                <boxGeometry args={[0.15, 0.4, 0.1]} />
                <meshStandardMaterial color="#333" metalness={1} roughness={0.2} />
            </mesh>
            <mesh position={[1.2, 0, 0.05]}>
                <boxGeometry args={[0.15, 0.4, 0.1]} />
                <meshStandardMaterial color="#333" metalness={1} roughness={0.2} />
            </mesh>
        </group>
    )
}

// Main Hero 3D Component
function Hero3D() {
    return (
        <div className="w-full h-screen relative bg-deep-black z-10 overflow-hidden">
            {/* Overlay text - Pointer events none allows clicking through to 3D */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 text-center pointer-events-none mix-blend-exclusion">
                <h2 className="text-6xl md:text-9xl font-black mb-4 tracking-tighter opacity-20 text-white leading-none">
                    MODULAR
                </h2>
                <h2 className="text-6xl md:text-9xl font-black mb-4 tracking-tighter opacity-20 text-white leading-none">
                    PRECISION
                </h2>
            </div>

            <div className="absolute bottom-20 left-10 z-10 pointer-events-none">
                <h3 className="text-xl text-electric-cyan font-mono tracking-widest mb-2">SYSTEM.ACTIVE</h3>
                <p className="text-xs text-gray-500 max-w-[200px] leading-relaxed">
                    AURA-LINK v2.0 // NEURAL INTERFACE READY <br />
                    SCENT MODULE: <span className="text-white">CONNECTED</span> <br />
                    CREDITS: <span className="text-neon-mint">∞</span>
                </p>
            </div>

            {/* Three.js Canvas */}
            <Canvas
                shadows={false}
                dpr={[1, 1.5]}
                gl={{
                    antialias: true,
                    alpha: false,
                    powerPreference: 'high-performance'
                }}
            >
                <color attach="background" args={['#050505']} />

                {/* Camera */}
                <PerspectiveCamera
                    makeDefault
                    position={[0, 0, 8]}
                    fov={45}
                />

                {/* Lights */}
                <ambientLight intensity={0.4} />
                <spotLight position={[5, 5, 5]} angle={0.3} penumbra={1} intensity={0.8} />

                {/* Product Model with Float and Presentation Controls */}
                <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
                    <PresentationControls
                        global
                        zoom={0.8}
                        rotation={[0, -0.3, 0]}
                        polar={[-Math.PI / 4, Math.PI / 4]}
                        azimuth={[-Math.PI / 4, Math.PI / 4]}
                        config={{ mass: 2, tension: 400 }}
                        snap={{ mass: 4, tension: 400 }}
                    >
                        <ProductModel />
                    </PresentationControls>
                </Float>

                {/* Simplified Environment */}
                <Environment preset="sunset" />
            </Canvas>

            {/* Scroll indicator */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce pointer-events-none">
                <div className="w-5 h-8 border border-white/20 rounded-full flex justify-center pt-2 backdrop-blur-sm">
                    <div className="w-0.5 h-2 bg-electric-cyan rounded-full shadow-[0_0_10px_#00FAFF]"></div>
                </div>
            </div>
        </div>
    )
}

export default Hero3D
