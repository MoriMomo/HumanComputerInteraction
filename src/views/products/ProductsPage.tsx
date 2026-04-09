"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductImagePlaceholder from "@/components/products/ProductImagePlaceholder";
import LoadingLink from "@/components/ui/LoadingLink";
import { PRODUCTS } from "@/data/products";

gsap.registerPlugin(ScrollTrigger);

const COLOR_PREVIEW_COUNT = 3;

const SWATCH_BG_CLASS: Record<string, string> = {
    "#59636E": "bg-[#59636E]",
    "#1C1C1E": "bg-[#1C1C1E]",
    "#8E9AA6": "bg-[#8E9AA6]",
    "#BCA782": "bg-[#BCA782]",
    "#3C2F24": "bg-[#3C2F24]",
    "#8A683A": "bg-[#8A683A]",
};

export default function ProductsPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const featuredProduct = PRODUCTS[0];

    useGSAP(
        () => {
            const ctx = gsap.context(() => {
                const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

                if (prefersReducedMotion) {
                    return;
                }

                gsap.fromTo(
                    ".products-hero-text",
                    { y: 36, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.9, ease: "power4.out", stagger: 0.08 }
                );

                gsap.fromTo(
                    ".product-card",
                    { y: 30, opacity: 0, scale: 0.98 },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 0.8,
                        stagger: 0.12,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: ".products-grid",
                            start: "top 82%",
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
            <main ref={containerRef} className="min-h-screen bg-[#0a0f16] text-white">
                <section className="relative overflow-hidden border-b border-white/8">
                    <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(142,154,166,0.18),transparent_26%),radial-gradient(circle_at_75%_18%,rgba(180,138,99,0.14),transparent_24%),linear-gradient(180deg,#0b1118_0%,#0a0f16_100%)]" />

                    <div className="relative mx-auto grid max-w-7xl gap-10 px-6 pb-20 pt-36 md:px-12 lg:grid-cols-[1.05fr_0.95fr] lg:px-20 lg:pb-24 lg:pt-40">
                        <div className="flex flex-col justify-center">
                            <p className="products-hero-text mb-6 text-xs font-semibold uppercase tracking-[0.32em] text-primary">
                                Collection
                            </p>
                            <h1 className="products-hero-text max-w-3xl font-serif text-5xl font-bold leading-[0.95] tracking-tight md:text-7xl">
                                Every detail,
                                <span className="block italic text-primary">deliberate.</span>
                            </h1>
                            <p className="products-hero-text mt-6 max-w-xl text-lg leading-8 text-white/60">
                                Premium carry objects, presented with more structure, clarity, and visual confidence.
                            </p>

                            <div className="products-hero-text mt-10 flex flex-wrap gap-3">
                                <span className="rounded-full border border-white/10 bg-white/6 px-4 py-2 text-xs uppercase tracking-[0.24em] text-white/68">
                                    Aluminium
                                </span>
                                <span className="rounded-full border border-white/10 bg-white/6 px-4 py-2 text-xs uppercase tracking-[0.24em] text-white/68">
                                    RFID safe
                                </span>
                                <span className="rounded-full border border-white/10 bg-white/6 px-4 py-2 text-xs uppercase tracking-[0.24em] text-white/68">
                                    Modular system
                                </span>
                            </div>

                            <div className="products-hero-text mt-10 grid max-w-xl grid-cols-3 gap-4">
                                <div className="rounded-3xl border border-white/10 bg-white/6 p-4">
                                    <div className="text-2xl font-semibold text-white">3</div>
                                    <div className="mt-1 text-xs uppercase tracking-[0.22em] text-white/42">Products</div>
                                </div>
                                <div className="rounded-3xl border border-white/10 bg-white/6 p-4">
                                    <div className="text-2xl font-semibold text-white">6</div>
                                    <div className="mt-1 text-xs uppercase tracking-[0.22em] text-white/42">Finishes</div>
                                </div>
                                <div className="rounded-3xl border border-white/10 bg-white/6 p-4">
                                    <div className="text-2xl font-semibold text-white">1</div>
                                    <div className="mt-1 text-xs uppercase tracking-[0.22em] text-white/42">System</div>
                                </div>
                            </div>
                        </div>

                        <ProductImagePlaceholder
                            title={featuredProduct.name}
                            subtitle="Featured image slot"
                            className="products-hero-text min-h-128 p-3 shadow-[0_24px_100px_rgba(0,0,0,0.35)]"
                            accent="from-white/10 via-white/6 to-transparent"
                            imageSrc={featuredProduct.image?.src}
                            imageAlt={featuredProduct.image?.alt}
                            imagePriority
                            imageSizes={featuredProduct.image?.sizes}
                        />
                    </div>
                </section>

                <section className="products-grid mx-auto max-w-7xl px-6 py-16 md:px-12 lg:px-20">
                    <div className="mb-8 flex items-end justify-between gap-6">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">Shop the line</p>
                            <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight md:text-4xl">
                                Designed to feel complete.
                            </h2>
                        </div>
                        <div className="flex flex-col items-end gap-3">
                            <p className="hidden max-w-md text-right text-sm leading-7 text-white/52 md:block">
                                Clear hierarchy, stronger visuals, and a more confident product presentation.
                            </p>
                            <LoadingLink
                                href="/products/compare?compare=cardholder-pro,wallet-elite,desk-organizer"
                                className="inline-flex rounded-full border border-white/14 bg-white/6 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/78 transition-colors hover:border-white/28 hover:bg-white/10"
                            >
                                Compare products
                            </LoadingLink>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {PRODUCTS.map((product) => (
                            <LoadingLink href={`/products/${product.slug}`} key={product.slug}>
                                <div className="product-card group relative overflow-hidden rounded-4xl border border-white/10 bg-[#0f1620]/72 p-7 transition-all duration-500 hover:-translate-y-1 hover:border-white/24 hover:bg-[#111826]">
                                    <div aria-hidden className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/6 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                                    <div className="mb-6 flex items-center justify-between">
                                        <span className="text-xs font-semibold uppercase tracking-[0.24em] text-white/40">
                                            {product.slug === featuredProduct.slug ? "Featured" : "Collection"}
                                        </span>
                                        <span className="rounded-full border border-white/10 bg-white/6 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-white/55">
                                            {product.colors.length} finishes
                                        </span>
                                    </div>

                                    <ProductImagePlaceholder
                                        title={product.name}
                                        subtitle="Product image slot"
                                        className="mb-6 aspect-square p-5"
                                        accent="from-white/10 via-white/4 to-transparent"
                                        imageSrc={product.image?.src}
                                        imageAlt={product.image?.alt}
                                        imageSizes={product.image?.sizes}
                                    />

                                    <div className="mb-6 rounded-3xl border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-5">
                                        <h3 className="text-xl font-semibold text-white transition-colors group-hover:text-white/90">
                                            {product.name}
                                        </h3>
                                        <p className="mt-2 text-sm leading-6 text-white/54">
                                            {product.description}
                                        </p>
                                    </div>

                                    <div className="mb-6 flex items-center gap-2">
                                        {product.colors.slice(0, COLOR_PREVIEW_COUNT).map((hex) => (
                                            <span
                                                key={hex}
                                                className={`h-4 w-4 rounded-full border border-white/18 ring-1 ring-white/5 ${SWATCH_BG_CLASS[hex] ?? "bg-swatch-steel"}`}
                                                aria-label={hex}
                                            />
                                        ))}
                                        {product.colors.length > COLOR_PREVIEW_COUNT && (
                                            <span className="ml-1 text-xs text-white/35">
                                                +{product.colors.length - COLOR_PREVIEW_COUNT}
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex items-center justify-between border-t border-white/8 pt-5">
                                        <span className="text-lg font-semibold text-white">${product.price}</span>
                                        <span className="flex items-center gap-1 text-sm text-white/42 transition-colors group-hover:text-white/78">
                                            View details
                                            <span className="material-symbols-outlined text-base">arrow_forward</span>
                                        </span>
                                    </div>
                                </div>
                            </LoadingLink>
                        ))}
                    </div>
                </section>

                <section className="mx-auto max-w-7xl px-6 pb-20 md:px-12 lg:px-20">
                    <div className="grid gap-4 md:grid-cols-3">
                        {[
                            ["Precision materials", "Built around one consistent finish system and tactile details."],
                            ["Clear hierarchy", "Pricing, colors, and actions are visible without visual noise."],
                            ["Purchase ready", "An editorial presentation that feels closer to a real storefront."],
                        ].map(([title, body]) => (
                            <div key={title} className="rounded-3xl border border-white/10 bg-white/5 p-6">
                                <p className="text-sm font-semibold text-white">{title}</p>
                                <p className="mt-3 text-sm leading-7 text-white/55">{body}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <Footer />
            </main>
        </>
    );
}
