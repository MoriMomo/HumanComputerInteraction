"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface ReactiveBackgroundProps {
    active?: boolean;
    color?: string;
    blockCount?: number;
    opacity?: number;
    mode?: "fixed" | "absolute";
}

interface ReactiveBlocksProps {
    active: boolean;
    color: string;
    blockCount: number;
    opacity: number;
}

function ReactiveBlocks({ active, color, blockCount, opacity }: ReactiveBlocksProps) {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const { viewport } = useThree();

    const pointerRef = useRef({ x: -1000, y: -1000 });
    const dummyRef = useRef(new THREE.Object3D());
    const frameColorRef = useRef(new THREE.Color());

    const darkColor = useMemo(() => new THREE.Color(color).multiplyScalar(0.15), [color]);
    const lightColor = useMemo(() => new THREE.Color(color).multiplyScalar(0.6), [color]);

    const total = blockCount * blockCount;

    const span = Math.max(viewport.width, viewport.height) * 1.3;
    const cell = span / blockCount;

    const positions = useMemo(() => {
        const next: Float32Array[] = [];
        for (let i = 0; i < total; i += 1) {
            const col = i % blockCount;
            const row = Math.floor(i / blockCount);
            const x = -span / 2 + col * cell + cell * 0.5;
            const y = span / 2 - row * cell - cell * 0.5;
            next.push(new Float32Array([x, y]));
        }
        return next;
    }, [blockCount, cell, span, total]);

    const handlePointerMove = useCallback((event: PointerEvent) => {
        pointerRef.current.x = event.clientX;
        pointerRef.current.y = event.clientY;
    }, []);

    useEffect(() => {
        if (!active) return;

        window.addEventListener("pointermove", handlePointerMove, { passive: true });
        return () => window.removeEventListener("pointermove", handlePointerMove);
    }, [active, handlePointerMove]);

    useFrame(() => {
        if (!active) return;

        const mesh = meshRef.current;
        if (!mesh) return;

        const dummy = dummyRef.current;
        const pointer = pointerRef.current;
        const frameColor = frameColorRef.current;

        const worldX = (pointer.x / window.innerWidth) * viewport.width - viewport.width / 2;
        const worldY = -(pointer.y / window.innerHeight) * viewport.height + viewport.height / 2;
        const influenceRadius = cell * 3;

        for (let i = 0; i < positions.length; i += 1) {
            const pos = positions[i];
            const x = pos[0];
            const y = pos[1];

            const dx = x - worldX;
            const dy = y - worldY;
            const distance = Math.hypot(dx, dy);

            if (distance < influenceRadius) {
                const influence = 1 - distance / influenceRadius;
                const scale = 0.7 + influence * 0.4;

                dummy.position.set(x, y, 0);
                dummy.scale.set(cell * scale, cell * scale, 1);
                dummy.rotation.z = 0;

                frameColor.copy(darkColor).lerp(lightColor, influence);
                mesh.setColorAt(i, frameColor);
            } else {
                dummy.position.set(x, y, 0);
                dummy.scale.set(cell * 0.7, cell * 0.7, 1);
                dummy.rotation.z = 0;
                mesh.setColorAt(i, darkColor);
            }

            dummy.updateMatrix();
            mesh.setMatrixAt(i, dummy.matrix);
        }

        mesh.instanceMatrix.needsUpdate = true;
        if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, total]}>
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial
                transparent
                toneMapped={false}
                depthWrite={false}
                opacity={opacity}
                blending={THREE.AdditiveBlending}
            />
        </instancedMesh>
    );
}

export default function ReactiveBackground({
    active = true,
    color = "#60a5fa",
    blockCount = 10,
    opacity = 0.15,
    mode = "absolute",
}: ReactiveBackgroundProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(true);
    const positionClass = mode === "fixed" ? "fixed" : "absolute";
    const shouldAnimate = active && isVisible;

    useEffect(() => {
        const containerEl = containerRef.current;
        if (!containerEl) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.1 }
        );

        observer.observe(containerEl);

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            aria-hidden
            className={`${positionClass} inset-0 z-0 pointer-events-none overflow-hidden`}
        >
            <Canvas
                className="gpu-canvas"
                frameloop={shouldAnimate ? "always" : "never"}
                orthographic
                camera={{ position: [0, 0, 10], zoom: 100 }}
                dpr={[1, 1]}
                gl={{
                    antialias: false,
                    alpha: true,
                    powerPreference: "high-performance",
                    preserveDrawingBuffer: false,
                }}
                performance={{ min: 0.5 }}
            >
                <ReactiveBlocks
                    active={shouldAnimate}
                    color={color}
                    blockCount={blockCount}
                    opacity={opacity}
                />
            </Canvas>
        </div>
    );
}
