"use client";

import { useEffect, useState } from "react";
import LoadingOverlay from "@/components/ui/LoadingOverlay";
import { DEFAULT_STL_PARTS } from "@/components/3d/modelAssets";
import GPUMonitor from "@/components/debug/GPUMonitor";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import MaterialSection from "@/components/sections/MaterialSection";
import ShopSection from "@/components/sections/ShopSection";
import StatsSection from "@/components/sections/StatsSection";

const MINIMUM_SPLASH_MS = 1800;
const ENABLE_3D_MODEL = false;

export default function Home() {
  const [activeColor, setActiveColor] = useState("#8E9AA6");
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

    const preloadTargets = ENABLE_3D_MODEL
      ? [...DEFAULT_STL_PARTS, "scene-module"]
      : ["ui-ready"];

    const updateProgress = () => {
      completedTasks += 1;

      if (!isCancelled) {
        setLoadingProgress(
          Math.min(100, Math.round((completedTasks / preloadTargets.length) * 100))
        );
      }
    };

    const preloadModelAssets = ENABLE_3D_MODEL
      ? DEFAULT_STL_PARTS.map((assetPath) =>
        fetch(assetPath, { cache: "force-cache" })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`Failed to preload ${assetPath}`);
            }

            return response.arrayBuffer();
          })
          .catch(() => null)
          .finally(updateProgress)
      )
      : [Promise.resolve().finally(updateProgress)];

    const preloadSceneModule = ENABLE_3D_MODEL
      ? import("@/components/3d/CardHolderScene")
        .catch(() => null)
        .finally(updateProgress)
      : Promise.resolve().finally(updateProgress);

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
