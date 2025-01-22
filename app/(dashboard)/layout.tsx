import PageTransition from "@/components/PageTransition";
import { AppSidebar } from "./components/AppSidebar";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AnimatePresence } from "framer-motion";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
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
  );
}
