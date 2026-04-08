"use client";

import Link, { type LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { forwardRef, type AnchorHTMLAttributes, type MouseEvent, type PropsWithChildren } from "react";
import { useLoading } from "@/contexts/LoadingProvider";

type LoadingLinkProps = PropsWithChildren<Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & LinkProps & {
    href: string;
}>;

function shouldStartLoading(href: string, pathname: string) {
    if (!href.startsWith("/")) {
        return false;
    }

    if (href.startsWith("/#")) {
        return false;
    }

    const route = href.split("?")[0].split("#")[0];

    return route.length > 0 && route !== pathname;
}

const LoadingLink = forwardRef<HTMLAnchorElement, LoadingLinkProps>(function LoadingLink(
    { href, onClick, ...props },
    ref
) {
    const pathname = usePathname();
    const { startLoading } = useLoading();

    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
        if (shouldStartLoading(href, pathname)) {
            startLoading();
        }

        onClick?.(event);
    };

    return <Link ref={ref} href={href} onClick={handleClick} {...props} />;
});

export default LoadingLink;
