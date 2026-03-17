"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import type { GLTF } from "three-stdlib";
import * as THREE from "three";

const GLB_MODEL = "/satset3d/glb/bener-compressed.glb";

interface CardHolderModelProps {
    color?: string;
    autoRotate?: boolean;
    renderMode?: "normal" | "glass" | "wireframe";
    modelRotation?: [number, number, number];
    modelOffset?: [number, number, number];
    modelScaleMultiplier?: number;
}

export default function CardHolderModel({
    color = "#B48A63",
    autoRotate = true,
    renderMode = "normal",
    modelRotation = [0, 0, 0],
    modelOffset = [0, 0, 0],
    modelScaleMultiplier = 4,
}: CardHolderModelProps) {
    const animatedGroupRef = useRef<THREE.Group>(null);
    const rotationVelocityRef = useRef(0);
    const materialRef = useRef<THREE.MeshStandardMaterial | null>(null);
    const [isHovered, setIsHovered] = useState(false);

    const model = useGLTF(GLB_MODEL) as GLTF;

    // OPTIMIZED: Clone and setup model only once
    const { modelGroup, baseScale } = useMemo(() => {
        const group = new THREE.Group();
        const clonedScene = model.scene.clone(true);

        clonedScene.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                // PERFORMANCE: Disable shadows unless needed
                child.castShadow = false;
                child.receiveShadow = false;

                // PERFORMANCE: Enable frustum culling
                child.frustumCulled = true;

                group.add(child);
            }
        });

        const box = new THREE.Box3().setFromObject(group);
        let normalizedScale = 1;

        if (!box.isEmpty()) {
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());
            const maxDim = Math.max(size.x, size.y, size.z);

            group.position.set(-center.x, -center.y, -center.z);
            normalizedScale = maxDim > 0 ? 2.5 / maxDim : 1;
        }

        return {
            modelGroup: group,
            baseScale: normalizedScale,
        };
    }, [model]);

    // OPTIMIZED: Create material once, update properties instead of recreating
    useEffect(() => {
        if (!materialRef.current) {
            materialRef.current = new THREE.MeshStandardMaterial({
                color,
                roughness: 0.28,
                metalness: 0.46,
                envMapIntensity: 1.08,
            });
        }

        const material = materialRef.current;
        const isGlass = renderMode === "glass";
        const isWire = renderMode === "wireframe";

        // Update existing material instead of creating new one
        material.color.set(color);
        material.wireframe = isWire;
        material.transparent = isGlass;
        material.opacity = isGlass ? 0.56 : 1;
        material.roughness = isGlass ? 0.08 : 0.28;
        material.metalness = isGlass ? 0.12 : 0.46;
        material.envMapIntensity = isGlass ? 1.55 : 1.08;
        material.needsUpdate = true;

        // Apply material to all meshes once
        modelGroup.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.material = material;
            }
        });

        // Cleanup on unmount only
        return () => {
            if (materialRef.current) {
                materialRef.current.dispose();
            }
        };
    }, [color, renderMode, modelGroup]);

    // OPTIMIZED: Simplified frame loop
    useFrame((state, delta) => {
        const group = animatedGroupRef.current;
        if (!group || !autoRotate) return;

        // Cap delta to prevent huge jumps on lag spikes
        const clampedDelta = Math.min(delta, 0.1);

        const hoverBoost = isHovered ? 1.42 : 1;
        const targetVelocity = 0.58 * hoverBoost;

        // Smooth interpolation
        rotationVelocityRef.current = THREE.MathUtils.lerp(
            rotationVelocityRef.current,
            targetVelocity,
            clampedDelta * 2.4
        );

        group.rotation.y += rotationVelocityRef.current * clampedDelta;
    });

    return (
        <group
            rotation={modelRotation}
            position={modelOffset}
        >
            <group
                ref={animatedGroupRef}
                scale={baseScale * modelScaleMultiplier}
                onPointerOver={() => setIsHovered(true)}
                onPointerOut={() => setIsHovered(false)}
            >
                <primitive object={modelGroup} />
            </group>
        </group>
    );
}

useGLTF.preload(GLB_MODEL);
