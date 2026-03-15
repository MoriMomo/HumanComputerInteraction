"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
        color: "#B48A63",
        colorLabel: "Desert Bronze",
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
        bgPaleClass: "bg-[#B48A63]/8",
        bgSolidClass: "bg-[#B48A63]",
        glowClass: "[background:radial-gradient(circle_at_50%_50%,#B48A63,transparent_70%)]",
        textColorClass: "text-[#B48A63]",
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

export default function ShopSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const [cart, setCart] = useState<Record<string, number>>({});

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
                    duration: 0.8,
                    ease: "power3.out",
                    immediateRender: false,
                    scrollTrigger: {
                        trigger: sectionEl,
                        start: "top 92%",
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
                    duration: 0.9,
                    ease: "power3.out",
                    immediateRender: false,
                    scrollTrigger: {
                        trigger: sectionEl,
                        start: "top 90%",
                        once: true,
                    },
                }
            );

            ScrollTrigger.refresh();
        },
        { scope: sectionRef }
    );

    const addToCart = (id: string) => {
        setCart((prev) => ({
            ...prev,
            [id]: (prev[id] || 0) + 1,
        }));
    };

    return (
        <section id="shop" ref={sectionRef} className="relative bg-white py-28">
            <div className="mx-auto max-w-7xl px-4 md:px-10 lg:px-20">
                {/* Label + title */}
                <p className="shop-title mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-amber-700">
                    Shop
                </p>
                <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <h2 className="shop-title max-w-lg text-4xl font-bold leading-tight text-stone-900 md:text-5xl">
                        Choose your{" "}
                        <span className="italic text-amber-700">carry companion</span>.
                    </h2>
                    <p className="shop-title max-w-xs text-sm leading-relaxed text-stone-500">
                        Free shipping on orders over $100. 30-day returns. Ships worldwide.
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
                                className={`shop-card relative flex flex-col overflow-hidden rounded-3xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${isPopular
                                    ? "border-amber-700/30 shadow-lg shadow-amber-900/10"
                                    : "border-stone-200"
                                    }`}
                            >
                                {/* Badge */}
                                {product.badge && (
                                    <div
                                        className={`absolute right-5 top-5 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest ${isPopular
                                            ? "bg-amber-700 text-white"
                                            : "bg-stone-900 text-white"
                                            }`}
                                    >
                                        {product.badge}
                                    </div>
                                )}

                                {/* Color preview */}
                                <div
                                    className={`relative flex h-48 items-center justify-center overflow-hidden ${product.bgPaleClass}`}
                                >
                                    <div
                                        className={`h-28 w-28 rounded-2xl shadow-xl transition-transform duration-500 hover:rotate-6 ${product.bgSolidClass}`}
                                    />
                                    <div
                                        aria-hidden="true"
                                        className={`pointer-events-none absolute inset-0 opacity-10 ${product.glowClass}`}
                                    />
                                </div>

                                {/* Content */}
                                <div className="flex flex-1 flex-col gap-6 bg-white p-7">
                                    <div>
                                        <p className="mb-1 text-xs font-medium uppercase tracking-widest text-stone-400">
                                            {product.colorLabel} · {product.capacity}
                                        </p>
                                        <h3 className="text-xl font-bold text-stone-900">
                                            {product.name}
                                        </h3>
                                    </div>

                                    {/* Price */}
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-3xl font-bold text-stone-900">
                                            ${product.price}
                                        </span>
                                        <span className="text-sm text-stone-400">USD</span>
                                    </div>

                                    {/* Feature list */}
                                    <ul className="flex flex-1 flex-col gap-2.5">
                                        {product.features.map((f) => (
                                            <li key={f} className="flex items-center gap-2.5 text-sm text-stone-600">
                                                <svg
                                                    className={`h-5 w-5 shrink-0 ${product.textColorClass}`}
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
                                        className={`mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 ${isPopular
                                            ? "bg-amber-700 text-white shadow-lg hover:bg-amber-800 hover:shadow-xl"
                                            : "bg-stone-900 text-white hover:bg-amber-700"
                                            }`}
                                    >
                                        <svg
                                            className="h-5 w-5"
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
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Reassurance strip */}
                <div className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-stone-500">
                    {[
                        { icon: "🚚", text: "Free shipping over $100" },
                        { icon: "🔄", text: "30-day easy returns" },
                        { icon: "🔒", text: "Secure checkout" },
                        { icon: "⭐", text: "4.9 / 5 from 2,400+ reviews" },
                    ].map(({ icon, text }) => (
                        <span key={text} className="flex items-center gap-2">
                            <span className="text-lg text-amber-700">{icon}</span>
                            {text}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}