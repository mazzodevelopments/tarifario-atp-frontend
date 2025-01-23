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
import { Printer } from "lucide-react";

interface SelectedBudgetsListProps {
  selectedBudgets: Budget[];
}

export default function SelectedBudgetsList({
  selectedBudgets,
}: SelectedBudgetsListProps) {
  const calculateTotal = (budget: Budget) => {
    const budgetTotal = budget.totalPrice;
    const transportTotal = budget.transport?.total || 0;
    const customTotal = budget.custom?.total || 0;
    return Number((budgetTotal + transportTotal + customTotal).toFixed(2));
  };

  const calculateGrandTotal = () =>
    selectedBudgets.reduce(
      (total, budget) => total + calculateTotal(budget),
      0,
    );

  const handlePrint = () => {
    console.log("Imprimir cotización:", selectedBudgets);
  };

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
              <TableHead>T. Entrega</TableHead>
              <TableHead>Incoterm</TableHead>
              <TableHead>Precio Total</TableHead>
              <TableHead>Transporte</TableHead>
              <TableHead>Aduana</TableHead>
              <TableHead>Entrega</TableHead>
              <TableHead>Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white divide-y divide-gray-200">
            {selectedBudgets.length === 0 ? (
              <TableRow className="h-24">
                <TableCell
                  colSpan={12}
                  className="text-sm m-auto h-full text-center text-gray-500"
                >
                  No hay presupuestos seleccionados
                </TableCell>
              </TableRow>
            ) : (
              selectedBudgets.map((budget) => (
                <TableRow key={budget.id} className="text-sm">
                  <TableCell>{budget.stage + " " + budget.numbering}</TableCell>
                  <TableCell>{budget.item}</TableCell>
                  <TableCell>{budget.supplier}</TableCell>
                  <TableCell>{budget.origin}</TableCell>
                  <TableCell>{budget.destination}</TableCell>
                  <TableCell>{budget.deliveryTime} días</TableCell>
                  <TableCell>{budget.incoterm}</TableCell>
                  <TableCell>${budget.totalPrice.toFixed(2)}</TableCell>
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
                  <TableCell className="font-semibold">
                    ${calculateTotal(budget).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))
            )}
            {selectedBudgets.length > 0 && (
              <TableRow>
                <TableCell colSpan={11} className="text-right font-bold">
                  Total General:
                </TableCell>
                <TableCell className="font-semibold">
                  ${calculateGrandTotal().toFixed(2)}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-center items-center w-full mt-6">
        <Button
          onClick={handlePrint}
          className="text-sm px-4 py-2 bg-primary text-white flex items-center gap-2"
          disabled={selectedBudgets.length === 0}
        >
          <Printer size={16} />
          Imprimir Cotización
        </Button>
      </div>
    </div>
  );
}
