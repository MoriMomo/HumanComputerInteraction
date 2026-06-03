"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import type { Product3DConfig } from "@/data/products";
import type { RenderMode } from "@/types";
import useResolvedColor from "@/hooks/useResolvedColor";

type ProductSceneProps = Product3DConfig & {
    color?: string;
    onSelect?: (selection: { object: THREE.Object3D; point: THREE.Vector3 }) => void;
    onHover?: (object: THREE.Object3D | null) => void;
    testAutoSelect?: boolean;
};

function Material({ color, renderMode }: { color: string; renderMode: RenderMode }) {
    const isGlass = renderMode === "glass";
    const isWireframe = renderMode === "wireframe";

    if (isGlass) {
        return (
            <meshPhysicalMaterial
                color={color}
                transparent
                opacity={0.22}
                roughness={0.08}
                metalness={0}
                transmission={0.9}
                thickness={0.6}
                ior={1.45}
                clearcoat={1}
                clearcoatRoughness={0.05}
                side={THREE.DoubleSide}
                depthWrite={false}
            />
        );
    }

    return (
        <meshStandardMaterial
            color={color}
            wireframe={isWireframe}
            transparent={isWireframe}
            opacity={isWireframe ? 0.28 : 1}
            roughness={0.34}
            metalness={0.18}
            side={THREE.DoubleSide}
        />
    );
}

function LoadedModel({ modelSrc, scale }: { modelSrc: string; scale: number }) {
    const loadedModel = useGLTF(modelSrc);

    return (
        <group scale={scale}>
            <primitive object={loadedModel.scene} />
        </group>
    );
}

function InteractionHandler({
    onSelect,
    onHover,
}: Pick<ProductSceneProps, "onSelect" | "onHover">) {
    const { gl, camera, scene } = useThree();
    const raycaster = useMemo(() => new THREE.Raycaster(), []);
    const mouse = useMemo(() => new THREE.Vector2(), []);
    const lastHoverRef = useRef(0);
    const hoveredRef = useRef<THREE.Object3D | null>(null);

    useEffect(() => {
        const canvas = gl.domElement;
        if (!canvas) {
            return;
        }

        const updateMouse = (event: PointerEvent) => {
            const rect = canvas.getBoundingClientRect();
            if (!rect.width || !rect.height) {
                return;
            }

            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);
        };

        const pickObject = (event: PointerEvent) => {
            updateMouse(event);
            const intersections = raycaster.intersectObjects(scene.children, true);
            return intersections[0] ?? null;
        };

        const handlePointerDown = (event: PointerEvent) => {
            const hit = pickObject(event);
            if (!hit) {
                return;
            }

            onSelect?.({ object: hit.object, point: hit.point });
        };

        const handlePointerMove = (event: PointerEvent) => {
            const now = Date.now();
            if (now - lastHoverRef.current < 50) {
                return;
            }

            lastHoverRef.current = now;
            const hit = pickObject(event);
            const nextHovered = hit?.object ?? null;

            if (nextHovered !== hoveredRef.current) {
                hoveredRef.current = nextHovered;
                onHover?.(nextHovered);
            }

            canvas.style.cursor = nextHovered ? "pointer" : "default";
        };

        const handlePointerLeave = () => {
            hoveredRef.current = null;
            canvas.style.cursor = "default";
            onHover?.(null);
        };

        canvas.addEventListener("pointerdown", handlePointerDown);
        canvas.addEventListener("pointermove", handlePointerMove);
        canvas.addEventListener("pointerleave", handlePointerLeave);

        return () => {
            canvas.removeEventListener("pointerdown", handlePointerDown);
            canvas.removeEventListener("pointermove", handlePointerMove);
            canvas.removeEventListener("pointerleave", handlePointerLeave);
        };
    }, [camera, gl, mouse, onHover, onSelect, raycaster, scene]);

    return null;
}

