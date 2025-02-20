import React, { useEffect } from "react";
import { useState } from "react";
import Button from "@/components/Button";
import { Pencil, PlusCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Budget } from "@/types/Budget";
import type { SalesData } from "@/types/SalesData";
import AddMargin from "./AddMargin";
import AddPaymentCondition from "./AddPaymentCondition";
import "@/app/utils/formatNumber";
import { QuoteService } from "@/services/QuoteService";

interface SalesListProps {
  quotationId: number;
  setBudgetsToEnableButton: (budgets: Budget[]) => void;
}

export default function SalesList({
  quotationId,
  setBudgetsToEnableButton,
}: SalesListProps) {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [shouldFetch, setShouldFetch] = useState(true);
  const [showSalesDataModal, setShowSalesDataModal] = useState(false);
  const [showPaymentConditionModal, setShowPaymentConditionModal] =
    useState(false);
  const [selectedBudgetId, setSelectedBudgetId] = useState<string | null>(null);
  const [editingMargin, setEditingMargin] = useState<number | null>(null);

  // ROW SELECTION (EN PROCESO)
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [lastSelectedRow, setLastSelectedRow] = useState<string | null>(null);

  useEffect(() => {
    if (!shouldFetch) return;

    const fetchQuotationBudgets = async () => {
      try {
        const quotationBudgets = await QuoteService.getQuotationBudgets(
          quotationId,
          "sales-data",
        );
        setBudgets(quotationBudgets);
        // setShouldFetch(false);

        // CHEQUEAR QUE LOS BUDGETS ESTEN COMPLETOS
        const completeBudgets = quotationBudgets.filter(
          (budget) =>
            budget.salesData?.margin && budget.salesData?.paymentCondition,
        );

        // HABILITAR BOTÓN SI LOS BUDGETS ESTÁN COMPLETOS
        if (completeBudgets.length === quotationBudgets.length) {
          setBudgetsToEnableButton(completeBudgets);
        } else {
          setBudgetsToEnableButton([]);
        }
      } catch (error) {
        console.error("Error fetching quotation budgets:", error);
      }
    };

    fetchQuotationBudgets();
  }, [shouldFetch, setBudgetsToEnableButton]);

  const handleRowClick = (budgetNumbering: string, event: React.MouseEvent) => {
    if (event.shiftKey && lastSelectedRow) {
      const currentIndex = budgets.findIndex(
        (b) => b.numbering === budgetNumbering,
      );
      const lastIndex = budgets.findIndex(
        (b) => b.numbering === lastSelectedRow,
      );

      const start = Math.min(currentIndex, lastIndex);
      const end = Math.max(currentIndex, lastIndex);

      const newSelection = budgets
        .slice(start, end + 1)
        .map((b) => b.numbering);

      setSelectedRows(newSelection);
    } else {
      if (selectedRows.includes(budgetNumbering)) {
        setSelectedRows(selectedRows.filter((row) => row !== budgetNumbering));
      } else {
        setSelectedRows([...selectedRows, budgetNumbering]);
      }
      setLastSelectedRow(budgetNumbering);
    }
  };

  const handleSalesDataCreated = async (salesData: SalesData) => {
    try {
      await QuoteService.addMargin(salesData.margin!, quotationId);
      if (selectedBudgetId) {
        const updatedBudgets = budgets.map((budget) =>
          budget.numbering === selectedBudgetId
            ? {
                ...budget,
                salesData: {
                  unitSalePrice: salesData.unitSalePrice,
                  margin: salesData.margin,
                  totalPrice: salesData.totalPrice,
                  paymentCondition: budget.salesData?.paymentCondition || "",
                },
              }
            : budget,
        );

        setBudgets(updatedBudgets);
        setShowSalesDataModal(false);
        setEditingMargin(null);
        // setShouldFetch(true);

        // CHEQUEAR QUE BUDGETS TENGAN EL SALESDATA COMPLETO (PROBAR SI ESTO SE PUEDE SACAR)
        const completeBudgets = updatedBudgets.filter(
          (budget) =>
            budget.salesData?.margin && budget.salesData?.paymentCondition,
        );

        if (completeBudgets.length === updatedBudgets.length) {
          setBudgetsToEnableButton(completeBudgets);
        } else {
          setBudgetsToEnableButton([]);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePaymentConditionCreated = async (paymentCondition: string) => {
    try {
      await QuoteService.addPaymentCondition(paymentCondition, quotationId);
      if (selectedBudgetId) {
        const updatedBudgets = budgets.map((budget) => {
          if (budget.numbering === selectedBudgetId) {
            const currentSalesData = budget.salesData || {
              unitSalePrice: 0,
              totalPrice: 0,
              paymentCondition: "",
            };

            return {
              ...budget,
              salesData: {
                ...currentSalesData,
                paymentCondition,
              },
            };
          }
          return budget;
        });

        setBudgets(updatedBudgets);
        setShowPaymentConditionModal(false);
        // setShouldFetch(true);

        // CHEQUEAR QUE BUDGETS TENGAN EL SALESDATA COMPLETO (PROBAR SI ESTO SE PUEDE SACAR)
        const completeBudgets = updatedBudgets.filter(
          (budget) =>
            budget.salesData?.margin && budget.salesData?.paymentCondition,
        );

        if (completeBudgets.length === updatedBudgets.length) {
          setBudgetsToEnableButton(completeBudgets);
        } else {
          setBudgetsToEnableButton([]);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderSalesDataCell = (budget: Budget) => {
    const handleClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      setSelectedBudgetId(budget.numbering);
      setShowSalesDataModal(true);
    };

    if (budget.salesData?.margin !== undefined) {
      return (
        <div className="flex items-center justify-center gap-2">
          {budget.salesData.margin}%
          <Button
            onClick={handleClick}
            variant="secondary"
            className="p-1 h-auto hover:bg-gray-100"
          >
            <Pencil className="w-4 h-4 text-primary" />
          </Button>
        </div>
      );
    }

    return (
      <div className="w-full flex justify-center">
        <Button
          onClick={handleClick}
          variant="primary"
          className="flex items-center gap-1 text-primary border border-primary/20 bg-primary/5 hover:text-primary-dark "
        >
          <PlusCircle className="w-4 h-4" />
          <span className="mt-[2px]">Agregar</span>
        </Button>
      </div>
    );
  };

  const renderPaymentConditionCell = (budget: Budget) => {
    const handleClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      setSelectedBudgetId(budget.numbering);
      setShowPaymentConditionModal(true);
    };

    if (budget.salesData?.paymentCondition) {
      return (
        <div className="flex items-center justify-center gap-2">
          {budget.salesData.paymentCondition}
        </div>
      );
    }

    return (
      <div className="w-full flex justify-center">
        <Button
          onClick={handleClick}
          variant="primary"
          className="flex items-center gap-1 text-primary border border-primary/20 bg-primary/5 hover:text-primary-dark "
        >
          <PlusCircle className="w-4 h-4" />
          <span className="mt-[2px]">Agregar</span>
        </Button>
      </div>
    );
  };

  const calculateTotalPrice = (budget: Budget): number => {
    let total = 0;

    // PRECIO EXTENDIDO (COMPRAS)
    if (budget.purchaseData) {
      total +=
        budget.purchaseData?.appliedUnitPrice *
        (budget.purchaseData?.item?.quantity ?? 1);
    }

    // SUMA COSTOS TRANSPORTE, ADUANA Y ENTREGA
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
                    className={`h-12 select-none text-center cursor-pointer hover:bg-[#ff000000] ${
                      selectedRows.includes(budget.numbering)
                        ? "bg-primary/10 hover:bg-primary/10 text-primary "
                        : ""
                    }`}
                    onClick={(e) => handleRowClick(budget.numbering, e)}
                  >
                    <TableCell>
                      {budget.stage + " " + budget.numbering}
                    </TableCell>
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
                    <TableCell>{renderSalesDataCell(budget)}</TableCell>
                    <TableCell className="font-[600]">
                      $
                      {(
                        calculateAppliedTotalPrice(budget) /
                        (budget.purchaseData?.item?.quantity ?? 1)
                      ).formatNumber()}
                    </TableCell>
                    <TableCell className="font-[600]">
                      ${calculateAppliedTotalPrice(budget).formatNumber()}
                    </TableCell>
                    <TableCell>{renderPaymentConditionCell(budget)}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <Dialog open={showSalesDataModal} onOpenChange={setShowSalesDataModal}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {editingMargin !== null ? "Editar Margen" : "Cargar Margen"}
            </DialogTitle>
          </DialogHeader>
          <div className="bg-white rounded-lg w-full">
            <AddMargin
              onSalesDataCreated={handleSalesDataCreated}
              onCancel={() => {
                setShowSalesDataModal(false);
                setEditingMargin(null);
              }}
              initialMargin={editingMargin}
            />
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={showPaymentConditionModal}
        onOpenChange={setShowPaymentConditionModal}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl">Condición de Pago</DialogTitle>
          </DialogHeader>
          <div className="bg-white rounded-lg w-full">
            <AddPaymentCondition
              onPaymentConditionCreated={handlePaymentConditionCreated}
              onCancel={() => setShowPaymentConditionModal(false)}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
