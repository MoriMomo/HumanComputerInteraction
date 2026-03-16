"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import gsap from "gsap";
import * as THREE from "three";

interface ReactiveBackgroundProps {
    color?: string;
    blockCount?: number;
    opacity?: number;
}

interface ReactiveBlocksProps {
    color: string;
    blockCount: number;
    opacity: number;
}

function ReactiveBlocks({ color, blockCount, opacity }: ReactiveBlocksProps) {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const materialRef = useRef<THREE.MeshBasicMaterial>(null);

    const pointerRef = useRef({ x: 0, y: 0 });
    const scrollRef = useRef({ value: 0 });

    const dummy = useMemo(() => new THREE.Object3D(), []);
    const colorBase = useMemo(() => new THREE.Color(color), [color]);

    const total = blockCount * blockCount;
    const span = 8;
    const cell = span / blockCount;

    const positions = useMemo(() => {
        const next: Array<{ x: number; y: number; row: number; col: number }> = [];

        for (let i = 0; i < total; i += 1) {
            const row = Math.floor(i / blockCount);
            const col = i % blockCount;

            const x = -span / 2 + col * cell + cell * 0.5;
            const y = span / 2 - row * cell - cell * 0.5;

            next.push({ x, y, row, col });
        }

        return next;
    }, [blockCount, cell, span, total]);

    useEffect(() => {
        const onPointerMove = (event: MouseEvent) => {
            const nx = (event.clientX / window.innerWidth - 0.5) * 2;
            const ny = (event.clientY / window.innerHeight - 0.5) * 2;

            gsap.to(pointerRef.current, {
                x: nx,
                y: ny,
                duration: 0.8,
                ease: "power2.out",
                overwrite: true,
            });
        };

        const onScroll = () => {
            const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
            const progress = window.scrollY / max;

            gsap.to(scrollRef.current, {
                value: progress,
                duration: 0.5,
                ease: "power2.out",
                overwrite: true,
            });
        };

        onScroll();

        window.addEventListener("mousemove", onPointerMove, { passive: true });
        window.addEventListener("scroll", onScroll, { passive: true });

        return () => {
            window.removeEventListener("mousemove", onPointerMove);
            window.removeEventListener("scroll", onScroll);
        };
    }, []);

    useFrame(({ clock }) => {
        const mesh = meshRef.current;
        const material = materialRef.current;
        if (!mesh || !material) return;

        const t = clock.elapsedTime;
        const pointer = pointerRef.current;
        const scroll = scrollRef.current.value;

        material.opacity = opacity * (0.65 + scroll * 0.8);

        for (let i = 0; i < positions.length; i += 1) {
            const { x, y, row, col } = positions[i];

            const wave = 0.5 + 0.5 * Math.sin(t * 0.9 + row * 0.48 + col * 0.32 + scroll * 8);
            const scale = 0.62 + wave * 0.45;
            const z = wave * 0.28;

            const px = x + pointer.x * (col % 2 === 0 ? 0.28 : -0.28);
            const py = y + pointer.y * (row % 2 === 0 ? 0.28 : -0.28);

            dummy.position.set(px, py, z);
            dummy.scale.set(cell * scale, cell * scale, 1);
            dummy.updateMatrix();

            mesh.setMatrixAt(i, dummy.matrix);

            const c = colorBase.clone().multiplyScalar(0.55 + wave * 0.7);
            mesh.setColorAt(i, c);
        }

        mesh.instanceMatrix.needsUpdate = true;
        if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, total]}>
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial ref={materialRef} transparent toneMapped={false} />
        </instancedMesh>
    );
}

export default function ReactiveBackground({
    color = "#34d399",
    blockCount = 12,
    opacity = 0.14,
}: ReactiveBackgroundProps) {
    return (
        <div
            aria-hidden
            className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
        >
            <Canvas
                orthographic
                camera={{ position: [0, 0, 10], zoom: 75 }}
                dpr={[1, 1.5]}
                gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
            >
                <ReactiveBlocks color={color} blockCount={blockCount} opacity={opacity} />
            </Canvas>
        </div>
    );
}