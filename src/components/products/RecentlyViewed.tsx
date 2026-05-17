"use client";

import { useEffect, useState } from "react";
import LoadingLink from "@/components/ui/LoadingLink";
import SmartImage from "@/components/ui/SmartImage";
import { PRODUCT_MAP, Product } from "@/data/products";
import { useCurrency } from "@/contexts/CurrencyProvider";

const MAX_RECENT_ITEMS = 4;

export function useRecentlyViewed(currentSlug?: string) {
    const [recentSlugs, setRecentSlugs] = useState<string[]>([]);

    useEffect(() => {
        // Load initial state and update localStorage
        const updateRecentSlugs = () => {
            try {
                const stored = localStorage.getItem("recentlyViewed");
                let slugs: string[] = stored ? JSON.parse(stored) : [];

                if (currentSlug) {
                    // Remove the current slug if it exists to bring it to the front
                    slugs = slugs.filter((slug) => slug !== currentSlug);
                    slugs.unshift(currentSlug);
                    // Keep only the max number of items
                    slugs = slugs.slice(0, MAX_RECENT_ITEMS);
                    localStorage.setItem("recentlyViewed", JSON.stringify(slugs));
                }

                setRecentSlugs(slugs);
            } catch (e) {
                console.error("Failed to parse recentlyViewed from localStorage", e);
            }
        };

        // Delay execution slightly to avoid synchronous setState warning and improve perceived perf
        const timeoutId = setTimeout(updateRecentSlugs, 0);
        return () => clearTimeout(timeoutId);
    }, [currentSlug]);

    return recentSlugs;
}

interface RecentlyViewedProps {
    currentSlug: string;
}

export default function RecentlyViewed({ currentSlug }: RecentlyViewedProps) {
    const recentSlugs = useRecentlyViewed(currentSlug);

    // Filter out the current product from the display list
    const displaySlugs = recentSlugs.filter((slug) => slug !== currentSlug);

    const recentProducts = displaySlugs
        .map((slug) => PRODUCT_MAP.get(slug))
        .filter((p): p is Product => Boolean(p));

    const { format } = useCurrency();

    if (recentProducts.length === 0) {
        return null;
    }

    return (
        <section className="mx-auto max-w-7xl px-6 py-16 md:px-12 lg:px-20">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">Your History</p>
            <h2 className="mt-4 font-serif text-3xl font-bold tracking-tight md:text-4xl">Recently Viewed.</h2>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {recentProducts.map((product) => (
                    <LoadingLink
                        key={product.slug}
                        href={`/products/${product.slug}`}
                        className="group flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition-colors hover:border-white/20 hover:bg-white/8"
                    >
                        <div className="relative aspect-square w-full bg-brand-dark p-6 flex items-center justify-center">
                            {product.image?.src ? (
                                <SmartImage
                                    src={product.image.src}
                                    alt={product.image.alt}
                                    fill
                                    className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 25vw"
                                />
                            ) : null}
                        </div>
                        <div className="p-5">
                            <p className="text-sm font-semibold text-white">{product.name}</p>
                            <p className="mt-1 text-xs text-white/56">{format(product.price)}</p>
                        </div>
                    </LoadingLink>
                ))}
            </div>
        </section>
    );
}
