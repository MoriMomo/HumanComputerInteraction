import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'

// Product Model Component
function ProductModel() {
    const groupRef = useRef()
    const chassisRef = useRef()
    const leftModuleRef = useRef()
    const rightModuleRef = useRef()

    // Slow orbital rotation
    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1
        }
    })

    return (
        <group ref={groupRef} position={[0, 0, 0]}>
            {/* Main Chassis - ID Card Holder */}
            <mesh ref={chassisRef} position={[0, 0, 0]}>
                <boxGeometry args={[2, 3, 0.1]} />
                <meshStandardMaterial
                    color="#1A1A1A"
                    metalness={0.3}
                    roughness={0.7}
                />
            </mesh>

            {/* Fragrance Module (Left) - Glass appearance */}
            <mesh ref={leftModuleRef} position={[-1.2, 0, -0.1]}>
                <cylinderGeometry args={[0.15, 0.15, 1.5, 16]} />
                <meshPhysicalMaterial
                    color="#00FAFF"
                    metalness={0.9}
                    roughness={0.1}
                    transmission={0.5}
                    thickness={0.5}
                />
            </mesh>

            {/* Tech Storage Module (Right) - Solid compartment */}
            <mesh ref={rightModuleRef} position={[1.2, 0, -0.1]}>
                <boxGeometry args={[0.6, 1.5, 0.4]} />
                <meshStandardMaterial
                    color="#39FF14"
                    metalness={0.6}
                    roughness={0.4}
                />
            </mesh>

            {/* Clamp indicators (will be used for exploded view) */}
            <mesh position={[-1.2, 0, 0.05]}>
                <boxGeometry args={[0.1, 0.3, 0.05]} />
                <meshStandardMaterial color="#666666" metalness={0.8} />
            </mesh>
            <mesh position={[1.2, 0, 0.05]}>
                <boxGeometry args={[0.1, 0.3, 0.05]} />
                <meshStandardMaterial color="#666666" metalness={0.8} />
            </mesh>
        </group>
    )
}

// Main Hero 3D Component
function Hero3D() {
    return (
        <div className="w-full h-screen relative bg-deep-black">
            {/* Overlay text */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-center pointer-events-none">
                <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-electric-cyan to-neon-mint bg-clip-text text-transparent">
                    MODULAR PRECISION
                </h2>
                <p className="text-gray-400 text-sm md:text-base tracking-widest">
                    Scroll to explore the mechanism
                </p>
            </div>

            {/* Three.js Canvas */}
            <Canvas
                shadows
                gl={{
                    antialias: true,
                    alpha: false,
                    powerPreference: 'high-performance'
                }}
            >
                {/* Camera */}
                <PerspectiveCamera
                    makeDefault
                    position={[0, 0, 8]}
                    fov={50}
                />

                {/* Lights */}
                <ambientLight intensity={0.2} />

                {/* Rim Lights - Cyan from left */}
                <spotLight
                    position={[-5, 0, 5]}
                    intensity={50}
                    color="#00FAFF"
                    angle={0.5}
                    penumbra={1}
                    castShadow
                />

                {/* Rim Lights - Mint from right */}
                <spotLight
                    position={[5, 0, 5]}
                    intensity={50}
                    color="#39FF14"
                    angle={0.5}
                    penumbra={1}
                    castShadow
                />

                {/* Key light from top */}
                <directionalLight
                    position={[0, 5, 5]}
                    intensity={1}
                    castShadow
                    shadow-mapSize-width={1024}
                    shadow-mapSize-height={1024}
                />

                {/* Product Model */}
                <ProductModel />

                {/* Environment for reflections */}
                <Environment preset="city" />

                {/* Controls */}
                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    minPolarAngle={Math.PI / 3}
                    maxPolarAngle={Math.PI / 1.5}
                />
            </Canvas>

            {/* Scroll indicator */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
                <div className="w-6 h-10 border-2 border-electric-cyan rounded-full flex justify-center pt-2">
                    <div className="w-1 h-3 bg-electric-cyan rounded-full"></div>
                </div>
            </div>
        </div>
    )
}

export default Hero3D
