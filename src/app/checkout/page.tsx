"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LoadingLink from "@/components/ui/LoadingLink";
import { useCart } from "@/contexts/CartProvider";
import { getWhatsAppUrl } from "@/lib/whatsapp";

const SHIPPING_ESTIMATE = 12;

export default function CheckoutPage() {
    const { items, itemCount, subtotal } = useCart();
    const shipping = itemCount > 0 ? SHIPPING_ESTIMATE : 0;
    const total = subtotal + shipping;

    const orderSummary = items
        .map((item) => `${item.name} x${item.quantity}${item.color ? ` (${item.color})` : ""}`)
        .join("\n");

    const whatsappUrl = getWhatsAppUrl(
        `Hi SatSet, I want to place an order.\n\nItems:\n${orderSummary || "No items"}\n\nSubtotal: $${subtotal.toFixed(2)}\nShipping: $${shipping.toFixed(2)}\nTotal: $${total.toFixed(2)}`
    );

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-brand-dark px-6 pb-20 pt-32 text-white md:px-12 lg:px-20">
                <section className="mx-auto max-w-7xl">
                    <LoadingLink href="/cart" className="text-sm text-white/52 transition-colors hover:text-white/84">
                        ← Back to cart
                    </LoadingLink>

                    <p className="mt-8 text-xs font-semibold uppercase tracking-[0.28em] text-primary">Checkout</p>
                    <h1 className="mt-3 font-serif text-4xl font-bold md:text-5xl">Review, confirm, and hand off the order.
                    </h1>
                    <p className="mt-4 max-w-2xl text-white/62">
                        This checkout keeps the transaction path simple: review the order, confirm the details, and hand the summary to WhatsApp for personal assistance.
                    </p>

                    <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                        <div className="space-y-4 rounded-4xl border border-white/10 bg-white/5 p-6">
                            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                                <div>
                                    <p className="text-xs uppercase tracking-[0.24em] text-white/42">Contact + shipping</p>
                                    <p className="mt-2 text-sm text-white/70">Use WhatsApp for a direct support handoff and quick confirmation.</p>
                                </div>
                                {whatsappUrl ? (
                                    <a
                                        href={whatsappUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="rounded-full bg-[#25D366] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#1fb85b]"
                                    >
                                        Chat Customer Service
                                    </a>
                                ) : null}
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                                    <p className="text-xs uppercase tracking-[0.24em] text-white/42">Delivery note</p>
                                    <p className="mt-3 text-sm leading-7 text-white/68">
                                        Secure packaging, tracked shipping, and support during confirmation. This step is designed to be fast and low-friction.
                                    </p>
                                </div>

                                <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                                    <p className="text-xs uppercase tracking-[0.24em] text-white/42">Payment method</p>
                                    <p className="mt-3 text-sm leading-7 text-white/68">
                                        Manual checkout is currently active. Confirm the summary here, then continue through WhatsApp for the final transaction handoff.
                                    </p>
                                </div>
                            </div>

                            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                                <p className="text-xs uppercase tracking-[0.24em] text-white/42">Order summary</p>
                                <div className="mt-4 space-y-3 text-sm text-white/72">
                                    {items.length > 0 ? (
                                        items.map((item) => (
                                            <div key={`${item.slug}-${item.color ?? "default"}`} className="flex items-center justify-between gap-4 border-b border-white/8 pb-3 last:border-0 last:pb-0">
                                                <span>{item.name} × {item.quantity}</span>
                                                <span>${(item.price * item.quantity).toFixed(2)}</span>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-white/56">No items in your cart yet.</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <aside className="h-fit rounded-4xl border border-white/10 bg-white/6 p-6">
                            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Total</p>
                            <div className="mt-5 space-y-3 border-b border-white/10 pb-5 text-sm text-white/72">
                                <div className="flex items-center justify-between">
                                    <span>Items ({itemCount})</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Shipping</span>
                                    <span>${shipping.toFixed(2)}</span>
                                </div>
                            </div>
                            <div className="mt-5 flex items-center justify-between text-lg font-semibold text-white">
                                <span>Grand total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>

                            {whatsappUrl ? (
                                <a
                                    href={whatsappUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-dark transition-colors hover:bg-white/90"
                                >
                                    Confirm order via WhatsApp
                                </a>
                            ) : (
                                <button
                                    type="button"
                                    className="mt-6 w-full rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-dark opacity-60"
                                    disabled
                                >
                                    Add items to continue
                                </button>
                            )}

                            <LoadingLink
                                href="/products"
                                className="mt-3 inline-flex w-full items-center justify-center rounded-full border border-white/12 px-6 py-3 text-sm font-medium text-white/80 transition-colors hover:border-white/24 hover:bg-white/6 hover:text-white"
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