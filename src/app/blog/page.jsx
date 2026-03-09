"use client";
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';

// Mock blog data
const BLOG_POSTS = [
    {
        id: 1,
        title: "The Art of Essentialism in Modern Home Design",
        excerpt: "Discover how removing the unnecessary can bring focus and tranquility to your living spaces.",
        category: "Design",
        date: "Oct 12, 2026",
        readTime: "5 min read",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 2,
        title: "Sustainable Materials Shaping the Future",
        excerpt: "An inside look at the eco-friendly materials that are redefining premium lifestyle products.",
        category: "Sustainability",
        date: "Sep 28, 2026",
        readTime: "7 min read",
        image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 3,
        title: "Curating Your Workspace for Deep Work",
        excerpt: "Practical tips for arranging your desk and environment to maximize focus and creativity.",
        category: "Lifestyle",
        date: "Sep 15, 2026",
        readTime: "4 min read",
        image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 4,
        title: "AuraLink: The Development Story",
        excerpt: "Behind the scenes of creating a brand that balances form and function perfectly.",
        category: "Behind the Scenes",
        date: "Aug 30, 2026",
        readTime: "8 min read",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
];

const Blog = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.blog-header', {
                opacity: 0,
                y: 40,
                duration: 1,
                ease: 'power3.out',
            });

            gsap.from('.blog-card', {
                opacity: 0,
                y: 50,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power3.out',
                delay: 0.4,
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="min-h-screen bg-background-light pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative">
            {/* Background Accent */}
            <div className="absolute top-40 right-10 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-20 blog-header">
                    <h1 className="text-5xl md:text-6xl font-serif font-bold text-charcoal mb-6">
                        The <span className="text-primary italic">Journal</span>
                    </h1>
                    <p className="text-lg text-charcoal/60 max-w-2xl mx-auto">
                        Thoughts, stories, and ideas surrounding minimalist design, sustainable living, and intentional lifestyles.
                    </p>

                    {/* Simplified category filter */}
                    <div className="mt-10 flex flex-wrap justify-center gap-4">
                        {['All', 'Design', 'Lifestyle', 'Sustainability'].map((cat, idx) => (
                            <button key={idx} className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${idx === 0 ? 'bg-charcoal text-white' : 'glass text-charcoal/70 hover:text-primary hover:border-primary/50'}`}>
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-12 gap-y-16">
                    {BLOG_POSTS.map((post, idx) => (
                        <article key={post.id} className="blog-card group cursor-pointer">
                            <Link href={`/blog/${post.id}`} className="block">
                                <div className="aspect-[16/10] overflow-hidden rounded-2xl glass p-2 mb-6">
                                    <div className="w-full h-full rounded-xl overflow-hidden relative">
                                        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 mix-blend-overlay"></div>
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center space-x-4 mb-3 text-xs font-bold tracking-wider uppercase">
                                        <span className="text-primary">{post.category}</span>
                                        <span className="text-soft-grey">&bull;</span>
                                        <span className="text-charcoal/50">{post.readTime}</span>
                                    </div>
                                    <h2 className="text-2xl font-serif font-bold text-charcoal mb-3 group-hover:text-primary transition-colors">
                                        {post.title}
                                    </h2>
                                    <p className="text-charcoal/70 line-clamp-2">
                                        {post.excerpt}
                                    </p>
                                    <div className="mt-6 flex items-center text-sm font-medium text-charcoal">
                                        <span className="border-b border-charcoal/30 pb-1 group-hover:border-primary group-hover:text-primary transition-all">Read Article</span>
                                    </div>
                                </div>
                            </Link>
                        </article>
                    ))}
                </div>

                <div className="mt-20 text-center blog-header">
                    <button className="px-8 py-3 glass border border-soft-grey/50 rounded-full hover:bg-white/50 text-charcoal font-medium transition-colors duration-300">
                        Load More Articles
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Blog;
