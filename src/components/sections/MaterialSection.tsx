"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";

gsap.registerPlugin(ScrollTrigger);

const CardHolderScene = dynamic(() => import("../3d/CardHolderScene"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full flex items-center justify-center">
            <div className="w-12 h-12 rounded-full border-2 border-white/20 border-t-white animate-spin" />
        </div>
    ),
});

export const SWATCHES = [
    { id: "graphite", label: "Graphite", hex: "#59636E", description: "Muted graphite anodized finish" },
    { id: "onyx", label: "Onyx", hex: "#1C1C1E", description: "Low-glare black finish" },
    { id: "steel", label: "Steel", hex: "#8E9AA6", description: "Cool brushed alloy tone" },
    { id: "stone", label: "Stone", hex: "#BCA782", description: "Soft archival stone tone" },
    { id: "walnut", label: "Walnut", hex: "#3C2F24", description: "Dark walnut tone" },
    { id: "champagne", label: "Champagne", hex: "#8A683A", description: "Muted metallic champagne" },
];

const RENDER_MODES = [
    { id: "normal", label: "Normal", icon: "grid_view" },
    { id: "glass", label: "Glass", icon: "blur_on" },
    { id: "wireframe", label: "Wireframe", icon: "view_in_ar" },
];

interface MaterialSectionProps {
    activeColor: string;
    onColorChange: (hex: string) => void;
    show3DModel?: boolean;
}

