export interface AssetDescriptor {
    id: string;
    kind: "fetch" | "image" | "module" | "video";
    src?: string;
    loader?: () => Promise<unknown>;
}

const DESKTOP_LOADING_VIDEO = "/video/vecteezy-workers-optimized.mp4";
const MOBILE_LOADING_VIDEO = "/video/vecteezy-workers-mobile.mp4";

export const CRITICAL_ASSETS: AssetDescriptor[] = [
    {
        id: "card-holder-model",
        kind: "fetch",
        src: "/satset3d/glb/bener-final-optimized.glb",
    },
    {
        id: "card-holder-scene-module",
        kind: "module",
        loader: () => import("@/components/3d/CardHolderScene"),
    },
];

export interface AssetProgressEvent {
    asset: AssetDescriptor;
    completed: number;
    total: number;
}

export interface PreloadAssetsOptions {
    includeMobileVideo?: boolean;
    onProgress?: (event: AssetProgressEvent) => void;
}

export function getCriticalAssets(includeMobileVideo = false) {
    return [
        ...CRITICAL_ASSETS,
        {
            id: includeMobileVideo ? "loading-video-mobile" : "loading-video-desktop",
            kind: "video" as const,
            src: includeMobileVideo ? MOBILE_LOADING_VIDEO : DESKTOP_LOADING_VIDEO,
        },
    ];
}

export async function preloadAssets(
    options: PreloadAssetsOptions = {}
) {
    const { includeMobileVideo = false, onProgress } = options;
    const assets = getCriticalAssets(includeMobileVideo);
    let completed = 0;
    const total = assets.length;

    const markComplete = (asset: AssetDescriptor) => {
        completed += 1;
        onProgress?.({ asset, completed, total });
    };

    const tasks = assets.map(async (asset) => {
        try {
            if (asset.kind === "module" && asset.loader) {
                await asset.loader();
                return;
            }

            if (!asset.src) {
                return;
            }

            const source = asset.src;

            if (asset.kind === "fetch") {
                const response = await fetch(source, { cache: "force-cache" });

                if (!response.ok) {
                    throw new Error(`Failed to preload ${source}`);
                }

                await response.arrayBuffer();
                return;
            }

            if (asset.kind === "image") {
                await new Promise<void>((resolve, reject) => {
                    const image = new Image();

                    image.onload = () => resolve();
                    image.onerror = () => reject(new Error(`Failed to preload ${source}`));
                    image.src = source;
                });
                return;
            }

            if (asset.kind === "video") {
                await new Promise<void>((resolve, reject) => {
                    const video = document.createElement("video");

                    video.preload = "auto";
                    video.muted = true;
                    video.playsInline = true;
                    video.oncanplaythrough = () => {
                        video.oncanplaythrough = null;
                        video.onerror = null;
                        resolve();
                    };
                    video.onerror = () => {
                        video.oncanplaythrough = null;
                        video.onerror = null;
                        reject(new Error(`Failed to preload ${source}`));
                    };
                    video.src = source;
                    video.load();
                });
            }
        } finally {
            markComplete(asset);
        }
    });

    return Promise.allSettled(tasks);
}