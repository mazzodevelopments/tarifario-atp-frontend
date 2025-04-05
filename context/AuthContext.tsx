"use client";

import type React from "react";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import { useRouter } from "next/navigation";
import { API_BASE_URL, TOKEN_EXPIRATION_TIME } from "@/utils/config";

interface User {
  id: number;
  email: string;
  name: string;
  lastname: string;
  firstLogin: boolean;
  profilePic: string;
  roles: { name: string }[];
}

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  login: (email: string, password: string) => void;
  relogin: () => Promise<void>;
  logout: () => void;
  loading: boolean;
  updateUser: (userUpdates: Partial<User>) => void;
  user: User | null;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  token: null,
  login: async () => {},
  relogin: async () => {},
  logout: () => {},
  updateUser: () => {},
  loading: true,
  user: null,
});

const REFRESH_MARGIN = 60 * 1000;

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const refreshTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isRefreshingRef = useRef(false);
  const router = useRouter();

  const clearAuthData = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("loginTime");
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
    document.cookie = "user=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    if (refreshTimerRef.current) {
      clearTimeout(refreshTimerRef.current);
      refreshTimerRef.current = null;
    }
    isRefreshingRef.current = false;
  }, []);

  const scheduleTokenRefresh = useCallback(() => {
    if (refreshTimerRef.current) {
      clearTimeout(refreshTimerRef.current);
    }

    const loginTime = localStorage.getItem("loginTime");
    if (!loginTime) return;

    const timeUntilExpiry =
      new Date(loginTime).getTime() + TOKEN_EXPIRATION_TIME - Date.now();
    const refreshTime = Math.max(0, timeUntilExpiry - REFRESH_MARGIN);

    refreshTimerRef.current = setTimeout(async () => {
      if (!isRefreshingRef.current) {
        isRefreshingRef.current = true;
        try {
          await relogin();
        } catch (error) {
          console.error("Token refresh failed:", error);
          clearAuthData();
          router.push("/login");
        } finally {
          isRefreshingRef.current = false;
        }
      }
    }, refreshTime);
  }, []);

  const relogin = async () => {
    try {
      const currentToken = localStorage.getItem("token");
      if (!currentToken) {
        throw new Error("No token available");
      }

      const response = await fetch(`${API_BASE_URL}/auth/relogin`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${currentToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Token refresh failed");
      }

      const data = await response.json();
      const newToken = data.access_token;

      localStorage.setItem("token", newToken);
      localStorage.setItem("loginTime", new Date().toISOString());
      document.cookie = `token=${newToken}; path=/`;

      setToken(newToken);
      setIsAuthenticated(true);

      if (!refreshTimerRef.current) {
        scheduleTokenRefresh();
      }

      return data;
    } catch (error) {
      console.error("Relogin error:", error);
      clearAuthData();
      router.push("/login");
      throw error;
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      if (typeof window === "undefined") return;

      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");
      const loginTime = localStorage.getItem("loginTime");

      if (storedToken && storedUser && loginTime) {
        const tokenAge = Date.now() - new Date(loginTime).getTime();

        if (tokenAge >= TOKEN_EXPIRATION_TIME) {
          clearAuthData();
          router.push("/login");
        } else {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
          setIsAuthenticated(true);
          document.cookie = `user=${encodeURIComponent(storedUser)}; path=/`;
          document.cookie = `token=${storedToken}; path=/`;
          scheduleTokenRefresh();
        }
      }

      setLoading(false);
    };

    initializeAuth();

    return () => {
      if (refreshTimerRef.current) {
        clearTimeout(refreshTimerRef.current);
      }
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      const userStr = JSON.stringify(data.user);

      localStorage.setItem("token", data.access_token);
      localStorage.setItem("user", userStr);
      localStorage.setItem("loginTime", new Date().toISOString());

      document.cookie = `user=${encodeURIComponent(userStr)}; path=/`;
      document.cookie = `token=${data.access_token}; path=/`;

      setToken(data.access_token);
      setIsAuthenticated(true);
      setUser(data.user);

      scheduleTokenRefresh();

      if (data.user.firstLogin) {
        router.push("/complete-user");
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = () => {
    clearAuthData();
    router.push("/login");
  };

  const updateUser = (userUpdates: Partial<User>) => {
    setUser((prevUser) => {
      if (!prevUser) return prevUser;
      const updatedUser = { ...prevUser, ...userUpdates } as User;
      localStorage.setItem("user", JSON.stringify(updatedUser));
      document.cookie = `user=${encodeURIComponent(JSON.stringify(updatedUser))}; path=/`;
      return updatedUser;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        token,
        login,
        relogin,
        logout,
        loading,
        user,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
