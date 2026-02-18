import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import {
    BakeShadows,
    ContactShadows,
    Environment,
    Float,
    Html,
    OrbitControls,
    Preload,
    useGLTF,
    useProgress
} from '@react-three/drei'
import * as THREE from 'three'

// Import model from public folder
// OPTIMIZATION TIP: When exporting from Blender:
// - Set texture format to JPG (not "auto") for better compression
// - Keep polygon count reasonable (< 50k triangles)
// - Apply all modifiers before export
const MODEL_URL = `${import.meta.env.BASE_URL || '/'}models/card/scene.gltf`

const useGsap = () => {
    const [gsap, setGsap] = useState(null)

    useEffect(() => {
        if (window.gsap) {
            setGsap(window.gsap)
            return
        }

        const script = document.createElement('script')
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js'
        script.async = true
        script.onload = () => setGsap(window.gsap)
        document.head.appendChild(script)

        return () => {
            script.onload = null
            if (script.parentNode) {
                script.parentNode.removeChild(script)
            }
        }
    }, [])

    return gsap
}

function Loader() {
    const { progress } = useProgress()

    return (
        <Html center>
            <div className="flex flex-col items-center justify-center text-white w-screen h-screen bg-[#050505] z-50 font-sans">
                <div className="text-4xl md:text-5xl font-black tracking-tighter mb-4 italic uppercase">
                    {progress < 100 ? 'Syncing' : 'Ready'}
                </div>
                <div className="w-48 h-0.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-cyan-400 transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <div className="mt-4 font-mono text-[9px] text-cyan-400/50 uppercase tracking-[0.4em]">
                    Core_Sync: {Math.round(progress)}%
                </div>
            </div>
        </Html>
    )
}

function FragranceModule({ mode, gsap }) {
    // Load the GLTF model into here
    const { scene } = useGLTF(MODEL_URL)
    const materialsRef = useRef([])
    const oldMaterialsRef = useRef([])
    const { camera, controls, gl } = useThree()

    useMemo(() => {
        if (!scene) return

        const box = new THREE.Box3().setFromObject(scene)
        const center = new THREE.Vector3()
        const size = new THREE.Vector3()
        box.getCenter(center)
        box.getSize(size)

        scene.position.set(0, 0, 0)
        scene.position.sub(center)

        const maxDim = Math.max(size.x, size.y, size.z)
        scene.scale.setScalar(3.5 / (maxDim || 1))

        const materials = []
        scene.traverse((child) => {
            if (!child.isMesh) return

            // Optimize geometry
            if (child.geometry) {
                child.geometry.computeVertexNormals()
                child.frustumCulled = true
            }

            // Store old materials for disposal
            const oldMats = Array.isArray(child.material) ? child.material : [child.material]
            oldMaterialsRef.current.push(...oldMats)

            const sourceMaterials = Array.isArray(child.material)
                ? child.material
                : [child.material]
            const nextMaterials = sourceMaterials.map((sourceMaterial) => {
                const baseColor = sourceMaterial?.color || new THREE.Color('#ffffff')

                // Optimize textures if they exist
                const map = sourceMaterial?.map
                if (map) {
                    map.encoding = THREE.sRGBEncoding
                    map.anisotropy = Math.min(gl.capabilities.getMaxAnisotropy(), 4)
                    map.generateMipmaps = true
                    map.minFilter = THREE.LinearMipmapLinearFilter
                    map.magFilter = THREE.LinearFilter
                }

                const material = new THREE.MeshPhysicalMaterial({
                    color: baseColor,
                    roughness: 0.2,
                    metalness: 0.8,
                    envMapIntensity: 1.5,
                    transparent: true,
                    opacity: 1,
                    transmission: 0,
                    thickness: 0,
                    ior: 1.5,
                    wireframe: false,
                    map: map || null
                })
                materials.push(material)
                return material
            })

            child.material = Array.isArray(child.material)
                ? nextMaterials
                : nextMaterials[0]
        })
        materialsRef.current = materials

        // Cleanup function for old materials
        return () => {
            oldMaterialsRef.current.forEach((mat) => {
                if (mat && mat.dispose) {
                    mat.dispose()
                }
            })
            oldMaterialsRef.current = []
        }
    }, [scene, gl])

    useEffect(() => {
        if (!gsap || materialsRef.current.length === 0) return

        const targets = materialsRef.current
        gsap.killTweensOf(targets)

        if (mode === 'glass') {
            targets.forEach((mat) => {
                mat.wireframe = false
            })
            gsap.to(targets, {
                transmission: 1,
                thickness: 2,
                roughness: 0.05,
                metalness: 0,
                opacity: 1,
                duration: 1,
                ease: 'expo.out'
            })
        } else if (mode === 'wireframe') {
            gsap.to(targets, {
                transmission: 0,
                opacity: 0.2,
                duration: 0.4,
                ease: 'power2.inOut',
                onComplete: () => {
                    targets.forEach((mat) => {
                        mat.wireframe = true
                    })
                }
            })
        } else {
            targets.forEach((mat) => {
                mat.wireframe = false
            })
            gsap.to(targets, {
                transmission: 0,
                thickness: 0,
                roughness: 0.2,
                metalness: 0.8,
                opacity: 1,
                duration: 1,
                ease: 'expo.out'
            })
        }
    }, [mode, gsap])

    useEffect(() => {
        if (!scene || !camera) return

        const box = new THREE.Box3().setFromObject(scene)
        const center = box.getCenter(new THREE.Vector3())
        const size = box.getSize(new THREE.Vector3())
        const maxDim = Math.max(size.x, size.y, size.z)
        const fov = (camera.fov * Math.PI) / 180
        const fitDistance = (maxDim / 2) / Math.tan(fov / 2)
        const distance = fitDistance * 1.4

        camera.position.set(center.x, center.y, center.z + distance)
        camera.near = Math.max(0.1, distance / 100)
        camera.far = Math.max(1000, distance * 10)
        camera.updateProjectionMatrix()

        if (controls?.target) {
            controls.target.copy(center)
            controls.update()
        }
    }, [scene, camera, controls])

    return <primitive object={scene} />
}

