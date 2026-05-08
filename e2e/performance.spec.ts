/* eslint-disable @typescript-eslint/no-explicit-any */
import { test, expect } from "@playwright/test";
import fs from "fs";
import path from "path";

test("capture performance metrics for /showcase", async ({ page }) => {
    // Set viewport to typical desktop size
    await page.setViewportSize({ width: 1920, height: 1080 });

    // Navigate with longer timeout for slow loads
    await page.goto("http://localhost:3000/showcase", { waitUntil: "domcontentloaded", timeout: 30000 });

    // Wait a bit for React hydration and dynamic content to load
    await page.waitForTimeout(2000);

    // Inject performance telemetry
    await page.evaluate(() => {
        // Initialize collector from browser context
        const script = document.createElement("script");
        script.textContent = `
            window.__perfCollector = {
                fps: [],
                frameCount: 0,
                lastTime: performance.now(),
                startFPS() {
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
                        requestAnimationFrame(tick);
                    };
                    requestAnimationFrame(tick);
                },
                stopFPS() {
                    // Stops naturally after test ends
                },
                getMetrics() {
                    const cwv = {
                        ttfb: 0,
                    };
                    const navTiming = performance.getEntriesByType("navigation")[0];
                    if (navTiming) {
                        cwv.ttfb = (navTiming as any).responseStart - (navTiming as any).fetchStart;
                    }

                    // Get LCP
                    const lcpEntries = performance.getEntriesByType("largest-contentful-paint");
                    if (lcpEntries.length > 0) {
                        const lastLcp = lcpEntries[lcpEntries.length - 1];
                        cwv.lcp = (lastLcp as any).renderTime || (lastLcp as any).loadTime;
                    }

                    // Get CLS
                    let cls = 0;
                    const clsEntries = performance.getEntriesByType("layout-shift");
                    clsEntries.forEach((entry) => {
                        if (!(entry as any).hadRecentInput) {
                            cls += (entry as any).value;
                        }
                    });
                    cwv.cls = cls;

                    const avgFps = this.fps.length > 0 ? this.fps.reduce((a, b) => a + b, 0) / this.fps.length : 0;

                    return {
                        fps: {
                            current: this.fps.length > 0 ? this.fps[this.fps.length - 1] : 0,
                            average: avgFps,
                            min: this.fps.length > 0 ? Math.min(...this.fps) : 0,
                            max: this.fps.length > 0 ? Math.max(...this.fps) : 0,
                            samples: this.fps.length,
                        },
                        cwv,
                        memory: (performance as any).memory ? {
                            jsHeapSizeLimit: (performance as any).memory.jsHeapSizeLimit,
                            totalJSHeapSize: (performance as any).memory.totalJSHeapSize,
                            usedJSHeapSize: (performance as any).memory.usedJSHeapSize,
                        } : null,
                    };
                }
            };
            window.__perfCollector.startFPS();
        `;
        document.head.appendChild(script);
    });

    // Wait for 3D viewer to be interactive (look for canvas or material-viewer)
    const canvasLocator = page.locator("canvas").first();

    try {
        // Try to find the material-viewer first (indicates page is fully loaded)
        await page.waitForSelector(".material-viewer", { timeout: 5000 });
    } catch {
        // If material-viewer not found quickly, just wait for any canvas (indicates 3D rendering started)
        await canvasLocator.waitFor({ timeout: 15000 });
    }

    // Give the page an extra moment to settle
    await page.waitForTimeout(1000);

    // Simulate user interaction: rotate/zoom the 3D model
    console.log("Simulating 3D viewer interaction (rotate + zoom)...");
    const canvasLocator2 = page.locator("canvas").first();
    const box = await canvasLocator2.boundingBox();

    if (box) {
        // Drag to rotate
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
        await page.mouse.down();
        await page.mouse.move(box.x + box.width / 2 + 100, box.y + box.height / 2 + 100, { steps: 50 });
        await page.mouse.up();

        // Scroll to zoom
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
        for (let i = 0; i < 5; i++) {
            await page.mouse.wheel(0, -50);
            await page.waitForTimeout(100);
        }
    }

    // Let performance stabilize
    await page.waitForTimeout(2000);

    // Collect metrics
    const metrics = await page.evaluate(() => {
        return (window as any).__perfCollector.getMetrics();
    });

    console.log("Performance Metrics Collected:", JSON.stringify(metrics, null, 2));

    const report = {
        timestamp: new Date().toISOString(),
        url: "http://localhost:3000/showcase",
        viewport: { width: 1920, height: 1080 },
        customMetrics: metrics,
    };

    // Save report to JSON
    const reportPath = path.join(process.cwd(), "performance-report.json");
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`Report saved to: ${reportPath}`);

    // Generate HTML report
    const htmlReport = generateHtmlReport(report);
    const htmlPath = path.join(process.cwd(), "performance-report.html");
    fs.writeFileSync(htmlPath, htmlReport);
    console.log(`HTML report saved to: ${htmlPath}`);

    // Assertions
    expect(metrics.fps.average).toBeGreaterThan(20); // At least 20 FPS average
    expect(metrics.cwv.cls).toBeLessThan(0.1); // CLS should be low
});

