"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import type { GLTF } from "three-stdlib";
import * as THREE from "three";

const GLB_PARTS = [
    "/satset 3d/glb/block 2pcs.glb",
    "/satset 3d/glb/botol 1pcs.glb",
    "/satset 3d/glb/BOX1 1pcs.glb",
    "/satset 3d/glb/DOR 3pcs.glb",
    "/satset 3d/glb/lock.glb",
    "/satset 3d/glb/obat 1pcs.glb",
    "/satset 3d/glb/Part1 2pcs.glb",
    "/satset 3d/glb/s 2pcs.glb",
    "/satset 3d/glb/SLOT 2pcs.glb",
    "/satset 3d/glb/tutup bot 1pcs.glb",
];

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
    const groupRef = useRef<THREE.Group>(null);
    const isPointerDown = useRef(false);

    const models = useGLTF(GLB_PARTS) as GLTF[];

    const { combinedGroup, baseScale, meshes } = useMemo(() => {
        const group = new THREE.Group();
        const meshList: THREE.Mesh[] = [];

        models.forEach((gltf) => {
            const clonedScene = gltf.scene.clone(true);

            clonedScene.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                    child.castShadow = false;
                    child.receiveShadow = false;
                    meshList.push(child);
                }
            });

            group.add(clonedScene);
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
            combinedGroup: group,
            baseScale: normalizedScale,
            meshes: meshList,
        };
    }, [models]);

    const sharedMaterial = useMemo(() => {
        switch (renderMode) {
            case "wireframe":
                return new THREE.MeshBasicMaterial({
                    color,
                    wireframe: true,
                });

            case "glass":
                return new THREE.MeshPhongMaterial({
                    color,
                    transparent: true,
                    opacity: 0.7,
                    shininess: 90,
                });

            default:
                return new THREE.MeshPhongMaterial({
                    color,
                    shininess: 80,
                    specular: new THREE.Color(0x444444),
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

    // Rotation animation
    const lastFrameTime = useRef(0);
    useFrame((state) => {
        const now = state.clock.getElapsedTime() * 1000;

        if (now - lastFrameTime.current < 42) return;
        lastFrameTime.current = now;

        if (groupRef.current && autoRotate && !isPointerDown.current) {
            groupRef.current.rotation.y += 0.01;
        }
    });

    return (
        <group
            ref={groupRef}
            onPointerDown={() => (isPointerDown.current = true)}
            onPointerUp={() => (isPointerDown.current = false)}
            onPointerLeave={() => (isPointerDown.current = false)}
            rotation={modelRotation}
            position={modelOffset}
            scale={baseScale * modelScaleMultiplier}
        >
            <primitive object={combinedGroup} />
        </group>
    );
}

// Preload all models
GLB_PARTS.forEach((path) => useGLTF.preload(path));