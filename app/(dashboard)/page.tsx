"use client";
import { Briefcase, ChevronRight, Plus, Server } from "react-feather";
import { User, Calendar, DollarSign, Search } from "react-feather";
import Image from "next/image";
import defaultProfilePic from "@/public/default-profile-pic.png";
import Header from "./components/Header";
import Button from "@/components/Button";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, LogOut, Settings } from "lucide-react";
import Link from "next/link";
import { QuotationSlider } from "./QuotationCarousel";

export default function Dashboard() {
  const cotizaciones = [
    {
      id: "1",
      name: "A25R-1",
      client: "John Doe",
      date: new Date().toISOString(),
      value: 1800,
    },
    {
      id: "2",
      name: "A25R-2",
      client: "Emily Johnson",
      date: new Date().toISOString(),
      value: 1800,
    },
    {
      id: "3",
      name: "A25R-3",
      client: "Michael Brown",
      date: new Date().toISOString(),
      value: 1800,
    },
    {
      id: "4",
      name: "A25R-1",
      client: "John Doe",
      date: new Date().toISOString(),
      value: 1800,
    },
    {
      id: "5",
      name: "A25R-2",
      client: "Emily Johnson",
      date: new Date().toISOString(),
      value: 1800,
    },
  ];

  const proveedores = [
    {
      id: "P001",
      name: "Proveedor A",
      quotations: 15,
    },
    {
      id: "P002",
      name: "Proveedor B",
      quotations: 12,
    },
    {
      id: "P003",
      name: "Proveedor C",
      quotations: 9,
    },
    {
      id: "P004",
      name: "Proveedor D",
      quotations: 7,
    },
  ];

  return (
    <div className="flex justify-start w-full h-full flex-col bg-neutral-50">
      <div className="w-full h-20 flex-shrink-0 border-b border-neutral-200">
        <div className="flex justify-between items-center h-full px-6 mb-4">
          <div className="flex flex-col justify-center items-start w-[12vw]">
            <h2 className="flex items-center text-xl leading-[1] p-0 font-[800] text-black">
              General
            </h2>
          </div>
          <div className="flex items-center gap-2 h-14 hover:cursor-pointer">
            <div className="relative w-[22vw]">
              <Search
                size={20}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black"
              />
              <input
                className="w-full h-[2.25vw] rounded-full pl-10 pr-4 bg-white shadow-sm border border-neutral-200 text-sm focus:outline-none placeholder-secondary"
                placeholder="Buscar cotización"
              />
            </div>
          </div>
          <div className="flex items-center gap-2 h-14 hover:cursor-pointer">
            <div className="relative w-[12vw]">
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
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Cerrar sesión</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenuItem>
              </SidebarMenu>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-3 items-start w-full h-full">
        <div className="w-1/3 h-full flex flex-col border-r border-neutral-200 relative p-6">
          <div className="w-full flex flex-col pb-4">
            <h2 className="text-3xl font-[800]">Mis cotizaciones</h2>
            <p className="text-gray-500 ml-1">
              Vista general de mis cotizaciones
            </p>
          </div>
          <div className="h-full gap-3 flex flex-col">
            <div
              className="w-full h-[65%] bg-white border border-neutral-200 shadow-sm
 rounded-[18px] relative"
            >
              <div className="flex flex-col p-4 relative">
                <div className="flex items-center justify-start mb-3">
                  <h2 className="text-md font-[600] text-black">
                    Cotización reciente
                  </h2>
                </div>
                <div className="space-y-3"></div>
              </div>
              <div className="absolute bottom-4 right-4 w-auto flex justify-end gap-2 items-end h-auto">
                <Button variant="secondary" className="px-3 py-2 text-sm">
                  Ver más cotizaciones
                </Button>

                <Button
                  variant="primary"
                  className="px-3 py-2 bg-neutral-900 text-white text-sm"
                >
                  Abrir cotización
                </Button>
              </div>
            </div>
            <QuotationSlider cotizaciones={cotizaciones} />
          </div>
        </div>

        <div
          className="w-1/2 h-full bg-white bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-90 border border-gray-100
 rounded-[18px] relative"
        >
          <div className="flex flex-col p-4 relative">
            <div className="flex items-center justify-start mb-3">
              <div className="w-7 h-7 mr-2 bg-red-700 rounded-[8px] flex justify-center items-center">
                <Briefcase size={18} className="text-white" />
              </div>
              <h2 className="text-2xl font-[800] text-black">Ventas</h2>
            </div>
            <div className="space-y-3">
              {cotizaciones.map((cotizacion) => (
                <div
                  key={cotizacion.id}
                  className="flex items-center bg-white border-[0.5px] border-[#ebebebcc] rounded-lg py-4 px-3 cursor-pointer hover:bg-gray-50"
                >
                  <div className="flex-1">
                    <div className="flex gap-3 flex-col">
                      <h3 className="text-black font-[800]">
                        {cotizacion.name}
                      </h3>
                      <div className="text-sm text-gray-500 flex items-center gap-2">
                        <User size={16} className="text-gray-400" />
                        {cotizacion.client}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-end gap-3 text-sm flex-col">
                    <div className="flex items-center gap-2 text-gray-500">
                      <Calendar size={16} className="text-gray-400" />
                      {cotizacion.date.split("T")[0]}
                    </div>
                    <div className="flex items-center text-primary font-[800]">
                      <DollarSign size={16} />
                      {cotizacion.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute bottom-4 right-4 w-auto flex justify-end gap-2 items-end h-auto">
            <Button variant="secondary" className="px-3 py-2 text-sm">
              Agregar cotización
            </Button>

            <Button
              variant="primary"
              className="px-3 py-2 bg-neutral-900 text-white text-sm"
            >
              Agregar cotización
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
