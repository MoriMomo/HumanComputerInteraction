"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GridMap from "@/components/ui/GridMap";
import Product3DViewer from "@/components/products/Product3DViewer";
import SmartImage from "@/components/ui/SmartImage";
import LoadingLink from "@/components/ui/LoadingLink";
import { useCart } from "@/contexts/CartProvider";
import { PRODUCTS, PRODUCT_MAP } from "@/data/products";
import { trackEvent } from "@/lib/analytics";
import SafeJsonLd from "@/components/ui/SafeJsonLd";
import RecentlyViewed from "@/components/products/RecentlyViewed";
import ProductReviews from "@/components/products/ProductReviews";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { useCurrency } from "@/contexts/CurrencyProvider";

const PRODUCT_REVIEW_SNIPPETS = [
    { name: "Reza", note: "The finish still looks clean after daily commute use.", rating: 5 },
    { name: "Maya", note: "Slim carry, zero rattle, and easy one-hand access.", rating: 5 },
    { name: "Dion", note: "Feels premium and the modular rail is genuinely useful.", rating: 4 },
];

const PRODUCT_RELATED_JOURNAL: Record<string, string[]> = {
    "cardholder-pro": ["premium-materials-guide", "rfid-myths-and-real-utility"],
    "wallet-elite": ["minimalist-carry-essentials", "finish-selection-for-long-term-use"],
    "desk-organizer": ["office-organization-tips", "designing-for-one-handed-use"],
};

const SWATCH_BG_CLASS: Record<string, string> = {
    "var(--color-brand-primary)": "bg-brand-primary",
    "#231711": "bg-brand-dark",
    "var(--color-brand-mountain)": "bg-brand-mountain",
    "var(--color-brand-sand)": "bg-brand-sand",
    "var(--color-brand-darker)": "bg-brand-darker",
};

