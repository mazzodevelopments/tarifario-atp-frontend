"use client";
import { Plus, Server } from "react-feather";
import { User, Calendar, DollarSign, Search } from "react-feather";
import Image from "next/image";
import defaultProfilePic from "@/public/default-profile-pic.png";
import Header from "./components/Header";

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
  ];

  return (
    <div className="flex justify-start w-full h-full flex-col bg-gray-50 px-[20px]">
      <Header
        title="General"
        description="Vista general del Tarifario"
        searchInput={true}
      />
      <div className="flex flex-row gap-3 items-start text-gray-900 h-full">
        <div className="flex flex-col gap-3 items-start text-gray-900 w-auto h-full">
          <div className="gap-3 w-full h-1/2 flex flex-row">
            {/* CREAR COTIZACION */}
            <div className="flex flex-col justify-between w-auto mb-3 h-full">
              <div className="rounded-[18px] flex bg-white shadow-sm w-[12vw] h-full px-6 items-center justify-center flex-col">
                <Plus
                  className="text-black mr-1 mt-[1vw]"
                  fontWeight="bold"
                  size={"4vw"}
                />
                <h3 className="text-[1vw] font-semibold mt-[1vw] text-black bg-transparent outline-none">
                  Crear cotización
                </h3>
              </div>
            </div>

            {/* COMPARAR COTIZACION */}
            <div className="flex flex-col justify-between w-auto mb-3 h-full">
              <div className="rounded-[18px] flex bg-white shadow-sm w-[12vw] h-full px-6 items-center justify-center flex-col">
                <Server
                  className="text-black mr-1 mt-[1.25vw]"
                  fontWeight="bold"
                  size={"3.5vw"}
                />
                <h3 className="text-[1vw] font-semibold mt-[1.25vw] text-black bg-transparent outline-none">
                  Comparar
                </h3>
              </div>
            </div>
          </div>
          <div className="w-[calc(24vw+0.75rem)] h-full bg-white shadow-sm rounded-[18px]"></div>
        </div>
        <div className="h-full w-full flex flex-row gap-3">
          <div className="w-1/2 h-full flex flex-col">
            {/* LISTADO DE COTIZACIONES */}
            <div className="w-full h-full rounded-[18px] mb-3 bg-white shadow-sm">
              <div className="flex flex-col p-4">
                <h2 className="text-lg font-semibold text-black mb-2">
                  Últimas cotizaciones
                </h2>
                <div className="space-y-3">
                  {cotizaciones.map((cotizacion) => (
                    <div
                      key={cotizacion.id}
                      className="flex items-center bg-sky-50 rounded-lg p-3 cursor-pointer hover:bg-gray-50"
                    >
                      <div className="flex-1">
                        <div className="flex gap-3">
                          <h3 className="text-black font-semibold">
                            {cotizacion.name}
                          </h3>
                          <div className="text-sm text-gray-500 flex items-center gap-2">
                            <User size={16} className="text-gray-400" />
                            {cotizacion.client}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <div className="flex items-center gap-2 text-gray-500">
                          <Calendar size={16} className="text-gray-400" />
                          {cotizacion.date.split("T")[0]}
                        </div>
                        <div className="flex items-center text-primary font-semibold">
                          <DollarSign size={16} />
                          {cotizacion.value}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="gap-3 w-full h-1/2 flex flex-row">
              <div className="flex flex-col justify-between w-full mb-3 h-full">
                <div className="w-full h-full bg-white shadow-sm rounded-[18px]"></div>
              </div>
            </div>
          </div>
          <div className="w-1/2 h-full flex flex-col-reverse gap-3">
            {/* LISTADO DE COTIZACIONES */}
            <div className="w-full h-full rounded-[18px] bg-white shadow-sm"></div>
            <div className="gap-3 w-full h-1/2 flex flex-row">
              <div className="flex flex-col justify-between w-full mb-3 h-full">
                <div className="w-full h-full bg-white shadow-sm rounded-[18px]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
