import { FaTwitter, FaInstagram, FaGithub, FaDiscord } from 'react-icons/fa'

function Footer() {
    return (
        <footer className="relative bg-black border-t border-white/10 pt-20 pb-10 overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-electric-cyan/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-mint/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
                    {/* Brand Column */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center space-x-2 mb-6">
                            <div className="w-8 h-8 bg-gradient-to-br from-electric-cyan to-neon-mint rounded-lg flex items-center justify-center">
                                <span className="text-deep-black font-bold text-lg">A</span>
                            </div>
                            <span className="text-white font-bold text-xl tracking-wider">
                                AURA-LINK <span className="text-electric-cyan">MODUSNAP</span>
                            </span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-sm mb-8">
                            Redefining personal tech through modular precision and cyberpunk aesthetics.
                            Join the evolution of functional style.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-electric-cyan hover:border-electric-cyan transition-all group">
                                <FaTwitter className="group-hover:drop-shadow-[0_0_8px_rgba(0,250,255,0.8)]" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-neon-mint hover:border-neon-mint transition-all group">
                                <FaInstagram className="group-hover:drop-shadow-[0_0_8px_rgba(57,255,20,0.8)]" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-all group">
                                <FaGithub className="group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#5865F2] hover:border-[#5865F2] transition-all group">
                                <FaDiscord className="group-hover:drop-shadow-[0_0_8px_rgba(88,101,242,0.8)]" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-bold mb-6 tracking-widest text-sm">EXPLORE</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li><a href="#showcase" className="hover:text-electric-cyan transition-colors">3D Showcase</a></li>
                            <li><a href="#features" className="hover:text-electric-cyan transition-colors">Modular Features</a></li>
                            <li><a href="#customizer" className="hover:text-electric-cyan transition-colors">Customizer</a></li>
                            <li><a href="#philosophy" className="hover:text-electric-cyan transition-colors">Design Philosophy</a></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-white font-bold mb-6 tracking-widest text-sm">STAY CONNECTED</h4>
                        <p className="text-gray-500 text-xs mb-4">Subscribe for experimental drops and updates.</p>
                        <form className="space-y-3">
                            <input
                                type="email"
                                placeholder="ENTER_EMAIL"
                                className="w-full bg-white/5 border border-white/10 rounded px-4 py-2 text-white placeholder-gray-600 focus:outline-none focus:border-electric-cyan focus:ring-1 focus:ring-electric-cyan transition-all text-sm font-mono"
                            />
                            <button className="w-full bg-white text-black font-bold py-2 rounded hover:bg-electric-cyan hover:shadow-[0_0_15px_rgba(0,250,255,0.5)] transition-all uppercase tracking-widest text-xs">
                                Initialize
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-600 text-xs font-mono">
                        © 2026 AURA-LINK SYSTEMS. ALL RIGHTS RESERVED.
                    </p>
                    <div className="flex space-x-6 mt-4 md:mt-0 text-xs text-gray-600">
                        <a href="#" className="hover:text-white transition-colors">PRIVACY_PROTOCOL</a>
                        <a href="#" className="hover:text-white transition-colors">TERMS_OF_USE</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
