"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import useResolvedColor from "@/hooks/useResolvedColor";
import { useFrame } from "@react-three/fiber";
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
    onReady?: () => void;
}

export default function CardHolderModel({
    color = "var(--color-brand-primary)",
    autoRotate = true,
    renderMode = "normal",
    modelRotation = [0, 0, 0],
    modelOffset = [0, 0, 0],
    modelScaleMultiplier = 4,
    onReady,
}: CardHolderModelProps) {
    const animatedGroupRef = useRef<THREE.Group>(null);
    const rotationVelocityRef = useRef(0);
    const materialsRef = useRef<Map<string, THREE.Material>>(new Map());
    const readyNotifiedRef = useRef(false);

    // Load model
    const { scene } = useGLTF(GLB_MODEL) as unknown as GLTF & {
        nodes: { [key: string]: THREE.Mesh };
        materials: { [key: string]: THREE.Material };
    };

    // Properly clone and setup all meshes
    const { modelGroup, baseScale, meshEntries } = useMemo(() => {
        const group = new THREE.Group();
        const nextMeshEntries: Array<{ mesh: THREE.Mesh; sourceMaterial: THREE.Material | null }> = [];

        // Clone the entire scene
        const clonedScene = scene.clone(true);

        clonedScene.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                // Ensure geometry is valid
                if (child.geometry) {
                    // Fix normals (prevent inside-out rendering)
                    child.geometry.computeVertexNormals();
                    child.geometry.normalizeNormals();

                    // PERFORMANCE: Disable shadows
                    child.castShadow = false;
                    child.receiveShadow = false;

                    // PERFORMANCE: Enable frustum culling
                    child.frustumCulled = true;

                    const clonedMesh = child.clone();
                    const sourceMaterial = Array.isArray(child.material)
                        ? child.material[0] ?? null
                        : child.material ?? null;

                    if (sourceMaterial) {
                        sourceMaterial.side = THREE.DoubleSide;
                    }

                    nextMeshEntries.push({ mesh: clonedMesh, sourceMaterial });
                    group.add(clonedMesh);
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

        return {
            modelGroup: group,
            baseScale: normalizedScale,
            meshEntries: nextMeshEntries,
        };
    }, [scene]);

    const getMaterialMaps = useCallback((material: THREE.Material | null) => {
        const typedMaterial = material as Partial<THREE.MeshStandardMaterial & THREE.MeshPhysicalMaterial> | null;

        return {
            map: typedMaterial?.map ?? null,
            normalMap: typedMaterial?.normalMap ?? null,
            roughnessMap: typedMaterial?.roughnessMap ?? null,
            metalnessMap: typedMaterial?.metalnessMap ?? null,
            aoMap: typedMaterial?.aoMap ?? null,
            envMap: typedMaterial?.envMap ?? null,
            emissiveMap: typedMaterial?.emissiveMap ?? null,
        };
    }, []);

    const resolvedPropColor = useResolvedColor(color);

    const getMaterial = useCallback(
        (
            mode: NonNullable<CardHolderModelProps["renderMode"]>,
            nextColor: string,
            sourceMaterial: THREE.Material | null
        ) => {
            const key = `${mode}-${nextColor}-${sourceMaterial?.uuid ?? "base"}`;

            if (!materialsRef.current.has(key)) {
                const isGlass = mode === "glass";
                const isWire = mode === "wireframe";
                const sourceStandard = sourceMaterial as Partial<THREE.MeshStandardMaterial & THREE.MeshPhysicalMaterial> | null;
                const sourceColor = sourceStandard?.color?.clone() ?? new THREE.Color("var(--color-brand-cream)");
                let tintColor: THREE.Color;
                try {
                    tintColor = new THREE.Color(nextColor);
                } catch {
                    tintColor = new THREE.Color("#ffffff");
                }
                const blendedColor = sourceColor.lerp(tintColor, isWire ? 0.88 : 0.72);
                const maps = getMaterialMaps(sourceMaterial);

                let material: THREE.Material;

                if (isGlass) {
                    const glassMaterial = new THREE.MeshPhysicalMaterial({
                        color: blendedColor,
                        transparent: true,
                        opacity: 0.42,
                        roughness: 0.06,
                        metalness: 0.12,
                        transmission: 0.84,
                        thickness: 0.88,
                        ior: 1.32,
                        envMapIntensity: 1.8,
                        side: THREE.DoubleSide,
                    });

                    glassMaterial.map = maps.map;
                    glassMaterial.normalMap = maps.normalMap;
                    glassMaterial.roughnessMap = maps.roughnessMap;
                    glassMaterial.metalnessMap = maps.metalnessMap;
                    glassMaterial.aoMap = maps.aoMap;
                    glassMaterial.envMap = maps.envMap;

                    material = glassMaterial;
                } else {
                    const standardMaterial = new THREE.MeshStandardMaterial({
                        color: blendedColor,
                        wireframe: isWire,
                        transparent: false,
                        roughness: sourceStandard?.roughness ?? (isWire ? 0.2 : 0.24),
                        metalness: sourceStandard?.metalness ?? (isWire ? 0.25 : 0.5),
                        envMapIntensity: isWire ? 1.2 : 1.45,
                        side: THREE.DoubleSide,
                        flatShading: false,
                        polygonOffset: true,
                        polygonOffsetFactor: 1,
                        polygonOffsetUnits: 1,
                    });

                    standardMaterial.map = maps.map;
                    standardMaterial.normalMap = maps.normalMap;
                    standardMaterial.roughnessMap = maps.roughnessMap;
                    standardMaterial.metalnessMap = maps.metalnessMap;
                    standardMaterial.aoMap = maps.aoMap;
                    standardMaterial.emissiveMap = maps.emissiveMap;
                    standardMaterial.envMap = maps.envMap;

                    material = standardMaterial;
                }

                materialsRef.current.set(
                    key,
                    material
                );
            }

            return materialsRef.current.get(key)!;
        },
        [getMaterialMaps]
    );

    // Apply materials to all meshes
    useEffect(() => {
        meshEntries.forEach(({ mesh, sourceMaterial }) => {
            mesh.material = getMaterial(renderMode, resolvedPropColor, sourceMaterial);
            mesh.material.needsUpdate = true;
        });
    }, [color, getMaterial, meshEntries, renderMode]);

    useEffect(() => {
        if (readyNotifiedRef.current) {
            return;
        }

        readyNotifiedRef.current = true;
        onReady?.();
    }, [onReady]);

    // Cleanup materials
    useEffect(() => {
        const materialCache = materialsRef.current;
        return () => {
            materialCache.forEach((material) => material.dispose());
            materialCache.clear();
        };
    }, []);

    // Debug model stats
    useEffect(() => {
        if (process.env.NODE_ENV !== "development") return;

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
    }, [modelGroup]);

    // Animation loop
    useFrame((state, delta) => {
        const group = animatedGroupRef.current;
        if (!group) return;

        const clampedDelta = Math.min(delta, 1 / 30);
        const targetVelocity = autoRotate ? 0.68 : 0;

        rotationVelocityRef.current = THREE.MathUtils.damp(
            rotationVelocityRef.current,
            targetVelocity,
            7.5,
            clampedDelta
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
            >
                <primitive object={modelGroup} />
            </group>
        </group>
    );
}

useGLTF.preload(GLB_MODEL);
