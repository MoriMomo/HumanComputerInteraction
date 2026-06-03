import type { RenderMode } from "@/types";

export type Product3DVariant =
    | "cardholder"
    | "wallet"
    | "desk-organizer"
    | "lamp"
    | "notebook"
    | "pen"
    | "monitor-stand"
    | "cable-tidy"
    | "travel-case";

export interface ProductImageAsset {
    src: string;
    alt: string;
    sizes?: string;
}

export interface Product3DConfig {
    variant: Product3DVariant;
    modelSrc?: string;
    color?: string;
    renderMode?: RenderMode;
    enableZoom?: boolean;
    autoRotate?: boolean;
    scale?: number;
    position?: [number, number, number];
    rotation?: [number, number, number];
    camera?: [number, number, number];
}

export interface Product {
    slug: string;
    name: string;
    price: number;
    description: string;
    colors: string[];
    features: string[];
    image?: ProductImageAsset;
    scene3d?: Product3DConfig;
}

export const PRODUCTS: Product[] = [
    {
        slug: "cardholder-pro",
        name: "CardHolder Pro",
        price: 89,
        description: "Premium aluminium card holder with RFID shielding",
        colors: ["var(--color-brand-primary)", "#231711", "var(--color-brand-mountain)", "var(--color-brand-sand)"],
        features: ["RFID Shielding", "18g Weight", "8-Card Capacity", "Anodised Finish"],
        scene3d: {
            variant: "cardholder",
            modelSrc: "/satset3d/glb/bener-optimized.glb",
            color: "var(--color-brand-primary)",
            renderMode: "normal",
            enableZoom: true,
            autoRotate: true,
            scale: 1.2,
            position: [0, -0.03, 0],
            rotation: [0, 0.5, 0],
            camera: [1.1, 0.6, 1.9],
        },
        image: {
            src: "/productIImg/image.png",
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
        scene3d: {
            variant: "wallet",
            modelSrc: "/satset3d/glb/bener-optimized.glb",
            color: "var(--color-brand-darker)",
            renderMode: "normal",
            enableZoom: true,
            autoRotate: true,
            scale: 0.9,
            position: [0, -0.03, 0],
            rotation: [0, 0.5, 0],
            camera: [0.6, 0.3, 2.4],
        },
        image: {
            src: "/productIImg/download-2.png",
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
        scene3d: {
            variant: "desk-organizer",
            color: "var(--color-brand-mountain)",
            renderMode: "normal",
            enableZoom: true,
            autoRotate: true,
            scale: 1.04,
        },
        image: {
            src: "/productIImg/Desk_organizer_202605202207.jpeg",
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
        scene3d: {
            variant: "lamp",
            color: "var(--color-brand-sand)",
            renderMode: "glass",
            enableZoom: true,
            autoRotate: true,
            scale: 1,
        },
        image: {
            src: "/productIImg/Adjustable_LED_desk_lamp_control_202605202209.jpeg",
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
        scene3d: {
            variant: "notebook",
            color: "#231711",
            renderMode: "normal",
            enableZoom: true,
            autoRotate: true,
            scale: 1.08,
        },
        image: {
            src: "/productIImg/notebook-with-dot-grid-202605202213.jpeg",
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
        scene3d: {
            variant: "pen",
            color: "var(--color-brand-primary)",
            renderMode: "normal",
            enableZoom: true,
            autoRotate: true,
            scale: 1.12,
        },
        image: {
            src: "/productIImg/ball_point_magnetic_pen_202605202228.jpeg",
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
        scene3d: {
            variant: "monitor-stand",
            color: "var(--color-brand-sand)",
            renderMode: "normal",
            enableZoom: true,
            autoRotate: true,
            scale: 1.02,
        },
        image: {
            src: "/productIImg/solid_monitor_stand_202605202231.jpeg",
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
        scene3d: {
            variant: "cable-tidy",
            color: "var(--color-brand-mountain)",
            renderMode: "wireframe",
            enableZoom: true,
            autoRotate: true,
            scale: 1.1,
        },
        image: {
            src: "/productIImg/cable_tidy_202605202234.jpeg",
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
        scene3d: {
            variant: "travel-case",
            modelSrc: "/satset3d/glb/BOX1 1pcs.glb",
            color: "#231711",
            renderMode: "normal",
            enableZoom: true,
            autoRotate: true,
            scale: 1.04,
            position: [0, -0.06, 0],
            rotation: [0, 0.2, 0],
            camera: [0.5, 0.4, 2.6],
        },
        image: {
            src: "/productIImg/download-3.png",
            alt: "Travel Case opened with items inside",
            sizes: "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 32vw",
        },
    },
];

export const PRODUCT_MAP = new Map(PRODUCTS.map((product) => [product.slug, product]));
