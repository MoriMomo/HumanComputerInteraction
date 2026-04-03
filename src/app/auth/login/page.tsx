"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import { useAuth } from "@/contexts/AuthProvider";
import SeamlessLoopVideo from "@/components/ui/SeamlessLoopVideo";

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
        try {
            await login(email);
            router.push("/");
        } catch {
            setError("Invalid email or password. Please try again.");
        }
    };

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-[#0a0f16] text-white">
                <div className="grid min-h-screen lg:grid-cols-2">
                    <section className="relative flex items-end overflow-hidden bg-[#0b1118] px-6 py-10 sm:px-10 lg:px-14 lg:py-12">
                        <SeamlessLoopVideo src="/video/login.mp4" />
                        <div className="absolute inset-0 bg-linear-to-br from-[#0a0f16]/92 via-[#0a0f16]/64 to-[#0a0f16]/18" />
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

                    <section className="flex items-center bg-[#f4f6f8] px-6 py-10 text-[#0f1720] sm:px-10 lg:px-14 lg:py-12">
                        <div className="mx-auto w-full max-w-md">
                            <div className="mb-10 flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-xs uppercase tracking-[0.35em] text-[#7a8591]">SatSet</p>
                                    <p className="mt-2 text-sm text-[#55606d]">Use your account to enter</p>
                                </div>
                                <Link
                                    href="/auth/signup"
                                    className="rounded-full border border-[#d6dce2] bg-white px-4 py-2 text-sm font-medium text-[#24303d] transition-colors hover:bg-[#eef2f4]"
                                >
                                    Sign up
                                </Link>
                            </div>

                            <h2 className="font-serif text-4xl font-bold tracking-tight text-[#0f1720] sm:text-5xl">
                                Sign in
                            </h2>
                            <p className="mt-3 max-w-sm text-sm leading-7 text-[#5b6672]">
                                Clean access for a clean product experience.
                            </p>

                            {error && (
                                <p role="alert" className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                    {error}
                                </p>
                            )}

                            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                                <div>
                                    <label htmlFor="login-email" className="mb-2 block text-xs font-medium uppercase tracking-[0.28em] text-[#7a8591]">
                                        Email
                                    </label>
                                    <input
                                        id="login-email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full rounded-2xl border border-[#d7dde4] bg-white px-4 py-3 text-[#0f1720] outline-none transition-colors placeholder:text-[#9aa3ad] focus:border-[#b8c2cc] focus:ring-4 focus:ring-[#7b879520]"
                                        placeholder="you@example.com"
                                        required
                                        autoComplete="email"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="login-password" className="mb-2 block text-xs font-medium uppercase tracking-[0.28em] text-[#7a8591]">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="login-password"
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full rounded-2xl border border-[#d7dde4] bg-white px-4 py-3 pr-12 text-[#0f1720] outline-none transition-colors placeholder:text-[#9aa3ad] focus:border-[#b8c2cc] focus:ring-4 focus:ring-[#7b879520]"
                                            placeholder="Your password"
                                            required
                                            autoComplete="current-password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword((previous) => !previous)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-[#778390] transition-colors hover:text-[#0f1720]"
                                            aria-label={showPassword ? "Hide password" : "Show password"}
                                        >
                                            <span className="material-symbols-outlined text-[20px]">
                                                {showPassword ? "visibility_off" : "visibility"}
                                            </span>
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between gap-4 text-sm text-[#5b6672]">
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            defaultChecked
                                            className="h-4 w-4 rounded border-[#c7d0da] text-[#0f1720] focus:ring-[#7b879520]"
                                        />
                                        Remember me
                                    </label>
                                    <a href="#" className="transition-colors hover:text-[#0f1720]">
                                        Forgot password?
                                    </a>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isAuthLoading}
                                    className="flex w-full items-center justify-center rounded-full bg-[#0f1720] px-6 py-4 text-sm font-semibold text-white transition-colors hover:bg-[#182131] disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {isAuthLoading ? "Signing in…" : "Sign in"}
                                </button>

                                <p className="pt-2 text-sm text-[#66707d]">
                                    Don&apos;t have an account?{" "}
                                    <Link href="/auth/signup" className="font-medium text-[#0f1720] underline underline-offset-4">
                                        Create one
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
}