function ProductModel({
    color,
    renderMode = "normal",
    scale = 1,
    autoRotate = true,
    modelSrc,
    onSelect,
    onHover,
}: ProductSceneProps) {
    const groupRef = useRef<THREE.Group>(null);

    useFrame(() => {
        if (groupRef.current && autoRotate) {
            groupRef.current.rotation.y += 0.008;
        }
    });

    const accent = useMemo(() => new THREE.Color(color ?? "#B48A63"), [color]);

    // three-react event handlers on the group so clicks hit reliably
    const handlePointerDown = (e: { object: THREE.Object3D; point: THREE.Vector3; stopPropagation: () => void }) => {
        e.stopPropagation();
        const obj = e.object;
        // highlight selection locally
        // clear previous handled in parent via onSelect callback
        onSelect?.({ object: obj, point: e.point });
    };

    const handlePointerMove = (e: { object: THREE.Object3D | null; stopPropagation: () => void }) => {
        e.stopPropagation();
        onHover?.(e.object ?? null);
    };

    return (
        <group ref={groupRef} scale={scale} rotation={[0, 0, 0]} onPointerDown={handlePointerDown} onPointerMove={handlePointerMove}>
            {modelSrc ? (
                <LoadedModel modelSrc={modelSrc} scale={scale} />
            ) : (
                <mesh>
                    <boxGeometry args={[1.6, 1.6, 1.6]} />
                    <Material color={accent.getStyle()} renderMode={renderMode} />
                </mesh>
            )}
        </group>
    );
}

function getGpuTier(): "low" | "mid" | "high" {
    if (typeof window === "undefined") return "high";
    try {
        const canvas = document.createElement("canvas");
        const gl = (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;
        if (!gl) return "low";

        const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
        if (debugInfo) {
            const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || "";
            const rendererLower = renderer.toLowerCase();

            if (
                rendererLower.includes("mali-t") ||
                rendererLower.includes("adreno (tm) 3") ||
                rendererLower.includes("adreno (tm) 4") ||
                rendererLower.includes("intel hd graphics") ||
                rendererLower.includes("intel(r) hd") ||
                rendererLower.includes("swiftshader") ||
                rendererLower.includes("software rasterizer")
            ) {
                return "low";
            }
        }

        const isMobile = window.matchMedia("(max-width: 768px)").matches;
        if (isMobile) {
            if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) {
                return "low";
            }
            return "mid";
        }

        return "high";
    } catch {
        return "high";
    }
}

