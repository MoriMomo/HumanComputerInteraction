"use client";

import { Suspense, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import CardHolderModel from "./CardHolderModel";

interface CardHolderSceneProps {
    color?: string;
    enableZoom?: boolean;
    renderMode?: "normal" | "glass" | "wireframe";
    modelSrc?: string;
}

export default function CardHolderScene({
    color = "#B48A63",
    enableZoom = true,
    renderMode = "normal",
    modelSrc,
}: CardHolderSceneProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const handleWheel = (e: WheelEvent) => {
            // Prevent default page scroll when zooming model
            e.preventDefault();
        };

        const handleTouchMove = (e: TouchEvent) => {
            // Prevent page scroll during two-finger scaling/pinch zoom
            if (e.touches.length > 1) {
                e.preventDefault();
            }
        };

        el.addEventListener("wheel", handleWheel, { passive: false });
        el.addEventListener("touchmove", handleTouchMove, { passive: false });

        return () => {
            el.removeEventListener("wheel", handleWheel);
            el.removeEventListener("touchmove", handleTouchMove);
        };
    }, []);

    // Avoid server-side rendering of WebGL canvas by returning null on server
    if (typeof window === "undefined") return null;

    return (
        <div ref={containerRef} className="w-full h-full touch-none overscroll-contain">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 50 }}
                dpr={[1, 1.5]}
                gl={{
                    antialias: false,
                    alpha: true,
                    powerPreference: "high-performance",
                }}
                style={{ background: "transparent" }}
            >
                <Suspense fallback={null}>
                    {/* Lighting */}
                    <ambientLight intensity={0.6} />
                    <directionalLight position={[5, 5, 5]} intensity={1} />
                    <directionalLight position={[-3, 2, -2]} intensity={0.4} />

                    {/* Model */}
                    <CardHolderModel color={color} renderMode={renderMode} modelSrc={modelSrc} />

                    {/* Controls */}
                    <OrbitControls
                        enableZoom={enableZoom}
                        enablePan={false}
                        target={[0, 0, 0]}
                        minDistance={3}
                        maxDistance={10}
                    />
                </Suspense>
            </Canvas>
        </div>
    );
}
