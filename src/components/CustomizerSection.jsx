"use client";
import dynamic from 'next/dynamic';

const ModularCustomizer = dynamic(() => import('./ModularCustomizer'), {
    ssr: false,
    loading: () => <div className="flex items-center justify-center min-h-[400px]">Loading Customizer...</div>
});

export default function CustomizerSection() {
    return (
        <section id="customizer" className="py-20 bg-charcoal">
            <ModularCustomizer />
        </section>
    );
}