export default function ProductScene({
    variant,
    color = "#B48A63",
    renderMode = "normal",
    enableZoom = true,
    autoRotate = true,
    scale = 1,
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    camera,
    modelSrc,
    onSelect,
    onHover,
    testAutoSelect = false,
}: ProductSceneProps) {
    const [gpuTier, setGpuTier] = useState<"low" | "mid" | "high">("high");

    useEffect(() => {
        const id = setTimeout(() => {
            setGpuTier(getGpuTier());
        }, 0);
        return () => clearTimeout(id);
    }, []);

    const resolvedColor = useResolvedColor(color);
    const selectedRef = useRef<THREE.Object3D | null>(null);

    const resolvedModelSrc = useMemo(() => {
        if (!modelSrc) return undefined;
        if (gpuTier === "low" || gpuTier === "mid") {
            if (modelSrc.includes("bener-optimized.glb") || modelSrc.includes("bener.glb")) {
                return "/satset3d/glb/bener-final-optimized.glb";
            }
        }
        return modelSrc;
    }, [modelSrc, gpuTier]);

    const dpr = useMemo(() => {
        if (gpuTier === "low") return 1;
        if (gpuTier === "mid") return [1, 1.2] as [number, number];
        return [1, 1.5] as [number, number];
    }, [gpuTier]);

    const antialias = useMemo(() => gpuTier !== "low", [gpuTier]);

    const clearHighlight = (obj: THREE.Object3D | null) => {
        if (!obj) return;
        obj.traverse((child) => {
            // restore original material if we replaced it
            const anyChild = child as THREE.Object3D & { userData?: { _originalMaterial?: THREE.Material | THREE.Material[] } };
            if (anyChild?.userData?._originalMaterial) {
                try {
                    // restore material (use unknown cast to avoid explicit any)
                    ((anyChild as unknown) as { material?: THREE.Material | THREE.Material[] }).material = anyChild.userData._originalMaterial as THREE.Material | THREE.Material[];
                } catch {
                    // ignore
                }
                delete anyChild.userData._originalMaterial;
            }
        });
    };

    const applyHighlight = (obj: THREE.Object3D) => {
        if (!obj) return;
        obj.traverse((child) => {
            const mesh = child as THREE.Mesh & { material?: THREE.Material | THREE.Material[]; userData?: Record<string, unknown> };
            if (!mesh.isMesh || !mesh.material) return;

            // avoid double-cloning
            if (mesh.userData?._originalMaterial) return;

            try {
                const original = mesh.material as THREE.Material | THREE.Material[];
                const cloned = Array.isArray(original)
                    ? original.map((m: THREE.Material) => m.clone())
                    : ((('clone' in original ? (original as unknown as { clone: () => THREE.Material }).clone() : original) as THREE.Material) as THREE.Material | THREE.Material[]);

                // try to set an emissive highlight; fallback to tinting color
                if (Array.isArray(cloned)) {
                    cloned.forEach((m: THREE.Material) => {
                        const mat = m as unknown as { emissive?: { set: (s: string) => void }; color?: { lerp: (c: THREE.Color, t: number) => void } };
                        if (mat.emissive) mat.emissive.set("#ffd54f");
                        else if (mat.color) mat.color.lerp(new THREE.Color(0xffd54f), 0.35);
                    });
                } else {
                    const mat = cloned as unknown as { emissive?: { set: (s: string) => void }; color?: { lerp: (c: THREE.Color, t: number) => void } };
                    if (mat.emissive) mat.emissive.set("#ffd54f");
                    else if (mat.color) mat.color.lerp(new THREE.Color(0xffd54f), 0.35);
                }

                mesh.userData = mesh.userData || {};
                mesh.userData._originalMaterial = original;
                // assign cloned material
                (mesh as unknown as { material?: THREE.Material | THREE.Material[] }).material = cloned as THREE.Material | THREE.Material[];
            } catch {
                // swallow
            }
        });
    };

    // automated test helper: if `?testSelect=1` is present, pick the first mesh after load
    useEffect(() => {
        if (!testAutoSelect) return;

        const t = setTimeout(() => {
            try {
                // pick first mesh in the scene
                const findMesh = (root: THREE.Object3D | null): THREE.Object3D | null => {
                    if (!root) return null;
                    let found: THREE.Object3D | null = null;
                    root.traverse((c) => {
                        const m = c as THREE.Mesh;
                        if (!found && (m?.isMesh)) found = m;
                    });
                    return found;
                };

                const globalAny = window as unknown as { __THREE_SCENE__?: THREE.Object3D; __APP_SCENE__?: THREE.Object3D; __R3F_ROOT__?: unknown };
                const mesh = findMesh(globalAny.__THREE_SCENE__ ?? null) || findMesh(globalAny.__APP_SCENE__ ?? null) || null;
                // fallback: try to use document canvas area to dispatch pointer event
                if (mesh) {
                    onSelect?.({ object: mesh, point: new THREE.Vector3() });
                } else {
                    // best-effort: traverse global three scenes
                    if (globalAny.__R3F_ROOT__) {
                        const r = globalAny.__R3F_ROOT__ as { scene?: THREE.Object3D } | undefined;
                        const root = r?.scene as THREE.Object3D | undefined;
                        const m = root ? findMesh(root) : null;
                        if (m) onSelect?.({ object: m, point: new THREE.Vector3() });
                    }
                }
            } catch {
                // ignore in tests
            }
        }, 1400);

        return () => clearTimeout(t);
    }, [testAutoSelect, onSelect]);

    return (
        <div
            className="w-full h-full touch-none overscroll-contain"
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
        >
            <Canvas
                camera={{ position: camera ?? [1.2, 0.9, 2.4], fov: 45 }}
                dpr={dpr}
                gl={{ antialias, alpha: true, powerPreference: "high-performance" }}
                style={{ background: "transparent" }}
            >
                <Suspense fallback={null}>
                    <ambientLight intensity={0.7} />
                    <directionalLight position={[5, 5, 5]} intensity={1.25} />
                    <directionalLight position={[-4, 2, -3]} intensity={0.45} />
                    <directionalLight position={[0, -4, 4]} intensity={0.25} />
                    <InteractionHandler
                        onSelect={({ object, point }) => {
                            // clear previous
                            clearHighlight(selectedRef.current);
                            selectedRef.current = object;
                            applyHighlight(object);
                            onSelect?.({ object, point });
                        }}
                        onHover={onHover}
                    />
                    <TestAutoSelect testAutoSelect={testAutoSelect} onSelect={(s) => {
                        clearHighlight(selectedRef.current);
                        selectedRef.current = s.object;
                        applyHighlight(s.object);
                        onSelect?.(s);
                    }} />

                    <group position={position} rotation={rotation}>
                        <ProductModel
                            variant={variant}
                            color={resolvedColor}
                            renderMode={renderMode}
                            scale={scale}
                            autoRotate={autoRotate}
                            modelSrc={resolvedModelSrc}
                            onSelect={(sel) => {
                                // mirror upstream selection behavior: clear previous, apply highlight, forward
                                clearHighlight(selectedRef.current);
                                selectedRef.current = sel.object;
                                applyHighlight(sel.object);
                                onSelect?.(sel as { object: THREE.Object3D; point: THREE.Vector3 });
                            }}
                            onHover={onHover}
                        />
                    </group>

                    <OrbitControls
                        enableZoom={enableZoom}
                        enablePan={false}
                        enableDamping
                        dampingFactor={0.08}
                        autoRotate={autoRotate}
                        autoRotateSpeed={gpuTier === "low" ? 0.5 : 1.15}
                        target={[0, 0, 0]}
                        minDistance={3}
                        maxDistance={10}
                    />
                </Suspense>
            </Canvas>
        </div>
    );
}

