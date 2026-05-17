"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import useResolvedColor from "@/hooks/useResolvedColor";

type EffectType = "wave" | "magnetic" | "ripple" | "vortex" | "pulse";

interface ReactiveBackgroundProps {
    active?: boolean;
    color?: string;
    blockCount?: number;
    opacity?: number;
    mode?: "fixed" | "absolute";
    effect?: EffectType;
    intensity?: number;
}

interface ReactiveBlocksProps {
    active: boolean;
    color: string;
    blockCount: number;
    opacity: number;
    effect: EffectType;
    intensity: number;
}

function ReactiveBlocks({
    active,
    color,
    blockCount,
    opacity,
    effect,
    intensity,
}: ReactiveBlocksProps) {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const { viewport } = useThree();

    const rawPointer = useRef({ x: -1000, y: -1000 });
    const smoothPointer = useRef({ x: -1000, y: -1000, vx: 0, vy: 0 });
    const dummyRef = useRef(new THREE.Object3D());
    const frameColorRef = useRef(new THREE.Color());

    const resolved = useResolvedColor(color);
    const { darkColor, lightColor, accentColor } = useMemo(() => {
        const base = new THREE.Color(resolved || "#ffffff");
        return {
            darkColor: base.clone().multiplyScalar(0.12),
            lightColor: base.clone().multiplyScalar(0.8),
            accentColor: base.clone().offsetHSL(0.1, 0.5, 0.2),
        };
    }, [resolved]);

    const total = blockCount * blockCount;
    const span = Math.max(viewport.width, viewport.height) * 1.3;
    const cell = span / blockCount;
    const baseScale = 0.85;

    const positions = useMemo(() => {
        const next = new Float32Array(total * 2);
        for (let i = 0; i < total; i += 1) {
            const col = i % blockCount;
            const row = Math.floor(i / blockCount);
            next[i * 2] = -span / 2 + col * cell + cell * 0.5;
            next[i * 2 + 1] = span / 2 - row * cell - cell * 0.5;
        }
        return next;
    }, [blockCount, cell, span, total]);

    useEffect(() => {
        if (!active) return;

        const handlePointerMove = (e: PointerEvent) => {
            rawPointer.current.x = (e.clientX / window.innerWidth) * viewport.width - viewport.width / 2;
            rawPointer.current.y = -(e.clientY / window.innerHeight) * viewport.height + viewport.height / 2;
        };

        window.addEventListener("pointermove", handlePointerMove, { passive: true });
        return () => window.removeEventListener("pointermove", handlePointerMove);
    }, [active, viewport]);

    useFrame((state, delta) => {
        if (!active || !meshRef.current) return;

        const time = state.clock.getElapsedTime();
        const mesh = meshRef.current;
        const pointer = smoothPointer.current;
        const dummy = dummyRef.current;
        const frameColor = frameColorRef.current;

        const lerpFactor = 1 - Math.exp(-10 * delta);
        const prevX = pointer.x;
        const prevY = pointer.y;

        pointer.x = THREE.MathUtils.lerp(pointer.x, rawPointer.current.x, lerpFactor);
        pointer.y = THREE.MathUtils.lerp(pointer.y, rawPointer.current.y, lerpFactor);
        pointer.vx = (pointer.x - prevX) / delta;
        pointer.vy = (pointer.y - prevY) / delta;

        const influenceRadius = cell * (3 + intensity * 2);
        const velocityStrength = Math.hypot(pointer.vx, pointer.vy) * 0.05;

        for (let i = 0; i < total; i += 1) {
            const x = positions[i * 2];
            const y = positions[i * 2 + 1];

            const dx = x - pointer.x;
            const dy = y - pointer.y;
            const distance = Math.hypot(dx, dy);

            let scale = baseScale;
            let rotation = 0;
            let zOffset = 0;

            const influence = THREE.MathUtils.smoothstep(influenceRadius - distance, 0, influenceRadius);

            if (influence > 0.01) {
                switch (effect) {
                    case "wave":
                        zOffset = Math.sin(distance * 0.5 - time * 3) * influence * 1.5;
                        scale = baseScale + influence * 0.4 + zOffset * 0.1;
                        rotation = Math.sin(time * 2 + i) * influence * 0.5;
                        break;
                    case "magnetic":
                        const pull = influence * intensity * 0.4;
                        dummy.position.set(x - dx * pull, y - dy * pull, 0);
                        scale = baseScale + influence * 0.6;
                        rotation = Math.atan2(dy, dx);
                        break;
                    case "ripple":
                        const ripple = Math.sin(distance * 0.2 - time * 5) * influence;
                        scale = baseScale + Math.abs(ripple) * 0.8;
                        rotation = ripple * Math.PI * 0.25;
                        zOffset = ripple * 0.5;
                        break;
                    case "vortex":
                        const angle = Math.atan2(dy, dx) + time * 2 * influence;
                        rotation = angle + distance * 0.01;
                        scale = baseScale + influence * 0.5 + Math.sin(angle * 3 + time * 2) * 0.2;
                        zOffset = Math.sin(angle * 2 - time * 3) * influence * 0.5;
                        break;
                    case "pulse":
                        const pulse = Math.sin(time * 5 + distance * 0.2) * 0.5 + 0.5;
                        scale = baseScale + influence * 0.5 + pulse * 0.3 * influence;
                        rotation = velocityStrength * influence * 0.2;
                        zOffset = pulse * influence * 0.4;
                        break;
                }

                if (influence > 0.8) {
                    frameColor.copy(accentColor).lerp(lightColor, (1 - influence) * 5);
                } else {
                    frameColor.copy(darkColor).lerp(accentColor, influence);
                }
            } else {
                const ambient = Math.sin(time * 1.5 + x * 0.05 + y * 0.05) * 0.05;
                scale = baseScale + ambient;
                rotation = ambient * 0.2;
                frameColor.copy(darkColor);
            }

            if (effect !== "magnetic") {
                dummy.position.set(x, y, zOffset);
            }

            dummy.scale.set(cell * scale, cell * scale, 1);
            dummy.rotation.z = rotation;
            dummy.updateMatrix();

            mesh.setMatrixAt(i, dummy.matrix);
            mesh.setColorAt(i, frameColor);
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
    color = "var(--color-brand-primary)",
    blockCount = 12,
    opacity = 0.2,
    mode = "absolute",
    effect = "magnetic",
    intensity = 1,
}: ReactiveBackgroundProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(true);
    const positionClass = mode === "fixed" ? "fixed" : "absolute";
    const shouldAnimate = active && isVisible;

    useEffect(() => {
        const containerEl = containerRef.current;
        if (!containerEl) return;

        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0.1 }
        );

        observer.observe(containerEl);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={containerRef}
            aria-hidden="true"
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
            >
                <ReactiveBlocks
                    active={shouldAnimate}
                    color={color}
                    blockCount={blockCount}
                    opacity={opacity}
                    effect={effect}
                    intensity={intensity}
                />
            </Canvas>
        </div>
    );
}
