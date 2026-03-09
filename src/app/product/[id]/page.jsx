"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import { gsap } from 'gsap';
import { FaShoppingCart, FaHeart, FaChevronDown, FaCheck } from 'react-icons/fa';

// Mock product data (you would normally fetch this based on the ID)
const MOCK_PRODUCT = {
    id: 1,
    name: 'Aroma Diffuser Pro',
    price: 129.00,
    description: 'Elevate your space with our premium ultrasonic aroma diffuser. Crafted from sustainable materials and designed to blend seamlessly into any modern aesthetic.',
    features: [
        'Whisper-quiet operation (< 20dB)',
        'Up to 12 hours of continuous mist',
        'Ambient warm LED lighting modes',
        'Auto shut-off for safety',
        'Premium matte ceramic finish'
    ],
    images: [
        'https://images.unsplash.com/photo-1602928321679-560bb453f190?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1602928325350-523e4240767e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    ],
    colors: [
        { name: 'Oatmeal', hex: '#EBE7DF' },
        { name: 'Charcoal', hex: '#302C2B' },
        { name: 'Sage', hex: '#8F9B8C' }
    ]
};

const ProductDetail = () => {
    const { id } = useParams();
    const [mainImage, setMainImage] = useState(0);
    const [selectedColor, setSelectedColor] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('details'); // details, shipping, reviews
    const containerRef = useRef(null);

    // In a real app, you'd fetch the product based on the 'id' param

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.product-image-container', {
                opacity: 0,
                x: -50,
                duration: 1,
                ease: 'power3.out',
            });

            gsap.from('.product-info-container > *', {
                opacity: 0,
                y: 20,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power3.out',
                delay: 0.3,
            });
        }, containerRef);

        return () => ctx.revert();
    }, [id]);

    return (
        <div ref={containerRef} className="min-h-screen bg-background-light pt-32 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

                    {/* Image Area */}
                    <div className="product-image-container space-y-4">
                        <div className="aspect-square rounded-2xl overflow-hidden glass p-2">
                            <img
                                src={MOCK_PRODUCT.images[mainImage]}
                                alt={MOCK_PRODUCT.name}
                                className="w-full h-full object-cover rounded-xl transition-all duration-500 hover:scale-105 cursor-zoom-in"
                            />
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {MOCK_PRODUCT.images.map((img, index) => (
                                <button
                                    key={index}
                                    onClick={() => setMainImage(index)}
                                    className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${mainImage === index ? 'border-primary' : 'border-transparent hover:border-soft-grey'}`}
                                >
                                    <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Info Area */}
                    <div className="product-info-container flex flex-col justify-center">
                        <nav className="text-sm font-medium text-charcoal/50 mb-6 flex items-center space-x-2">
                            <a href="/" className="hover:text-primary transition-colors">Home</a>
                            <span>/</span>
                            <a href="#" className="hover:text-primary transition-colors">Shop</a>
                            <span>/</span>
                            <span className="text-charcoal">{MOCK_PRODUCT.name}</span>
                        </nav>

                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-charcoal mb-4 border-b pb-6 border-soft-grey/40">
                            {MOCK_PRODUCT.name}
                        </h1>

                        <p className="text-3xl text-primary font-medium mb-8">
                            ${MOCK_PRODUCT.price.toFixed(2)}
                        </p>

                        <p className="text-charcoal/70 leading-relaxed mb-8 text-lg">
                            {MOCK_PRODUCT.description}
                        </p>

                        {/* Color Selection */}
                        <div className="mb-8">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-sm font-bold tracking-wider text-charcoal uppercase">Color</h3>
                                <span className="text-sm text-charcoal/60">{MOCK_PRODUCT.colors[selectedColor].name}</span>
                            </div>
                            <div className="flex space-x-3">
                                {MOCK_PRODUCT.colors.map((color, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedColor(index)}
                                        className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${selectedColor === index ? 'border-primary scale-110' : 'border-transparent hover:scale-110 shadow-sm'}`}
                                        style={{ backgroundColor: color.hex }}
                                        aria-label={`Select ${color.name}`}
                                    >
                                        {selectedColor === index && <FaCheck size={12} className={color.name === 'Oatmeal' ? 'text-charcoal' : 'text-white'} />}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity and Actions */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-10">
                            <div className="flex items-center border border-soft-grey rounded-lg h-14 bg-white/50 glass w-full sm:w-32">
                                <button
                                    className="px-4 py-2 text-charcoal/50 hover:text-charcoal transition-colors focus:outline-none"
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                >-</button>
                                <span className="flex-1 text-center font-medium text-charcoal">{quantity}</span>
                                <button
                                    className="px-4 py-2 text-charcoal/50 hover:text-charcoal transition-colors focus:outline-none"
                                    onClick={() => setQuantity(quantity + 1)}
                                >+</button>
                            </div>

                            <button className="flex-1 h-14 bg-primary text-white rounded-lg flex items-center justify-center space-x-2 hover:bg-secondary transition-colors duration-300 font-medium tracking-wide shadow-md">
                                <FaShoppingCart />
                                <span>Add to Cart - ${(MOCK_PRODUCT.price * quantity).toFixed(2)}</span>
                            </button>

                            <button className="h-14 w-14 border border-soft-grey rounded-lg flex items-center justify-center text-charcoal/50 hover:text-primary hover:border-primary transition-colors glass flex-shrink-0">
                                <FaHeart size={20} />
                            </button>
                        </div>

                        {/* Accordion/Tabs for extra info */}
                        <div className="border-t border-soft-grey/40 pt-8 mt-auto">
                            <div className="flex space-x-8 border-b border-soft-grey/40 mb-6">
                                {['details', 'shipping', 'reviews'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`pb-4 text-sm font-bold uppercase tracking-wider uppercase transition-colors relative ${activeTab === tab ? 'text-charcoal' : 'text-charcoal/40 hover:text-charcoal/80'}`}
                                    >
                                        {tab}
                                        {activeTab === tab && (
                                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></span>
                                        )}
                                    </button>
                                ))}
                            </div>

                            <div className="min-h-[150px]">
                                {activeTab === 'details' && (
                                    <ul className="space-y-3">
                                        {MOCK_PRODUCT.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-start text-charcoal/70">
                                                <FaCheck className="text-primary mt-1 mr-3 flex-shrink-0" size={12} />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                {activeTab === 'shipping' && (
                                    <div className="text-charcoal/70 space-y-4">
                                        <p><strong>Standard Shipping:</strong> Free on orders over $100. Delivery in 3-5 business days.</p>
                                        <p><strong>Express Shipping:</strong> $15 flat rate. Delivery in 1-2 business days.</p>
                                        <p><strong>Returns:</strong> We accept returns in original condition within 30 days of purchase.</p>
                                    </div>
                                )}
                                {activeTab === 'reviews' && (
                                    <div className="text-charcoal/70">
                                        <p className="italic">"Absolutely gorgeous. It completely transformed the ambiance of my living room."</p>
                                        <p className="mt-2 font-bold text-sm">- Sarah K.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
