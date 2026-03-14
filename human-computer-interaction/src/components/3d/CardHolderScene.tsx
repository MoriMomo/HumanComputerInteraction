"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows, Html, AdaptiveDpr, AdaptiveEvents } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import * as THREE from "three";
import gsap from "gsap";
import CardHolderModel from "./CardHolderModel";
import { detectGPU, forceGPUAcceleration, type GPUInfo } from "@/lib/gpu-detector";

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
    modelRotation?: [number, number, number];
    modelOffset?: [number, number, number];
    modelScaleMultiplier?: number;
    performanceMode?: "low" | "medium" | "high";
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
    modelRotation: [number, number, number];
    modelOffset: [number, number, number];
    modelScaleMultiplier: number;
    performanceMode: "low" | "medium" | "high";
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
    modelRotation,
    modelOffset,
    modelScaleMultiplier,
    performanceMode,
}: SceneContentProps) {
    const { camera } = useThree();
    const controlsRef = useRef<OrbitControlsImpl | null>(null);
    const hasAnimatedRef = useRef(false);

    // 🚀 OPTIMIZATION 1: Consolidate Performance Checks
    const isHighQuality = performanceMode === "high";
    const isLowQuality = performanceMode === "low";

    // GSAP Intro Animation
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
            ease: "power3.out",
            onUpdate: () => {
                camera.lookAt(...cameraLookAt);
                controlsRef.current?.update();
            },
        });

        return () => {
            tween.kill();
        };
    }, [camera, cameraLookAt, cameraPosition, introDuration, introFromPosition]);

    return (
        <>
            {/* 🚀 OPTIMIZATION 2: Light Reduction
                Reduced from 5 lights to 3 essential lights. 
                MeshPhysicalMaterial is very heavy; fewer lights = massive FPS boost.
                The Environment map handles the rest of the realistic lighting and reflections. */}
            <ambientLight intensity={0.4} color="#ffffff" />

            {/* Main Key Light (Only light that casts shadows to save VRAM) */}
            <directionalLight
                position={[5, 8, 3]}
                intensity={1.2}
                castShadow={!isLowQuality}
                // Max shadow map size of 1024 is plenty. 2048 causes VRAM spikes on mobile/laptops.
                shadow-mapSize-width={isHighQuality ? 1024 : 512}
                shadow-mapSize-height={isHighQuality ? 1024 : 512}
                shadow-camera-far={20}
                shadow-camera-left={-5}
                shadow-camera-right={5}
                shadow-camera-top={5}
                shadow-camera-bottom={-5}
                shadow-bias={-0.001}
            />

            {/* Warm Fill / Bottom Light (Combined to save draw calls) */}
            <directionalLight
                position={[-3, -1, -2]}
                intensity={0.6}
                color="#B48A63"
            />

            {/* 🚀 OPTIMIZATION 3: Environment Map Resolution
                Using 'preset' creates an HDRI map. We let R3F optimize it. */}
            <Environment
                preset="city"
                background={false}
                blur={0.8}
            />

            {/* 3D MODEL */}
            <CardHolderModel
                color={color}
                autoRotate={autoRotate}
                renderMode={renderMode}
                modelRotation={modelRotation}
                modelOffset={modelOffset}
                modelScaleMultiplier={modelScaleMultiplier}
            />

            {/* 🚀 OPTIMIZATION 4: ContactShadows Rendering 
                Limited resolution to 256. Blurred contact shadows don't need high res. 
                Frames property ensures we don't calculate shadows if the model isn't rotating. */}
            <ContactShadows
                position={[0, -2, 0]}
                opacity={0.3}
                scale={8}
                blur={2.5}
                far={4}
                resolution={256}
                color="#000000"
                frames={autoRotate ? Infinity : 1}
            />

            {/* CAMERA CONTROLS */}
            <OrbitControls
                ref={controlsRef}
                enableZoom={enableZoom}
                enablePan={false}
                target={cameraLookAt}
                minDistance={2}
                maxDistance={10}
                enableDamping={true}
                dampingFactor={0.05}
                maxPolarAngle={Math.PI / 1.5}
                minPolarAngle={Math.PI / 6}
                makeDefault
            />

            {/* 🚀 OPTIMIZATION 5: Adaptive Helpers 
                Automatically degrades pixel ratio and events during heavy camera movements (like GSAP intro) */}
            <AdaptiveDpr pixelated />
            <AdaptiveEvents />
        </>
    );
}

function LoadingFallback() {
    return (
        <Html fullscreen>
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-stone-900/50 to-black/50 backdrop-blur-sm">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-white text-sm font-medium">Initializing GPU...</p>
                    <p className="text-white/50 text-xs mt-2">Optimizing scene quality</p>
                </div>
            </div>
        </Html>
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
    modelRotation = [0, 0, 0],
    modelOffset = [0, 0, 0],
    modelScaleMultiplier = 1,
    performanceMode = "medium",
}: CardHolderSceneProps) {
    const [gpuInfo] = useState<GPUInfo>(() => detectGPU());

    useEffect(() => {
        forceGPUAcceleration();
    }, []);

    const adaptiveMode = useMemo<"low" | "medium" | "high">(() => {
        if (performanceMode === "low") return "low";
        if (performanceMode === "high") return "high";
        if (!gpuInfo) return "medium";

        if (!gpuInfo.hasWebGL || gpuInfo.maxTextureSize <= 4096) {
            return "low";
        }
        return gpuInfo.preferredPowerMode === "high-performance" ? "high" : "medium";
    }, [gpuInfo, performanceMode]);

    return (
        <div className={`w-full h-full relative gpu-layer ${className}`}>
            <Canvas
                camera={{
                    position: cameraPosition,
                    fov: 38,
                }}
                // Caps DPR at 1.5 for non-low devices to prevent massive 4K/Retina lag
                dpr={adaptiveMode === "low" ? [1, 1] : [1, 1.5]}
                gl={{
                    antialias: adaptiveMode === "high", // Only enable on high-end to save GPU
                    alpha: true,
                    powerPreference: gpuInfo?.preferredPowerMode || "high-performance",
                    stencil: false,
                    depth: true,
                    preserveDrawingBuffer: false,
                    logarithmicDepthBuffer: false // Massive performance saver
                }}
                shadows={adaptiveMode !== "low"}
                className="gpu-canvas"
                style={{ background: "transparent" }}
            >
                <Suspense fallback={<LoadingFallback />}>
                    <SceneContent
                        color={color}
                        autoRotate={autoRotate}
                        renderMode={renderMode}
                        enableZoom={enableZoom}
                        cameraPosition={cameraPosition}
                        cameraLookAt={cameraLookAt}
                        introFromPosition={introFromPosition}
                        introDuration={introDuration}
                        modelRotation={modelRotation}
                        modelOffset={modelOffset}
                        modelScaleMultiplier={modelScaleMultiplier}
                        performanceMode={adaptiveMode}
                    />
                </Suspense>
            </Canvas>
        </div>
    );
}