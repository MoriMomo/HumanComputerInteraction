"use client";

import { useEffect, useMemo, useState } from "react";
import { detectGPU, type GPUInfo } from "@/lib/gpu-detector";

const defaultGPUInfo: GPUInfo = {
    hasWebGL: false,
    hasWebGL2: false,
    renderer: "none",
    vendor: "none",
    maxTextureSize: 0,
    preferredPowerMode: "default",
};

export default function GPUMonitor() {
    const [mounted, setMounted] = useState(false);
    const [fps, setFps] = useState(0);
    const [crashed, setCrashed] = useState(false);

    const gpuInfo = useMemo(
        () => (mounted ? detectGPU() : defaultGPUInfo),
        [mounted]
    );

    useEffect(() => {
        const mountRaf = window.requestAnimationFrame(() => {
            setMounted(true);
        });

        let frameCount = 0;
        let rafId = 0;
        let lastTime = performance.now();

        const measureFPS = () => {
            frameCount += 1;
            const now = performance.now();

            if (now >= lastTime + 1000) {
                setFps(Math.round((frameCount * 1000) / (now - lastTime)));
                frameCount = 0;
                lastTime = now;
            }

            rafId = window.requestAnimationFrame(measureFPS);
        };

        rafId = window.requestAnimationFrame(measureFPS);

        // Listen for crash/reset events from elsewhere to keep state synchronized
        const handleCrashSimulated = () => setCrashed(true);
        const handleResetSimulated = () => setCrashed(false);

        window.addEventListener("simulate-webgl-crash", handleCrashSimulated);
        window.addEventListener("reset-webgl-scene", handleResetSimulated);

        return () => {
            window.cancelAnimationFrame(mountRaf);
            window.cancelAnimationFrame(rafId);
            window.removeEventListener("simulate-webgl-crash", handleCrashSimulated);
            window.removeEventListener("reset-webgl-scene", handleResetSimulated);
        };
    }, []);

    const toggleCrash = () => {
        if (crashed) {
            window.dispatchEvent(new CustomEvent("reset-webgl-scene"));
        } else {
            window.dispatchEvent(new CustomEvent("simulate-webgl-crash"));
        }
    };

    const fpsColor = fps >= 50 ? "text-emerald-400" : fps >= 30 ? "text-amber-400" : "text-rose-400";

    return (
        <aside className="fixed bottom-4 right-4 z-nav rounded-xl border border-primary/25 bg-charcoal/90 p-3 text-xs text-soft-grey shadow-card backdrop-blur-sm">
            <p className="mb-2 font-semibold tracking-wide text-primary">GPU Monitor</p>
            <p className="max-w-56 truncate">Renderer: {gpuInfo.renderer}</p>
            <p className="max-w-56 truncate">Vendor: {gpuInfo.vendor}</p>
            <p>WebGL2: {gpuInfo.hasWebGL2 ? "Yes" : "No"}</p>
            <p>Power: {gpuInfo.preferredPowerMode}</p>
            <p className={fpsColor}>FPS: {fps}</p>
            <button
                onClick={toggleCrash}
                className={`mt-3 w-full px-2.5 py-1.5 rounded-lg font-bold text-[10px] tracking-widest uppercase transition-all duration-200 cursor-pointer shadow-sm text-center ${
                    crashed
                        ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/30"
                        : "bg-rose-600 hover:bg-rose-500 text-white shadow-rose-900/30"
                }`}
            >
                {crashed ? "Reset 3D Scene" : "Simulate 3D Crash"}
            </button>
        </aside>
    );
}