"use client";

import { useCurrency } from "@/contexts/CurrencyProvider";

export default function CurrencyToggle() {
    const { currency, setCurrency } = useCurrency();

    return (
        <div className="inline-flex items-center gap-2">
            <button
                onClick={() => setCurrency("IDR")}
                className={`px-3 py-1 rounded-md text-sm font-medium ${currency === "IDR" ? "bg-white text-[#231711]" : "text-white/70 border border-white/8"}`}
            >
                IDR
            </button>
            <button
                onClick={() => setCurrency("USD")}
                className={`px-3 py-1 rounded-md text-sm font-medium ${currency === "USD" ? "bg-white text-[#231711]" : "text-white/70 border border-white/8"}`}
            >
                USD
            </button>
        </div>
    );
}
