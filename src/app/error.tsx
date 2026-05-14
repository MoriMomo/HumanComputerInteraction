"use client";

import { useEffect } from "react";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col items-center justify-center bg-brand-dark px-6 text-center text-white">
            <p className="text-xs uppercase tracking-[0.32em] text-white/50">Something broke</p>
            <h1 className="mt-4 font-serif text-4xl font-bold tracking-tight sm:text-5xl">
                We hit an unexpected error.
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-7 text-white/70 sm:text-base">
                Please retry. If the issue keeps happening, refresh the page or come back in a moment.
            </p>
            <button
                type="button"
                onClick={reset}
                className="mt-8 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
                Try again
            </button>
        </main>
    );
}
