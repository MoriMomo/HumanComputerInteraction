"use client";
import { ReactLenis } from '@studio-freight/react-lenis';

export default function Providers({ children }) {
    return (
        <ReactLenis
            root
            options={{
                lerp: 0.05,
                duration: 1.5,
                smoothWheel: true,
                smoothTouch: false,
                wheelMultiplier: 1.2,
                touchMultiplier: 2,
            }}
        >
            {children}
        </ReactLenis>
    );
}
