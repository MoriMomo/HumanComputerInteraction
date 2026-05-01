"use client";
import dynamic from "next/dynamic";

const DynamicGPUMonitor = dynamic(() => import("@/components/debug/GPUMonitor"), { ssr: false });

export default function GPUMonitorClient() {
    return <DynamicGPUMonitor />;
}
