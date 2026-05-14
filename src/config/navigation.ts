/**
 * Navigation configuration
 * Centralized navigation links and section tracking
 */

export interface NavLink {
    label: string;
    href: string;
}

/**
 * Main navigation links
 * Includes home page sections (with hash) and other pages
 */
export const NAV_LINKS: NavLink[] = [
    { label: "Showcase", href: "/#showcase" },
    { label: "Products", href: "/products" },
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
];

/**
 * Section IDs to track for active section highlighting
 * Used by IntersectionObserver on home page only
 * When adding new sections, add their ID here for scroll detection
 */
export const OBSERVED_SECTION_IDS = ["showcase"] as const;

/**
 * Mobile menu element ID
 * Used to identify and manage the mobile navigation menu
 */
export const MOBILE_MENU_ID = "mobile-site-menu";

/**
 * Hash navigation map
 * Maps hash fragments to their corresponding section IDs
 */
export const HASH_SECTION_MAP: Record<string, string> = {
    "#showcase": "showcase",
    "#materials": "materials",
    "#features": "features",
    "#specs": "specs",
    "#shop": "shop",
    "#stats": "stats",
} as const;

/**
 * Check if a href is a section link (starts with #)
 */
export const isSectionLink = (href: string): boolean => {
    return href.startsWith("/#");
};

/**
 * Extract section ID from hash link
 */
export const getSectionIdFromHref = (href: string): string | null => {
    if (!isSectionLink(href)) return null;
    return href.substring(2); // Remove "/#"
};

/**
 * Check if a nav link is active
 * @param href - The href to check
 * @param activeSection - Currently active section ID
 * @param currentPath - Current pathname
 */
export const isNavLinkActive = (
    href: string,
    activeSection: string,
    currentPath: string
): boolean => {
    if (isSectionLink(href)) {
        return activeSection === href.slice(2);
    }
    return currentPath === href || (href.length > 1 && currentPath.startsWith(href));
};
