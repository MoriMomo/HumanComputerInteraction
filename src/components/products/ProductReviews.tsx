"use client";

interface Review {
    name: string;
    note: string;
    rating: number;
    title?: string;
}

interface ProductReviewsProps {
    reviews: Review[];
    aggregateRating: string;
    reviewCount: string;
}

export default function ProductReviews({ reviews, aggregateRating, reviewCount }: ProductReviewsProps) {
    if (reviews.length === 0) {
        return null;
    }

    return (
        <div className="detail-feature mt-8 rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-center justify-between gap-4">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/42">Verified reviews</p>
                <p className="text-sm text-white/72">{aggregateRating}★ · {reviewCount}+ buyers</p>
            </div>
            <div className="mt-4 space-y-3">
                {reviews.map((review, index) => {
                    const initials = review.name.split(" ").map((s) => s[0]).slice(0, 2).join("");

                    return (
                        <article
                            key={`${review.name}-${index}`}
                            className="group relative overflow-hidden rounded-3xl border border-black/8 bg-white p-6 transition-all duration-300 hover:border-primary/30 hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)]"
                            style={{ boxShadow: '0 8px 28px rgba(0,0,0,0.08)' }}
                        >
                            {/* subtle brand accent stripe */}
                            <div className="absolute inset-y-0 left-0 w-1" style={{ background: 'linear-gradient(180deg,var(--color-brand-primary) 0%, rgba(181,158,125,0.06) 100%)' }} aria-hidden />

                            <div className="relative z-10 flex items-start gap-4">
                                <div className="flex-shrink-0">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-full text-sm font-semibold text-primary" style={{ background: 'linear-gradient(135deg,var(--color-brand-primary)/18,var(--color-brand-cream)/6)' }}>
                                        {initials}
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <div className="flex items-center justify-between gap-3">
                                        <p className="text-sm font-semibold text-[#231711] group-hover:text-primary transition-colors">{review.name}</p>
                                        <div className="flex items-center gap-1">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <svg key={i} width="14" height="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                                                    <path
                                                        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                                                        fill={i < review.rating ? 'var(--color-brand-primary)' : 'rgba(35,23,17,0.16)'}
                                                    />
                                                </svg>
                                            ))}
                                        </div>
                                    </div>

                                    <p className="mt-3 text-sm leading-7 text-[#231711]/90">{review.note}</p>

                                    <div className="mt-4 h-px bg-linear-to-r from-black/6 via-black/3 to-transparent" />

                                    <div className="mt-4 flex items-center gap-4">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-primary" style={{ background: 'linear-gradient(180deg,var(--color-brand-primary)/14,var(--color-brand-cream)/6)' }}>
                                            {initials}
                                        </div>

                                        <div>
                                            <p className="text-sm font-semibold text-[#231711] group-hover:text-primary/90 transition-colors">{review.name}</p>
                                            <p className="text-xs uppercase tracking-[0.2em] text-[#231711]/44">{review.title ?? 'Customer'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    );
                })}
            </div>
        </div>
    );
}
