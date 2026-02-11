import { useState, useEffect } from 'react'

function Navbar() {
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass-dark py-4' : 'bg-transparent py-6'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                {/* Logo */}
                <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-electric-cyan to-neon-mint rounded-lg flex items-center justify-center">
                        <span className="text-deep-black font-bold text-xl">A</span>
                    </div>
                    <span className="text-white font-bold text-xl tracking-wider">
                        AURA-LINK <span className="text-electric-cyan">MODUSNAP</span>
                    </span>
                </div>

                {/* Nav Links */}
                <div className="hidden md:flex space-x-8 text-sm">
                    <a href="#showcase" className="text-gray-300 hover:text-electric-cyan transition">
                        Showcase
                    </a>
                    <a href="#features" className="text-gray-300 hover:text-electric-cyan transition">
                        Features
                    </a>
                    <a href="#customizer" className="text-gray-300 hover:text-electric-cyan transition">
                        Customizer
                    </a>
                    <a href="#philosophy" className="text-gray-300 hover:text-electric-cyan transition">
                        Design
                    </a>
                </div>

                {/* CTA Button */}
                <button className="bg-electric-cyan hover:bg-neon-mint text-deep-black px-6 py-2 rounded-lg font-bold transition glow-cyan">
                    Pre-Order
                </button>
            </div>
        </nav>
    )
}

export default Navbar
