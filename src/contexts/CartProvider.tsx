"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { PRODUCTS } from "@/data/products";

const CART_STORAGE_KEY = "satset-cart-v1";

export interface CartItem {
    slug: string;
    name: string;
    price: number;
    quantity: number;
    color?: string;
    imageSrc?: string;
}

interface AddToCartPayload {
    slug: string;
    quantity?: number;
    color?: string;
}

interface CartContextType {
    items: CartItem[];
    itemCount: number;
    subtotal: number;
    addItem: (payload: AddToCartPayload) => void;
    updateQuantity: (slug: string, quantity: number, color?: string) => void;
    removeItem: (slug: string, color?: string) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

function getItemKey(slug: string, color?: string) {
    return `${slug}::${color ?? "default"}`;
}

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>(() => {
        if (typeof window === "undefined") {
            return [];
        }

        try {
            const raw = window.localStorage.getItem(CART_STORAGE_KEY);
            if (!raw) {
                return [];
            }

            const parsed = JSON.parse(raw) as CartItem[];
            if (!Array.isArray(parsed)) {
                return [];
            }

            return parsed.filter((item) => item.quantity > 0);
        } catch {
            window.localStorage.removeItem(CART_STORAGE_KEY);
            return [];
        }
    });

    useEffect(() => {
        window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    }, [items]);

    const addItem = useCallback(({ slug, quantity = 1, color }: AddToCartPayload) => {
        const product = PRODUCTS.find((entry) => entry.slug === slug);
        if (!product) return;

        setItems((prev) => {
            const key = getItemKey(slug, color);
            const existingIndex = prev.findIndex((item) => getItemKey(item.slug, item.color) === key);

            if (existingIndex >= 0) {
                const next = [...prev];
                const target = next[existingIndex];
                next[existingIndex] = { ...target, quantity: target.quantity + Math.max(1, quantity) };
                return next;
            }

            return [
                ...prev,
                {
                    slug: product.slug,
                    name: product.name,
                    price: product.price,
                    quantity: Math.max(1, quantity),
                    color,
                    imageSrc: product.image?.src,
                },
            ];
        });
    }, []);

    const updateQuantity = useCallback((slug: string, quantity: number, color?: string) => {
        setItems((prev) => {
            const key = getItemKey(slug, color);
            if (quantity <= 0) {
                return prev.filter((item) => getItemKey(item.slug, item.color) !== key);
            }

            return prev.map((item) => {
                if (getItemKey(item.slug, item.color) !== key) return item;
                return { ...item, quantity };
            });
        });
    }, []);

    const removeItem = useCallback((slug: string, color?: string) => {
        setItems((prev) => prev.filter((item) => getItemKey(item.slug, item.color) !== getItemKey(slug, color)));
    }, []);

    const clearCart = useCallback(() => {
        setItems([]);
    }, []);

    const value = useMemo(() => {
        const itemCount = items.reduce((total, item) => total + item.quantity, 0);
        const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);

        return {
            items,
            itemCount,
            subtotal,
            addItem,
            updateQuantity,
            removeItem,
            clearCart,
        };
    }, [addItem, clearCart, items, removeItem, updateQuantity]);

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within CartProvider");
    }
    return context;
}