function Hero3D() {
    const [mode, setMode] = useState('normal')
    const gsap = useGsap()
    const containerRef = useRef()

    return (
        <div
            ref={containerRef}
            data-lenis-prevent
            className="relative w-full h-screen bg-[#050505] text-white overflow-hidden font-sans select-none"
        >
            <div className="absolute inset-0 z-20 pointer-events-none p-8 md:p-12 flex flex-col justify-between">
                <header className="flex flex-col md:flex-row justify-between items-start gap-8">
                    <div className="pointer-events-auto group cursor-crosshair">
                        <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[0.85] italic transition-transform group-hover:skew-x-2">
                            Modular<br />Aura
                        </h1>
                        <div className="h-0.5 w-16 bg-cyan-400 mt-4 shadow-[0_0_15px_#22d3ee]" />
                    </div>

                    <nav className="pointer-events-auto flex gap-1 bg-white/5 backdrop-blur-3xl p-1 rounded-full border border-white/10 shadow-2xl">
                        {['normal', 'glass', 'wireframe'].map((nextMode) => (
                            <button
                                key={nextMode}
                                onClick={() => setMode(nextMode)}
                                className={`px-6 py-2.5 rounded-full text-[10px] uppercase font-bold tracking-[0.2em] transition-all duration-500 ${mode === nextMode
                                    ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.4)] scale-105'
                                    : 'text-white/40 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                {nextMode}
                            </button>
                        ))}
                    </nav>
                </header>

                <footer className="flex justify-between items-end">
                    <div className="space-y-1 font-mono">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
                            <p className="text-[10px] text-cyan-400 tracking-widest uppercase">Input: Active</p>
                        </div>
                        <p className="text-[9px] text-white/20 uppercase tracking-tighter">Render_Tier: High_Performance</p>
                    </div>
                </footer>
            </div>

            <Canvas
                data-lenis-prevent
                shadows={false}
                dpr={[1, 2]}
                frameloop="always"
                performance={{ min: 0.5 }}
                eventSource={containerRef}
                gl={{
                    antialias: true,
                    powerPreference: 'high-performance',
                    alpha: false,
                    depth: true,
                    stencil: false,
                    precision: 'highp',
                    logarithmicDepthBuffer: true
                }}
                camera={{ position: [0, 0, 10], fov: 100, near: 0.01, far: 1000 }}
            >
                <Suspense fallback={<Loader />}>
                    <color attach="background" args={['#050505']} />

                    <Environment preset="night" />
                    <ambientLight intensity={0.4} />
                    <spotLight position={[5, 10, 5]} angle={0.15} penumbra={1} intensity={1.5} />
                    <pointLight position={[-10, 5, -5]} intensity={1} color="#00FAFF" />

                    <FragranceModule mode={mode} gsap={gsap} />

                    <ContactShadows
                        position={[0, -2.5, 0]}
                        opacity={0.4}
                        scale={12}
                        blur={2.5}
                        far={4.5}
                        color="#000000"
                    />
                    <BakeShadows />
                    <Preload all />
                </Suspense>

                <OrbitControls
                    enablePan={false}
                    enableDamping
                    dampingFactor={0.08}
                    enableZoom={false}
                    minDistance={5}
                    maxDistance={15}
                    minPolarAngle={Math.PI / 4}
                    maxPolarAngle={Math.PI / 1.5}
                    makeDefault
                />
            </Canvas>

            <style
                dangerouslySetInnerHTML={{
                    __html: `
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700;900&display=swap');
        body { margin: 0; font-family: 'Space Grotesk', sans-serif; background: #050505; }
        .bg-glow {
                    background: radial-gradient(circle at center, rgba(34, 211, 238, 0.04) 0%, transparent 80%);
          pointer-events: none;
        }
                canvas { touch-action: auto; }
      `
                }}
            />
            <div className="absolute inset-0 bg-glow" />
        </div>
    )
}

export default Hero3D
