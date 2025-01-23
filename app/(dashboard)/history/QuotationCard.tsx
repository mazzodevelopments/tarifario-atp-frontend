"use client";
import type React from "react";
import { Briefcase, User, Calendar, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuotationData } from "@/types/QuotationData";
import { useState } from "react";
import { QuotationDetails } from "./QuotationDetails";

const QuotationCard: React.FC<QuotationData> = (quotation) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <div className="bg-white shadow-sm border border-neutral-200 rounded-[18px] overflow-hidden w-full">
        <div className="bg-gradient-to-br p-6 pb-4">
          <h2 className="text-2xl font-[800] text-black truncate">
            {quotation.taskNumber}
          </h2>
        </div>
        <div className="px-6 space-y-4">
          <div className="flex items-center space-x-3">
            <Briefcase className="text-gray-400 flex-shrink-0" size={20} />
            <div className="min-w-0 flex-1">
              <p className="text-sm text-gray-500">Cliente</p>
              <p className="font-semibold truncate">{quotation.client}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <User className="text-gray-400 flex-shrink-0" size={20} />
            <div className="min-w-0 flex-1">
              <p className="text-sm text-gray-500">Comprador</p>
              <p className="font-semibold truncate">{quotation.buyer}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Calendar className="text-gray-400 flex-shrink-0" size={20} />
            <div className="min-w-0 flex-1">
              <p className="text-sm text-gray-500">Fecha de Expiración</p>
              <p className="font-semibold">
                {new Date(quotation.expirationDateTime).toLocaleDateString(
                  "es-ES",
                )}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Hash className="text-gray-400 flex-shrink-0" size={20} />
            <div className="min-w-0 flex-1">
              <p className="text-sm text-gray-500">
                Número de Solicitud del Cliente
              </p>
              <p className="font-semibold">{quotation.customerRequestNumber}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Hash className="text-gray-400 flex-shrink-0" size={20} />
            <div className="min-w-0 flex-1">
              <p className="text-sm text-gray-500">Número Interno ATP</p>
              <p className="font-semibold">
                {quotation.atpInternRequestNumber}
              </p>
            </div>
          </div>
        </div>
        <div className="p-[20px] w-full items-center flex justify-end">
          <Button
            variant="outline"
            className="justify-center items-center py-2 px-4 rounded-xl"
            onClick={() => setShowDetails(true)}
          >
            Ver Detalles
          </Button>
        </div>
      </div>

      <QuotationDetails
        quotation={quotation}
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
      />
    </>
  );
};

export default QuotationCard;
