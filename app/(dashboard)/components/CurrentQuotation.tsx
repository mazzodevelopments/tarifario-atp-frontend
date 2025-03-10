"use client";

import Button from "@/components/Button";
import { Avatar } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { QuotationData } from "@/types/QuotationData";
import Link from "next/link";

type StepKeys = 1 | 2 | 3 | 4 | 5 | 6 | 7;

const stepTexts: Record<StepKeys, string> = {
  1: "Items",
  2: "Compras",
  3: "Logística",
  4: "Ventas",
  5: "Presupuestos",
  6: "Selección",
  7: "Completada",
};

export default function CurrentQuotationCard() {
  const usersWorking = 12;
  const quotation: QuotationData = {
    id: 1,
    taskNumber: "A25R-0005",
    client: "MicroTech Solutions",
    buyer: "Andrea Gómez",
    receptionDate: "2025-01-18",
    uploadDate: "2025-01-19",
    expirationDateTime: "2025-02-05T20:00:00",
    materialsNeededDate: "2025-02-01",
    customerRequestNumber: "REQ-2025-005",
    step: 2,
    stageId: 1,
    items: null,
    budgets: null,
  };

  const stepLinks: Record<StepKeys, string> = {
    1: `/create/${quotation.id}/items`,
    2: `/create/${quotation.id}/purchase-data`,
    3: `/create/${quotation.id}/logistic`,
    4: `/create/${quotation.id}/sales-data`,
    5: `/create/${quotation.id}/select-budgets`,
    6: `/create/${quotation.id}/review`,
    7: `/history/${quotation.taskNumber}`,
  };

  const actualStep = quotation.step as StepKeys;
  const stepText = stepTexts[actualStep] || "Estado desconocido";

  const isCompleted = quotation.step === 7;
  const colors = isCompleted
    ? "bg-green-100 text-green-600"
    : "bg-orange-100 text-orange-600";

  return (
    <div className="w-full h-[65%] bg-white border border-neutral-200 shadow-sm rounded-[18px] relative">
      <div className="flex flex-col p-4 relative">
        <div className="flex items-start justify-between mb-3">
          <h2 className="text-lg font-[800] text-black">Cotización reciente</h2>
          <div className="flex flex-col items-end w-[25%]">
            <TooltipProvider>
              <Tooltip delayDuration={250}>
                <TooltipTrigger>
                  <div className="flex -space-x-2 overflow-hidden items-center hover:bg-neutral-100 p-1 rounded-md">
                    <Avatar className="inline-block border-2 size-7 border-white">
                      <img src="/default-profile-pic.png" alt="User 1" />
                    </Avatar>
                    <Avatar className="inline-block border-2 size-7 border-white">
                      <img src="/default-profile-pic.png" alt="User 2" />
                    </Avatar>
                    <Avatar className="inline-block border-2 size-7 border-white">
                      <img src="/default-profile-pic.png" alt="User 3" />
                    </Avatar>
                    <div className="pl-3">
                      <span className="font-[600]">+9</span>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="bg-sky-100">
                  <p className="text-primary text-[1.2em] font-[600]">
                    {usersWorking} usuarios trabajando
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-md font-medium text-neutral-700">
              N# Tarea:
            </span>
            <span className="text-md text-neutral-900">
              {quotation.taskNumber}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-md font-medium text-neutral-700">
              Cliente:
            </span>
            <span className="text-md text-neutral-900">{quotation.client}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-md font-medium text-neutral-700">
              Fecha de Recepción:
            </span>
            <span className="text-md text-neutral-900">
              {new Date(quotation.receptionDate).toLocaleDateString("es-ES")}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-md font-medium text-neutral-700">
              Fecha de Expiración:
            </span>
            <span className="text-md text-neutral-900">
              {new Date(quotation.expirationDateTime).toLocaleDateString(
                "es-ES",
              )}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-md font-medium text-neutral-700">Etapa:</span>
            <span
              className={`text-sm font-medium ${colors} px-2 py-1 rounded-full`}
            >
              {stepText}
            </span>
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 right-4 w-auto flex justify-end gap-2 items-end h-auto">
        <Button variant="secondary" className="px-3 py-2 text-sm">
          Ver más cotizaciones
        </Button>

        <Link href={stepLinks[actualStep] || ""} passHref>
          <Button
            variant="primary"
            className="px-3 py-2 bg-neutral-900 text-white text-sm"
          >
            Abrir cotización
          </Button>
        </Link>
      </div>
    </div>
  );
}
