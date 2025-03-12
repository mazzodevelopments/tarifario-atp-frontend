"use client";

import type React from "react";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  console.log(isAuthenticated);

  useEffect(() => {
    // Only redirect if not authenticated AND not loading
    if (!isAuthenticated && !loading) {
      router.push("/login");
    }
  }, [isAuthenticated, loading, router]);

  // Show nothing during loading or if not authenticated
  if (loading || !isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
