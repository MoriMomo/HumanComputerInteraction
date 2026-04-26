"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { PRODUCTS } from "@/data/products";
import { useAuth } from "@/contexts/AuthProvider";
import { getApiBaseUrl } from "@/lib/site-url";

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

function parseLocalCart(raw: string | null): CartItem[] {
    if (!raw) {
        return [];
    }

    try {
        const parsed = JSON.parse(raw) as CartItem[];
        if (!Array.isArray(parsed)) {
            return [];
        }

        return parsed.filter((item) => item.quantity > 0);
    } catch {
        return [];
    }
}

function getLocalCart() {
    if (typeof window === "undefined") {
        return [];
    }

    return parseLocalCart(window.localStorage.getItem(CART_STORAGE_KEY));
}

async function requestCart(method: "GET" | "POST" | "PUT" | "DELETE", body?: unknown) {
    const response = await fetch(`${getApiBaseUrl()}/cart`, {
        method,
        headers: {
            "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { message?: string } | null;
        throw new Error(payload?.message || "Failed to sync cart.");
    }

    const payload = (await response.json()) as { items?: CartItem[] };
    return payload.items || [];
}

export function CartProvider({ children }: { children: ReactNode }) {
    const { user, isAuthLoading } = useAuth();
    const [items, setItems] = useState<CartItem[]>(() => getLocalCart());

    useEffect(() => {
        if (typeof window === "undefined" || user) {
            return;
        }

        window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    }, [items, user]);

    const syncFromServer = useCallback(async () => {
        const serverItems = await requestCart("GET");
        setItems(serverItems);
    }, []);

    useEffect(() => {
        if (isAuthLoading || !user) {
            return;
        }

        const syncAuthenticatedCart = async () => {
            const localItems = getLocalCart();

            if (localItems.length > 0) {
                await requestCart(
                    "POST",
                    localItems.map((entry) => ({
                        slug: entry.slug,
                        color: entry.color,
                        quantity: entry.quantity,
                    }))
                );
                window.localStorage.removeItem(CART_STORAGE_KEY);
            }

            await syncFromServer();
        };

        void syncAuthenticatedCart();
    }, [isAuthLoading, syncFromServer, user]);

    const addItem = useCallback(
        ({ slug, quantity = 1, color }: AddToCartPayload) => {
            const product = PRODUCTS.find((entry) => entry.slug === slug);
            if (!product) {
                return;
            }

            if (!user) {
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
                return;
            }

            void requestCart("POST", { slug, color, quantity }).then(setItems).catch(console.error);
        },
        [user]
    );

    const updateQuantity = useCallback(
        (slug: string, quantity: number, color?: string) => {
            if (!user) {
                setItems((prev) => {
                    const key = getItemKey(slug, color);
                    if (quantity <= 0) {
                        return prev.filter((item) => getItemKey(item.slug, item.color) !== key);
                    }

                    return prev.map((item) => {
                        if (getItemKey(item.slug, item.color) !== key) {
                            return item;
                        }

                        return { ...item, quantity };
                    });
                });
                return;
            }

            void requestCart("PUT", { slug, color, quantity }).then(setItems).catch(console.error);
        },
        [user]
    );

    const removeItem = useCallback(
        (slug: string, color?: string) => {
            if (!user) {
                setItems((prev) => prev.filter((item) => getItemKey(item.slug, item.color) !== getItemKey(slug, color)));
                return;
            }

            void requestCart("DELETE", { slug, color }).then(setItems).catch(console.error);
        },
        [user]
    );

    const clearCart = useCallback(() => {
        if (!user) {
            setItems([]);
            return;
        }

        void requestCart("DELETE").then(setItems).catch(console.error);
    }, [user]);

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
