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
            {/* Lightweight lighting: soft ambient + key/fill to add depth */}
            <ambientLight intensity={0.5} />

            <directionalLight
                position={[4, 5, 3]}
                intensity={0.58}
                castShadow={false}
            />

            <directionalLight
                position={[-3, 2, -4]}
                intensity={0.22}
                castShadow={false}
            />

            {/* Low-res environment */}
            <Environment
                preset="apartment"
                background={false}
                blur={1}
                resolution={96}
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

            {/* Controls */}
            <OrbitControls
                ref={controlsRef}
                enableZoom={enableZoom}
                enablePan={false}
                target={cameraLookAt}
                minDistance={2}
                maxDistance={10}
                enableDamping={false}
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
                    far: 50,
                }}
                onCreated={({ gl }) => {
                    gl.shadowMap.enabled = false;
                    gl.outputColorSpace = THREE.SRGBColorSpace;
                    gl.toneMapping = THREE.NoToneMapping;
                }}
                dpr={1}
                gl={{
                    antialias: false,
                    alpha: true,
                    powerPreference: "high-performance",
                    stencil: false,
                    depth: true,
                    preserveDrawingBuffer: false,
                }}
                shadows={false}
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
