import React from "react";

interface SafeJsonLdProps {
    data: Record<string, unknown>;
}

export default function SafeJsonLd({ data }: SafeJsonLdProps) {
    // Safely stringify the JSON data, escaping `<` and `>` to prevent XSS
    // Specifically, replacing < with \u003c and > with \u003e
    const safeJson = JSON.stringify(data).replace(/</g, '\\u003c').replace(/>/g, '\\u003e');

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: safeJson }}
        />
    );
}
