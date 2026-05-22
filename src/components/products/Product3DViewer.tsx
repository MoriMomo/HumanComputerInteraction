"use client";

import dynamic from "next/dynamic";
import SmartImage from "@/components/ui/SmartImage";
import { PRODUCT_PAGE_GALLERY } from "@/data/productGallery";
import type { Product } from "@/data/products";

const ProductScene = dynamic(() => import("@/components/3d/ProductScene"), {
    ssr: false,
    loading: () => (
        <div className="flex h-full min-h-112 items-center justify-center rounded-[28px] border border-white/10 bg-[#1f1510]">
            <p className="text-[11px] uppercase tracking-[0.24em] text-white/50">Loading interactive model</p>
        </div>
    ),
});

interface Product3DViewerProps {
    product: Product;
    color: string;
    className?: string;
}

export default function Product3DViewer({ product, color, className = "" }: Product3DViewerProps) {
    const scene3d = product.scene3d;
    const galleryItems = PRODUCT_PAGE_GALLERY.filter((asset) => asset.slugs?.includes(product.slug)).slice(0, 2);

    if (!scene3d) {
        return (
            <div className={`relative overflow-hidden rounded-4xl border border-white/10 bg-brand-dark/72 ${className}`}>
                <div aria-hidden className="absolute inset-0 office-grid opacity-[0.06]" />
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
        <div className={`relative overflow-hidden rounded-4xl border border-white/10 bg-brand-dark/72 ${className}`}>
            <div aria-hidden className="absolute inset-0 bg-linear-to-br from-white/10 via-white/6 to-transparent" />
            <div aria-hidden className="absolute inset-0 office-grid opacity-[0.06]" />

            <div className="absolute inset-0">
                <ProductScene
                    variant={scene3d.variant}
                    color={color ?? scene3d.color ?? product.colors[0]}
                    renderMode={scene3d.renderMode ?? "normal"}
                    enableZoom={scene3d.enableZoom ?? true}
                    autoRotate={scene3d.autoRotate ?? true}
                    scale={scene3d.scale ?? 1}
                    position={scene3d.position}
                    rotation={scene3d.rotation}
                    modelSrc={scene3d.modelSrc}
                />
            </div>

            <div className="pointer-events-none relative flex h-full min-h-[inherit] flex-col justify-between p-5 md:p-6">
                <div className="flex items-center justify-between gap-4">
                    <span className="text-xs font-semibold uppercase tracking-[0.28em] text-white/42">
                        Interactive 3D view
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/6 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-white/52">
                        {scene3d.modelSrc ? "GLB ready" : "Procedural preview"}
                    </span>
                </div>

                <div className="flex flex-1 items-end">
                    <p className="max-w-sm text-sm leading-6 text-white/72">
                        Drag to rotate the product. This viewer is reusable across every product, and can swap to a dedicated 3D asset later.
                    </p>
                </div>

                <div className="flex items-center justify-between gap-4 text-[11px] uppercase tracking-[0.24em] text-white/36">
                    <span>Preview frame</span>
                    <span>{scene3d.enableZoom ? "Drag + zoom" : "Drag only"}</span>
                </div>

                {/* thumbnails moved below viewer */}

                {galleryItems.length > 0 && (
                    <div className="mt-3 flex gap-3">
                        {galleryItems.map((asset) => (
                            <div key={asset.src} className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg border border-white/8 bg-black/8">
                                <SmartImage src={asset.src} alt={asset.alt} fill sizes="120px" className="object-cover" />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}