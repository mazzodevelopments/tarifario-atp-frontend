"use client";

import React, { useEffect } from "react";
import PageTransition from "@/components/PageTransition";
import { AppSidebar } from "./components/AppSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AnimatePresence } from "framer-motion";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useRouter } from "next/navigation";
import { ExpoProvider } from "@/context/ExpoContext";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/login");
    }
  });

  return (
    <ProtectedRoute>
      <ExpoProvider>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <div className="flex flex-1 flex-col gap-4 overflow-hidden bg-neutral-50">
              <AnimatePresence mode="wait">
                <PageTransition>{children}</PageTransition>
              </AnimatePresence>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </ExpoProvider>
    </ProtectedRoute>
  );
}
