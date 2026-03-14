"use client";

import { useEffect, useState } from "react";
import LoadingOverlay from "@/components/ui/LoadingOverlay";
import { DEFAULT_STL_PARTS } from "@/components/3d/modelAssets";
import GPUMonitor from "@/components/debug/GPUMonitor";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import MaterialSection from "@/components/sections/MaterialSection";
import SpecsSection from "@/components/sections/SpecsSection";
import ShopSection from "@/components/sections/ShopSection";

const MINIMUM_SPLASH_MS = 1800;

export default function Home() {
  const [activeColor, setActiveColor] = useState("#B48A63");
  const [isExperienceReady, setIsExperienceReady] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    let isCancelled = false;
    let completedTasks = 0;
    const failSafeTimeout = window.setTimeout(() => {
      if (!isCancelled) {
        setLoadingProgress(100);
        setIsExperienceReady(true);
      }
    }, 12000);

    const preloadTargets = [
      ...DEFAULT_STL_PARTS,
      "scene-module",
    ];

    const updateProgress = () => {
      completedTasks += 1;

      if (!isCancelled) {
        setLoadingProgress(
          Math.min(100, Math.round((completedTasks / preloadTargets.length) * 100))
        );
      }
    };

    const preloadModelAssets = DEFAULT_STL_PARTS.map((assetPath) =>
      fetch(assetPath, { cache: "force-cache" })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to preload ${assetPath}`);
          }

          return response.arrayBuffer();
        })
        .catch(() => null)
        .finally(updateProgress)
    );

    const preloadSceneModule = import("@/components/3d/CardHolderScene")
      .catch(() => null)
      .finally(updateProgress);

    const minimumDelay = new Promise((resolve) => {
      window.setTimeout(resolve, MINIMUM_SPLASH_MS);
    });

    Promise.allSettled([
      ...preloadModelAssets,
      preloadSceneModule,
      minimumDelay,
    ]).finally(() => {
      if (!isCancelled) {
        setLoadingProgress(100);
        setIsExperienceReady(true);
      }
    });

    return () => {
      isCancelled = true;
      window.clearTimeout(failSafeTimeout);
    };
  }, []);

  if (!isExperienceReady) {
    return <LoadingOverlay progressValue={loadingProgress} />;
  }

  return (
    <div className="bg-background-light text-charcoal font-sans min-h-screen relative overflow-x-hidden">
      <div className="px-4 md:px-10 lg:px-20 pt-5 max-w-350 mx-auto">
        <Navbar />
      </div>

      <div className="px-4 md:px-10 lg:px-20 max-w-350 mx-auto">
        <HeroSection activeColor={activeColor} />
      </div>

      <MaterialSection activeColor={activeColor} onColorChange={setActiveColor} />

      <FeaturesSection />

      <SpecsSection />

      <ShopSection />

      <Footer />

      {process.env.NODE_ENV === "development" && <GPUMonitor />}
    </div>
  );
}