export default function ProductDetailPage() {
    const params = useParams<{ slug: string }>();
    const slug = params?.slug ?? "";
    const containerRef = useRef<HTMLDivElement>(null);
    const product = PRODUCT_MAP.get(slug) ?? PRODUCTS[0];
    const [selectedColor, setSelectedColor] = useState(product.colors[0]);
    const [selected3D, setSelected3D] = useState<string | null>(null);
    const [selected3DColor, setSelected3DColor] = useState<string | null>(null);
    const [addedToCart, setAddedToCart] = useState(false);
    const [activeVisualTab, setActiveVisualTab] = useState<"3d" | "gallery">("3d");
    const [renderMode, setRenderMode] = useState<"normal" | "glass" | "wireframe">(product.scene3d?.renderMode ?? "normal");
    const { addItem } = useCart();
    const { format, currency, rate } = useCurrency();

    const whatsappUrl = getWhatsAppUrl(`Hi SatSet, I want help choosing ${product.name}. Color: ${selectedColor}`);
    const productSchema = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        description: product.description,
        image: product.image?.src ? [product.image.src] : [],
        brand: { "@type": "Brand", name: "SatSet" },
        offers: {
            "@type": "Offer",
            priceCurrency: currency,
            price: currency === "IDR" ? Math.round(product.price * rate) : product.price,
            availability: "https://schema.org/InStock",
        },
        aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            reviewCount: "2400",
        },
    };

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
        trackEvent("add_to_cart", { slug: product.slug, color: selectedColor, price: product.price });
        // actually add the product to the cart
        addItem({ slug: product.slug, color: selectedColor });
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2500);
    };

    return (
        <>
            <Navbar />
            <SafeJsonLd data={productSchema} />
            <main ref={containerRef} className="min-h-screen bg-white pb-28 text-[#231711] md:pb-0">
                <section className="relative overflow-hidden border-b border-stone-200 bg-stone-50/50">
                    <GridMap spacing={140} opacity={0.04} color="rgba(35,23,17,0.04)" />
                    <div className="relative mx-auto grid max-w-7xl gap-10 px-6 pb-16 pt-36 md:px-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:px-20 lg:pb-20 lg:pt-40 items-start">
                        <div className="detail-visual lg:sticky lg:top-28">
                            <LoadingLink
                                href="/products"
                                className="inline-flex items-center gap-2 text-sm text-stone-500 transition-colors hover:text-stone-900"
                            >
                                <span className="material-symbols-outlined text-base">arrow_back</span>
                                All Products
                            </LoadingLink>

                            <div className="mt-8 rounded-4xl border border-stone-200 bg-white p-4 shadow-lg">
                                <div className="relative h-[480px] w-full overflow-hidden rounded-3xl bg-stone-100">
                                    {activeVisualTab === "3d" ? (
                                        <div className="h-full w-full">
                                            <Product3DViewer
                                                product={product}
                                                color={selectedColor}
                                                renderMode={renderMode}
                                                className="h-full w-full p-0"
                                                onSelect={(name) => {
                                                    setSelected3D(name);
                                                    const m = name.match(/#?([0-9A-Fa-f]{6})/);
                                                    setSelected3DColor(m ? `#${m[1]}` : null);
                                                    // auto-clear badge after a few seconds
                                                    window.setTimeout(() => setSelected3D(null), 5000);
                                                }}
                                            />

                                            {/* Selected-state badge */}
                                            {selected3D && (
                                                <div data-testid="product-3d-selected-badge" className="absolute top-4 right-4 z-50 pointer-events-auto">
                                                    <div className="flex items-center gap-3 rounded-full border border-stone-205 bg-white/95 px-3 py-2 text-xs text-stone-900 shadow-md">
                                                        <div className="text-xs font-semibold">Selected:</div>
                                                        <div className="max-w-[9rem] truncate font-medium">{selected3D}</div>
                                                        <div className="flex items-center gap-1">
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    if (selected3DColor) setSelectedColor(selected3DColor);
                                                                }}
                                                                disabled={!selected3DColor}
                                                                className={`rounded-full border px-3 py-1 text-[11px] transition-colors cursor-pointer ${selected3DColor ? 'bg-stone-900 border-stone-900 text-white' : 'bg-transparent border-stone-200 text-stone-400'}`}
                                                            >
                                                                Use as color
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    // add item with the current selected color (prefers 3D-derived color if available)
                                                                    const colorToUse = selected3DColor ?? selectedColor;
                                                                    trackEvent("add_to_cart_from_3d", { slug: product.slug, color: colorToUse });
                                                                    addItem({ slug: product.slug, color: colorToUse });
                                                                    setAddedToCart(true);
                                                                    setTimeout(() => setAddedToCart(false), 2500);
                                                                }}
                                                                className="rounded-full bg-stone-900 px-3 py-1 text-[11px] font-semibold text-white cursor-pointer"
                                                            >
                                                                Add
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="relative h-full w-full bg-stone-50">
                                            <SmartImage
                                                src={product.image?.src ?? "/productIImg/download-1.png"}
                                                alt={product.image?.alt ?? product.name}
                                                fill
                                                sizes="(max-width: 768px) 100vw, 40vw"
                                                className="object-contain p-6"
                                                priority
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* Media Switcher Tab Controls */}
                                <div className="mt-4 flex justify-center">
                                    <div className="inline-flex rounded-full border border-stone-200 bg-stone-100 p-1">
                                        <button
                                            type="button"
                                            onClick={() => setActiveVisualTab("3d")}
                                            className={`rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-[0.15em] transition-all duration-300 cursor-pointer ${
                                                activeVisualTab === "3d"
                                                    ? "bg-stone-900 text-white shadow-md"
                                                    : "text-stone-600 hover:text-stone-900"
                                            }`}
                                        >
                                            Interactive 3D
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setActiveVisualTab("gallery")}
                                            className={`rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-[0.15em] transition-all duration-300 cursor-pointer ${
                                                activeVisualTab === "gallery"
                                                    ? "bg-stone-900 text-white shadow-md"
                                                    : "text-stone-600 hover:text-stone-900"
                                            }`}
                                        >
                                            Photo Gallery
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 grid gap-3 sm:grid-cols-3">
                                {[
                                    ["RFID", "Protected"],
                                    ["Weight", "18g"],
                                    ["Warranty", "Lifetime"],
                                ].map(([label, value]) => (
                                    <div key={label} className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-4">
                                        <div className="text-[11px] uppercase tracking-[0.24em] text-stone-400">{label}</div>
                                        <div className="mt-2 text-sm font-semibold text-stone-800">{value}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="detail-info lg:pl-4">
                            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary mb-4">
                                SatSet Collection
                            </p>
                            <h1 className="max-w-xl font-serif text-4xl font-bold leading-tight md:text-6xl text-[#231711]">
                                {product.name}
                            </h1>
                            <p className="mt-4 max-w-xl text-lg leading-8 text-stone-650">
                                {product.description}
                            </p>

                            <div className="mt-8 flex items-end gap-4 border-b border-stone-200 pb-8">
                                <p className="text-4xl font-light text-stone-900 md:text-5xl">{format(product.price)}</p>
                                <p className="pb-1 text-sm uppercase tracking-[0.24em] text-stone-400">Starting price</p>
                            </div>

                            {/* Color Swatches */}
                            <div className="detail-feature mt-8 bg-white border border-stone-200 rounded-3xl p-6 shadow-sm">
                                <p className="text-xs uppercase tracking-widest text-stone-500 font-semibold mb-4">
                                    Material Color
                                </p>
                                <div className="grid grid-cols-4 gap-3 mb-4">
                                    {product.colors.map((hex) => {
                                        const isSelected = selectedColor === hex;
                                        const colorLabel = hex.replace("var(--color-brand-", "").replace(")", "").replace("#", "");
                                        return (
                                            <button
                                                key={hex}
                                                onClick={() => setSelectedColor(hex)}
                                                className={`relative w-full aspect-square rounded-xl transition-all cursor-pointer ${
                                                    isSelected
                                                        ? "ring-2 ring-stone-900 ring-offset-2"
                                                        : "hover:scale-105"
                                                }`}
                                                aria-label={`Select ${colorLabel}`}
                                            >
                                                <div
                                                    className={`w-full h-full rounded-xl border border-stone-200/50 ${SWATCH_BG_CLASS[hex] ?? "bg-swatch-steel"}`}
                                                    style={!SWATCH_BG_CLASS[hex] ? { backgroundColor: hex } : undefined}
                                                />

                                                {isSelected && (
                                                    <span className="absolute inset-0 flex items-center justify-center">
                                                        <svg className="w-5 h-5 text-white drop-shadow" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                        </svg>
                                                    </span>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                    <p className="text-stone-900 font-semibold capitalize">
                                        Finish: {selectedColor.replace("var(--color-brand-", "").replace(")", "").replace("#", "")}
                                    </p>
                                    <p className="text-stone-400 font-mono">{selectedColor}</p>
                                </div>
                            </div>

                            {/* Render Mode */}
                            <div className="detail-feature mt-4 bg-white border border-stone-200 rounded-3xl p-6 shadow-sm">
                                <p className="text-xs uppercase tracking-widest text-stone-500 font-semibold mb-4">
                                    Render Mode
                                </p>
                                <div className="flex gap-2">
                                    {[
                                        { id: "normal", label: "Normal" },
                                        { id: "glass", label: "Glass" },
                                        { id: "wireframe", label: "Wireframe" },
                                    ].map((mode) => (
                                        <button
                                            key={mode.id}
                                            onClick={() => setRenderMode(mode.id as "normal" | "glass" | "wireframe")}
                                            className={`flex-1 px-4 py-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                                                renderMode === mode.id
                                                    ? "bg-stone-900 border border-stone-900 text-white shadow-sm"
                                                    : "bg-white border border-stone-200 text-stone-700 hover:bg-stone-50"
                                            }`}
                                        >
                                            {mode.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="detail-feature mt-8 flex flex-col gap-4 sm:flex-row">
                                <button
                                    onClick={handleAddToCart}
                                    className="flex-1 rounded-full bg-stone-900 px-8 py-4 font-semibold text-white transition-colors hover:bg-stone-850 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer hover:shadow-md transition-all duration-200"
                                    disabled={addedToCart}
                                >
                                    {addedToCart ? "Added to Cart ✓" : "Add to Cart"}
                                </button>
                                <LoadingLink
                                    href="/products"
                                    className="inline-flex items-center justify-center rounded-full border border-stone-200 bg-white px-8 py-4 text-sm font-medium text-stone-700 transition-colors hover:border-stone-300 hover:bg-stone-50 hover:text-stone-900"
                                >
                                    Continue shopping
                                </LoadingLink>
                            </div>

                            {whatsappUrl ? (
                                <a
                                    href={whatsappUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="detail-feature mt-4 inline-flex w-full items-center justify-center rounded-full border border-[#25D366]/20 bg-[#25D366]/5 px-8 py-4 text-sm font-semibold text-[#1fb85b] transition-colors hover:bg-[#25D366]/10"
                                >
                                    Chat Customer Service
                                </a>
                            ) : null}
                        </div>
                    </div>
                </section>

                {/* Restructured content below the fold */}
                <section className="mx-auto max-w-7xl px-6 py-16 md:px-12 lg:px-20 border-b border-stone-100">
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="rounded-3xl border border-stone-200 bg-stone-50 p-6">
                            <p className="text-xs uppercase tracking-[0.24em] text-stone-500 font-semibold mb-4">Core features</p>
                            <div className="space-y-3">
                                {product.features.map((feature) => (
                                    <div key={feature} className="flex items-center gap-3 text-sm text-stone-700 font-medium">
                                        <span className="material-symbols-outlined text-base text-primary">check_circle</span>
                                        {feature}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-3xl border border-stone-200 bg-stone-50 p-6">
                            <p className="text-xs uppercase tracking-[0.24em] text-stone-500 font-semibold mb-4">Product notes</p>
                            <p className="text-sm leading-7 text-stone-600 font-medium">
                                Built as a compact essential with a clean silhouette, tactile finish, and simple daily use.
                            </p>
                            <div className="mt-6 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.2em] text-stone-500 font-medium">
                                <span className="rounded-full border border-stone-200 bg-white px-3 py-1">Everyday carry</span>
                                <span className="rounded-full border border-stone-200 bg-white px-3 py-1">Compact form</span>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mx-auto max-w-7xl px-6 py-12 md:px-12 lg:px-20 border-b border-stone-100">
                    <ProductReviews
                        reviews={PRODUCT_REVIEW_SNIPPETS}
                        aggregateRating="4.9"
                        reviewCount="2,400"
                    />
                </section>

                <section className="mx-auto max-w-7xl px-6 py-16 md:px-12 lg:px-20 border-b border-stone-100">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-400">Often bought together</p>
                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                        {PRODUCTS.filter((entry) => entry.slug !== product.slug)
                            .slice(0, 2)
                            .map((entry) => (
                                <div key={entry.slug} className="rounded-3xl border border-stone-200 bg-stone-50 p-6 flex flex-col justify-between">
                                    <div>
                                        <p className="text-sm font-semibold text-stone-900">{entry.name}</p>
                                        <p className="mt-1 text-xs text-stone-500">{format(entry.price)}</p>
                                    </div>
                                    <div className="mt-6 flex items-center gap-3">
                                        <button
                                            type="button"
                                            onClick={() => addItem({ slug: entry.slug })}
                                            className="rounded-full border border-stone-300 bg-white px-4 py-2 text-xs uppercase tracking-[0.2em] text-stone-700 font-semibold transition-colors hover:border-stone-400 hover:bg-stone-50 cursor-pointer"
                                        >
                                            Add
                                        </button>
                                        <LoadingLink
                                            href={`/products/${entry.slug}`}
                                            className="text-xs uppercase tracking-[0.2em] text-stone-500 hover:text-stone-800 font-semibold"
                                        >
                                            View
                                        </LoadingLink>
                                    </div>
                                </div>
                            ))}
                    </div>
                </section>

                <section className="mx-auto grid max-w-7xl gap-4 px-6 py-16 md:grid-cols-3 md:px-12 lg:px-20 border-b border-stone-100">
                    {[
                        ["Material discipline", "Anodised aluminium, tuned for durability and a cleaner visual finish."],
                        ["Daily workflow", "Compact enough for a pocket, deliberate enough for a desk."],
                        ["System continuity", "The same brand language carries across the whole product line."],
                    ].map(([title, body]) => (
                        <div key={title} className="rounded-3xl border border-stone-200 bg-stone-50 p-6">
                            <p className="text-sm font-semibold text-stone-900">{title}</p>
                            <p className="mt-3 text-sm leading-7 text-stone-600">{body}</p>
                        </div>
                    ))}
                </section>

                <section className="mx-auto max-w-7xl px-6 pb-20 md:px-12 lg:px-20">
                    <div className="rounded-4xl border border-stone-200 bg-stone-50 p-8 md:p-10">
                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">Read before you buy</p>
                        <h2 className="mt-4 font-serif text-3xl font-bold tracking-tight md:text-4xl text-[#231711]">Journal notes related to this product.</h2>
                        <div className="mt-6 grid gap-4 md:grid-cols-2">
                            {(PRODUCT_RELATED_JOURNAL[product.slug] ?? []).map((journalSlug) => (
                                <LoadingLink
                                    key={journalSlug}
                                    href={`/blog/${journalSlug}`}
                                    className="rounded-2xl border border-stone-200 bg-white px-5 py-4 text-sm text-stone-700 transition-colors hover:border-stone-300 hover:bg-stone-50"
                                >
                                    {journalSlug.replaceAll("-", " ")}
                                </LoadingLink>
                            ))}
                        </div>
                    </div>
                </section>

                <RecentlyViewed currentSlug={product.slug} />

                <Footer />
            </main>

            <div className="fixed inset-x-0 bottom-0 z-90 border-t border-stone-200 bg-white/95 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 backdrop-blur-md md:hidden">
                <div className="mx-auto flex max-w-7xl items-center gap-3">
                    <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-stone-900">{product.name}</p>
                        <p className="text-xs text-stone-500">From {format(product.price)}</p>
                    </div>
                    <button
                        type="button"
                        onClick={handleAddToCart}
                        className="rounded-full bg-stone-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
                        disabled={addedToCart}
                    >
                        {addedToCart ? "Added ✓" : "Add"}
                    </button>
                    <LoadingLink
                        href="/cart"
                        className="rounded-full border border-stone-200 bg-stone-50 px-4 py-3 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-150"
                    >
                        Cart
                    </LoadingLink>
                </div>
            </div>
        </>
    );
}
