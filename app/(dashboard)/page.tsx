"use client";
import { Briefcase } from "react-feather";
import { Search } from "react-feather";
import Image from "next/image";
import defaultProfilePic from "@/public/default-profile-pic.png";
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
import CurrentQuotationCard from "./CurrentQuotation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NewUserDialog } from "./NewUserDialog";
import { QuotationData } from "@/types/QuotationData";

export default function Dashboard() {
  const quotations: QuotationData[] = [
    {
      taskNumber: "A25R-0003",
      client: "ElectroRedes Global",
      buyer: "Carlos Ramírez",
      receptionDate: "2025-01-12",
      uploadDate: "2025-01-13",
      expirationDateTime: "2025-02-01T18:00:00",
      materialsNeededDate: "2025-01-25",
      customerRequestNumber: "REQ-2025-003",
      atpInternRequestNumber: "ATP-INT-9025",
    },
    {
      taskNumber: "A25R-0004",
      client: "AgroSolutions SAC",
      buyer: "Laura Rodríguez",
      receptionDate: "2025-01-09",
      uploadDate: "2025-01-10",
      expirationDateTime: "2025-02-09T15:30:00",
      materialsNeededDate: "2025-01-28",
      customerRequestNumber: "REQ-2025-004",
      atpInternRequestNumber: "ATP-INT-9034",
    },
    {
      taskNumber: "A25R-0005",
      client: "MicroTech Solutions",
      buyer: "Andrea Gómez",
      receptionDate: "2025-01-18",
      uploadDate: "2025-01-19",
      expirationDateTime: "2025-02-05T20:00:00",
      materialsNeededDate: "2025-02-01",
      customerRequestNumber: "REQ-2025-005",
      atpInternRequestNumber: "ATP-INT-9042",
    },
  ];

  type User = {
    id: number;
    name: string;
    email: string;
    avatar: string;
  };

  const users: User[] = [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      avatar: "defaultProfilePic",
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob@example.com",
      avatar: "defaultProfilePic",
    },
    {
      id: 3,
      name: "Charlie Brown",
      email: "charlie@example.com",
      avatar: "defaultProfilePic",
    },
    {
      id: 4,
      name: "Diana Ross",
      email: "diana@example.com",
      avatar: "defaultProfilePic",
    },
    {
      id: 5,
      name: "Edward Norton",
      email: "edward@example.com",
      avatar: "defaultProfilePic",
    },
    {
      id: 6,
      name: "Fiona Apple",
      email: "fiona@example.com",
      avatar: "defaultProfilePic",
    },
    {
      id: 7,
      name: "George Clooney",
      email: "george@example.com",
      avatar: "defaultProfilePic",
    },
    {
      id: 8,
      name: "Helen Mirren",
      email: "helen@example.com",
      avatar: "defaultProfilePic",
    },
    {
      id: 9,
      name: "Edward Norton",
      email: "edward@example.com",
      avatar: "defaultProfilePic",
    },
    {
      id: 10,
      name: "Fiona Apple",
      email: "fiona@example.com",
      avatar: "defaultProfilePic",
    },
    {
      id: 11,
      name: "George Clooney",
      email: "george@example.com",
      avatar: "defaultProfilePic",
    },
    {
      id: 12,
      name: "Helen Mirren",
      email: "helen@example.com",
      avatar: "defaultProfilePic",
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
                          src={defaultProfilePic}
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
      <div className="flex flex-row items-start w-full h-full">
        <div className="w-1/3 h-full flex flex-col border-r border-neutral-200 relative p-6">
          <div className="w-full flex flex-col pb-4">
            <h2 className="text-3xl font-[800]">Mis cotizaciones</h2>
            <p className="text-gray-500 ml-1">
              Vista general de mis cotizaciones
            </p>
          </div>
          <div className="h-full gap-3 flex flex-col">
            <CurrentQuotationCard />
            <QuotationSlider quotations={quotations} />
          </div>
        </div>

        <div className="w-2/3 h-full flex flex-col relative p-6 gap-3">
          <div className="flex flex-row gap-3 h-[60%]">
            <div className="flex flex-col w-[65%]">
              <div className="w-full flex flex-col pb-4">
                <h2 className="text-3xl font-[800]">Panel Administrador</h2>
                <p className="text-gray-500 ml-1">
                  Panel de acciones de administrador
                </p>
              </div>
              <div className="flex flex-col p-4 relative bg-white border border-neutral-200 shadow-sm rounded-[18px] w-full h-full">
                <div className="flex items-center justify-start mb-3">
                  <div className="w-7 h-7 mr-2 bg-red-700 rounded-full flex justify-center items-center">
                    <Briefcase size={16} className="text-white" />
                  </div>
                  <h2 className="text-lg font-[800] text-black">Ventas</h2>
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
            <div className="flex flex-col w-[35%]">
              <div className="flex flex-col relative py-4 bg-white border border-neutral-200 shadow-sm rounded-[18px] w-full h-full">
                <h2 className="text-lg font-[800] mb-2 mx-4">
                  Lista de Usuarios
                </h2>
                <ScrollArea className="flex-grow border-neutral-100 border-t px-4">
                  <div className="space-y-4 mt-2">
                    {users.map((user) => (
                      <div
                        key={user.id}
                        className="flex items-center space-x-4"
                      >
                        <Image
                          src={defaultProfilePic || "/placeholder.svg"}
                          width={700}
                          height={700}
                          alt="Picture of the author"
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          <p className="text-sm font-medium">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <div className="w-auto flex pr-4 justify-end gap-2 items-end h-auto pt-4 border-t border-neutral-100">
                  <NewUserDialog />
                </div>
              </div>
            </div>
          </div>
          <div className="h-[40%] bg-white shadow-sm border border-neutral-200 w-full rounded-[16px]"></div>
        </div>
      </div>
    </div>
  );
}
