/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Performance telemetry utilities for collecting FPS, CWV, and interaction metrics.
 * Designed to be injected on-demand (dev/test environments).
 */

export interface PerformanceMetrics {
    fps: {
        current: number;
        average: number;
        min: number;
        max: number;
        samples: number;
    };
    cwv: {
        lcp?: number;
        fid?: number;
        cls?: number;
        ttfb?: number;
    };
    memory?: {
        jsHeapSizeLimit: number;
        totalJSHeapSize: number;
        usedJSHeapSize: number;
    };
    timing: {
        navigationStart: number;
        domContentLoaded: number;
        loadComplete: number;
        firstPaint?: number;
        firstContentfulPaint?: number;
    };
}

class PerformanceCollector {
    private frameCount = 0;
    private lastTime = performance.now();
    private fps: number[] = [];
    private cwvMetrics: Partial<PerformanceMetrics["cwv"]> = {};
    private timingMarkers: Partial<PerformanceMetrics["timing"]> = {};
    private animationFrameId: number | null = null;

    constructor() {
        this.recordNavigationTiming();
        this.setupCWVObservers();
    }

    private recordNavigationTiming() {
        const navTiming = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming & {
            navigationStart?: number;
        };
        if (navTiming) {
            const navigationStart = navTiming.navigationStart ?? 0;
            this.timingMarkers.navigationStart = navigationStart;
            this.timingMarkers.domContentLoaded = navTiming.domContentLoadedEventEnd - navigationStart;
            this.timingMarkers.loadComplete = navTiming.loadEventEnd - navigationStart;
        }

        const paintEntries = performance.getEntriesByType("paint");
        paintEntries.forEach((entry) => {
            if (entry.name === "first-paint") {
                this.timingMarkers.firstPaint = entry.startTime;
            }
            if (entry.name === "first-contentful-paint") {
                this.timingMarkers.firstContentfulPaint = entry.startTime;
            }
        });
    }

    private setupCWVObservers() {
        // LCP (Largest Contentful Paint)
        try {
            const lcpObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1] as PerformanceEntry & {
                    renderTime?: number;
                    loadTime?: number;
                };
                this.cwvMetrics.lcp = lastEntry.renderTime || lastEntry.loadTime;
            });
            lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });
        } catch (e) {
            // LCP not supported
        }

        // FID (First Input Delay) or INP (Interaction to Next Paint)
        try {
            const fidObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                if (entries.length > 0) {
                    const firstEntry = entries[0];
                    this.cwvMetrics.fid = (firstEntry as any).processingDuration || 0;
                }
            });
            fidObserver.observe({ entryTypes: ["first-input"] });
        } catch (e) {
            // FID not supported
        }

        // CLS (Cumulative Layout Shift)
        try {
            let clsValue = 0;
            const clsObserver = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (!(entry as any).hadRecentInput) {
                        clsValue += (entry as any).value;
                    }
                }
                this.cwvMetrics.cls = clsValue;
            });
            clsObserver.observe({ entryTypes: ["layout-shift"] });
        } catch (e) {
            // CLS not supported
        }

        // TTFB (Time to First Byte)
        const navTiming = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
        if (navTiming) {
            this.cwvMetrics.ttfb = navTiming.responseStart - navTiming.fetchStart;
        }
    }

    startFPSTracking() {
        const tick = () => {
            this.frameCount++;
            const now = performance.now();
            const delta = now - this.lastTime;

            if (delta >= 1000) {
                const currentFps = (this.frameCount * 1000) / delta;
                this.fps.push(currentFps);
                this.frameCount = 0;
                this.lastTime = now;
            }

            this.animationFrameId = requestAnimationFrame(tick);
        };

        this.animationFrameId = requestAnimationFrame(tick);
    }

    stopFPSTracking() {
        if (this.animationFrameId !== null) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
    }

    getMetrics(): PerformanceMetrics {
        let memory: PerformanceMetrics["memory"] | undefined;
        if ((performance as any).memory) {
            const mem = (performance as any).memory as {
                jsHeapSizeLimit: number;
                totalJSHeapSize: number;
                usedJSHeapSize: number;
            };
            memory = {
                jsHeapSizeLimit: mem.jsHeapSizeLimit,
                totalJSHeapSize: mem.totalJSHeapSize,
                usedJSHeapSize: mem.usedJSHeapSize,
            };
        }

        const avgFps = this.fps.length > 0 ? this.fps.reduce((a, b) => a + b, 0) / this.fps.length : 0;
        const minFps = this.fps.length > 0 ? Math.min(...this.fps) : 0;
        const maxFps = this.fps.length > 0 ? Math.max(...this.fps) : 0;

        return {
            fps: {
                current: this.fps.length > 0 ? this.fps[this.fps.length - 1] : 0,
                average: avgFps,
                min: minFps,
                max: maxFps,
                samples: this.fps.length,
            },
            cwv: this.cwvMetrics,
            memory,
            timing: this.timingMarkers as PerformanceMetrics["timing"],
        };
    }

    reset() {
        this.fps = [];
        this.frameCount = 0;
        this.lastTime = performance.now();
    }
}

// Singleton instance
let collector: PerformanceCollector | null = null;

export function initPerformanceCollector() {
    if (!collector) {
        collector = new PerformanceCollector();
    }
    return collector;
}

export function getPerformanceCollector() {
    return collector || initPerformanceCollector();
}

export function getPerformanceMetrics(): PerformanceMetrics {
    return getPerformanceCollector().getMetrics();
}

export function startFPSTracking() {
    getPerformanceCollector().startFPSTracking();
}

export function stopFPSTracking() {
    getPerformanceCollector().stopFPSTracking();
}
