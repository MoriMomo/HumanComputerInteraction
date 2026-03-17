"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { PRODUCTS } from "@/data/products";

gsap.registerPlugin(ScrollTrigger);

const COLOR_PREVIEW_COUNT = 3;

export default function ProductsPage() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const ctx = gsap.context(() => {
                const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
                if (prefersReducedMotion) return;

                gsap.fromTo(
                    ".products-hero-text",
                    { y: 60, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1, ease: "power4.out", stagger: 0.12 }
                );

                gsap.fromTo(
                    ".product-card",
                    { y: 70, opacity: 0, scale: 0.97 },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        stagger: 0.14,
                        duration: 0.9,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: ".products-grid",
                            start: "top 85%",
                            once: true,
                        },
                    }
                );
            }, containerRef);

            return () => ctx.revert();
        },
        { scope: containerRef }
    );

    return (
        <>
            <Navbar />
            <div ref={containerRef} className="min-h-screen bg-[#0a0f16] text-white">
                {/* Hero */}
                <section className="relative pt-40 pb-20 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
                    <div
                        aria-hidden
                        className="pointer-events-none absolute left-0 top-32 h-72 w-72 rounded-full bg-[#3b4a5a]/18 blur-2xl"
                    />
                    <p className="products-hero-text text-xs font-semibold tracking-[0.28em] uppercase text-primary mb-6">
                        Collection
                    </p>
                    <h1 className="products-hero-text font-serif text-5xl md:text-7xl font-bold leading-tight mb-6 max-w-2xl">
                        Every detail,{" "}
                        <span className="italic text-primary">deliberate</span>.
                    </h1>
                    <p className="products-hero-text text-white/58 text-lg max-w-xl">
                        Engineered carry objects for the professional who refuses to compromise.
                    </p>
                </section>

                {/* Grid */}
                <section className="products-grid py-16 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {PRODUCTS.map((product) => (
                            <Link href={`/products/${product.slug}`} key={product.slug}>
                                <div className="product-card group relative rounded-3xl border border-white/10 bg-[#0f1620]/60 p-8 hover:border-white/22 transition-all duration-500 cursor-pointer overflow-hidden">
                                    <div
                                        aria-hidden
                                        className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    />

                                    {/* Placeholder visual */}
                                    <div className="relative aspect-square rounded-2xl mb-6 bg-linear-to-br from-white/6 to-white/3 border border-white/8 flex items-center justify-center overflow-hidden">
                                        <span className="material-symbols-outlined text-5xl text-white/18">
                                            credit_card
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-white/90 transition-colors">
                                        {product.name}
                                    </h3>
                                    <p className="text-white/52 text-sm mb-5 leading-relaxed">
                                        {product.description}
                                    </p>

                                    {/* Color chips */}
                                    <div className="flex items-center gap-2 mb-6">
                                        {product.colors.slice(0, COLOR_PREVIEW_COUNT).map((hex) => (
                                            <span
                                                key={hex}
                                                className="w-4 h-4 rounded-full border border-white/20 ring-1 ring-white/5"
                                                aria-label={hex}
                                                style={{ backgroundColor: hex }}
                                            />
                                        ))}
                                        {product.colors.length > COLOR_PREVIEW_COUNT && (
                                            <span className="text-xs text-white/35 ml-1">
                                                +{product.colors.length - COLOR_PREVIEW_COUNT}
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-lg font-semibold text-white">
                                            ${product.price}
                                        </span>
                                        <span className="flex items-center gap-1 text-sm text-white/40 group-hover:text-white/70 transition-colors">
                                            View details
                                            <span className="material-symbols-outlined text-base">
                                                arrow_forward
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                <Footer />
            </div>
        </>
    );
}
