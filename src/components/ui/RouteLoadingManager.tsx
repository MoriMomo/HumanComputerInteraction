"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useLoading } from "@/contexts/LoadingProvider";

export default function RouteLoadingManager() {
    const pathname = usePathname();
    const { isLoading, startLoading } = useLoading();
    const previousRouteRef = useRef<string | null>(null);

    useEffect(() => {
        const currentRoute = pathname;

        if (previousRouteRef.current === null) {
            previousRouteRef.current = currentRoute;
            return;
        }

        if (currentRoute !== previousRouteRef.current && !isLoading) {
            startLoading();
        }

        previousRouteRef.current = currentRoute;
    }, [isLoading, pathname, startLoading]);

    return null;
}
