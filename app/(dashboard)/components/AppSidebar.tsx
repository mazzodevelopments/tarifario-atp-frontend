"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import {
  Clock,
  Home,
  PlusSquare,
  Users,
  ChevronRight,
  Settings,
  Truck,
  BarChart2,
  LogOut,
} from "react-feather";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [selectedItem, setSelectedItem] = React.useState<string | null>(null);
  const pathname = usePathname();
  const menuItems = [
    { icon: Home, label: "Home", id: "" },
    { icon: PlusSquare, label: "Crear", id: "create" },
    { icon: Clock, label: "Cotizaciones", id: "history" },
    { icon: BarChart2, label: "Comparar", id: "compare" },
    { icon: Users, label: "Clientes", id: "clients" },
    { icon: Truck, label: "Proveedores", id: "suppliers" },
  ];

  React.useEffect(() => {
    const pathSegment = pathname.split("/")[1];
    if (pathSegment === "settings") {
      setSelectedItem("settings");
    } else {
      const matchedItem = menuItems.find((item) => item.id === pathSegment);
      setSelectedItem(matchedItem ? matchedItem.id : null);
    }
  }, [pathname]);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="px-4 flex flex-row justify-between items-center">
        <h1>ATP</h1>
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent>
        <div className="w-full flex justify-between mt-2 px-4 items-start gap-2 flex-col">
          {/* <label className="uppercase text-gray-400 text-xs font-[600]">
            General
          </label> */}
          {menuItems.map((item) => (
            <Link
              key={item.id}
              className={`text-sm flex items-center justify-between hover:cursor-pointer transition-all duration-300 ease-in-out w-full font-[600] py-1.5 rounded-lg px-2 border-[0.5px]  ${
                selectedItem === item.id
                  ? " bg-white text-black border-[#ebebebcc] shadow-sm"
                  : "hover:bg-gray-100 text-gray-500 border-gray-50"
              }`}
              href={`/${item.id}`}
            >
              <div className="flex items-center">
                <item.icon
                  size={18}
                  fontWeight="bold"
                  className={` ${
                    selectedItem === item.id ? " text-black" : ""
                  }`}
                />
                <span className="text-md ml-2 flex">{item.label}</span>
              </div>
              {selectedItem === item.id && (
                <ChevronRight className="h-4 w-4 opacity-55 transition duration-300" />
              )}
            </Link>
          ))}
        </div>
      </SidebarContent>
      <SidebarFooter>
        <h3>Usuario</h3>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
