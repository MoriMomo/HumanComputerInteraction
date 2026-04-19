import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/data/blog";
import { PRODUCTS } from "@/data/products";
import { BLOG_CATEGORIES } from "@/lib/blog-categories";
import { getSiteUrl } from "@/lib/site-url";

const BASE_URL = getSiteUrl();

export default function sitemap(): MetadataRoute.Sitemap {
    const staticRoutes: MetadataRoute.Sitemap = [
        "",
        "/about",
        "/products",
        "/blog",
        "/cart",
        "/auth/login",
        "/auth/signup",
    ].map((path) => ({
        url: `${BASE_URL}${path}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: path === "" ? 1 : 0.7,
    }));

    const productRoutes: MetadataRoute.Sitemap = PRODUCTS.map((product) => ({
        url: `${BASE_URL}/products/${product.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
    }));

    const blogRoutes: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
        url: `${BASE_URL}/blog/${post.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.65,
    }));

    const categoryRoutes: MetadataRoute.Sitemap = BLOG_CATEGORIES.map((category) => ({
        url: `${BASE_URL}/blog/category/${category}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.55,
    }));

    return [...staticRoutes, ...productRoutes, ...blogRoutes, ...categoryRoutes];
}
