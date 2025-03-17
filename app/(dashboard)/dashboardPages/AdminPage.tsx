"use client";
import { Search } from "react-feather";
import Image from "next/image";
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
import { QuotationSlider } from "../components/QuotationCarousel";
import CurrentQuotationCard from "../components/CurrentQuotation";
import { ScrollArea } from "@/components/ui/scroll-area";
import CreateUser from "../components/CreateUser";
import React, { useEffect, useState } from "react";
import { QuotationsService } from "@/services/QuotationsService";
import { AdminService } from "@/services/AdminService";
import { User } from "@/types/User";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { AdminCreateUser } from "@/types/User";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { adaptToDropdown } from "@/app/adapters/adaptToDropdown";
import SearchInput from "@/components/SearchInput";

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [lastQuotations, setLastQuotations] = useState<
    {
      taskNumber: string;
      expirationDateTime: string;
      buyerName: string;
      clientName: string;
    }[]
  >([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [shouldFetch, setShouldFetch] = useState(false);

  const { toast } = useToast();
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await AdminService.getAllUsers();
        setUsers(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const fetchLastFiveQuotations = async () => {
      try {
        const data = await QuotationsService.getLastFiveFinishedQuotations();
        setLastQuotations(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchUsers();
    fetchLastFiveQuotations();
    setShouldFetch(false);
  }, [shouldFetch]);

  const filteredUsers = users
    .filter((user) =>
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "all") return 0;
      if (sortBy === a.role.name) return -1;
      if (sortBy === b.role.name) return 1;
      return 0;
    });

  const handleUserCreated = async (newUser: AdminCreateUser) => {
    try {
      await AdminService.createUser(newUser);
      setIsDialogOpen(false);
      setShouldFetch(true);
      toast({
        title: "Usuario creado",
        description: `Se ha creado el usuario ${
          newUser.name + " " + newUser.lastname
        } con éxito.`,
      });
    } catch (error) {
      console.error("Error adding item:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Error al crear el usuario",
        variant: "destructive",
      });
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const fetchSearchResults = async (searchTerm: string) => {
    const data: { id: number; taskNumber: string }[] =
      await QuotationsService.searchQuotationByTaskNumber(searchTerm);
    return adaptToDropdown(data, "id", "taskNumber");
  };

  return (
    <div className="flex justify-start w-full h-auto lg:h-screen flex-col bg-neutral-50">
      <div className="w-full h-20 flex-shrink-0 border-b border-neutral-200">
        <div className="flex justify-between items-center h-full px-6 mb-4">
          <div className="flex flex-col justify-center items-start w-[12vw]">
            <h2 className="flex items-center text-xl leading-[1] p-0 font-[800] text-black mt-1">
              General
            </h2>
          </div>
          <SearchInput
            placeholder="Buscar cotización"
            onSearch={fetchSearchResults}
            link="/history"
            linkWithName
          />
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
                          src={user?.profilePic || "/default-profile-pic.png"}
                          width={700}
                          height={700}
                          alt="Picture of the author"
                          className="w-8 h-8 rounded-full"
                        />
                        <div className="flex flex-col gap-0.5 leading-none">
                          <span className="font-semibold">
                            {user?.name + " " + user?.lastname}
                          </span>
                          <span className="text-xs text-muted-foreground -mt-0.5">
                            {user?.email}
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
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => logout()}
                      >
                        <div className="flex items-center">
                          <LogOut className="mr-2 h-4 w-4" />
                          <span>Cerrar sesión</span>
                        </div>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenuItem>
              </SidebarMenu>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row items-start w-full h-[calc(100%-5rem)]">
        <div className="w-full lg:w-1/3 h-full flex flex-col border-r border-neutral-200 relative p-[1vw]">
          <div className="w-full flex flex-col pb-[0.5vw]">
            <h2 className="text-[2vw] font-[800] leading-[1.1]">
              Mis cotizaciones
            </h2>
            <p className="text-gray-500">Vista general de mis cotizaciones</p>
          </div>
          <div className="h-full gap-3 flex flex-col">
            <CurrentQuotationCard />
            <QuotationSlider quotations={lastQuotations} />
          </div>
        </div>

        <div className="w-full lg:w-2/3 h-full flex flex-col relative p-[1vw]">
          <div className="w-full flex flex-col pb-[0.5vw]">
            <h2 className="text-[2vw] font-[800] leading-[1]">
              Panel Administrador
            </h2>
            <p className="text-gray-500">Panel de acciones de administrador</p>
          </div>
          <div className="flex flex-row gap-3 h-full">
            {/* <div className="flex flex-col p-4 relative bg-white border border-neutral-200 shadow-sm rounded-[18px] w-full h-full">
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
              </div> */}
            <div className="flex flex-col w-full h-full">
              <div className="flex flex-col relative py-4 bg-white border border-neutral-200 shadow-sm rounded-[18px] w-full h-full">
                <div className="mb-4 mx-4 relative flex items-center justify-between">
                  <input
                    className="w-60 h-10 rounded-3xl bg-gray-50 border border-neutral-200 px-8"
                    placeholder="Buscar usuario"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search
                    size={20}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 text-neutral-400 z-10"
                  />

                  <div className="flex items-center gap-2">
                    <span className="text-sm text-neutral-500">
                      Ordenar por:
                    </span>
                    <select
                      className="h-10 rounded-lg bg-gray-50 border border-neutral-200 px-3 text-sm"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <option value="All">Todos</option>
                      <option value="Superadmin">Superadmin</option>
                      <option value="Admin">Admin</option>
                      <option value="User">Usuario</option>
                    </select>
                  </div>
                </div>

                <ScrollArea className="border-neutral-100 border-t px-4 h-[50vh]">
                  <div className="space-y-4 mt-4">
                    {filteredUsers.map((user) => (
                      <div
                        key={user.id}
                        className="w-full flex items-center justify-between"
                      >
                        <div className="flex items-center justify-start">
                          <div className="flex items-center space-x-2">
                            <Image
                              src={
                                user.profilePic || "/default-profile-pic.png"
                              }
                              width={700}
                              height={700}
                              alt="Picture of the author"
                              className="w-8 h-8 rounded-full"
                            />
                            <div className="flex flex-col items-start justify-start min-w-64">
                              <h3 className="text-sm font-semibold">
                                {user.name + " " + user.lastname}
                              </h3>
                              <p className="text-xs font-semibold opacity-50 -mt-0.5">
                                {user.email}
                              </p>
                            </div>
                          </div>
                          <div className="w-28">
                            <div
                              className={`px-2 rounded-3xl inline-block ${
                                user.role.name === "Superadmin"
                                  ? "bg-red-100 text-red-500"
                                  : user.role.name === "Admin"
                                  ? "bg-blue-100 text-blue-500"
                                  : "bg-green-100 text-green-600"
                              }`}
                            >
                              <span className="text-sm font-semibold">
                                {user.role.name}
                              </span>
                            </div>
                          </div>
                          <div className=""></div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            onClick={() => {
                              router.push(`/user-history/${user.id}`);
                            }}
                            variant="secondary"
                          >
                            Ver cotizaciones
                          </Button>
                          <Button variant="secondary">Gestionar usuario</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <div className="w-auto flex pr-2 justify-end gap-2 items-end h-auto pt-4 border-t border-neutral-100">
                  <Button
                    variant="primary"
                    className="px-3 py-2 bg-neutral-900 text-white text-sm mr-2"
                    onClick={() => setIsDialogOpen(true)}
                  >
                    Crear Usuario
                  </Button>
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="text-2xl">
                          Agregar nuevo usuario
                        </DialogTitle>
                      </DialogHeader>
                      <div className="bg-white rounded-lg w-full">
                        <CreateUser
                          onUserCreated={handleUserCreated}
                          onDialogClose={handleDialogClose}
                        />{" "}
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                <Toaster />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