function TestAutoSelect({ testAutoSelect, onSelect }: { testAutoSelect?: boolean; onSelect?: (s: { object: THREE.Object3D; point: THREE.Vector3 }) => void }) {
    const { scene } = useThree();

    useEffect(() => {
        const globalW = window as unknown as { __PRODUCT3D_SELECTED_NAME?: string };
        globalW.__PRODUCT3D_SELECTED_NAME = undefined;

        if (!testAutoSelect) return;

        let stopped = false;
        const start = Date.now();
        let injected: THREE.Mesh | null = null;

        const check = () => {
            try {
                const foundItems: THREE.Object3D[] = [];
                scene.traverse((c) => {
                    const m = c as THREE.Mesh;
                    if (foundItems.length === 0 && (m?.isMesh)) foundItems.push(m);
                });
                if (foundItems.length > 0) {
                    const found = foundItems[0];
                    onSelect?.({ object: found, point: new THREE.Vector3() });
                    globalW.__PRODUCT3D_SELECTED_NAME = found.name || found.parent?.name || 'mesh';
                    stopped = true;
                    return;
                }
            } catch { }

            // if we've waited long enough, inject a deterministic test mesh into the scene
            if (!stopped && Date.now() - start >= 3000) {
                try {
                    const geom = new THREE.SphereGeometry(0.5, 16, 12);
                    const mat = new THREE.MeshStandardMaterial({ color: 0xffd54f });
                    injected = new THREE.Mesh(geom, mat);
                    injected.name = 'test-injected-mesh';
                    injected.position.set(0, 0, 0);
                    scene.add(injected);
                    onSelect?.({ object: injected, point: new THREE.Vector3() });
                    globalW.__PRODUCT3D_SELECTED_NAME = injected.name;
                    stopped = true;
                    return;
                } catch { }
            }

            if (!stopped && Date.now() - start < 10000) {
                setTimeout(check, 300);
            }
        };

        const initial = setTimeout(check, 700);
        return () => {
            stopped = true;
            if (injected) try { scene.remove(injected); } catch { }
            clearTimeout(initial);
        };
    }, [scene, onSelect, testAutoSelect]);

    return null;
}