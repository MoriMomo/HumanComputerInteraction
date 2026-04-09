"use client";

import Image, { type ImageProps } from "next/image";

interface SmartImageProps extends Omit<ImageProps, "placeholder" | "blurDataURL"> {
    blurDataURL?: string;
}

const DEFAULT_BLUR_DATA_URL =
    "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%23131b26'/%3E%3Cstop offset='1' stop-color='%231f2a36'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='32' height='32' fill='url(%23g)'/%3E%3C/svg%3E";

export default function SmartImage({
    alt,
    sizes = "(max-width: 768px) 100vw, 50vw",
    quality = 72,
    loading,
    priority,
    blurDataURL,
    ...props
}: SmartImageProps) {
    const resolvedLoading = priority ? undefined : loading ?? "lazy";

    return (
        <Image
            alt={alt}
            sizes={sizes}
            quality={quality}
            loading={resolvedLoading}
            priority={priority}
            placeholder="blur"
            blurDataURL={blurDataURL ?? DEFAULT_BLUR_DATA_URL}
            {...props}
        />
    );
}