"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import { useAuth } from "@/contexts/AuthProvider";
import SeamlessLoopVideo from "@/components/ui/SeamlessLoopVideo";

export default function SignupPage() {
    const [name, setName] = useState("");
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
            await login(email, name);
            router.push("/");
        } catch {
            setError("Something went wrong. Please try again.");
        }
    };

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-[#0a0f16] text-white">
                <div className="grid min-h-screen lg:grid-cols-2">
                    <section className="flex items-center bg-[#f4f6f8] px-6 py-10 text-[#0f1720] sm:px-10 lg:px-14 lg:py-12">
                        <div className="mx-auto w-full max-w-md">
                            <div className="mb-10 flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-xs uppercase tracking-[0.35em] text-[#7a8591]">SatSet</p>
                                    <p className="mt-2 text-sm text-[#55606d]">Create your account</p>
                                </div>
                                <Link
                                    href="/auth/login"
                                    className="rounded-full border border-[#d6dce2] bg-white px-4 py-2 text-sm font-medium text-[#24303d] transition-colors hover:bg-[#eef2f4]"
                                >
                                    Sign in
                                </Link>
                            </div>

                            <h1 className="font-serif text-4xl font-bold tracking-tight text-[#0f1720] sm:text-5xl">
                                Create account
                            </h1>
                            <p className="mt-3 max-w-sm text-sm leading-7 text-[#5b6672]">
                                Minimal access for a minimal interface.
                            </p>

                            {error && (
                                <p role="alert" className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                    {error}
                                </p>
                            )}

                            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                                <div>
                                    <label htmlFor="signup-name" className="mb-2 block text-xs font-medium uppercase tracking-[0.28em] text-[#7a8591]">
                                        Name
                                    </label>
                                    <input
                                        id="signup-name"
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full rounded-2xl border border-[#d7dde4] bg-white px-4 py-3 text-[#0f1720] outline-none transition-colors placeholder:text-[#9aa3ad] focus:border-[#b8c2cc] focus:ring-4 focus:ring-[#7b879520]"
                                        placeholder="Your name"
                                        required
                                        autoComplete="name"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="signup-email" className="mb-2 block text-xs font-medium uppercase tracking-[0.28em] text-[#7a8591]">
                                        Email
                                    </label>
                                    <input
                                        id="signup-email"
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
                                    <label htmlFor="signup-password" className="mb-2 block text-xs font-medium uppercase tracking-[0.28em] text-[#7a8591]">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="signup-password"
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full rounded-2xl border border-[#d7dde4] bg-white px-4 py-3 pr-12 text-[#0f1720] outline-none transition-colors placeholder:text-[#9aa3ad] focus:border-[#b8c2cc] focus:ring-4 focus:ring-[#7b879520]"
                                            placeholder="Min. 8 characters"
                                            required
                                            minLength={8}
                                            autoComplete="new-password"
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

                                <button
                                    type="submit"
                                    disabled={isAuthLoading}
                                    className="flex w-full items-center justify-center rounded-full bg-[#0f1720] px-6 py-4 text-sm font-semibold text-white transition-colors hover:bg-[#182131] disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {isAuthLoading ? "Creating account…" : "Create account"}
                                </button>

                                <p className="pt-2 text-sm text-[#66707d]">
                                    Already have an account?{" "}
                                    <Link href="/auth/login" className="font-medium text-[#0f1720] underline underline-offset-4">
                                        Sign in
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </section>

                    <section className="relative flex items-end overflow-hidden bg-[#0b1118] px-6 py-10 sm:px-10 lg:px-14 lg:py-12">
                        <SeamlessLoopVideo src="/video/signup.mp4" />
                        <div className="absolute inset-0 bg-linear-to-br from-[#0a0f16]/92 via-[#0a0f16]/64 to-[#0a0f16]/18" />
                        <div className="absolute inset-0 office-grid opacity-[0.05]" />

                        <div className="relative z-10 max-w-xl">
                            <p className="text-xs uppercase tracking-[0.35em] text-white/42">SatSet</p>
                            <h2 className="mt-4 max-w-md font-serif text-5xl font-bold tracking-tight text-white sm:text-6xl">
                                Simple, calm, and focused.
                            </h2>
                            <p className="mt-5 max-w-md text-sm leading-7 text-white/66 sm:text-base">
                                Everything stays centered on the product.
                            </p>
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
}
