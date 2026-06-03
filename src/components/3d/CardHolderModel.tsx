"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

interface CardHolderModelProps {
    color?: string;
    renderMode?: "normal" | "glass" | "wireframe";
    modelSrc?: string;
}

interface LoadedModelProps {
    modelSrc: string;
    color: string;
    renderMode: "normal" | "glass" | "wireframe";
}

function LoadedModel({ modelSrc, color, renderMode }: LoadedModelProps) {
    const gltf = useGLTF(modelSrc);

    // 1. Scale and center the model once when the GLB model itself loads (idempotently)
    useEffect(() => {
        if (!gltf.scene) return;

        // Reset transforms so measurement is accurate
        gltf.scene.position.set(0, 0, 0);
        gltf.scene.scale.set(1, 1, 1);
        gltf.scene.rotation.set(0, 0, 0);

        // Compute original bounding box
        const box = new THREE.Box3().setFromObject(gltf.scene);
        const size = new THREE.Vector3();
        box.getSize(size);
        const center = new THREE.Vector3();
        box.getCenter(center);

        const maxDim = Math.max(size.x, size.y, size.z);
        const targetSize = 2.0;
        const scaleFactor = targetSize / (maxDim || 1);

        gltf.scene.position.set(-center.x * scaleFactor, -center.y * scaleFactor, -center.z * scaleFactor);
        gltf.scene.scale.set(scaleFactor, scaleFactor, scaleFactor);
    }, [gltf.scene]);

    // 2. Override materials and colors whenever they change
    useEffect(() => {
        if (!gltf.scene) return;

        gltf.scene.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                const mesh = child as THREE.Mesh;
                
                // Dispose of old override material if we created one
                if (mesh.userData._currentMaterial) {
                    mesh.userData._currentMaterial.dispose();
                }

                let overrideMat: THREE.Material;

                if (renderMode === "glass") {
                    overrideMat = new THREE.MeshPhysicalMaterial({
                        color: color,
                        transparent: true,
                        opacity: 0.18,
                        roughness: 0.08,
                        metalness: 0,
                        transmission: 0.92,
                        thickness: 0.7,
                        ior: 1.45,
                        clearcoat: 1,
                        clearcoatRoughness: 0.05,
                        side: THREE.DoubleSide,
                        depthWrite: false,
                    });
                } else if (renderMode === "wireframe") {
                    overrideMat = new THREE.MeshStandardMaterial({
                        color: color,
                        wireframe: true,
                        transparent: true,
                        opacity: 0.28,
                        side: THREE.DoubleSide,
                    });
                } else {
                    overrideMat = new THREE.MeshStandardMaterial({
                        color: color,
                        roughness: 0.35,
                        metalness: 0.15,
                        side: THREE.DoubleSide,
                    });
                }

                mesh.userData._currentMaterial = overrideMat;
                mesh.material = overrideMat;
            }
        });
    }, [gltf.scene, color, renderMode]);

    return <primitive object={gltf.scene} />;
}

export default function CardHolderModel({
    color = "#B48A63",
    renderMode = "normal",
    modelSrc,
}: CardHolderModelProps) {
    const groupRef = useRef<THREE.Group>(null);

    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.01;
        }
    });

    const isGlass = renderMode === "glass";
    const isWireframe = renderMode === "wireframe";

    return (
        <group ref={groupRef}>
            {modelSrc ? (
                <LoadedModel modelSrc={modelSrc} color={color} renderMode={renderMode} />
            ) : (
                <>
                    <mesh>
                        <boxGeometry args={[2, 2, 2]} />
                        {isGlass ? (
                            <meshPhysicalMaterial
                                color={color}
                                transparent
                                opacity={0.18}
                                roughness={0.08}
                                metalness={0}
                                transmission={0.92}
                                thickness={0.7}
                                ior={1.45}
                                clearcoat={1}
                                clearcoatRoughness={0.05}
                                side={THREE.DoubleSide}
                                depthWrite={false}
                            />
                        ) : (
                            <meshStandardMaterial
                                color={color}
                                wireframe={isWireframe}
                                transparent={isWireframe}
                                opacity={isWireframe ? 0.28 : 1}
                                roughness={0.35}
                                metalness={0.15}
                                side={THREE.DoubleSide}
                            />
                        )}
                    </mesh>

                    <mesh position={[0.08, -0.12, 0.18]}>
                        <sphereGeometry args={[0.56, 48, 32]} />
                        <meshStandardMaterial
                            color="#efe7db"
                            metalness={0.25}
                            roughness={0.18}
                            emissive="#6b4f3a"
                            emissiveIntensity={0.08}
                        />
                    </mesh>
                </>
            )}
        </group>
    );
}
