import { BLOG_POSTS } from "@/data/blog";
import { getSiteUrl } from "@/lib/site-url";
import { Metadata } from "next";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const post = BLOG_POSTS.find((p) => p.slug === slug);

    if (!post) {
        return {
            title: "Post Not Found",
        };
    }

    return {
        title: post.title,
        description: post.excerpt,
        alternates: {
            canonical: `/blog/${post.slug}`,
        },
        openGraph: {
            title: post.title,
            description: post.excerpt,
            url: `${getSiteUrl()}/blog/${post.slug}`,
            siteName: "SatSet Journal",
            type: "article",
            publishedTime: new Date(post.date).toISOString(),
        },
    };
}

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
