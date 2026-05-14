"use client";

import dynamic from "next/dynamic";
import { useLoading } from "@/contexts/LoadingProvider";

const LoadingOverlay = dynamic(() => import("@/components/ui/LoadingOverlay"), {
    ssr: false,
    loading: () => null,
});

export default function GlobalLoadingLayer() {
    const { isLoading, stopLoading } = useLoading();

    if (!isLoading) {
        return null;
    }

    return <LoadingOverlay onComplete={stopLoading} />;
}
