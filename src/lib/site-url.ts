const FALLBACK_SITE_URL = "http://localhost:3000";

function stripTrailingSlash(value: string) {
    return value.endsWith("/") ? value.slice(0, -1) : value;
}

export function getSiteUrl() {
    return stripTrailingSlash(process.env.NEXT_PUBLIC_SITE_URL?.trim() || FALLBACK_SITE_URL);
}

export function getApiBaseUrl() {
    return process.env.NEXT_PUBLIC_API_BASE_URL?.trim() || "/api";
}
