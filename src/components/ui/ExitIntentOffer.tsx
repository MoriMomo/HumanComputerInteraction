"use client";

import { useEffect, useMemo, useState } from "react";
import { trackEvent } from "@/lib/analytics";

const STORAGE_KEY = "satset-exit-intent-seen";

export default function ExitIntentOffer() {
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const isDesktop = useMemo(() => {
        if (typeof window === "undefined") return false;
        return window.matchMedia("(min-width: 1024px)").matches;
    }, []);

    useEffect(() => {
        if (!isDesktop) return;
        if (window.sessionStorage.getItem(STORAGE_KEY) === "1") return;

        const onMouseLeave = (event: MouseEvent) => {
            if (event.clientY > 10) return;
            setOpen(true);
            window.sessionStorage.setItem(STORAGE_KEY, "1");
        };

        document.addEventListener("mouseout", onMouseLeave);
        return () => document.removeEventListener("mouseout", onMouseLeave);
    }, [isDesktop]);

    if (!open) return null;

    const close = () => setOpen(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!email.trim()) return;
        trackEvent("email_capture_submit", { source: "exit_intent" });
        setSubmitted(true);
    };

    return (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 p-4">
            <div className="w-full max-w-lg rounded-4xl border border-white/12 bg-[#584738] p-7 text-white shadow-[0_24px_120px_rgba(0,0,0,0.65)]">
                <button
                    type="button"
                    onClick={close}
                    aria-label="Close offer"
                    className="ml-auto flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 transition-colors hover:bg-white/10"
                >
                    <span className="material-symbols-outlined text-base">close</span>
                </button>

                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.28em] text-primary">Before you go</p>
                <h3 className="mt-3 font-serif text-3xl font-bold tracking-tight">Get 10% off your first order.</h3>
                <p className="mt-3 text-sm leading-7 text-white/62">
                    Join the SatSet list for launch drops, workshop notes, and a one-time first-purchase code.
                </p>

                {submitted ? (
                    <div className="mt-6 rounded-2xl border border-white/14 bg-white/6 p-4 text-sm text-white/84">
                        Thanks. Your welcome code is on the way.
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder="you@example.com"
                            className="w-full rounded-full border border-white/14 bg-white/6 px-5 py-3 text-sm text-white placeholder:text-white/35 focus:border-white/30 focus:outline-none"
                        />
                        <button
                            type="submit"
                            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#584738] transition-colors hover:bg-white/90"
                        >
                            Get code
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
