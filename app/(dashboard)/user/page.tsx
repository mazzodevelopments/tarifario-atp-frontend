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
import defaultProfilePic from "@/public/default-profile-pic.png";
import { ChevronDown, LogOut, Search, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { QuotationData } from "@/types/QuotationData";

const quotation: QuotationData = {
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
};

export default function UserPage() {
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
        <div className="w-1/2 h-full flex flex-col justify-center items-center relative p-6 gap-3 border-r border-neutral-200">
          <div className="w-full flex flex-col pb-1 relative">
            <h2 className="text-3xl font-[800]">Mis Cotizaciones</h2>
            <p className="text-gray-500">Cotizaciones recientes y pasadas</p>
          </div>
          <div className="flex flex-row gap-3 w-full h-full relative">
            <div className="flex flex-col w-full">
              <div className="flex flex-col p-4 relative bg-white border border-neutral-200 shadow-sm rounded-[18px] w-full h-full">
                <div className="flex w-full justify-between relative">
                  <h2 className="font-[800] text-[1.5vw]">
                    {quotation.taskNumber}
                  </h2>
                </div>
                <div className="w-full relative h-full flex justify-center items-center">
                  <span className="text-center font-[600]">
                    Aquí se renderizará la tabla perteneciente a la etapa en la
                    que está trabajando el usuario
                  </span>
                </div>
                <div className="relative w-auto flex justify-end gap-2 items-end h-auto">
                  <Button
                    variant="primary"
                    className="px-3 py-2 bg-neutral-900 text-white text-sm"
                  >
                    Abrir Cotización
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <Button
            variant="primary"
            className="bg-primary/5 text-primary border border-primary/30 w-[30%] py-3 justify-center items-center flex"
          >
            Ver más cotizaciones
          </Button>
        </div>

        <div className="w-1/2 h-full flex flex-col relative p-6 gap-3">
          <div className="w-full flex flex-col pb-1">
            <h2 className="text-3xl font-[800]">Panel de usuario</h2>
            <p className="text-gray-500">Información individual y grupal</p>
          </div>
          <div className="flex flex-row gap-3 h-[50%]">
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
          <div className="h-[50%]  w-full flex gap-3">
            <div className="w-1/2 h-full bg-white shadow-sm border border-neutral-200 rounded-[16px] flex justify-center items-center p-10 flex-col gap-3">
              <span className="text-center text-[0.85vw]">
                Estás en el grupo de
              </span>
              <h3 className="text-center font-[700] text-[3vw] text-primary">
                Logística
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
                50
              </h3>
              <Button
                variant="primary"
                className="bg-primary/5 text-primary border my-3 border-primary/30 px-4 py-3 justify-center items-center flex"
              >
                Ver mis cotizaciones
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
