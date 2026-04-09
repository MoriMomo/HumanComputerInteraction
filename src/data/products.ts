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
        colors: ["#59636E", "#1C1C1E", "#8E9AA6", "#BCA782"],
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
        colors: ["#59636E", "#1C1C1E", "#3C2F24"],
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
        colors: ["#59636E", "#8E9AA6"],
        features: ["Multiple Compartments", "Cable Management", "Non-Slip Base", "Powder Coated"],
        image: {
            src: "/products/desk-organizer.svg",
            alt: "Desk Organizer with premium finish",
            sizes: "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 32vw",
        },
    },
];
