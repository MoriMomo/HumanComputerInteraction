"use client";

export interface GPUInfo {
    hasWebGL: boolean;
    hasWebGL2: boolean;
    renderer: string;
    vendor: string;
    maxTextureSize: number;
    preferredPowerMode: "high-performance" | "low-power" | "default";
}

export function detectGPU(): GPUInfo {
    if (typeof document === "undefined") {
        return {
            hasWebGL: false,
            hasWebGL2: false,
            renderer: "none",
            vendor: "none",
            maxTextureSize: 0,
            preferredPowerMode: "default",
        };
    }

    const canvas = document.createElement("canvas");
    const gl2 = canvas.getContext("webgl2");
    const gl = gl2 ?? canvas.getContext("webgl");

    if (!gl) {
        return {
            hasWebGL: false,
            hasWebGL2: false,
            renderer: "none",
            vendor: "none",
            maxTextureSize: 0,
            preferredPowerMode: "default",
        };
    }

    const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
    const renderer = debugInfo
        ? String(gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL))
        : "Unknown";
    const vendor = debugInfo
        ? String(gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL))
        : "Unknown";

    const rendererLower = renderer.toLowerCase();
    const isDedicatedGPU =
        rendererLower.includes("nvidia") ||
        rendererLower.includes("amd") ||
        rendererLower.includes("radeon") ||
        rendererLower.includes("geforce");

    return {
        hasWebGL: true,
        hasWebGL2: Boolean(gl2),
        renderer,
        vendor,
        maxTextureSize: Number(gl.getParameter(gl.MAX_TEXTURE_SIZE) ?? 0),
        preferredPowerMode: isDedicatedGPU ? "high-performance" : "default",
    };
}

export function forceGPUAcceleration() {
    if (typeof document === "undefined") {
        return;
    }

    document.body.classList.add("gpu-boost");
}