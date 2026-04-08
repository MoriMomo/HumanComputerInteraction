"use client";

interface SkeletonProps {
    className?: string;
    count?: number;
}

export function SkeletonCard({ className = "" }: SkeletonProps) {
    return (
        <div className={`animate-pulse space-y-6 ${className}`}>
            <div className="h-48 bg-white/5 rounded-2xl" />
            <div className="space-y-3">
                <div className="h-6 bg-white/5 rounded-lg w-3/4" />
                <div className="h-4 bg-white/5 rounded-lg w-full" />
                <div className="h-4 bg-white/5 rounded-lg w-5/6" />
            </div>
            <div className="h-10 bg-white/5 rounded-full w-full" />
        </div>
    );
}

export function SkeletonLine({ className = "" }: SkeletonProps) {
    return <div className={`h-4 bg-white/5 rounded-lg animate-pulse ${className}`} />;
}

export function Skeleton3DViewer({ className = "" }: SkeletonProps) {
    return (
        <div className={`relative aspect-square lg:aspect-auto lg:h-150 rounded-3xl overflow-hidden border border-white/8 bg-white/2 animate-pulse ${className}`}>
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 rounded-full border-2 border-white/20 border-t-white animate-spin mx-auto mb-4" />
                    <p className="text-white/40 text-sm">Loading 3D Viewer...</p>
                </div>
            </div>
        </div>
    );
}

export function SkeletonGrid({ count = 3 }: SkeletonProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(count)].map((_, i) => (
                <SkeletonCard key={i} />
            ))}
        </div>
    );
}
