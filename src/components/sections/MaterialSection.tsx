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
        id: "graphite",
        label: "Graphite",
        hex: "#59636E",
        toneClass: "bg-[#59636E]",
        description: "Muted graphite anodized finish with a boardroom-ready matte tone.",
    },
    {
        id: "midnight",
        label: "Onyx",
        hex: "#1C1C1E",
        toneClass: "bg-[#2f3138]",
        description: "Low-glare black finish designed for a discreet executive look.",
    },
    {
        id: "steel",
        label: "Steel",
        hex: "#8E9AA6",
        toneClass: "bg-[#d9dbdf]",
        description: "Cool brushed alloy tone with a precise technical character.",
    },
    {
        id: "sand",
        label: "Stone",
        hex: "#BCA782",
        toneClass: "bg-[#c3aa84]",
        description: "Soft archival stone tone that pairs cleanly with neutral office setups.",
    },
    {
        id: "espresso",
        label: "Walnut",
        hex: "#3C2F24",
        toneClass: "bg-[#443327]",
        description: "Dark walnut tone that brings a more premium desk-accessory feel.",
    },
    {
        id: "champagne",
        label: "Champagne",
        hex: "#8A683A",
        toneClass: "bg-[#916d3d]",
        description: "Muted metallic champagne finish with understated warmth.",
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
    show3DModel?: boolean;
}

const LOCK_MODEL_ORIENTATION_X = Math.PI / 2;

