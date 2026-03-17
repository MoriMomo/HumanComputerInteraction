"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import { useAuth } from "@/contexts/AuthProvider";

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
            <div className="min-h-screen bg-[#0a0f16] text-white flex items-center justify-center px-6 py-32">
                <div className="w-full max-w-md">
                    {/* Brand mark */}
                    <div className="flex items-center gap-3 mb-12">
                        <div className="w-9 h-9 rounded-xl bg-linear-to-br from-white/20 to-white/5 border border-white/15 flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                            </svg>
                        </div>
                        <span className="text-xl font-semibold tracking-tight">SatSet</span>
                    </div>

                    <h1 className="font-serif text-4xl font-bold mb-2">Welcome back</h1>
                    <p className="text-white/50 mb-10">Sign in to your SatSet account</p>

                    {error && (
                        <p role="alert" className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3 mb-4">
                            {error}
                        </p>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label htmlFor="login-email" className="block text-xs uppercase tracking-widest text-white/50 mb-2">
                                Email
                            </label>
                            <input
                                id="login-email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/12 text-white placeholder-white/28 focus:border-white/30 focus:outline-none transition-colors"
                                placeholder="you@example.com"
                                required
                                autoComplete="email"
                            />
                        </div>
                        <div>
                            <label htmlFor="login-password" className="block text-xs uppercase tracking-widest text-white/50 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="login-password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/12 text-white placeholder-white/28 focus:border-white/30 focus:outline-none transition-colors pr-12"
                                    placeholder="••••••••"
                                    required
                                    autoComplete="current-password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((p) => !p)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    <span className="material-symbols-outlined text-base">
                                        {showPassword ? "visibility_off" : "visibility"}
                                    </span>
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isAuthLoading}
                            className="w-full px-8 py-4 rounded-full bg-white text-[#0a0f16] font-semibold hover:bg-white/90 transition-all duration-300 disabled:opacity-60 mt-2"
                        >
                            {isAuthLoading ? "Signing in…" : "Sign In"}
                        </button>
                    </form>

                    <p className="text-center text-white/40 text-sm mt-8">
                        Don&apos;t have an account?{" "}
                        <Link href="/auth/signup" className="text-white/75 hover:text-white transition-colors underline underline-offset-4">
                            Create one
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}
