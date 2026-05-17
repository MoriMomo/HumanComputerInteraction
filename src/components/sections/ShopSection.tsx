"use client";

import Image from "next/image";
import { memo } from "react";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCart } from "@/contexts/CartProvider";
import { useCurrency } from "@/contexts/CurrencyProvider";

gsap.registerPlugin(ScrollTrigger);

const products = [
    {
        id: "standard",
        name: "SatSet Standard",
        price: 79,
        color: "var(--color-brand-mountain)",
        colorLabel: "Storm Grey",
        capacity: "4–6 cards",
        features: [
            "RFID blocking layer",
            "Micro-blasted finish",
            "Spring clip mechanism",
            "1-year warranty",
        ],
        badge: null,
        cta: "Add to Cart",
        bgPaleClass: "bg-brand-mountain/8",
        bgSolidClass: "bg-brand-mountain",
        glowClass: "[background:radial-gradient(circle_at_50%_50%,var(--color-brand-mountain),transparent_70%)]",
        textColorClass: "text-brand-mountain",
    },
    {
        id: "pro",
        name: "SatSet Pro",
        price: 129,
        color: "var(--color-brand-primary)",
        colorLabel: "Graphite",
        capacity: "4–8 cards",
        features: [
            "RFID blocking layer",
            "PVD-coated finish",
            "Modular rail system",
            "Cash strap included",
            "2-year warranty",
        ],
        badge: "Most Popular",
        cta: "Add to Cart",
        bgPaleClass: "bg-brand-primary/8",
        bgSolidClass: "bg-brand-primary",
        glowClass: "[background:radial-gradient(circle_at_50%_50%,var(--color-brand-primary),transparent_70%)]",
        textColorClass: "text-brand-primary",
    },
    {
        id: "executive",
        name: "SatSet Executive",
        price: 199,
        color: "#231711",
        colorLabel: "Midnight Black",
        capacity: "4–8 cards + cash",
        features: [
            "RFID blocking layer",
            "DLC stealth coating",
            "Full modular system",
            "AirTag slot included",
            "USB-C key ring",
            "Lifetime warranty",
        ],
        badge: "Premium",
        cta: "Add to Cart",
        bgPaleClass: "bg-brand-dark/8",
        bgSolidClass: "bg-brand-dark",
        glowClass: "[background:radial-gradient(circle_at_50%_50%,#231711,transparent_70%)]",
        textColorClass: "text-brand-dark",
    },
];

const PRODUCT_ID_TO_SLUG: Record<string, string> = {
    standard: "cardholder-pro",
    pro: "wallet-elite",
    executive: "desk-organizer",
};

