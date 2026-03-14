"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Navbar() {
    const navRef = useRef<HTMLElement>(null);
    const [menuOpen, setMenuOpen] = useState(false);

    // Slide-down on mount
    useGSAP(() => {
        gsap.from(navRef.current, {
            y: -80,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
            delay: 0.2,
        });
    }, []);

    // Scroll shrink
    useEffect(() => {
        const onScroll = () => {
            if (!navRef.current) return;
            const scrolled = window.scrollY > 60;
            gsap.to(navRef.current, {
                paddingTop: scrolled ? "0.5rem" : "1rem",
                paddingBottom: scrolled ? "0.5rem" : "1rem",
                boxShadow: scrolled
                    ? "0 4px 32px rgba(48,44,43,0.13)"
                    : "0 1px 4px rgba(48,44,43,0.05)",
                duration: 0.4,
                ease: "power2.out",
            });
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const navLinks = ["Showcase", "Features", "Specs", "Shop"];

    return (
        <nav
            ref={navRef}
            className="sticky top-0 z-100 flex items-center justify-between px-6 py-4 bg-white/85 backdrop-blur-md border-b border-soft-grey rounded-2xl shadow-sm mb-8 transition-colors"
        >
            {/* Logo */}
            <div className="flex items-center gap-3 text-secondary">
                <svg className="w-6 h-6 text-secondary" fill="none" viewBox="0 0 48 48">
                    <path d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z" fill="currentColor" />
                </svg>
                <span className="text-charcoal text-xl font-semibold tracking-wide font-serif">SatSet</span>
            </div>

            {/* Desktop nav */}
            <div className="hidden md:flex flex-1 justify-end gap-8 items-center">
                <div className="flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link}
                            href={`#${link.toLowerCase()}`}
                            className="text-gray-500 hover:text-primary transition-colors text-sm font-medium"
                        >
                            {link}
                        </a>
                    ))}
                </div>
                <a
                    href="#shop"
                    className="ml-4 flex items-center justify-center rounded-full bg-charcoal text-white h-10 px-6 text-sm font-medium hover:bg-primary transition-all shadow-md"
                >
                    Buy Now
                </a>
            </div>

            {/* Mobile hamburger */}
            <button
                className="md:hidden text-charcoal"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
            >
                <span className="material-symbols-outlined">{menuOpen ? "close" : "menu"}</span>
            </button>

            {/* Mobile dropdown */}
            {menuOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-md border border-soft-grey rounded-2xl shadow-lg p-6 flex flex-col gap-4 md:hidden z-101">
                    {navLinks.map((link) => (
                        <a
                            key={link}
                            href={`#${link.toLowerCase()}`}
                            onClick={() => setMenuOpen(false)}
                            className="text-charcoal hover:text-primary transition-colors text-sm font-medium"
                        >
                            {link}
                        </a>
                    ))}
                    <a
                        href="#shop"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center justify-center rounded-full bg-charcoal text-white h-10 px-6 text-sm font-medium hover:bg-primary transition-all shadow-md text-center"
                    >
                        Buy Now
                    </a>
                </div>
            )}
        </nav>
    );
}
