"use client";

import { Suspense, useEffect, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
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
    modelRotation,
    modelOffset,
    modelScaleMultiplier,
}: SceneContentProps) {
    const { camera } = useThree();
    const controlsRef = useRef<OrbitControlsImpl | null>(null);
    const hasAnimatedRef = useRef(false);

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

    return (
        <>
            {/* ULTRA OPTIMIZATION 3: Minimal lighting (2 lights only) */}
            <ambientLight intensity={0.6} />

            <directionalLight
                position={[5, 5, 5]}
                intensity={0.8}
                castShadow={false}
            />

            {/* ULTRA OPTIMIZATION 4: Low-res environment or none */}
            <Environment
                preset="apartment"
                background={false}
                blur={1}
                resolution={128} // Very low resolution
            />

            {/* 3D Model */}
            <CardHolderModel
                color={color}
                autoRotate={autoRotate}
                renderMode={renderMode}
                modelRotation={modelRotation}
                modelOffset={modelOffset}
                modelScaleMultiplier={modelScaleMultiplier}
            />

            {/* ULTRA OPTIMIZATION 5: Remove contact shadows completely */}

            {/* Controls */}
            <OrbitControls
                ref={controlsRef}
                enableZoom={enableZoom}
                enablePan={false}
                target={cameraLookAt}
                minDistance={2}
                maxDistance={10}
                enableDamping={false} // Disable damping (saves calculations)
                maxPolarAngle={Math.PI / 1.5}
                minPolarAngle={Math.PI / 6}
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
    modelRotation = [0, 0, 0],
    modelOffset = [0, 0, 0],
    modelScaleMultiplier = 1,
}: CardHolderSceneProps) {
    return (
        <div className={`w-full h-full relative ${className}`}>
            <Canvas
                camera={{
                    position: cameraPosition,
                    fov: 45,
                    near: 0.1,
                    far: 50, // Reduced far plane
                }}
                onCreated={({ gl }) => {
                    gl.shadowMap.enabled = false;
                    gl.outputColorSpace = THREE.SRGBColorSpace;
                    gl.toneMapping = THREE.NoToneMapping;
                }}
                dpr={1} // Force 1x pixel ratio (huge performance boost)
                gl={{
                    antialias: false, // Disable AA (huge performance boost)
                    alpha: true,
                    powerPreference: "high-performance",
                    stencil: false,
                    depth: true,
                    preserveDrawingBuffer: false,
                }}
                shadows={false} // Disable shadows
                style={{ background: "transparent" }}
            >
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
                        modelRotation={modelRotation}
                        modelOffset={modelOffset}
                        modelScaleMultiplier={modelScaleMultiplier}
                    />
                </Suspense>
            </Canvas>
        </div>
    );
}