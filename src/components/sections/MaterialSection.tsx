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
            <div className="w-12 h-12 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>
    ),
});

export const SWATCHES = [
    {
        id: "bronze",
        label: "Mahogany",
        hex: "#B48A63",
        toneClass: "bg-[#7a5b43]",
        description: "Warm micro-blasted aluminium with premium brown tint.",
    },
    {
        id: "midnight",
        label: "Midnight",
        hex: "#1C1C1E",
        toneClass: "bg-[#2f3138]",
        description: "Stealth DLC-style finish with low-reflection surface.",
    },
    {
        id: "steel",
        label: "Silver",
        hex: "#8E9AA6",
        toneClass: "bg-[#d9dbdf]",
        description: "Raw industrial alloy look with a bright cool tone.",
    },
    {
        id: "sand",
        label: "Sand",
        hex: "#BCA782",
        toneClass: "bg-[#c3aa84]",
        description: "Softer tan tone inspired by natural matte stone.",
    },
    {
        id: "espresso",
        label: "Espresso",
        hex: "#3C2F24",
        toneClass: "bg-[#443327]",
        description: "Deep roasted brown with a luxury furniture feel.",
    },
    {
        id: "champagne",
        label: "Champagne",
        hex: "#8A683A",
        toneClass: "bg-[#916d3d]",
        description: "Golden satin finish with a subtle warm sheen.",
    },
];

const RENDER_MODES = [
    { id: "normal", label: "Normal (PBR)", icon: "grid_view" },
    { id: "glass", label: "Glass", icon: "blur_on" },
    { id: "wireframe", label: "Wireframe", icon: "view_in_ar" },
] as const;

type RenderMode = (typeof RENDER_MODES)[number]["id"];

interface MaterialSectionProps {
    activeColor: string;
    onColorChange: (hex: string) => void;
}

