"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LoadingLink from "@/components/ui/LoadingLink";
import { PRODUCTS, type Product } from "@/data/products";

export default function ProductComparePage() {
    const searchParams = useSearchParams();
    const compare = searchParams.get("compare");

    const selected = useMemo(() => {
        const slugs = (compare ?? PRODUCTS.slice(0, 2).map((item) => item.slug).join(","))
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean)
            .slice(0, 3);

        const resolved = slugs
            .map((slug) => PRODUCTS.find((product) => product.slug === slug))
            .filter((product): product is Product => Boolean(product));
        return resolved.length >= 2 ? resolved : PRODUCTS.slice(0, 2);
    }, [compare]);

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-[#0a0f16] px-6 pb-24 pt-32 text-white md:px-12 lg:px-20">
                <div className="mx-auto max-w-7xl">
                    <LoadingLink href="/products" className="text-sm text-white/52 transition-colors hover:text-white/84">
                        ← Back to products
                    </LoadingLink>

                    <p className="mt-8 text-xs font-semibold uppercase tracking-[0.3em] text-primary">Comparison</p>
                    <h1 className="mt-3 font-serif text-4xl font-bold md:text-5xl">Choose the right carry setup.</h1>

                    <div className="mt-10 overflow-hidden rounded-4xl border border-white/10 bg-[#0f1620]/64">
                        <div className="grid grid-cols-[200px_repeat(3,minmax(0,1fr))] border-b border-white/10">
                            <div className="p-4 text-xs uppercase tracking-[0.22em] text-white/46">Spec</div>
                            {selected.map((product) => (
                                <div key={product.slug} className="border-l border-white/10 p-4">
                                    <p className="text-lg font-semibold text-white">{product.name}</p>
                                    <p className="mt-1 text-sm text-white/64">${product.price}</p>
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-[200px_repeat(3,minmax(0,1fr))] border-b border-white/10">
                            <div className="p-4 text-sm text-white/60">Finishes</div>
                            {selected.map((product) => (
                                <div key={`${product.slug}-finishes`} className="border-l border-white/10 p-4 text-sm text-white/80">
                                    {product.colors.length}
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-[200px_repeat(3,minmax(0,1fr))] border-b border-white/10">
                            <div className="p-4 text-sm text-white/60">Top features</div>
                            {selected.map((product) => (
                                <div key={`${product.slug}-features`} className="border-l border-white/10 p-4 text-sm text-white/80">
                                    {product.features.slice(0, 2).join(" • ")}
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-[200px_repeat(3,minmax(0,1fr))]">
                            <div className="p-4 text-sm text-white/60">Action</div>
                            {selected.map((product) => (
                                <div key={`${product.slug}-action`} className="border-l border-white/10 p-4">
                                    <LoadingLink
                                        href={`/products/${product.slug}`}
                                        className="inline-flex rounded-full border border-white/16 bg-white/6 px-4 py-2 text-sm text-white/86 transition-colors hover:border-white/30 hover:bg-white/10"
                                    >
                                        View details
                                    </LoadingLink>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
