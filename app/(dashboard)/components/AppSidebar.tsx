"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  PlusSquare,
  Clock,
  BarChart2,
  Users,
  Truck,
  Settings,
  LogOut,
  ChevronDown,
  ChevronsUpDown,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

const menuItems = [
  { icon: Home, label: "Home", id: "" },
  { icon: PlusSquare, label: "Crear", id: "create" },
  { icon: Clock, label: "Cotizaciones", id: "history" },
  { icon: BarChart2, label: "Comparar", id: "compare" },
  { icon: Users, label: "Clientes", id: "clients" },
  { icon: Truck, label: "Proveedores", id: "suppliers" },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const { state } = useSidebar();

  return (
    <Sidebar collapsible="icon" {...props} className="border-neutral-200">
      <SidebarHeader className="h-20 mb-6 justify-center items-center">
        <SidebarMenu className="">
          <SidebarMenuItem className="flex flex-row items-center ">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground pl-1"
                >
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
                    <Image
                      src="/logo.png"
                      width={700}
                      height={700}
                      alt="Picture of the author"
                    />
                  </div>
                  <div className="flex flex-col gap-0.5 mt-1 leading-none text-gray-800">
                    <span className="font-[600] whitespace-nowrap text-[1.1em]">
                      <span className="font-[800]">ATP</span>{" "}
                      <span className="text-primary">Tarifario Web</span>
                    </span>
                  </div>
                  <ChevronsUpDown className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width]"
                align="start"
              >
                <DropdownMenuItem>Opción 1</DropdownMenuItem>
                <DropdownMenuItem>Opción 2</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {state === "expanded" && <SidebarTrigger />}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="pt-0">
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === `/${item.id}`}
                    className="text-gray-500 text-[1.05em] font-[500]"
                  >
                    <Link href={`/${item.id}`}>
                      <item.icon strokeWidth={2.5} className="mr-1" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="pb-5">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Image
                    src="/default-profile-pic.png"
                    width={700}
                    height={700}
                    alt="Picture of the author"
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="flex flex-col gap-0.5 leading-none">
                    <span className="font-semibold">Usuario</span>
                    <span className="text-xs text-muted-foreground">
                      usuario@ejemplo.com
                    </span>
                  </div>
                  <ChevronDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width]"
                align="start"
              >
                <DropdownMenuItem className="cursor-pointer" asChild>
                  <Link href="/settings" className="flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Configuración</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <Link href="../login" className="flex items-center">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Cerrar sesión</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
