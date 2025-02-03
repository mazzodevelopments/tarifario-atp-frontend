"use client";
import type React from "react";
import { Briefcase, User, Calendar, Hash, Ellipsis } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuotationData } from "@/types/QuotationData";
import { useState } from "react";
import QuotationDetails from "./QuotationDetails";
import Link from "next/link";

const QuotationCard: React.FC<QuotationData> = (quotation) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <div className="bg-white shadow-sm border border-neutral-200 rounded-[18px] overflow-hidden w-full">
        <div className="p-[20px] pb-4 flex justify-between">
          <h2 className="text-2xl font-[800] text-black truncate">
            {quotation.taskNumber}
          </h2>
          <div className="flex items-center gap-1">
            <div className="py-1 px-3 bg-green-100 rounded-3xl">
              <span className="text-sm text-green-600 font-[600]">
                Completada
              </span>
            </div>
            <button className="w-8 h-8 flex justify-center items-center p-1 rounded-full border border-neutral-200">
              <Ellipsis />
            </button>
          </div>
        </div>
        <div className="px-[20px] space-y-6">
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
          <div className="flex w-[85%] gap-16 items-center">
            <div className="flex items-center space-x-3">
              <Calendar className="text-gray-400 flex-shrink-0" size={20} />
              <div className="min-w-0 flex-1">
                <p className="text-sm text-gray-500">Fecha de Recepción</p>
                <p className="font-semibold">
                  {new Date(quotation.expirationDateTime).toLocaleDateString(
                    "es-ES"
                  )}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Calendar className="text-gray-400 flex-shrink-0" size={20} />
              <div className="min-w-0 flex-1">
                <p className="text-sm text-gray-500">Fecha de Carga</p>
                <p className="font-semibold">
                  {new Date(quotation.expirationDateTime).toLocaleDateString(
                    "es-ES"
                  )}
                </p>
              </div>
            </div>
          </div>
          <div className="flex w-[85%] gap-16 items-center">
            <div className="flex items-center space-x-3">
              <Calendar className="text-gray-400 flex-shrink-0" size={20} />
              <div className="min-w-0 flex-1">
                <p className="text-sm text-gray-500">Fecha de Expiración</p>
                <p className="font-semibold">
                  {new Date(quotation.expirationDateTime).toLocaleDateString(
                    "es-ES"
                  )}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Calendar className="text-gray-400 flex-shrink-0" size={20} />
              <div className="min-w-0 flex-1">
                <p className="text-sm text-gray-500">Fecha de Materiales</p>
                <p className="font-semibold">
                  {new Date(quotation.expirationDateTime).toLocaleDateString(
                    "es-ES"
                  )}
                </p>
              </div>
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
        </div>
        <div className="p-[20px] w-full items-center flex justify-end">
          <Link href={`/history/${quotation.taskNumber}`} passHref>
            <Button
              variant="outline"
              className="justify-center items-center py-2 px-4 rounded-xl"
            >
              Ver Detalles
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default QuotationCard;
