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
import {
  ChevronDown,
  LogOut,
  Settings,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import Link from "next/link";
import { QuotationSlider } from "./components/QuotationCarousel";
import CurrentQuotationCard from "./components/CurrentQuotation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NewUserDialog } from "./components/NewUserDialog";
import { QuotationData } from "@/types/QuotationData";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../utils/config";

export default function Dashboard() {
  const quotations: QuotationData[] = [
    {
      stageId: 1,
      taskNumber: "A25R-0003",
      client: "ElectroRedes Global",
      buyer: "Carlos Ramírez",
      receptionDate: "2025-01-12",
      uploadDate: "2025-01-13",
      expirationDateTime: "2025-02-01T18:00:00",
      materialsNeededDate: "2025-01-25",
      customerRequestNumber: "REQ-2025-003",
      items: null,
      budgets: null,
    },
    {
      stageId: 2,
      taskNumber: "A25R-0004",
      client: "AgroSolutions SAC",
      buyer: "Laura Rodríguez",
      receptionDate: "2025-01-09",
      uploadDate: "2025-01-10",
      expirationDateTime: "2025-02-09T15:30:00",
      materialsNeededDate: "2025-01-28",
      customerRequestNumber: "REQ-2025-004",
      items: null,
      budgets: null,
    },
    {
      stageId: 3,
      taskNumber: "A25R-0005",
      client: "MicroTech Solutions",
      buyer: "Andrea Gómez",
      receptionDate: "2025-01-18",
      uploadDate: "2025-01-19",
      expirationDateTime: "2025-02-05T20:00:00",
      materialsNeededDate: "2025-02-01",
      customerRequestNumber: "REQ-2025-005",
      items: null,
      budgets: null,
    },
  ];

  type User = {
    id: number;
    username: string;
    profilePic: string;
    firstLogin: boolean;
    role: {
      id: number;
      name: string;
    };
  };

  const salesData = [
    { month: "Ene", sales: 4000 },
    { month: "Feb", sales: 3000 },
    { month: "Mar", sales: 5000 },
    { month: "Abr", sales: 4500 },
    { month: "May", sales: 6000 },
    { month: "Jun", sales: 5500 },
  ];

  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `https://apitarifario.mazzodevelopments.com/admin/users`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error fetching users");
        }

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="flex justify-start w-full h-screen flex-col bg-neutral-50">
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
      <div className="flex flex-row items-start w-full h-[calc(100%-5rem)]">
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
          <div className="w-full flex flex-col pb-1">
            <h2 className="text-3xl font-[800]">Panel Administrador</h2>
            <p className="text-gray-500 ml-1">
              Panel de acciones de administrador
            </p>
          </div>
          <div className="flex flex-row gap-3 h-[60%]">
            <div className="flex flex-col w-[65%]">
              <div className="flex flex-col p-4 relative bg-white border border-neutral-200 shadow-sm rounded-[18px] w-full h-full">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-7 h-7 mr-2 bg-red-700 rounded-full flex justify-center items-center">
                      <Briefcase size={16} className="text-white" />
                    </div>
                    <h2 className="text-lg font-[800] text-black">Ventas</h2>
                  </div>
                  <span className="text-xs">Este mes</span>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-neutral-50 p-3 rounded-lg">
                    <p className="text-[0.65vw] text-gray-500 mb-1">
                      Ventas Totales
                    </p>
                    <div className="flex items-center">
                      <DollarSign className="text-green-500" size={20} />
                      <span className="text-[1.75vw] font-bold">120,000</span>
                    </div>
                    <div className="flex items-center text-xs text-green-500 mt-1">
                      <ArrowUpRight size={12} />
                      <span className="text-[0.65vw]">
                        8.2% vs mes anterior
                      </span>
                    </div>
                  </div>
                  <div className="bg-neutral-50 p-3 rounded-lg">
                    <p className="text-[0.65vw] text-gray-500 mb-1">
                      Nuevos Clientes
                    </p>
                    <div className="flex items-center">
                      <span className="text-[1.75vw] font-bold">64</span>
                    </div>
                    <div className="flex items-center text-xs text-red-500 mt-1">
                      <ArrowDownRight size={12} />
                      <span className="text-[0.65vw]">
                        3.1% vs mes anterior
                      </span>
                    </div>
                  </div>
                  <div className="bg-neutral-50 p-3 rounded-lg">
                    <p className="text-[0.65vw] text-gray-500 mb-1">
                      Tasa de Conversión
                    </p>
                    <div className="flex items-center">
                      <span className="text-[1.75vw] font-bold">5.2%</span>
                    </div>
                    <div className="flex items-center text-xs text-green-500 mt-1">
                      <ArrowUpRight size={12} />
                      <span className="text-[0.65vw]">
                        1.8% vs mes anterior
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex-grow">
                  <ResponsiveContainer width="100%" height="80%">
                    <BarChart data={salesData}>
                      <XAxis
                        dataKey="month"
                        axisLine={false}
                        tickLine={false}
                        className="font-[600]"
                      />
                      <YAxis axisLine={false} tickLine={false} width={40} />
                      <Bar
                        dataKey="sales"
                        fill="#ef4444"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="absolute bottom-4 right-4 w-auto flex justify-end gap-2 items-end h-auto">
                  <Button variant="secondary" className="px-3 py-2 text-sm">
                    Ver informe detallado
                  </Button>
                  <Button
                    variant="primary"
                    className="px-3 py-2 bg-neutral-900 text-white text-sm"
                  >
                    Exportar datos
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-[35%]">
              <div className="flex flex-col relative py-4 bg-white border border-neutral-200 shadow-sm rounded-[18px] w-full h-full">
                <h2 className="text-lg font-[800] mb-2 mx-4">
                  Lista de Usuarios
                </h2>
                <ScrollArea className="flex-grow border-neutral-100 border-t px-4 h-[31vw]">
                  <div className="space-y-4 mt-2">
                    {users.map((user) => (
                      <div
                        key={user.id}
                        className="w-full flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-4">
                          <Image
                            src={user.profilePic || defaultProfilePic}
                            width={700}
                            height={700}
                            alt="Picture of the author"
                            className="w-8 h-8 rounded-full"
                          />
                          <div>
                            <p className="text-sm font-medium">
                              {user.username}
                            </p>
                            <p className="text-xs text-gray-500">
                              {user.role.name}
                            </p>
                          </div>
                        </div>
                        <div
                          className={`px-2 rounded-md ${
                            user.role.name === "superadmin"
                              ? "bg-red-100 text-red-500"
                              : user.role.name === "admin"
                              ? "bg-blue-100 text-blue-500"
                              : "bg-neutral-100 text-black"
                          }`}
                        >
                          <span className="text-[0.65vw] font-semibold">
                            {user.role.name}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <div className="w-auto flex pr-2 justify-end gap-2 items-end h-auto pt-4 border-t border-neutral-100">
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
