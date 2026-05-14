import { memo } from "react";

interface HeroActionsProps {
    primaryHref?: string;
    secondaryHref?: string;
}

function HeroActions({
    primaryHref = "#shop",
    secondaryHref = "#features",
}: HeroActionsProps) {
    return (
        <div className="mt-8 flex items-center gap-4">
            <a
                href={primaryHref}
                className="hero-cta-primary inline-flex items-center justify-center rounded-full h-11 px-6 bg-[#231711] text-sm font-semibold tracking-wide hover:bg-black/90 transition-colors"
            >
                Shop Collection
            </a>
            <a
                href={secondaryHref}
                className="inline-flex items-center justify-center rounded-full h-11 px-6 border border-black/12 text-black/86 text-sm font-medium hover:text-black hover:border-black/24 transition-colors"
            >
                See Features
            </a>
        </div>
    );
}

export default memo(HeroActions);