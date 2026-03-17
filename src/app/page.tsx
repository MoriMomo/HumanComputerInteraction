"use client";

import { useEffect, useState } from "react";
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

const ENABLE_3D_MODEL = false;

export default function Home() {
  const [activeColor, setActiveColor] = useState("#8E9AA6");
  const { isLoading, stopLoading } = useLoading();

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

  if (isLoading) {
    return (
      <main className="relative min-h-screen bg-[#0a0f16]">
        <LoadingOverlay minimumDuration={2500} onComplete={stopLoading} />
      </main>
    );
  }

  return (
    <div className="page-shell text-charcoal font-sans min-h-screen relative overflow-x-hidden">
      <div className="relative z-10">
        <Navbar />
        <div className="relative w-full">
          <HeroSection activeColor={activeColor} show3DModel={true} />
        </div>

        <StatsSection />

        <MaterialSection
          activeColor={activeColor}
          onColorChange={setActiveColor}
          show3DModel={ENABLE_3D_MODEL}
        />

        <FeaturesSection />

        <ShopSection />

        <Footer />
      </div>

      {process.env.NODE_ENV === "development" && <GPUMonitor />}
    </div>
  );
}
