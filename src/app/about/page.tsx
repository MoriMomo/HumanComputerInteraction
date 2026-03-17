"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

gsap.registerPlugin(ScrollTrigger);

const TEAM = [
    {
        name: "Aditya Putra",
        role: "Founder & Designer",
        bio: "Industrial designer with 12 years in premium goods. Former Braun and Leatherman design lead.",
    },
    {
        name: "Sari Wijaya",
        role: "Head of Engineering",
        bio: "Materials engineer specialising in aluminium alloys and surface treatment processes.",
    },
    {
        name: "Reza Maulana",
        role: "Operations",
        bio: "Supply chain specialist ensuring every unit meets our zero-compromise quality standard.",
    },
];

const VALUES = [
    {
        icon: "precision_manufacturing",
        title: "Precision First",
        description: "Every component is machined to ±0.01mm tolerances. No exceptions.",
    },
    {
        icon: "eco",
        title: "Material Integrity",
        description: "We use only 6061-T6 aerospace aluminium, sourced from certified mills.",
    },
    {
        icon: "verified",
        title: "Zero Compromise",
        description: "If a part does not meet our standard, it does not ship. Simple.",
    },
];

export default function AboutPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent">("idle");

    useGSAP(
        () => {
            const ctx = gsap.context(() => {
                const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
                if (prefersReducedMotion) return;

                gsap.fromTo(
                    ".about-hero-text",
                    { y: 60, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1, ease: "power4.out", stagger: 0.12 }
                );

                gsap.fromTo(
                    ".about-value-card",
                    { y: 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        stagger: 0.12,
                        duration: 0.8,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: ".about-values",
                            start: "top 85%",
                            once: true,
                        },
                    }
                );

                gsap.fromTo(
                    ".about-team-card",
                    { y: 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        stagger: 0.12,
                        duration: 0.8,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: ".about-team",
                            start: "top 85%",
                            once: true,
                        },
                    }
                );

                gsap.fromTo(
                    ".contact-section",
                    { y: 40, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.9,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: ".contact-section",
                            start: "top 88%",
                            once: true,
                        },
                    }
                );
            }, containerRef);

            return () => ctx.revert();
        },
        { scope: containerRef }
    );

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus("sending");
        await new Promise((resolve) => setTimeout(resolve, 1200));
        setFormStatus("sent");
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <>
            <Navbar />
            <div ref={containerRef} className="min-h-screen bg-[#0a0f16] text-white">
                {/* Hero */}
                <section className="relative pt-40 pb-28 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
                    <div
                        aria-hidden
                        className="pointer-events-none absolute right-0 top-24 h-80 w-80 rounded-full bg-[#3b4a5a]/20 blur-2xl"
                    />
                    <p className="about-hero-text text-xs font-semibold tracking-[0.28em] uppercase text-primary mb-6">
                        About SatSet
                    </p>
                    <h1 className="about-hero-text font-serif text-5xl md:text-7xl font-bold leading-tight mb-8 max-w-3xl">
                        Built for people who{" "}
                        <span className="italic text-primary">notice everything</span>.
                    </h1>
                    <div className="about-hero-text grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl">
                        <p className="text-white/62 text-lg leading-relaxed">
                            SatSet was born from a simple conviction: everyday carry objects should be as
                            refined as the professionals who use them. We design for those who notice the
                            difference between good and exceptional.
                        </p>
                        <p className="text-white/62 text-lg leading-relaxed">
                            Every product is engineered to a single standard — the one where nothing is left
                            to chance. Material, geometry, finish, weight: each decision is deliberate.
                        </p>
                    </div>
                </section>

                {/* Values */}
                <section className="about-values py-24 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto border-t border-white/8">
                    <p className="text-xs font-semibold tracking-[0.28em] uppercase text-primary mb-12">
                        What We Stand For
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {VALUES.map((v) => (
                            <div
                                key={v.title}
                                className="about-value-card rounded-3xl border border-white/10 bg-[#0f1620]/60 p-8"
                            >
                                <span className="material-symbols-outlined text-3xl text-primary mb-5 block">
                                    {v.icon}
                                </span>
                                <h3 className="text-xl font-semibold text-white mb-3">{v.title}</h3>
                                <p className="text-white/58 text-sm leading-relaxed">{v.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Team */}
                <section className="about-team py-24 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto border-t border-white/8">
                    <p className="text-xs font-semibold tracking-[0.28em] uppercase text-primary mb-12">
                        The Team
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {TEAM.map((member) => (
                            <div
                                key={member.name}
                                className="about-team-card rounded-3xl border border-white/10 bg-[#0f1620]/60 p-8"
                            >
                                <div className="w-14 h-14 rounded-full bg-white/8 border border-white/12 mb-6 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-white/60">person</span>
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-1">{member.name}</h3>
                                <p className="text-xs uppercase tracking-widest text-primary mb-4">{member.role}</p>
                                <p className="text-white/55 text-sm leading-relaxed">{member.bio}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Contact */}
                <section className="contact-section py-24 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto border-t border-white/8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        <div>
                            <p className="text-xs font-semibold tracking-[0.28em] uppercase text-primary mb-6">
                                Contact
                            </p>
                            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-8">
                                Get in touch
                            </h2>
                            <div className="space-y-5">
                                {[
                                    { icon: "mail", label: "hello@satset.com" },
                                    { icon: "location_on", label: "Jakarta, Indonesia" },
                                    { icon: "schedule", label: "Mon – Fri, 09:00 – 18:00 WIB" },
                                ].map((item) => (
                                    <div key={item.label} className="flex items-center gap-4 text-white/60">
                                        <span className="material-symbols-outlined text-primary">{item.icon}</span>
                                        <span className="text-sm">{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {formStatus === "sent" ? (
                                <div className="rounded-2xl border border-white/15 bg-white/5 p-8 text-center">
                                    <span className="material-symbols-outlined text-4xl text-primary mb-3 block">
                                        check_circle
                                    </span>
                                    <p className="text-white font-medium">Message sent</p>
                                    <p className="text-white/50 text-sm mt-2">
                                        We will get back to you within one business day.
                                    </p>
                                </div>
                            ) : (
                                <>
                                    <div>
                                        <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/12 text-white placeholder-white/28 focus:border-white/30 focus:outline-none transition-colors"
                                            placeholder="Your name"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/12 text-white placeholder-white/28 focus:border-white/30 focus:outline-none transition-colors"
                                            placeholder="you@example.com"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">
                                            Message
                                        </label>
                                        <textarea
                                            value={formData.message}
                                            onChange={(e) =>
                                                setFormData({ ...formData, message: e.target.value })
                                            }
                                            rows={5}
                                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/12 text-white placeholder-white/28 focus:border-white/30 focus:outline-none transition-colors resize-none"
                                            placeholder="How can we help?"
                                            required
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={formStatus === "sending"}
                                        className="w-full px-8 py-4 rounded-full bg-white text-[#0a0f16] font-semibold hover:bg-white/90 transition-all duration-300 disabled:opacity-60"
                                    >
                                        {formStatus === "sending" ? "Sending…" : "Send Message"}
                                    </button>
                                </>
                            )}
                        </form>
                    </div>
                </section>

                <Footer />
            </div>
        </>
    );
}
