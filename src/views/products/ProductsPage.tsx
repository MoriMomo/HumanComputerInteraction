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
import { useCurrency } from "@/contexts/CurrencyProvider";

gsap.registerPlugin(ScrollTrigger);

const COLOR_PREVIEW_COUNT = 3;

const SWATCH_BG_CLASS: Record<string, string> = {
    "var(--color-brand-primary)": "bg-brand-primary",
    "#231711": "bg-brand-dark",
    "var(--color-brand-mountain)": "bg-brand-mountain",
    "var(--color-brand-sand)": "bg-brand-sand",
    "var(--color-brand-darker)": "bg-brand-darker",
};


export default function ProductsPage() {
    const { format } = useCurrency();
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
            <main ref={containerRef} className="min-h-screen bg-white text-[#231711]">
                <section className="relative overflow-hidden border-b border-black/5">
                    <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 z-10 [background:linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-size-[120px_120px]"
                    />

                    <div className="relative mx-auto grid max-w-7xl gap-10 px-6 pb-20 pt-36 md:px-12 lg:grid-cols-[1.05fr_0.95fr] lg:px-20 lg:pb-24 lg:pt-40 z-20">
                        <div className="flex flex-col justify-center">
                            <p className="products-hero-text mb-6 text-xs font-semibold uppercase tracking-[0.32em] text-primary">
                                Collection
                            </p>
                            <h1 className="products-hero-text max-w-3xl font-serif text-5xl font-bold leading-[0.95] tracking-tight md:text-7xl">
                                Every detail,
                                <span className="block italic text-primary">deliberate.</span>
                            </h1>
                            <p className="products-hero-text mt-6 max-w-xl text-lg leading-8 text-[#231711]/60">
                                Premium carry objects, presented with more structure, clarity, and visual confidence.
                            </p>

                            <div className="products-hero-text mt-10 flex flex-wrap gap-3">
                                <span className="rounded-full border border-black/10 bg-black/5 px-4 py-2 text-xs uppercase tracking-[0.24em] text-[#231711]/70">
                                    Aluminium
                                </span>
                                <span className="rounded-full border border-black/10 bg-black/5 px-4 py-2 text-xs uppercase tracking-[0.24em] text-[#231711]/70">
                                    RFID safe
                                </span>
                                <span className="rounded-full border border-black/10 bg-black/5 px-4 py-2 text-xs uppercase tracking-[0.24em] text-[#231711]/70">
                                    Modular system
                                </span>
                            </div>

                            <div className="products-hero-text mt-10 grid max-w-xl grid-cols-3 gap-4">
                                <div className="rounded-3xl border border-black/10 bg-black/5 p-4">
                                    <div className="text-2xl font-semibold text-[#231711]">3</div>
                                    <div className="mt-1 text-xs uppercase tracking-[0.22em] text-[#231711]/50">Products</div>
                                </div>
                                <div className="rounded-3xl border border-black/10 bg-black/5 p-4">
                                    <div className="text-2xl font-semibold text-[#231711]">6</div>
                                    <div className="mt-1 text-xs uppercase tracking-[0.22em] text-[#231711]/50">Finishes</div>
                                </div>
                                <div className="rounded-3xl border border-black/10 bg-black/5 p-4">
                                    <div className="text-2xl font-semibold text-[#231711]">1</div>
                                    <div className="mt-1 text-xs uppercase tracking-[0.22em] text-[#231711]/50">System</div>
                                </div>
                            </div>
                        </div>

                        <ProductImagePlaceholder
                            title={featuredProduct.name}
                            subtitle="Featured image slot"
                            className="products-hero-text min-h-128 p-3 shadow-[0_24px_100px_rgba(0,0,0,0.08)] bg-white rounded-3xl"
                            accent="from-black/5 via-black/[0.02] to-transparent"
                            imageSrc={featuredProduct.image?.src}
                            imageAlt={featuredProduct.image?.alt}
                            productSlug={featuredProduct.slug}
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
                            <p className="hidden max-w-md text-right text-sm leading-7 text-[#231711]/60 md:block">
                                Clear hierarchy, stronger visuals, and a more confident product presentation.
                            </p>
                            <LoadingLink
                                href="/products/compare?compare=cardholder-pro,wallet-elite,desk-organizer"
                                className="inline-flex rounded-full border border-black/10 bg-black/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-[#231711]/80 transition-colors hover:border-black/20 hover:bg-black/10"
                            >
                                Compare products
                            </LoadingLink>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {PRODUCTS.length === 0 ? (
                            <div className="col-span-full rounded-3xl border border-black/10 bg-black/5 p-12 text-center">
                                <h3 className="font-serif text-2xl font-semibold text-[#231711]">No products found</h3>
                                <p className="mt-2 text-[#231711]/60">We&apos;re currently restocking. Check back soon.</p>
                            </div>
                        ) : PRODUCTS.map((product) => (
                            <LoadingLink href={`/products/${product.slug}`} key={product.slug} className="focus:outline-none focus-visible:ring-4 focus-visible:ring-black/20 rounded-4xl block">
                                <div className="product-card group relative overflow-hidden rounded-4xl border border-black/10 bg-white p-7 transition-all duration-500 hover:-translate-y-1 hover:border-brand-primary/25 hover:shadow-xl hover:shadow-black/5">
                                    <div aria-hidden className="pointer-events-none absolute inset-0 bg-linear-to-br from-black/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                                    <div className="mb-6 flex items-center justify-between relative z-10">
                                        <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[#231711]/50">
                                            {product.slug === featuredProduct.slug ? "Featured" : "Collection"}
                                        </span>
                                        <span className="rounded-full border border-black/10 bg-black/5 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-[#231711]/60">
                                            {product.colors.length} finishes
                                        </span>
                                    </div>

                                    <ProductImagePlaceholder
                                        title={product.name}
                                        subtitle="Product image slot"
                                        className="mb-6 aspect-square p-5 relative z-10 bg-[rgba(0,0,0,0.02)] rounded-3xl"
                                        accent="from-black/5 via-[rgba(0,0,0,0.02)] to-transparent"
                                        imageSrc={product.image?.src}
                                        imageAlt={product.image?.alt}
                                        imageSizes={product.image?.sizes}
                                        productSlug={product.slug}
                                    />

                                    <div className="mb-6 rounded-3xl border border-black/5 bg-[rgba(0,0,0,0.03)] p-5 relative z-10">
                                        <h3 className="text-xl font-semibold text-[#231711] transition-colors group-hover:text-primary/90">
                                            {product.name}
                                        </h3>
                                        <p className="mt-2 text-sm leading-6 text-[#231711]/70">
                                            {product.description}
                                        </p>
                                    </div>

                                    <div className="mb-6 flex items-center gap-2 relative z-10">
                                        {product.colors.slice(0, COLOR_PREVIEW_COUNT).map((hex) => (
                                            <span
                                                key={hex}
                                                className={`h-4 w-4 rounded-full border border-black/10 ring-1 ring-black/5 ${SWATCH_BG_CLASS[hex] ?? "bg-swatch-steel"}`}
                                                aria-label={hex}
                                                role="img"
                                            />
                                        ))}
                                        {product.colors.length > COLOR_PREVIEW_COUNT && (
                                            <span className="ml-1 text-xs text-[#231711]/50">
                                                +{product.colors.length - COLOR_PREVIEW_COUNT}
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex items-center justify-between border-t border-black/5 pt-5 relative z-10">
                                        <span className="text-lg font-semibold text-[#231711]">{format(product.price)}</span>
                                        <span className="flex items-center gap-1 text-sm text-[#231711]/70 transition-colors group-hover:text-[#231711]">
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
                            <div key={title} className="rounded-3xl border border-black/10 bg-black/5 p-6">
                                <p className="text-sm font-semibold text-[#231711]">{title}</p>
                                <p className="mt-3 text-sm leading-7 text-[#231711]/60">{body}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <Footer />
            </main>
        </>
    );
}
