"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { BLOG_POSTS } from "@/data/blog";

gsap.registerPlugin(ScrollTrigger);

export default function BlogPage() {
    const containerRef = useRef<HTMLDivElement>(null);

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
            <main id="main-content" ref={containerRef} className="min-h-screen bg-[#0a0f16] text-white">
                {/* Hero */}
                <section className="relative pt-40 pb-20 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
                    <div
                        aria-hidden
                        className="pointer-events-none absolute right-0 top-28 h-72 w-72 rounded-full bg-[#3b4a5a]/18 blur-2xl"
                    />
                    <p className="blog-hero-text text-xs font-semibold tracking-[0.28em] uppercase text-primary mb-6">
                        Journal
                    </p>
                    <h1 className="blog-hero-text font-serif text-5xl md:text-7xl font-bold leading-tight mb-6 max-w-2xl">
                        Design, materials,{" "}
                        <span className="italic text-primary">craft</span>.
                    </h1>
                    <p className="blog-hero-text text-white/55 text-lg max-w-xl">
                        Thinking on the objects we carry and the details that make them last.
                    </p>
                </section>

                {/* Featured post */}
                <section className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto pb-8">
                    <Link href={`/blog/${featured.slug}`}>
                        <article className="blog-card group relative rounded-3xl border border-white/10 bg-[#0f1620]/60 overflow-hidden hover:border-white/22 transition-all duration-500">
                            <div
                                aria-hidden
                                className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            />
                            <div className="grid grid-cols-1 lg:grid-cols-2">
                                <div className="aspect-video lg:aspect-auto min-h-64 bg-linear-to-br from-white/6 to-white/2 border-b lg:border-b-0 lg:border-r border-white/8 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-6xl text-white/12">
                                        article
                                    </span>
                                </div>
                                <div className="p-10 flex flex-col justify-center">
                                    <span className="inline-block text-xs uppercase tracking-widest text-primary mb-4">
                                        Featured
                                    </span>
                                    <h2 className="font-serif text-3xl font-bold text-white mb-4 group-hover:text-white/90 transition-colors">
                                        {featured.title}
                                    </h2>
                                    <p className="text-white/55 text-sm leading-relaxed mb-6">
                                        {featured.excerpt}
                                    </p>
                                    <div className="flex items-center gap-4 text-xs text-white/38">
                                        <span>{featured.date}</span>
                                        <span>.</span>
                                        <span>{featured.readTime}</span>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </Link>
                </section>

                {/* Remaining posts */}
                <section className="blog-grid px-6 md:px-12 lg:px-20 max-w-7xl mx-auto pb-24">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        {rest.map((post) => (
                            <Link href={`/blog/${post.slug}`} key={post.slug}>
                                <article className="blog-card group rounded-3xl border border-white/10 bg-[#0f1620]/60 overflow-hidden hover:border-white/22 transition-all duration-500 cursor-pointer">
                                    <div className="aspect-video bg-linear-to-br from-white/6 to-white/2 border-b border-white/8 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-5xl text-white/12">
                                            article
                                        </span>
                                    </div>
                                    <div className="p-8">
                                        <div className="flex items-center gap-3 text-xs text-white/38 mb-4">
                                            <span>{post.date}</span>
                                            <span>.</span>
                                            <span>{post.readTime}</span>
                                        </div>
                                        <h3 className="font-serif text-xl font-semibold text-white mb-3 group-hover:text-white/90 transition-colors">
                                            {post.title}
                                        </h3>
                                        <p className="text-white/52 text-sm leading-relaxed">
                                            {post.excerpt}
                                        </p>
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                </section>

                <Footer />
            </main>
        </>
    );
}
