"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmartImage from "@/components/ui/SmartImage";
import LoadingLink from "@/components/ui/LoadingLink";
import { useCart } from "@/contexts/CartProvider";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { useCurrency } from "@/contexts/CurrencyProvider";

const SHIPPING_ESTIMATE = 12;

export default function CartPage() {
    const { items, itemCount, subtotal, updateQuantity, removeItem, clearCart } = useCart();
    const { format } = useCurrency();
    const shipping = itemCount > 0 ? SHIPPING_ESTIMATE : 0;
    const total = subtotal + shipping;
    const whatsappUrl = getWhatsAppUrl(
        `Hi SatSet, I need help with my cart.\nItems: ${itemCount}\nSubtotal: ${format(subtotal)}\nTotal: ${format(total)}`
    );

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-white pb-20 pt-32 text-[#231711]">
                <section className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20">
                    <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">Your cart</p>
                            <h1 className="mt-3 font-serif text-4xl font-bold md:text-5xl text-[#231711]">Ready to checkout.</h1>
                        </div>

                        {itemCount > 0 && (
                            <button
                                type="button"
                                onClick={clearCart}
                                className="rounded-full border border-stone-200 bg-white px-5 py-2 text-sm font-medium text-stone-700 transition-all hover:border-stone-300 hover:bg-stone-50 hover:text-[#231711]"
                            >
                                Clear cart
                            </button>
                        )}
                    </div>

                    {items.length === 0 ? (
                        <div className="rounded-4xl border border-stone-200 bg-stone-50 p-10 text-center shadow-sm">
                            <p className="text-lg font-medium text-stone-850">Your cart is empty.</p>
                            <p className="mt-3 text-sm text-stone-500">Browse the collection and add items to continue.</p>
                            <LoadingLink
                                href="/products"
                                className="mt-6 inline-flex rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-stone-800"
                            >
                                Explore products
                            </LoadingLink>
                        </div>
                    ) : (
                        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                            <div className="space-y-4">
                                {items.map((item) => (
                                    <article key={`${item.slug}-${item.color ?? "default"}`} className="grid gap-4 rounded-3xl border border-stone-200 bg-stone-50/50 p-4 sm:grid-cols-[120px_1fr] shadow-sm">
                                        <div className="relative h-28 overflow-hidden rounded-2xl border border-stone-200 bg-stone-100">
                                            {item.imageSrc ? (
                                                <SmartImage
                                                    src={item.imageSrc}
                                                    alt={item.name}
                                                    fill
                                                    className="object-cover"
                                                    sizes="120px"
                                                />
                                            ) : null}
                                        </div>

                                        <div className="flex flex-col justify-between gap-4">
                                            <div>
                                                <p className="text-lg font-semibold text-[#231711]">{item.name}</p>
                                                {item.color && (
                                                    <p className="mt-1 text-xs uppercase tracking-[0.22em] text-stone-400 font-medium">Finish: {item.color.replace("#", "")}</p>
                                                )}
                                                <p className="mt-3 text-sm text-stone-600 font-medium">{format(item.price)} each</p>
                                            </div>

                                            <div className="flex flex-wrap items-center justify-between gap-3">
                                                <div className="inline-flex items-center rounded-full border border-stone-200 bg-white">
                                                    <button
                                                        type="button"
                                                        onClick={() => updateQuantity(item.slug, item.quantity - 1, item.color)}
                                                        className="h-9 w-9 text-stone-600 transition-colors hover:text-stone-900 font-bold"
                                                        aria-label={`Decrease quantity of ${item.name}`}
                                                    >
                                                        -
                                                    </button>
                                                    <span className="min-w-10 text-center text-sm font-medium text-stone-850">{item.quantity}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => updateQuantity(item.slug, item.quantity + 1, item.color)}
                                                        className="h-9 w-9 text-stone-600 transition-colors hover:text-stone-900 font-bold"
                                                        aria-label={`Increase quantity of ${item.name}`}
                                                    >
                                                        +
                                                    </button>
                                                </div>

                                                <div className="flex items-center gap-4">
                                                    <p className="text-sm font-semibold text-[#231711]">{format(item.price * item.quantity)}</p>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeItem(item.slug, item.color)}
                                                        className="text-sm text-stone-500 transition-colors hover:text-stone-800"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>

                            <aside className="h-fit rounded-3xl border border-stone-200 bg-stone-50 p-6 shadow-sm">
                                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Order summary</p>
                                <div className="mt-6 space-y-3 border-b border-stone-200 pb-6 text-sm text-stone-650 font-medium">
                                    <div className="flex items-center justify-between">
                                        <span>Items ({itemCount})</span>
                                        <span>{format(subtotal)}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span>Estimated shipping</span>
                                        <span>{format(shipping)}</span>
                                    </div>
                                </div>
                                <div className="mt-6 flex items-center justify-between text-lg font-semibold text-[#231711]">
                                    <span>Total</span>
                                    <span>{format(total)}</span>
                                </div>

                                <LoadingLink
                                    href="/checkout"
                                    className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-stone-800"
                                >
                                    Continue to checkout
                                </LoadingLink>
                                {whatsappUrl ? (
                                    <a
                                        href={whatsappUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-3 inline-flex w-full items-center justify-center rounded-full border border-stone-200 bg-white px-6 py-3 text-sm font-medium text-stone-700 transition-colors hover:border-stone-300 hover:bg-stone-50 hover:text-stone-900"
                                    >
                                        Chat Customer Service
                                    </a>
                                ) : null}
                                <p className="mt-3 text-center text-xs text-stone-400">Checkout now routes to a dedicated order review page.</p>
                            </aside>
                        </div>
                    )}
                </section>
            </main>
            <Footer />
        </>
    );
}
