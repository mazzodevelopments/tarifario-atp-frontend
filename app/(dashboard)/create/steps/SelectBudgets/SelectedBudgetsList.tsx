import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Button from "@/components/Button";
import type { Budget } from "@/types/Budget";
import { Mail, Printer } from "lucide-react";

interface SelectedBudgetsListProps {
  selectedBudgets: Budget[];
}

export default function SelectedBudgetsList({
  selectedBudgets,
}: SelectedBudgetsListProps) {
  const handlePrint = () => {
    console.log("Imprimir cotización:", selectedBudgets);
  };

  const calculateTotalPrice = (budget: Budget): number => {
    let total = 0;

    if (budget.purchaseData) {
      total +=
        budget.purchaseData?.appliedUnitPrice *
        (budget.purchaseData?.item?.quantity ?? 1);
    }

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

  const totalSum = selectedBudgets.reduce(
    (sum, budget) => sum + calculateAppliedTotalPrice(budget),
    0,
  );

  return (
    <div className="w-full mx-auto">
      <div className="border rounded-md overflow-x-auto max-h-[18vw]">
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
            {selectedBudgets.length === 0 ? (
              <TableRow className="h-24">
                <TableCell
                  colSpan={14}
                  className="text-sm m-auto h-full text-center text-gray-500"
                >
                  No hay presupuestos seleccionados
                </TableCell>
              </TableRow>
            ) : (
              <>
                {selectedBudgets.map((budget) => (
                  <TableRow key={budget.numbering} className="text-sm">
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
                    <TableCell>
                      {(budget.salesData?.margin ?? 0) > 0
                        ? budget.salesData?.margin
                        : 0}
                      %
                    </TableCell>
                    <TableCell className="font-[600]">
                      {calculateAppliedTotalPrice(budget) /
                        (budget.purchaseData?.item?.quantity ?? 1)}{" "}
                      USD
                    </TableCell>
                    <TableCell className="font-[600]">
                      {calculateAppliedTotalPrice(budget)} USD
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="text-sm font-bold bg-gray-50">
                  <TableCell colSpan={13} className="text-right">
                    Total General:
                  </TableCell>
                  <TableCell className="font-bold">
                    {totalSum.toFixed(2)} USD
                  </TableCell>
                </TableRow>
              </>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-center items-center w-full mt-6 gap-4">
        <Button
          onClick={handlePrint}
          className="text-sm px-4 py-2 bg-primary text-white flex items-center gap-2"
          disabled={selectedBudgets.length === 0}
        >
          <Printer size={16} />
          Imprimir Cotización
        </Button>
        <Button
          onClick={handlePrint}
          className="text-sm px-4 py-2 bg-primary text-white flex items-center gap-2"
          disabled={selectedBudgets.length === 0}
        >
          <Mail size={16} />
          Enviar Por Mail
        </Button>
      </div>
    </div>
  );
}
