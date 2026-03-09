"use client";
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
            className={`fixed top-4 left-4 right-4 z-50 transition-all duration-500 transform-gpu will-change-transform rounded-2xl ${scrolled
                    ? 'bg-charcoal/95 border border-primary/20 shadow-premium-lg'
                    : 'bg-white/90 border border-soft-grey shadow-sm'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                {/* Logo */}
                <div className={`flex items-center gap-4 transition-colors duration-500 ${scrolled ? 'text-primary' : 'text-secondary'}`}>
                    <div className="w-6 h-6 flex items-center justify-center">
                        <svg
                            fill="none"
                            viewBox="0 0 48 48"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-full h-full"
                        >
                            <path
                                d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z"
                                fill="currentColor"
                            ></path>
                        </svg>
                    </div>
                    <h2 className={`text-xl font-semibold leading-tight tracking-wide font-serif transition-colors duration-500 ${scrolled ? 'text-white' : 'text-charcoal'}`}>
                        SatSet
                    </h2>
                </div>

                {/* Nav Links */}
                <div className="hidden md:flex gap-8 items-center">
                    <div className="flex items-center gap-8 font-sans">
                        <a
                            href="#showcase"
                            className={`transition-colors duration-300 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary rounded px-2 py-1 ${scrolled ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-primary'}`}
                        >
                            Showcase
                        </a>
                        <a
                            href="#features"
                            className={`transition-colors duration-300 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary rounded px-2 py-1 ${scrolled ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-primary'}`}
                        >
                            Features
                        </a>
                        <a
                            href="#customizer"
                            className={`transition-colors duration-300 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary rounded px-2 py-1 ${scrolled ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-primary'}`}
                        >
                            Customizer
                        </a>
                        <a
                            href="#philosophy"
                            className={`transition-colors duration-300 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary rounded px-2 py-1 ${scrolled ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-primary'}`}
                        >
                            Philosophy
                        </a>
                    </div>
                    <button className={`flex items-center justify-center rounded-full h-10 px-6 text-sm font-medium transition-all shadow-md focus:outline-none focus:ring-4 focus:ring-primary/50 ${scrolled ? 'bg-primary text-white hover:bg-[#c2aa8a]' : 'bg-charcoal text-white hover:bg-primary'}`}>
                        <span className="truncate">Buy Now</span>
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className={`md:hidden focus:outline-none focus:ring-2 focus:ring-primary rounded transition-colors duration-500 ${scrolled ? 'text-white' : 'text-charcoal'}`}
                    aria-label="Open mobile menu"
                    aria-expanded="false"
                >
                    <span className="material-symbols-outlined" aria-hidden="true">menu</span>
                </button>
            </div>
        </nav>
    )
}

export default Navbar
