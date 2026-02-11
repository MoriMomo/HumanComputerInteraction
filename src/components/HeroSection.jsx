function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center justify-center bg-deep-black overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-20 left-10 w-72 h-72 bg-electric-cyan rounded-full blur-3xl animate-pulse-slow"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-neon-mint rounded-full blur-3xl animate-pulse-slow"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                {/* Small label */}
                <div className="inline-block mb-6 px-4 py-2 glass-dark rounded-full border border-electric-cyan/30">
                    <span className="text-electric-cyan text-sm font-mono tracking-wider">
                        THE TACTICAL NEXUS
                    </span>
                </div>

                {/* Main heading with kinetic typography */}
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
                    Define Your Carry.
                    <br />
                    <span className="bg-gradient-to-r from-electric-cyan via-neon-mint to-electric-cyan bg-clip-text text-transparent animate-pulse">
                        Snap Your World.
                    </span>
                </h1>

                {/* Subtitle */}
                <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
                    A modular ecosystem designed for those who prioritize{' '}
                    <span className="text-electric-cyan">mobility</span>,{' '}
                    <span className="text-neon-mint">efficiency</span>, and{' '}
                    <span className="text-white font-bold">urban tech-noir style</span>.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                        href="#showcase"
                        className="px-8 py-4 bg-electric-cyan text-deep-black font-bold rounded-lg hover:bg-neon-mint transition transform hover:scale-105 glow-cyan"
                    >
                        Explore 3D Showcase
                    </a>
                    <a
                        href="#customizer"
                        className="px-8 py-4 glass border border-electric-cyan text-white font-bold rounded-lg hover:bg-electric-cyan/10 transition"
                    >
                        Customize Yours
                    </a>
                </div>

                {/* Technical specs ticker */}
                <div className="mt-16 flex flex-wrap justify-center gap-8 text-xs font-mono text-gray-500 uppercase tracking-widest">
                    <span className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-electric-cyan rounded-full"></div>
                        3D PRINTED NYLON
                    </span>
                    <span className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-neon-mint rounded-full"></div>
                        MODULAR CLAMP
                    </span>
                    <span className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-electric-cyan rounded-full"></div>
                        RFID SAFE
                    </span>
                </div>
            </div>
        </section>
    )
}

export default HeroSection
