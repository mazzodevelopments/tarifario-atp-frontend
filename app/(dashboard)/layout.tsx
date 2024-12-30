"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Clock,
  CornerRightUp,
  Home,
  PlusSquare,
  Users,
  ChevronRight,
  Settings,
} from "react-feather";
import { usePathname } from "next/navigation";
import Link from "next/link";
import defaultProfilePic from "@/public/default-profile-pic.png";

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
    { icon: Users, label: "Proveedores", id: "proveedores" },
    { icon: CornerRightUp, label: "Reportes", id: "reports" },
  ];

  useEffect(() => {
    const matchedItem = menuItems.find(
      (item) => item.id === pathname.split("/")[1]
    );
    if (matchedItem) {
      setSelectedItem(matchedItem.id);
    }
  }, [pathname]);

  return (
    <div className="w-screen relative h-screen bg-gray-50 flex justify-center items-center flex-row p-[1.5vw]">
      <div className="w-full h-full flex justify-center items-center flex-row rounded-3xl shadow-lg overflow-hidden border-[2px] border-gray-100">
        <div className="w-[16vw] h-full flex justify-between items-center flex-col bg-background z-20 p-6 pt-10">
          <div className="flex justify-start w-full items-start flex-col">
            <div className="w-full flex flex-row items-end pb-6 border-b-[2px] border-gray-100">
              <h3 className="text-xl font-bold text-primary leading-[1]">
                atp
              </h3>
              <h3 className="text-lg font-semibold uppercase leading-[1] text-gray-900">
                solutions
              </h3>
            </div>
            <div className="w-full mt-6 flex justify-between items-start gap-2 flex-col">
              <label className="uppercase text-gray-400 text-xs font-medium">
                General
              </label>
              {menuItems.map((item) => (
                <Link
                  key={item.id}
                  className={`text-sm text-black flex items-center justify-between hover:cursor-pointer transition-all duration-300 ease-in-out w-full font-medium py-1.5 rounded-lg px-2 ${
                    selectedItem === item.id
                      ? " bg-sky-50"
                      : "hover:bg-gray-100 opacity-55"
                  }`}
                  href={`/${item.id}`}
                >
                  <div className="flex items-center">
                    <item.icon
                      size={18}
                      fontWeight="bold"
                      className={`transition-all duration-300 ${
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
            <Link
              href={"/settings"}
              className="text-sm text-black flex items-center justify-between hover:cursor-pointer transition-all duration-300 ease-in-out w-full font-medium px-3 py-1.5 rounded-lg hover:bg-gray-100 opacity-55 mb-3"
            >
              <div className="flex items-center">
                <Settings size={18} fontWeight="bold" />
                <span className="text-md ml-2">Ajustes</span>
              </div>
            </Link>
            <div className="flex w-full h-auto justify-start items-center border-t-[2px] border-gray-100">
              <div className="flex justify-between items-center gap-8 mt-4 w-full text-gray-800 hover:text-primary">
                {/* DATOS USUARIO */}
                <div className="flex justify-end items-center gap-2 h-14 hover:cursor-pointer px-1">
                  <div className="w-8 h-8 rounded-xl overflow-hidden">
                    <Image
                      src={defaultProfilePic.src}
                      width={1000}
                      height={1000}
                      alt="LOGO"
                    />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-sm font-semibold  w-full">
                      Tomás Matteozzi
                    </h3>
                    <span className="text-[0.65vw] text-gray-600">
                      Administrador
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-full relative flex justify-center items-center flex-col overflow-hidden border-l-[2px] border-gray-100">
          {children}
        </div>
      </div>
    </div>
  );
}
