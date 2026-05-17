"use client";

const TESTIMONIALS = [
    {
        name: "Alya Pratama",
        role: "Creative Director",
        quote: "The 3D preview makes the finish feel real before I buy. It removed the usual hesitation.",
        rating: 5,
    },
    {
        name: "Rizky Aditya",
        role: "Product Manager",
        quote: "Fast cart flow, clear specs, and the WhatsApp help line made the whole purchase feel easy.",
        rating: 5,
    },
    {
        name: "Nadya Sari",
        role: "Design Consultant",
        quote: "I could compare colors, read the specs, and check social proof without leaving the page.",
        rating: 4,
    },
];

export default function TestimonialsSection() {
    return (
        <section className="relative overflow-hidden bg-brand-dark px-6 py-28 text-white md:px-12 lg:px-20">
            <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(181,158,125,0.12),transparent_28%),linear-gradient(180deg,#584738_0%,#20140f_100%)]" />
            <div className="relative mx-auto max-w-7xl">
                <div className="max-w-2xl">
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">Social proof</p>
                    <h2 className="mt-4 font-serif text-4xl font-bold md:text-5xl">Trusted by people who want the product to feel real before they commit.</h2>
                    <p className="mt-4 max-w-xl text-white/64">
                        Dummy testimonials are in place for now so the site can prove the visual and trust-building pattern.
                    </p>
                </div>

                <div className="mt-10 grid gap-4 md:grid-cols-3">
                    {TESTIMONIALS.map((testimonial) => (
                        <article key={testimonial.name} className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                            <p className="text-sm text-white/70">{"★".repeat(testimonial.rating)}{"☆".repeat(5 - testimonial.rating)}</p>
                            <p className="mt-4 text-sm leading-7 text-white/78">“{testimonial.quote}”</p>
                            <div className="mt-6 border-t border-white/10 pt-4">
                                <p className="text-sm font-semibold text-white">{testimonial.name}</p>
                                <p className="text-xs uppercase tracking-[0.2em] text-white/44">{testimonial.role}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}