"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useDebounce } from "@/hooks/useDebounce";

gsap.registerPlugin(ScrollTrigger);

interface ScrollContextType {
    isScrolling: boolean;
}

const ScrollContext = createContext<ScrollContextType>({ isScrolling: false });

export function ScrollProvider({ children }: { children: ReactNode }) {
    const [scrollSignal, setScrollSignal] = useState(0);
    const debouncedScrollSignal = useDebounce(scrollSignal, 140);
    const isScrolling = scrollSignal !== debouncedScrollSignal;

    useEffect(() => {
        // Let Lenis manage the RAF loop (reduces duplicate RAFs and main-thread work)
        const lenis = new Lenis({
            duration: 1.2,
            easing: (value: number) => Math.min(1, 1.001 - Math.pow(2, -10 * value)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            syncTouch: false,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            infinite: false,
            autoRaf: true,
        });

        const handleScroll = () => {
            setScrollSignal((previous) => previous + 1);
            // Allow GSAP's ScrollTrigger to update when scroll events happen
            ScrollTrigger.update();
        };

        const handleRefresh = () => {
            lenis.resize();
        };

        lenis.on("scroll", handleScroll);
        ScrollTrigger.addEventListener("refresh", handleRefresh);
        // Ensure ScrollTrigger picks up the initial sizes
        ScrollTrigger.refresh();

        return () => {
            ScrollTrigger.removeEventListener("refresh", handleRefresh);
            lenis.destroy();
        };
    }, []);

    const contextValue = useMemo(
        () => ({ isScrolling }),
        [isScrolling]
    );

    return (
        <ScrollContext.Provider value={contextValue}>
            {children}
        </ScrollContext.Provider>
    );
}

export function useScroll() {
    return useContext(ScrollContext);
}