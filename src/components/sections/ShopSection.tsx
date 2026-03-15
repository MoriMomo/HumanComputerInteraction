"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const products = [
    {
        id: "standard",
        name: "ModuSnap Standard",
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
        name: "ModuSnap Pro",
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
        name: "ModuSnap Executive",
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
    const [cart, setCart] = useState<string[]>([]);

    useGSAP(
        () => {
            gsap.from(".shop-title", {
                y: 40,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: { trigger: ".shop-title", start: "top 85%" },
            });

            gsap.from(".shop-card", {
                y: 70,
                opacity: 0,
                stagger: 0.15,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: { trigger: ".shop-grid", start: "top 78%" },
            });
        },
        { scope: sectionRef }
    );

    const addToCart = (id: string) => {
        setCart((prev) => [...prev, id]);
    };

    return (
        <section id="shop" ref={sectionRef} className="py-28 bg-white relative">
            <div className="max-w-350 mx-auto px-4 md:px-10 lg:px-20">
                {/* Label + title */}
                <p className="shop-title text-xs font-semibold tracking-[0.25em] text-primary uppercase mb-4">
                    Shop
                </p>
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
                    <h2 className="shop-title font-serif text-charcoal text-4xl md:text-5xl font-bold leading-tight max-w-lg">
                        Choose your{" "}
                        <span className="text-primary italic">carry companion</span>.
                    </h2>
                    <p className="shop-title text-sm text-gray-400 max-w-xs leading-relaxed">
                        Free shipping on orders over $100. 30-day returns. Ships worldwide.
                    </p>
                </div>

                {/* Product cards */}
                <div className="shop-grid grid grid-cols-1 md:grid-cols-3 gap-8">
                    {products.map((product) => {
                        const inCart = cart.filter((c) => c === product.id).length;
                        const isPopular = product.badge === "Most Popular";
                        return (
                            <div
                                key={product.id}
                                className={`shop-card relative flex flex-col rounded-3xl border overflow-hidden transition-all duration-300 hover:shadow-[0_16px_60px_rgba(48,44,43,0.12)] hover:-translate-y-1 ${isPopular
                                    ? "border-primary/50 shadow-[0_8px_40px_rgba(180,138,99,0.15)]"
                                    : "border-soft-grey"
                                    }`}
                            >
                                {/* Badge */}
                                {product.badge && (
                                    <div
                                        className={`absolute top-5 right-5 text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full ${isPopular
                                            ? "bg-primary text-white"
                                            : "bg-charcoal text-white"
                                            }`}
                                    >
                                        {product.badge}
                                    </div>
                                )}

                                {/* Colour preview */}
                                <div
                                    className={`h-48 flex items-center justify-center relative overflow-hidden ${product.bgPaleClass}`}
                                >
                                    <div
                                        className={`w-28 h-28 rounded-2xl shadow-xl transition-transform duration-500 hover:rotate-6 ${product.bgSolidClass}`}
                                    />
                                    <div
                                        aria-hidden
                                        className={`absolute inset-0 opacity-10 pointer-events-none ${product.glowClass}`}
                                    />
                                </div>

                                {/* Content */}
                                <div className="flex flex-col flex-1 gap-6 p-7 bg-white">
                                    <div>
                                        <p className="text-xs text-gray-400 font-medium tracking-widest uppercase mb-1">
                                            {product.colorLabel} · {product.capacity}
                                        </p>
                                        <h3 className="font-serif text-charcoal text-xl font-bold">
                                            {product.name}
                                        </h3>
                                    </div>

                                    {/* Price */}
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-3xl font-bold text-charcoal font-serif">
                                            ${product.price}
                                        </span>
                                        <span className="text-sm text-gray-400">USD</span>
                                    </div>

                                    {/* Feature list */}
                                    <ul className="flex flex-col gap-2.5 flex-1">
                                        {product.features.map((f) => (
                                            <li key={f} className="flex items-center gap-2.5 text-sm text-gray-600">
                                                <span
                                                    className={`material-symbols-outlined text-base shrink-0 ${product.textColorClass}`}
                                                >
                                                    check_circle
                                                </span>
                                                {f}
                                            </li>
                                        ))}
                                    </ul>

                                    {/* CTA */}
                                    <button
                                        onClick={() => addToCart(product.id)}
                                        className={`mt-2 w-full flex items-center justify-center gap-2 rounded-full h-12 text-sm font-semibold tracking-wide transition-all duration-300 ${isPopular
                                            ? "bg-primary text-white hover:bg-secondary shadow-lg hover:shadow-xl"
                                            : "bg-charcoal text-white hover:bg-primary"
                                            }`}
                                    >
                                        <span className="material-symbols-outlined text-base">
                                            {inCart > 0 ? "check" : "shopping_bag"}
                                        </span>
                                        {inCart > 0 ? `In Cart (${inCart})` : product.cta}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Reassurance strip */}
                <div className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-gray-400">
                    {[
                        { icon: "local_shipping", text: "Free shipping over $100" },
                        { icon: "autorenew", text: "30-day easy returns" },
                        { icon: "lock", text: "Secure checkout" },
                        { icon: "star", text: "4.9 / 5 from 2,400+ reviews" },
                    ].map(({ icon, text }) => (
                        <span key={text} className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-lg">{icon}</span>
                            {text}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}
