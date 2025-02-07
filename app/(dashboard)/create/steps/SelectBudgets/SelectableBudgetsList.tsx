import { Check } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Budget } from "@/types/Budget";
import "@/app/utils/formatNumber";
import React from "react";

interface SelectableSalesListProps {
  budgets: Budget[];
  selectedBudgets: Budget[];
  setSelectedBudgets: (budgets: Budget[]) => void;
}

export default function SelectableBudgetsList({
  budgets,
  selectedBudgets,
  setSelectedBudgets,
}: SelectableSalesListProps) {
  const handleBudgetSelection = (e: React.MouseEvent, budget: Budget) => {
    e.stopPropagation();
    if (selectedBudgets.some((b) => b.numbering === budget.numbering)) {
      setSelectedBudgets(
        selectedBudgets.filter((b) => b.numbering !== budget.numbering)
      );
    } else {
      setSelectedBudgets([...selectedBudgets, budget]);
    }
  };

  const calculateTotalPrice = (budget: Budget): number => {
    let total = 0;

    if (budget.purchaseData) {
      total +=
        budget.purchaseData?.appliedUnitPrice *
        (budget.purchaseData?.item?.quantity ?? 1);
    }

    if (budget.freight?.total) {
      total += budget.freight.total;
    }

    return total;
  };

  const calculateAppliedTotalPrice = (budget: Budget): number => {
    let total = 0;

    total += calculateTotalPrice(budget);
    if (budget.salesData?.margin) {
      total = total * (1 + budget.salesData?.margin / 100);
    }
    return total;
  };

  return (
    <div className="w-full flex justify-center items-center max-w-4xl flex-col">
      <div className="w-auto h-auto overflow-hidden rounded-[12px] shadow-sm shadow-cyan-500/20">
        <div className="border rounded-[12px] max-h-[25vw] relative overflow-auto w-[54vw]">
          <Table className="w-full">
            <TableHeader className="bg-primary/5">
              <TableRow>
                <TableHead className="text-primary font-[600]">
                  Numeración
                </TableHead>
                <TableHead className="text-primary font-[600]">Item</TableHead>
                <TableHead className="text-primary font-[600]">
                  Proveedor
                </TableHead>
                <TableHead className="text-primary font-[600]">
                  Origen
                </TableHead>
                <TableHead className="text-primary font-[600]">
                  Destino
                </TableHead>
                <TableHead className="text-primary font-[600]">
                  T. Producción
                </TableHead>
                <TableHead className="text-primary font-[600]">
                  Incoterm
                </TableHead>
                <TableHead className="text-primary font-[600]">
                  Total Flete
                </TableHead>
                <TableHead className="text-primary font-[600]">
                  Precio Total
                </TableHead>
                <TableHead className="text-primary font-[600]">
                  Margen
                </TableHead>
                <TableHead className="text-primary font-[600]">
                  Precio V. Unitario
                </TableHead>
                <TableHead className="text-primary font-[600]">
                  Precio V. Total
                </TableHead>
                <TableHead className="text-primary font-[600]">
                  Condición de Pago
                </TableHead>
                <TableHead className="text-primary font-[600]">
                  Seleccionar
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-white divide-y divide-gray-200">
              {budgets.length === 0 ? (
                <TableRow className="h-24">
                  <TableCell
                    colSpan={15}
                    className="text-sm m-auto h-full text-center text-gray-500"
                  >
                    No hay presupuestos agregados
                  </TableCell>
                </TableRow>
              ) : (
                budgets.map((budget) => (
                  <TableRow
                    key={budget.numbering}
                    className="h-12 hover:bg-gray-50"
                  >
                    <TableCell>
                      {budget.stage + " " + budget.numbering}
                    </TableCell>
                    <TableCell>{budget.purchaseData?.item?.detail}</TableCell>
                    <TableCell>{budget.purchaseData?.supplier}</TableCell>
                    <TableCell>{budget.purchaseData?.origin}</TableCell>
                    <TableCell>{budget.purchaseData?.destination}</TableCell>
                    <TableCell>
                      {budget.purchaseData?.deliveryTime} días
                    </TableCell>
                    <TableCell>{budget.purchaseData?.incoterm}</TableCell>
                    <TableCell>
                      {budget.freight?.total
                        ? `$${budget.freight.total.formatNumber()}`
                        : "-"}
                    </TableCell>
                    <TableCell>
                      ${calculateTotalPrice(budget).formatNumber()}
                    </TableCell>
                    <TableCell>
                      {(budget.salesData?.margin ?? 0) > 0
                        ? budget.salesData?.margin
                        : 0}
                      %
                    </TableCell>
                    <TableCell className="font-[600]">
                      $
                      {(
                        calculateAppliedTotalPrice(budget) /
                        (budget.purchaseData?.item?.quantity ?? 1)
                      ).formatNumber()}{" "}
                    </TableCell>
                    <TableCell className="font-[600]">
                      ${calculateAppliedTotalPrice(budget).formatNumber()}
                    </TableCell>
                    <TableCell>
                      {" "}
                      {budget.salesData?.paymentCondition
                        ? budget.salesData?.paymentCondition
                        : "-"}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center">
                        <div
                          onClick={(e) => handleBudgetSelection(e, budget)}
                          className={`w-5 h-5 rounded border ${
                            selectedBudgets.some(
                              (b) => b.numbering === budget.numbering
                            )
                              ? "bg-primary border-primary"
                              : "border-gray-300"
                          } flex items-center justify-center cursor-pointer hover:border-primary transition-colors`}
                        >
                          {selectedBudgets.some(
                            (b) => b.numbering === budget.numbering
                          ) && <Check className="w-4 h-4 text-white" />}
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
