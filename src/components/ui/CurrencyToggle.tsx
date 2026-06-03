"use client";

import { useCurrency } from "@/contexts/CurrencyProvider";

export default function CurrencyToggle() {
    const { currency, setCurrency } = useCurrency();

    return (
        <div className="inline-flex items-center bg-white/5 border border-white/10 rounded-full p-1 h-11">
            <button
                onClick={() => setCurrency("IDR")}
                className={`h-full px-4 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                    currency === "IDR"
                        ? "bg-white text-[#231711] shadow-[0_2px_8px_rgba(0,0,0,0.15)]"
                        : "text-white/60 hover:text-white/90"
                }`}
            >
                IDR
            </button>
            <button
                onClick={() => setCurrency("USD")}
                className={`h-full px-4 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                    currency === "USD"
                        ? "bg-white text-[#231711] shadow-[0_2px_8px_rgba(0,0,0,0.15)]"
                        : "text-white/60 hover:text-white/90"
                }`}
            >
                USD
            </button>
        </div>
    );
}
