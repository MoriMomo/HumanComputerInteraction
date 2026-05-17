"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from 'next/dynamic';

// Lazy load the 3D scene
const CardHolderScene = dynamic(
    () => import("@/components/3d/CardHolderScene"),
    {
        ssr: false,
        loading: () => (
            <div className="w-full h-full flex items-center justify-center bg-stone-100">
                <div className="text-stone-400 text-sm">Loading 3D viewer...</div>
            </div>
        ),
    }
);

gsap.registerPlugin(ScrollTrigger);

// Simple swatch config
const SWATCHES = [
    { id: "bronze", hex: "#B48A63", label: "Desert Bronze", description: "Warm metallic finish" },
    { id: "steel", hex: "#8E9AA6", label: "Storm Grey", description: "Industrial steel tone" },
    { id: "black", hex: "#1C1C1E", label: "Midnight Black", description: "Premium dark finish" },
    { id: "silver", hex: "#C0C0C0", label: "Brushed Silver", description: "Classic metallic" },
    { id: "gold", hex: "#D4AF37", label: "Champagne Gold", description: "Luxe golden tone" },
    { id: "copper", hex: "#B87333", label: "Aged Copper", description: "Vintage patina" },
];

const RENDER_MODES = [
    { id: "normal", label: "Normal", icon: "grid_view" },
    { id: "glass", label: "Glass", icon: "opacity" },
    { id: "wireframe", label: "Wireframe", icon: "dashboard" },
];

interface MaterialSectionProps {
    activeColor?: string;
    onColorChange?: (hex: string) => void;
    show3DModel?: boolean;
}

export default function MaterialSection({
    activeColor = "#B48A63",
    onColorChange = () => { },
    show3DModel = true,
}: MaterialSectionProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const [renderMode, setRenderMode] = useState<"normal" | "glass" | "wireframe">("normal");
    const activeSwatch = SWATCHES.find((s) => s.hex === activeColor) ?? SWATCHES[0];

    useGSAP(
        () => {
            if (!sectionRef.current) return;

            gsap.from(".material-title", {
                y: 60,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    once: true,
                },
            });

            gsap.from(".material-viewer", {
                scale: 0.95,
                opacity: 0,
                duration: 1,
                delay: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                    once: true,
                },
            });

            gsap.from(".material-controls", {
                y: 40,
                opacity: 0,
                stagger: 0.1,
                duration: 0.8,
                delay: 0.3,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                    once: true,
                },
            });
        },
        { scope: sectionRef }
    );

    return (
        <section
            ref={sectionRef}
            className="relative py-32 bg-linear-to-b from-stone-50 to-white overflow-hidden"
        >
            {/* Background decorations */}
            <div className="absolute top-1/4 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-stone-500/5 rounded-full blur-3xl" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
                {/* Header */}
                <div className="text-center mb-16">
                    <p className="text-xs uppercase tracking-widest text-stone-500 mb-4">
                        Studio Edition
                    </p>
                    <h2 className="material-title text-4xl md:text-6xl font-bold text-stone-900 mb-6">
                        Material Studio
                    </h2>
                    <p className="text-stone-600 text-lg max-w-2xl mx-auto">
                        Explore finishes, rotate the model, and find the perfect surface for your workspace.
                    </p>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr] gap-8 items-start">

                    {/* Left Controls */}
                    <div className="material-controls space-y-4">
                        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
                            <h3 className="text-stone-900 font-semibold mb-3">Controls</h3>
                            <p className="text-stone-600 text-sm leading-relaxed">
                                Drag to rotate • Scroll to zoom • Right-click to pan
                            </p>
                        </div>

                        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
                            <h3 className="text-stone-900 font-semibold mb-3">Performance</h3>
                            <div className="flex items-center gap-2 text-stone-600 text-sm">
                                <span className="w-2 h-2 rounded-full bg-green-500" />
                                Optimized • 60 FPS
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button className="flex-1 px-6 py-3 rounded-xl bg-stone-900 text-white font-medium hover:bg-stone-800 transition-colors">
                                Customize
                            </button>
                            <button className="flex-1 px-6 py-3 rounded-xl bg-white border border-stone-200 text-stone-900 font-medium hover:bg-stone-50 transition-colors">
                                Add to Cart
                            </button>
                        </div>
                    </div>

                    {/* Center Viewer */}
                    <div className="material-viewer relative aspect-square lg:aspect-auto lg:h-150 rounded-3xl overflow-hidden border border-stone-200 bg-stone-100 shadow-xl">
                        {show3DModel ? (
                            <CardHolderScene
                                color={activeColor}
                                enableZoom={true}
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center text-stone-500">
                                3D viewer disabled
                            </div>
                        )}
                    </div>

                    {/* Right Controls */}
                    <div className="material-controls space-y-4">

                        {/* Render Mode */}
                        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
                            <p className="text-xs uppercase tracking-widest text-stone-400 mb-4">
                                Render Mode
                            </p>
                            <div className="space-y-2">
                                {RENDER_MODES.map((mode) => (
                                    <button
                                        key={mode.id}
                                        onClick={() => setRenderMode(mode.id as typeof renderMode)}
                                        className={`w-full px-4 py-3 rounded-xl flex items-center justify-between text-sm transition-all ${renderMode === mode.id
                                                ? "bg-stone-900 text-white"
                                                : "bg-stone-50 text-stone-700 hover:bg-stone-100"
                                            }`}
                                    >
                                        <span>{mode.label}</span>
                                        {renderMode === mode.id && (
                                            <span className="w-2 h-2 rounded-full bg-white" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Color Swatches */}
                        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
                            <p className="text-xs uppercase tracking-widest text-stone-400 mb-4">
                                Material Color
                            </p>
                            <div className="grid grid-cols-3 gap-3 mb-4">
                                {SWATCHES.map((swatch) => (
                                    <button
                                        key={swatch.id}
                                        onClick={() => onColorChange(swatch.hex)}
                                        className={`relative w-full aspect-square rounded-xl transition-all ${activeColor === swatch.hex
                                                ? "ring-2 ring-stone-900 ring-offset-2"
                                                : "hover:scale-105"
                                            }`}
                                        aria-label={`Select ${swatch.label}`}
                                    >
                                        <svg className="w-full h-full rounded-xl" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
                                            <rect x="0" y="0" width="100" height="100" rx="12" fill={swatch.hex} />
                                        </svg>

                                        {activeColor === swatch.hex && (
                                            <span className="absolute inset-0 flex items-center justify-center">
                                                <svg className="w-5 h-5 text-white drop-shadow" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </span>
                                        )}
                                    </button>
                                ))}
                            </div>
                            <div>
                                <p className="text-stone-900 text-sm font-medium">{activeSwatch.label}</p>
                                <p className="text-stone-500 text-xs mt-1">{activeSwatch.description}</p>
                                <p className="text-stone-400 text-xs mt-1 font-mono">{activeColor}</p>
                            </div>
                        </div>

                        {/* Status */}
                        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
                            <p className="text-xs uppercase tracking-widest text-stone-400 mb-3">
                                Status
                            </p>
                            <div className="space-y-2 text-xs text-stone-600">
                                <p>Tier: High Quality</p>
                                <p>Camera: Interactive</p>
                                <p>Mode: {renderMode}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
