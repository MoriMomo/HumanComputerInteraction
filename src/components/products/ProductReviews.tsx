"use client";

interface Review {
    name: string;
    note: string;
    rating: number;
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
                {reviews.map((review, index) => (
                    <article key={`${review.name}-${index}`} className="rounded-2xl border border-white/8 bg-white/5 p-4 transition-colors hover:border-white/16 hover:bg-white/8">
                        <div className="flex items-center justify-between gap-2">
                            <p className="text-sm font-semibold text-white">{review.name}</p>
                            <p className="text-xs text-white/62">{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</p>
                        </div>
                        <p className="mt-2 text-sm leading-6 text-white/58">{review.note}</p>
                    </article>
                ))}
            </div>
        </div>
    );
}
