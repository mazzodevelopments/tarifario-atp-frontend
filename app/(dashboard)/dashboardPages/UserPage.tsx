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
import { ChevronDown, ChevronRight, LogOut, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { QuotationsService } from "@/services/QuotationsService";
import PagesHeader from "./pagesHeader";
import SearchInput from "@/components/SearchInput";
import QuotationsList from "../components/LastModifiedQuotationsList";
import { useExpo } from "@/context/ExpoContext";

export default function UserPage() {
  const { user, logout } = useAuth();
  const [lastQuotations, setLastQuotations] = useState<
    {
      id: number;
      taskNumber: string;
      expirationDateTime: string;
      step: number;
    }[]
  >([]);
  const [finishedQuotations, setFinishedQuotations] = useState<number>(0);
  const [shouldFetch, setShouldFetch] = useState(false);
  const { isExpo } = useExpo();

  useEffect(() => {
    const fetchLastModifiedQuotations = async () => {
      try {
        if (user) {
          const data = await QuotationsService.getLastModifiedQuotations();
          setLastQuotations(data);
          console.log(lastQuotations);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const fetchFinishedQuotations = async () => {
      try {
        if (user) {
          const finishedQuotations =
            await QuotationsService.getUserFinishedQuotations();
          setFinishedQuotations(finishedQuotations.length);
        }
      } catch (error) {
        console.error("Error fetching quotation items:", error);
      }
    };

    fetchLastModifiedQuotations();
    fetchFinishedQuotations();
    setShouldFetch(false);
  }, [shouldFetch]);

  const fetchSearchResults = async (searchTerm: string) => {
    const data = await QuotationsService.searchQuotationByTaskNumber(
      searchTerm,
      isExpo,
    );

    return data.map(
      (item: { id: number; taskNumber: string; step: number }) => ({
        id: item.id,
        name: item.taskNumber,
        step: item.step,
      }),
    );
  };

  const roles = user?.roles?.map((role) => role.name) || [];

  return (
    <div className="flex justify-start w-full h-screen flex-col bg-neutral-50">
      <div className="w-full h-20 flex-shrink-0 border-b border-neutral-200">
        <div className="flex justify-between items-center h-full px-6 mb-4">
          <div className="flex flex-col justify-center items-start w-[12vw]">
            <h2 className="flex items-center text-xl leading-[1] p-0 font-[800] text-black">
              General
            </h2>
          </div>
          <SearchInput
            placeholder="Buscar cotización"
            onSearch={fetchSearchResults}
            link={(result) => {
              const baseLinks = {
                1: `/create/${result.id}/items`,
                2: `/create/${result.id}/purchase-data`,
                3: `/create/${result.id}/logistic`,
                4: `/create/${result.id}/sales-data`,
                5: `/create/${result.id}/select-budgets`,
                6: `/create/${result.id}/review`,
                7: `/quotations/${result.name}`,
              };

              return result.step
                ? baseLinks[result.step as keyof typeof baseLinks]
                : `/quotations/${result.name}`;
            }}
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
      <div className="flex flex-row items-start w-full h-[100vh]">
        <div className="w-1/2 h-full flex flex-col justify-center items-center relative p-[1vw] border-r border-neutral-200 ">
          <PagesHeader
            title="Cotizaciones"
            subtitle="Vista general de las cotizaciones más recientes"
          />
          <div className="w-full h-full flex flex-col">
            {/* <CurrentQuotationCard userId={user ? user.id : 0} /> */}
            <QuotationsList quotations={lastQuotations} />
          </div>
        </div>

        <div className="w-1/2 h-full flex flex-col justify-center items-center relative p-[1vw]">
          <PagesHeader
            title="Panel de usuario"
            subtitle="Características generales del usuario."
          />
          <div className="flex flex-col p-[1vw] relative bg-white border border-neutral-200 shadow-sm rounded-[18px] w-full h-[50%]">
            <div className="flex flex-col h-full gap-3">
              <div className="flex justify-between items-start h-full relative w-full gap-2">
                <div className="w-full relative flex gap-2 h-full">
                  <div className="flex flex-col max-w-80 w-full justify-between items-center bg-primary/10 rounded-[10px] h-full p-4">
                    <span className="text-[1vw] font-[700] leading-[1] text-primary text-center">
                      Cotizaciones modificadas
                    </span>
                    <h3 className="font-[700] text-[4.5vw] text-primary mt-1">
                      {finishedQuotations || 0}
                    </h3>
                    <Link
                      href={`/quotations?tab=completed`}
                      className="flex items-center"
                    >
                      <span className=" text-primary">
                        Ver mis cotizaciones
                      </span>
                      <ChevronRight className="text-primary" />
                    </Link>
                  </div>
                  <div className="flex flex-col max-w-80 w-full justify-between items-center bg-orange-100 rounded-[10px] h-full p-4">
                    <span className="text-[1vw] font-[700] leading-[1] text-orange-600 text-center">
                      Cotizaciones pendientes
                    </span>
                    <h3 className="font-[700] text-[4.5vw] text-orange-600 mt-1">
                      {finishedQuotations || 0}
                    </h3>
                    <Link
                      href={`/quotations?tab=completed`}
                      className="flex items-center"
                    >
                      <span className=" text-orange-600">
                        Ver mis cotizaciones
                      </span>
                      <ChevronRight className="text-orange-600" />
                    </Link>
                  </div>
                  <div className="flex flex-col max-w-80 w-full justify-between items-center bg-green-100 rounded-[10px] h-full p-4">
                    <span className="text-[1vw] font-[700] leading-[1] text-neutral-500 text-center">
                      Cotizaciones completadas
                    </span>
                    <h3 className="font-[700] text-[4.5vw] text-green-600 mt-1">
                      {finishedQuotations || 0}
                    </h3>
                    <Link
                      href={`/quotations?tab=completed`}
                      className="flex items-center"
                    >
                      <span className=" text-green-600">
                        Ver mis cotizaciones
                      </span>
                      <ChevronRight className="text-green-600" />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="relative w-auto flex justify-end gap-2 items-end h-auto">
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
          <div className="h-[50%] w-full mt-3 flex">
            <div className="w-full h-full bg-white shadow-sm border border-neutral-200 rounded-[16px] flex justify-center items-center flex-row gap-3">
              <div className="w-[40%] h-full relative flex justify-center items-center px-10">
                <Image
                  src={"/roles.png"}
                  width={1000}
                  height={1000}
                  alt="Picture of the author"
                  className="w-full relative h-auto"
                />
              </div>
              <div className="w-[60%] h-full justify-center items-start flex flex-col gap-2">
                <h3 className="text-left text-[1.2vw] font-[800]">
                  Roles de usuario
                </h3>
                <p className="text-left text-[0.85vw] max-w-md pr-8">
                  Te han asignado{" "}
                  {roles?.length > 1 ? "los roles de" : "el rol de"}{" "}
                  <strong>{roles?.join(", ")}</strong>. Solo podrás participar
                  en la etapa correspondiente a tu grupo en cada cotización. Tu
                  rol determina las acciones que puedes realizar en el sistema.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
