"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import type { Product3DConfig, Product3DVariant } from "@/data/products";
import type { RenderMode } from "@/types";
import useResolvedColor from "@/hooks/useResolvedColor";

type ProductSceneProps = Product3DConfig & {
    color?: string;
};

function Material({ color, renderMode }: { color: string; renderMode: RenderMode }) {
    const isGlass = renderMode === "glass";
    const isWireframe = renderMode === "wireframe";

    if (isGlass) {
        return (
            <meshPhysicalMaterial
                color={color}
                transparent
                opacity={0.22}
                roughness={0.08}
                metalness={0}
                transmission={0.9}
                thickness={0.6}
                ior={1.45}
                clearcoat={1}
                clearcoatRoughness={0.05}
                side={THREE.DoubleSide}
                depthWrite={false}
            />
        );
    }

    return (
        <meshStandardMaterial
            color={color}
            wireframe={isWireframe}
            transparent={isWireframe}
            opacity={isWireframe ? 0.28 : 1}
            roughness={0.34}
            metalness={0.18}
            side={THREE.DoubleSide}
        />
    );
}

function LoadedModel({ modelSrc, scale }: { modelSrc: string; scale: number }) {
    const loadedModel = useGLTF(modelSrc);

    return (
        <group scale={scale}>
            <primitive object={loadedModel.scene} />
        </group>
    );
}

function ProductModel({
    variant,
    color,
    renderMode,
    scale = 1,
    autoRotate = true,
    modelSrc,
}: ProductSceneProps) {
    const groupRef = useRef<THREE.Group>(null);

    useFrame(() => {
        if (groupRef.current && autoRotate) {
            groupRef.current.rotation.y += 0.008;
        }
    });

    const accent = useMemo(() => new THREE.Color(color ?? "#B48A63"), [color]);

    return (
        <group ref={groupRef} scale={scale} rotation={[0, 0, 0]}>
            <mesh>
                <boxGeometry args={[1.6, 1.6, 1.6]} />
                <meshStandardMaterial color={accent.getStyle()} roughness={0.45} metalness={0.15} />
            </mesh>
        </group>
    );
}

export default function ProductScene({
    variant,
    color = "#B48A63",
    renderMode = "normal",
    enableZoom = true,
    autoRotate = true,
    scale = 1,
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    camera,
    modelSrc,
}: ProductSceneProps) {
    const resolvedColor = useResolvedColor(color);

    if (typeof window === "undefined") {
        return null;
    }

    return (
        <div
            className="w-full h-full touch-none overscroll-contain"
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
        >
            <Canvas
                camera={{ position: camera ?? [1.2, 0.9, 2.4], fov: 45 }}
                dpr={[1, 1.5]}
                gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
                style={{ background: "transparent" }}
            >
                <Suspense fallback={null}>
                    <ambientLight intensity={0.7} />
                    <directionalLight position={[5, 5, 5]} intensity={1.25} />
                    <directionalLight position={[-4, 2, -3]} intensity={0.45} />
                    <directionalLight position={[0, -4, 4]} intensity={0.25} />

                    <group position={position} rotation={rotation}>
                        <ProductModel
                            variant={variant}
                            color={resolvedColor}
                            renderMode={renderMode}
                            scale={scale}
                            autoRotate={autoRotate}
                            modelSrc={modelSrc}
                        />
                    </group>

                    <OrbitControls
                        enableZoom={enableZoom}
                        enablePan={false}
                        enableDamping
                        dampingFactor={0.08}
                        autoRotate={autoRotate}
                        autoRotateSpeed={1.15}
                        target={[0, 0, 0]}
                        minDistance={3}
                        maxDistance={10}
                    />
                </Suspense>
            </Canvas>
        </div>
    );
}