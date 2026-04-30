"use client";

import { useEffect, useState } from "react";

function resolve(input: string) {
    if (typeof window === "undefined") return input;
    const t = (input || "").trim();
    if (!t) return t;
    if (t.startsWith("var(")) {
        try {
            const m = t.match(/^var\(\s*([^,\)]+)\s*(?:,\s*([^\)]+))?\s*\)$/);
            const varName = m ? m[1].trim() : null;
            if (varName) {
                const val = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
                if (val) return val;
            }
        } catch {
            // fall through
        }
        return t;
    }
    return t;
}

export default function useResolvedColor(input: string) {
    const [resolved, setResolved] = useState(() => resolve(input));

    useEffect(() => {
        setResolved(resolve(input));
        if (typeof window === "undefined") return;

        const root = document.documentElement;
        const update = () => setResolved(resolve(input));

        // Observe changes to root class/style (common theme toggles)
        const attrObserver = new MutationObserver(() => update());
        attrObserver.observe(root, { attributes: true, attributeFilter: ["class", "style"] });

        // Observe head for inserted/removed style elements or CSS changes
        const headObserver = new MutationObserver(() => update());
        headObserver.observe(document.head || document.documentElement, { childList: true, subtree: true });

        window.addEventListener("themechange", update as EventListener);

        return () => {
            attrObserver.disconnect();
            headObserver.disconnect();
            window.removeEventListener("themechange", update as EventListener);
        };
    }, [input]);

    return resolved;
}
