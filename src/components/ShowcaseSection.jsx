"use client";
import dynamic from 'next/dynamic';

const Hero3D = dynamic(() => import('./Hero3D'), {
    ssr: false,
    loading: () => <div className="flex items-center justify-center min-h-screen">Loading 3D Experience...</div>
});

export default function ShowcaseSection() {
    return (
        <section id="showcase" className="min-h-screen relative">
            <Hero3D />
        </section>
    );
}
