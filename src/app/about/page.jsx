"use client";
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const About = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.about-header', {
                opacity: 0,
                y: 50,
                duration: 1.2,
                ease: 'power3.out',
            });

            gsap.from('.about-content', {
                opacity: 0,
                y: 30,
                duration: 1,
                stagger: 0.2,
                ease: 'power3.out',
                delay: 0.5,
            });

            gsap.from('.about-image', {
                opacity: 0,
                scale: 0.95,
                duration: 1.5,
                ease: 'power2.out',
                delay: 0.8,
            });

            gsap.from('.contact-header', {
                opacity: 0,
                y: 30,
                duration: 1,
                ease: 'power3.out',
                delay: 1,
            });

            gsap.from('.contact-card', {
                opacity: 0,
                y: 40,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power3.out',
                delay: 1.2,
            });

            gsap.from('.contact-form', {
                opacity: 0,
                x: 30,
                duration: 1,
                ease: 'power3.out',
                delay: 1.4,
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="min-h-screen bg-background-light pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden relative">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-primary/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-secondary/5 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-20 about-header">
                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-charcoal mb-6">
                        Our <span className="text-primary italic">Story</span>
                    </h1>
                    <p className="text-lg md:text-xl text-charcoal/70 max-w-2xl mx-auto font-light leading-relaxed">
                        Where minimalist elegance meets everyday utility. We believe in creating products that don't just exist, but elevate your daily experience.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="order-2 lg:order-1 space-y-8 about-content">
                        <div>
                            <h2 className="text-3xl font-serif font-bold text-charcoal mb-4">The Philosophy</h2>
                            <p className="text-charcoal/70 leading-relaxed">
                                Founded on the principles of essentialism, AuraLink seeks to remove the noise from modern consumerism. Every line drawn, every material chosen, and every feature implemented is done with intention. We don't build things to be consumed; we design companions for your lifestyle.
                            </p>
                        </div>
                        <div>
                            <h2 className="text-3xl font-serif font-bold text-charcoal mb-4">Craftsmanship</h2>
                            <p className="text-charcoal/70 leading-relaxed">
                                True luxury lies in the details unseen. Our commitment to craftsmanship ensures that the tactile experience of our products is just as profound as their visual appeal. We source sustainable materials, partner with ethical artisans, and subject every piece to rigorous quality standards.
                            </p>
                        </div>
                        <div className="pt-6">
                            <button className="px-8 py-3 bg-charcoal text-white rounded-full hover:bg-primary transition-colors duration-300 font-medium tracking-wide">
                                Explore Collection
                            </button>
                        </div>
                    </div>

                    <div className="order-1 lg:order-2 about-image relative">
                        <div className="aspect-[4/5] rounded-2xl overflow-hidden glass p-2 shadow-premium-lg">
                            {/* Placeholder for a beautiful, moody product or lifestyle shot */}
                            <div className="w-full h-full bg-gradient-to-br from-soft-grey to-background-light rounded-xl relative overflow-hidden group">
                                <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/0 transition-colors duration-700"></div>
                                <img
                                    src="https://images.unsplash.com/photo-1618220179428-22790b46a013?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                                    alt="Minimalist design philosophy"
                                    className="w-full h-full object-cover opacity-90 transition-transform duration-1000 group-hover:scale-105"
                                />
                            </div>
                        </div>

                        {/* Decorative floating element */}
                        <div className="absolute -bottom-10 -left-10 w-32 h-32 glass rounded-full shadow-premium flex items-center justify-center animate-bounce duration-3000" style={{ animationDuration: '4s' }}>
                            <div className="text-center">
                                <span className="block text-2xl font-serif font-bold text-primary">Est.</span>
                                <span className="block text-sm text-charcoal/60">2026</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- CONTACT SECTION --- */}
                <div className="mt-40 border-t border-charcoal/10 pt-20">
                    <div className="text-center mb-16 contact-header">
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-charcoal mb-4">
                            Get in <span className="text-primary italic">Touch</span>
                        </h2>
                        <p className="text-lg text-charcoal/60 max-w-2xl mx-auto">
                            Whether you have a question about our products, shipping, or just want to say hello, we're here to listen.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Contact Information */}
                        <div className="lg:col-span-1 space-y-6">
                            <div className="glass p-8 rounded-2xl shadow-premium border border-white/20 contact-card flex items-start space-x-4 hover:border-primary/30 transition-colors">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                                    <FaMapMarkerAlt size={20} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-charcoal mb-2">Visit Us</h3>
                                    <p className="text-charcoal/70 text-sm leading-relaxed">
                                        123 Minimalist Avenue<br />
                                        Design District<br />
                                        New York, NY 10012
                                    </p>
                                </div>
                            </div>

                            <div className="glass p-8 rounded-2xl shadow-premium border border-white/20 contact-card flex items-start space-x-4 hover:border-primary/30 transition-colors">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                                    <FaPhoneAlt size={18} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-charcoal mb-2">Call Us</h3>
                                    <p className="text-charcoal/70 text-sm">
                                        +1 (555) 123-4567<br />
                                        <span className="text-xs text-charcoal/50 block mt-1">Mon-Fri: 9AM - 6PM EST</span>
                                    </p>
                                </div>
                            </div>

                            <div className="glass p-8 rounded-2xl shadow-premium border border-white/20 contact-card flex items-start space-x-4 hover:border-primary/30 transition-colors">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                                    <FaEnvelope size={18} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-charcoal mb-2">Email Us</h3>
                                    <p className="text-charcoal/70 text-sm">
                                        hello@auralink.com<br />
                                        support@auralink.com
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-2">
                            <div className="glass p-8 md:p-12 rounded-2xl shadow-premium-lg border border-white/20 contact-form">
                                <h3 className="text-2xl font-serif font-bold text-charcoal mb-8">Send a Message</h3>
                                <form className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-charcoal/80 mb-2" htmlFor="name">
                                                Your Name
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                className="w-full px-4 py-3 bg-white/50 border border-soft-grey/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-charcoal placeholder:text-charcoal/30"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-charcoal/80 mb-2" htmlFor="email">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                className="w-full px-4 py-3 bg-white/50 border border-soft-grey/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-charcoal placeholder:text-charcoal/30"
                                                placeholder="john@example.com"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-charcoal/80 mb-2" htmlFor="subject">
                                            Subject
                                        </label>
                                        <input
                                            type="text"
                                            id="subject"
                                            className="w-full px-4 py-3 bg-white/50 border border-soft-grey/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-charcoal placeholder:text-charcoal/30"
                                            placeholder="How can we help?"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-charcoal/80 mb-2" htmlFor="message">
                                            Message
                                        </label>
                                        <textarea
                                            id="message"
                                            rows="5"
                                            className="w-full px-4 py-3 bg-white/50 border border-soft-grey/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-charcoal placeholder:text-charcoal/30 resize-none"
                                            placeholder="Write your message here..."
                                        ></textarea>
                                    </div>
                                    <button
                                        type="button"
                                        className="px-8 py-3 bg-primary text-white font-medium rounded-lg hover:bg-secondary transition-colors duration-300 shadow-md transform hover:-translate-y-0.5"
                                    >
                                        Send Message
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default About;
