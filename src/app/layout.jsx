import './globals.css';
import Navbar from '../components/Navbar';
import Providers from '../components/Providers';

export const metadata = {
    title: {
        template: '%s | SatSet',
        default: 'SatSet | Minimalist Card Holders & EDC',
    },
    description: 'Elevate your everyday carry with the Aura-Link ModuSnap premium minimalist card holders and modular EDC accessories.',
    keywords: ['EDC', 'card holder', 'minimalist wallet', 'modular accessory', 'Aura-Link', 'ModuSnap', '3D printed wallet'],
    authors: [{ name: 'Aura-Link Systems' }],
    creator: 'Aura-Link Systems',
    openGraph: {
        title: 'SatSet | Premium Minimalist Card Holders',
        description: 'Engineered for professionals. Discover the modular ecosystem for your everyday carry.',
        url: 'https://satset.auralink.dev',
        siteName: 'SatSet ModuSnap',
        images: [
            {
                url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVLnBBctRTny20xXQFATtDoFDFgs2dRPk8EkAknFojIdfEQrr3voE0MCNKyia787tCxWjdyLSjpqe-0g4rAvi6thIW6vQxRlJ1PuGmi3n58oPsYVBxGkQhEjbAydsFgOQ2C2k-CO4q0QW5zxCFCnCf1Bnw5R8bheoCNTXukUEVwizDdaXFAZCYIEMRWLCw7yB_WtvMECcTB-cyx0Ay61KkIHVpk8c3mwhKH9Zjz2ABtOkPt8HpSWAi8FxkhEB1ghiPV37VVSLjjBg',
                width: 1200,
                height: 630,
                alt: 'SatSet ModuSnap Open Graph Image',
            },
        ],
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'SatSet | Minimalist Card Holders',
        description: 'The ultimate modular EDC card holder.',
        images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuCVLnBBctRTny20xXQFATtDoFDFgs2dRPk8EkAknFojIdfEQrr3voE0MCNKyia787tCxWjdyLSjpqe-0g4rAvi6thIW6vQxRlJ1PuGmi3n58oPsYVBxGkQhEjbAydsFgOQ2C2k-CO4q0QW5zxCFCnCf1Bnw5R8bheoCNTXukUEVwizDdaXFAZCYIEMRWLCw7yB_WtvMECcTB-cyx0Ay61KkIHVpk8c3mwhKH9Zjz2ABtOkPt8HpSWAi8FxkhEB1ghiPV37VVSLjjBg'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="bg-background-light min-h-screen relative text-charcoal antialiased">
                <Providers>
                    <Navbar />
                    {children}
                </Providers>
            </body>
        </html>
    );
}
