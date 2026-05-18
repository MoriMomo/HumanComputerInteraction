"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import CardHolderModel from "./CardHolderModel";

interface CardHolderSceneProps {
    color?: string;
    enableZoom?: boolean;
    renderMode?: "normal" | "glass" | "wireframe";
}

export default function CardHolderScene({
    color = "#B48A63",
    enableZoom = true,
    renderMode = "normal",
}: CardHolderSceneProps) {
    // Avoid server-side rendering of WebGL canvas by returning null on server
    if (typeof window === "undefined") return null;

    return (
        <div className="w-full h-full">
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
                    <CardHolderModel color={color} renderMode={renderMode} />

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
