import PageTransition from "@/components/PageTransition";
import { AppSidebar } from "./components/AppSidebar";

import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AnimatePresence } from "framer-motion";
import { Children } from "react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex flex-1 flex-col gap-4 py-6 pr-5 pl-3 overflow-hidden bg-sky-50">
          <div className="w-full h-full bg-white rounded-2xl overflow-hidden py-4 border border-neutral-100 shadow-sm">
            <AnimatePresence mode="wait">
              <PageTransition>{children}</PageTransition>
            </AnimatePresence>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
