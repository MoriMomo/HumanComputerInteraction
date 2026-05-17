export interface ProductImageAsset {
    src: string;
    alt: string;
    sizes?: string;
}

export interface Product {
    slug: string;
    name: string;
    price: number;
    description: string;
    colors: string[];
    features: string[];
    image?: ProductImageAsset;
}

export const PRODUCTS: Product[] = [
    {
        slug: "cardholder-pro",
        name: "CardHolder Pro",
        price: 89,
        description: "Premium aluminium card holder with RFID shielding",
        colors: ["var(--color-brand-primary)", "#231711", "var(--color-brand-mountain)", "var(--color-brand-sand)"],
        features: ["RFID Shielding", "18g Weight", "8-Card Capacity", "Anodised Finish"],
        image: {
            src: "/products/cardholder-pro.svg",
            alt: "CardHolder Pro in studio lighting",
            sizes: "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 32vw",
        },
    },
    {
        slug: "wallet-elite",
        name: "Wallet Elite",
        price: 129,
        description: "Minimalist wallet with cash strap and modular system",
        colors: ["var(--color-brand-primary)", "#231711", "var(--color-brand-darker)"],
        features: ["Cash Strap", "Modular Rails", "6061-T6 Aluminium", "Lifetime Warranty"],
        image: {
            src: "/products/wallet-elite.svg",
            alt: "Wallet Elite angled product shot",
            sizes: "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 32vw",
        },
    },
    {
        slug: "desk-organizer",
        name: "Desk Organizer",
        price: 149,
        description: "Executive desk organizer for modern professionals",
        colors: ["var(--color-brand-primary)", "var(--color-brand-mountain)"],
        features: ["Multiple Compartments", "Cable Management", "Non-Slip Base", "Powder Coated"],
        image: {
            src: "/products/desk-organizer.svg",
            alt: "Desk Organizer with premium finish",
            sizes: "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 32vw",
        },
    },
    {
        slug: "lamp-arc",
        name: "Lamp Arc",
        price: 59,
        description: "Adjustable LED desk lamp with warm-to-cool control",
        colors: ["var(--color-brand-primary)", "#231711"],
        features: ["Dimmable", "USB-C Power", "Flexible Arm", "Energy Efficient"],
        image: {
            src: "/products/lamp-arc.svg",
            alt: "Lamp Arc on a desk",
            sizes: "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 32vw",
        },
    },
    {
        slug: "notebook-studio",
        name: "Notebook Studio",
        price: 24,
        description: "Recycled-paper notebook with dot-grid and lay-flat binding",
        colors: ["#231711", "var(--color-brand-sand)"],
        features: ["Dot Grid", "Lay-Flat Binding", "120gsm Paper", "Elastic Strap"],
        image: {
            src: "/products/notebook-studio.svg",
            alt: "Notebook Studio closed and open",
            sizes: "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 32vw",
        },
    },
    {
        slug: "magnetic-pen",
        name: "Magnetic Pen",
        price: 19,
        description: "Precision ballpoint pen with magnetic docking",
        colors: ["var(--color-brand-primary)", "var(--color-brand-mountain)", "#231711"],
        features: ["Magnetic Dock", "Smooth Ink", "Refillable", "Aluminium Body"],
        image: {
            src: "/products/magnetic-pen.svg",
            alt: "Magnetic Pen on a metal dock",
            sizes: "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 32vw",
        },
    },
    {
        slug: "monitor-stand",
        name: "Monitor Stand",
        price: 79,
        description: "Solid monitor riser with integrated cable routing",
        colors: ["var(--color-brand-sand)", "#231711"],
        features: ["Cable Routing", "Adjustable Height", "Solid Wood Top", "Anti-Slip Pads"],
        image: {
            src: "/products/monitor-stand.svg",
            alt: "Monitor Stand with tidy cables",
            sizes: "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 32vw",
        },
    },
    {
        slug: "cable-tidy",
        name: "Cable Tidy",
        price: 12,
        description: "Magnetic cable management clips for desk organization",
        colors: ["var(--color-brand-primary)", "var(--color-brand-mountain)"],
        features: ["Magnetic Clips", "Adhesive Base", "Set of 6", "Easy Reposition"],
        image: {
            src: "/products/cable-tidy.svg",
            alt: "Cable Tidy magnetic clips",
            sizes: "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 32vw",
        },
    },
    {
        slug: "travel-case",
        name: "Travel Case",
        price: 39,
        description: "Compact travel case for essentials and peripherals",
        colors: ["#231711", "var(--color-brand-sand)"],
        features: ["Water Resistant", "Padded Compartments", "Lightweight", "Zipper Closure"],
        image: {
            src: "/products/travel-case.svg",
            alt: "Travel Case opened with items inside",
            sizes: "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 32vw",
        },
    },
];

export const PRODUCT_MAP = new Map(PRODUCTS.map((product) => [product.slug, product]));
