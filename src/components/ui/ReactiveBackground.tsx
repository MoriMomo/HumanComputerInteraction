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
    const materialRef = useRef<THREE.MeshBasicMaterial>(null);
    const { viewport } = useThree();

    const pointerRef = useRef({ x: -1000, y: -1000 });
    const dummyRef = useRef(new THREE.Object3D());
    const colorBase = useMemo(() => new THREE.Color(color), [color]);
    const defaultColor = useMemo(() => new THREE.Color(color).multiplyScalar(0.3), [color]);

    const total = blockCount * blockCount;

    // Calculate cell size based on viewport
    const span = Math.max(viewport.width, viewport.height) * 1.2;
    const cell = span / blockCount;

    // Pre-calculate positions
    const positions = useMemo(() => {
        const next: Float32Array[] = [];
        for (let i = 0; i < total; i += 1) {
            const col = i % blockCount;
            const x = -span / 2 + col * cell + cell * 0.5;
            const y = span / 2 - Math.floor(i / blockCount) * cell - cell * 0.5;
            next.push(new Float32Array([x, y, col]));
        }
        return next;
    }, [blockCount, cell, span, total]);

    // Handle mouse movement
    const handlePointerMove = useCallback((event: PointerEvent) => {
        pointerRef.current.x = event.clientX;
        pointerRef.current.y = event.clientY;
    }, []);

    useEffect(() => {
        if (!active) {
            return;
        }

        window.addEventListener("pointermove", handlePointerMove, { passive: true });
        return () => window.removeEventListener("pointermove", handlePointerMove);
    }, [active, handlePointerMove]);

    useFrame(() => {
        if (!active) return;

        const mesh = meshRef.current;
        const material = materialRef.current;
        if (!mesh || !material) return;

        const dummy = dummyRef.current;
        const pointer = pointerRef.current;

        // Convert screen coords to world coords
        const worldX = (pointer.x / window.innerWidth) * viewport.width - viewport.width / 2;
        const worldY = -(pointer.y / window.innerHeight) * viewport.height + viewport.height / 2;

        for (let i = 0; i < positions.length; i += 1) {
            const pos = positions[i];
            const x = pos[0];
            const y = pos[1];
            const col = pos[2];

            // Calculate distance from mouse
            const dx = x - worldX;
            const dy = y - worldY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Only animate blocks near cursor (performance optimization)
            const influenceRadius = cell * 2.5;

            if (distance < influenceRadius) {
                // Block is near mouse - animate it
                const influence = 1 - distance / influenceRadius;
                const scale = 0.6 + influence * 0.6;
                const z = influence * 0.3;

                dummy.position.set(x, y, z);
                dummy.scale.set(cell * scale, cell * scale, 1);
                dummy.rotation.z = influence * 0.2 * (col % 2 === 0 ? 1 : -1);

                // Brighter color when hovered
                const hoverColor = colorBase.clone().multiplyScalar(0.6 + influence * 0.6);
                mesh.setColorAt(i, hoverColor);
            } else {
                // Block is far from mouse - reset to default
                dummy.position.set(x, y, 0);
                dummy.scale.set(cell * 0.6, cell * 0.6, 1);
                dummy.rotation.z = 0;

                // Dim color when not hovered
                mesh.setColorAt(i, defaultColor);
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
                ref={materialRef}
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
    color = "#34d399",
    blockCount = 12,
    opacity = 0.15,
    mode = "absolute",
}: ReactiveBackgroundProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(true);
    const positionClass = mode === "fixed" ? "fixed" : "absolute";
    const shouldAnimate = active && isVisible;

    useEffect(() => {
        const containerEl = containerRef.current;
        if (!containerEl) {
            return;
        }

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
                dpr={[1, 1.5]}
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