"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { useParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductImagePlaceholder from "@/components/products/ProductImagePlaceholder";
import { PRODUCTS } from "@/data/products";

const SWATCH_BG_CLASS: Record<string, string> = {
    "#59636E": "bg-[#59636E]",
    "#1C1C1E": "bg-[#1C1C1E]",
    "#8E9AA6": "bg-[#8E9AA6]",
    "#BCA782": "bg-[#BCA782]",
    "#3C2F24": "bg-[#3C2F24]",
    "#8A683A": "bg-[#8A683A]",
};

export default function ProductDetailPage() {
    const { slug } = useParams<{ slug: string }>();
    const containerRef = useRef<HTMLDivElement>(null);
    const product = PRODUCTS.find((p) => p.slug === slug) ?? PRODUCTS[0];
    const [selectedColor, setSelectedColor] = useState(product.colors[0]);
    const [addedToCart, setAddedToCart] = useState(false);

    useGSAP(
        () => {
            const ctx = gsap.context(() => {
                const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
                if (prefersReducedMotion) return;

                gsap.fromTo(
                    ".detail-visual",
                    { x: -50, opacity: 0 },
                    { x: 0, opacity: 1, duration: 1, ease: "power4.out" }
                );

                gsap.fromTo(
                    ".detail-info",
                    { x: 50, opacity: 0 },
                    { x: 0, opacity: 1, duration: 1, delay: 0.15, ease: "power4.out" }
                );

                gsap.fromTo(
                    ".detail-feature",
                    { y: 24, opacity: 0 },
                    { y: 0, opacity: 1, stagger: 0.08, duration: 0.6, delay: 0.4, ease: "power3.out" }
                );
            }, containerRef);

            return () => ctx.revert();
        },
        { scope: containerRef }
    );

    const handleAddToCart = () => {
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2500);
    };

    return (
        <>
            <Navbar />
            <main ref={containerRef} className="min-h-screen bg-[#0a0f16] text-white">
                <section className="relative overflow-hidden border-b border-white/8">
                    <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(142,154,166,0.18),transparent_26%),radial-gradient(circle_at_80%_18%,rgba(180,138,99,0.12),transparent_24%),linear-gradient(180deg,#0b1118_0%,#0a0f16_100%)]" />
                    <div className="relative mx-auto grid max-w-7xl gap-10 px-6 pb-16 pt-36 md:px-12 lg:grid-cols-[1.05fr_0.95fr] lg:px-20 lg:pb-20 lg:pt-40">
                        <div className="detail-visual">
                            <Link
                                href="/products"
                                className="inline-flex items-center gap-2 text-sm text-white/45 transition-colors hover:text-white/80"
                            >
                                <span className="material-symbols-outlined text-base">arrow_back</span>
                                All Products
                            </Link>

                            <div className="mt-8 rounded-4xl border border-white/10 bg-white/5 p-3 shadow-[0_24px_100px_rgba(0,0,0,0.34)]">
                                <ProductImagePlaceholder
                                    title={product.name}
                                    subtitle="Detail image slot"
                                    className="min-h-120 p-4"
                                    accent="from-white/12 via-white/6 to-transparent"
                                />
                            </div>

                            <div className="mt-4 grid gap-3 sm:grid-cols-3">
                                {[
                                    ["RFID", "Protected"],
                                    ["Weight", "18g"],
                                    ["Warranty", "Lifetime"],
                                ].map(([label, value]) => (
                                    <div key={label} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                                        <div className="text-[11px] uppercase tracking-[0.24em] text-white/42">{label}</div>
                                        <div className="mt-2 text-sm font-semibold text-white">{value}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="detail-info lg:pl-4">
                            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary mb-4">
                                SatSet Collection
                            </p>
                            <h1 className="max-w-xl font-serif text-4xl font-bold leading-tight md:text-6xl">
                                {product.name}
                            </h1>
                            <p className="mt-4 max-w-xl text-lg leading-8 text-white/60">
                                {product.description}
                            </p>

                            <div className="mt-8 flex items-end gap-4 border-b border-white/10 pb-8">
                                <p className="text-4xl font-light text-white/88 md:text-5xl">${product.price}</p>
                                <p className="pb-1 text-sm uppercase tracking-[0.24em] text-white/40">Starting price</p>
                            </div>

                            <div className="detail-feature mt-8 rounded-3xl border border-white/10 bg-white/5 p-6">
                                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/42">Choose finish</p>
                                <div className="mt-4 flex flex-wrap gap-3">
                                    {product.colors.map((hex) => (
                                        <button
                                            key={hex}
                                            onClick={() => setSelectedColor(hex)}
                                            aria-label={`Select colour ${hex}`}
                                            type="button"
                                            className={`flex items-center gap-3 rounded-full border px-3 py-2 transition-all duration-200 ${selectedColor === hex
                                                ? "border-white/28 bg-white/8 text-white"
                                                : "border-white/10 bg-transparent text-white/58 hover:border-white/20 hover:bg-white/6"
                                                }`}
                                        >
                                            <span className={`h-4 w-4 rounded-full border border-white/18 ${SWATCH_BG_CLASS[hex] ?? "bg-swatch-steel"}`} />
                                            <span className="text-xs uppercase tracking-[0.2em]">{hex.replace("#", "")}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="detail-feature mt-8 grid gap-4 md:grid-cols-2">
                                <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                                    <p className="text-xs uppercase tracking-[0.24em] text-white/42">Core features</p>
                                    <div className="mt-4 space-y-3">
                                        {product.features.map((feature) => (
                                            <div key={feature} className="flex items-center gap-3 text-sm text-white/68">
                                                <span className="material-symbols-outlined text-base text-primary">check_circle</span>
                                                {feature}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                                    <p className="text-xs uppercase tracking-[0.24em] text-white/42">Product notes</p>
                                    <p className="mt-4 text-sm leading-7 text-white/62">
                                        Built as a compact essential with a clean silhouette, tactile finish, and simple daily use.
                                    </p>
                                    <div className="mt-4 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.2em] text-white/45">
                                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Everyday carry</span>
                                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Compact form</span>
                                    </div>
                                </div>
                            </div>

                            <div className="detail-feature mt-8 flex flex-col gap-4 sm:flex-row">
                                <button
                                    onClick={handleAddToCart}
                                    className="flex-1 rounded-full bg-white px-8 py-4 font-semibold text-[#0a0f16] transition-colors hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60"
                                    disabled={addedToCart}
                                >
                                    {addedToCart ? "Added to Cart ✓" : "Add to Cart"}
                                </button>
                                <Link
                                    href="/products"
                                    className="inline-flex items-center justify-center rounded-full border border-white/12 px-8 py-4 text-sm font-medium text-white/78 transition-colors hover:border-white/24 hover:bg-white/6 hover:text-white"
                                >
                                    Continue shopping
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mx-auto grid max-w-7xl gap-4 px-6 py-16 md:grid-cols-3 md:px-12 lg:px-20">
                    {[
                        ["Material discipline", "Anodised aluminium, tuned for durability and a cleaner visual finish."],
                        ["Daily workflow", "Compact enough for a pocket, deliberate enough for a desk."],
                        ["System continuity", "The same brand language carries across the whole product line."],
                    ].map(([title, body]) => (
                        <div key={title} className="rounded-3xl border border-white/10 bg-white/5 p-6">
                            <p className="text-sm font-semibold text-white">{title}</p>
                            <p className="mt-3 text-sm leading-7 text-white/55">{body}</p>
                        </div>
                    ))}
                </section>

                <Footer />
            </main>
        </>
    );
}