export default function MaterialSection({
    activeColor,
    onColorChange,
}: MaterialSectionProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const [renderMode, setRenderMode] = useState<RenderMode>("normal");
    const activeSwatch = SWATCHES.find((s) => s.hex === activeColor) ?? SWATCHES[0];

    useGSAP(
        () => {
            gsap.from(".showcase-entry", {
                y: 38,
                opacity: 0,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                },
            });

            gsap.from(".showcase-panel", {
                y: 24,
                opacity: 0,
                stagger: 0.08,
                duration: 0.6,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".showcase-panel-wrap",
                    start: "top 82%",
                },
            });
        },
        { scope: sectionRef }
    );

    return (
        <section id="showcase" ref={sectionRef} className="py-22 bg-[#ececee]">
            <div className="max-w-350 mx-auto px-4 md:px-8 lg:px-10">
                <div className="showcase-panel-wrap grid grid-cols-1 xl:grid-cols-[260px_minmax(0,1fr)_220px] gap-5 items-stretch">
                    <aside className="showcase-entry flex flex-col justify-between rounded-2xl bg-[#eeedef] px-6 py-7 border border-[#dad9de]">
                        <div>
                            <p className="text-[11px] tracking-[0.3em] font-semibold text-[#6e665f] uppercase mb-7 flex items-center gap-2">
                                <span className="w-7 h-px bg-[#6e665f]" />
                                Executive Series
                            </p>
                            <h3 className="font-sans font-bold text-[54px] leading-[0.98] text-[#3f3934] mb-6">
                                Premium
                                <br />
                                3D
                                <br />
                                Showcase
                            </h3>
                            <p className="text-[15px] leading-8 text-[#7a7671] max-w-60">
                                Explore the ModuSnap chassis from every angle. Use your mouse to rotate,
                                zoom, and inspect precision components before you buy.
                            </p>
                            <div className="mt-8 flex gap-3">
                                <button className="rounded-lg px-5 h-11 bg-[#5a4a3e] text-white text-sm font-semibold hover:bg-[#4b3e34] transition-colors">
                                    ✧ Customize
                                </button>
                                <button className="rounded-lg px-5 h-11 bg-white text-[#5a4a3e] border border-[#d9d4cc] text-sm font-semibold hover:bg-[#f7f6f3] transition-colors">
                                    🛒 Add to Cart
                                </button>
                            </div>
                        </div>

                        <div className="mt-10 space-y-3">
                            <div className="showcase-panel rounded-xl border border-[#d8d6da] bg-[#f4f4f6] p-4 shadow-sm">
                                <p className="text-sm font-semibold text-[#3f3934] flex items-center gap-2">
                                    ↻ Orbit Controls
                                </p>
                                <p className="text-xs text-[#7f7a74] mt-1.5 leading-5">
                                    Left click & drag to rotate. Scroll to zoom in/out.
                                </p>
                            </div>
                            <div className="showcase-panel rounded-xl border border-[#d8d6da] bg-[#f4f4f6] p-4 shadow-sm">
                                <p className="text-sm font-semibold text-[#3f3934] flex items-center gap-2">
                                    ⚡ Performance
                                </p>
                                <p className="text-xs text-[#4fbf74] mt-1.5 leading-5">● 60 FPS | High Quality</p>
                            </div>
                        </div>
                    </aside>

                    <div className="showcase-entry rounded-2xl border border-[#c8c0b6] bg-[#130d08] p-2 shadow-[0_20px_40px_rgba(0,0,0,0.25)] min-h-150">
                        <div className="w-full h-full rounded-xl bg-[#170f08] overflow-hidden">
                            <CardHolderScene
                                color={activeColor}
                                autoRotate={true}
                                renderMode={renderMode}
                                enableZoom={true}
                                cameraPosition={[0.2, 0.16, 3.55]}
                                cameraLookAt={[0, 0, 0]}
                                introFromPosition={[0.95, 1.7, 5.6]}
                                introDuration={1.3}
                                modelRotation={[0.03, 0.24, 0]}
                                modelOffset={[0, 0, 0]}
                                modelScaleMultiplier={1}
                                className="w-full h-full"
                            />
                        </div>
                    </div>

                    <aside className="showcase-entry flex flex-col gap-3.5">
                        <div className="showcase-panel rounded-xl bg-[#bbb49f] border border-[#b6af9b] p-4">
                            <p className="text-[10px] tracking-[0.26em] font-semibold uppercase text-[#4d463f] mb-3">
                                ◇ Render Mode
                            </p>
                            <div className="space-y-2">
                                {RENDER_MODES.map((mode) => {
                                    const active = renderMode === mode.id;
                                    return (
                                        <button
                                            key={mode.id}
                                            type="button"
                                            onClick={() => setRenderMode(mode.id)}
                                            className={`w-full rounded-lg h-11 px-3 flex items-center justify-between text-sm border transition-colors ${active
                                                ? "bg-white text-[#3f3934] border-[#837a70]"
                                                : "bg-[#efede8] text-[#6f685f] border-[#d0cbc1] hover:bg-white"
                                                }`}
                                        >
                                            <span className="flex items-center gap-2">
                                                <span className="material-symbols-outlined text-base">{mode.icon}</span>
                                                {mode.label}
                                            </span>
                                            <span className={`w-3 h-3 rounded-full border ${active ? "border-[#4b433a]" : "border-[#beb7ad]"}`} />
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="showcase-panel rounded-xl bg-[#bbb49f] border border-[#b6af9b] p-4">
                            <p className="text-[10px] tracking-[0.26em] font-semibold uppercase text-[#4d463f] mb-3">
                                ◇ Material Color
                            </p>
                            <div className="grid grid-cols-4 gap-2.5 mb-3">
                                {SWATCHES.map((swatch) => {
                                    const active = activeColor === swatch.hex;
                                    return (
                                        <button
                                            key={swatch.id}
                                            type="button"
                                            aria-label={`Use ${swatch.label}`}
                                            onClick={() => onColorChange(swatch.hex)}
                                            className={`w-8 h-8 rounded-full ${swatch.toneClass} border-2 transition-transform ${active
                                                ? "border-white scale-110 shadow-[0_0_0_2px_rgba(70,60,50,0.75)]"
                                                : "border-transparent hover:scale-105"
                                                }`}
                                        />
                                    );
                                })}
                            </div>
                            <p className="text-xs text-[#5f584f] flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-[#5e4434]" />
                                {activeSwatch.label}
                            </p>
                        </div>

                        <div className="showcase-panel rounded-xl bg-[#bbb49f] border border-[#b6af9b] p-4">
                            <p className="text-[10px] tracking-[0.26em] font-semibold uppercase text-[#4d463f] mb-2">
                                ● Input: Active
                            </p>
                            <p className="text-[11px] text-[#686057] leading-5">render_tier: high</p>
                            <p className="text-[11px] text-[#686057] leading-5">camera: orbit + zoom</p>
                            <p className="text-[11px] text-[#686057] leading-5">material: {renderMode}</p>
                            <p className="text-[11px] text-[#686057] leading-5 mt-1">{activeSwatch.description}</p>
                        </div>
                    </aside>
                </div>
            </div>
        </section>
    );
}
