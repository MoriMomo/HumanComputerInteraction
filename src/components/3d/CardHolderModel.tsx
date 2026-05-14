"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import useResolvedColor from "@/hooks/useResolvedColor";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import type { GLTF } from "three-stdlib";
import * as THREE from "three";

const GLB_MODEL = "/satset3d/glb/bener-final-optimized.glb";

useGLTF.preload(GLB_MODEL);

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
    renderMode = "normal",
    modelRotation = [0, 0, 0],
    modelOffset = [0, 0, 0],
    modelScaleMultiplier = 4,
    onReady,
}: CardHolderModelProps) {
    const animatedGroupRef = useRef<THREE.Group>(null);
    const materialsRef = useRef<Map<string, THREE.Material>>(new Map());
    const readyNotifiedRef = useRef(false);
    const normalsComputedRef = useRef(false);

    // Load model
    const { scene } = useGLTF(GLB_MODEL, true) as unknown as GLTF & {
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
                    // DEFERRED: Vertex normals computed post-render to avoid main-thread blocking
                    // (see useEffect below for deferred computation)

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

            if (process.env.NODE_ENV === "development") {
                console.log("Model bounding box:", {
                    center: center.toArray(),
                    size: size.toArray(),
                    maxDim,
                    normalizedScale,
                });
            }
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

    // FIX 1: Clear material cache when color or mode changes to force fresh creation
    useEffect(() => {
        materialsRef.current.forEach((mat) => mat.dispose());
        materialsRef.current.clear();
    }, [color, renderMode]);

    // Resolve CSS variable color strings (e.g. "var(--color-foo)") to actual color values
    const resolveCssColor = useCallback((input?: string) => {
        if (!input) return undefined;
        const t = input.trim();
        if (!t) return undefined;
        if (t.startsWith("var(")) {
            try {
                const m = t.match(/^var\(\s*([^,\)]+)\s*(?:,\s*([^\)]+))?\s*\)$/);
                const varName = m ? m[1].trim() : null;
                if (varName && typeof window !== "undefined") {
                    const val = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
                    if (val) return val;
                }
            } catch {
                // fall through
            }
            return t;
        }

        return t;
    }, []);

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
                let tintColor: THREE.Color;
                try {
                    const parsed = resolveCssColor(nextColor) ?? nextColor;
                    tintColor = new THREE.Color(parsed);
                } catch {
                    tintColor = new THREE.Color("#ffffff");
                }

                // FIX 2: Use swatch color directly — no buried blends
                const blendedColor = tintColor.clone();
                const maps = getMaterialMaps(sourceMaterial);

                let material: THREE.Material;

                if (isGlass) {
                    const glassMaterial = new THREE.MeshPhysicalMaterial({
                        color: blendedColor,
                        transparent: false,
                        roughness: 0.05,
                        metalness: 0.0,
                        transmission: 0.92,
                        thickness: 1.2,
                        ior: 1.45,
                        envMapIntensity: 2.5,
                        reflectivity: 0.5,
                        side: THREE.FrontSide,
                    });

                    material = glassMaterial;
                } else {
                    const emissiveTone = blendedColor.clone().multiplyScalar(isWire ? 0.02 : 0.08);
                    const standardMaterial = new THREE.MeshStandardMaterial({
                        color: blendedColor,
                        wireframe: isWire,
                        transparent: false,
                        roughness: isWire ? 0.2 : 0.28,
                        metalness: isWire ? 0.18 : 0.32,
                        emissive: emissiveTone,
                        emissiveIntensity: isWire ? 0.28 : 0.7,
                        envMapIntensity: isWire ? 1.0 : 1.6,
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
        [getMaterialMaps, resolveCssColor]
    );

    // Apply materials to all meshes
    useEffect(() => {
        meshEntries.forEach(({ mesh, sourceMaterial }) => {
            mesh.material = getMaterial(renderMode, resolvedPropColor, sourceMaterial);
            mesh.material.needsUpdate = true;
        });
    }, [color, getMaterial, meshEntries, renderMode, resolvedPropColor]);

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

    // Deferred: compute vertex normals only when the geometry does not already contain them.
    useEffect(() => {
        if (normalsComputedRef.current) {
            return;
        }

        // Use requestIdleCallback if available, otherwise defer with setTimeout
        const scheduleNormalCompute = (callback: () => void) => {
            if (typeof window !== "undefined") {
                const ric = (window as unknown as { requestIdleCallback?: (cb: () => void, opts?: { timeout?: number }) => number }).requestIdleCallback;
                if (ric) {
                    ric(callback, { timeout: 3000 });
                    return;
                }
            }

            globalThis.setTimeout(callback, 100);
        };

        const computeNormals = () => {
            if (normalsComputedRef.current) return;

            const startTime = performance.now();
            let processedCount = 0;

            modelGroup.traverse((child) => {
                if (!(child instanceof THREE.Mesh) || !child.geometry) {
                    return;
                }

                if (child.geometry.attributes.normal) {
                    return;
                }

                child.geometry.computeVertexNormals();
                child.geometry.normalizeNormals();
                processedCount++;
            });

            const duration = performance.now() - startTime;
            if (process.env.NODE_ENV === "development") {
                console.log(`✓ Deferred normals computed for ${processedCount} meshes in ${duration.toFixed(2)}ms`);
            }

            normalsComputedRef.current = true;
        };

        scheduleNormalCompute(computeNormals);
    }, [modelGroup]);

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

    // Animation loop — auto-rotation now handled by OrbitControls
    useFrame(() => {
        // rotation handled by OrbitControls.autoRotate
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

// Preload model at module level
useGLTF.preload(GLB_MODEL);
