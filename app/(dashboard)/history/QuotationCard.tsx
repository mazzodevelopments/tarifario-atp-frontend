"use client";
import type React from "react";
import { Briefcase, User, Calendar, Hash, Ellipsis } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Budget } from "@/types/Budget";
import { Item } from "@/types/Item";

interface Quotation {
  id: number;
  taskNumber: string;
  client: string;
  buyer: string;
  receptionDate: string;
  uploadDate: string;
  expirationDateTime: string;
  materialsNeededDate: string;
  customerRequestNumber: string;
  step: number;
  stageId: number;
  budgets: Budget[] | null;
  items: Item[] | null;
}

const stepTexts = {
  1: "Items",
  2: "Compras",
  3: "Logística",
  4: "Ventas",
  5: "Presupuestos",
  6: "Selección",
  7: "Completada",
};

export default function QuotationCard(quotation: Quotation) {
  const stepLinks = {
    1: `/create/${quotation.id}/items`,
    2: `/create/${quotation.id}/purchase-data`,
    3: `/create/${quotation.id}/logistic`,
    4: `/create/${quotation.id}/sales-data`,
    5: `/create/${quotation.id}/select-budgets`,
    6: `/create/${quotation.id}/review`,
    7: `/history/${quotation.taskNumber}`,
  };

  // const actualStep = quotation.step;
  const actualStep = 7;

  const stepText = stepTexts[actualStep] || "Estado desconocido";

  const isCompleted = stepText === "Completada";
  const bgColor = isCompleted ? "bg-green-100" : "bg-orange-100";
  const textColor = isCompleted ? "text-green-600" : "text-orange-600";

  return (
    <>
      <div className="bg-white shadow-sm border border-neutral-200 rounded-[18px] overflow-hidden w-full">
        <div className="p-[20px] pb-4 flex justify-between">
          <h2 className="text-2xl font-[800] text-black truncate">
            {quotation.taskNumber}
          </h2>
          <div className="flex items-center gap-1">
            <div className={`py-1 px-3 ${bgColor} rounded-3xl`}>
              <span className={`text-sm ${textColor} font-[600]`}>
                {stepText}
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
                    "es-ES",
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
                    "es-ES",
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
                    "es-ES",
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
                    "es-ES",
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
          <Link href={stepLinks[actualStep] || ""} passHref>
            <Button
              variant="outline"
              className="justify-center items-center py-2 px-4 rounded-xl"
            >
              {isCompleted ? "Ver Detalles" : "Ir a cotizar"}
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
