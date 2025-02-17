import React from "react";
import { useState } from "react";
import Button from "@/components/Button";
import { PlusCircle } from "lucide-react";
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
  budgets: Budget[];
  setBudgets: (budgets: Budget[]) => void;
  quotationId: number;
}

export default function SalesList({
  budgets,
  setBudgets,
  quotationId,
}: SalesListProps) {
  const [showSalesDataModal, setShowSalesDataModal] = useState(false);
  const [showPaymentConditionModal, setShowPaymentConditionModal] =
    useState(false);
  const [selectedBudgetId, setSelectedBudgetId] = useState<string | null>(null);

  const handleSalesDataCreated = async (salesData: SalesData) => {
    try {
      await QuoteService.addMargin(salesData.margin!, quotationId);
      if (selectedBudgetId) {
        setBudgets(
          budgets.map((budget) =>
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
          ),
        );
        setShowSalesDataModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePaymentConditionCreated = async (paymentCondition: string) => {
    try {
      await QuoteService.addPaymentCondition(paymentCondition, quotationId);
      if (selectedBudgetId) {
        setBudgets(
          budgets.map((budget) => {
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
          }),
        );
        setShowPaymentConditionModal(false);
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

    if (budget.salesData?.margin && budget.salesData.margin > 0) {
      return (
        <div className="flex items-center justify-center gap-2">
          {budget.salesData.margin}%
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
                  <TableRow key={budget.numbering} className="h-12 text-center">
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
            <DialogTitle className="text-2xl">Cargar Margen</DialogTitle>
          </DialogHeader>
          <div className="bg-white rounded-lg w-full">
            <AddMargin
              onSalesDataCreated={handleSalesDataCreated}
              onCancel={() => setShowSalesDataModal(false)}
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
