const FALLBACK_SITE_URL = "http://localhost:3000";

function stripTrailingSlash(value: string) {
    return value.endsWith("/") ? value.slice(0, -1) : value;
}

function normalizeApiBaseUrl(value: string) {
    const trimmed = value.trim();

    if (!trimmed) {
        return "/api";
    }

    if (/^https?:\/\//i.test(trimmed)) {
        try {
            const url = new URL(trimmed);
            const normalizedPath = stripTrailingSlash(url.pathname || "");

            if (!normalizedPath || normalizedPath === "/") {
                return "/api";
            }

            return normalizedPath.endsWith("/api") ? normalizedPath : `${normalizedPath}/api`;
        } catch {
            return "/api";
        }
    }

    const path = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
    return stripTrailingSlash(path);
}

export function getSiteUrl() {
    return stripTrailingSlash(process.env.NEXT_PUBLIC_SITE_URL?.trim() || FALLBACK_SITE_URL);
}

export function getApiBaseUrl() {
    return normalizeApiBaseUrl(process.env.NEXT_PUBLIC_API_BASE_URL || "/api");
}
