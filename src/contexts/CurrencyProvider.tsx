"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type Currency = "IDR" | "USD";

interface CurrencyContextValue {
    currency: Currency;
    setCurrency: (c: Currency) => void;
    rate: number; // USD -> IDR
    setRate: (r: number) => void;
    format: (amount: number) => string;
}

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
    const [currency, setCurrency] = useState<Currency>(() => {
        try {
            const stored = localStorage.getItem("satset_currency");
            return (stored as Currency) || "IDR";
        } catch (e) {
            return "IDR";
        }
    });

    const [rate, setRate] = useState<number>(() => {
        // default fallback rate USD -> IDR
        return 15000;
    });

    useEffect(() => {
        try {
            localStorage.setItem("satset_currency", currency);
        } catch (e) {
            // noop
        }
    }, [currency]);

    const format = useMemo(() => {
        return (amount: number) => {
            if (currency === "IDR") {
                const val = Math.round(amount * rate);
                return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(val);
            }

            return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(amount);
        };
    }, [currency, rate]);

    return (
        <CurrencyContext.Provider value={{ currency, setCurrency, rate, setRate, format }}>
            {children}
        </CurrencyContext.Provider>
    );
}

export function useCurrency() {
    const ctx = useContext(CurrencyContext);
    if (!ctx) throw new Error("useCurrency must be used within CurrencyProvider");
    return ctx;
}
