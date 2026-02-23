import { FaTwitter, FaInstagram, FaGithub, FaDiscord } from 'react-icons/fa'

const SOCIAL_LINKS = [
    { label: 'Twitter', icon: FaTwitter, accent: 'cyan' },
    { label: 'Instagram', icon: FaInstagram, accent: 'mint' },
    { label: 'GitHub', icon: FaGithub, accent: 'cyan' },
    { label: 'Discord', icon: FaDiscord, accent: 'mint' },
]

const FOOTER_LINKS = [
    {
        title: 'Explore',
        links: ['Showcase', 'Modules', 'Technology', 'Materials'],
    },
    {
        title: 'Support',
        links: ['FAQ', 'Shipping', 'Warranty', 'Contact'],
    },
]

function Footer() {
    return (
        <footer className="border-t border-white/5 bg-black/80 px-6 pb-10 pt-16">
            <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.2fr_0.6fr_0.6fr_1fr]">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.4em] text-gray-500">
                        Aura-Link
                    </p>
                    <p className="mt-4 text-2xl font-semibold text-white">ModuSnap</p>
                    <p className="mt-3 text-sm text-gray-400">
                        Modular carry systems engineered for precision, customization, and futuristic everyday use.
                    </p>
                    <div className="mt-6 flex items-center gap-4">
                        {SOCIAL_LINKS.map(({ label, icon, accent }) => {
                            const IconComponent = icon
                            const accentClass =
                                accent === 'mint'
                                    ? 'hover:text-neon-mint hover:shadow-[0_0_18px_rgba(57,255,20,0.35)]'
                                    : 'hover:text-electric-cyan hover:shadow-[0_0_18px_rgba(0,250,255,0.35)]'

                            return (
                                <button
                                    key={label}
                                    type="button"
                                    aria-label={label}
                                    className={`flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-gray-400 transition ${accentClass}`}
                                >
                                    <IconComponent />
                                </button>
                            )
                        })}
                    </div>
                </div>

                {FOOTER_LINKS.map((section) => (
                    <div key={section.title}>
                        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-gray-500">
                            {section.title}
                        </p>
                        <ul className="mt-4 space-y-2 text-sm text-gray-400">
                            {section.links.map((link) => (
                                <li key={link} className="transition hover:text-electric-cyan">
                                    {link}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}

                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.4em] text-gray-500">
                        Newsletter
                    </p>
                    <p className="mt-4 text-sm text-gray-400">
                        Join the drop list for early module access and launch updates.
                    </p>
                    <div className="mt-4 flex items-center gap-2">
                        <input
                            type="email"
                            placeholder="Email address"
                            className="w-full rounded-full border border-white/10 bg-black/40 px-4 py-2 text-sm text-white placeholder:text-gray-600"
                        />
                        <button
                            type="button"
                            className="rounded-full border border-electric-cyan px-4 py-2 text-xs font-semibold text-electric-cyan"
                        >
                            Join
                        </button>
                    </div>
                </div>
            </div>

            <div className="mx-auto mt-10 flex max-w-6xl flex-col items-center justify-between gap-3 border-t border-white/5 pt-6 text-xs text-gray-600 md:flex-row">
                <span>© 2026 Aura-Link ModuSnap. All rights reserved.</span>
                <div className="flex gap-6">
                    <span className="transition hover:text-electric-cyan">Privacy</span>
                    <span className="transition hover:text-electric-cyan">Terms</span>
                </div>
            </div>
        </footer>
    )
}

export default Footer
