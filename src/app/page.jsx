import HeroSection from '../components/HeroSection'
import FeatureCards from '../components/FeatureCards'
import DesignPhilosophy from '../components/DesignPhilosophy'
import Footer from '../components/Footer'

import ShowcaseSection from '../components/ShowcaseSection'
import CustomizerSection from '../components/CustomizerSection'

export default function Home() {
    return (
        <div className="w-full">
            {/* Hero Text Section */}
            <HeroSection />

            {/* 3D Product Showcase */}
            <ShowcaseSection />

            {/* Feature Cards */}
            <section id="features" className="py-20">
                <FeatureCards />
            </section>

            {/* Interactive Customizer */}
            <CustomizerSection />

            {/* Design Philosophy */}
            <section id="philosophy" className="py-20">
                <DesignPhilosophy />
            </section>

            {/* Footer */}
            <Footer />
        </div>
    )
}
