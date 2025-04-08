"use client";

import * as React from "react";
import { createContext, useContext, useState } from "react";

type ExpoContextType = {
  isExpo: boolean;
  setIsExpo: (value: boolean) => void;
};

const ExpoContext = createContext<ExpoContextType | undefined>(undefined);

export function ExpoProvider({ children }: { children: React.ReactNode }) {
  const [isExpo, setIsExpo] = useState(false);

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
