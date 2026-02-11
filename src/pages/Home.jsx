import Hero3D from '../components/Hero3D'
import HeroSection from '../components/HeroSection'
import FeatureCards from '../components/FeatureCards'
import ModularCustomizer from '../components/ModularCustomizer'
import DesignPhilosophy from '../components/DesignPhilosophy'

function Home() {
    return (
        <div className="w-full">
            {/* Hero Text Section */}
            <HeroSection />

            {/* 3D Product Showcase */}
            <section id="showcase" className="min-h-screen relative">
                <Hero3D />
            </section>

            {/* Feature Cards */}
            <section id="features" className="py-20">
                <FeatureCards />
            </section>

            {/* Interactive Customizer */}
            <section id="customizer" className="py-20 bg-charcoal">
                <ModularCustomizer />
            </section>

            {/* Design Philosophy */}
            <section id="philosophy" className="py-20">
                <DesignPhilosophy />
            </section>
        </div>
    )
}

export default Home