function ShopSection() {
    const { format } = useCurrency();
    const sectionRef = useRef<HTMLElement>(null);
    const [cart, setCart] = useState<Record<string, number>>({});
    const { addItem } = useCart();

    useGSAP(
        () => {
            const sectionEl = sectionRef.current;
            if (!sectionEl) {
                return;
            }

            gsap.set(".shop-title, .shop-card", { clearProps: "all" });

            if (ScrollTrigger.isInViewport(sectionEl, 0.12)) {
                gsap.set(".shop-title, .shop-card", {
                    y: 0,
                    autoAlpha: 1,
                    clearProps: "transform,opacity,visibility,translate,rotate,scale",
                });
                return;
            }

            gsap.fromTo(
                ".shop-title",
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    immediateRender: false,
                    scrollTrigger: {
                        trigger: sectionEl,
                        start: "top 86%",
                        once: true,
                    },
                }
            );

            gsap.fromTo(
                ".shop-card",
                { y: 70, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.15,
                    duration: 1.1,
                    ease: "power3.out",
                    immediateRender: false,
                    scrollTrigger: {
                        trigger: sectionEl,
                        start: "top 85%",
                        once: true,
                    },
                }
            );

            gsap.to(".shop-orb", {
                xPercent: 10,
                yPercent: -14,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionEl,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                },
            });

            ScrollTrigger.refresh();
        },
        { scope: sectionRef }
    );

    const addToCart = (id: string) => {
        const mappedSlug = PRODUCT_ID_TO_SLUG[id];
        if (mappedSlug) {
            addItem({ slug: mappedSlug });
        }

        setCart((prev) => ({
            ...prev,
            [id]: (prev[id] || 0) + 1,
        }));
    };

    return (
        <section
            id="shop"
            ref={sectionRef}
            className="relative py-32 md:py-40 bg-white overflow-hidden"
        >
            {/* Grid overlay */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-10 [background:linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-size-[120px_120px]"
            />
            <div
                aria-hidden
                className="shop-orb section-orb pointer-events-none absolute right-[5%] -top-24 h-96 w-96 rounded-full bg-[#231711]/12 blur-3xl"
            />
            <div
                aria-hidden
                className="pointer-events-none absolute left-[5%] bottom-0 h-96 w-96 rounded-full bg-black/5 blur-3xl"
            />
            <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 lg:px-20">
                {/* Label + title */}
                <p className="shop-title mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
                    Shop
                </p>
                <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <h2 className="shop-title max-w-lg text-4xl font-bold leading-tight text-[#231711] md:text-5xl">
                        Choose your{" "}
                        <span className="italic text-primary">perfect carry</span>.
                    </h2>
                    <p className="shop-title max-w-xs text-sm leading-relaxed text-[#231711]/60">
                        Premium cardholder for the discerning professional. Crafted to last.
                    </p>
                </div>

                {/* Product cards */}
                <div className="shop-grid grid grid-cols-1 gap-8 md:grid-cols-3">
                    {products.map((product) => {
                        const inCart = cart[product.id] || 0;
                        const isPopular = product.badge === "Most Popular";

                        return (
                            <div
                                key={product.id}
                                className={`shop-card group relative flex flex-col overflow-hidden rounded-3xl border backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-brand-primary/20 hover:shadow-xl hover:shadow-black/5 bg-white ${isPopular
                                    ? "border-brand-primary/20 shadow-lg shadow-brand-primary/10"
                                    : "border-black/5"
                                    }`}
                            >
                                {/* Badge */}
                                {product.badge && (
                                    <div
                                        className={`absolute right-5 top-5 z-10 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest ${isPopular
                                            ? "bg-brand-primary text-white"
                                            : "bg-black/5 text-[#231711]/60"
                                            }`}
                                    >
                                        {product.badge}
                                    </div>
                                )}

                                {/* Product render preview */}
                                <div className="relative flex h-48 items-center justify-center overflow-hidden bg-black/3">
                                    <Image
                                        src={`/products/${product.id === 'pro' ? 'wallet-elite.svg' : product.id === 'executive' ? 'desk-organizer.svg' : 'cardholder-pro.svg'}`}
                                        alt={`${product.name} render`}
                                        width={480}
                                        height={360}
                                        priority={false}
                                        className="h-36 w-auto object-contain drop-shadow-[0_20px_60px_rgba(0,0,0,0.45)] transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div aria-hidden className={`pointer-events-none absolute inset-0 opacity-6 ${product.glowClass}`} />
                                </div>

                                {/* Content */}
                                <div className="flex flex-1 flex-col gap-6 p-7">
                                    <div>
                                        <p className="mb-1 text-sm font-medium uppercase tracking-widest text-[#231711]/60">
                                            {product.colorLabel} · {product.capacity}
                                        </p>
                                        <h3 className="text-2xl font-semibold text-[#231711] group-hover:text-primary/90 transition-colors">
                                            {product.name}
                                        </h3>
                                    </div>

                                    {/* Price */}
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-3xl font-semibold text-[#231711]">
                                            {format(product.price)}
                                        </span>
                                    </div>

                                    {/* Feature list */}
                                    <ul className="flex flex-1 flex-col gap-2.5">
                                        {product.features.map((f) => (
                                            <li key={f} className="flex items-center gap-3 text-base font-medium text-[#231711]/95">
                                                <svg className="h-5 w-5 shrink-0 text-[#231711]/90" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                </svg>
                                                {f}
                                            </li>
                                        ))}
                                    </ul>

                                    {/* CTA */}
                                    <button
                                        onClick={() => addToCart(product.id)}
                                        className={`group/btn mt-2 h-12 w-full rounded-full text-base font-semibold tracking-wide transition-all duration-300 relative overflow-hidden ${isPopular
                                            ? "bg-white text-[#111111] hover:bg-white/95"
                                            : "bg-black/5 text-[#231711] border border-black/10 hover:bg-black/10"
                                            }`}
                                    >
                                        <span className="relative z-10 flex items-center justify-center gap-2">
                                            <svg
                                                className="h-5 w-5 transition-transform group-hover/btn:scale-110"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                {inCart > 0 ? (
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M5 13l4 4L19 7"
                                                    />
                                                ) : (
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                                    />
                                                )}
                                            </svg>
                                            {inCart > 0 ? `In Cart (${inCart})` : product.cta}
                                        </span>
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Trust signals */}
                <div className="mt-20 flex flex-col gap-12 border-t border-black/5 pt-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="mb-3 flex items-center justify-center">
                                <svg className="h-8 w-8 text-[#231711]/80" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h18M3 17h18" /></svg>
                            </div>
                            <p className="text-3xl font-semibold text-[#231711]">30-Day</p>
                            <p className="text-sm font-medium text-[#231711]/70 mt-2">Free Returns</p>
                        </div>
                        <div className="text-center">
                            <div className="mb-3 flex items-center justify-center">
                                <svg className="h-8 w-8 text-[#231711]/80" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 2l3 6 6 .5-4.5 3.5L19 20l-7-4-7 4 1.5-7L2 8.5 8 8z" /></svg>
                            </div>
                            <p className="text-3xl font-semibold text-[#231711]">2-Year</p>
                            <p className="text-sm font-medium text-[#231711]/70 mt-2">Warranty</p>
                        </div>
                        <div className="text-center">
                            <div className="mb-3 flex items-center justify-center">
                                <svg className="h-8 w-8 text-[#231711]/80" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7-5 7 5v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" /></svg>
                            </div>
                            <p className="text-3xl font-semibold text-[#231711]">Free</p>
                            <p className="text-sm font-medium text-[#231711]/70 mt-2">Worldwide Shipping</p>
                        </div>
                        <div className="text-center">
                            <div className="mb-3 flex items-center justify-center">
                                <svg className="h-8 w-8 text-[#231711]/80" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.389 2.455a1 1 0 00-.364 1.118l1.286 3.966c.3.921-.755 1.688-1.539 1.118l-3.389-2.455a1 1 0 00-1.175 0l-3.389 2.455c-.784.57-1.838-.197-1.539-1.118l1.286-3.966a1 1 0 00-.364-1.118L2.036 9.393c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69L11.05 2.927z" /></svg>
                            </div>
                            <p className="text-3xl font-semibold text-[#231711]">4.9★</p>
                            <p className="text-sm font-medium text-[#231711]/70 mt-2">2,400+ Reviews</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default memo(ShopSection);