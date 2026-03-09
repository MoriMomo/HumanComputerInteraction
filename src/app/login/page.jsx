"use client";
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { FaUser, FaLock, FaGoogle, FaGithub, FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
    const containerRef = useRef(null);
    const formRef = useRef(null);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(containerRef.current, {
                opacity: 0,
                y: 30,
                duration: 1,
                ease: 'power3.out',
            });

            gsap.from('.stagger-item', {
                opacity: 0,
                y: 20,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power3.out',
                delay: 0.2, // Wait for container to start
            });
        }, containerRef); // Scope to container

        return () => ctx.revert();
    }, []);

    return (
        <div className="min-h-screen bg-background-light py-20 px-4 sm:px-6 lg:px-8 mt-16 relative overflow-hidden flex items-center justify-center">
            {/* Ambient Background Glows */}
            <div className="absolute top-[10%] left-[20%] w-[300px] h-[300px] bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div ref={containerRef} className="max-w-md w-full z-10">
                <div className="glass shadow-premium-lg rounded-2xl p-8 sm:p-10 border border-white/20">
                    <div className="text-center mb-10 stagger-item">
                        <Link href="/" className="inline-block mb-4">
                            <h2 className="text-3xl font-serif font-bold text-charcoal">
                                Aura<span className="text-primary italic">Link</span>
                            </h2>
                        </Link>
                        <h3 className="text-xl text-charcoal/80">Welcome back</h3>
                        <p className="text-sm text-charcoal/60 mt-2">Securely access your modular ecosystem.</p>
                    </div>

                    <form ref={formRef} className="space-y-6">
                        <div className="stagger-item relative">
                            <label className="block text-sm font-medium text-charcoal/80 mb-1" htmlFor="email">
                                Email Address
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/40">
                                    <FaUser size={16} />
                                </span>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    className="w-full pl-11 pr-4 py-3 bg-white/50 border border-soft-grey/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-charcoal placeholder:text-charcoal/30 glass"
                                    placeholder="your@email.com"
                                />
                            </div>
                        </div>

                        <div className="stagger-item relative">
                            <div className="flex justify-between items-center mb-1">
                                <label className="block text-sm font-medium text-charcoal/80" htmlFor="password">
                                    Password
                                </label>
                                <a href="#" className="text-xs text-primary hover:text-secondary transition-colors">
                                    Forgot password?
                                </a>
                            </div>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/40 pointer-events-none">
                                    <FaLock size={16} />
                                </span>
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    className="w-full pl-11 pr-11 py-3 bg-white/50 border border-soft-grey/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-charcoal placeholder:text-charcoal/30 glass"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-charcoal/40 hover:text-primary transition-colors focus:outline-none"
                                >
                                    {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                                </button>
                            </div>
                        </div>

                        <div className="stagger-item flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-primary bg-white/50 border-soft-grey rounded focus:ring-primary focus:ring-offset-0 cursor-pointer"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-charcoal/70 cursor-pointer">
                                Remember me for 30 days
                            </label>
                        </div>

                        <div className="stagger-item pt-2">
                            <button
                                type="submit"
                                className="relative w-full flex justify-center py-3.5 px-4 border border-transparent rounded-lg shadow-premium font-bold text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300 transform hover:-translate-y-0.5"
                            >
                                Access Your Ecosystem
                            </button>
                        </div>
                    </form>

                    <div className="mt-8 stagger-item">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-soft-grey/50" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-transparent text-charcoal/50">Or continue with</span>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-3">
                            <div>
                                <a href="#" className="w-full inline-flex justify-center py-2.5 px-4 border border-soft-grey/50 rounded-lg hover:bg-white/40 transition-colors glass text-charcoal/70 hover:text-charcoal items-center gap-2">
                                    <FaGoogle size={16} />
                                    <span className="text-sm font-medium">Google</span>
                                </a>
                            </div>
                            <div>
                                <a href="#" className="w-full inline-flex justify-center py-2.5 px-4 border border-soft-grey/50 rounded-lg hover:bg-white/40 transition-colors glass text-charcoal/70 hover:text-charcoal items-center gap-2">
                                    <FaGithub size={16} />
                                    <span className="text-sm font-medium">GitHub</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 text-center stagger-item">
                        <p className="text-sm text-charcoal/60">
                            Don't have an account?{' '}
                            <Link href="/signup" className="font-medium text-primary hover:text-secondary transition-colors">
                                Sign up now
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
