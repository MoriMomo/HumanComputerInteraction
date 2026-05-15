"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useResolvedColor from "@/hooks/useResolvedColor";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface ReactiveBackgroundProps {
    active?: boolean;
    color?: string;
    blockCount?: number;
    opacity?: number;
    mode?: "fixed" | "absolute";
    effect?: "wave" | "magnetic" | "ripple" | "vortex" | "pulse";
    intensity?: number;
}

interface ReactiveBlocksProps {
    active: boolean;
    color: string;
    blockCount: number;
    opacity: number;
    effect: "wave" | "magnetic" | "ripple" | "vortex" | "pulse";
    intensity: number;
}

function ReactiveBlocks({
    active,
    color,
    blockCount,
    opacity,
    effect,
    intensity
}: ReactiveBlocksProps) {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const { viewport } = useThree();

    const pointerRef = useRef({ x: -1000, y: -1000, velocityX: 0, velocityY: 0 });
    const prevPointerRef = useRef({ x: -1000, y: -1000 });
    const dummyRef = useRef(new THREE.Object3D());
    const frameColorRef = useRef(new THREE.Color());
    const timeRef = useRef(0);

    const resolved = useResolvedColor(color);
    const darkColor = useMemo(() => {
        try {
            return new THREE.Color(resolved).multiplyScalar(0.12);
        } catch {
            return new THREE.Color("#000").multiplyScalar(0.12);
        }
    }, [resolved]);

    const lightColor = useMemo(() => {
        try {
            return new THREE.Color(resolved).multiplyScalar(0.8);
        } catch {
            return new THREE.Color("#fff").multiplyScalar(0.8);
        }
    }, [resolved]);

    const accentColor = useMemo(() => {
        try {
            // Create a vibrant accent by shifting hue
            const c = new THREE.Color(resolved);
            const hsl: { h: number; s: number; l: number } = { h: 0, s: 0, l: 0 };
            c.getHSL(hsl);
            hsl.h = (hsl.h + 0.1) % 1; // Shift hue slightly
            hsl.s = Math.min(hsl.s * 1.5, 1); // More saturation
            c.setHSL(hsl.h, hsl.s, hsl.l);
            return c;
        } catch {
            return new THREE.Color("#fff");
        }
    }, [resolved]);

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
        const prev = prevPointerRef.current;
        const curr = pointerRef.current;

        // Calculate velocity for more dynamic effects
        curr.velocityX = (event.clientX - prev.x) * 0.1;
        curr.velocityY = (event.clientY - prev.y) * 0.1;

        prev.x = curr.x;
        prev.y = curr.y;
        curr.x = event.clientX;
        curr.y = event.clientY;
    }, []);

    useEffect(() => {
        if (!active) return;

        window.addEventListener("pointermove", handlePointerMove, { passive: true });
        return () => window.removeEventListener("pointermove", handlePointerMove);
    }, [active, handlePointerMove]);

    useFrame((_, delta) => {
        if (!active) return;

        const mesh = meshRef.current;
        if (!mesh) return;

        timeRef.current += delta;
        const time = timeRef.current;

        const dummy = dummyRef.current;
        const pointer = pointerRef.current;
        const frameColor = frameColorRef.current;

        const worldX = (pointer.x / window.innerWidth) * viewport.width - viewport.width / 2;
        const worldY = -(pointer.y / window.innerHeight) * viewport.height + viewport.height / 2;

        const influenceRadius = cell * (3 + intensity * 2);

        for (let i = 0; i < positions.length; i += 1) {
            const pos = positions[i];
            const x = pos[0];
            const y = pos[1];

            const dx = x - worldX;
            const dy = y - worldY;
            const distance = Math.hypot(dx, dy);

            let scale = 0.7;
            let rotation = 0;
            let zOffset = 0;
            let influence = 0;

            if (distance < influenceRadius) {
                influence = 1 - distance / influenceRadius;
                const smoothInfluence = influence * influence; // Ease out

                switch (effect) {
                    case "wave":
                        // Rippling wave effect
                        zOffset = Math.sin(distance * 0.1 - time * 3) * smoothInfluence * 0.5;
                        scale = 0.6 + smoothInfluence * 0.5 + zOffset * 0.3;
                        rotation = Math.sin(time * 2 + i * 0.1) * smoothInfluence * 0.3;
                        break;

                    case "magnetic":
                        // Blocks attracted to cursor
                        const pullStrength = smoothInfluence * intensity * 0.3;
                        const offsetX = -dx * pullStrength * 0.1;
                        const offsetY = -dy * pullStrength * 0.1;
                        dummy.position.set(x + offsetX, y + offsetY, 0);
                        scale = 0.65 + smoothInfluence * 0.5;
                        rotation = Math.atan2(dy, dx);
                        break;

                    case "ripple":
                        // Concentric ripple effect
                        const ripple = Math.sin(distance * 0.15 - time * 4) * smoothInfluence;
                        scale = 0.6 + Math.abs(ripple) * 0.6;
                        rotation = ripple * Math.PI * 0.25;
                        zOffset = ripple * 0.3;
                        break;

                    case "vortex":
                        // Spinning vortex effect
                        const angle = Math.atan2(dy, dx) + time * 2 * smoothInfluence;
                        const spiral = distance * 0.01;
                        rotation = angle + spiral;
                        scale = 0.6 + smoothInfluence * 0.5 + Math.sin(angle * 3 + time * 2) * 0.2;
                        zOffset = Math.sin(angle * 2 - time * 3) * smoothInfluence * 0.4;
                        break;

                    case "pulse":
                        // Pulsing with velocity
                        const pulse = Math.sin(time * 5 + distance * 0.2) * 0.5 + 0.5;
                        const velocityInfluence = Math.hypot(pointer.velocityX, pointer.velocityY) * 0.01;
                        scale = 0.65 + smoothInfluence * 0.5 + pulse * 0.2 * smoothInfluence;
                        rotation = velocityInfluence * smoothInfluence * Math.PI;
                        zOffset = pulse * smoothInfluence * 0.3;
                        break;
                }

                // Color interpolation with accent
                if (influence > 0.7) {
                    frameColor.copy(accentColor).lerp(lightColor, (1 - influence) * 2);
                } else {
                    frameColor.copy(darkColor).lerp(lightColor, influence);
                }
                mesh.setColorAt(i, frameColor);
            } else {
                // Ambient animation when not influenced
                const ambient = Math.sin(time * 0.5 + i * 0.1) * 0.02;
                scale = 0.68 + ambient;
                rotation = ambient * 0.1;
                mesh.setColorAt(i, darkColor);
            }

            if (effect !== "magnetic") {
                dummy.position.set(x, y, zOffset);
            }

            dummy.scale.set(cell * scale, cell * scale, 1);
            dummy.rotation.z = rotation;

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
                blending={THREE.AdditiveBlending} // Changed to additive for glow effect
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
                    effect={effect}
                    intensity={intensity}
                />
            </Canvas>
        </div>
    );
}
