"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LoadingLink from "@/components/ui/LoadingLink";
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
            <main ref={containerRef} className="min-h-screen bg-[#584738] text-white">
                <section className="relative overflow-hidden border-b border-white/8">
                    <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(181,158,125,0.14),transparent_24%),radial-gradient(circle_at_75%_15%,rgba(180,138,99,0.12),transparent_22%),linear-gradient(180deg,#584738_0%,#584738_100%)]" />
                    <div className="relative mx-auto max-w-5xl px-6 pb-16 pt-36 md:px-12 lg:pt-40">
                        <LoadingLink
                            href="/blog"
                            className="inline-flex items-center gap-2 text-sm text-white/45 transition-colors hover:text-white/80"
                        >
                            <span className="material-symbols-outlined text-base">arrow_back</span>
                            Journal
                        </LoadingLink>

                        <div className="mt-8 flex flex-wrap items-center gap-3 text-xs text-white/38">
                            <span className="post-header-text rounded-full border border-white/12 bg-white/6 px-3 py-1 uppercase tracking-[0.24em] text-white/56">
                                SatSet Journal
                            </span>
                            <span className="post-header-text">{post.date}</span>
                            <span>·</span>
                            <span className="post-header-text">{post.readTime}</span>
                        </div>

                        <h1 className="post-header-text mt-6 max-w-4xl font-serif text-4xl font-bold leading-[1.02] tracking-tight md:text-6xl">
                            {post.title}
                        </h1>

                        <p className="post-header-text mt-6 max-w-3xl border-b border-white/10 pb-10 text-lg leading-8 text-white/58">
                            {post.excerpt}
                        </p>
                    </div>
                </section>

                <section className="mx-auto max-w-5xl px-6 py-14 md:px-12">
                    <div className="post-body mb-12 aspect-video overflow-hidden rounded-4xl border border-white/10 bg-linear-to-br from-white/10 to-white/2">
                        <div className="flex h-full items-center justify-center">
                            <div className="flex h-24 w-24 items-center justify-center rounded-full border border-white/14 bg-white/8">
                                <span className="material-symbols-outlined text-6xl text-white/14">article</span>
                            </div>
                        </div>
                    </div>

                    <article className="post-body">
                        <div className="space-y-7">
                            {post.content.split("\n\n").map((paragraph, index) => (
                                <p
                                    key={index}
                                    className={`${index === 0 ? "text-white/74" : "text-white/66"} text-[1.03rem] leading-[1.95]`}
                                >
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    </article>

                    <div className="post-body mt-14 rounded-4xl border border-white/10 bg-[#584738]/58 p-8 md:p-10">
                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">Keep reading</p>
                        <h3 className="mt-4 font-serif text-3xl font-bold tracking-tight">More notes from the workshop.</h3>
                        <p className="mt-4 max-w-2xl text-sm leading-7 text-white/56">
                            Additional writing on materials, product decisions, and how everyday objects can reduce friction.
                        </p>
                    </div>
                </section>

                {related.length > 0 && (
                    <section className="mx-auto mt-4 max-w-7xl border-t border-white/8 px-6 pb-24 pt-16 md:px-12 lg:px-20">
                        <p className="text-xs uppercase tracking-[0.28em] text-primary mb-8">
                            More from the journal
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {related.map((p) => (
                                <LoadingLink key={p.slug} href={`/blog/${p.slug}`}>
                                    <article className="group overflow-hidden rounded-4xl border border-white/10 bg-[#584738]/64 p-8 transition-all duration-400 hover:-translate-y-1 hover:border-white/22">
                                        <div className="flex items-center gap-3 text-xs text-white/38 mb-3">
                                            <span>{p.date}</span>
                                            <span>·</span>
                                            <span>{p.readTime}</span>
                                        </div>
                                        <h3 className="font-serif text-lg font-semibold text-white mb-2 group-hover:text-white/90 transition-colors">
                                            {p.title}
                                        </h3>
                                        <p className="text-white/50 text-sm leading-7 line-clamp-2">{p.excerpt}</p>
                                    </article>
                                </LoadingLink>
                            ))}
                        </div>
                    </section>
                )}

                <Footer />
            </main>
        </>
    );
}
