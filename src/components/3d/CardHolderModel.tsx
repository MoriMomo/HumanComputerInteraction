"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface CardHolderModelProps {
    color?: string;
    renderMode?: "normal" | "glass" | "wireframe";
}

export default function CardHolderModel({
    color = "#B48A63",
    renderMode = "normal",
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
        </group>
    );
}
