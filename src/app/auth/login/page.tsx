"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import LoadingLink from "@/components/ui/LoadingLink";
import { useAuth } from "@/contexts/AuthProvider";
import SeamlessLoopVideo from "@/components/ui/SeamlessLoopVideo";
import { validateEmail, validatePassword } from "@/lib/auth-validation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const { login, isAuthLoading } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        if (!validatePassword(password)) {
            setError("Password must be at least 8 characters.");
            return;
        }

        try {
            await login(email, password);
            router.push("/");
        } catch (authError) {
            setError(authError instanceof Error ? authError.message : "Invalid email or password. Please try again.");
        }
    };

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-brand-dark text-white">
                <div className="grid min-h-screen lg:grid-cols-2">
                    <section className="hidden relative items-end overflow-hidden bg-brand-dark px-6 py-10 sm:px-10 lg:px-14 lg:py-12 lg:flex">
                        <SeamlessLoopVideo src="/video/login.mp4" />
                        <div className="absolute inset-0 bg-linear-to-br from-brand-dark/48 via-brand-dark/36 to-brand-dark/8" />
                        <div className="absolute inset-0 office-grid opacity-[0.05]" />

                        <div className="relative z-10 max-w-xl">
                            <div className="mb-8 flex items-center gap-3 text-white/80">
                                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/12 bg-white/8">
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm uppercase tracking-[0.3em] text-white/44">SatSet</p>
                                    <p className="text-sm text-white/64">Office utility, refined</p>
                                </div>
                            </div>

                            <p className="text-xs uppercase tracking-[0.35em] text-white/42">Login</p>
                            <h1 className="mt-4 max-w-md font-serif text-5xl font-bold tracking-tight text-white sm:text-6xl">
                                Welcome back.
                            </h1>
                            <p className="mt-5 max-w-md text-sm leading-7 text-white/66 sm:text-base">
                                Sign in to continue with the SatSet showcase.
                            </p>

                            <div className="mt-10 flex flex-wrap gap-3 text-xs uppercase tracking-[0.24em] text-white/42">
                                <span className="rounded-full border border-white/10 bg-white/6 px-4 py-2">Minimal</span>
                                <span className="rounded-full border border-white/10 bg-white/6 px-4 py-2">Focused</span>
                                <span className="rounded-full border border-white/10 bg-white/6 px-4 py-2">Full screen</span>
                            </div>
                        </div>
                    </section>

                    <section className="flex items-center bg-brand-cream px-6 py-8 text-brand-dark sm:px-8 sm:py-10 lg:px-14 lg:py-12">
                        <div className="mx-auto w-full max-w-sm sm:max-w-md">
                            <div className="mb-10 flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-xs uppercase tracking-[0.35em] text-brand-mountain">SatSet</p>
                                    <p className="mt-2 text-sm text-brand-mountain">Use your account to enter</p>
                                </div>
                                <LoadingLink
                                    href="/auth/signup"
                                    className="rounded-full border border-brand-cream bg-white px-4 py-2 text-sm font-medium text-brand-dark transition-colors hover:bg-brand-cream"
                                >
                                    Sign up
                                </LoadingLink>
                            </div>

                            <h2 className="font-serif text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl lg:text-5xl">
                                Sign in
                            </h2>
                            <p className="mt-2 max-w-sm text-xs leading-6 text-brand-mountain sm:text-sm sm:mt-3 sm:leading-7">
                                Clean access for a clean product experience.
                            </p>

                            {error && (
                                <p role="alert" className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                    {error}
                                </p>
                            )}

                            <form onSubmit={handleSubmit} className="mt-6 space-y-4 sm:mt-8 sm:space-y-5">
                                <div>
                                    <label htmlFor="login-email" className="mb-2 block text-xs font-medium uppercase tracking-[0.28em] text-brand-mountain">
                                        Email
                                    </label>
                                    <input
                                        id="login-email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full rounded-2xl border border-brand-cream bg-white px-4 py-3 text-brand-dark outline-none transition-colors placeholder:text-brand-mountain focus:border-brand-mountain focus:ring-4 focus:ring-[#AAA39620]"
                                        placeholder="you@example.com"
                                        required
                                        autoComplete="email"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="login-password" className="mb-2 block text-xs font-medium uppercase tracking-[0.28em] text-brand-mountain">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="login-password"
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full rounded-2xl border border-brand-cream bg-white px-4 py-3 pr-12 text-brand-dark outline-none transition-colors placeholder:text-brand-mountain focus:border-brand-mountain focus:ring-4 focus:ring-[#AAA39620]"
                                            placeholder="Your password"
                                            required
                                            autoComplete="current-password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword((previous) => !previous)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-brand-mountain transition-colors hover:text-brand-dark"
                                            aria-label={showPassword ? "Hide password" : "Show password"}
                                        >
                                            <span className="material-symbols-outlined text-[20px]">
                                                {showPassword ? "visibility_off" : "visibility"}
                                            </span>
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between gap-4 text-sm text-brand-mountain">
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            defaultChecked
                                            className="h-4 w-4 rounded border-brand-cream text-brand-dark focus:ring-[#AAA39620]"
                                        />
                                        Remember me
                                    </label>
                                    <a href="#" className="transition-colors hover:text-brand-dark">
                                        Forgot password?
                                    </a>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isAuthLoading}
                                    className="flex w-full items-center justify-center rounded-full bg-brand-dark px-6 py-3 text-xs font-semibold text-white transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60 sm:py-4 sm:text-sm"
                                >
                                    {isAuthLoading ? "Signing in…" : "Sign in"}
                                </button>

                                <p className="pt-2 text-xs text-brand-mountain sm:text-sm">
                                    Don&apos;t have an account?{" "}
                                    <LoadingLink href="/auth/signup" className="font-medium text-brand-dark underline underline-offset-4">
                                        Create one
                                    </LoadingLink>
                                </p>
                            </form>
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
}
