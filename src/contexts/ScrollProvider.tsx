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
        const lenis = new Lenis({
            duration: 1.05,
            easing: (value: number) => Math.min(1, 1.001 - Math.pow(2, -10 * value)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            syncTouch: false,
            wheelMultiplier: 1,
            touchMultiplier: 1.5,
            infinite: false,
            autoRaf: false,
        });

        const handleScroll = () => {
            setScrollSignal((previous) => previous + 1);
            ScrollTrigger.update();
        };

        const handleRefresh = () => {
            lenis.resize();
        };

        const tick = (time: number) => {
            lenis.raf(time * 1000);
        };

        lenis.on("scroll", handleScroll);
        ScrollTrigger.addEventListener("refresh", handleRefresh);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);
        ScrollTrigger.refresh();

        return () => {
            ScrollTrigger.removeEventListener("refresh", handleRefresh);
            gsap.ticker.remove(tick);
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