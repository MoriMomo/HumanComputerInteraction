"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LoadingLink from "@/components/ui/LoadingLink";
import { useCart } from "@/contexts/CartProvider";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { useCurrency } from "@/contexts/CurrencyProvider";

const SHIPPING_ESTIMATE = 12;

export default function CheckoutPage() {
    const { items, itemCount, subtotal, clearCart } = useCart();
    const { format } = useCurrency();
    const shipping = itemCount > 0 ? SHIPPING_ESTIMATE : 0;
    const total = subtotal + shipping;

    const orderSummary = items
        .map((item) => `${item.name} x${item.quantity}${item.color ? ` (${item.color})` : ""}`)
        .join("\n");

    const whatsappUrl = getWhatsAppUrl(
        `Hi SatSet, I want to place an order.\n\nItems:\n${orderSummary || "No items"}\n\nSubtotal: ${format(subtotal)}\nShipping: ${format(shipping)}\nTotal: ${format(total)}`
    );

    const handleConfirmOrder = () => {
        if (!whatsappUrl) return;
        window.open(whatsappUrl, "_blank", "noopener,noreferrer");
        clearCart();
    };

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-white px-6 pb-20 pt-32 text-[#231711] md:px-12 lg:px-20">
                <section className="mx-auto max-w-7xl">
                    <LoadingLink href="/cart" className="text-sm text-stone-500 transition-colors hover:text-stone-900 font-medium">
                        ← Back to cart
                    </LoadingLink>

                    <p className="mt-8 text-xs font-semibold uppercase tracking-[0.28em] text-primary">Checkout</p>
                    <h1 className="mt-3 font-serif text-4xl font-bold md:text-5xl text-[#231711]">Review, confirm, and hand off the order.</h1>
                    <p className="mt-4 max-w-2xl text-stone-600">
                        This checkout keeps the transaction path simple: review the order, confirm the details, and hand the summary to WhatsApp for personal assistance.
                    </p>

                    <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                        <div className="space-y-4 rounded-4xl border border-stone-200 bg-stone-50/50 p-6 shadow-sm">
                            <div className="flex items-center justify-between gap-4 border-b border-stone-200 pb-4">
                                <div>
                                    <p className="text-xs uppercase tracking-[0.24em] text-stone-400 font-semibold">Contact + shipping</p>
                                    <p className="mt-2 text-sm text-stone-600">Use WhatsApp for a direct support handoff and quick confirmation.</p>
                                </div>
                                {whatsappUrl && itemCount > 0 ? (
                                    <button
                                        type="button"
                                        onClick={handleConfirmOrder}
                                        className="rounded-full bg-[#25D366] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#1fb85b] cursor-pointer"
                                    >
                                        Chat Customer Service
                                    </button>
                                ) : null}
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm">
                                    <p className="text-xs uppercase tracking-[0.24em] text-stone-400 font-semibold">Delivery note</p>
                                    <p className="mt-3 text-sm leading-7 text-stone-650 font-medium">
                                        Secure packaging, tracked shipping, and support during confirmation. This step is designed to be fast and low-friction.
                                    </p>
                                </div>

                                <div className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm">
                                    <p className="text-xs uppercase tracking-[0.24em] text-stone-400 font-semibold">Payment method</p>
                                    <p className="mt-3 text-sm leading-7 text-stone-650 font-medium">
                                        Manual checkout is currently active. Confirm the summary here, then continue through WhatsApp for the final transaction handoff.
                                    </p>
                                </div>
                            </div>

                            <div className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm">
                                <p className="text-xs uppercase tracking-[0.24em] text-stone-400 font-semibold">Order summary</p>
                                <div className="mt-4 space-y-3 text-sm text-stone-700">
                                    {items.length > 0 ? (
                                        items.map((item) => (
                                            <div key={`${item.slug}-${item.color ?? "default"}`} className="flex items-center justify-between gap-4 border-b border-stone-100 pb-3 last:border-0 last:pb-0 font-medium text-[#231711]">
                                                <span>{item.name} × {item.quantity}</span>
                                                <span>{format(item.price * item.quantity)}</span>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-stone-400">No items in your cart yet.</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <aside className="h-fit rounded-4xl border border-stone-200 bg-stone-50 p-6 shadow-sm">
                            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Total</p>
                            <div className="mt-5 space-y-3 border-b border-stone-200 pb-5 text-sm text-stone-650 font-medium">
                                <div className="flex items-center justify-between">
                                    <span>Items ({itemCount})</span>
                                    <span>{format(subtotal)}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Shipping</span>
                                    <span>{format(shipping)}</span>
                                </div>
                            </div>
                            <div className="mt-5 flex items-center justify-between text-lg font-semibold text-[#231711]">
                                <span>Grand total</span>
                                <span>{format(total)}</span>
                            </div>

                            {itemCount > 0 ? (
                                <button
                                    type="button"
                                    onClick={handleConfirmOrder}
                                    className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-stone-800 cursor-pointer"
                                >
                                    Confirm order via WhatsApp
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    className="mt-6 w-full rounded-full bg-stone-200 px-6 py-3 text-sm font-semibold text-stone-400 cursor-not-allowed"
                                    disabled
                                >
                                    Add items to continue
                                </button>
                            )}

                            <LoadingLink
                                href="/products"
                                className="mt-3 inline-flex w-full items-center justify-center rounded-full border border-stone-200 bg-white px-6 py-3 text-sm font-medium text-stone-700 transition-colors hover:border-stone-300 hover:bg-stone-50 hover:text-[#231711]"
                            >
                                Continue shopping
                            </LoadingLink>
                        </aside>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}