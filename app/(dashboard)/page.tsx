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
      <div className="flex flex-row gap-3 items-start w-full h-full">
        <div className="w-1/2 h-full bg-white border-[0.5px] border-[#ebebebcc] shadow-sm rounded-[18px] relative">
          <div className="flex flex-col p-4 relative">
            <div className="flex items-center justify-start mb-3">
              <div className="w-7 h-7 mr-2 bg-primary rounded-[8px] flex justify-center items-center">
                <Briefcase size={18} className="text-white" />
              </div>
              <h2 className="text-2xl font-[800] text-black">Cotizaciones</h2>
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

        <div className="w-1/2 h-full bg-white border-[0.5px] border-[#ebebebcc] shadow-sm rounded-[18px] relative">
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
