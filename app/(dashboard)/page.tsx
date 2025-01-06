"use client";
import { Plus } from "react-feather";
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
      <div className="flex gap-4 mb-4 items-start text-gray-900">
        {/* CREAR COTIZACION */}
        <div className="flex flex-col w-1/2 h-[14vw] rounded-[10px] mb-4 bg-gray-100 p-4">
          <h2 className="text-lg font-semibold text-secondary mb-2">
            Crear Cotización
          </h2>
          <button
            onClick={handleNavigateToCreate}
            className="flex h-full items-center justify-center rounded-lg gap-2 p-2 bg-background"
          >
            <Plus size={50} className="text-secondary" />
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
