import type React from "react";
import { Briefcase, User, Package, Truck, Globe, FileText } from "lucide-react";
import { Cotizacion } from "./page";
import Button from "@/components/Button";

const QuotationCard: React.FC<Cotizacion> = ({
  nombreCotizacion,
  empresa,
  representante,
  cantidadItems,
  transporte,
  tipoProveedor,
  incoterm,
}) => {
  return (
    <div className="bg-white shadow-md rounded-[12px] overflow-hidden w-full">
      <div className="bg-gradient-to-br from-primary/80 to-primary px-6 py-4">
        <h2 className="text-2xl font-bold text-white truncate">
          {nombreCotizacion}
        </h2>
      </div>
      <div className="p-[20px] space-y-4">
        <div className="flex items-center space-x-3">
          <Briefcase className="text-gray-400 flex-shrink-0" size={20} />
          <div className="min-w-0 flex-1">
            <p className="text-sm text-gray-500">Empresa</p>
            <p className="font-semibold truncate">{empresa}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <User className="text-gray-400 flex-shrink-0" size={20} />
          <div className="min-w-0 flex-1">
            <p className="text-sm text-gray-500">Representante</p>
            <p className="font-semibold truncate">{representante}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Package className="text-gray-400 flex-shrink-0" size={20} />
          <div className="min-w-0 flex-1">
            <p className="text-sm text-gray-500">Cantidad de Items</p>
            <p className="font-semibold">{cantidadItems}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Truck className="text-gray-400 flex-shrink-0" size={20} />
          <div className="min-w-0 flex-1">
            <p className="text-sm text-gray-500">Transporte</p>
            <p className="font-semibold">{transporte}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Globe className="text-gray-400 flex-shrink-0" size={20} />
          <div className="min-w-0 flex-1">
            <p className="text-sm text-gray-500">Tipo de Proveedor</p>
            <p className="font-semibold">{tipoProveedor}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <FileText className="text-gray-400 flex-shrink-0" size={20} />
          <div className="min-w-0 flex-1">
            <p className="text-sm text-gray-500">Incoterm</p>
            <p className="font-semibold">{incoterm}</p>
          </div>
        </div>
      </div>
      <div className="p-[20px] w-full items-center flex justify-end">
        <Button
          variant="secondary"
          className="justify-center items-center py-2 px-4"
        >
          Ver Detalles
        </Button>
      </div>
    </div>
  );
};

export default QuotationCard;
