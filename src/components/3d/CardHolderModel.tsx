"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

interface CardHolderModelProps {
    color?: string;
    renderMode?: "normal" | "glass" | "wireframe";
    modelSrc?: string;
    finish?: "standard" | "matte" | "brushed" | "polished";
    autoRotate?: boolean;
}

interface LoadedModelProps {
    modelSrc: string;
    color: string;
    renderMode: "normal" | "glass" | "wireframe";
    finish: "standard" | "matte" | "brushed" | "polished";
}

function LoadedModel({ modelSrc, color, renderMode, finish }: LoadedModelProps) {
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
                
                // Keep track of the original material to clone/restore/read maps from
                if (!mesh.userData._originalMaterial) {
                    mesh.userData._originalMaterial = mesh.material;
                }
                const originalMat = mesh.userData._originalMaterial as THREE.Material | THREE.Material[];

                // Dispose of old override material if we created one
                if (mesh.userData._currentMaterial) {
                    const prevMat = mesh.userData._currentMaterial;
                    if (Array.isArray(prevMat)) {
                        prevMat.forEach(m => m.dispose());
                    } else {
                        prevMat.dispose();
                    }
                }

                let overrideMat: THREE.Material | THREE.Material[];

                const threeColor = new THREE.Color(color);

                const processSingleMaterial = (mat: THREE.Material): THREE.Material => {
                    if (renderMode === "glass") {
                        const glassMat = new THREE.MeshPhysicalMaterial({
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
                        // Preserve original maps if present
                        if (mat && 'map' in mat && mat.map) {
                            glassMat.map = mat.map as THREE.Texture;
                        }
                        if (mat && 'normalMap' in mat && mat.normalMap) {
                            glassMat.normalMap = mat.normalMap as THREE.Texture;
                        }
                        return glassMat;
                    }

                    if (mat) {
                        const cloned = mat.clone();
                        if ('color' in cloned && cloned.color instanceof THREE.Color) {
                            cloned.color.copy(threeColor);
                        }

                        // Apply physical finishes properties if the material supports it
                        if ('roughness' in cloned && 'metalness' in cloned) {
                            const standardMat = cloned as THREE.MeshStandardMaterial;
                            if (finish === "matte") {
                                standardMat.roughness = 0.85;
                                standardMat.metalness = 0.1;
                                if ('clearcoat' in standardMat) {
                                    (standardMat as THREE.MeshPhysicalMaterial).clearcoat = 0;
                                }
                            } else if (finish === "brushed") {
                                standardMat.roughness = 0.35;
                                standardMat.metalness = 0.85;
                                if ('clearcoat' in standardMat) {
                                    (standardMat as THREE.MeshPhysicalMaterial).clearcoat = 0.1;
                                }
                            } else if (finish === "polished") {
                                standardMat.roughness = 0.08;
                                standardMat.metalness = 0.95;
                                if ('clearcoat' in standardMat) {
                                    const physicalMat = standardMat as THREE.MeshPhysicalMaterial;
                                    physicalMat.clearcoat = 1.0;
                                    physicalMat.clearcoatRoughness = 0.02;
                                }
                            } else { // standard
                                standardMat.roughness = 0.35;
                                standardMat.metalness = 0.15;
                            }
                        }

                        if (renderMode === "wireframe") {
                            if ('wireframe' in cloned) {
                                const wireframeMat = cloned as THREE.Material & { wireframe: boolean };
                                wireframeMat.wireframe = true;
                                wireframeMat.transparent = true;
                                wireframeMat.opacity = 0.28;
                            }
                        } else {
                            if ('wireframe' in cloned) {
                                const wireframeMat = cloned as THREE.Material & { wireframe: boolean };
                                wireframeMat.wireframe = false;
                            }
                        }
                        return cloned;
                    }

                    // Fallback Standard Material
                    let roughness = 0.35;
                    let metalness = 0.15;
                    let clearcoat = 0;
                    let clearcoatRoughness = 0;

                    if (finish === "matte") {
                        roughness = 0.85;
                        metalness = 0.1;
                    } else if (finish === "brushed") {
                        roughness = 0.35;
                        metalness = 0.85;
                        clearcoat = 0.1;
                    } else if (finish === "polished") {
                        roughness = 0.08;
                        metalness = 0.95;
                        clearcoat = 1.0;
                        clearcoatRoughness = 0.02;
                    }

                    return new THREE.MeshPhysicalMaterial({
                        color: color,
                        roughness: roughness,
                        metalness: metalness,
                        clearcoat: clearcoat,
                        clearcoatRoughness: clearcoatRoughness,
                        wireframe: renderMode === "wireframe",
                        transparent: renderMode === "wireframe",
                        opacity: renderMode === "wireframe" ? 0.28 : 1,
                        side: THREE.DoubleSide,
                    });
                };

                if (Array.isArray(originalMat)) {
                    overrideMat = originalMat.map(mat => processSingleMaterial(mat));
                } else {
                    overrideMat = processSingleMaterial(originalMat);
                }

                mesh.userData._currentMaterial = overrideMat;
                mesh.material = overrideMat;
            }
        });
    }, [gltf.scene, color, renderMode, finish]);

    return <primitive object={gltf.scene} />;
}

export default function CardHolderModel({
    color = "#B48A63",
    renderMode = "normal",
    modelSrc,
    finish = "standard",
    autoRotate = true,
}: CardHolderModelProps) {
    const groupRef = useRef<THREE.Group>(null);

    useFrame(() => {
        if (groupRef.current && autoRotate) {
            groupRef.current.rotation.y += 0.008;
        }
    });

    const isGlass = renderMode === "glass";
    const isWireframe = renderMode === "wireframe";

    let roughness = 0.35;
    let metalness = 0.15;
    let clearcoat = 0;
    let clearcoatRoughness = 0;

    if (finish === "matte") {
        roughness = 0.85;
        metalness = 0.1;
    } else if (finish === "brushed") {
        roughness = 0.35;
        metalness = 0.85;
        clearcoat = 0.1;
    } else if (finish === "polished") {
        roughness = 0.08;
        metalness = 0.95;
        clearcoat = 1.0;
        clearcoatRoughness = 0.02;
    }

    return (
        <group ref={groupRef}>
            {modelSrc ? (
                <LoadedModel modelSrc={modelSrc} color={color} renderMode={renderMode} finish={finish} />
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
                            <meshPhysicalMaterial
                                color={color}
                                wireframe={isWireframe}
                                transparent={isWireframe}
                                opacity={isWireframe ? 0.28 : 1}
                                roughness={roughness}
                                metalness={metalness}
                                clearcoat={clearcoat}
                                clearcoatRoughness={clearcoatRoughness}
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
