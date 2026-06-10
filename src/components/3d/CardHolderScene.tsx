import { Suspense, useRef, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import CardHolderModel from "./CardHolderModel";

interface CardHolderSceneProps {
    color?: string;
    enableZoom?: boolean;
    renderMode?: "normal" | "glass" | "wireframe";
    modelSrc?: string;
    finish?: "standard" | "matte" | "brushed" | "polished";
    autoRotate?: boolean;
    lightingPreset?: "studio" | "sunset" | "neon";
    screenshotRef?: React.MutableRefObject<(() => void) | null>;
}

interface CanvasScreenshotControllerProps {
    screenshotRef?: React.MutableRefObject<(() => void) | null>;
}

function CanvasScreenshotController({ screenshotRef }: CanvasScreenshotControllerProps) {
    const { gl, scene, camera } = useThree();

    useEffect(() => {
        if (!screenshotRef) return;
        screenshotRef.current = () => {
            // Force a render pass right before generating the data URI
            gl.render(scene, camera);
            const dataUrl = gl.domElement.toDataURL("image/png");
            const link = document.createElement("a");
            link.download = `satset-custom-${Date.now()}.png`;
            link.href = dataUrl;
            link.click();
        };
        return () => {
            screenshotRef.current = null;
        };
    }, [gl, scene, camera, screenshotRef]);

    return null;
}

export default function CardHolderScene({
    color = "#B48A63",
    enableZoom = true,
    renderMode = "normal",
    modelSrc,
    finish = "standard",
    autoRotate = true,
    lightingPreset = "studio",
    screenshotRef,
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
                    antialias: true,
                    alpha: true,
                    powerPreference: "high-performance",
                    preserveDrawingBuffer: true,
                }}
                style={{ background: "transparent" }}
            >
                <Suspense fallback={null}>
                    {/* Lighting */}
                    {lightingPreset === "studio" && (
                        <>
                            <ambientLight intensity={0.65} />
                            <directionalLight position={[5, 5, 5]} intensity={1.2} />
                            <directionalLight position={[-3, 2, -2]} intensity={0.4} />
                        </>
                    )}
                    {lightingPreset === "sunset" && (
                        <>
                            <ambientLight intensity={0.4} color="#fce5cd" />
                            <directionalLight position={[5, 3, 5]} intensity={1.5} color="#ffa500" />
                            <directionalLight position={[-5, 2, -3]} intensity={0.6} color="#87ceeb" />
                        </>
                    )}
                    {lightingPreset === "neon" && (
                        <>
                            <ambientLight intensity={0.25} color="#4b0082" />
                            <directionalLight position={[4, 3, 4]} intensity={2.2} color="#00ffff" />
                            <directionalLight position={[-4, -1, -4]} intensity={2.2} color="#ff00ff" />
                            <directionalLight position={[0, 5, 0]} intensity={0.8} color="#8a2be2" />
                        </>
                    )}

                    {/* Model */}
                    <CardHolderModel
                        color={color}
                        renderMode={renderMode}
                        modelSrc={modelSrc}
                        finish={finish}
                        autoRotate={autoRotate}
                    />

                    {/* Controls */}
                    <OrbitControls
                        enableZoom={enableZoom}
                        enablePan={false}
                        target={[0, 0, 0]}
                        minDistance={3}
                        maxDistance={10}
                    />

                    {/* Screenshot Controller */}
                    <CanvasScreenshotController screenshotRef={screenshotRef} />
                </Suspense>
            </Canvas>
        </div>
    );
}
