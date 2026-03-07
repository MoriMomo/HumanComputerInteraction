function HeroSection() {
    return (
        <section className="relative min-h-screen flex flex-col justify-center bg-background-light overflow-hidden pt-20">
            <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-10 lg:px-20 w-full">
                {/* Main content grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[600px]">
                    {/* LEFT CONTENT */}
                    <div className="flex flex-col justify-center gap-8 pl-4 lg:pl-8">
                        {/* Main Heading */}
                        <h1 className="font-serif text-charcoal text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.15] tracking-tight">
                            Elevate Your <br />
                            <span className="text-primary italic">Everyday</span>.<br />
                            Refine Your <span className="text-secondary">Carry</span>.
                        </h1>

                        {/* Subtitle */}
                        <p className="text-gray-600 text-base md:text-lg font-sans max-w-xl leading-relaxed">
                            Discover the intersection of minimalist design and premium functionality. The ModuSnap card holder system—crafted for the modern professional workspace.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap gap-4 mt-4">
                            <button className="flex items-center justify-center rounded-full h-12 px-8 bg-primary text-white text-sm font-medium transition-all duration-300 hover:bg-secondary shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-primary/50">
                                <span className="truncate">Pre-order Now</span>
                            </button>
                            <button className="flex items-center justify-center rounded-full h-12 px-8 bg-transparent border border-gray-300 text-charcoal text-sm font-medium transition-all duration-300 hover:border-primary hover:text-primary focus:outline-none focus:ring-4 focus:ring-primary/50">
                                <span className="truncate">View Collection</span>
                            </button>
                        </div>

                        {/* Specs Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 py-6 border-t border-soft-grey">
                            <div className="flex flex-col items-start gap-3">
                                <div className="w-10 h-10 rounded-full bg-soft-grey flex items-center justify-center text-secondary">
                                    <span className="material-symbols-outlined text-lg">shield_person</span>
                                </div>
                                <span className="text-xs text-charcoal font-semibold tracking-wide">RFID Protection</span>
                            </div>
                            <div className="flex flex-col items-start gap-3">
                                <div className="w-10 h-10 rounded-full bg-soft-grey flex items-center justify-center text-secondary">
                                    <span className="material-symbols-outlined text-lg">scale</span>
                                </div>
                                <span className="text-xs text-charcoal font-semibold tracking-wide">Ultralight 18g</span>
                            </div>
                            <div className="flex flex-col items-start gap-3">
                                <div className="w-10 h-10 rounded-full bg-soft-grey flex items-center justify-center text-secondary">
                                    <span className="material-symbols-outlined text-lg">widgets</span>
                                </div>
                                <span className="text-xs text-charcoal font-semibold tracking-wide">Modular System</span>
                            </div>
                            <div className="flex flex-col items-start gap-3">
                                <div className="w-10 h-10 rounded-full bg-soft-grey flex items-center justify-center text-secondary">
                                    <span className="material-symbols-outlined text-lg">check_circle</span>
                                </div>
                                <span className="text-xs text-charcoal font-semibold tracking-wide">Premium Finish</span>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SHOWCASE */}
                    <div className="relative flex justify-center items-center h-[500px] lg:h-[700px] w-full mt-10 lg:mt-0 px-4">
                        <div className="relative w-full max-w-[500px] aspect-[3/4] overflow-hidden rounded-2xl shadow-premium-lg bg-white group">
                            <img
                                alt="Premium ModuSnap Card Holder on executive desk"
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVLnBBctRTny20xXQFATtDoFDFgs2dRPk8EkAknFojIdfEQrr3voE0MCNKyia787tCxWjdyLSjpqe-0g4rAvi6thIW6vQxRlJ1PuGmi3n58oPsYVBxGkQhEjbAydsFgOQ2C2k-CO4q0QW5zxCFCnCf1Bnw5R8bheoCNTXukUEVwizDdaXFAZCYIEMRWLCw7yB_WtvMECcTB-cyx0Ay61KkIHVpk8c3mwhKH9Zjz2ABtOkPt8HpSWAi8FxkhEB1ghiPV37VVSLjjBg"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection
