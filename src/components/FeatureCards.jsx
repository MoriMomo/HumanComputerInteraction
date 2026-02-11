function FeatureCards() {
    const features = [
        {
            title: "Rear-Clamped Modularity",
            description: "Patent-pending clamping system allows dual-module mounting without obscuring your primary ID card.",
            icon: "🔧",
            color: "electric-cyan"
        },
        {
            title: "Fragrance Module",
            description: "Sleek glass atomizer for instant freshness. Refillable, leak-proof, and perfectly balanced.",
            icon: "✨",
            color: "neon-mint"
        },
        {
            title: "Tech-Storage Module",
            description: "Hidden compartment for micro-SD cards, SIM ejector tools, or emergency backup keys.",
            icon: "🔐",
            color: "electric-cyan"
        },
        {
            title: "Signal-Friendly Chassis",
            description: "Premium 3D-printed polymer ensures RFID/NFC cards remain fully functional.",
            icon: "📡",
            color: "neon-mint"
        }
    ]

    return (
        <section className="max-w-7xl mx-auto px-6 py-20">
            {/* Section Header */}
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                    Engineered for{' '}
                    <span className="bg-gradient-to-r from-electric-cyan to-neon-mint bg-clip-text text-transparent">
                        Urban Professionals
                    </span>
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Every detail designed with mechanical precision and daily utility in mind
                </p>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="relative group glass-dark p-8 rounded-2xl hover:border-electric-cyan/50 transition-all duration-300 overflow-hidden"
                    >
                        {/* Glow effect on hover */}
                        <div className={`absolute inset-0 bg-gradient-to-br from-${feature.color}/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

                        {/* Content */}
                        <div className="relative z-10">
                            <div className="text-4xl mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-bold text-white mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {feature.description}
                            </p>
                        </div>

                        {/* Corner accent */}
                        <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-${feature.color}/20 to-transparent rounded-bl-full`}></div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default FeatureCards
