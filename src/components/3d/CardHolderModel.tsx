"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import type { GLTF } from "three-stdlib";
import * as THREE from "three";

const GLB_MODEL = "/satset3d/glb/bener-final.glb";

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
    const materialsRef = useRef<Map<string, THREE.MeshStandardMaterial>>(new Map());
    const [isHovered, setIsHovered] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load model
    const { scene } = useGLTF(GLB_MODEL) as unknown as GLTF & {
        nodes: { [key: string]: THREE.Mesh };
        materials: { [key: string]: THREE.Material };
    };

    const { gl } = useThree();

    // Properly clone and setup all meshes
    const { modelGroup, baseScale } = useMemo(() => {
        const group = new THREE.Group();
        
        // Clone the entire scene
        const clonedScene = scene.clone(true);
        
        clonedScene.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                // Ensure geometry is valid
                if (child.geometry) {
                    // Fix normals (prevent inside-out rendering)
                    child.geometry.computeVertexNormals();
                    
                    // PERFORMANCE: Disable shadows
                    child.castShadow = false;
                    child.receiveShadow = false;
                    
                    // PERFORMANCE: Enable frustum culling
                    child.frustumCulled = true;
                    
                    // Ensure double-sided rendering
                    if (child.material) {
                        child.material.side = THREE.DoubleSide;
                    }
                    
                    group.add(child.clone());
                }
            }
        });

        // Better bounding box calculation
        const box = new THREE.Box3().setFromObject(group);
        let normalizedScale = 1;

        if (!box.isEmpty()) {
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());
            const maxDim = Math.max(size.x, size.y, size.z);

            // Center the model at origin
            group.position.set(-center.x, -center.y, -center.z);
            
            // Scale to fit view
            normalizedScale = maxDim > 0 ? 2.0 / maxDim : 1;
            
            console.log("Model bounding box:", {
                center: center.toArray(),
                size: size.toArray(),
                maxDim,
                normalizedScale,
            });
        }

        setIsLoaded(true);

        return {
            modelGroup: group,
            baseScale: normalizedScale,
        };
    }, [scene]);

    const getMaterial = useCallback(
        (mode: NonNullable<CardHolderModelProps["renderMode"]>, nextColor: string) => {
            const key = `${mode}-${nextColor}`;

            if (!materialsRef.current.has(key)) {
                const isGlass = mode === "glass";
                const isWire = mode === "wireframe";

                materialsRef.current.set(
                    key,
                    new THREE.MeshStandardMaterial({
                        color: new THREE.Color(nextColor),
                        wireframe: isWire,
                        transparent: isGlass,
                        opacity: isGlass ? 0.56 : 1,
                        roughness: isGlass ? 0.08 : 0.28,
                        metalness: isGlass ? 0.12 : 0.46,
                        envMapIntensity: isGlass ? 1.55 : 1.08,
                        side: THREE.DoubleSide,
                        polygonOffset: true,
                        polygonOffsetFactor: 1,
                        polygonOffsetUnits: 1,
                    })
                );
            }

            return materialsRef.current.get(key)!;
        },
        []
    );

    // Apply materials to all meshes
    useEffect(() => {
        if (!isLoaded) return;
        
        const material = getMaterial(renderMode, color);

        modelGroup.traverse((child) => {
            if (child instanceof THREE.Mesh && child.geometry) {
                child.material = material;
                child.material.needsUpdate = true;
            }
        });
    }, [color, getMaterial, modelGroup, renderMode, isLoaded]);

    // Cleanup materials
    useEffect(() => {
        const materialCache = materialsRef.current;
        return () => {
            materialCache.forEach((material) => material.dispose());
            materialCache.clear();
        };
    }, []);

    // PERFORMANCE: Reduce DPR on mobile
    useEffect(() => {
        const initialPixelRatio = gl.getPixelRatio();
        const isMobile = window.matchMedia("(max-width: 768px), (pointer: coarse)").matches;

        if (isMobile) {
            gl.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        }

        return () => {
            gl.setPixelRatio(initialPixelRatio);
        };
    }, [gl]);

    // Debug model stats
    useEffect(() => {
        if (process.env.NODE_ENV !== "development" || !isLoaded) return;

        let totalVertices = 0;
        let totalTriangles = 0;
        let meshCount = 0;

        modelGroup.traverse((child) => {
            if (child instanceof THREE.Mesh && child.geometry) {
                meshCount++;
                const positions = child.geometry.attributes.position;
                if (positions) {
                    totalVertices += positions.count;
                    totalTriangles += Math.round(positions.count / 3);
                }
            }
        });

        console.log(`🎯 Model Stats: ${meshCount} meshes, ${totalVertices.toLocaleString()} vertices, ${totalTriangles.toLocaleString()} triangles`);
    }, [modelGroup, isLoaded]);

    // Animation loop
    useFrame((state, delta) => {
        const group = animatedGroupRef.current;
        if (!group || !autoRotate) return;

        const clampedDelta = Math.min(delta, 0.1);
        const hoverBoost = isHovered ? 1.5 : 1;
        const targetVelocity = 0.5 * hoverBoost;

        rotationVelocityRef.current = THREE.MathUtils.lerp(
            rotationVelocityRef.current,
            targetVelocity,
            clampedDelta * 3
        );

        group.rotation.y += rotationVelocityRef.current * clampedDelta;
    });

    if (!isLoaded) {
        return null;
    }

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
