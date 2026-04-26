"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import LoadingLink from "@/components/ui/LoadingLink";
import { useAuth } from "@/contexts/AuthProvider";
import SeamlessLoopVideo from "@/components/ui/SeamlessLoopVideo";
import { validateEmail, validateName, validatePassword } from "@/lib/auth-validation";

export default function SignupPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const { signup, isAuthLoading } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!validateName(name)) {
            setError("Name must be between 2 and 80 characters.");
            return;
        }

        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        if (!validatePassword(password)) {
            setError("Password must be at least 8 characters.");
            return;
        }

        try {
            await signup(name, email, password);
            router.push("/");
        } catch (authError) {
            setError(authError instanceof Error ? authError.message : "Something went wrong. Please try again.");
        }
    };

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-[#584738] text-white">
                <div className="grid min-h-screen lg:grid-cols-2">
                    <section className="flex items-center bg-[#F1EADA] px-6 py-10 text-[#584738] sm:px-10 lg:px-14 lg:py-12">
                        <div className="mx-auto w-full max-w-md">
                            <div className="mb-10 flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-xs uppercase tracking-[0.35em] text-[#AAA396]">SatSet</p>
                                    <p className="mt-2 text-sm text-[#AAA396]">Create your account</p>
                                </div>
                                <LoadingLink
                                    href="/auth/login"
                                    className="rounded-full border border-[#F1EADA] bg-white px-4 py-2 text-sm font-medium text-[#584738] transition-colors hover:bg-[#F1EADA]"
                                >
                                    Sign in
                                </LoadingLink>
                            </div>

                            <h1 className="font-serif text-4xl font-bold tracking-tight text-[#584738] sm:text-5xl">
                                Create account
                            </h1>
                            <p className="mt-3 max-w-sm text-sm leading-7 text-[#AAA396]">
                                Minimal access for a minimal interface.
                            </p>

                            {error && (
                                <p role="alert" className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                    {error}
                                </p>
                            )}

                            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                                <div>
                                    <label htmlFor="signup-name" className="mb-2 block text-xs font-medium uppercase tracking-[0.28em] text-[#AAA396]">
                                        Name
                                    </label>
                                    <input
                                        id="signup-name"
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full rounded-2xl border border-[#F1EADA] bg-white px-4 py-3 text-[#584738] outline-none transition-colors placeholder:text-[#AAA396] focus:border-[#AAA396] focus:ring-4 focus:ring-[#AAA39620]"
                                        placeholder="Your name"
                                        required
                                        autoComplete="name"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="signup-email" className="mb-2 block text-xs font-medium uppercase tracking-[0.28em] text-[#AAA396]">
                                        Email
                                    </label>
                                    <input
                                        id="signup-email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full rounded-2xl border border-[#F1EADA] bg-white px-4 py-3 text-[#584738] outline-none transition-colors placeholder:text-[#AAA396] focus:border-[#AAA396] focus:ring-4 focus:ring-[#AAA39620]"
                                        placeholder="you@example.com"
                                        required
                                        autoComplete="email"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="signup-password" className="mb-2 block text-xs font-medium uppercase tracking-[0.28em] text-[#AAA396]">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="signup-password"
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full rounded-2xl border border-[#F1EADA] bg-white px-4 py-3 pr-12 text-[#584738] outline-none transition-colors placeholder:text-[#AAA396] focus:border-[#AAA396] focus:ring-4 focus:ring-[#AAA39620]"
                                            placeholder="Min. 8 characters"
                                            required
                                            minLength={8}
                                            autoComplete="new-password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword((previous) => !previous)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-[#AAA396] transition-colors hover:text-[#584738]"
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
                                    className="flex w-full items-center justify-center rounded-full bg-[#584738] px-6 py-4 text-sm font-semibold text-white transition-colors hover:bg-[#584738] disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {isAuthLoading ? "Creating account…" : "Create account"}
                                </button>

                                <p className="pt-2 text-sm text-[#AAA396]">
                                    Already have an account?{" "}
                                    <LoadingLink href="/auth/login" className="font-medium text-[#584738] underline underline-offset-4">
                                        Sign in
                                    </LoadingLink>
                                </p>
                            </form>
                        </div>
                    </section>

                    <section className="relative flex items-end overflow-hidden bg-[#584738] px-6 py-10 sm:px-10 lg:px-14 lg:py-12">
                        <SeamlessLoopVideo src="/video/signup.mp4" />
                        <div className="absolute inset-0 bg-linear-to-br from-[#584738]/92 via-[#584738]/64 to-[#584738]/18" />
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
