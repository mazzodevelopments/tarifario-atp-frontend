"use client";
import { Briefcase, ChevronRight, Plus, Server } from "react-feather";
import { User, Calendar, DollarSign, Search } from "react-feather";
import Image from "next/image";
import defaultProfilePic from "@/public/default-profile-pic.png";
import Header from "./components/Header";
import Button from "@/components/Button";

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
    <div className="flex justify-start w-full h-full flex-col bg-white px-[20px]">
      <Header
        title="General"
        description="Vista general del Tarifario"
        searchInput={true}
      />
      <div className="flex flex-row gap-3 items-start h-full">
        <div className="flex flex-col gap-3 items-start w-auto h-full">
          <div className="gap-3 w-full h-auto flex flex-row">
            {/* CREAR COTIZACION */}
            <div className="flex flex-row justify-between w-auto mb-3 h-full">
              <div className="rounded-[18px] flex bg-neutral-900 shadow-sm w-[12vw] h-full px-6 py-4 items-center justify-center flex-row">
                <Plus
                  className="text-white mr-2"
                  fontWeight="bold"
                  size={"1.5vw"}
                />
                <h3 className="text-md font-[600] text-white bg-transparent outline-none">
                  Crear cotización
                </h3>
              </div>
            </div>

            {/* COMPARAR COTIZACION */}
            <div className="flex flex-row justify-between w-auto mb-3 h-full">
              <div className="rounded-[18px] flex bg-neutral-900 shadow-sm w-[12vw] h-full px-6 py-4 items-center justify-center flex-row">
                <Server
                  className="text-white mr-2"
                  fontWeight="bold"
                  size={"1.25vw"}
                />
                <h3 className="text-md font-[600] text-white bg-transparent outline-none">
                  Comparar
                </h3>
              </div>
            </div>
          </div>
          <div className="w-[calc(24vw+0.75rem)] h-full bg-white border-[0.5px] border-[#ebebebcc] shadow-sm rounded-[18px] relative">
            <div className="flex flex-col p-4 relative">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-2xl font-[800] text-black">
                  Últimas Cotizaciones
                </h2>
                <div className="w-8 h-8 bg-primary rounded-[8px] flex justify-center items-center">
                  <Briefcase size={18} className="text-white" />
                </div>
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
        <div className="h-full w-full flex flex-row gap-3">
          <div className="w-1/2 h-full flex flex-col">
            <div className="gap-3 w-full h-1/2 flex flex-row">
              <div className="flex flex-col justify-between w-full mb-3 h-full">
                <div className="w-full h-full bg-white border-[0.5px] border-[#ebebebcc] shadow-sm rounded-[18px]"></div>
              </div>
            </div>
            {/* LISTADO DE COTIZACIONES */}
            <div className="w-full h-full rounded-[18px] mt-3 bg-white border-[0.5px] border-[#ebebebcc] shadow-sm">
              <div className="flex flex-col p-4">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-2xl font-[800] text-black">
                    Principales Proveedores
                  </h2>
                  {/* <div className="w-8 h-8 bg-red-500 rounded-[8px] flex justify-center items-center">
                    <Briefcase size={18} className="text-white" />
                  </div> */}
                </div>
                <div className="space-y-3">
                  {proveedores.map((proveedor) => (
                    <div
                      key={proveedor.id}
                      className="flex items-center bg-white border-[0.5px] border-[#ebebebcc] rounded-lg p-3 cursor-pointer hover:bg-gray-50"
                    >
                      <div className="flex-1">
                        <div className="flex gap-3 flex-col">
                          <h3 className="text-black font-[800]">
                            {proveedor.name}
                          </h3>
                          <div className="text-sm text-gray-500 flex items-center gap-2">
                            ID: {proveedor.id}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <div className="flex items-center text-black font-[800] flex-col">
                          <p className="text-xl opacity-90">
                            {proveedor.quotations}
                          </p>
                          <span className="mr-1 text-xs opacity-90">
                            Cotizaciones
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="w-full flex justify-end gap-2 items-end h-14">
                  <Button variant="secondary" className="px-3 py-2 text-sm">
                    Ver más proveedores
                  </Button>

                  <Button
                    variant="primary"
                    className="px-3 py-2 bg-neutral-900 text-white text-sm"
                  >
                    Agregar proveedor
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/2 h-full flex flex-col gap-3">
            {/* LISTADO DE COTIZACIONES */}

            <div className="gap-3 w-full h-1/2 flex flex-row">
              <div className="flex flex-col justify-between w-full mb-3 h-full">
                <div className="w-full h-full bg-white border-[0.5px] border-[#ebebebcc] shadow-sm rounded-[18px]"></div>
              </div>
            </div>
            <div className="w-full h-full rounded-[18px] bg-white border-[0.5px] border-[#ebebebcc] shadow-sm"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