export default function MaterialSection({
    activeColor,
    onColorChange,
    show3DModel = true,
}: MaterialSectionProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const [renderMode, setRenderMode] = useState<RenderMode>("normal");
    const activeSwatch = SWATCHES.find((s) => s.hex === activeColor) ?? SWATCHES[2];

    useGSAP(
        () => {
            const sectionEl = sectionRef.current;
            if (!sectionEl) return;
            const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

            // Reset any stale inline styles from prior hot-reloads/route changes.
            gsap.set(".showcase-entry, .showcase-panel, .showcase-shell, .showcase-orb, .showcase-stage", { clearProps: "all" });

            // If already in viewport, keep content visible and skip intro animation.
            if (ScrollTrigger.isInViewport(sectionEl, 0.1) || prefersReducedMotion) {
                gsap.set(".showcase-entry, .showcase-panel, .showcase-shell, .showcase-stage", {
                    y: 0,
                    autoAlpha: 1,
                    clearProps: "transform,opacity,visibility,translate,rotate,scale",
                });
                return;
            }

            gsap.fromTo(
                ".showcase-entry",
                { y: 38, autoAlpha: 0 },
                {
                    y: 0,
                    autoAlpha: 1,
                    duration: 0.9,
                    ease: "power3.out",
                    immediateRender: false,
                    scrollTrigger: {
                        trigger: sectionEl,
                        start: "top 92%",
                        once: true,
                    },
                }
            );

            gsap.fromTo(
                ".showcase-panel",
                { y: 24, autoAlpha: 0 },
                {
                    y: 0,
                    autoAlpha: 1,
                    stagger: 0.08,
                    duration: 0.6,
                    ease: "power2.out",
                    immediateRender: false,
                    scrollTrigger: {
                        trigger: sectionEl,
                        start: "top 92%",
                        once: true,
                    },
                }
            );

            gsap.fromTo(
                ".showcase-shell",
                { y: 88, scale: 0.94, autoAlpha: 0.72 },
                {
                    y: 0,
                    scale: 1,
                    autoAlpha: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionEl,
                        start: "top bottom",
                        end: "top 36%",
                        scrub: true,
                    },
                }
            );

            gsap.to(".showcase-stage", {
                yPercent: -8,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionEl,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                },
            });

            gsap.to(".showcase-orb", {
                xPercent: 12,
                yPercent: -12,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionEl,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                },
            });

            ScrollTrigger.refresh();
        },
        { scope: sectionRef }
    );

    return (
        <section ref={sectionRef} className="relative -mt-20 z-20 py-24 bg-transparent">
            <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-28 section-seam-paper"
            />
            <div
                aria-hidden
                className="showcase-orb section-orb pointer-events-none absolute right-[8%] top-24 h-64 w-64 rounded-full bg-[#aebbc7]/18 blur-2xl"
            />
            <div className="max-w-350 mx-auto px-4 md:px-8 lg:px-10">
                <div className="showcase-shell ambient-panel rounded-4xl border border-white/55 px-3 py-3 shadow-[0_28px_80px_rgba(53,70,86,0.12)] md:px-4 md:py-4">
                    <div className="showcase-panel-wrap grid grid-cols-1 xl:grid-cols-[260px_minmax(0,1fr)_220px] gap-5 items-stretch">
                        <aside className="showcase-entry flex flex-col justify-between rounded-[1.7rem] bg-[#eef2f4]/88 px-6 py-7 border border-white/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]">
                            <div>
                                <p className="text-[11px] tracking-[0.3em] font-semibold text-[#61707d] uppercase mb-7 flex items-center gap-2">
                                    <span className="w-7 h-px bg-[#61707d]" />
                                    Office Edition
                                </p>
                                <h3 className="font-sans font-bold text-[54px] leading-[0.98] text-[#23303c] mb-6">
                                    Product
                                    <br />
                                    Material
                                    <br />
                                    Studio
                                </h3>
                                <p className="text-[15px] leading-8 text-[#66737f] max-w-60">
                                    Review finishes, rotate the chassis, and compare which surface looks most at home in a desk-first environment.
                                </p>
                                <div className="mt-8 flex gap-3">
                                    <button className="rounded-lg px-5 h-11 bg-[#23303c] text-white text-sm font-semibold hover:bg-[#1b2530] transition-colors">
                                        ✧ Customize
                                    </button>
                                    <button className="rounded-lg px-5 h-11 bg-white text-[#23303c] border border-[#d4dde4] text-sm font-semibold hover:bg-[#f4f7f9] transition-colors">
                                        🛒 Add to Cart
                                    </button>
                                </div>
                            </div>

                            <div className="mt-10 space-y-3">
                                <div className="showcase-panel rounded-xl border border-[#d7dee4] bg-[#f5f7f8] p-4 shadow-sm">
                                    <p className="text-sm font-semibold text-[#23303c] flex items-center gap-2">
                                        ↻ Orbit Controls
                                    </p>
                                    <p className="text-xs text-[#6a7580] mt-1.5 leading-5">
                                        Left click & drag to rotate. Scroll to zoom in/out.
                                    </p>
                                </div>
                                <div className="showcase-panel rounded-xl border border-[#d7dee4] bg-[#f5f7f8] p-4 shadow-sm">
                                    <p className="text-sm font-semibold text-[#23303c] flex items-center gap-2">
                                        ⚡ Performance
                                    </p>
                                    <p className="text-xs text-[#5f809d] mt-1.5 leading-5">● 60 FPS | High Fidelity</p>
                                </div>
                            </div>
                        </aside>

                        <div className="showcase-entry rounded-[1.9rem] border border-[#c9d4dd] bg-[#111820] p-2 shadow-[0_28px_70px_rgba(12,18,24,0.26)] min-h-150">
                            <div className="showcase-stage relative w-full h-full rounded-xl bg-[#131b23] overflow-hidden">
                                {show3DModel ? (
                                    <CardHolderScene
                                        color={activeColor}
                                        autoRotate={true}
                                        renderMode={renderMode}
                                        enableZoom={true}
                                        cameraPosition={[0.1, 0.06, 3.5]}
                                        cameraLookAt={[0, 0.02, 0]}
                                        introFromPosition={[0.8, 1.25, 5.15]}
                                        introDuration={1.3}
                                        modelRotation={[LOCK_MODEL_ORIENTATION_X, 0.2, 0]}
                                        modelOffset={[0, -0.02, 0]}
                                        modelScaleMultiplier={1}
                                        className="w-full h-full"
                                    />
                                ) : (
                                    <div className="h-full w-full flex items-center justify-center px-6 text-center">
                                        <div>
                                            <p className="text-[11px] uppercase tracking-[0.18em] text-white/58">Material Studio</p>
                                            <p className="mt-2 text-2xl font-semibold text-white/88">3D Viewer Paused</p>
                                            <p className="mt-3 text-sm text-white/62 max-w-sm">
                                                You can continue refining colors, copy, and layout while the interactive model is disabled.
                                            </p>
                                        </div>
                                    </div>
                                )}

                                <div aria-hidden className="showcase-vignette pointer-events-none absolute inset-0" />
                                <div aria-hidden className="showcase-top-glow pointer-events-none absolute inset-x-0 top-0 h-28" />
                            </div>
                        </div>

                        <aside className="showcase-entry flex flex-col gap-3.5">
                            <div className="showcase-panel rounded-[1.3rem] bg-[#d7e0e6]/88 border border-[#c5d0d8] p-4 shadow-[0_10px_24px_rgba(71,88,104,0.08)]">
                                <p className="text-[10px] tracking-[0.26em] font-semibold uppercase text-[#40505f] mb-3">
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
                                                    ? "bg-white text-[#23303c] border-[#7d8a97]"
                                                    : "bg-[#eef2f4] text-[#5e6b77] border-[#cfd8df] hover:bg-white"
                                                    }`}
                                            >
                                                <span className="flex items-center gap-2">
                                                    <span className="material-symbols-outlined text-base">{mode.icon}</span>
                                                    {mode.label}
                                                </span>
                                                <span className={`w-3 h-3 rounded-full border ${active ? "border-[#394754]" : "border-[#aeb8c0]"}`} />
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="showcase-panel rounded-[1.3rem] bg-[#d7e0e6]/88 border border-[#c5d0d8] p-4 shadow-[0_10px_24px_rgba(71,88,104,0.08)]">
                                <p className="text-[10px] tracking-[0.26em] font-semibold uppercase text-[#40505f] mb-3">
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
                                    <span className="w-2 h-2 rounded-full bg-[#62707d]" />
                                    {activeSwatch.label}
                                </p>
                            </div>

                            <div className="showcase-panel rounded-[1.3rem] bg-[#d7e0e6]/88 border border-[#c5d0d8] p-4 shadow-[0_10px_24px_rgba(71,88,104,0.08)]">
                                <p className="text-[10px] tracking-[0.26em] font-semibold uppercase text-[#40505f] mb-2">
                                    ● Input: Active
                                </p>
                                <p className="text-[11px] text-[#606d79] leading-5">render_tier: high</p>
                                <p className="text-[11px] text-[#606d79] leading-5">camera: orbit + zoom</p>
                                <p className="text-[11px] text-[#606d79] leading-5">material: {renderMode}</p>
                                <p className="text-[11px] text-[#606d79] leading-5 mt-1">{activeSwatch.description}</p>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        </section>
    );
}
