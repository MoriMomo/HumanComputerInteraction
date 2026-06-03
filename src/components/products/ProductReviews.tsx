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
        <div className="detail-feature mt-8 rounded-3xl border border-stone-200 bg-stone-50 p-6">
            <div className="flex items-center justify-between gap-4 border-b border-stone-200 pb-4 mb-4">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-400">Verified reviews</p>
                <p className="text-sm text-stone-600">{aggregateRating}★ · {reviewCount}+ buyers</p>
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                {reviews.map((review, index) => {
                    const initials = review.name.split(" ").map((s) => s[0]).slice(0, 2).join("");

                    return (
                        <article
                            key={`${review.name}-${index}`}
                            className="group relative overflow-hidden rounded-2xl border border-stone-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                        >
                            {/* subtle brand accent stripe */}
                            <div className="absolute inset-y-0 left-0 w-0.5" style={{ background: 'linear-gradient(180deg,var(--color-brand-primary) 0%, rgba(35,23,17,0.03) 100%)' }} aria-hidden />

                            <div className="relative z-10 flex items-start gap-4">
                                <div className="flex-shrink-0">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full text-xs font-semibold text-primary" style={{ background: 'linear-gradient(135deg, rgba(35,23,17,0.08), rgba(241, 234, 218, 0.02))', border: '1px solid rgba(0,0,0,0.04)' }}>
                                        {initials}
                                    </div>
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-2 flex-wrap">
                                        <div>
                                            <p className="text-sm font-semibold text-[#231711] group-hover:text-primary transition-colors">{review.name}</p>
                                            <p className="text-[10px] uppercase tracking-[0.15em] text-stone-400 mt-0.5">{review.title ?? 'Verified Buyer'}</p>
                                        </div>
                                        <div className="flex items-center gap-0.5">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <svg key={i} width="12" height="12" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                                                    <path
                                                        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                                                        fill={i < review.rating ? 'var(--color-brand-primary)' : 'rgba(0,0,0,0.08)'}
                                                    />
                                                </svg>
                                            ))}
                                        </div>
                                    </div>

                                    <p className="mt-3 text-sm leading-relaxed text-stone-600">{review.note}</p>
                                </div>
                            </div>
                        </article>
                    );
                })}
            </div>
        </div>
    );
}
