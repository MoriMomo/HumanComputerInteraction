"use client";
import PropTypes from 'prop-types'
import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { BakeShadows, ContactShadows, OrbitControls, Preload } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import ErrorBoundary from '../ErrorBoundary'
import Loader3D from './Loader3D'
import SceneLights from './SceneLights'
import FragranceModule from './FragranceModule'

function Hero3DCanvas({ mode, gsap, materialColor }) {
    return (
        <ErrorBoundary
            fallback={(
                <div className="flex flex-col items-center justify-center w-full h-full" style={{ background: '#F6F6F4', color: '#584738' }}>
                    <div className="text-center max-w-md px-8">
                        <div className="text-6xl mb-4">⚠️</div>
                        <h2 className="text-2xl font-bold mb-2">WebGL Initialization Failed</h2>
                        <p className="mb-4" style={{ color: '#666666' }}>3D rendering is unavailable.</p>
                        <button
                            onClick={() => window.location.reload()}
                            style={{
                                padding: '12px 24px',
                                background: '#584738',
                                color: 'white',
                                borderRadius: '4px',
                                fontWeight: 700,
                                border: 'none',
                                cursor: 'pointer',
                            }}
                        >
                            Reload Page
                        </button>
                    </div>
                </div>
            )}
        >
            <Canvas
                data-lenis-prevent
                shadows={false}
                dpr={[1, 2]}
                frameloop="always"
                performance={{ min: 0.5 }}
                gl={{
                    antialias: true,
                    powerPreference: 'high-performance',
                    alpha: true,
                    depth: true,
                    stencil: false,
                    precision: 'highp',
                    logarithmicDepthBuffer: true,
                    failIfMajorPerformanceCaveat: false
                }}
                camera={{ position: [0, 0, 6], fov: 55, near: 0.01, far: 1000 }}
                onCreated={() => {
                    console.log('WebGL Renderer created')
                }}
            >
                <Suspense fallback={<Loader3D />}>
                    {/* background handled by parent CSS div */}
                    <SceneLights />
                    <FragranceModule mode={mode} gsap={gsap} materialColor={materialColor} />
                    <ContactShadows position={[0, -2.5, 0]} opacity={0.35} scale={15} blur={2.5} far={4.5} color="#302C2B" resolution={512} frames={1} />
                    <BakeShadows />

                    {/* 3D Web Experience Magic */}
                    <EffectComposer disableNormalPass multisampling={4}>
                        <Bloom
                            luminanceThreshold={0.5}
                            luminanceSmoothing={0.9}
                            height={300}
                            intensity={0.4}
                        />
                        <Vignette
                            eskil={false}
                            offset={0.1}
                            darkness={0.5}
                        />
                    </EffectComposer>

                    <Preload all />
                </Suspense>

                <OrbitControls
                    enablePan={false}
                    enableDamping
                    dampingFactor={0.08}
                    enableZoom={true}
                    minDistance={3}
                    maxDistance={20}
                    minPolarAngle={Math.PI / 6}
                    maxPolarAngle={Math.PI / 1.4}
                    makeDefault
                />
            </Canvas>
        </ErrorBoundary>
    )
}

Hero3DCanvas.propTypes = {
    /** Current render mode: 'normal' | 'glass' | 'wireframe' */
    mode: PropTypes.oneOf(['normal', 'glass', 'wireframe']).isRequired,
    /** GSAP instance for animations */
    gsap: PropTypes.object,
    /** Hex color string for the 3D model material */
    materialColor: PropTypes.string.isRequired,
}

export default Hero3DCanvas
