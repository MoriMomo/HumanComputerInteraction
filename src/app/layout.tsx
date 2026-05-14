import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Suspense } from "react";
import Link from "next/link";
import { LoadingProvider } from "@/contexts/LoadingProvider";
import { ScrollProvider } from "@/contexts/ScrollProvider";
import { AuthProvider } from "@/contexts/AuthProvider";
import { CartProvider } from "@/contexts/CartProvider";
import GlobalLoadingLayer from "@/components/ui/GlobalLoadingLayer";
import RouteLoadingManager from "@/components/ui/RouteLoadingManager";
import ExitIntentOffer from "@/components/ui/ExitIntentOffer";
import GPUMonitorClient from "@/components/debug/GPUMonitorClient";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";
import PageTransition from "@/components/ui/PageTransition";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  preload: false,
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "SatSet - Office Utility, Refined",
    template: "%s | SatSet",
  },
  description: "Premium carry objects for the modern professional.",
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
        <link
          rel="preload"
          href="/satset3d/glb/bener-final-optimized.glb"
          as="fetch"
          type="model/gltf-binary"
          crossOrigin="anonymous"
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${playfair.variable} antialiased min-h-screen flex flex-col bg-white text-slate-900`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only fixed left-4 top-4 z-10000 rounded-md bg-white px-4 py-2 text-sm font-medium text-brand-dark"
        >
          Skip to main content
        </a>
        <AuthProvider>
          <CartProvider>
            <LoadingProvider>
              <ScrollProvider>
                <Suspense fallback={null}>
                  <RouteLoadingManager />
                </Suspense>
                <GlobalLoadingLayer />
                <ExitIntentOffer />
                <div id="main-content" tabIndex={-1}>
                  <PageTransition>
                    {children}
                  </PageTransition>
                </div>
                <GPUMonitorClient />
              </ScrollProvider>
            </LoadingProvider>
          </CartProvider>
        </AuthProvider>
        {/* Persistent micro-CTA to anchor navigation flow */}
        <div className="fixed bottom-4 left-0 right-0 flex justify-center pointer-events-none z-40">
          <div className="pointer-events-auto rounded-full bg-slate-900/85 text-white px-4 py-2 shadow-lg">
            <Link href="/products" className="font-semibold">Shop Collections</Link>
          </div>
        </div>
      </body>
    </html>
  );
}
