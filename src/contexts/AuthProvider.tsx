"use client";

import { createContext, useContext, useState, useCallback, ReactNode, useMemo } from "react";

interface User {
    email: string;
    name?: string;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, name?: string) => Promise<void>;
    logout: () => void;
    isAuthLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthLoading, setIsAuthLoading] = useState(false);

    const login = useCallback(async (email: string, name?: string) => {
        setIsAuthLoading(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setUser({ email, name });
        } finally {
            setIsAuthLoading(false);
        }
    }, []);

    const logout = useCallback(() => {
        setUser(null);
    }, []);

    const value = useMemo(
        () => ({ user, login, logout, isAuthLoading }),
        [user, login, logout, isAuthLoading]
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
