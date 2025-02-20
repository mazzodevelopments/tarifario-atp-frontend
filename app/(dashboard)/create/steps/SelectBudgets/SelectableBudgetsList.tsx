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
import React, { useEffect, useState } from "react";
import { QuoteService } from "@/services/QuoteService";

interface SelectableSalesListProps {
  quotationId: number;
  selectedBudgets: Budget[];
  setSelectedBudgets: (budgets: Budget[]) => void;
  setBudgetsToEnableButton: (budgets: Budget[]) => void;
}

export default function SelectableBudgetsList({
  quotationId,
  selectedBudgets,
  setSelectedBudgets,
  setBudgetsToEnableButton,
}: SelectableSalesListProps) {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [shouldFetch, setShouldFetch] = useState(true);

  useEffect(() => {
    if (!shouldFetch) return;

    const fetchQuotationBudgets = async () => {
      try {
        const quotationBudgets = await QuoteService.getQuotationBudgets(
          quotationId,
          "sales-data",
        );
        setBudgets(quotationBudgets);
        setShouldFetch(false);
      } catch (error) {
        console.error("Error fetching quotation budgets:", error);
      }
    };

    fetchQuotationBudgets();
  }, [shouldFetch]);

  // SELECCIONAR AL MENOS UNO PARA PODER HABILITAR EL BOTÓN DE NEXT
  useEffect(() => {
    setBudgetsToEnableButton(selectedBudgets);
  }, [selectedBudgets, setBudgetsToEnableButton]);

  const handleBudgetSelection = (e: React.MouseEvent, budget: Budget) => {
    e.stopPropagation();
    if (selectedBudgets.some((b) => b.id === budget.id)) {
      const updatedBudgets = selectedBudgets.filter((b) => b.id !== budget.id);
      setSelectedBudgets(updatedBudgets);
    } else {
      const updatedBudgets = [...selectedBudgets, budget];
      setSelectedBudgets(updatedBudgets);
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
                <TableHead className="text-primary font-[600] text-center">
                  Numeración
                </TableHead>
                <TableHead className="text-primary font-[600] text-center">
                  Item
                </TableHead>
                <TableHead className="text-primary font-[600] text-center">
                  Proveedor
                </TableHead>
                <TableHead className="text-primary font-[600] text-center">
                  Origen
                </TableHead>
                <TableHead className="text-primary font-[600] text-center">
                  Destino
                </TableHead>
                <TableHead className="text-primary font-[600] text-center">
                  T. Producción
                </TableHead>
                <TableHead className="text-primary font-[600] text-center">
                  Incoterm
                </TableHead>
                <TableHead className="text-primary font-[600] text-center">
                  Total Flete
                </TableHead>
                <TableHead className="text-primary font-[600] text-center">
                  Precio Total
                </TableHead>
                <TableHead className="text-primary font-[600] text-center">
                  Margen
                </TableHead>
                <TableHead className="text-primary font-[600] text-center">
                  Precio V. Unitario
                </TableHead>
                <TableHead className="text-primary font-[600] text-center">
                  Precio V. Total
                </TableHead>
                <TableHead className="text-primary font-[600] text-center">
                  Condición de Pago
                </TableHead>
                <TableHead className="text-primary font-[600] text-center">
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
                    key={budget.id}
                    className="h-12 hover:bg-gray-50 text-center"
                  >
                    <TableCell>{budget.numbering}</TableCell>
                    <TableCell>{budget.purchaseData?.item?.detail}</TableCell>
                    <TableCell>{budget.purchaseData?.supplier}</TableCell>
                    <TableCell>{budget.purchaseData?.origin}</TableCell>
                    <TableCell>{budget.purchaseData?.destination}</TableCell>
                    <TableCell>
                      {budget.purchaseData?.productionTime} días
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
                            selectedBudgets.some((b) => b.id === budget.id)
                              ? "bg-primary border-primary"
                              : "border-gray-300"
                          } flex items-center justify-center cursor-pointer hover:border-primary transition-colors`}
                        >
                          {selectedBudgets.some((b) => b.id === budget.id) && (
                            <Check className="w-4 h-4 text-white" />
                          )}
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
