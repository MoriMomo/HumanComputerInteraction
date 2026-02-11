function DesignPhilosophy() {
    return (
        <section className="max-w-7xl mx-auto px-6 py-20">
            {/* Header */}
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                    Design{' '}
                    <span className="bg-gradient-to-r from-electric-cyan to-neon-mint bg-clip-text text-transparent">
                        Philosophy
                    </span>
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Where mechanical integrity meets everyday carry elegance
                </p>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Left: Main narrative */}
                <div className="space-y-6">
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-4">
                            The Modular Ecosystem
                        </h3>
                        <p className="text-gray-400 leading-relaxed">
                            Aura-Link ModuSnap isn't just a lanyard or ID holder. It's a carefully engineered
                            <span className="text-electric-cyan font-semibold"> modular ecosystem</span> designed
                            for those who demand both functionality and aesthetics in their daily carry.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-2xl font-bold text-white mb-4">
                            Mechanical Precision
                        </h3>
                        <p className="text-gray-400 leading-relaxed">
                            The rear-clamped design allows you to carry your ID card at the front while hiding
                            functional modules behind—preserving a clean profile while maximizing utility.
                            Every tolerances measured to <span className="text-neon-mint font-semibold">0.1mm precision</span>.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-2xl font-bold text-white mb-4">
                            Material Integrity
                        </h3>
                        <p className="text-gray-400 leading-relaxed">
                            3D-printed from premium engineering-grade nylon, the chassis is lightweight yet
                            remarkably durable. The signal-friendly polymer structure ensures your RFID/NFC
                            cards work flawlessly—no more fumbling to remove your ID at turnstiles.
                        </p>
                    </div>
                </div>

                {/* Right: Visual breakdown */}
                <div className="space-y-6">
                    {/* Card 1 */}
                    <div className="glass-dark p-6 rounded-xl border-l-4 border-electric-cyan">
                        <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                            <span className="text-electric-cyan">01.</span>
                            Spatial Awareness Design
                        </h4>
                        <p className="text-gray-400 text-sm">
                            Modules exist in the "shadow" of your ID card, adding zero visual bulk to
                            the front face while providing maximum functionality.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="glass-dark p-6 rounded-xl border-l-4 border-neon-mint">
                        <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                            <span className="text-neon-mint">02.</span>
                            Tactical Modularity
                        </h4>
                        <p className="text-gray-400 text-sm">
                            Swap modules based on your daily needs. Fragrance for meetings, tech storage
                            for travel, or custom modules from our growing ecosystem.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="glass-dark p-6 rounded-xl border-l-4 border-electric-cyan">
                        <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                            <span className="text-electric-cyan">03.</span>
                            Urban Tech-Noir Aesthetic
                        </h4>
                        <p className="text-gray-400 text-sm">
                            Inspired by cyberpunk minimalism—clean lines, functional beauty, and a color
                            palette that stands out in the urban jungle.
                        </p>
                    </div>

                    {/* Quote */}
                    <div className="glass p-6 rounded-xl border-l-4 border-gray-700 italic">
                        <p className="text-gray-300 text-sm">
                            "We don't design products. We engineer solutions that disappear into your workflow
                            while elevating your everyday carry."
                        </p>
                        <p className="text-gray-500 text-xs mt-2">— Design Team, Aura-Link</p>
                    </div>
                </div>
            </div>

            {/* Bottom CTA */}
            <div className="mt-16 text-center glass-dark p-12 rounded-2xl">
                <h3 className="text-3xl font-bold text-white mb-4">
                    Ready to Redefine Your Carry?
                </h3>
                <p className="text-gray-400 mb-8">
                    Join the waitlist for early access and exclusive launch pricing
                </p>
                <button className="px-8 py-4 bg-gradient-to-r from-electric-cyan to-neon-mint text-deep-black font-bold rounded-lg hover:shadow-2xl transition transform hover:scale-105">
                    Reserve Your ModuSnap
                </button>
            </div>
        </section>
    )
}

export default DesignPhilosophy
