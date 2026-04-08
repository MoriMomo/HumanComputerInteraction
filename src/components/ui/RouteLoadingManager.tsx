"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useLoading } from "@/contexts/LoadingProvider";

export default function RouteLoadingManager() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { isLoading, startLoading } = useLoading();
    const previousRouteRef = useRef<string | null>(null);

    useEffect(() => {
        const currentRoute = `${pathname}?${searchParams.toString()}`;

        if (previousRouteRef.current === null) {
            previousRouteRef.current = currentRoute;
            return;
        }

        if (currentRoute !== previousRouteRef.current && !isLoading) {
            startLoading();
        }

        previousRouteRef.current = currentRoute;
    }, [isLoading, pathname, searchParams, startLoading]);

    return null;
}
