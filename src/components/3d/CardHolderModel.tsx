"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import type { GLTF } from "three-stdlib";
import * as THREE from "three";

const GLB_MODEL = "/satset 3d/glb/lock.glb";

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
    modelScaleMultiplier = 2,
}: CardHolderModelProps) {
    const animatedGroupRef = useRef<THREE.Group>(null);
    const rotationVelocityRef = useRef(0);
    const [isHovered, setIsHovered] = useState(false);

    const model = useGLTF(GLB_MODEL) as GLTF;

    const { modelGroup, baseScale, meshes } = useMemo(() => {
        const group = new THREE.Group();
        const meshList: THREE.Mesh[] = [];

        const clonedScene = model.scene.clone(true);

        clonedScene.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                meshList.push(child);
            }
        });

        group.add(clonedScene);

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
            meshes: meshList,
        };
    }, [model]);

    const sharedMaterial = useMemo(() => {
        const isGlass = renderMode === "glass";

        switch (renderMode) {
            case "wireframe":
                return new THREE.MeshStandardMaterial({
                    color,
                    wireframe: true,
                    roughness: 0.38,
                    metalness: 0.48,
                    envMapIntensity: 1.1,
                });

            case "glass":
                return new THREE.MeshStandardMaterial({
                    color,
                    transparent: true,
                    opacity: 0.56,
                    roughness: 0.08,
                    metalness: 0.12,
                    envMapIntensity: 1.55,
                });

            default:
                return new THREE.MeshStandardMaterial({
                    color,
                    roughness: isGlass ? 0.08 : 0.28,
                    metalness: isGlass ? 0.12 : 0.46,
                    envMapIntensity: 1.08,
                });
        }
    }, [color, renderMode]);

    useEffect(() => {
        meshes.forEach((mesh) => {
            mesh.material = sharedMaterial;
        });

        return () => {
            sharedMaterial.dispose();
        };
    }, [meshes, sharedMaterial]);

    useFrame((state, delta) => {
        const group = animatedGroupRef.current;
        if (!group) return;

        const hoverBoost = isHovered ? 1.42 : 1;
        const targetVelocity = autoRotate ? 0.58 * hoverBoost : 0;

        rotationVelocityRef.current = THREE.MathUtils.lerp(
            rotationVelocityRef.current,
            targetVelocity,
            Math.min(1, delta * 2.4)
        );

        group.rotation.y += rotationVelocityRef.current * delta;
    });

    // In CardHolderModel.tsx
    return (
        <group
            // FIX: Apply the user's rotation, but force -90deg (PI/2) on X-axis to stand up
            rotation={[modelRotation[0] + Math.PI / 2, modelRotation[1], modelRotation[2]]}
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