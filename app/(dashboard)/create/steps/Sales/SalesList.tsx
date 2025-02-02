import React from "react";
import { useState } from "react";
import Button from "@/components/Button";
import { Plus } from "lucide-react";
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

interface SalesListProps {
  budgets: Budget[];
  setBudgets: (budgets: Budget[]) => void;
}

export default function SalesList({ budgets, setBudgets }: SalesListProps) {
  const [showSalesDataModal, setShowSalesDataModal] = useState(false);
  const [showPaymentConditionModal, setShowPaymentConditionModal] =
    useState(false);
  const [selectedBudgetId, setSelectedBudgetId] = useState<string | null>(null);

  const handleSalesDataCreated = (salesData: SalesData) => {
    if (selectedBudgetId) {
      setBudgets(
        budgets.map((budget) =>
          budget.numbering === selectedBudgetId
            ? {
                ...budget,
                salesData,
              }
            : budget
        )
      );
      setShowSalesDataModal(false);
    }
  };

  const handlePaymentConditionCreated = (paymentCondition: string) => {
    if (selectedBudgetId) {
      setBudgets(
        budgets.map((budget) => {
          if (budget.numbering === selectedBudgetId) {
            const currentSalesData = budget.salesData || {
              unitSalePrice: 0,
              margin: 0,
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
        })
      );
      setShowPaymentConditionModal(false);
    }
  };

  const renderSalesDataCell = (budget: Budget) => {
    const handleClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      setSelectedBudgetId(budget.numbering);
      setShowSalesDataModal(true);
    };

    if (budget.salesData) {
      return (
        <div className="flex items-center gap-2">
          %{budget.salesData.margin}
        </div>
      );
    }

    return (
      <Button
        onClick={handleClick}
        variant="secondary"
        className="flex items-center gap-1 text-primary hover:text-primary-dark"
      >
        <Plus className="w-4 h-4" />
        Agregar
      </Button>
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
        <div className="flex items-center gap-2">
          {budget.salesData.paymentCondition}
        </div>
      );
    }

    return (
      <Button
        onClick={handleClick}
        variant="secondary"
        className="flex items-center gap-1 text-primary hover:text-primary-dark"
      >
        <Plus className="w-4 h-4" />
        Agregar
      </Button>
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
    if (budget.originExpenses?.total) {
      total += budget.originExpenses.total;
    }

    if (budget.transport?.total) {
      total += budget.transport.total;
    }
    if (budget.custom?.total) {
      total += budget.custom.total;
    }
    if (budget.destinationExpenses?.total) {
      total += budget.destinationExpenses.total;
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
      <div className="border rounded-md max-h-[30vw] relative overflow-auto w-[54vw]">
        <Table className="w-full">
          <TableHeader className="border-b border-gray-200">
            <TableRow>
              <TableHead>Numeración</TableHead>
              <TableHead>Item</TableHead>
              <TableHead>Proveedor</TableHead>
              <TableHead>Origen</TableHead>
              <TableHead>Destino</TableHead>
              <TableHead>T. Producción</TableHead>
              <TableHead>Incoterm</TableHead>
              <TableHead>Gastos Origen</TableHead>
              <TableHead>Transporte</TableHead>
              <TableHead>Aduana</TableHead>
              <TableHead>Gastos Destino</TableHead>
              <TableHead>Precio Total</TableHead>
              <TableHead>Margen</TableHead>
              <TableHead>Precio V. Unitario</TableHead>
              <TableHead>Precio V. Total</TableHead>
              <TableHead>Condición de Pago</TableHead>
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
                <TableRow key={budget.numbering} className="h-12">
                  <TableCell>{budget.stage + " " + budget.numbering}</TableCell>
                  <TableCell>{budget.purchaseData?.item?.detail}</TableCell>
                  <TableCell>{budget.purchaseData?.supplier}</TableCell>
                  <TableCell>{budget.purchaseData?.origin}</TableCell>
                  <TableCell>{budget.purchaseData?.destination}</TableCell>
                  <TableCell>
                    {budget.purchaseData?.deliveryTime} días
                  </TableCell>
                  <TableCell>{budget.purchaseData?.incoterm}</TableCell>
                  <TableCell>
                    {budget.originExpenses?.total
                      ? `$${budget.originExpenses.total.formatNumber()}`
                      : "-"}
                  </TableCell>
                  <TableCell>
                    {budget.transport?.total
                      ? `$${budget.transport.total.formatNumber()}`
                      : "-"}
                  </TableCell>
                  <TableCell>
                    {budget.custom?.total
                      ? `$${budget.custom.total.formatNumber()}`
                      : "-"}
                  </TableCell>
                  <TableCell>
                    {budget.destinationExpenses?.total
                      ? `$${budget.destinationExpenses.total.formatNumber()}`
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
                    ).formatNumber()}{" "}
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
