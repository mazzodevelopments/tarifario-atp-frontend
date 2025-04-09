"use client";

import type * as React from "react";
import { createContext, useContext, useState, useEffect } from "react";

type ExpoContextType = {
  isExpo: boolean;
  setIsExpo: (value: boolean) => void;
};

const ExpoContext = createContext<ExpoContextType | undefined>(undefined);

export function ExpoProvider({ children }: { children: React.ReactNode }) {
  const [isExpo, setIsExpoState] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const storedValue = localStorage.getItem("isExpo");
    if (storedValue !== null) {
      setIsExpoState(storedValue === "true");
    }
    setMounted(true);
  }, []);

  const setIsExpo = (value: boolean) => {
    if (isExpo !== value) {
      setIsExpoState(value);
      if (mounted) {
        localStorage.setItem("isExpo", value.toString());
      }
      window.location.reload();
    }
  };

  return (
    <ExpoContext.Provider value={{ isExpo, setIsExpo }}>
      {children}
    </ExpoContext.Provider>
  );
}

export function useExpo() {
  const context = useContext(ExpoContext);
  if (context === undefined) {
    throw new Error("useExpo must be used within a ExpoProvider");
  }
  return context;
}
