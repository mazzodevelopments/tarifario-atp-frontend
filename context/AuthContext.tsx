"use client";

import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  logout: () => void;
  loading: boolean; // Add loading state
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  token: null,
  logout: () => {},
  loading: true, // Default to loading
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");

      if (storedToken) {
        setToken(storedToken);
        setIsAuthenticated(true);
      }

      // Always set loading to false after checking
      setLoading(false);
    }
  }, []); // Remove router dependency to prevent re-runs

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
    setToken(null);
    setIsAuthenticated(false);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
