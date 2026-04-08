import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { LoadingProvider } from "@/contexts/LoadingProvider";
import { ScrollProvider } from "@/contexts/ScrollProvider";
import { AuthProvider } from "@/contexts/AuthProvider";
import "./globals.css";

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
  title: "SatSet - Office Utility, Refined",
  description: "Premium carry objects for the modern professional.",
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
          href="/satset3d/glb/bener-final.glb"
          as="fetch"
          type="model/gltf-binary"
          crossOrigin="anonymous"
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${playfair.variable} antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only fixed left-4 top-4 z-[10000] rounded-md bg-white px-4 py-2 text-sm font-medium text-[#0a0f16]"
        >
          Skip to main content
        </a>
        <AuthProvider>
          <LoadingProvider>
            <ScrollProvider>
              <div id="main-content" tabIndex={-1}>
                {children}
              </div>
            </ScrollProvider>
          </LoadingProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
