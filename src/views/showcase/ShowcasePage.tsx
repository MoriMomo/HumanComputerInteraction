"use client";

import { useCallback, useEffect, useState } from "react";
import LoadingOverlay from "@/components/ui/LoadingOverlay";
import { useLoading } from "@/contexts/LoadingProvider";
import GPUMonitor from "@/components/debug/GPUMonitor";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import MaterialSection from "@/components/sections/MaterialSection";
import ShopSection from "@/components/sections/ShopSection";
import StatsSection from "@/components/sections/StatsSection";

const ENABLE_3D_MODEL = true;

export default function ShowcasePage() {
  const [activeColor, setActiveColor] = useState("#8E9AA6");
  const { isLoading, stopLoading } = useLoading();
  const [loadingComplete, setLoadingComplete] = useState(() => !isLoading);
  const [threeReady, setThreeReady] = useState(() => !ENABLE_3D_MODEL);
  const [assetsReady, setAssetsReady] = useState(() => !isLoading);
  const [contentVisible, setContentVisible] = useState(() => !isLoading);

  const handleLoadingComplete = useCallback(() => {
    stopLoading();
    setLoadingComplete(true);
  }, [stopLoading]);

  const handle3DReady = useCallback(() => {
    setThreeReady(true);
  }, []);

  useEffect(() => {
    if (!loadingComplete) {
      return;
    }

    const fallbackTimer = window.setTimeout(() => {
      setThreeReady(true);
    }, 2200);

    return () => {
      window.clearTimeout(fallbackTimer);
    };
  }, [loadingComplete]);

  useEffect(() => {
    if (!loadingComplete) {
      return;
    }

    const revealTimer = window.setTimeout(() => {
      window.requestAnimationFrame(() => {
        setContentVisible(true);
      });
    }, 120);

    return () => {
      window.clearTimeout(revealTimer);
    };
  }, [loadingComplete]);

  useEffect(() => {
    if (!threeReady && ENABLE_3D_MODEL) {
      return;
    }

    const readyTimer = window.setTimeout(() => {
      setAssetsReady(true);
    }, 100);

    return () => {
      window.clearTimeout(readyTimer);
    };
  }, [threeReady]);

  useEffect(() => {
    if (process.env.NODE_ENV !== "development" || typeof PerformanceObserver === "undefined") {
      return;
    }

    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.duration > 50) {
          console.warn("Long task detected:", entry.name || "unknown", entry.duration);
        }
      });
    });

    try {
      observer.observe({ entryTypes: ["longtask"] });
    } catch {
      return;
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <main className="relative min-h-screen bg-[#0a0f16]">
      {isLoading && (
        <LoadingOverlay minimumDuration={2500} onComplete={handleLoadingComplete} />
      )}

      <div
        className={`page-content ${contentVisible ? "loaded" : ""} relative z-10`}
      >
        <div className="page-shell text-charcoal font-sans min-h-screen relative overflow-x-hidden">
          <Navbar />
          <div className="relative w-full">
            <HeroSection
              activeColor={activeColor}
              show3DModel={loadingComplete}
              loadingComplete={loadingComplete}
              on3DReady={handle3DReady}
            />
          </div>

          <StatsSection />

          <MaterialSection
            activeColor={activeColor}
            onColorChange={setActiveColor}
            show3DModel={ENABLE_3D_MODEL && assetsReady}
          />

          <FeaturesSection />

          <ShopSection />

          <Footer />
        </div>
      </div>

      {process.env.NODE_ENV === "development" && <GPUMonitor />}
    </main>
  );
}
