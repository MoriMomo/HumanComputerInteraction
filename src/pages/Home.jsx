import Navbar from '../components/Navbar.jsx'
import HeroSection from '../components/HeroSection.jsx'
import AnimatedShowcase from '../components/AnimatedShowcase.jsx'
import FeatureCards from '../components/FeatureCards.jsx'
import ModularCustomizer from '../components/ModularCustomizer.jsx'
import DesignPhilosophy from '../components/DesignPhilosophy.jsx'
import Footer from '../components/Footer.jsx'

function Home() {
    return (
        <div className="bg-deep-black text-white">
            <Navbar />
            <main>
                <HeroSection />
                <AnimatedShowcase />
                <FeatureCards />
                <ModularCustomizer />
                <DesignPhilosophy />
            </main>
            <Footer />
        </div>
    )
}

export default Home
