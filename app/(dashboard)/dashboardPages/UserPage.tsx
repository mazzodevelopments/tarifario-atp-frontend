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
import { ChevronDown, LogOut, Search, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import CurrentQuotationCard from "@/app/(dashboard)/components/CurrentQuotation";
import { QuotationSlider } from "@/app/(dashboard)/components/QuotationCarousel";
import { QuotationsService } from "@/services/QuotationsService";
import PagesHeader from "./pagesHeader";

export default function UserPage() {
  const { user, logout } = useAuth();
  const [lastQuotations, setLastQuotations] = useState<
    {
      taskNumber: string;
      expirationDateTime: string;
      buyerName: string;
      clientName: string;
    }[]
  >([]);
  const [finishedQuotations, setFinishedQuotations] = useState<number>(0);
  const [shouldFetch, setShouldFetch] = useState(false);

  useEffect(() => {
    const fetchUserLastFiveQuotations = async () => {
      try {
        if (user) {
          const data =
            await QuotationsService.getUserLastFiveFinishedQuotations(user.id);
          setLastQuotations(data);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const fetchFinishedQuotations = async () => {
      try {
        if (user) {
          const finishedQuotations =
            await QuotationsService.getUserFinishedQuotations(user.id);
          setFinishedQuotations(finishedQuotations.length);
        }
      } catch (error) {
        console.error("Error fetching quotation items:", error);
      }
    };

    fetchUserLastFiveQuotations();
    fetchFinishedQuotations();
    setShouldFetch(false);
  }, [shouldFetch]);

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
      <div className="flex flex-row items-start w-full h-[100vh]">
        <div className="w-1/2 h-full flex flex-col justify-center items-center relative p-[1vw] border-r border-neutral-200 ">
          <PagesHeader
            title="Mis Cotizaciones"
            subtitle="Vista general de mis cotizaciones"
          />
          <div className="w-full h-full gap-3 flex flex-col">
            <CurrentQuotationCard userId={user ? user.id : 0} />
            <QuotationSlider quotations={lastQuotations} />
          </div>
        </div>

        <div className="w-1/2 h-full flex flex-col relative p-[1vw]">
          <PagesHeader
            title="Panel de usuario"
            subtitle="Información individual y grupal"
          />
          <div className="flex flex-row gap-[0.5vw] h-[50%]">
            <div className="flex flex-col w-full">
              <div className="flex flex-col p-4 relative bg-white border border-neutral-200 shadow-sm rounded-[18px] w-full h-full">
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
          </div>
          <div className="h-[50%] w-full flex gap-3 mt-3">
            <div className="w-1/2 h-full bg-white shadow-sm border border-neutral-200 rounded-[16px] flex justify-center items-center p-10 flex-col gap-3">
              <span className="text-center text-[0.85vw]">
                Estás en el grupo de
              </span>
              <h3 className="text-center font-[700] text-[3vw] text-primary">
                {user?.role.name}
              </h3>
              <p className="text-center text-[0.85vw]">
                Solo podrás participar en la etapa correspondiente a tu grupo en
                cada cotización.
              </p>
            </div>
            <div className="w-1/2 h-full bg-white shadow-sm border border-neutral-200 rounded-[16px] flex justify-center items-center p-10 flex-col">
              <span className="text-center text-[0.85vw] w-[100%]">
                Cotizaciones completadas
              </span>
              <h3 className="text-center font-[700] text-[4vw] text-primary">
                {finishedQuotations}
              </h3>
              <Link href={`/user-history/${user?.id}`}>
                <Button
                  variant="primary"
                  className="bg-primary/5 text-primary border my-3 border-primary/30 px-4 py-3 justify-center items-center flex"
                >
                  Ver mis cotizaciones
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
