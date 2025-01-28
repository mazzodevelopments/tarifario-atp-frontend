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
import CreateSalesData from "./CreateSalesData";

interface SalesListProps {
  budgets: Budget[];
  setBudgets: (budgets: Budget[]) => void;
}

export default function SalesList({ budgets, setBudgets }: SalesListProps) {
  const [showSalesDataModal, setShowSalesDataModal] = useState(false);
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
            : budget,
        ),
      );
      setShowSalesDataModal(false);
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

  const calculateTotalPrice = (budget: Budget): number => {
    let total = 0;

    // PRECIO EXTENDIDO (COMPRAS)
    if (budget.purchaseData) {
      total +=
        budget.purchaseData?.appliedUnitPrice *
        (budget.purchaseData?.item?.quantity ?? 1);
    }

    // SUMA COSTOS TRANSPORTE, ADUANA Y ENTREGA
    if (budget.transport?.total) {
      total += budget.transport.total;
    }
    if (budget.custom?.total) {
      total += budget.custom.total;
    }
    if (budget.delivery?.total) {
      total += budget.delivery.total;
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
    <div className="w-full mx-auto">
      <div className="border rounded-md overflow-x-auto max-h-[30vw]">
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
              <TableHead>Transporte</TableHead>
              <TableHead>Aduana</TableHead>
              <TableHead>Entrega</TableHead>
              <TableHead>Precio Total</TableHead>
              <TableHead>Margen x Linea</TableHead>
              <TableHead>Precio V. Unitario</TableHead>
              <TableHead>Precio V. Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white divide-y divide-gray-200">
            {budgets.length === 0 ? (
              <TableRow className="h-24">
                <TableCell
                  colSpan={11}
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
                    {budget.transport?.total
                      ? `$${budget.transport.total.toFixed(2)}`
                      : "-"}
                  </TableCell>
                  <TableCell>
                    {budget.custom?.total
                      ? `$${budget.custom.total.toFixed(2)}`
                      : "-"}
                  </TableCell>
                  <TableCell>
                    {budget.delivery?.total
                      ? `$${budget.delivery.total.toFixed(2)}`
                      : "-"}
                  </TableCell>
                  <TableCell>{calculateTotalPrice(budget)} USD</TableCell>
                  <TableCell>{renderSalesDataCell(budget)}</TableCell>
                  <TableCell className="font-[600]">
                    {calculateAppliedTotalPrice(budget) /
                      (budget.purchaseData?.item?.quantity ?? 1)}{" "}
                    USD
                  </TableCell>
                  <TableCell className="font-[600]">
                    {calculateAppliedTotalPrice(budget)} USD
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={showSalesDataModal} onOpenChange={setShowSalesDataModal}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Cargar Margen</DialogTitle>
          </DialogHeader>
          <div className="bg-white rounded-lg w-full">
            <CreateSalesData
              onSalesDataCreated={handleSalesDataCreated}
              onCancel={() => setShowSalesDataModal(false)}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
