"use client";

import Button from "@/components/Button";
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
  step: StepKeys,
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
    <div className="2xl:block w-full h-full bg-white border border-neutral-200 shadow-sm rounded-[18px] relative overflow-hidden select-none">
      <div className="flex flex-col p-3 relative">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-[800] text-black">
            Últimas Cotizaciones Modificadas
          </h2>
        </div>

        <div className="h-auto overflow-y-auto pr-1">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-center">Nombre</TableHead>
                <TableHead className="text-center">Estado</TableHead>
                <TableHead className="text-center">
                  Fecha de Expiración
                </TableHead>
                <TableHead className="text-center">Cotizar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {quotations.map((quotation) => {
                const actualStep = quotation.step as StepKeys;
                const stepText = stepTexts[actualStep] || "Estado desconocido";
                const isCompleted = quotation.step === 7;
                const link = getStepLink(
                  quotation.id,
                  quotation.taskNumber,
                  actualStep,
                );

                return (
                  <TableRow key={quotation.id} className="hover:bg-transparent">
                    <TableCell className="font-[600] text-center">
                      {quotation.taskNumber}
                    </TableCell>
                    <TableCell className="flex justify-center">
                      <div
                        className={
                          isCompleted
                            ? "bg-green-100 text-green-600 flex w-[100px] py-1 justify-center items-center rounded-2xl"
                            : "bg-orange-100 text-orange-600 flex w-[100px] py-1 justify-center items-center rounded-2xl"
                        }
                      >
                        {stepText}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      {new Date(
                        quotation.expirationDateTime,
                      ).toLocaleDateString("es-ES", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </TableCell>
                    <TableCell className="flex justify-center">
                      <Link href={link} passHref>
                        <Button
                          variant="secondary"
                          className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                        >
                          {isCompleted ? "Ver cotización" : "Ir a cotizar"}
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
