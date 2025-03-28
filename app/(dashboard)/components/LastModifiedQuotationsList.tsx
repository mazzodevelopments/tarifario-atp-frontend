"use client";

import Button from "@/components/Button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

const getStepLink = (
  quotationId: number,
  taskNumber: string,
  step: StepKeys
): string => {
  const baseLinks = {
    1: `/create/${quotationId}/items`,
    2: `/create/${quotationId}/purchase-data`,
    3: `/create/${quotationId}/logistic`,
    4: `/create/${quotationId}/sales-data`,
    5: `/create/${quotationId}/select-budgets`,
    6: `/create/${quotationId}/review`,
    7: `/quotations/${taskNumber}`,
  };

  return baseLinks[step];
};

interface QuotationListProps {
  quotations: {
    id: number;
    taskNumber: string;
    expirationDateTime: string;
    step: number;
  }[];
}

export default function LastModifiedQuotationsList({
  quotations,
}: QuotationListProps) {
  return (
    <div className="2xl:block w-full h-full  bg-white border border-neutral-200 shadow-sm rounded-[18px] relative overflow-hidden select-none">
      <div className="flex-grow overflow-hidden relative p-3 h-full max-h-[calc(100vh-5vh)]">
        <ScrollArea className="h-full ">
          <div className="w-full min-w-max">
            {/* Header Row */}
            <div className="flex border-b border-neutral-200 py-2 items-center">
              <div className="flex-1 text-center font-medium text-sm text-neutral-500">
                Nombre
              </div>
              <div className="flex-1 text-center font-medium text-sm text-neutral-500">
                Estado
              </div>
              <div className="flex-1 text-center font-medium text-sm text-neutral-500">
                Fecha de Expiración
              </div>
              <div className="flex-1 text-center font-medium text-sm text-neutral-500">
                Cotizar
              </div>
            </div>

            {/* Data Rows */}
            {quotations.map((quotation) => {
              const actualStep = quotation.step as StepKeys;
              const stepText = stepTexts[actualStep] || "Estado desconocido";
              const isCompleted = quotation.step === 7;
              const link = getStepLink(
                quotation.id,
                quotation.taskNumber,
                actualStep
              );

              return (
                <div
                  key={quotation.id}
                  className="flex items-center border-b border-neutral-100 py-3 hover:bg-neutral-50"
                >
                  <div className="flex-1 font-[600] text-center text-md">
                    {quotation.taskNumber}
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div
                      className={
                        isCompleted
                          ? "bg-green-100 text-green-600 flex px-3 py-1 justify-center items-center rounded-2xl text-sm"
                          : "bg-orange-100 text-orange-600 flex px-3 py-1 justify-center items-center rounded-2xl text-sm"
                      }
                    >
                      {stepText}
                    </div>
                  </div>
                  <div className="flex-1 text-center text-sm">
                    {new Date(quotation.expirationDateTime).toLocaleDateString(
                      "es-ES",
                      {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      }
                    )}
                  </div>
                  <div className="flex-1 flex justify-center">
                    <Link href={link} passHref>
                      <Button variant="secondary">
                        {isCompleted ? "Ver cotización" : "Ir a cotizar"}
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </div>
      <div className="w-auto flex pr-2 justify-end gap-2 items-end relative h-auto py-4 border-t border-neutral-100 flex-shrink-0">
        <Button
          variant="primary"
          className="px-3 py-2 bg-neutral-900 text-white text-sm mr-2"
        >
          Crear Usuario
        </Button>
      </div>
    </div>
  );
}
