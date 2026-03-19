"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { useParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
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
            <div ref={containerRef} className="min-h-screen bg-[#0a0f16] text-white">
                <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pt-36 pb-28">
                    {/* Back link */}
                    <Link
                        href="/products"
                        className="inline-flex items-center gap-2 text-sm text-white/45 hover:text-white/80 transition-colors mb-12"
                    >
                        <span className="material-symbols-outlined text-base">arrow_back</span>
                        All Products
                    </Link>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        {/* Visual */}
                        <div className="detail-visual">
                            <div className="relative aspect-square rounded-3xl border border-white/10 bg-[#0f1620]/60 flex items-center justify-center overflow-hidden">
                                <div
                                    aria-hidden
                                    className="absolute inset-0 bg-linear-to-br from-white/4 to-transparent"
                                />
                                <span className="material-symbols-outlined text-8xl text-white/12">
                                    credit_card
                                </span>
                                {/* Selected colour swatch overlay */}
                                <div
                                    aria-hidden
                                    className={`absolute bottom-6 left-6 w-10 h-10 rounded-full border-2 border-white/25 shadow-lg ${SWATCH_BG_CLASS[selectedColor] ?? "bg-swatch-steel"}`}
                                    data-swatch={selectedColor}
                                />
                            </div>
                        </div>

                        {/* Info */}
                        <div className="detail-info">
                            <p className="text-xs font-semibold tracking-[0.28em] uppercase text-primary mb-4">
                                SatSet Collection
                            </p>
                            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-3 leading-tight">
                                {product.name}
                            </h1>
                            <p className="text-3xl text-white/80 font-light mb-6">${product.price}</p>
                            <p className="text-white/55 text-base leading-relaxed mb-10">
                                {product.description}
                            </p>

                            {/* Colour picker */}
                            <div className="mb-10">
                                <p className="text-xs uppercase tracking-widest text-white/45 mb-4">
                                    Finish
                                </p>
                                <div className="flex gap-3">
                                    {product.colors.map((hex) => (
                                        <button
                                            key={hex}
                                            onClick={() => setSelectedColor(hex)}
                                            aria-label={`Select colour ${hex}`}
                                            type="button"
                                            className={`w-10 h-10 rounded-full border-2 transition-all duration-200 ${selectedColor === hex
                                                ? "border-white scale-110 ring-2 ring-white/30"
                                                : "border-white/20 hover:border-white/45"
                                                } ${SWATCH_BG_CLASS[hex] ?? "bg-swatch-steel"}`}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Features */}
                            <div className="space-y-3 mb-10 pb-10 border-b border-white/10">
                                {product.features.map((feature) => (
                                    <div
                                        key={feature}
                                        className="detail-feature flex items-center gap-3 text-white/65 text-sm"
                                    >
                                        <span className="material-symbols-outlined text-base text-primary">
                                            check_circle
                                        </span>
                                        {feature}
                                    </div>
                                ))}
                            </div>

                            {/* CTA */}
                            <button
                                onClick={handleAddToCart}
                                className="w-full md:w-auto px-12 py-4 rounded-full bg-white text-[#0a0f16] font-semibold hover:bg-white/90 transition-all duration-300 disabled:opacity-60"
                                disabled={addedToCart}
                            >
                                {addedToCart ? "Added to Cart ✓" : "Add to Cart"}
                            </button>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        </>
    );
}
