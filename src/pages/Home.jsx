import { lazy, Suspense } from 'react'

import HeroSection from '../components/HeroSection'
import FeatureCards from '../components/FeatureCards'
import DesignPhilosophy from '../components/DesignPhilosophy'
import Footer from '../components/Footer'

// Lazy load heavy 3D components
const Hero3D = lazy(() => import('../components/Hero3D'))
const ModularCustomizer = lazy(() => import('../components/ModularCustomizer'))

function Home() {
    return (
        <div className="w-full">
            {/* Hero Text Section */}
            <HeroSection />

            {/* 3D Product Showcase */}
            <section id="showcase" className="min-h-screen relative">
                <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading 3D Experience...</div>}>
                    <Hero3D />
                </Suspense>
            </section>

            {/* Feature Cards */}
            <section id="features" className="py-20">
                <FeatureCards />
            </section>

            {/* Interactive Customizer */}
            <section id="customizer" className="py-20 bg-charcoal">
                <Suspense fallback={<div className="flex items-center justify-center min-h-[400px]">Loading Customizer...</div>}>
                    <ModularCustomizer />
                </Suspense>
            </section>

            {/* Design Philosophy */}
            <section id="philosophy" className="py-20">
                <DesignPhilosophy />
            </section>

            {/* Footer */}
            <Footer />
        </div>
    )
}

export default Home
