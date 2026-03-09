import { MetadataRoute } from 'next';

export default function robots() {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/private/'],
        },
        sitemap: 'https://satset.auralink.dev/sitemap.xml',
    };
}
