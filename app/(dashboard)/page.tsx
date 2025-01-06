"use client";
import { ChevronRight, Plus } from "react-feather";
import { User, Calendar, DollarSign } from "react-feather";

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

  const handleNavigateToCreate = () => {};

  return (
    <div className="flex justify-start w-full h-full flex-col bg-background py-8 px-6">
      <div className="w-full h-[7vw] rounded-[10px] mb-4 bg-gradient-to-r from-primary to-sky-200 flex-shrink-0">
        <div className="flex flex-col justify-end items-start h-full p-4">
          <h2 className="text-[2vw] leading-[0.85] font-semibold text-white">
            General
          </h2>
          <p className="text-[0.8vw] leading-[1] ml-1 text-white mt-2 opacity-90">
            Vista general del tarifario
          </p>
        </div>
      </div>
      <div className="flex gap-4 mb-4 items-start text-gray-900">
        {/* CREAR COTIZACION */}
        <div className="flex flex-col justify-between w-1/2 h-[14vw] rounded-[10px] mb-4 bg-gray-100 p-4">
          <div>
            <h2 className="text-2xl font-semibold text-secondary mb-2">
              Crear Cotización
            </h2>
            <p className="text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ac
              leo vitae felis bibendum varius at non quam. Pellentesque ornare
              porttitor purus, vitae elementum est lobortis fermentum. Integer
              ac velit ut tellus fringilla pellentesque. Vestibulum vel felis
              nisl. Nam molestie eu est nec accumsan.
            </p>
          </div>
          <button
            onClick={handleNavigateToCreate}
            className="flex items-center justify-between rounded-lg gap-2 p-2 bg-background"
          >
            <label className="pl-4 font-medium">Cotizar</label>
            <ChevronRight size={30} className="text-secondary" />
          </button>
        </div>

        {/* LISTADO DE COTIZACIONES */}
        <div className="w-1/2 h-[14vw] rounded-[10px] mb-4 bg-sky-50">
          <div className="flex flex-col p-4">
            <h2 className="text-lg font-semibold text-secondary mb-2">
              Últimas cotizaciones
            </h2>
            <div className="space-y-3">
              {cotizaciones.map((cotizacion) => (
                <div
                  key={cotizacion.id}
                  className="flex items-center bg-white rounded-lg p-3 cursor-pointer hover:bg-gray-50"
                >
                  <div className="flex-1">
                    <div className="flex gap-4">
                      <h3 className="text-base font-semibold text-gray-700">
                        {cotizacion.name}
                      </h3>
                      <div className="text-sm text-gray-500 flex items-center gap-2">
                        <User size={16} className="text-gray-400" />
                        {cotizacion.client}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
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
      </div>
    </div>
  );
}
