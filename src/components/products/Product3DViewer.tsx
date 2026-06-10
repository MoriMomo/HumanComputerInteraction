"use client";

import dynamic from "next/dynamic";
import SmartImage from "@/components/ui/SmartImage";
import WebGLBoundary from "@/components/3d/WebGLBoundary";
import { PRODUCT_PAGE_GALLERY } from "@/data/productGallery";
import type { Product } from "@/data/products";

const ProductScene = dynamic(() => import("@/components/3d/ProductScene"), {
    ssr: false,
    loading: () => (
        <div className="flex h-full min-h-112 items-center justify-center rounded-[28px] border border-stone-200 bg-stone-50">
            <p className="text-[11px] uppercase tracking-[0.24em] text-stone-400">Loading interactive model</p>
        </div>
    ),
});

interface Product3DViewerProps {
    product: Product;
    color: string;
    renderMode?: "normal" | "glass" | "wireframe";
    onSelect?: (objectName: string, raw?: unknown) => void;
    className?: string;
}

export default function Product3DViewer({ product, color, renderMode = "normal", onSelect, className = "" }: Product3DViewerProps) {
    const scene3d = product.scene3d;
    const galleryItems = PRODUCT_PAGE_GALLERY.filter((asset) => asset.slugs?.includes(product.slug)).slice(0, 2);

    if (!scene3d) {
        return (
            <div className={`relative overflow-hidden rounded-4xl border border-stone-200 bg-stone-50 ${className}`}>
                <div aria-hidden className="absolute inset-0 office-grid opacity-[0.03]" />
                <SmartImage
                    src={product.image?.src ?? "/productIImg/download-1.png"}
                    alt={product.image?.alt ?? product.name}
                    fill
                    priority
                    sizes={product.image?.sizes ?? "(max-width: 768px) 100vw, 40vw"}
                    className="object-cover"
                />
            </div>
        );
    }

    return (
        <div className={`relative overflow-hidden rounded-4xl border border-stone-200 bg-stone-50 ${className}`}>
            <div aria-hidden className="absolute inset-0 bg-linear-to-br from-stone-100/50 via-white/50 to-transparent" />
            <div aria-hidden className="absolute inset-0 office-grid opacity-[0.03]" />

            <div className="absolute inset-0">
                <WebGLBoundary
                    fallbackImageSrc={product.image?.src ?? "/productIImg/download-1.png"}
                    fallbackImageAlt={product.image?.alt ?? product.name}
                >
                    <ProductScene
                        variant={scene3d.variant}
                        color={color ?? scene3d.color ?? product.colors[0]}
                        renderMode={renderMode}
                        enableZoom={scene3d.enableZoom ?? true}
                        autoRotate={scene3d.autoRotate ?? true}
                        scale={scene3d.scale ?? 1}
                        position={scene3d.position}
                        rotation={scene3d.rotation}
                        modelSrc={scene3d.modelSrc}
                        onSelect={({ object }) => {
                            const name = object.name || object.parent?.name || "unnamed object";
                            onSelect?.(name, object);
                        }}
                        testAutoSelect={typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('testSelect') === '1'}
                    />
                </WebGLBoundary>
            </div>

            <div className="pointer-events-none relative flex h-full min-h-[inherit] flex-col justify-end p-5 md:p-6">
                {/* thumbnails moved below viewer */}

                {galleryItems.length > 0 && (
                    <div className="mt-3 flex gap-3 pointer-events-auto">
                        {galleryItems.map((asset) => (
                            <div key={asset.src} className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg border border-stone-200 bg-stone-100">
                                <SmartImage src={asset.src} alt={asset.alt} fill sizes="120px" className="object-cover" />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}