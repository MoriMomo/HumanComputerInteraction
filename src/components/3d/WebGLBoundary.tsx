"use client";

import React, { Component, type ReactNode } from "react";
import SmartImage from "@/components/ui/SmartImage";

interface ErrorBoundaryProps {
    fallbackImageSrc: string;
    fallbackImageAlt?: string;
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

export default class WebGLBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: any): ErrorBoundaryState {
        return { hasError: true };
    }

    componentDidCatch(error: any, errorInfo: any) {
        console.error("WebGL Error caught by WebGLBoundary:", error, errorInfo);
    }

    componentDidMount() {
        window.addEventListener("simulate-webgl-crash", this.handleCrashSim);
        window.addEventListener("reset-webgl-scene", this.handleReset);
    }

    componentWillUnmount() {
        window.removeEventListener("simulate-webgl-crash", this.handleCrashSim);
        window.removeEventListener("reset-webgl-scene", this.handleReset);
    }

    handleCrashSim = () => {
        this.setState({ hasError: true });
    };

    handleReset = () => {
        this.setState({ hasError: false });
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="relative w-full h-full min-h-[inherit] overflow-hidden rounded-[inherit] bg-stone-50 border border-stone-200 flex flex-col justify-end">
                    {/* 2D Static Image Fallback */}
                    <div className="absolute inset-0 z-0">
                        <SmartImage
                            src={this.props.fallbackImageSrc}
                            alt={this.props.fallbackImageAlt || "Product Static Fallback"}
                            fill
                            priority
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover w-full h-full"
                        />
                    </div>
                    {/* Error Overlay with Premium Styling */}
                    <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-[4px] z-10 flex items-center justify-center p-4 sm:p-6 text-center">
                        <div className="max-w-md bg-white/95 text-stone-900 border border-stone-200/60 p-5 sm:p-6 rounded-3xl shadow-2xl backdrop-blur-md">
                            <span className="material-symbols-outlined text-rose-500 text-3xl mb-2 select-none">
                                error
                            </span>
                            <h4 className="text-xs font-bold tracking-[0.18em] uppercase text-rose-600 mb-2">
                                WebGL Error
                            </h4>
                            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium">
                                Gagal memuat interaksi 3D. Menampilkan gambar statis. Silakan muat ulang halaman atau perbarui browser Anda.
                            </p>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
