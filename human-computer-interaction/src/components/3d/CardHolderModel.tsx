"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Center } from "@react-three/drei";
import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { DEFAULT_STL_PARTS } from "./modelAssets";

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
    modelPaths = [...DEFAULT_STL_PARTS],
    modelRotation = [0, 0, 0],
    modelOffset = [0, 0, 0],
    modelScaleMultiplier = 2,
}: CardHolderModelProps) {
    const groupRef = useRef<THREE.Group>(null);
    const isPointerDown = useRef(false);

    // Load STL geometries
    const loadedGeometries = useLoader(STLLoader, modelPaths);

    // Merge all STL parts into a single geometry for faster rendering.
    const mergedGeometry = useMemo(() => {
        const preparedGeometries = loadedGeometries.map((geo) => {
            const cloned = geo.clone();
            cloned.computeVertexNormals();
            return cloned;
        });

        const legacyMergeFn = (
            BufferGeometryUtils as unknown as {
                mergeBufferGeometries?: typeof BufferGeometryUtils.mergeGeometries;
            }
        ).mergeBufferGeometries;
        const mergeFn = BufferGeometryUtils.mergeGeometries || legacyMergeFn;
        const merged = mergeFn(preparedGeometries, false);

        preparedGeometries.forEach((geo) => geo.dispose());

        if (!merged) {
            throw new Error("Failed to merge STL geometries.");
        }

        return merged;
    }, [loadedGeometries]);

    // Cleanup merged geometry from GPU memory on unmount.
    useEffect(() => {
        return () => {
            mergedGeometry.dispose();
        };
    }, [mergedGeometry]);

    // Smooth throttled rotation.
    const rotationSpeed = useRef(0);
    useFrame((_, delta) => {
        if (!groupRef.current) return;
        if (autoRotate && !isPointerDown.current) {
            const cappedDelta = Math.min(delta, 1 / 30);
            rotationSpeed.current = THREE.MathUtils.lerp(
                rotationSpeed.current,
                0.35,
                0.1
            );
            groupRef.current.rotation.y += cappedDelta * rotationSpeed.current;
        } else {
            rotationSpeed.current = 0;
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
        >
            <Center scale={modelScaleMultiplier}>
                <mesh geometry={mergedGeometry} castShadow receiveShadow>
                    {renderMode === "wireframe" && (
                        <meshStandardMaterial
                            color={color}
                            roughness={0.4}
                            metalness={0.8}
                            wireframe={true}
                        />
                    )}
                    {renderMode === "glass" && (
                        <meshPhysicalMaterial
                            color={color}
                            transmission={0.95}
                            transparent={true}
                            opacity={0.7}
                            roughness={0.05}
                            metalness={0.1}
                            thickness={0.5}
                            ior={1.5}
                            envMapIntensity={1.5}
                            clearcoat={1.0}
                            clearcoatRoughness={0.1}
                        />
                    )}
                    {renderMode === "normal" && (
                        <meshStandardMaterial
                            color={color}
                            roughness={0.2}
                            metalness={0.95}
                            envMapIntensity={1.2}
                        />
                    )}
                </mesh>
            </Center>
        </group>
    );
}