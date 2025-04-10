"use client";

import type React from "react";
import { useEffect } from "react";
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
import AddMarginForm from "./forms/AddMarginForm";
import AddPaymentConditionForm from "./forms/AddPaymentConditionForm";
import "@/utils/formatNumber";
import { QuoteService } from "@/services/QuoteService";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { useExpo } from "@/context/ExpoContext";

export default function SalesList({ quotationId }: { quotationId: number }) {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [shouldFetch, setShouldFetch] = useState(true);
  const [showSalesDataModal, setShowSalesDataModal] = useState(false);
  const [showPaymentConditionModal, setShowPaymentConditionModal] =
    useState(false);
  const [selectedBudgetId, setSelectedBudgetId] = useState<number | null>(null);
  const [editingMargin, setEditingMargin] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { isExpo } = useExpo();

  // ROW SELECTION (EN PROCESO)
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [lastSelectedRow, setLastSelectedRow] = useState<number | null>(null);

  useEffect(() => {
    if (!shouldFetch) return;

    const fetchQuotationBudgets = async () => {
      try {
        setIsLoading(true);
        const quotationBudgets = await QuoteService.getQuotationBudgets(
          quotationId,
          isExpo,
          "sales-data",
        );
        setBudgets(quotationBudgets);
        setIsLoading(false);
        setShouldFetch(false);
      } catch (error) {
        setIsLoading(false);
        console.error("Error fetching quotation budgets:", error);
        toast({
          title: "Error",
          description: "No se pudieron cargar los presupuestos",
          variant: "destructive",
        });
      }
    };

    fetchQuotationBudgets();
  }, [shouldFetch, quotationId, toast]);

  const handleRowClick = (budgetId: number, event: React.MouseEvent) => {
    if (event.shiftKey && lastSelectedRow) {
      const currentIndex = budgets.findIndex((b) => b.id === budgetId);
      const lastIndex = budgets.findIndex((b) => b.id === lastSelectedRow);

      const start = Math.min(currentIndex, lastIndex);
      const end = Math.max(currentIndex, lastIndex);

      const newSelection = budgets.slice(start, end + 1).map((b) => b.id);

      setSelectedRows(newSelection);
    } else {
      if (selectedRows.includes(budgetId)) {
        setSelectedRows(selectedRows.filter((id) => id !== budgetId));
      } else {
        setSelectedRows([...selectedRows, budgetId]);
      }
      setLastSelectedRow(budgetId);
    }
  };

  const handleSalesDataCreated = async (salesData: SalesData) => {
    try {
      if (selectedBudgetId !== null) {
        await QuoteService.addMargin(salesData.margin!, selectedBudgetId);
        const updatedBudgets = budgets.map((budget) =>
          budget.id === selectedBudgetId
            ? {
                ...budget,
                salesData: {
                  unitSalePrice: salesData.unitSalePrice,
                  margin: salesData.margin,
                  totalPrice: salesData.totalPrice,
                  paymentCondition: budget.salesData?.paymentCondition || {
                    id: 0,
                    name: "",
                  },
                },
              }
            : budget,
        );

        setBudgets(updatedBudgets);
        setShowSalesDataModal(false);
        setEditingMargin(null);
        toast({
          title: "Margen actualizado",
          description: `El margen se ha establecido en ${salesData.margin}% correctamente`,
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "No se pudo actualizar el margen",
        variant: "destructive",
      });
    }
  };

  const handlePaymentConditionCreated = async (
    paymentConditionId: number,
    paymentCondition: string,
  ) => {
    try {
      if (selectedBudgetId !== null) {
        await QuoteService.addPaymentCondition(
          paymentConditionId,
          selectedBudgetId,
        );
        const updatedBudgets = budgets.map((budget) => {
          if (budget.id === selectedBudgetId) {
            const currentSalesData = budget.salesData || {
              unitSalePrice: 0,
              totalPrice: 0,
              paymentCondition: { id: 0, name: "" },
            };

            return {
              ...budget,
              salesData: {
                ...currentSalesData,
                paymentCondition: {
                  id: paymentConditionId,
                  name: paymentCondition,
                },
              },
            };
          }
          return budget;
        });

        setBudgets(updatedBudgets);
        setShowPaymentConditionModal(false);
        toast({
          title: "Condición de pago actualizada",
          description: `La condición de pago se ha establecido como "${paymentCondition}" correctamente`,
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "No se pudo actualizar la condición de pago",
        variant: "destructive",
      });
    }
  };

  const renderSalesDataCell = (budget: Budget) => {
    const handleClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      setSelectedBudgetId(budget.id);
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
      setSelectedBudgetId(budget.id);
      setShowPaymentConditionModal(true);
    };

    if (budget.salesData?.paymentCondition?.name) {
      return (
        <div className="flex items-center justify-center gap-2">
          {budget.salesData.paymentCondition.name}
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

    const isMarginDefined = budget.salesData?.margin !== undefined;

    return (
      <div className="w-full flex justify-center">
        <Button
          onClick={handleClick}
          variant="primary"
          className="flex items-center gap-1 text-primary border border-primary/20 bg-primary/5 hover:text-primary-dark"
          disabled={!isMarginDefined}
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
                    {isLoading
                      ? "Cargando..."
                      : "No hay presupuestos agregados"}
                  </TableCell>
                </TableRow>
              ) : (
                budgets.map((budget) => (
                  <TableRow
                    key={budget.id}
                    className={`h-12 select-none text-center cursor-pointer hover:bg-[#ff000000] ${
                      selectedRows.includes(budget.id)
                        ? "bg-primary/10 hover:bg-primary/10 text-primary "
                        : ""
                    }`}
                    onClick={(e) => handleRowClick(budget.id, e)}
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
            <AddMarginForm
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
            <AddPaymentConditionForm
              onPaymentConditionCreated={handlePaymentConditionCreated}
              onCancel={() => setShowPaymentConditionModal(false)}
            />
          </div>
        </DialogContent>
      </Dialog>
      <Toaster />
    </div>
  );
}
