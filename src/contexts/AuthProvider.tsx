"use client";

import { createContext, useContext, useState, useCallback, ReactNode, useMemo, useEffect } from "react";
import { getApiBaseUrl } from "@/lib/site-url";

interface User {
    id: string;
    email: string;
    name?: string;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    signup: (name: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    isAuthLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

async function postAuth<TBody extends Record<string, string>>(endpoint: string, body?: TBody) {
    const response = await fetch(`${getApiBaseUrl()}/auth/${endpoint}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : undefined,
    });

    const data = (await response.json()) as { message?: string; user?: User };

    if (!response.ok || !data.user) {
        throw new Error(data.message || "Authentication request failed.");
    }

    return data.user;
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthLoading, setIsAuthLoading] = useState(false);

    const login = useCallback(async (email: string, password: string) => {
        setIsAuthLoading(true);
        try {
            const nextUser = await postAuth("login", { email, password });
            setUser(nextUser);
        } finally {
            setIsAuthLoading(false);
        }
    }, []);

    const signup = useCallback(async (name: string, email: string, password: string) => {
        setIsAuthLoading(true);
        try {
            const nextUser = await postAuth("signup", { name, email, password });
            setUser(nextUser);
        } finally {
            setIsAuthLoading(false);
        }
    }, []);

    const logout = useCallback(async () => {
        try {
            await fetch(`${getApiBaseUrl()}/auth/logout`, { method: "POST" });
        } finally {
            setUser(null);
        }
    }, []);

    useEffect(() => {
        let isMounted = true;

        const bootstrapUser = async () => {
            setIsAuthLoading(true);
            try {
                const response = await fetch(`${getApiBaseUrl()}/auth/me`, { cache: "no-store" });
                const data = (await response.json()) as { user?: User | null };
                if (!response.ok) {
                    return;
                }

                if (isMounted && data.user) {
                    setUser(data.user);
                }
            } finally {
                if (isMounted) {
                    setIsAuthLoading(false);
                }
            }
        };

        void bootstrapUser();

        return () => {
            isMounted = false;
        };
    }, []);

    const value = useMemo(
        () => ({ user, login, signup, logout, isAuthLoading }),
        [user, login, signup, logout, isAuthLoading]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
}
