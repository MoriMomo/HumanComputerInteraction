"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { useParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { BLOG_POSTS } from "@/data/blog";

export default function BlogPostPage() {
    const { slug } = useParams<{ slug: string }>();
    const containerRef = useRef<HTMLDivElement>(null);
    const post = BLOG_POSTS.find((p) => p.slug === slug) ?? BLOG_POSTS[0];
    const related = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

    useGSAP(
        () => {
            const ctx = gsap.context(() => {
                const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
                if (prefersReducedMotion) return;

                gsap.fromTo(
                    ".post-header-text",
                    { y: 50, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1, ease: "power4.out", stagger: 0.1 }
                );

                gsap.fromTo(
                    ".post-body",
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.9, delay: 0.3, ease: "power3.out" }
                );
            }, containerRef);

            return () => ctx.revert();
        },
        { scope: containerRef }
    );

    return (
        <>
            <Navbar />
            <div ref={containerRef} className="min-h-screen bg-[#0a0f16] text-white">
                <div className="max-w-3xl mx-auto px-6 md:px-12 pt-36 pb-12">
                    {/* Back */}
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-sm text-white/45 hover:text-white/80 transition-colors mb-12"
                    >
                        <span className="material-symbols-outlined text-base">arrow_back</span>
                        Journal
                    </Link>

                    {/* Meta */}
                    <div className="flex items-center gap-3 text-xs text-white/38 mb-6">
                        <span className="post-header-text">{post.date}</span>
                        <span>·</span>
                        <span className="post-header-text">{post.readTime}</span>
                    </div>

                    {/* Title */}
                    <h1 className="post-header-text font-serif text-4xl md:text-6xl font-bold leading-tight mb-6">
                        {post.title}
                    </h1>

                    <p className="post-header-text text-white/55 text-lg leading-relaxed mb-12 border-b border-white/10 pb-12">
                        {post.excerpt}
                    </p>

                    {/* Hero image placeholder */}
                    <div className="post-body aspect-video rounded-3xl border border-white/10 bg-linear-to-br from-white/5 to-white/2 flex items-center justify-center mb-12">
                        <span className="material-symbols-outlined text-6xl text-white/12">
                            article
                        </span>
                    </div>

                    {/* Content */}
                    <div className="post-body space-y-6">
                        {post.content.split("\n\n").map((paragraph, i) => (
                            <p key={i} className="text-white/68 text-base leading-[1.9]">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </div>

                {/* Related posts */}
                {related.length > 0 && (
                    <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pb-24 pt-16 border-t border-white/8 mt-16">
                        <p className="text-xs uppercase tracking-[0.28em] text-primary mb-8">
                            More from the journal
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {related.map((p) => (
                                <Link key={p.slug} href={`/blog/${p.slug}`}>
                                    <article className="group rounded-2xl border border-white/10 bg-[#0f1620]/60 p-8 hover:border-white/22 transition-all duration-400">
                                        <div className="flex items-center gap-3 text-xs text-white/38 mb-3">
                                            <span>{p.date}</span>
                                            <span>·</span>
                                            <span>{p.readTime}</span>
                                        </div>
                                        <h3 className="font-serif text-lg font-semibold text-white mb-2 group-hover:text-white/90 transition-colors">
                                            {p.title}
                                        </h3>
                                        <p className="text-white/50 text-sm line-clamp-2">{p.excerpt}</p>
                                    </article>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                <Footer />
            </div>
        </>
    );
}
