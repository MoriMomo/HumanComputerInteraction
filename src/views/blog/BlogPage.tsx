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
            <main id="main-content" ref={containerRef} className="min-h-screen bg-brand-dark text-white">
                <section className="relative overflow-hidden border-b border-white/8">
                    <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(181,158,125,0.16),transparent_24%),radial-gradient(circle_at_80%_15%,rgba(180,138,99,0.12),transparent_22%),linear-gradient(180deg,#584738_0%,#584738_100%)]" />

                    <div className="relative mx-auto grid max-w-7xl gap-8 px-6 pb-20 pt-36 md:px-12 lg:grid-cols-[1.05fr_0.95fr] lg:px-20 lg:pb-24 lg:pt-40">
                        <div>
                            <p className="blog-hero-text mb-6 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                                Journal
                            </p>
                            <h1 className="blog-hero-text max-w-3xl font-serif text-5xl font-bold leading-[0.96] tracking-tight md:text-7xl">
                                Design, materials,
                                <span className="block italic text-primary">craft.</span>
                            </h1>
                            <p className="blog-hero-text mt-7 max-w-xl text-lg leading-8 text-white/56">
                                Field notes on making premium utility objects that age well and work hard.
                            </p>

                            <div className="blog-hero-text mt-9 flex flex-wrap gap-3">
                                <span className="rounded-full border border-white/10 bg-white/6 px-4 py-2 text-xs uppercase tracking-[0.24em] text-white/68">Material science</span>
                                <span className="rounded-full border border-white/10 bg-white/6 px-4 py-2 text-xs uppercase tracking-[0.24em] text-white/68">Carry workflow</span>
                                <span className="rounded-full border border-white/10 bg-white/6 px-4 py-2 text-xs uppercase tracking-[0.24em] text-white/68">Design systems</span>
                            </div>
                        </div>

                        <div className="blog-hero-text rounded-4xl border border-white/10 bg-white/5 p-6 shadow-[0_24px_90px_rgba(0,0,0,0.34)]">
                            <p className="text-xs uppercase tracking-[0.28em] text-white/42">Journal focus</p>
                            <div className="mt-5 space-y-4 text-sm leading-7 text-white/60">
                                <p>How materials behave in real use, and why small tolerances change daily experience.</p>
                                <p>How to reduce visual and physical friction in your desk and carry setup.</p>
                            </div>
                            <div className="mt-7 grid grid-cols-3 gap-3">
                                <div className="rounded-3xl border border-white/10 bg-white/6 p-4">
                                    <p className="text-2xl font-semibold text-white">3</p>
                                    <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-white/42">Posts</p>
                                </div>
                                <div className="rounded-3xl border border-white/10 bg-white/6 p-4">
                                    <p className="text-2xl font-semibold text-white">16</p>
                                    <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-white/42">Avg min</p>
                                </div>
                                <div className="rounded-3xl border border-white/10 bg-white/6 p-4">
                                    <p className="text-2xl font-semibold text-white">2026</p>
                                    <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-white/42">Edition</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mx-auto max-w-7xl px-6 pb-8 pt-14 md:px-12 lg:px-20">
                    <LoadingLink href={`/blog/${featured.slug}`}>
                        <article className="blog-card group relative overflow-hidden rounded-4xl border border-white/10 bg-brand-dark/68 transition-all duration-500 hover:border-white/22">
                            <div
                                aria-hidden
                                className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/6 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                            />
                            <div className="grid grid-cols-1 lg:grid-cols-2">
                                <div className="relative min-h-72 border-b border-white/8 bg-linear-to-br from-white/10 to-white/3 lg:border-b-0 lg:border-r">
                                    <div className="absolute inset-0 office-grid opacity-[0.08]" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="flex h-24 w-24 items-center justify-center rounded-full border border-white/14 bg-white/8">
                                            <span className="material-symbols-outlined text-5xl text-white/18">article</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center p-10">
                                    <span className="mb-4 inline-block text-xs uppercase tracking-widest text-primary">
                                        Featured
                                    </span>
                                    <h2 className="mb-4 font-serif text-3xl font-bold text-white transition-colors group-hover:text-white/90">
                                        {featured.title}
                                    </h2>
                                    <p className="mb-6 text-sm leading-relaxed text-white/55">
                                        {featured.excerpt}
                                    </p>
                                    <div className="flex items-center gap-4 text-xs text-white/38">
                                        <span>{featured.date}</span>
                                        <span>.</span>
                                        <span>{featured.readTime}</span>
                                    </div>
                                    <p className="mt-6 text-xs uppercase tracking-[0.24em] text-white/42">Read article</p>
                                </div>
                            </div>
                        </article>
                    </LoadingLink>
                </section>

                <section className="blog-grid mx-auto max-w-7xl px-6 pb-20 md:px-12 lg:px-20">
                    <div className="mb-8 flex items-end justify-between gap-6">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">Latest posts</p>
                            <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight md:text-4xl">From the workshop log.</h2>
                        </div>
                        <p className="hidden max-w-md text-sm leading-7 text-white/52 md:block">
                            Short, practical reads on materials, carry behavior, and calmer desk systems.
                        </p>
                    </div>

                    <div className="mb-8 flex flex-wrap gap-3">
                        {BLOG_CATEGORIES.map((category) => (
                            <LoadingLink
                                key={category}
                                href={`/blog/category/${category}`}
                                className="rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs uppercase tracking-[0.24em] text-white/70 transition-colors hover:border-white/28 hover:bg-white/10"
                            >
                                {formatCategoryLabel(category)}
                            </LoadingLink>
                        ))}
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                        {rest.map((post) => (
                            <LoadingLink href={`/blog/${post.slug}`} key={post.slug}>
                                <article className="blog-card group cursor-pointer overflow-hidden rounded-4xl border border-white/10 bg-brand-dark/62 transition-all duration-500 hover:-translate-y-1 hover:border-white/22">
                                    <div className="relative aspect-video border-b border-white/8 bg-linear-to-br from-white/10 to-white/2">
                                        <div className="absolute inset-0 office-grid opacity-[0.06]" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-5xl text-white/14">article</span>
                                        </div>
                                    </div>
                                    <div className="p-8">
                                        <div className="mb-4 flex items-center gap-3 text-xs text-white/38">
                                            <span>{post.date}</span>
                                            <span>.</span>
                                            <span>{post.readTime}</span>
                                        </div>
                                        <h3 className="mb-3 font-serif text-xl font-semibold text-white transition-colors group-hover:text-white/90">
                                            {post.title}
                                        </h3>
                                        <p className="text-white/52 text-sm leading-relaxed">
                                            {post.excerpt}
                                        </p>
                                    </div>
                                </article>
                            </LoadingLink>
                        ))}
                    </div>
                </section>

                <section className="mx-auto max-w-7xl px-6 pb-24 md:px-12 lg:px-20">
                    <div className="rounded-4xl border border-white/10 bg-brand-dark/58 p-8 md:p-10">
                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">Newsletter</p>
                        <h3 className="mt-4 font-serif text-3xl font-bold tracking-tight md:text-4xl">Get the next journal drop.</h3>
                        <p className="mt-4 max-w-xl text-sm leading-7 text-white/56">
                            Occasional updates on product thinking, materials, and design decisions from SatSet.
                        </p>
                        <form
                            onSubmit={(event) => {
                                event.preventDefault();
                                if (!email.trim()) return;
                                trackEvent("email_capture_submit", { source: "blog_newsletter" });
                                setSubscribed(true);
                            }}
                            className="mt-6 flex flex-col gap-3 sm:flex-row"
                        >
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                placeholder="you@example.com"
                                className="w-full rounded-full border border-white/12 bg-white/6 px-5 py-3 text-sm text-white placeholder:text-white/35 focus:border-white/28 focus:outline-none sm:max-w-sm"
                            />
                            <button type="submit" className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-dark transition-colors hover:bg-white/90">
                                Subscribe
                            </button>
                        </form>
                        {subscribed && <p className="mt-3 text-sm text-white/74">Thanks. You are on the list.</p>}
                    </div>
                </section>

                <Footer />
            </main>
        </>
    );
}
