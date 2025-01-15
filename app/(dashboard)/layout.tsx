"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
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
import { usePathname } from "next/navigation";
import Link from "next/link";
import defaultProfilePic from "@/public/default-profile-pic.png";
import PageTransition from "@/components/PageTransition";
import { AnimatePresence } from "framer-motion";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const pathname = usePathname();
  const menuItems = [
    { icon: Home, label: "Home", id: "" },
    { icon: PlusSquare, label: "Crear", id: "create" },
    { icon: Clock, label: "Cotizaciones", id: "history" },
    { icon: BarChart2, label: "Comparar", id: "compare" },
    { icon: Users, label: "Clientes", id: "clients" },
    { icon: Truck, label: "Proveedores", id: "suppliers" },
  ];

  useEffect(() => {
    const pathSegment = pathname.split("/")[1];
    if (pathSegment === "settings") {
      setSelectedItem("settings");
    } else {
      const matchedItem = menuItems.find((item) => item.id === pathSegment);
      setSelectedItem(matchedItem ? matchedItem.id : null);
    }
  }, [pathname]);

  return (
    <div className="w-screen relative h-screen flex justify-center items-center flex-row bg-white">
      <div className="w-full h-full flex justify-center items-center flex-row overflow-hidden">
        <div className="w-[328px] h-full flex justify-between items-center flex-col bg-white shadow-sm z-20 px-[30px] py-10 border-r-[0.5px] border-[#ebebebcc]">
          <div className="flex justify-start w-full items-start flex-col">
            <div className="w-full flex flex-row items-end pb-6">
              <h3 className="text-xl font-bold text-primary leading-[1]">
                atp
              </h3>
              <h3 className="text-lg font-semibold uppercase leading-[1] text-black">
                solutions
              </h3>
            </div>
            <div className="w-full flex justify-between mt-2 items-start gap-2 flex-col">
              <label className="uppercase text-gray-400 text-xs font-medium">
                General
              </label>
              {menuItems.map((item) => (
                <Link
                  key={item.id}
                  className={`text-sm flex items-center justify-between hover:cursor-pointer transition-all duration-300 ease-in-out w-full font-medium py-1.5 rounded-lg px-2 ${
                    selectedItem === item.id
                      ? " bg-sky-50 text-primary"
                      : "hover:bg-sky-50 text-gray-500 hover:text-gray-700"
                  }`}
                  href={`/${item.id}`}
                >
                  <div className="flex items-center">
                    <item.icon
                      size={18}
                      fontWeight="bold"
                      className={` ${
                        selectedItem === item.id ? " text-primary" : ""
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
          </div>
          <div className="w-full flex flex-col justify-end">
            <div className="flex w-full h-auto justify-start items-center">
              <div className="flex flex-col gap-2 items-center py-2 px-4 rounded-[18px] w-full text-gray-800 border-[0.5px] border-[#ebebebcc] shadow-sm">
                <div className="flex w-full items-center gap-2 h-14 hover:cursor-pointer">
                  <div className="w-8 h-8 rounded-xl overflow-hidden">
                    <Image
                      src={defaultProfilePic.src}
                      width={1000}
                      height={1000}
                      alt="LOGO"
                    />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-sm font-semibold w-full text-black">
                      Tomás Matteozzi
                    </h3>
                    <span className="text-[0.65vw] text-black">
                      Administrador
                    </span>
                  </div>
                </div>
                <div className="flex justify-between w-full gap-2 text-black py-1.5 rounded-lg">
                  <Link
                    className="flex w-1/2 gap-2 items-center text-xs hover:text-black"
                    href="/settings"
                  >
                    <Settings size={18} fontWeight="bold" /> Ajustes
                  </Link>
                  <Link
                    className="flex w-1/2 gap-2 items-center text-xs hover:text-black"
                    href="/logout"
                  >
                    <LogOut size={18} fontWeight="bold" /> Log out
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-full relative flex justify-center items-center flex-col overflow-hidden py-10">
          <AnimatePresence mode="wait">
            <PageTransition>{children}</PageTransition>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
