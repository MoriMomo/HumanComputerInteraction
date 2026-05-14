"use client";

import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LoadingLink from "@/components/ui/LoadingLink";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { BLOG_POSTS } from "@/data/blog";
import { BLOG_CATEGORIES, formatCategoryLabel } from "@/lib/blog-categories";
import { trackEvent } from "@/lib/analytics";

gsap.registerPlugin(ScrollTrigger);

export default function BlogPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);

    useGSAP(
        () => {
            const ctx = gsap.context(() => {
                const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
                if (prefersReducedMotion) return;

                gsap.fromTo(
                    ".blog-hero-text",
                    { y: 60, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1, ease: "power4.out", stagger: 0.12 }
                );

                gsap.fromTo(
                    ".blog-card",
                    { y: 70, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        stagger: 0.14,
                        duration: 0.9,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: ".blog-grid",
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

    const [featured, ...rest] = BLOG_POSTS;

    return (
        <>
            <Navbar />
            <main id="main-content" ref={containerRef} className="min-h-screen bg-white text-[#231711]">
                <section className="relative overflow-hidden border-b border-black/5">
                    <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50" />

                    <div className="relative mx-auto grid max-w-7xl gap-8 px-6 pb-20 pt-36 md:px-12 lg:grid-cols-[1.05fr_0.95fr] lg:px-20 lg:pb-24 lg:pt-40">
                        <div>
                            <p className="blog-hero-text mb-6 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                                Journal
                            </p>
                            <h1 className="blog-hero-text max-w-3xl font-serif text-5xl font-bold leading-[0.96] tracking-tight md:text-7xl">
                                Design, materials,
                                <span className="block italic text-primary">craft.</span>
                            </h1>
                            <p className="blog-hero-text mt-7 max-w-xl text-lg leading-8 text-[#231711]/60">
                                Field notes on making premium utility objects that age well and work hard.
                            </p>

                            <div className="blog-hero-text mt-9 flex flex-wrap gap-3">
                                <span className="rounded-full border border-black/10 bg-black/5 px-4 py-2 text-xs uppercase tracking-[0.24em] text-[#231711]/68">Material science</span>
                                <span className="rounded-full border border-black/10 bg-black/5 px-4 py-2 text-xs uppercase tracking-[0.24em] text-[#231711]/68">Carry workflow</span>
                                <span className="rounded-full border border-black/10 bg-black/5 px-4 py-2 text-xs uppercase tracking-[0.24em] text-[#231711]/68">Design systems</span>
                            </div>
                        </div>

                        <div className="blog-hero-text rounded-4xl border border-black/10 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
                            <p className="text-xs uppercase tracking-[0.28em] text-[#231711]/42">Journal focus</p>
                            <div className="mt-5 space-y-4 text-sm leading-7 text-[#231711]/60">
                                <p>How materials behave in real use, and why small tolerances change daily experience.</p>
                                <p>How to reduce visual and physical friction in your desk and carry setup.</p>
                            </div>
                            <div className="mt-7 grid grid-cols-3 gap-3">
                                <div className="rounded-3xl border border-black/10 bg-black/5 p-4">
                                    <p className="text-2xl font-semibold text-[#231711]">3</p>
                                    <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-[#231711]/42">Posts</p>
                                </div>
                                <div className="rounded-3xl border border-black/10 bg-black/5 p-4">
                                    <p className="text-2xl font-semibold text-[#231711]">16</p>
                                    <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-[#231711]/42">Avg min</p>
                                </div>
                                <div className="rounded-3xl border border-black/10 bg-black/5 p-4">
                                    <p className="text-2xl font-semibold text-[#231711]">2026</p>
                                    <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-[#231711]/42">Edition</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mx-auto max-w-7xl px-6 pb-10 pt-12 md:px-12 lg:px-20">
                    <LoadingLink href={`/blog/${featured.slug}`}>
                        <article className="blog-card group relative overflow-hidden rounded-4xl border border-black/10 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-2 hover:border-black/20 hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)]">
                            <div
                                aria-hidden
                                className="pointer-events-none absolute inset-0 bg-linear-to-br from-black/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                            />
                            {/* Accent glow on hover */}
                            <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/15 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                            <div className="grid grid-cols-1 lg:grid-cols-2">
                                <div className="relative min-h-80 border-b border-black/10 bg-linear-to-br from-black/5 to-black/2 lg:border-b-0 lg:border-r">
                                    <div className="absolute inset-0 office-grid opacity-[0.08]" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="flex h-32 w-32 items-center justify-center rounded-full border border-black/10 bg-black/5 shadow-md">
                                            <span className="material-symbols-outlined text-6xl text-[#231711]/18">article</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center p-10 lg:p-12">
                                    <span className="mb-6 inline-block text-xs font-semibold uppercase tracking-[0.32em] text-primary">
                                        Featured Story
                                    </span>
                                    <h2 className="mb-5 font-serif text-4xl font-bold leading-tight text-[#231711] transition-colors group-hover:text-[#231711]/80 lg:text-5xl">
                                        {featured.title}
                                    </h2>
                                    <p className="mb-8 text-sm leading-relaxed text-[#231711]/60">
                                        {featured.excerpt}
                                    </p>
                                    <div className="flex items-center gap-4 border-t border-black/10 pt-8 text-xs text-[#231711]/50">
                                        <span>{featured.date}</span>
                                        <span className="h-1 w-1 rounded-full bg-[#231711]/20" />
                                        <span>{featured.readTime}</span>
                                    </div>
                                    <p className="mt-6 flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-primary font-semibold">
                                        Read story <span>→</span>
                                    </p>
                                </div>
                            </div>
                        </article>
                    </LoadingLink>
                </section>

                <section className="blog-grid mx-auto max-w-7xl px-6 pb-20 md:px-12 lg:px-20">
                    <div className="mb-12 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
                        <div className="flex-1">
                            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">Latest posts</p>
                            <h2 className="mt-4 font-serif text-4xl font-bold tracking-tight md:text-5xl">From the workshop log.</h2>
                        </div>
                        <p className="hidden max-w-sm text-sm leading-7 text-[#231711]/60 md:block">
                            Short, practical reads on materials, carry behavior, and calmer desk systems.
                        </p>
                    </div>

                    <div className="mb-12 flex flex-wrap gap-2">
                        {BLOG_CATEGORIES.map((category) => (
                            <LoadingLink
                                key={category}
                                href={`/blog/category/${category}`}
                                className="group relative rounded-full border border-black/10 bg-black/5 px-5 py-2.5 text-xs uppercase tracking-[0.26em] text-[#231711]/70 transition-all duration-300 hover:border-black/20 hover:bg-black/10"
                            >
                                <span className="relative z-10">{formatCategoryLabel(category)}</span>
                                <div className="absolute inset-0 rounded-full bg-primary/0 transition-colors duration-300 group-hover:bg-primary/5" />
                            </LoadingLink>
                        ))}
                    </div>

                    <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {rest.map((post, idx) => {
                            // First card is 2x2 (featured/must-read), all others are uniform 1x1
                            const isFeatured = idx === 0;
                            const mdSpan = isFeatured ? "md:row-span-2 md:col-span-2" : "md:col-span-1";
                            const lgSpan = isFeatured ? "lg:row-span-2 lg:col-span-2" : "lg:col-span-1";

                            return (
                                <LoadingLink href={`/blog/${post.slug}`} key={post.slug}>
                                    <article className={`blog-card group relative cursor-pointer overflow-hidden rounded-3xl border border-black/10 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-2 hover:border-black/20 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] h-full ${mdSpan} ${lgSpan}`}>
                                        {/* Accent glow */}
                                        <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary/12 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                                        <div className={`relative border-b border-black/10 bg-linear-to-br from-black/5 to-black/2 ${isFeatured ? "aspect-video" : "aspect-square"}`}>
                                            <div className="absolute inset-0 office-grid opacity-[0.08]" />
                                            <div className={`absolute inset-0 flex items-center justify-center ${isFeatured ? "text-6xl" : "text-5xl"}`}>
                                                <span className="material-symbols-outlined text-[#231711]/16">article</span>
                                            </div>
                                        </div>
                                        <div className={`flex flex-col ${isFeatured ? "p-10" : "p-8"}`}>
                                            {isFeatured && (
                                                <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.32em] text-primary">
                                                    Must Read
                                                </span>
                                            )}
                                            <div className="mb-4 flex items-center gap-2 text-xs text-[#231711]/50">
                                                <span>{post.date}</span>
                                                <span className="h-1 w-1 rounded-full bg-[#231711]/20" />
                                                <span>{post.readTime}</span>
                                            </div>
                                            <h3 className={`mb-3 font-serif font-semibold text-[#231711] transition-colors group-hover:text-primary ${isFeatured ? "text-3xl" : "text-lg"}`}>
                                                {post.title}
                                            </h3>
                                            <p className={`flex-grow text-[#231711]/60 leading-relaxed ${isFeatured ? "text-base" : "text-sm"}`}>
                                                {post.excerpt}
                                            </p>
                                            <div className="mt-4 inline-flex items-center gap-2 pt-4 text-xs uppercase tracking-widest text-primary/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                                <span>Read More</span>
                                                <span>→</span>
                                            </div>
                                        </div>
                                    </article>
                                </LoadingLink>
                            );
                        })}
                    </div>
                </section>

                <section className="mx-auto max-w-7xl px-6 pb-24 md:px-12 lg:px-20">
                    <div className="group relative overflow-hidden rounded-4xl border border-black/10 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)] p-10 md:p-14 hover:border-black/20 transition-all duration-500">
                        {/* Decorative accent */}
                        <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-primary/8 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                        <div className="relative z-10">
                            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-primary">Newsletter</p>
                            <h3 className="mt-5 font-serif text-4xl font-bold tracking-tight md:text-5xl">Get the next journal drop.</h3>
                            <p className="mt-6 max-w-2xl text-sm leading-7 text-[#231711]/60">
                                Occasional updates on product thinking, materials, and design decisions from SatSet.
                            </p>
                            <form
                                onSubmit={(event) => {
                                    event.preventDefault();
                                    if (!email.trim()) return;
                                    trackEvent("email_capture_submit", { source: "blog_newsletter" });
                                    setSubscribed(true);
                                }}
                                className="mt-8 flex flex-col gap-3 sm:flex-row"
                            >
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    placeholder="you@example.com"
                                    className="w-full rounded-full border border-black/10 bg-black/5 px-6 py-3.5 text-sm text-[#231711] placeholder:text-[#231711]/40 transition-all duration-300 focus:border-black/30 focus:bg-white focus:outline-none sm:max-w-sm"
                                />
                                <button type="submit" className="rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-primary/90 hover:shadow-[0_4px_14px_rgba(181,158,125,0.4)]">
                                    Subscribe
                                </button>
                            </form>
                            {subscribed && (
                                <p className="mt-4 flex items-center gap-2 text-sm text-primary/80">
                                    <span className="material-symbols-outlined text-lg">check_circle</span>
                                    Thanks. You are on the list.
                                </p>
                            )}
                        </div>
                    </div>
                </section>

                <Footer />
            </main>
        </>
    );
}
