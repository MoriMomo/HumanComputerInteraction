"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCart } from "@/contexts/CartProvider";

gsap.registerPlugin(ScrollTrigger);

const products = [
    {
        id: "standard",
        name: "SatSet Standard",
        price: 79,
        color: "#8E9AA6",
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
        bgPaleClass: "bg-[#8E9AA6]/8",
        bgSolidClass: "bg-[#8E9AA6]",
        glowClass: "[background:radial-gradient(circle_at_50%_50%,#8E9AA6,transparent_70%)]",
        textColorClass: "text-[#8E9AA6]",
    },
    {
        id: "pro",
        name: "SatSet Pro",
        price: 129,
        color: "#59636E",
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
        bgPaleClass: "bg-[#59636E]/8",
        bgSolidClass: "bg-[#59636E]",
        glowClass: "[background:radial-gradient(circle_at_50%_50%,#59636E,transparent_70%)]",
        textColorClass: "text-[#59636E]",
    },
    {
        id: "executive",
        name: "SatSet Executive",
        price: 199,
        color: "#1C1C1E",
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
        bgPaleClass: "bg-[#1C1C1E]/8",
        bgSolidClass: "bg-[#1C1C1E]",
        glowClass: "[background:radial-gradient(circle_at_50%_50%,#1C1C1E,transparent_70%)]",
        textColorClass: "text-[#1C1C1E]",
    },
];

const PRODUCT_ID_TO_SLUG: Record<string, string> = {
    standard: "cardholder-pro",
    pro: "wallet-elite",
    executive: "desk-organizer",
};

export default function ShopSection() {
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
            className="relative py-32 md:py-40 bg-[#584738] overflow-hidden"
        >
            <div aria-hidden className="absolute inset-0 bg-linear-to-b from-[#584738] via-[#584738] to-[#584738]" />
            <div
                aria-hidden
                className="shop-orb section-orb pointer-events-none absolute right-[5%] -top-24 h-96 w-96 rounded-full bg-[#3b4a5a]/12 blur-3xl"
            />
            <div
                aria-hidden
                className="pointer-events-none absolute left-[5%] bottom-0 h-96 w-96 rounded-full bg-[#1e3a5f]/8 blur-3xl"
            />
            <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 lg:px-20">
                {/* Label + title */}
                <p className="shop-title mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
                    Shop
                </p>
                <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <h2 className="shop-title max-w-lg text-4xl font-bold leading-tight text-white md:text-5xl">
                        Choose your{" "}
                        <span className="italic text-primary">perfect carry</span>.
                    </h2>
                    <p className="shop-title max-w-xs text-sm leading-relaxed text-white/50">
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
                                className={`shop-card group relative flex flex-col overflow-hidden rounded-3xl border backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-white/15 ${isPopular
                                    ? "border-white/12 bg-white/6 shadow-xl shadow-black/30"
                                    : "border-white/8 bg-white/4"
                                    }`}
                            >
                                {/* Badge */}
                                {product.badge && (
                                    <div
                                        className={`absolute right-5 top-5 z-10 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest ${isPopular
                                            ? "bg-white/20 text-white/90"
                                            : "bg-white/10 text-white/60"
                                            }`}
                                    >
                                        {product.badge}
                                    </div>
                                )}

                                {/* Color preview */}
                                <div
                                    className={`relative flex h-48 items-center justify-center overflow-hidden bg-white/2`}
                                >
                                    <div
                                        className={`h-28 w-28 rounded-2xl shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${product.bgSolidClass}`}
                                    />
                                    <div
                                        aria-hidden="true"
                                        className={`pointer-events-none absolute inset-0 opacity-20 mix-blend-screen ${product.glowClass}`}
                                    />
                                </div>

                                {/* Content */}
                                <div className="flex flex-1 flex-col gap-6 p-7">
                                    <div>
                                        <p className="mb-1 text-xs font-medium uppercase tracking-widest text-white/40">
                                            {product.colorLabel} · {product.capacity}
                                        </p>
                                        <h3 className="text-xl font-bold text-white group-hover:text-primary/90 transition-colors">
                                            {product.name}
                                        </h3>
                                    </div>

                                    {/* Price */}
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-3xl font-bold text-white">
                                            ${product.price}
                                        </span>
                                        <span className="text-sm text-white/40">USD</span>
                                    </div>

                                    {/* Feature list */}
                                    <ul className="flex flex-1 flex-col gap-2.5">
                                        {product.features.map((f) => (
                                            <li key={f} className="flex items-center gap-2.5 text-sm text-white/60">
                                                <svg
                                                    className={`h-5 w-5 shrink-0 text-primary/70`}
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                {f}
                                            </li>
                                        ))}
                                    </ul>

                                    {/* CTA */}
                                    <button
                                        onClick={() => addToCart(product.id)}
                                        className={`group/btn mt-2 h-12 w-full rounded-full text-sm font-semibold tracking-wide transition-all duration-300 relative overflow-hidden ${isPopular
                                            ? "bg-white text-black hover:shadow-lg hover:shadow-white/20"
                                            : "bg-white/10 text-white border border-white/20 hover:bg-white/20"
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
                <div className="mt-20 flex flex-col gap-12 border-t border-white/8 pt-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-white">30-Day</p>
                            <p className="text-xs text-white/40 mt-2">Free Returns</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-bold text-white">2-Year</p>
                            <p className="text-xs text-white/40 mt-2">Warranty</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-bold text-white">Free</p>
                            <p className="text-xs text-white/40 mt-2">Worldwide Shipping</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-bold text-white">4.9★</p>
                            <p className="text-xs text-white/40 mt-2">2,400+ Reviews</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}