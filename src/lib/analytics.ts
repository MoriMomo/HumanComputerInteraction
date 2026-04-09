export interface AnalyticsPayload {
    [key: string]: string | number | boolean | null | undefined;
}

export function trackEvent(event: string, payload: AnalyticsPayload = {}) {
    if (typeof window === "undefined") return;

    const dataLayer = (window as Window & { dataLayer?: Array<Record<string, unknown>> }).dataLayer;
    if (Array.isArray(dataLayer)) {
        dataLayer.push({ event, ...payload });
    }

    window.dispatchEvent(new CustomEvent("satset-analytics", { detail: { event, payload } }));
}
