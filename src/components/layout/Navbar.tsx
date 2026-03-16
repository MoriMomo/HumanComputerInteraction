"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const NAV_LINKS = [
    { label: "Showcase", href: "#showcase" },
    { label: "Features", href: "#features" },
    { label: "Specs", href: "#specs" },
    { label: "Shop", href: "#shop" },
];

const MOBILE_MENU_ID = "mobile-site-menu";

export default function Navbar() {
    const navRef = useRef<HTMLElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("");

    // Initial mount animation
    useGSAP(
        () => {
            if (!navRef.current) return;

            gsap.fromTo(
                navRef.current,
                { y: -100, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2, ease: "power4.out", delay: 0.3 }
            );
        },
        { scope: navRef }
    );

    // Menu animation
    useGSAP(
        () => {
            if (!menuOpen || !menuRef.current) return;

            gsap.fromTo(
                ".menu-link",
                { x: -40, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power3.out" }
            );
            gsap.fromTo(
                ".menu-cta",
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.4, delay: 0.3, ease: "power3.out" }
            );
        },
        { scope: menuRef, dependencies: [menuOpen] }
    );

    // Scroll state with requestAnimationFrame for performance
    useEffect(() => {
        let ticking = false;

        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const y = window.scrollY;
                    setScrolled(y > 100);
                    ticking = false;
                });
                ticking = true;
            }
        };

        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Active section highlight
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { threshold: 0.4, rootMargin: "-120px 0px -60% 0px" }
        );

        NAV_LINKS.forEach((link) => {
            const el = document.querySelector(link.href);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    // Keyboard navigation & body scroll lock
    useEffect(() => {
        const onKeydown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && menuOpen) {
                setMenuOpen(false);
            }
        };
        window.addEventListener("keydown", onKeydown);
        return () => window.removeEventListener("keydown", onKeydown);
    }, [menuOpen]);

    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [menuOpen]);

    const toggleMenu = () => setMenuOpen((prev) => !prev);
    const closeMenu = () => setMenuOpen(false);

    return (
        <>
            <nav
                ref={navRef}
                className={`fixed top-0 left-0 right-0 z-100 transition-all duration-700 ${scrolled
                    ? "bg-[#0a0f16]/92 backdrop-blur-2xl border-b border-white/8 shadow-[0_4px_40px_rgba(0,0,0,0.5)]"
                    : "bg-linear-to-b from-[#0a0f16]/80 to-transparent"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="flex items-center justify-between h-20">
                        {/* Left - Brand */}
                        <a
                            href="#showcase"
                            className="group flex items-center gap-3"
                            onClick={closeMenu}
                        >
                            <div className="w-9 h-9 rounded-xl bg-linear-to-br from-white/20 to-white/5 border border-white/15 flex items-center justify-center group-hover:border-white/30 transition-all duration-300">
                                <svg
                                    className="w-5 h-5 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={1.5}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
                                    />
                                </svg>
                            </div>
                            <span className="text-xl font-semibold text-white tracking-tight group-hover:text-white/90 transition-colors">
                                SatSet
                            </span>
                        </a>

                        {/* Center - Desktop Nav */}
                        <div className="hidden md:flex items-center gap-1">
                            {NAV_LINKS.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    onClick={closeMenu}
                                    className={`relative px-5 py-2 text-sm font-medium tracking-wide transition-all duration-300 rounded-full ${activeSection === link.href.slice(1)
                                        ? "text-white"
                                        : "text-white/50 hover:text-white/80"
                                        }`}
                                >
                                    {link.label}
                                    {activeSection === link.href.slice(1) && (
                                        <span className="absolute inset-0 rounded-full bg-white/10" />
                                    )}
                                </a>
                            ))}
                        </div>

                        {/* Right - CTA */}
                        <a
                            href="#shop"
                            onClick={closeMenu}
                            className="group relative px-6 py-2.5 rounded-full bg-white/10 text-white text-sm font-medium overflow-hidden border border-white/20 hover:border-white/40 transition-all duration-300"
                        >
                            <span className="relative z-10">Buy Now</span>
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                        </a>

                        {/* Mobile Menu Toggle */}
                        {menuOpen ? (
                            <button
                                className="md:hidden relative w-10 h-10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
                                onClick={toggleMenu}
                                aria-label="Toggle menu"
                                aria-controls={MOBILE_MENU_ID}
                                aria-expanded="true"
                            >
                                <div className="relative w-5 h-5">
                                    <span className="absolute left-0 w-5 h-0.5 bg-current transition-all duration-300 top-2 rotate-45" />
                                    <span className="absolute left-0 w-5 h-0.5 bg-current transition-all duration-300 top-2 -rotate-45" />
                                </div>
                            </button>
                        ) : (
                            <button
                                className="md:hidden relative w-10 h-10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
                                onClick={toggleMenu}
                                aria-label="Toggle menu"
                                aria-controls={MOBILE_MENU_ID}
                                aria-expanded="false"
                            >
                                <div className="relative w-5 h-5">
                                    <span className="absolute left-0 w-5 h-0.5 bg-current transition-all duration-300 top-1" />
                                    <span className="absolute left-0 w-5 h-0.5 bg-current transition-all duration-300 top-3" />
                                </div>
                            </button>
                        )}
                    </div>
                </div>
            </nav>

            {/* Full-Screen Mobile Menu Overlay */}
            {menuOpen && (
                <div
                    ref={menuRef}
                    id={MOBILE_MENU_ID}
                    aria-label="Mobile navigation"
                    className="fixed inset-0 top-20 z-99 bg-[#0a0f16]/98 backdrop-blur-2xl md:hidden"
                >
                    <div className="max-w-lg mx-auto px-6 py-12">
                        <div className="flex flex-col gap-2">
                            {NAV_LINKS.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    onClick={closeMenu}
                                    className="menu-link flex items-center justify-between py-6 border-b border-white/10 group"
                                >
                                    <span className="text-3xl font-light text-white/70 group-hover:text-white transition-colors duration-300">
                                        {link.label}
                                    </span>
                                    <svg
                                        className="w-5 h-5 text-white/40 group-hover:text-white/80 transition-colors"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={1.5}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                                        />
                                    </svg>
                                </a>
                            ))}
                        </div>

                        <div className="menu-cta mt-10">
                            <a
                                href="#shop"
                                onClick={closeMenu}
                                className="block w-full py-4 rounded-2xl bg-white text-[#0a0f16] text-lg font-semibold text-center hover:bg-white/90 transition-all duration-300"
                            >
                                Buy Now
                            </a>
                            <p className="text-center text-white/40 text-sm mt-6">
                                Free shipping on orders over $100
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
