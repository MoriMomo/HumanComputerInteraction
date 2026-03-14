"use client";

export default function Footer() {
    const navLinks = [
        { group: "Product", links: ["Showcase", "Features", "Specs", "Shop"] },
        { group: "Company", links: ["About", "Press Kit", "Careers", "Contact"] },
        { group: "Support", links: ["FAQ", "Shipping", "Returns", "Warranty"] },
    ];

    return (
        <footer className="bg-charcoal text-white pt-20 pb-10">
            <div className="max-w-350 mx-auto px-4 md:px-10 lg:px-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-white/10">
                    {/* Brand */}
                    <div className="lg:col-span-2 flex flex-col gap-5">
                        <div className="flex items-center gap-3">
                            <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 48 48">
                                <path d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z" fill="currentColor" />
                            </svg>
                            <span className="font-serif text-xl font-semibold text-white">SatSet</span>
                        </div>
                        <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
                            Precision-crafted carry essentials for the modern professional. Every detail, considered.
                        </p>
                        {/* Social icons */}
                        <div className="flex gap-4 mt-2">
                            {["twitter", "instagram", "linkedin"].map((platform) => (
                                <a
                                    key={platform}
                                    href="#"
                                    aria-label={platform}
                                    className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-gray-400 hover:border-primary hover:text-primary transition-colors"
                                >
                                    <span className="material-symbols-outlined text-base">
                                        {platform === "twitter" ? "alternate_email" : platform === "instagram" ? "photo_camera" : "business"}
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Nav groups */}
                    {navLinks.map(({ group, links }) => (
                        <div key={group} className="flex flex-col gap-4">
                            <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">
                                {group}
                            </p>
                            <ul className="flex flex-col gap-3">
                                {links.map((link) => (
                                    <li key={link}>
                                        <a
                                            href="#"
                                            className="text-sm text-gray-400 hover:text-white transition-colors"
                                        >
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom strip */}
                <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
                    <p>&copy; {new Date().getFullYear()} SatSet. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-gray-300 transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-gray-300 transition-colors">Cookie Settings</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
