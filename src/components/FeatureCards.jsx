import { FEATURES, FEATURE_ACCENT_COLORS } from '../constants'

/**
 * Feature cards section component
 * Displays product features in a responsive grid
 */
function FeatureCards() {
    /**
     * Get accent classes for a feature card
     * @param {string} accentColor - 'primary' | 'secondary'
     */
    const getAccentClasses = (accentColor) =>
        FEATURE_ACCENT_COLORS[accentColor] ?? FEATURE_ACCENT_COLORS.primary

    return (
        <section className="max-w-7xl mx-auto px-6 py-20">
            {/* Section Header */}
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-charcoal">
                    Engineered for{' '}
                    <span className="text-secondary">Urban Professionals</span>
                </h2>
                <p className="text-gray-500 max-w-2xl mx-auto">
                    Every detail designed with mechanical precision and daily utility in mind
                </p>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {FEATURES.map((feature, index) => {
                    const accentClasses = getAccentClasses(feature.accentColor)

                    return (
                        <div
                            key={index}
                            className={`relative group bg-white p-8 rounded-2xl border border-[#584738]/10 hover:${accentClasses.border} transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md`}
                        >
                            {/* Subtle glow on hover */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${accentClasses.gradient} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                            {/* Content */}
                            <div className="relative z-10">
                                <div className="text-4xl mb-4" aria-hidden="true">{feature.icon}</div>
                                <h3 className="text-xl font-bold text-charcoal mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>

                            {/* Corner accent */}
                            <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl ${accentClasses.glow} to-transparent rounded-bl-full`} />
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

export default FeatureCards
