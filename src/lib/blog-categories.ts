import { BLOG_POSTS } from "@/data/blog";

export const BLOG_CATEGORIES = ["materials", "workflow", "engineering"] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

const BLOG_CATEGORY_MAP: Record<string, BlogCategory> = {
    "minimalist-carry-essentials": "workflow",
    "premium-materials-guide": "materials",
    "office-organization-tips": "workflow",
    "how-we-test-daily-carry": "engineering",
    "why-weight-distribution-matters": "engineering",
    "rfid-myths-and-real-utility": "engineering",
    "finish-selection-for-long-term-use": "materials",
    "designing-for-one-handed-use": "engineering",
};

export function getBlogCategory(slug: string): BlogCategory {
    return BLOG_CATEGORY_MAP[slug] ?? "workflow";
}

export function getPostsByCategory(category: BlogCategory) {
    return BLOG_POSTS.filter((post) => getBlogCategory(post.slug) === category);
}

export function formatCategoryLabel(category: BlogCategory) {
    if (category === "workflow") return "Carry Workflow";
    if (category === "materials") return "Materials";
    return "Engineering";
}
