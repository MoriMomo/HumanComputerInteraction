import { FaTwitter, FaInstagram, FaGithub, FaDiscord } from 'react-icons/fa'

const SOCIAL_LINKS = [
    { href: '#', icon: FaTwitter, label: 'Twitter', hoverColor: '#584738' },
    { href: '#', icon: FaInstagram, label: 'Instagram', hoverColor: '#B59E7D' },
    { href: '#', icon: FaGithub, label: 'GitHub', hoverColor: '#333333' },
    { href: '#', icon: FaDiscord, label: 'Discord', hoverColor: '#5865F2' },
]

const NAV_LINKS = [
    { href: '#showcase', label: '3D Showcase' },
    { href: '#features', label: 'Modular Features' },
    { href: '#customizer', label: 'Customizer' },
    { href: '#philosophy', label: 'Design Philosophy' },
]

function Footer() {
    return (
        <footer className="relative bg-[#333333] border-t border-white/10 pt-20 pb-10 overflow-hidden">
            {/* Subtle ambient gradient highlights (optimized for scroll performance) */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ background: 'radial-gradient(circle at 25% 0%, rgba(181,158,125,0.06) 0%, transparent 40%), radial-gradient(circle at 75% 100%, rgba(88,71,56,0.08) 0%, transparent 40%)' }} />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
                    {/* Brand Column */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #B59E7D, #584738)' }}>
                                <span className="text-white font-bold text-lg">A</span>
                            </div>
                            <span className="text-white font-bold text-xl tracking-wider">
                                AURA-LINK <span style={{ color: '#B59E7D' }}>MODUSNAP</span>
                            </span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-sm mb-8">
                            Redefining personal carry through modular precision and executive-grade aesthetics.
                            Join the evolution of functional style.
                        </p>
                        <div className="flex space-x-4">
                            {SOCIAL_LINKS.map(({ href, icon: Icon, label, hoverColor }) => (
                                <a
                                    key={label}
                                    href={href}
                                    aria-label={`Visit our ${label}`}
                                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 transition-all focus:outline-none focus:ring-2 focus:ring-[#B59E7D]"
                                    onMouseEnter={e => {
                                        e.currentTarget.style.color = hoverColor
                                        e.currentTarget.style.borderColor = hoverColor
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.color = ''
                                        e.currentTarget.style.borderColor = ''
                                    }}
                                >
                                    <Icon aria-hidden="true" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-bold mb-6 tracking-widest text-sm">EXPLORE</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            {NAV_LINKS.map(({ href, label }) => (
                                <li key={label}>
                                    <a
                                        href={href}
                                        className="transition-colors focus:outline-none focus:ring-2 focus:ring-[#B59E7D] rounded px-1"
                                        style={{ color: 'inherit' }}
                                        onMouseEnter={e => e.currentTarget.style.color = '#B59E7D'}
                                        onMouseLeave={e => e.currentTarget.style.color = ''}
                                    >
                                        {label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-white font-bold mb-6 tracking-widest text-sm">STAY CONNECTED</h4>
                        <p className="text-gray-500 text-xs mb-4">Subscribe for exclusive drops and updates.</p>
                        <form className="space-y-3" onSubmit={e => e.preventDefault()}>
                            <label htmlFor="newsletter-email" className="sr-only">Email address for newsletter</label>
                            <input
                                id="newsletter-email"
                                type="email"
                                placeholder="your@email.com"
                                className="w-full bg-white/5 border border-white/10 rounded px-4 py-2 text-white placeholder-gray-600 text-sm font-mono transition-all outline-none focus:border-[#B59E7D] focus:ring-1 focus:ring-[#B59E7D]"
                            />
                            <button
                                type="submit"
                                aria-label="Subscribe to newsletter"
                                className="w-full font-bold py-2 rounded transition-all uppercase tracking-widest text-xs text-white focus:outline-none focus:ring-2 focus:ring-[#B59E7D] focus:ring-offset-2 focus:ring-offset-[#333333]"
                                style={{ background: '#584738' }}
                                onMouseEnter={e => e.currentTarget.style.background = '#4a3a2c'}
                                onMouseLeave={e => e.currentTarget.style.background = '#584738'}
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-600 text-xs font-mono">
                        © 2026 AURA-LINK SYSTEMS. ALL RIGHTS RESERVED.
                    </p>
                    <div className="flex space-x-6 text-xs text-gray-600">
                        <a href="#" className="hover:text-white transition-colors focus:outline-none focus:ring-1 focus:ring-white rounded px-1">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors focus:outline-none focus:ring-1 focus:ring-white rounded px-1">Terms of Use</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
