"use client";

import { useCallback, useEffect, useState } from "react";
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
  const [activeColor, setActiveColor] = useState("#AAA396");
  const { isLoading } = useLoading();
  const [threeReady, setThreeReady] = useState(() => !ENABLE_3D_MODEL);
  const [assetsReady, setAssetsReady] = useState(() => !isLoading);
  const [contentVisible, setContentVisible] = useState(() => !isLoading);

  const loadingComplete = !isLoading;

  const handle3DReady = useCallback(() => {
    setThreeReady(true);
  }, []);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    const fallbackTimer = window.setTimeout(() => {
      setThreeReady(true);
    }, 2200);

    return () => {
      window.clearTimeout(fallbackTimer);
    };
  }, [isLoading]);

  useEffect(() => {
    if (isLoading) {
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
  }, [isLoading]);

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

  return (
    <main className="relative min-h-screen bg-[#584738]">
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
