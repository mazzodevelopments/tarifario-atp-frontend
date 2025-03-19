"use client";

import Link from "next/link";
import { Briefcase, User, Calendar } from "lucide-react";
import { TableCell, TableRow } from "@/components/ui/table";
import Button from "@/components/Button";
import type { HistoryQuotationCard } from "@/types/Quotations";

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

export function QuotationTableRow({
  quotation,
  isPending = false,
}: {
  quotation: HistoryQuotationCard;
  isPending?: boolean;
}) {
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
  const isCompleted = stepText === "Completada";
  const bgColor = isCompleted ? "bg-green-100" : "bg-orange-100";
  const textColor = isCompleted ? "text-green-600" : "text-orange-600";

  return (
    <TableRow className="text-sm text-center hover:bg-transparent">
      <TableCell className="font-[600] text-black">
        {quotation.taskNumber}
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2 justify-center">
          <Briefcase className="text-gray-400 flex-shrink-0" size={16} />
          <span>{quotation.client}</span>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2 justify-center">
          <User className="text-gray-400 flex-shrink-0" size={16} />
          <span>{quotation.buyer}</span>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2 justify-center">
          <Calendar className="text-gray-400 flex-shrink-0" size={16} />
          <span>
            {new Date(quotation.receptionDate).toLocaleDateString("es-ES")}
          </span>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2 justify-center">
          <Calendar className="text-gray-400 flex-shrink-0" size={16} />
          <span>
            {new Date(quotation.expirationDateTime).toLocaleDateString("es-ES")}
          </span>
        </div>
      </TableCell>
      {isPending && (
        <TableCell>
          <div className={`py-1 px-3 ${bgColor} rounded-3xl inline-block`}>
            <span className={`text-sm ${textColor} font-[600]`}>
              {stepText}
            </span>
          </div>
        </TableCell>
      )}
      <TableCell>
        <div className="flex items-center gap-2 justify-center">
          <Link href={stepLinks[actualStep] || ""} passHref>
            <Button
              variant="secondary"
              className="p-1 h-auto hover:bg-gray-100"
            >
              {isCompleted ? "Ver Detalles" : "Ir a cotizar"}
            </Button>
          </Link>
        </div>
      </TableCell>
    </TableRow>
  );
}
