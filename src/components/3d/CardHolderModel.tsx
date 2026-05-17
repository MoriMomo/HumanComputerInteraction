"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface CardHolderModelProps {
    color?: string;
}

export default function CardHolderModel({ color = "#B48A63" }: CardHolderModelProps) {
    const groupRef = useRef<THREE.Group>(null);

    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.01;
        }
    });

    return (
        <group ref={groupRef}>
            <mesh>
                <boxGeometry args={[2, 2, 2]} />
                <meshStandardMaterial color={color} />
            </mesh>
        </group>
    );
}
