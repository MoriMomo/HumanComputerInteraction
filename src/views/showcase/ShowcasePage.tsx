"use client";

import { useEffect, useState } from "react";
import { SWATCHES } from "@/config/swatches";
import { useLoading } from "@/contexts/LoadingProvider";
import GPUMonitor from "@/components/debug/GPUMonitor";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import MaterialSection from "@/components/sections/MaterialSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ShopSection from "@/components/sections/ShopSection";
import StatsSection from "@/components/sections/StatsSection";

const ENABLE_3D_MODEL = true;

export default function ShowcasePage() {
  const [activeColor, setActiveColor] = useState(() => SWATCHES[0]?.hex ?? "#231711");
  const { isLoading } = useLoading();
  const [assetsReady, setAssetsReady] = useState(() => !ENABLE_3D_MODEL);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    let isCancelled = false;
    const timers: number[] = [];

    if (isLoading) {
      // Defer state updates to avoid calling setState synchronously inside
      // the effect (triggers react-hooks/set-state-in-effect).
      const id = window.setTimeout(() => {
        if (!isCancelled) {
          setContentVisible(false);
          setAssetsReady(!ENABLE_3D_MODEL);
        }
      }, 0);

      timers.push(id);
      return undefined;
    }

    timers.push(
      window.setTimeout(() => {
        if (isCancelled) {
          return;
        }

        window.requestAnimationFrame(() => {
          if (!isCancelled) {
            setContentVisible(true);
          }
        });
      }, 120)
    );

    if (ENABLE_3D_MODEL) {
      timers.push(
        window.setTimeout(() => {
          if (!isCancelled) {
            setAssetsReady(true);
          }
        }, 2300)
      );
    }

    return () => {
      isCancelled = true;
      timers.forEach((timerId) => window.clearTimeout(timerId));
    };
  }, [isLoading]);

  const loadingComplete = !isLoading;

  return (
    <main className="relative min-h-screen bg-white">
      <div
        className={`page-content ${contentVisible ? "loaded" : ""} relative z-10`}
      >
        <div className="page-shell text-black font-sans min-h-screen relative overflow-x-hidden bg-white">
          <Navbar />
          <div className="homepage-light relative w-full">
            <HeroSection
              activeColor={activeColor}
              show3DModel={loadingComplete}
            />
          </div>

          <StatsSection videoSrc="/video/Create_video_of_cards_engineered_202605181051.mp4" />

          <MaterialSection
            activeColor={activeColor}
            onColorChange={setActiveColor}
            show3DModel={ENABLE_3D_MODEL && assetsReady}
          />

          <FeaturesSection />

          <TestimonialsSection />

          <ShopSection />

          <Footer />
        </div>
      </div>

      {process.env.NODE_ENV === "development" && <GPUMonitor />}
    </main>
  );
}
