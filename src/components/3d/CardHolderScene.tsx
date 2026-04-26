"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Float, OrbitControls, PerformanceMonitor, Preload, Html, useProgress } from "@react-three/drei";

function CanvasLoader() {
    const { progress } = useProgress();
    return (
        <Html center zIndexRange={[100, 0]} className="pointer-events-none">
            <div className="flex flex-col items-center justify-center pointer-events-none select-none w-[120px]">
                <div className="w-8 h-8 rounded-full border border-white/20 border-t-white/80 animate-spin mb-3" />
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/50 font-medium">{progress.toFixed(0)}%</p>
            </div>
        </Html>
    );
}
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import * as THREE from "three";
import gsap from "gsap";
import CardHolderModel from "./CardHolderModel";

interface CardHolderSceneProps {
    color?: string;
    autoRotate?: boolean;
    show3DModel?: boolean;
    className?: string;
    renderMode?: "normal" | "glass" | "wireframe";
    enableZoom?: boolean;
    cameraPosition?: [number, number, number];
    cameraLookAt?: [number, number, number];
    introFromPosition?: [number, number, number];
    introDuration?: number;
    isActive?: boolean;
    modelRotation?: [number, number, number];
    modelOffset?: [number, number, number];
    modelScaleMultiplier?: number;
    onModelReady?: () => void;
}

interface SceneContentProps {
    color: string;
    autoRotate: boolean;
    show3DModel: boolean;
    renderMode: "normal" | "glass" | "wireframe";
    enableZoom: boolean;
    cameraPosition: [number, number, number];
    cameraLookAt: [number, number, number];
    introFromPosition: [number, number, number];
    introDuration: number;
    isActive: boolean;
    modelRotation: [number, number, number];
    modelOffset: [number, number, number];
    modelScaleMultiplier: number;
    energySaving: boolean;
    onModelReady?: () => void;
}

function SceneContent({
    color,
    autoRotate,
    show3DModel,
    renderMode,
    enableZoom,
    cameraPosition,
    cameraLookAt,
    introFromPosition,
    introDuration,
    isActive,
    modelRotation,
    modelOffset,
    modelScaleMultiplier,
    energySaving,
    onModelReady,
}: SceneContentProps) {
    const { camera, invalidate } = useThree();
    const controlsRef = useRef<OrbitControlsImpl | null>(null);
    const hasAnimatedRef = useRef(false);
    const rimLightRef = useRef<THREE.PointLight | null>(null);
    const rimFillRef = useRef<THREE.PointLight | null>(null);

    // Camera intro (keep it smooth)
    useEffect(() => {
        if (hasAnimatedRef.current || introDuration === 0) return;
        hasAnimatedRef.current = true;

        camera.position.set(...introFromPosition);

        if (controlsRef.current) {
            controlsRef.current.target.set(...cameraLookAt);
            controlsRef.current.update();
        }

        const tween = gsap.to(camera.position, {
            x: cameraPosition[0],
            y: cameraPosition[1],
            z: cameraPosition[2],
            duration: introDuration,
            ease: "power2.out",
            onUpdate: () => {
                camera.lookAt(...cameraLookAt);
                controlsRef.current?.update();
            },
        });

        return () => {
            tween.kill();
        };
    }, [camera, cameraLookAt, cameraPosition, introDuration, introFromPosition]);

    useEffect(() => {
        if (isActive) {
            invalidate();
        }
    }, [invalidate, isActive]);

    useFrame((state) => {
        if (!isActive || energySaving) {
            return;
        }

        const t = state.clock.getElapsedTime();

        if (rimLightRef.current) {
            rimLightRef.current.intensity = 0.42 + Math.sin(t * 0.85) * 0.08;
            rimLightRef.current.position.x = 1.9 + Math.sin(t * 0.4) * 0.1;
            rimLightRef.current.position.z = -1.6 + Math.cos(t * 0.4) * 0.1;
        }

        if (rimFillRef.current) {
            rimFillRef.current.intensity = 0.2 + Math.cos(t * 0.7) * 0.05;
        }
    });

    return (
        <>
            <Environment
                preset="studio"
                background={false}
                blur={energySaving ? 0.35 : 0.8}
                // @ts-expect-error Property intensity is added in newer versions of drei
                intensity={energySaving ? 1.1 : 1.5}
            />

            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow={false} />
            <directionalLight position={[-5, -5, -5]} intensity={0.8} color="#B59E7D" />
            <directionalLight position={[0, 5, 0]} intensity={0.5} />

            {show3DModel && (
                <ContactShadows
                    position={[0, -2, 0]}
                    opacity={0.4}
                    scale={20}
                    blur={3}
                    far={6}
                    resolution={energySaving ? 256 : 512}
                    color="#000000"
                />
            )}

            {/* Premium floating animation layer */}
            {show3DModel && (
                <Float
                    speed={energySaving ? 0.8 : 1.1}
                    rotationIntensity={energySaving ? 0.04 : 0.08}
                    floatIntensity={energySaving ? 0.06 : 0.12}
                    floatingRange={[-0.06, 0.06]}
                >
                    <CardHolderModel
                        color={color}
                        autoRotate={autoRotate && isActive}
                        renderMode={renderMode}
                        modelRotation={modelRotation}
                        modelOffset={modelOffset}
                        modelScaleMultiplier={modelScaleMultiplier}
                        onReady={onModelReady}
                    />
                </Float>
            )}

            {/* Premium orbit controls */}
            <OrbitControls
                ref={controlsRef}
                enabled={isActive}
                enableZoom={enableZoom}
                enablePan={false}
                target={cameraLookAt}
                minDistance={2.2}
                maxDistance={8.5}
                enableDamping={!energySaving}
                dampingFactor={0.08}
                minPolarAngle={0}
                maxPolarAngle={Math.PI}
            />
        </>
    );
}

