import { PRODUCTS } from "@/data/products";
import { getSiteUrl } from "@/lib/site-url";
import { Metadata } from "next";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const product = PRODUCTS.find((p) => p.slug === slug);

    if (!product) {
        return {
            title: "Product Not Found",
        };
    }

    return {
        title: product.name,
        description: product.description,
        alternates: {
            canonical: `/products/${product.slug}`,
        },
        openGraph: {
            title: product.name,
            description: product.description,
            url: `${getSiteUrl()}/products/${product.slug}`,
            siteName: "SatSet",
            images: [
                {
                    url: product.image?.src || "/placeholder-image.jpg",
                    width: 800,
                    height: 600,
                    alt: product.image?.alt || product.name,
                },
            ],
            type: "website",
        },
    };
}

export default function ProductLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
