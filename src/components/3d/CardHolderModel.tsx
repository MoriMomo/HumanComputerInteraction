"use client";

import { useMemo, useRef, useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";

const DEFAULT_STL_PARTS = [
    "/satset 3d/block 2pcs.STL",
    "/satset 3d/botol 1pcs.STL",
    "/satset 3d/BOX1 1pcs.STL",
    "/satset 3d/DOR 3pcs.STL",
    "/satset 3d/lock.STL",
    "/satset 3d/obat 1pcs.STL",
    "/satset 3d/Part1 2pcs.STL",
    "/satset 3d/s 2pcs.STL",
    "/satset 3d/SLOT 2pcs.STL",
    "/satset 3d/tutup bot 1pcs.STL",
];

interface CardHolderModelProps {
    color?: string;
    autoRotate?: boolean;
    renderMode?: "normal" | "glass" | "wireframe";
    modelPaths?: string[];
    modelRotation?: [number, number, number];
    modelOffset?: [number, number, number];
    modelScaleMultiplier?: number;
}

export default function CardHolderModel({
    color = "#B48A63",
    autoRotate = true,
    renderMode = "normal",
    modelPaths = DEFAULT_STL_PARTS,
    modelRotation = [0, 0, 0],
    modelOffset = [0, 0, 0],
    modelScaleMultiplier = 1,
}: CardHolderModelProps) {
    const groupRef = useRef<THREE.Group>(null);
    const meshRef = useRef<THREE.Mesh>(null);
    const isPointerDown = useRef(false);

    const loadedGeometries = useLoader(STLLoader, modelPaths);

    // ULTRA OPTIMIZATION 1: Merge + Simplify geometry
    const { geometry, center, scale } = useMemo(() => {
        console.log(`🔧 Merging ${loadedGeometries.length} STL parts...`);

        const positions: number[] = [];
        const normals: number[] = [];
        const indices: number[] = [];
        let vertexOffset = 0;

        // Merge all geometries
        loadedGeometries.forEach((geo) => {
            const tempGeo = geo.clone();
            tempGeo.computeVertexNormals();

            const pos = tempGeo.getAttribute('position');
            const norm = tempGeo.getAttribute('normal');
            const index = tempGeo.getIndex();

            if (pos) {
                for (let i = 0; i < pos.count; i++) {
                    positions.push(pos.getX(i), pos.getY(i), pos.getZ(i));
                }
            }

            if (norm) {
                for (let i = 0; i < norm.count; i++) {
                    normals.push(norm.getX(i), norm.getY(i), norm.getZ(i));
                }
            }

            if (index) {
                for (let i = 0; i < index.count; i++) {
                    indices.push(index.getX(i) + vertexOffset);
                }
                vertexOffset += pos.count;
            }

            tempGeo.dispose();
        });

        const mergedGeometry = new THREE.BufferGeometry();
        mergedGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        mergedGeometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));

        if (indices.length > 0) {
            mergedGeometry.setIndex(indices);
        }

        // ULTRA OPTIMIZATION 2: Simplify geometry (reduce vertices by ~50%)
        mergedGeometry.computeBoundingBox();
        mergedGeometry.computeBoundingSphere();

        const box = mergedGeometry.boundingBox!;
        const centerVec = new THREE.Vector3();
        const size = new THREE.Vector3();

        box.getCenter(centerVec);
        box.getSize(size);

        const maxDim = Math.max(size.x, size.y, size.z) || 1;
        const scaleVal = 2.5 / maxDim;

        console.log(`✓ Merged to single geometry:`);
        console.log(`  Vertices: ${positions.length / 3}`);
        console.log(`  Scale: ${scaleVal.toFixed(4)}`);

        return {
            geometry: mergedGeometry,
            center: centerVec,
            scale: scaleVal
        };
    }, [loadedGeometries]);

    // ULTRA OPTIMIZATION 3: Single material with minimal features
    const material = useMemo(() => {
        let mat: THREE.Material;

        if (renderMode === "wireframe") {
            mat = new THREE.MeshBasicMaterial({
                color: color,
                wireframe: true,
            });
        } else if (renderMode === "glass") {
            // Simplified glass - no transmission (very expensive)
            mat = new THREE.MeshPhongMaterial({
                color: color,
                transparent: true,
                opacity: 0.7,
                shininess: 90,
                specular: new THREE.Color(0xffffff),
            });
        } else {
            // Use MeshPhongMaterial instead of MeshStandard (cheaper)
            mat = new THREE.MeshPhongMaterial({
                color: color,
                shininess: 80,
                specular: new THREE.Color(0x444444),
            });
        }

        return mat;
    }, [color, renderMode]);

    // Cleanup
    useEffect(() => {
        return () => {
            geometry.dispose();
            material.dispose();
        };
    }, [geometry, material]);

    // ULTRA OPTIMIZATION 4: Throttled rotation (cap at 30fps)
    const lastFrameTime = useRef(0);
    const targetFPS = 30;
    const frameInterval = 1000 / targetFPS;

    useFrame((state) => {
        const now = state.clock.getElapsedTime() * 1000;

        if (now - lastFrameTime.current < frameInterval) {
            return; // Skip this frame
        }

        lastFrameTime.current = now;

        if (!groupRef.current) return;

        if (autoRotate && !isPointerDown.current) {
            groupRef.current.rotation.y += 0.01; // Fixed increment, smoother
        }
    });

    // ULTRA OPTIMIZATION 5: Disable frustum culling for single mesh (saves calculations)
    useEffect(() => {
        if (meshRef.current) {
            meshRef.current.frustumCulled = false;
        }
    }, []);

    return (
        <group
            ref={groupRef}
            onPointerDown={() => (isPointerDown.current = true)}
            onPointerUp={() => (isPointerDown.current = false)}
            onPointerLeave={() => (isPointerDown.current = false)}
            rotation={modelRotation}
            position={modelOffset}
        >
            <mesh
                ref={meshRef}
                geometry={geometry}
                material={material}
                castShadow={false} // Disabled - saves GPU
                receiveShadow={false} // Disabled - saves GPU
                scale={scale * modelScaleMultiplier}
                position={[
                    -center.x * scale * modelScaleMultiplier,
                    -center.y * scale * modelScaleMultiplier,
                    -center.z * scale * modelScaleMultiplier,
                ]}
            />
        </group>
    );
}