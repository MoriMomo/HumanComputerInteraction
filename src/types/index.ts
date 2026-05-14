/**
 * Global TypeScript type definitions
 * Shared types used across the application
 */

/**
 * Product type definition
 */
export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
    slug: string;
    category?: string;
    tags?: string[];
    inStock?: boolean;
}

/**
 * Blog post type definition
 */
export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    author: string;
    date: string;
    category: string;
    tags: string[];
    image?: string;
    readingTime?: number;
}

/**
 * Material/Swatch color definition
 */
export interface Material {
    id: string;
    label: string;
    hex: string;
    description: string;
}

/**
 * 3D Render mode
 */
export type RenderMode = "normal" | "glass" | "wireframe";

/**
 * 3D Scene configuration
 */
export interface Scene3DConfig {
    color: string;
    autoRotate: boolean;
    show3DModel: boolean;
    isActive: boolean;
    renderMode: RenderMode;
    enableZoom: boolean;
    cameraPosition: [number, number, number];
    cameraLookAt: [number, number, number];
    introFromPosition: [number, number, number];
    introDuration: number;
    modelRotation: [number, number, number];
    modelOffset: [number, number, number];
    modelScaleMultiplier: number;
    onModelReady?: () => void;
    className?: string;
}

/**
 * Cart item type
 */
export interface CartItem {
    id: string;
    productId: string;
    name: string;
    price: number;
    quantity: number;
    color?: string;
    image?: string;
}

/**
 * User authentication state
 */
export interface AuthUser {
    id: string;
    email: string;
    name?: string;
    avatar?: string;
    createdAt: string;
    updatedAt: string;
}

/**
 * API response wrapper
 */
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

/**
 * Pagination metadata
 */
export interface PaginationMeta {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

/**
 * Paginated response
 */
export interface PaginatedResponse<T> {
    items: T[];
    meta: PaginationMeta;
}

/**
 * Navigation link type
 */
export interface NavLink {
    label: string;
    href: string;
    active?: boolean;
}

/**
 * Section element for scroll tracking
 */
export interface ScrollSection {
    id: string;
    element: HTMLElement;
    isInView: boolean;
}

/**
 * GSAP animation state
 */
export interface AnimationState {
    isAnimating: boolean;
    direction: "forward" | "reverse";
    progress: number;
}

/**
 * Performance metrics
 */
export interface PerformanceMetrics {
    fps: number;
    frameTime: number;
    gpuMemory?: number;
    timestamp: number;
}

/**
 * 3D Model loading state
 */
export type ModelLoadingState = "idle" | "loading" | "success" | "error";

/**
 * Color variant type
 */
export type ColorVariant =
    | "primary"
    | "dark"
    | "darker"
    | "mountain"
    | "sand"
    | "cream";

/**
 * Button variant
 */
export type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";

/**
 * Button size
 */
export type ButtonSize = "sm" | "md" | "lg";

/**
 * Form input type
 */
export type InputType =
    | "text"
    | "email"
    | "password"
    | "number"
    | "tel"
    | "url"
    | "search";

/**
 * Alert/Toast type
 */
export type AlertType = "success" | "error" | "info" | "warning";

/**
 * Image optimization options
 */
export interface ImageOptimization {
    width?: number;
    height?: number;
    quality?: number;
    placeholder?: "blur" | "empty";
}

/**
 * Loading context state
 */
export interface LoadingState {
    isLoading: boolean;
    progress: number;
    message?: string;
}

/**
 * Contact form data
 */
export interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
    phone?: string;
}

/**
 * Review data structure
 */
export interface Review {
    id: string;
    author: string;
    rating: number;
    title: string;
    content: string;
    verified: boolean;
    date: string;
    helpful: number;
}

/**
 * Breakpoint type for responsive utilities
 */
export type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

/**
 * Theme/mode type
 */
export type Theme = "light" | "dark" | "auto";
