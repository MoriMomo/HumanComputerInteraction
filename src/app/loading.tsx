export default function Loading() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-[#231711] text-white">
            <div className="absolute inset-0 bg-linear-to-br from-[#231711] via-[#231711] to-[#231711]" />
            <div className="absolute top-0 left-0 right-0 h-1 overflow-hidden bg-white/5">
                <div className="h-full w-1/3 origin-left bg-linear-to-r from-white/20 via-white/60 to-white/20" />
            </div>

            <div className="relative z-10 px-6 text-center">
                <h1 className="text-5xl font-bold tracking-tight md:text-7xl">SatSet</h1>
                <p className="mt-3 text-xs uppercase tracking-[0.35em] text-white/40">
                    Loading experience
                </p>
            </div>
        </div>
    );
}