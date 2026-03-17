"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Float, OrbitControls, PerformanceMonitor } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import * as THREE from "three";
import gsap from "gsap";
import CardHolderModel from "./CardHolderModel";

interface CardHolderSceneProps {
    color?: string;
    autoRotate?: boolean;
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
}

interface SceneContentProps {
    color: string;
    autoRotate: boolean;
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
}

function SceneContent({
    color,
    autoRotate,
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
        if (!isActive) {
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
            <ambientLight intensity={0.3} />

            <hemisphereLight
                args={["#8f9ca8", "#111821", 0.2]}
            />

            <directionalLight
                position={[3.1, 4.3, 2.4]}
                intensity={0.7}
                castShadow
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
                shadow-camera-near={0.5}
                shadow-camera-far={20}
                shadow-bias={-0.00008}
            />

            <directionalLight
                position={[-2.8, 2.1, -3.1]}
                intensity={0.24}
                castShadow={false}
            />

            <pointLight
                ref={rimLightRef}
                position={[1.9, 0.95, -1.6]}
                color="#c3d1dc"
                intensity={0.36}
                distance={6}
                decay={2.2}
            />

            <pointLight
                ref={rimFillRef}
                position={[-1.6, 0.7, 1.4]}
                color="#6e7f8f"
                intensity={0.18}
                distance={5}
                decay={2.4}
            />

            <Environment
                preset="studio"
                background={false}
                blur={0.55}
                resolution={128}
            />

            <ContactShadows
                position={[0, -1.18, 0]}
                opacity={0.36}
                scale={8}
                blur={2.4}
                far={4}
                resolution={512}
                color="#273240"
            />

            {/* Antigravity-style motion layer for premium showroom feel */}
            <Float
                speed={1.4}
                rotationIntensity={0.22}
                floatIntensity={0.2}
                floatingRange={[-0.08, 0.08]}
            >
                <CardHolderModel
                    color={color}
                    autoRotate={autoRotate && isActive}
                    renderMode={renderMode}
                    modelRotation={modelRotation}
                    modelOffset={modelOffset}
                    modelScaleMultiplier={modelScaleMultiplier}
                />
            </Float>

            {/* Controls */}
            <OrbitControls
                ref={controlsRef}
                enabled={isActive}
                enableZoom={enableZoom}
                enablePan={false}
                target={cameraLookAt}
                minDistance={2.2}
                maxDistance={8.5}
                enableDamping={true}
                dampingFactor={0.07}
                minPolarAngle={0}
                maxPolarAngle={Math.PI}
            />
        </>
    );
}

export default function CardHolderScene({
    color = "#B48A63",
    autoRotate = true,
    className = "",
    renderMode = "normal",
    enableZoom = true,
    cameraPosition = [3, 2, 5],
    cameraLookAt = [0, 0, 0],
    introFromPosition = [4, 3, 6],
    introDuration = 1.4,
    isActive = true,
    modelRotation = [Math.PI / 2, 0, 0],
    modelOffset = [0, 0, 0],
    modelScaleMultiplier = 1,
}: CardHolderSceneProps) {
    const [maxDpr, setMaxDpr] = useState(1.5);
    const [isLowPowerDevice, setIsLowPowerDevice] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 768px), (pointer: coarse)");
        const updateLowPowerMode = () => {
            setIsLowPowerDevice(mediaQuery.matches);
        };

        updateLowPowerMode();

        if (typeof mediaQuery.addEventListener === "function") {
            mediaQuery.addEventListener("change", updateLowPowerMode);

            return () => {
                mediaQuery.removeEventListener("change", updateLowPowerMode);
            };
        }

        mediaQuery.addListener(updateLowPowerMode);

        return () => {
            mediaQuery.removeListener(updateLowPowerMode);
        };
    }, []);

    return (
        <div className={`w-full h-full relative ${className}`}>
            <Canvas
                className={enableZoom && isActive ? "gpu-canvas" : "gpu-canvas pointer-events-none"}
                frameloop={isActive ? "always" : "never"}
                camera={{
                    position: cameraPosition,
                    fov: 45,
                    near: 0.1,
                    far: 50,
                }}
                onCreated={({ gl }) => {
                    gl.shadowMap.enabled = true;
                    gl.shadowMap.type = THREE.PCFShadowMap;
                    gl.outputColorSpace = THREE.SRGBColorSpace;
                    gl.toneMapping = THREE.ACESFilmicToneMapping;
                    gl.toneMappingExposure = 0.85;
                }}
                dpr={[1, maxDpr]}
                gl={{
                    antialias: !isLowPowerDevice,
                    alpha: true,
                    powerPreference: "high-performance",
                    stencil: false,
                    depth: true,
                    preserveDrawingBuffer: false,
                }}
                performance={{ min: 0.6 }}
                shadows={{ type: THREE.PCFShadowMap }}
            >
                <PerformanceMonitor
                    flipflops={3}
                    onDecline={() => setMaxDpr(1)}
                    onIncline={() => setMaxDpr(1.5)}
                />
                <Suspense fallback={null}>
                    <SceneContent
                        color={color}
                        autoRotate={autoRotate}
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
                    />
                </Suspense>
            </Canvas>
        </div>
    );
}
