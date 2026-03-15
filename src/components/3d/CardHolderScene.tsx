"use client";

import { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
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

    useFrame((state) => {
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
            {/* Darker cinematic look for product focus */}
            <ambientLight intensity={0.2} />

            <hemisphereLight
                args={["#6f5c45", "#0c0b0a", 0.16]}
            />

            <directionalLight
                position={[3.2, 4.2, 2.6]}
                intensity={0.42}
                castShadow={false}
            />

            <directionalLight
                position={[-2.6, 1.8, -3.2]}
                intensity={0.14}
                castShadow={false}
            />

            <pointLight
                ref={rimLightRef}
                position={[1.9, 0.95, -1.6]}
                color="#f4cf9f"
                intensity={0.42}
                distance={6}
                decay={2.2}
            />

            <pointLight
                ref={rimFillRef}
                position={[-1.6, 0.7, 1.4]}
                color="#7e6a56"
                intensity={0.2}
                distance={5}
                decay={2.4}
            />

            {/* Darker reflections with lightweight environment */}
            <Environment
                preset="city"
                background={false}
                blur={0.7}
                resolution={64}
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
                minDistance={2.2}
                maxDistance={8.5}
                enableDamping={true}
                dampingFactor={0.07}
                maxPolarAngle={Math.PI / 1.75}
                minPolarAngle={Math.PI / 3.4}
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
                    gl.toneMapping = THREE.ACESFilmicToneMapping;
                    gl.toneMappingExposure = 0.72;
                }}
                dpr={1}
                gl={{
                    antialias: true,
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
