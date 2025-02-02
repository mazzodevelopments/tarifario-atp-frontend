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
              <TableHead>Seleccionar</TableHead>
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
  );
}
