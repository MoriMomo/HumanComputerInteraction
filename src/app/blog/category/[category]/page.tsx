"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LoadingLink from "@/components/ui/LoadingLink";
import { BLOG_CATEGORIES, formatCategoryLabel, getBlogCategory } from "@/lib/blog-categories";
import { BLOG_POSTS } from "@/data/blog";

export default function BlogCategoryPage() {
    const params = useParams<{ category: string }>();
    const activeCategory = params.category;

    const posts = useMemo(() => {
        if (!BLOG_CATEGORIES.includes(activeCategory as (typeof BLOG_CATEGORIES)[number])) {
            return [];
        }
        return BLOG_POSTS.filter((post) => getBlogCategory(post.slug) === activeCategory);
    }, [activeCategory]);

    const heading = BLOG_CATEGORIES.includes(activeCategory as (typeof BLOG_CATEGORIES)[number])
        ? formatCategoryLabel(activeCategory as (typeof BLOG_CATEGORIES)[number])
        : "Category";

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-[#584738] px-6 pb-20 pt-32 text-white md:px-12 lg:px-20">
                <div className="mx-auto max-w-7xl">
                    <LoadingLink href="/blog" className="text-sm text-white/52 transition-colors hover:text-white/84">
                        ← Back to journal
                    </LoadingLink>
                    <p className="mt-8 text-xs font-semibold uppercase tracking-[0.3em] text-primary">Category</p>
                    <h1 className="mt-3 font-serif text-4xl font-bold md:text-5xl">{heading}</h1>

                    <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
                        {posts.map((post) => (
                            <LoadingLink key={post.slug} href={`/blog/${post.slug}`}>
                                <article className="h-full rounded-4xl border border-white/10 bg-[#584738]/64 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-white/22">
                                    <div className="text-xs text-white/38">
                                        {post.date} · {post.readTime}
                                    </div>
                                    <h2 className="mt-3 font-serif text-2xl font-semibold text-white">{post.title}</h2>
                                    <p className="mt-3 text-sm leading-7 text-white/56">{post.excerpt}</p>
                                </article>
                            </LoadingLink>
                        ))}
                    </div>

                    {posts.length === 0 && (
                        <p className="mt-10 text-sm text-white/58">No posts found in this category yet.</p>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
}