function generateHtmlReport(data: any): string {
    const { customMetrics, browserMetrics, timestamp, url, viewport } = data;
    const fps = customMetrics.fps;
    const cwv = customMetrics.cwv;

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Performance Report - SatSet</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
            color: #fff;
            padding: 2rem;
            line-height: 1.6;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        h1 {
            font-size: 2.5rem;
            margin-bottom: 0.5rem;
            background: linear-gradient(135deg, #fff 0%, #ccc 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .meta {
            color: #999;
            font-size: 0.9rem;
            margin-bottom: 2rem;
        }
        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 1.5rem;
            margin-bottom: 2rem;
        }
        .card {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            padding: 1.5rem;
            backdrop-filter: blur(10px);
        }
        .card h2 {
            font-size: 1.2rem;
            margin-bottom: 1rem;
            color: #4da6ff;
        }
        .metric {
            display: flex;
            justify-content: space-between;
            padding: 0.5rem 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        .metric:last-child {
            border-bottom: none;
        }
        .metric-label {
            color: #aaa;
        }
        .metric-value {
            font-weight: 600;
            color: #fff;
            font-family: 'Monaco', monospace;
        }
        .good { color: #4ade80; }
        .warn { color: #facc15; }
        .bad { color: #f87171; }
        .chart-container {
            background: rgba(0, 0, 0, 0.3);
            border-radius: 8px;
            padding: 1rem;
            margin-top: 1rem;
        }
        .bar {
            display: flex;
            align-items: center;
            margin-bottom: 0.5rem;
        }
        .bar-label {
            width: 100px;
            font-size: 0.9rem;
            color: #aaa;
        }
        .bar-fill {
            flex: 1;
            height: 24px;
            background: linear-gradient(90deg, #4da6ff, #4ade80);
            border-radius: 4px;
            margin: 0 0.5rem;
            position: relative;
        }
        .bar-value {
            width: 80px;
            text-align: right;
            font-family: 'Monaco', monospace;
            font-size: 0.9rem;
        }
        .summary {
            background: rgba(77, 166, 255, 0.1);
            border-left: 4px solid #4da6ff;
            padding: 1.5rem;
            border-radius: 8px;
            margin-bottom: 2rem;
        }
        .summary h3 {
            margin-bottom: 0.5rem;
        }
        .summary p {
            color: #ccc;
            font-size: 0.95rem;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>⚡ Performance Report</h1>
        <div class="meta">
            <strong>URL:</strong> ${url}<br />
            <strong>Viewport:</strong> ${viewport.width}×${viewport.height}<br />
            <strong>Tested:</strong> ${timestamp}
        </div>

        <div class="summary">
            <h3>Summary</h3>
            <p>
                3D viewer on /showcase page. Metrics include FPS during interaction (rotate/zoom),
                Core Web Vitals, and memory consumption.
            </p>
        </div>

        <div class="grid">
            <!-- FPS Card -->
            <div class="card">
                <h2>FPS Performance</h2>
                <div class="metric">
                    <span class="metric-label">Average FPS</span>
                    <span class="metric-value ${fps.average > 50 ? 'good' : fps.average > 30 ? 'warn' : 'bad'}">
                        ${fps.average.toFixed(1)}
                    </span>
                </div>
                <div class="metric">
                    <span class="metric-label">Min FPS</span>
                    <span class="metric-value">${fps.min.toFixed(1)}</span>
                </div>
                <div class="metric">
                    <span class="metric-label">Max FPS</span>
                    <span class="metric-value">${fps.max.toFixed(1)}</span>
                </div>
                <div class="metric">
                    <span class="metric-label">Samples</span>
                    <span class="metric-value">${fps.samples}</span>
                </div>
                <div class="chart-container">
                    <div class="bar">
                        <span class="bar-label">Target 60</span>
                        <div class="bar-fill" style="width: ${Math.min(fps.average / 60 * 100, 100)}%"></div>
                        <span class="bar-value">${(fps.average / 60 * 100).toFixed(0)}%</span>
                    </div>
                </div>
            </div>

            <!-- Core Web Vitals Card -->
            <div class="card">
                <h2>Core Web Vitals</h2>
                ${cwv.lcp ? `
                <div class="metric">
                    <span class="metric-label">LCP (ms)</span>
                    <span class="metric-value ${cwv.lcp < 2500 ? 'good' : cwv.lcp < 4000 ? 'warn' : 'bad'}">
                        ${cwv.lcp.toFixed(0)}
                    </span>
                </div>
                ` : ''}
                <div class="metric">
                    <span class="metric-label">CLS</span>
                    <span class="metric-value ${cwv.cls < 0.1 ? 'good' : cwv.cls < 0.25 ? 'warn' : 'bad'}">
                        ${cwv.cls.toFixed(3)}
                    </span>
                </div>
                <div class="metric">
                    <span class="metric-label">TTFB (ms)</span>
                    <span class="metric-value ${cwv.ttfb < 600 ? 'good' : 'warn'}">
                        ${cwv.ttfb.toFixed(0)}
                    </span>
                </div>
            </div>

            <!-- Memory Card -->
            ${customMetrics.memory ? `
            <div class="card">
                <h2>Memory Usage</h2>
                <div class="metric">
                    <span class="metric-label">JS Heap Used</span>
                    <span class="metric-value">${(customMetrics.memory.usedJSHeapSize / 1048576).toFixed(2)} MB</span>
                </div>
                <div class="metric">
                    <span class="metric-label">JS Heap Total</span>
                    <span class="metric-value">${(customMetrics.memory.totalJSHeapSize / 1048576).toFixed(2)} MB</span>
                </div>
                <div class="metric">
                    <span class="metric-label">Heap Limit</span>
                    <span class="metric-value">${(customMetrics.memory.jsHeapSizeLimit / 1048576).toFixed(2)} MB</span>
                </div>
            </div>
            ` : ''}

            <!-- Browser Metrics Card -->
            <div class="card">
                <h2>Browser Metrics</h2>
                <div class="metric">
                    <span class="metric-label">Documents</span>
                    <span class="metric-value">${browserMetrics.Documents}</span>
                </div>
                <div class="metric">
                    <span class="metric-label">Frames</span>
                    <span class="metric-value">${browserMetrics.Frames}</span>
                </div>
                <div class="metric">
                    <span class="metric-label">Event Listeners</span>
                    <span class="metric-value">${browserMetrics.JSEventListeners}</span>
                </div>
                <div class="metric">
                    <span class="metric-label">Layouts Triggered</span>
                    <span class="metric-value">${browserMetrics.LayoutCount}</span>
                </div>
                <div class="metric">
                    <span class="metric-label">Style Recalcs</span>
                    <span class="metric-value">${browserMetrics.RecalcStyleCount}</span>
                </div>
            </div>
        </div>

        <div class="card" style="margin-top: 2rem;">
            <h2>Recommendations</h2>
            <div style="color: #ccc; line-height: 1.8;">
                ${fps.average < 30 ? `
                <p>⚠️ <strong>FPS Below Target:</strong> Consider reducing texture resolution or enabling energy-saving mode for lower-end devices.</p>
                ` : fps.average < 50 ? `
                <p>⚡ <strong>FPS Acceptable but Could Improve:</strong> Profile the 3D scene with DevTools; check if model complexity or material count can be reduced.</p>
                ` : `
                <p>✅ <strong>FPS Excellent:</strong> 3D rendering performance is good. Monitor on actual target devices.</p>
                `}

                ${cwv.cls > 0.1 ? `
                <p>⚠️ <strong>Layout Shift Detected:</strong> Review dynamic content loading and component sizing.</p>
                ` : `
                <p>✅ <strong>Layout Stability Good:</strong> CLS is within acceptable range.</p>
                `}

                <p style="margin-top: 1rem; font-size: 0.9rem; color: #999;">
                    Report generated on ${new Date().toLocaleString()}
                </p>
            </div>
        </div>
    </div>
</body>
</html>
    `;
}
