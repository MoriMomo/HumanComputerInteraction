"use client";

import { useEffect, useState } from "react";
import { trackEvent } from "@/lib/analytics";

const SESSION_KEY = "satset-exit-intent-shown-session";
const COOLDOWN_KEY = "satset-exit-intent-cooldown-expiry";
const COOLDOWN_DAYS = 7;
const COOLDOWN_MS = COOLDOWN_DAYS * 24 * 60 * 60 * 1000;
const OPT_OUT_KEY = "satset-exit-intent-optout";

function safeGetItem(key: string) {
    try {
        if (typeof window === "undefined") return null;
        return window.localStorage.getItem(key);
    } catch {
        return null;
    }
}

function setCooldown() {
    try {
        if (typeof window === "undefined") return;
        window.sessionStorage.setItem(SESSION_KEY, "1");
        window.localStorage.setItem(COOLDOWN_KEY, String(Date.now() + COOLDOWN_MS));
    } catch {
        // ignore
    }
}

function isOptOut(): boolean {
    try {
        if (typeof window === "undefined") return false;
        return window.localStorage.getItem(OPT_OUT_KEY) === "1";
    } catch {
        return false;
    }
}

function setOptOut() {
    try {
        if (typeof window === "undefined") return;
        window.localStorage.setItem(OPT_OUT_KEY, "1");
        window.sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
        // ignore
    }
}

function removeOptOut() {
    try {
        if (typeof window === "undefined") return;
        window.localStorage.removeItem(OPT_OUT_KEY);
    } catch {
        // ignore
    }
}

function isSessionShown(): boolean {
    try {
        if (typeof window === "undefined") return false;
        return window.sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
        return false;
    }
}

function isCooldownActive(): boolean {
    try {
        const v = safeGetItem(COOLDOWN_KEY);
        if (!v) return false;
        return Date.now() < parseInt(v, 10);
    } catch {
        return false;
    }
}

export default function ExitIntentOffer() {
    const [open, setOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [dontShowAgain, setDontShowAgain] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const media = window.matchMedia("(min-width: 1024px)");
        const listener = () => {
            setIsDesktop(media.matches);
        };

        // Initialize state asynchronously to avoid synchronous setState warning inside useEffect
        const timer = setTimeout(listener, 0);

        media.addEventListener("change", listener);
        return () => {
            clearTimeout(timer);
            media.removeEventListener("change", listener);
        };
    }, []);

    useEffect(() => {
        if (!isDesktop) return;
        if (isOptOut()) return;
        if (isSessionShown() || isCooldownActive()) return;

        const onMouseLeave = (event: MouseEvent) => {
            if (event.clientY > 10) return;
            
            // Open modal
            setOpen(true);
            setCooldown();
            
            // Trigger animation in next tick
            const timer = setTimeout(() => setIsAnimating(true), 50);
            return () => clearTimeout(timer);
        };

        document.addEventListener("mouseout", onMouseLeave);
        return () => document.removeEventListener("mouseout", onMouseLeave);
    }, [isDesktop]);

    if (!open) return null;

    const triggerClose = () => {
        setIsAnimating(false);
        setTimeout(() => {
            setOpen(false);
        }, 300); // Matches duration-300 transition
    };

    const close = () => {
        if (dontShowAgain) {
            setOptOut();
        } else {
            setCooldown();
        }
        triggerClose();
    };

    const handleDontShowAgainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;
        setDontShowAgain(checked);
        if (checked) {
            setOptOut();
        } else {
            removeOptOut();
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!email.trim()) return;
        
        trackEvent("email_capture_submit", { source: "exit_intent" });
        setSubmitted(true);
        
        // Opt out permanently since they successfully subscribed
        setOptOut();
        
        // Auto close after showing thank you message
        setTimeout(() => {
            triggerClose();
        }, 2500);
    };

    return (
        <div 
            onClick={close}
            className={`fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md transition-opacity duration-300 ${
                isAnimating ? "opacity-100" : "opacity-0"
            }`}
        >
            <div 
                onClick={(e) => e.stopPropagation()}
                className={`relative w-full max-w-md rounded-3xl border border-white/12 bg-gradient-to-b from-brand-darker to-brand-dark p-8 md:p-10 text-white shadow-[0_24px_120px_rgba(0,0,0,0.65)] transition-all duration-300 transform ${
                    isAnimating ? "opacity-100 scale-100" : "opacity-0 scale-95"
                }`}
            >
                <button
                    type="button"
                    onClick={close}
                    aria-label="Close offer"
                    style={{ position: "absolute", top: "1.5rem", right: "1.5rem" }}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition-all duration-300 hover:bg-white/10 hover:text-white hover:rotate-90 cursor-pointer"
                >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-primary">Before you go</p>
                <h3 className="mt-4 font-serif text-3xl font-bold tracking-tight leading-tight text-brand-cream">
                    Get 10% off your first order.
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">
                    Join the SatSet list for launch drops, workshop notes, and a one-time first-purchase code.
                </p>

                {submitted ? (
                    <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-brand-primary text-center font-medium animate-pulse">
                        Thanks. Your welcome code is on the way.
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                        <div className="flex flex-col gap-2.5 sm:flex-row">
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                placeholder="you@example.com"
                                className="flex-1 rounded-full border border-white/12 bg-white/5 px-5 py-3.5 text-sm text-white placeholder:text-white/30 focus:border-brand-primary focus:bg-white/10 focus:ring-2 focus:ring-brand-primary/20 focus:outline-none transition-all duration-200"
                            />
                            <button
                                type="submit"
                                className="rounded-full bg-brand-cream px-7 py-3.5 text-sm font-semibold text-brand-dark transition-all duration-200 hover:bg-white hover:shadow-glow hover:-translate-y-0.5 active:translate-y-0 active:scale-98 whitespace-nowrap cursor-pointer"
                            >
                                Get code
                            </button>
                        </div>
                        
                        <div className="flex items-center px-1 pt-1">
                            <label className="flex items-center gap-2.5 cursor-pointer group">
                                <div className="relative flex items-center justify-center w-5 h-5 rounded-md border border-white/20 bg-white/5 transition-all duration-200 group-hover:border-white/40 group-hover:bg-white/10">
                                    <input
                                        id="dont-show-again"
                                        type="checkbox"
                                        checked={dontShowAgain}
                                        onChange={handleDontShowAgainChange}
                                        className="sr-only"
                                    />
                                    {dontShowAgain && (
                                        <svg className="w-3 h-3 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                </div>
                                <span className="text-xs text-white/50 select-none group-hover:text-white/80 transition-colors">
                                    Do not show again
                                </span>
                            </label>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}

