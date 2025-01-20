import Cotizacion from "@/app/(dashboard)/components/Cotizacion";
import DEFAULT_PROFILE_PIC from "@/public/default-profile-pic.png";
import { Search } from "react-feather";
import Header from "@/app/(dashboard)/components/Header";
import QuotationCard from "./QuotationCard";

export interface Cotizacion {
  id: number;
  nombreCotizacion: string;
  empresa: string;
  representante: string;
  cantidadItems: number;
  transporte: string;
  tipoProveedor: "Nacional" | "Internacional";
  incoterm: string;
}

export const cotizaciones: Cotizacion[] = [
  {
    id: 1,
    nombreCotizacion: "Cotización Q3-2023",
    empresa: "TechSolutions Inc.",
    representante: "María González",
    cantidadItems: 15,
    transporte: "Marítimo",
    tipoProveedor: "Internacional",
    incoterm: "FOB",
  },
  {
    id: 2,
    nombreCotizacion: "Proyecto Alpha",
    empresa: "Innovate Systems",
    representante: "Carlos Rodríguez",
    cantidadItems: 8,
    transporte: "Aéreo",
    tipoProveedor: "Internacional",
    incoterm: "CIF",
  },
  {
    id: 3,
    nombreCotizacion: "Expansión Local 2023",
    empresa: "Distribuidora Nacional S.A.",
    representante: "Ana Martínez",
    cantidadItems: 22,
    transporte: "Terrestre",
    tipoProveedor: "Nacional",
    incoterm: "N/A",
  },
  {
    id: 4,
    nombreCotizacion: "Actualización Equipos",
    empresa: "Global Tech Corp",
    representante: "John Smith",
    cantidadItems: 12,
    transporte: "Marítimo",
    tipoProveedor: "Internacional",
    incoterm: "DDP",
  },
  {
    id: 5,
    nombreCotizacion: "Suministros Q4",
    empresa: "Industrias Locales Ltda.",
    representante: "Laura Pérez",
    cantidadItems: 30,
    transporte: "Terrestre",
    tipoProveedor: "Nacional",
    incoterm: "N/A",
  },
];

export default function History() {
  return (
    <div className="flex justify-start w-full h-full flex-col bg-transparent px-[20px]">
      <div className="w-full h-auto  rounded-[18px] mb-2 flex-shrink-0">
        <Header
          title="Cotizaciones"
          description="Historial de cotizaciones realizadas"
        />
      </div>
      <div className="flex mb-2 items-center ">
        <div className="flex items-center gap-2 h-14 hover:cursor-pointer">
          <div className="relative w-[12vw]">
            <Search
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary"
            />
            <input
              className="w-full h-[2.25vw] rounded-xl pl-10 pr-4 bg-sky-50  text-md focus:outline-none placeholder-primary"
              placeholder="Buscar cotización"
            />
          </div>
        </div>
      </div>
      <div className="w-full  bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-start mt-2">
          {cotizaciones.map((cotizacion) => (
            <QuotationCard key={cotizacion.id} {...cotizacion} />
          ))}
        </div>
      </div>
    </div>
  );
}
