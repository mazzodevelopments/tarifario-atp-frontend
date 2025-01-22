import { Search } from "react-feather";
import Header from "@/app/(dashboard)/components/Header";
import QuotationCard from "./QuotationCard";
import { QuotationData } from "@/types/QuotationData";

const quotations: QuotationData[] = [
  {
    name: "Construcción de Vivienda Familiar",
    client: "Inmobiliaria Soluciones SA",
    buyer: "Juan Pérez",
    receptionDate: "2025-01-15",
    uploadDate: "2025-01-16",
    expirationDateTime: "2025-02-15T23:59:59",
    materialsNeededDate: "2025-01-30",
    customerRequestNumber: "REQ-2025-001",
    atpInternRequestNumber: "ATP-INT-9001",
  },
  {
    name: "Mantenimiento de Maquinaria Industrial",
    client: "Tecnoindustria LTDA",
    buyer: "María López",
    receptionDate: "2025-01-10",
    uploadDate: "2025-01-11",
    expirationDateTime: "2025-01-25T17:00:00",
    materialsNeededDate: "2025-01-20",
    customerRequestNumber: "REQ-2025-002",
    atpInternRequestNumber: "ATP-INT-9012",
  },
  {
    name: "Reparación de Redes Eléctricas",
    client: "ElectroRedes Global",
    buyer: "Carlos Ramírez",
    receptionDate: "2025-01-12",
    uploadDate: "2025-01-13",
    expirationDateTime: "2025-02-01T18:00:00",
    materialsNeededDate: "2025-01-25",
    customerRequestNumber: "REQ-2025-003",
    atpInternRequestNumber: "ATP-INT-9025",
  },
  {
    name: "Instalación de Sistema de Riego",
    client: "AgroSolutions SAC",
    buyer: "Laura Rodríguez",
    receptionDate: "2025-01-09",
    uploadDate: "2025-01-10",
    expirationDateTime: "2025-02-09T15:30:00",
    materialsNeededDate: "2025-01-28",
    customerRequestNumber: "REQ-2025-004",
    atpInternRequestNumber: "ATP-INT-9034",
  },
  {
    name: "Suministro de Componentes Electrónicos",
    client: "MicroTech Solutions",
    buyer: "Andrea Gómez",
    receptionDate: "2025-01-18",
    uploadDate: "2025-01-19",
    expirationDateTime: "2025-02-05T20:00:00",
    materialsNeededDate: "2025-02-01",
    customerRequestNumber: "REQ-2025-005",
    atpInternRequestNumber: "ATP-INT-9042",
  },
];

export default function History() {
  return (
    <div className="flex justify-start w-full h-full flex-col bg-neutral-50">
      <div className="w-full h-auto  rounded-[18px] mb-2 flex-shrink-0">
        <Header
          title="Cotizaciones"
          description="Historial de cotizaciones realizadas"
        />
      </div>
      <div className="w-full px-6 pb-6">
        <div className="flex mb-2 items-center ">
          <div className="flex items-center gap-2 h-14 hover:cursor-pointer">
            <div className="relative w-[12vw]">
              <Search
                size={20}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                className="w-full h-[2.25vw] rounded-[18px] pl-10 pr-4 bg-white shadow-sm border border-neutral-200  text-md focus:outline-none"
                placeholder="Buscar cotización"
              />
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-start mt-2">
            {quotations.map((cotizacion) => (
              <QuotationCard
                key={cotizacion.customerRequestNumber}
                {...cotizacion}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