export default function CardHolderScene({
    color = "#B59E7D",
    autoRotate = true,
    show3DModel = true,
    className = "",
    renderMode = "normal",
    enableZoom = true,
    cameraPosition = [0, 0, 10],
    cameraLookAt = [0, 0, 0],
    introFromPosition = [1.8, 2.2, 12],
    introDuration = 1.4,
    isActive = true,
    modelRotation = [Math.PI / 2, 0, 0],
    modelOffset = [0, 0, 0],
    modelScaleMultiplier = 4,
    onModelReady,
}: CardHolderSceneProps) {
    const [maxDpr, setMaxDpr] = useState(1.25);
    const [isLowPowerDevice, setIsLowPowerDevice] = useState(false);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 768px), (pointer: coarse)");
        const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

        const updateLowPowerMode = () => {
            setIsLowPowerDevice(mediaQuery.matches);
        };

        const updateReducedMotion = () => {
            setPrefersReducedMotion(reducedMotionQuery.matches);
        };

        updateLowPowerMode();
        updateReducedMotion();

        if (typeof mediaQuery.addEventListener === "function") {
            mediaQuery.addEventListener("change", updateLowPowerMode);
            reducedMotionQuery.addEventListener("change", updateReducedMotion);

            return () => {
                mediaQuery.removeEventListener("change", updateLowPowerMode);
                reducedMotionQuery.removeEventListener("change", updateReducedMotion);
            };
        }

        mediaQuery.addListener(updateLowPowerMode);
        reducedMotionQuery.addListener(updateReducedMotion);

        return () => {
            mediaQuery.removeListener(updateLowPowerMode);
            reducedMotionQuery.removeListener(updateReducedMotion);
        };
    }, []);

    const energySaving = isLowPowerDevice || prefersReducedMotion;
    const dynamicPowerPreference = energySaving ? "low-power" : "high-performance";
    const cameraFar = energySaving ? 220 : 1000;

    const dprRange = useMemo<[number, number]>(() => {
        if (energySaving) {
            return [1, 1.1];
        }

        return [1, maxDpr];
    }, [energySaving, maxDpr]);

    return (
        <div className={`w-full h-full relative ${className}`}>
            <Canvas
                className={enableZoom && isActive ? "gpu-canvas" : "gpu-canvas pointer-events-none"}
                frameloop={isActive ? "always" : "never"}
                orthographic
                camera={{
                    position: cameraPosition,
                    zoom: 90,
                    near: 0.1,
                    far: cameraFar,
                }}
                onCreated={({ gl }) => {
                    gl.shadowMap.enabled = false;
                    gl.outputColorSpace = THREE.SRGBColorSpace;
                    gl.toneMapping = THREE.ACESFilmicToneMapping;
                    gl.toneMappingExposure = energySaving ? 1 : 1.2;
                }}
                dpr={dprRange}
                gl={{
                    antialias: !energySaving,
                    alpha: true,
                    powerPreference: dynamicPowerPreference,
                    stencil: false,
                    depth: true,
                    preserveDrawingBuffer: false,
                    toneMapping: THREE.ACESFilmicToneMapping,
                    toneMappingExposure: energySaving ? 1 : 1.2,
                }}
                performance={{ min: 0.35 }}
                shadows={false}
                style={{ pointerEvents: enableZoom && isActive ? "auto" : "none" }}
            >
                <PerformanceMonitor
                    flipflops={3}
                    onDecline={() => setMaxDpr(1)}
                    onIncline={() => setMaxDpr(energySaving ? 1.1 : 1.35)}
                />
                <Suspense fallback={<CanvasLoader />}>
                    <Preload all />
                    <SceneContent
                        color={color}
                        autoRotate={autoRotate}
                        show3DModel={show3DModel}
                        renderMode={renderMode}
                        enableZoom={enableZoom}
                        cameraPosition={cameraPosition}
                        cameraLookAt={cameraLookAt}
                        introFromPosition={introFromPosition}
                        introDuration={introDuration}
                        isActive={isActive}
                        modelRotation={modelRotation}
                        modelOffset={modelOffset}
                        modelScaleMultiplier={modelScaleMultiplier}
                        energySaving={energySaving}
                        onModelReady={onModelReady}
                    />
                </Suspense>
            </Canvas>
        </div>
    );
}
