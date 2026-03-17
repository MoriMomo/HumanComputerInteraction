export interface AssetDescriptor {
    id: string;
    kind: "fetch" | "image" | "module" | "video";
    src?: string;
    loader?: () => Promise<unknown>;
}

export const CRITICAL_ASSETS: AssetDescriptor[] = [
    {
        id: "card-holder-model",
        kind: "fetch",
        src: "/satset3d/glb/bener-compressed.glb",
    },
    {
        id: "card-holder-scene-module",
        kind: "module",
        loader: () => import("@/components/3d/CardHolderScene"),
    },
    {
        id: "stats-video",
        kind: "video",
        src: "/video/vecteezy_workers-hands-sorting-plastic-waste-moving-on-conveyor_5485455.mp4",
    },
];

export interface AssetProgressEvent {
    asset: AssetDescriptor;
    completed: number;
    total: number;
}

export async function preloadAssets(
    onProgress?: (event: AssetProgressEvent) => void
) {
    let completed = 0;
    const total = CRITICAL_ASSETS.length;

    const markComplete = (asset: AssetDescriptor) => {
        completed += 1;
        onProgress?.({ asset, completed, total });
    };

    const tasks = CRITICAL_ASSETS.map(async (asset) => {
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

                    const cleanup = () => {
                        video.oncanplaythrough = null;
                        video.onerror = null;
                        video.removeAttribute("src");
                        video.load();
                    };

                    video.preload = "auto";
                    video.muted = true;
                    video.playsInline = true;
                    video.oncanplaythrough = () => {
                        cleanup();
                        resolve();
                    };
                    video.onerror = () => {
                        cleanup();
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