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
        kicker: "Execution",
    },
    {
        icon: "eco",
        title: "Material Integrity",
        description: "We use only 6061-T6 aerospace aluminium, sourced from certified mills.",
        kicker: "Materials",
    },
    {
        icon: "verified",
        title: "Zero Compromise",
        description: "If a part does not meet our standard, it does not ship. Simple.",
        kicker: "Quality",
    },
];

const WORKFLOW = [
    {
        step: "01",
        title: "Observe",
        body: "We map real workflow friction points before we sketch any form.",
    },
    {
        step: "02",
        title: "Prototype",
        body: "We iterate dimensions, tactility, and balance until interaction feels natural.",
    },
    {
        step: "03",
        title: "Refine",
        body: "Final production starts only after finish durability and fit tests are signed off.",
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
                    ".about-hero-item",
                    { y: 44, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.9, ease: "power4.out", stagger: 0.08 }
                );

                gsap.fromTo(
                    ".about-value-card",
                    { y: 34, opacity: 0 },
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
                    ".about-story-card",
                    { y: 34, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        stagger: 0.1,
                        duration: 0.75,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: ".about-story",
                            start: "top 84%",
                            once: true,
                        },
                    }
                );

                gsap.fromTo(
                    ".about-team-card",
                    { y: 34, opacity: 0 },
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

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Failed to send message");
            }

            setFormStatus("sent");
            setFormData({ name: "", email: "", message: "" });
        } catch (error) {
            console.error("Submission error:", error);
            setFormStatus("idle");
            // You might want to show an error message to the user here
        }
    };

    return (
        <>
            <Navbar />
            <main id="main-content" ref={containerRef} className="min-h-screen bg-[#584738] text-white">
                <section className="relative overflow-hidden border-b border-white/8">
                    <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(181,158,125,0.18),transparent_24%),radial-gradient(circle_at_80%_15%,rgba(180,138,99,0.12),transparent_22%),linear-gradient(180deg,#584738_0%,#584738_100%)]" />

                    <div className="relative mx-auto grid max-w-7xl gap-10 px-6 pb-20 pt-36 md:px-12 lg:grid-cols-[1.05fr_0.95fr] lg:px-20 lg:pb-24 lg:pt-40">
                        <div>
                            <p className="about-hero-item mb-6 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                                About SatSet
                            </p>
                            <h1 className="about-hero-item max-w-3xl font-serif text-5xl font-bold leading-[0.96] tracking-tight md:text-7xl">
                                Built for people who
                                <span className="block italic text-primary">notice everything.</span>
                            </h1>
                            <p className="about-hero-item mt-7 max-w-xl text-lg leading-8 text-white/60">
                                SatSet exists to make utility objects feel intentional, quiet, and uncompromising.
                            </p>

                            <div className="about-hero-item mt-9 flex flex-wrap gap-3">
                                <span className="rounded-full border border-white/10 bg-white/6 px-4 py-2 text-xs uppercase tracking-[0.24em] text-white/68">
                                    Jakarta based
                                </span>
                                <span className="rounded-full border border-white/10 bg-white/6 px-4 py-2 text-xs uppercase tracking-[0.24em] text-white/68">
                                    Precision-first
                                </span>
                                <span className="rounded-full border border-white/10 bg-white/6 px-4 py-2 text-xs uppercase tracking-[0.24em] text-white/68">
                                    Material-led
                                </span>
                            </div>
                        </div>

                        <div className="about-hero-item rounded-4xl border border-white/10 bg-white/5 p-6 shadow-[0_24px_90px_rgba(0,0,0,0.34)]">
                            <p className="text-xs uppercase tracking-[0.28em] text-white/42">Why we exist</p>
                            <div className="mt-5 space-y-4 text-sm leading-7 text-white/62">
                                <p>
                                    Most carry accessories are either overdesigned or forgettable. We build the middle ground: premium and calm.
                                </p>
                                <p>
                                    Every product decision starts from use-case clarity, then moves to material behavior, then visual form.
                                </p>
                            </div>

                            <div className="mt-7 grid grid-cols-3 gap-3">
                                <div className="rounded-3xl border border-white/10 bg-white/6 p-4">
                                    <p className="text-2xl font-semibold text-white">12+</p>
                                    <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-white/44">Years design</p>
                                </div>
                                <div className="rounded-3xl border border-white/10 bg-white/6 p-4">
                                    <p className="text-2xl font-semibold text-white">0.01</p>
                                    <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-white/44">Tolerance mm</p>
                                </div>
                                <div className="rounded-3xl border border-white/10 bg-white/6 p-4">
                                    <p className="text-2xl font-semibold text-white">100%</p>
                                    <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-white/44">QC checked</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="about-values mx-auto max-w-7xl border-b border-white/8 px-6 py-20 md:px-12 lg:px-20">
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary mb-12">
                        What We Stand For
                    </p>
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                        {VALUES.map((value, index) => (
                            <div
                                key={value.title}
                                className={`about-value-card relative overflow-hidden rounded-3xl border border-white/10 bg-[#584738]/70 p-8 ${index === 0 ? "lg:col-span-6 lg:row-span-2" : "lg:col-span-3"}`}
                            >
                                <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(180,138,99,0.12),transparent_42%)]" />
                                <p className="relative mb-5 text-[11px] uppercase tracking-[0.24em] text-white/45">{value.kicker}</p>
                                <span className="relative material-symbols-outlined mb-5 block text-3xl text-primary">
                                    {value.icon}
                                </span>
                                <h3 className={`relative mb-3 text-white ${index === 0 ? "font-serif text-3xl leading-tight" : "text-xl font-semibold"}`}>
                                    {value.title}
                                </h3>
                                <p className={`relative text-white/58 leading-relaxed ${index === 0 ? "max-w-md text-base" : "text-sm"}`}>
                                    {value.description}
                                </p>

                                {index === 0 && (
                                    <div className="relative mt-8 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.22em] text-white/48">
                                        <span className="rounded-full border border-white/12 bg-white/6 px-3 py-1">Tolerance checked</span>
                                        <span className="rounded-full border border-white/12 bg-white/6 px-3 py-1">Daily carry tested</span>
                                        <span className="rounded-full border border-white/12 bg-white/6 px-3 py-1">Machined finish</span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                <section className="about-story mx-auto max-w-7xl border-b border-white/8 px-6 py-20 md:px-12 lg:px-20">
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary mb-12">
                        How We Work
                    </p>
                    <div className="relative">
                        <div aria-hidden className="pointer-events-none absolute left-8 top-0 hidden h-full w-px bg-white/10 md:block" />
                        <div className="space-y-5">
                            {WORKFLOW.map((item) => (
                                <div key={item.step} className="about-story-card grid grid-cols-1 gap-5 rounded-3xl border border-white/10 bg-[#584738]/62 p-6 md:grid-cols-[5rem_1fr] md:items-center md:p-8">
                                    <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-white/14 bg-white/6 text-2xl font-semibold text-white/88">
                                        {item.step}
                                    </div>
                                    <div>
                                        <h3 className="font-serif text-2xl text-white">{item.title}</h3>
                                        <p className="mt-2 max-w-2xl text-sm leading-7 text-white/58">{item.body}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="about-team mx-auto max-w-7xl border-b border-white/8 px-6 py-20 md:px-12 lg:px-20">
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary mb-12">
                        The Team
                    </p>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        {TEAM.map((member) => (
                            <div
                                key={member.name}
                                className="about-team-card relative overflow-hidden rounded-3xl border border-white/10 bg-[#584738]/72 p-8"
                            >
                                <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(181,158,125,0.14),transparent_40%)]" />
                                <div className="relative mb-6 flex items-center justify-between gap-4">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/12 bg-white/8">
                                        <span className="material-symbols-outlined text-white/60">person</span>
                                    </div>
                                    <span className="rounded-full border border-white/12 bg-white/6 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-white/48">
                                        Team
                                    </span>
                                </div>

                                <h3 className="relative mb-1 text-lg font-semibold text-white">{member.name}</h3>
                                <p className="relative mb-4 text-xs uppercase tracking-widest text-primary">{member.role}</p>
                                <p className="relative text-sm leading-relaxed text-white/55">{member.bio}</p>

                                <div className="relative mt-6 border-t border-white/10 pt-4">
                                    <p className="text-[11px] uppercase tracking-[0.2em] text-white/40">Design principle</p>
                                    <p className="mt-2 text-sm text-white/62">
                                        Keep every interaction quiet, fast, and intentional.
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mx-auto max-w-7xl border-b border-white/8 px-6 py-16 md:px-12 lg:px-20">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        {[
                            ["Craft", "We care how it feels in hand, not only how it looks on screen."],
                            ["Consistency", "The same language flows from product design to communication."],
                            ["Longevity", "Form and materials are selected for years of use, not short cycles."],
                        ].map(([title, body]) => (
                            <div key={title} className="rounded-3xl border border-white/10 bg-white/5 p-6">
                                <p className="text-sm font-semibold text-white">{title}</p>
                                <p className="mt-3 text-sm leading-7 text-white/56">{body}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="contact-section mx-auto max-w-7xl px-6 py-20 md:px-12 lg:px-20">
                    <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.9fr_1.1fr]">
                        <div>
                            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.28em] text-primary">
                                Contact
                            </p>
                            <h2 className="mb-8 font-serif text-4xl font-bold md:text-5xl">
                                Get in touch
                            </h2>
                            <p className="mb-8 max-w-md text-sm leading-7 text-white/60">
                                Have a product question, partnership idea, or wholesale request? Send us a message.
                            </p>
                            <div className="space-y-5 rounded-3xl border border-white/10 bg-[#584738]/58 p-6">
                                {[
                                    { icon: "mail", label: "hello@satset.com" },
                                    { icon: "location_on", label: "Jakarta, Indonesia" },
                                    { icon: "schedule", label: "Mon - Fri, 09:00 - 18:00 WIB" },
                                ].map((item) => (
                                    <div key={item.label} className="flex items-center gap-4 text-white/60">
                                        <span className="material-symbols-outlined text-primary">{item.icon}</span>
                                        <span className="text-sm">{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5 rounded-3xl border border-white/10 bg-[#584738]/58 p-6 md:p-8">
                            {formStatus === "sent" ? (
                                <div className="rounded-2xl border border-white/15 bg-white/5 p-8 text-center">
                                    <span className="material-symbols-outlined mb-3 block text-4xl text-primary">
                                        check_circle
                                    </span>
                                    <p className="font-medium text-white">Message sent</p>
                                    <p className="mt-2 text-sm text-white/50">
                                        We will get back to you within one business day.
                                    </p>
                                </div>
                            ) : (
                                <>
                                    <div>
                                        <label className="mb-2 block text-xs uppercase tracking-widest text-white/50">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full rounded-xl border border-white/12 bg-white/5 px-4 py-3 text-white placeholder-white/28 transition-colors focus:border-white/30 focus:outline-none"
                                            placeholder="Your name"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-2 block text-xs uppercase tracking-widest text-white/50">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full rounded-xl border border-white/12 bg-white/5 px-4 py-3 text-white placeholder-white/28 transition-colors focus:border-white/30 focus:outline-none"
                                            placeholder="you@example.com"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-2 block text-xs uppercase tracking-widest text-white/50">
                                            Message
                                        </label>
                                        <textarea
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            rows={5}
                                            className="w-full resize-none rounded-xl border border-white/12 bg-white/5 px-4 py-3 text-white placeholder-white/28 transition-colors focus:border-white/30 focus:outline-none"
                                            placeholder="How can we help?"
                                            required
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={formStatus === "sending"}
                                        className="w-full rounded-full bg-white px-8 py-4 font-semibold text-[#584738] transition-all duration-300 hover:bg-white/90 disabled:opacity-60"
                                    >
                                        {formStatus === "sending" ? "Sending..." : "Send Message"}
                                    </button>
                                </>
                            )}
                        </form>
                    </div>
                </section>

                <Footer />
            </main>
        </>
    );
}