export default function MaterialSection({
    activeColor,
    onColorChange,
    show3DModel = true,
}: MaterialSectionProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const [renderMode, setRenderMode] = useState<"normal" | "glass" | "wireframe">("normal");
    const activeSwatch = SWATCHES.find((s) => s.hex === activeColor) ?? SWATCHES[0];

    useGSAP(
        () => {
            const sectionEl = sectionRef.current;
            if (!sectionEl) return;

            const ctx = gsap.context(() => {
                gsap.set(".material-title, .material-subtitle, .material-viewer, .material-controls", {
                    clearProps: "all",
                });

                gsap.fromTo(
                    ".material-title",
                    { y: 60, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        ease: "power4.out",
                        scrollTrigger: {
                            trigger: sectionEl,
                            start: "top 85%",
                            once: true,
                        },
                    }
                );

                gsap.fromTo(
                    ".material-subtitle",
                    { y: 40, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        delay: 0.2,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: sectionEl,
                            start: "top 85%",
                            once: true,
                        },
                    }
                );

                gsap.fromTo(
                    ".material-viewer",
                    { scale: 0.95, opacity: 0 },
                    {
                        scale: 1,
                        opacity: 1,
                        duration: 1.2,
                        delay: 0.3,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: sectionEl,
                            start: "top 82%",
                            once: true,
                        },
                    }
                );

                gsap.fromTo(
                    ".material-controls",
                    { y: 40, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        stagger: 0.1,
                        delay: 0.5,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: sectionEl,
                            start: "top 82%",
                            once: true,
                        },
                    }
                );
            }, sectionRef);

            return () => ctx.revert();
        },
        { scope: sectionRef }
    );

    return (
        <section
            ref={sectionRef}
            className="relative py-32 md:py-40 bg-[#0a0f16] overflow-hidden"
        >
            <div aria-hidden className="absolute inset-0 bg-linear-to-b from-[#0a0f16] via-[#0f1620] to-[#0a0f16]" />
            <div aria-hidden className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.02] blur-3xl" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
                <div className="text-center mb-16 md:mb-20">
                    <p className="material-subtitle text-xs uppercase tracking-[0.35em] text-white/50 mb-4">
                        Office Edition
                    </p>
                    <h2 className="material-title text-4xl md:text-6xl font-bold text-white mb-6">
                        Product Material Studio
                    </h2>
                    <p className="material-subtitle text-white/60 text-lg max-w-2xl mx-auto">
                        Review finishes, rotate the chassis, and compare which surface looks most at home in your workspace.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr] gap-6 lg:gap-8 items-start">
                    <div className="material-controls space-y-4">
                        <div className="bg-[#0f1620]/40 border border-white/[0.08] rounded-2xl p-6">
                            <h3 className="text-white font-medium mb-3">Orbit Controls</h3>
                            <p className="text-white/50 text-sm leading-relaxed">
                                Left click and drag to rotate. Scroll to zoom in and out. Right click to pan.
                            </p>
                        </div>

                        <div className="bg-[#0f1620]/40 border border-white/[0.08] rounded-2xl p-6">
                            <h3 className="text-white font-medium mb-3">Performance</h3>
                            <div className="flex items-center gap-2 text-white/50 text-sm">
                                <span className="w-2 h-2 rounded-full bg-green-500/60" />
                                60 FPS | High Fidelity
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button className="flex-1 px-6 py-3 rounded-xl bg-white text-[#0a0f16] font-medium hover:bg-white/90 transition-colors text-sm">
                                Customize
                            </button>
                            <button className="flex-1 px-6 py-3 rounded-xl bg-white/[0.08] border border-white/[0.12] text-white font-medium hover:bg-white/[0.12] transition-colors text-sm">
                                Add to Cart
                            </button>
                        </div>
                    </div>

                    <div className="material-viewer relative aspect-square lg:aspect-auto lg:min-h-[600px] rounded-3xl overflow-hidden border border-white/[0.08] bg-linear-to-br from-[#0f1620] to-[#0a0f16]">
                        {show3DModel ? (
                            <CardHolderScene
                                color={activeColor}
                                autoRotate={true}
                                show3DModel={true}
                                renderMode={renderMode}
                                enableZoom={true}
                                cameraPosition={[0.1, 0.06, 3.5]}
                                cameraLookAt={[0, 0.02, 0]}
                                modelRotation={[Math.PI / 2, 0.2, 0]}
                                modelOffset={[0, -0.02, 0]}
                                modelScaleMultiplier={1}
                                className="w-full h-full"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <p className="text-white/40 text-sm">3D Viewer Loading...</p>
                            </div>
                        )}

                        <div aria-hidden className="absolute inset-0 bg-linear-to-t from-[#0a0f16]/20 via-transparent to-[#0a0f16]/20 pointer-events-none" />
                    </div>

                    <div className="material-controls space-y-4">
                        <div className="bg-[#0f1620]/40 border border-white/[0.08] rounded-2xl p-6">
                            <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-4">
                                Render Mode
                            </p>
                            <div className="space-y-2">
                                {RENDER_MODES.map((mode) => (
                                    <button
                                        key={mode.id}
                                        onClick={() => setRenderMode(mode.id as typeof renderMode)}
                                        className={`w-full px-4 py-3 rounded-xl flex items-center justify-between text-sm transition-all ${renderMode === mode.id
                                                ? "bg-white/[0.12] text-white border border-white/[0.15]"
                                                : "bg-transparent text-white/50 border border-transparent hover:bg-white/[0.06]"
                                            }`}
                                    >
                                        <span className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-base">{mode.icon}</span>
                                            {mode.label}
                                        </span>
                                        {renderMode === mode.id && (
                                            <span className="w-2 h-2 rounded-full bg-white" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="bg-[#0f1620]/40 border border-white/[0.08] rounded-2xl p-6">
                            <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-4">
                                Material Color
                            </p>
                            <div className="grid grid-cols-3 gap-3 mb-4">
                                {SWATCHES.map((swatch) => (
                                    <button
                                        key={swatch.id}
                                        onClick={() => onColorChange(swatch.hex)}
                                        className={`group relative w-full aspect-square rounded-xl transition-all ${activeColor === swatch.hex
                                                ? "ring-2 ring-white ring-offset-2 ring-offset-[#0f1620]"
                                                : "hover:scale-105"
                                            }`}
                                        style={{ backgroundColor: swatch.hex }}
                                        aria-label={`Select ${swatch.label}`}
                                    >
                                        {activeColor === swatch.hex && (
                                            <span className="absolute inset-0 flex items-center justify-center">
                                                <span className="material-symbols-outlined text-white text-sm drop-shadow-lg">
                                                    check
                                                </span>
                                            </span>
                                        )}
                                    </button>
                                ))}
                            </div>
                            <p className="text-white/60 text-sm">{activeSwatch.label}</p>
                            <p className="text-white/40 text-xs mt-1">{activeSwatch.description}</p>
                        </div>

                        <div className="bg-[#0f1620]/40 border border-white/[0.08] rounded-2xl p-6">
                            <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-3">
                                Input: Active
                            </p>
                            <div className="space-y-2 text-xs text-white/50">
                                <p>Render Tier: High</p>
                                <p>Camera: Orbit + Zoom</p>
                                <p>Material: {renderMode}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
