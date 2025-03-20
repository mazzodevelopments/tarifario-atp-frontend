"use client";

import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { API_BASE_URL, TOKEN_EXPIRATION_TIME } from "@/utils/config";

interface User {
  id: number;
  email: string;
  name: string;
  lastname: string;
  firstLogin: boolean;
  profilePic: string;
  role: { id: number; name: string };
}

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  login: (email: string, password: string) => void;
  relogin: () => void;
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

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (storedToken) {
        setToken(storedToken);
        setIsAuthenticated(true);

        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      }

      scheduleRelogin();

      setLoading(false);
    }
  }, []);

  const scheduleRelogin = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const id = setTimeout(() => {
      relogin();
    }, TOKEN_EXPIRATION_TIME);

    setTimeoutId(id);
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("loginTime", new Date().toISOString());

        setToken(data.access_token);
        setIsAuthenticated(true);
        setUser(data.user);

        scheduleRelogin();

        if (data.user.firstLogin) {
          router.push("/complete-user");
        } else {
          router.push("/");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const relogin = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/relogin`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("loginTime", new Date().toISOString());

        setToken(data.access_token);
        setIsAuthenticated(true);

        scheduleRelogin();
      }
    } catch (error) {
      console.error("Relogin error:", error);
      throw error;
    }
  };

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("loginTime");
    }
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    router.push("/login");
  };

  const updateUser = (userUpdates: Partial<User>) => {
    setUser((prevUser) => {
      if (!prevUser) return prevUser;
      return { ...prevUser, ...userUpdates } as User;
    });
  };

  useEffect(() => {
    const checkTokenExpiration = () => {
      const loginTime = localStorage.getItem("loginTime");
      if (loginTime) {
        const currentTime = new Date();
        const loginTimeDate = new Date(loginTime);
        const timeDifference = currentTime.getTime() - loginTimeDate.getTime();

        if (timeDifference > TOKEN_EXPIRATION_TIME) {
          logout();
        }
      }
    };

    const intervalId = setInterval(checkTokenExpiration, 1000);

    return () => clearInterval(intervalId);
  }, []);

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
