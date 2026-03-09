import './globals.css';
import Navbar from '../components/Navbar';
import Providers from '../components/Providers';

export const metadata = {
    title: 'SatSet | Minimalist Card Holders',
    description: 'Premium minimalist card holders and everyday carry accessories.',
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
