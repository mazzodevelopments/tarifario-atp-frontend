"use client";

import { useEffect, useState } from "react";
import { QuotationsService } from "@/services/QuotationsService";
import { useAuth } from "@/context/AuthContext";
import { adaptToDropdown } from "@/app/adapters/adaptToDropdown";
import SearchInput from "@/components/SearchInput";
import PagesHeader from "./pagesHeader";
import UsersList from "@/app/(dashboard)/components/UsersList";
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
import Image from "next/image";
import Link from "next/link";
import QuotationsList from "../components/LastModifiedQuotationsList";

export default function AdminPage() {
  const [lastQuotations, setLastQuotations] = useState<
    {
      id: number;
      taskNumber: string;
      expirationDateTime: string;
      step: number;
    }[]
  >([]);

  const { user, logout } = useAuth();

  useEffect(() => {
    const fetchLastFiveQuotations = async () => {
      try {
        const data = await QuotationsService.getLastModifiedQuotations();
        setLastQuotations(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchLastFiveQuotations();
  }, []);

  const fetchSearchResults = async (searchTerm: string) => {
    const data: { id: number; taskNumber: string }[] =
      await QuotationsService.searchQuotationByTaskNumber(searchTerm);
    return adaptToDropdown(data, "id", "taskNumber");
  };

  return (
    <div className="flex justify-start w-full h-auto lg:h-screen flex-col bg-neutral-50">
      {/* Barra superior */}
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
            link="/quotations"
            linkWithName
          />
          <div className="flex items-center gap-2 h-14 hover:cursor-pointer">
            <div className="relative w-auto">
              <SidebarMenu>
                <SidebarMenuItem>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuButton
                        size="lg"
                        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:bg-primary/5 transition-all duration-300 rounded-xl"
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

      <div className="flex flex-col lg:flex-row items-start w-full h-[100vh]">
        {/* PANEL COTIZACIONES */}
        <div className="w-full lg:w-1/3 h-full flex flex-col border-r border-neutral-200 relative p-[1vw]">
          <PagesHeader
            title="Mis Cotizaciones"
            subtitle="Vista general de mis cotizaciones"
          />
          <div className="h-full gap-3 flex flex-col">
            {/* <CurrentQuotationCard /> */}
            <QuotationsList quotations={lastQuotations} />
          </div>
        </div>

        {/* PANEL ADMINISTRADOR */}
        <div className="w-full lg:w-2/3 h-full flex flex-col relative p-[1vw]">
          <PagesHeader
            title="Panel Administrador"
            subtitle="Panel de acciones de administrador"
          />
          <div className="flex flex-row gap-3 h-full">
            <UsersList />
          </div>
        </div>
      </div>
    </div>
  );
}
