export const PRODUCTS = [
    {
        slug: "cardholder-pro",
        name: "CardHolder Pro",
        price: 89,
        description: "Premium aluminium card holder with RFID shielding",
        colors: ["#59636E", "#1C1C1E", "#8E9AA6", "#BCA782"],
        features: ["RFID Shielding", "18g Weight", "8-Card Capacity", "Anodised Finish"],
    },
    {
        slug: "wallet-elite",
        name: "Wallet Elite",
        price: 129,
        description: "Minimalist wallet with cash strap and modular system",
        colors: ["#59636E", "#1C1C1E", "#3C2F24"],
        features: ["Cash Strap", "Modular Rails", "6061-T6 Aluminium", "Lifetime Warranty"],
    },
    {
        slug: "desk-organizer",
        name: "Desk Organizer",
        price: 149,
        description: "Executive desk organizer for modern professionals",
        colors: ["#59636E", "#8E9AA6"],
        features: ["Multiple Compartments", "Cable Management", "Non-Slip Base", "Powder Coated"],
    },
];

export type Product = (typeof PRODUCTS)[number];
