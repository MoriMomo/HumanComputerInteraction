/**
 * Design Philosophy section
 * Describes the product's design principles using SatSet warm palette
 */
function DesignPhilosophy() {
    return (
        <section className="max-w-7xl mx-auto px-6 py-20">
            {/* Header */}
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-charcoal">
                    Design{' '}
                    <span className="text-secondary">Philosophy</span>
                </h2>
                <p className="text-gray-500 max-w-2xl mx-auto">
                    Where mechanical integrity meets everyday carry elegance
                </p>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Left: Main narrative */}
                <div className="space-y-6">
                    <div>
                        <h3 className="text-2xl font-bold text-charcoal mb-4">The Modular Ecosystem</h3>
                        <p className="text-gray-500 leading-relaxed">
                            Aura-Link ModuSnap isn't just a lanyard or ID holder. It's a carefully engineered
                            <span className="text-secondary font-semibold"> modular ecosystem</span> designed
                            for those who demand both functionality and aesthetics in their daily carry.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-2xl font-bold text-charcoal mb-4">Mechanical Precision</h3>
                        <p className="text-gray-500 leading-relaxed">
                            The rear-clamped design allows you to carry your ID card at the front while hiding
                            functional modules behind—preserving a clean profile while maximizing utility.
                            Every tolerance measured to{' '}
                            <span className="text-primary font-semibold">0.1mm precision</span>.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-2xl font-bold text-charcoal mb-4">Material Integrity</h3>
                        <p className="text-gray-500 leading-relaxed">
                            3D-printed from premium engineering-grade nylon, the chassis is lightweight yet
                            remarkably durable. The signal-friendly polymer structure ensures your RFID/NFC
                            cards work flawlessly—no more fumbling to remove your ID at turnstiles.
                        </p>
                    </div>
                </div>

                {/* Right: Visual breakdown */}
                <div className="space-y-6">
                    {/* Card 1 */}
                    <div className="bg-white p-6 rounded-xl border-l-4 border-secondary shadow-sm">
                        <h4 className="text-charcoal font-bold mb-2 flex items-center gap-2">
                            <span className="text-secondary">01.</span>
                            Spatial Awareness Design
                        </h4>
                        <p className="text-gray-500 text-sm">
                            Modules exist in the &quot;shadow&quot; of your ID card, adding zero visual bulk to
                            the front face while providing maximum functionality.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white p-6 rounded-xl border-l-4 border-primary shadow-sm">
                        <h4 className="text-charcoal font-bold mb-2 flex items-center gap-2">
                            <span className="text-primary">02.</span>
                            Tactical Modularity
                        </h4>
                        <p className="text-gray-500 text-sm">
                            Swap modules based on your daily needs. Fragrance for meetings, tech storage
                            for travel, or custom modules from our growing ecosystem.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white p-6 rounded-xl border-l-4 border-secondary shadow-sm">
                        <h4 className="text-charcoal font-bold mb-2 flex items-center gap-2">
                            <span className="text-secondary">03.</span>
                            Executive Aesthetic
                        </h4>
                        <p className="text-gray-500 text-sm">
                            Inspired by warm minimalism—clean lines, functional beauty, and a warm tobacco
                            palette that elevates your professional carry.
                        </p>
                    </div>

                    {/* Quote */}
                    <div className="bg-[#F6F6F4] p-6 rounded-xl border-l-4 border-[#C6C1AB] italic">
                        <p className="text-gray-600 text-sm">
                            &quot;We don&apos;t design products. We engineer solutions that disappear into your workflow
                            while elevating your everyday carry.&quot;
                        </p>
                        <p className="text-gray-400 text-xs mt-2">— Design Team, Aura-Link</p>
                    </div>
                </div>
            </div>

            {/* Bottom CTA */}
            <div className="mt-16 text-center bg-white p-12 rounded-2xl border border-[#584738]/10 shadow-sm">
                <h3 className="text-3xl font-bold text-charcoal mb-4">
                    Ready to Redefine Your Carry?
                </h3>
                <p className="text-gray-500 mb-8">
                    Join the waitlist for early access and exclusive launch pricing
                </p>
                <button
                    className="px-8 py-4 font-bold rounded-lg transition-all bg-[#584738] text-white hover:bg-[#4a3a2c] hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-[#584738]/50"
                >
                    Reserve Your ModuSnap
                </button>
            </div>
        </section>
    )
}

export default DesignPhilosophy
