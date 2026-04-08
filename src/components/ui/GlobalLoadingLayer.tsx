"use client";

import LoadingOverlay from "@/components/ui/LoadingOverlay";
import { useLoading } from "@/contexts/LoadingProvider";

export default function GlobalLoadingLayer() {
    const { isLoading, stopLoading } = useLoading();

    if (!isLoading) {
        return null;
    }

    return <LoadingOverlay onComplete={stopLoading} />;
}
