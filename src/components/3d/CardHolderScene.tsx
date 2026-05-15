"use client";

import { Suspense, useEffect, useRef, useState, useMemo } from "react";
import useResolvedColor from "@/hooks/useResolvedColor";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Float, Html, OrbitControls, useProgress } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import * as THREE from "three";
import gsap from "gsap";
import CardHolderModel from "./CardHolderModel";

function CanvasLoader() {
    const { progress } = useProgress();

    return (
        <Html center zIndexRange={[100, 0]} className="pointer-events-none">
            <div className="flex w-30 select-none flex-col items-center justify-center pointer-events-none">
                <div className="mb-3 h-8 w-8 rounded-full border border-white/20 border-t-white/80 animate-spin" />
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/50">
                    {progress.toFixed(0)}%
                </p>
            </div>
        </Html>
    );
}

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
    compactExperience: boolean;
    onModelReady?: () => void;
}

interface CompactSceneContentProps {
    color: string;
    show3DModel: boolean;
    renderMode: "normal" | "glass" | "wireframe";
    modelRotation: [number, number, number];
    modelOffset: [number, number, number];
    modelScaleMultiplier: number;
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
    compactExperience,
    onModelReady,
}: SceneContentProps) {
    const { camera, invalidate } = useThree();
    const controlsRef = useRef<OrbitControlsImpl | null>(null);
    const hasAnimatedRef = useRef(false);
    const [introFinished, setIntroFinished] = useState(false);
    const rimLightRef = useRef<THREE.PointLight | null>(null);
    const rimFillRef = useRef<THREE.PointLight | null>(null);
    const resolvedColor = useResolvedColor(color);

    // Camera intro (keep it smooth)
    useEffect(() => {
        if (hasAnimatedRef.current || introDuration === 0) return;
        hasAnimatedRef.current = true;

        // Start camera from intro position
        camera.position.set(...introFromPosition);

        // Try to initialize controls target if ready
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
                // Let OrbitControls manage camera orientation; just update it here
                controlsRef.current?.update();
            },
            onComplete: () => {
                setIntroFinished(true);
            },
        });

        return () => {
            tween.kill();
        };
    }, [camera, cameraLookAt, cameraPosition, introDuration, introFromPosition]);

    // Reset the animation guard when intro config changes so the intro can replay when intentionally changed
    useEffect(() => {
        hasAnimatedRef.current = false;
        const raf = requestAnimationFrame(() => setIntroFinished(false));
        return () => cancelAnimationFrame(raf);
    }, [cameraPosition, introFromPosition, introDuration]);

    // Ensure controls target is initialized when the ref becomes available
    useEffect(() => {
        const id = window.setTimeout(() => {
            if (controlsRef.current) {
                controlsRef.current.target.set(...cameraLookAt);
                controlsRef.current.update();
            }
        }, 50);
        return () => window.clearTimeout(id);
    }, [cameraLookAt]);

    useEffect(() => {
        if (isActive) {
            invalidate();
        }
    }, [invalidate, isActive]);

    useFrame((state) => {
        if (!isActive || energySaving || compactExperience) {
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
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow={false} />
            <directionalLight position={[-5, -5, -5]} intensity={0.8} color={resolvedColor} />
            <directionalLight position={[0, 5, 0]} intensity={0.5} />
            <Environment preset="studio" />

            {show3DModel && !compactExperience && (
                <ContactShadows
                    position={[0, -2, 0]}
                    opacity={0.28}
                    scale={20}
                    blur={4.8}
                    far={7}
                    resolution={512}
                    key={energySaving ? "shadows-static" : "shadows-dynamic"}
                    frames={energySaving ? 1 : 60}
                    color="#2d241d"
                />
            )}

            {/* Subtle floating animation — minimal to not fight OrbitControls */}
            {show3DModel && !compactExperience && (
                <Float
                    speed={0.5}
                    rotationIntensity={0.01}
                    floatIntensity={0.03}
                    floatingRange={[-0.02, 0.02]}
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

            {/* OrbitControls with snappy damping and smooth auto-rotation */}
            <OrbitControls
                ref={controlsRef}
                enabled={introFinished && isActive && !compactExperience}
                enableZoom={enableZoom}
                enablePan={false}
                target={cameraLookAt}
                minDistance={2.2}
                maxDistance={8.5}
                enableDamping={true}
                dampingFactor={0.04}
                autoRotate={autoRotate && isActive}
                autoRotateSpeed={1.5}
                minPolarAngle={Math.PI / 6}
                maxPolarAngle={Math.PI - Math.PI / 6}
            />
        </>
    );
}

function CompactSceneContent({
    color,
    show3DModel,
    renderMode,
    modelRotation,
    modelOffset,
    modelScaleMultiplier,
    onModelReady,
}: CompactSceneContentProps) {
    const resolvedColor = useResolvedColor(color);

    return (
        <>
            <ambientLight intensity={0.3} />
            <directionalLight position={[5, 8, 5]} intensity={1.5} castShadow={false} />
            <directionalLight position={[-4, -2, -4]} intensity={0.4} color={resolvedColor} />

            {/* Environment map for realistic reflections/refractions on metal and glass */}
            <Environment preset="studio" />

            {show3DModel && (
                <group rotation={modelRotation} position={modelOffset} scale={modelScaleMultiplier}>
                    <CardHolderModel
                        color={color}
                        autoRotate={false}
                        renderMode={renderMode}
                        modelRotation={[0, 0, 0]}
                        modelOffset={[0, 0, 0]}
                        modelScaleMultiplier={1}
                        onReady={onModelReady}
                    />
                </group>
            )}
        </>
    );
}

export default function CardHolderScene({
    color = "var(--color-brand-primary)",
    autoRotate = true,
    show3DModel = true,
    className = "",
    renderMode = "normal",
    enableZoom = true,
    cameraPosition = [0, 0, 50],
    cameraLookAt = [0, 0, 0],
    introFromPosition = [5, 8, 80],
    introDuration = 1.4,
    isActive = true,
    modelRotation = [Math.PI / 2, 0, 0],
    modelOffset = [0, -6, 0],
    modelScaleMultiplier = 4,
    onModelReady,
}: CardHolderSceneProps) {
    const [isLowPowerDevice, setIsLowPowerDevice] = useState(false);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
    const [useOrthographic, setUseOrthographic] = useState(true);
    const [isDesktopViewport, setIsDesktopViewport] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 768px), (pointer: coarse)");
        const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

        // Use orthographic on small / touch devices, and perspective on larger (desktop) viewports
        const desktopQuery = window.matchMedia("(min-width: 1024px)");
        const updateCameraType = () => {
            setUseOrthographic(!desktopQuery.matches);
            setIsDesktopViewport(desktopQuery.matches);
        };

        const updateLowPowerMode = () => {
            setIsLowPowerDevice(mediaQuery.matches);
        };

        const updateReducedMotion = () => {
            setPrefersReducedMotion(reducedMotionQuery.matches);
        };

        updateLowPowerMode();
        updateReducedMotion();
        updateCameraType();

        if (typeof mediaQuery.addEventListener === "function") {
            mediaQuery.addEventListener("change", updateLowPowerMode);
            reducedMotionQuery.addEventListener("change", updateReducedMotion);
            desktopQuery.addEventListener("change", updateCameraType);

            return () => {
                mediaQuery.removeEventListener("change", updateLowPowerMode);
                reducedMotionQuery.removeEventListener("change", updateReducedMotion);
                desktopQuery.removeEventListener("change", updateCameraType);
            };
        }

        mediaQuery.addListener(updateLowPowerMode);
        reducedMotionQuery.addListener(updateReducedMotion);
        desktopQuery.addListener(updateCameraType);

        return () => {
            mediaQuery.removeListener(updateLowPowerMode);
            reducedMotionQuery.removeListener(updateReducedMotion);
            desktopQuery.removeListener(updateCameraType);
        };
    }, []);

    const energySaving = isLowPowerDevice || prefersReducedMotion;
    const compactExperience = energySaving || !isDesktopViewport;
    const dynamicPowerPreference = energySaving ? "low-power" : "high-performance";
    const cameraFar = energySaving ? 220 : 1000;
    const responsiveCameraPosition = useMemo<[number, number, number]>(
        () => (isDesktopViewport ? [cameraPosition[0], cameraPosition[1], cameraPosition[2] * 0.88] : cameraPosition),
        [isDesktopViewport, cameraPosition]
    );

    const responsiveIntroFromPosition = useMemo<[number, number, number]>(
        () => (isDesktopViewport ? [introFromPosition[0], introFromPosition[1], introFromPosition[2] * 0.92] : introFromPosition),
        [isDesktopViewport, introFromPosition]
    );

    const responsiveModelScaleMultiplier = useMemo(
        () => (isDesktopViewport ? modelScaleMultiplier * 1.18 : modelScaleMultiplier),
        [isDesktopViewport, modelScaleMultiplier]
    );

    // Camera config — memoized so we don't recreate the camera object every render.
    type CameraBase = { position: [number, number, number]; near: number; far: number };
    const cameraConfig = useMemo(() => {
        const base: CameraBase = { position: responsiveCameraPosition, near: 0.1, far: cameraFar };
        return useOrthographic
            ? { ...base, zoom: isDesktopViewport ? 120 : 110 }
            : { ...base, fov: 35 };
    }, [responsiveCameraPosition, cameraFar, useOrthographic, isDesktopViewport]);

    // Use a conservative DPR to reduce GPU pressure and avoid GL context loss.
    // When energySaving is enabled, use 1 (single DPR); otherwise clamp to [1,1].
    // Keep DPR low to improve stability on constrained devices and shared contexts.
    const canvasDpr = energySaving ? 1 : [1, 1] as [number, number];

    // Remount key for Canvas when switching camera projection (ortho vs perspective)
    const canvasKey = useOrthographic ? "ortho" : "persp";

    return (
        <div className={`w-full h-full relative ${className}`}>
            <Canvas
                key={canvasKey}
                className={enableZoom && isActive ? "gpu-canvas" : "gpu-canvas pointer-events-none"}
                frameloop={isActive && !energySaving ? "always" : "demand"}
                orthographic={useOrthographic}
                camera={cameraConfig}
                onCreated={({ gl }) => {
                    gl.shadowMap.enabled = false;
                    gl.outputColorSpace = THREE.SRGBColorSpace;
                    gl.toneMapping = THREE.ACESFilmicToneMapping;
                    gl.toneMappingExposure = energySaving ? 1 : 1.2;
                }}
                dpr={canvasDpr}
                gl={{
                    antialias: !compactExperience,
                    alpha: true,
                    powerPreference: dynamicPowerPreference,
                    stencil: false,
                    depth: true,
                    preserveDrawingBuffer: false,
                    toneMapping: THREE.ACESFilmicToneMapping,
                    toneMappingExposure: energySaving ? 1 : 1.2,
                    precision: energySaving ? "lowp" : "highp",
                }}
                shadows={false}
                style={{ pointerEvents: enableZoom && isActive ? "auto" : "none" }}
            >
                <Suspense fallback={<CanvasLoader />}>
                    {compactExperience ? (
                        <CompactSceneContent
                            color={color}
                            show3DModel={show3DModel}
                            renderMode={renderMode}
                            modelRotation={modelRotation}
                            modelOffset={modelOffset}
                            modelScaleMultiplier={responsiveModelScaleMultiplier * 0.88}
                            onModelReady={onModelReady}
                        />
                    ) : (
                        <SceneContent
                            color={color}
                            autoRotate={autoRotate}
                            show3DModel={show3DModel}
                            renderMode={renderMode}
                            enableZoom={enableZoom}
                            cameraPosition={responsiveCameraPosition}
                            cameraLookAt={cameraLookAt}
                            introFromPosition={responsiveIntroFromPosition}
                            introDuration={introDuration}
                            isActive={isActive}
                            modelRotation={modelRotation}
                            modelOffset={modelOffset}
                            modelScaleMultiplier={responsiveModelScaleMultiplier}
                            energySaving={energySaving}
                            compactExperience={compactExperience}
                            onModelReady={onModelReady}
                        />
                    )}
                </Suspense>
            </Canvas>
        </div>
    );
}
