import type React from "react";
import { Briefcase, User, Calendar, Hash } from "lucide-react";
import Button from "@/components/Button";
import { QuotationData } from "@/types/QuotationData";

const QuotationCard: React.FC<QuotationData> = ({
  taskNumber,
  client,
  buyer,
  expirationDateTime,
  customerRequestNumber,
  atpInternRequestNumber,
}) => {
  return (
    <div className="bg-white shadow-sm border border-neutral-200 rounded-[18px] overflow-hidden w-full">
      <div className="bg-gradient-to-br p-6">
        <h2 className="text-2xl font-[900] text-black truncate">
          {taskNumber}
        </h2>
      </div>
      <div className="px-6 space-y-4">
        <div className="flex items-center space-x-3">
          <Briefcase className="text-gray-400 flex-shrink-0" size={20} />
          <div className="min-w-0 flex-1">
            <p className="text-sm text-gray-500">Cliente</p>
            <p className="font-semibold truncate">{client}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <User className="text-gray-400 flex-shrink-0" size={20} />
          <div className="min-w-0 flex-1">
            <p className="text-sm text-gray-500">Comprador</p>
            <p className="font-semibold truncate">{buyer}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Calendar className="text-gray-400 flex-shrink-0" size={20} />
          <div className="min-w-0 flex-1">
            <p className="text-sm text-gray-500">Fecha de Expiración</p>
            <p className="font-semibold">
              {new Date(expirationDateTime).toLocaleDateString("es-ES")}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Hash className="text-gray-400 flex-shrink-0" size={20} />
          <div className="min-w-0 flex-1">
            <p className="text-sm text-gray-500">
              Número de Solicitud del Cliente
            </p>
            <p className="font-semibold">{customerRequestNumber}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Hash className="text-gray-400 flex-shrink-0" size={20} />
          <div className="min-w-0 flex-1">
            <p className="text-sm text-gray-500">Número Interno ATP</p>
            <p className="font-semibold">{atpInternRequestNumber}</p>
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
