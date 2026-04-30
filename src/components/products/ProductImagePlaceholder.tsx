"use client";

import { useState } from "react";
import SmartImage from "@/components/ui/SmartImage";

interface ProductImagePlaceholderProps {
    title: string;
    subtitle?: string;
    className?: string;
    accent?: string;
    imageSrc?: string;
    imageAlt?: string;
    imagePriority?: boolean;
    imageSizes?: string;
}

export default function ProductImagePlaceholder({
    title,
    subtitle = "Image slot",
    className = "",
    accent = "from-white/10 via-white/6 to-transparent",
    imageSrc,
    imageAlt,
    imagePriority = false,
    imageSizes,
}: ProductImagePlaceholderProps) {
    const [failedToLoad, setFailedToLoad] = useState(false);
    const hasRenderableImage = Boolean(imageSrc) && !failedToLoad;

    return (
        <div className={`relative overflow-hidden rounded-4xl border border-white/10 bg-brand-dark/72 ${className}`}>
            <div aria-hidden className={`absolute inset-0 bg-linear-to-br ${accent}`} />
            <div aria-hidden className="absolute inset-0 office-grid opacity-[0.06]" />

            {hasRenderableImage && (
                <>
                    <SmartImage
                        src={imageSrc!}
                        alt={imageAlt ?? title}
                        fill
                        priority={imagePriority}
                        sizes={imageSizes ?? "(max-width: 768px) 100vw, 40vw"}
                        className="object-cover"
                        onError={() => setFailedToLoad(true)}
                    />
                    <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 bg-linear-to-t from-brand-dark/24 via-transparent to-transparent"
                    />
                </>
            )}

            <div className="relative flex h-full min-h-[inherit] flex-col justify-between p-5 md:p-6">
                <div className="flex items-center justify-between gap-4">
                    <span className="text-xs font-semibold uppercase tracking-[0.28em] text-white/42">
                        {subtitle}
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/6 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-white/52">
                        {hasRenderableImage ? "Optimized" : "Replace later"}
                    </span>
                </div>

                {hasRenderableImage ? (
                    <div className="flex flex-1 items-end">
                        <p className="max-w-sm text-sm leading-6 text-white/72">Progressive image active with lazy loading and blur placeholder.</p>
                    </div>
                ) : (
                    <div className="flex flex-1 flex-col items-center justify-center text-center">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/6">
                            <span className="material-symbols-outlined text-4xl text-white/18">image</span>
                        </div>
                        <p className="mt-5 text-lg font-semibold text-white">{title}</p>
                        <p className="mt-2 max-w-xs text-sm leading-6 text-white/52">
                            Add a product image here when it is ready.
                        </p>
                    </div>
                )}

                <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.24em] text-white/36">
                    <span>Preview frame</span>
                    <span>{hasRenderableImage ? "Lazy + blur" : "Future asset ready"}</span>
                </div>
            </div>
        </div>
    );
}