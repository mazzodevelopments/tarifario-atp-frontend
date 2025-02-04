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

interface SelectablePurchaseListProps {
  budgets: Budget[];
  selectedPurchases: Budget[];
  setSelectedPurchases: (budgets: Budget[]) => void;
}

export default function SelectablePurchaseList({
  budgets,
  selectedPurchases,
  setSelectedPurchases,
}: SelectablePurchaseListProps) {
  const handlePurchaseSelection = (e: React.MouseEvent, budget: Budget) => {
    e.stopPropagation();

    // Get the item detail of the clicked budget
    const clickedItemDetail = budget.purchaseData?.item?.detail;

    if (selectedPurchases.some((b) => b.numbering === budget.numbering)) {
      // If already selected, remove it
      setSelectedPurchases(
        selectedPurchases.filter((b) => b.numbering !== budget.numbering),
      );
    } else {
      // Remove any existing selection for the same item
      const filteredPurchases = selectedPurchases.filter(
        (b) => b.purchaseData?.item?.detail !== clickedItemDetail,
      );
      // Add the new selection
      setSelectedPurchases([...filteredPurchases, budget]);
    }
  };

  // Group budgets by item detail
  const groupedBudgets = budgets.reduce(
    (acc, budget) => {
      const itemDetail = budget.purchaseData?.item?.detail || "Sin Item";
      if (!acc[itemDetail]) {
        acc[itemDetail] = [];
      }
      acc[itemDetail].push(budget);
      return acc;
    },
    {} as Record<string, Budget[]>,
  );

  return (
    <div className="w-full flex justify-center items-center max-w-4xl flex-col">
      <div className="border rounded-md max-h-[30vw] relative overflow-auto w-[54vw]">
        <Table>
          <TableHeader className="border-b border-gray-200">
            <TableRow>
              <TableHead>Numeración</TableHead>
              <TableHead>Item</TableHead>
              <TableHead>Proveedor</TableHead>
              <TableHead>Precio Unitario</TableHead>
              <TableHead>Extendido</TableHead>
              <TableHead>Origen</TableHead>
              <TableHead>Destino</TableHead>
              <TableHead>T. Producción</TableHead>
              <TableHead>Incoterm</TableHead>
              <TableHead>Observaciones</TableHead>
              <TableHead>Seleccionar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white divide-y divide-gray-200">
            {budgets.length === 0 ? (
              <TableRow className="h-24">
                <TableCell
                  colSpan={11}
                  className="text-sm m-auto h-full text-center text-gray-500"
                >
                  No hay compras agregadas
                </TableCell>
              </TableRow>
            ) : (
              Object.entries(groupedBudgets).map(([itemDetail, itemBudgets]) =>
                itemBudgets.map((budget, index) => (
                  <TableRow
                    key={budget.numbering}
                    className={`h-12 hover:bg-gray-50 ${
                      index === 0 ? "border-t border-gray-200" : ""
                    } ${
                      selectedPurchases.some(
                        (b) => b.purchaseData?.item?.detail === itemDetail,
                      ) &&
                      !selectedPurchases.some(
                        (b) => b.numbering === budget.numbering,
                      )
                        ? "opacity-50"
                        : ""
                    }`}
                  >
                    <TableCell>
                      {budget.stage + " " + budget.numbering}
                    </TableCell>
                    <TableCell>{budget.purchaseData?.item?.detail}</TableCell>
                    <TableCell>{budget.purchaseData?.supplier}</TableCell>
                    <TableCell>
                      ${budget.purchaseData?.appliedUnitPrice.formatNumber()}
                    </TableCell>
                    <TableCell>
                      $
                      {(
                        (budget.purchaseData?.appliedUnitPrice ?? 0) *
                        (budget.purchaseData?.item?.quantity ?? 1)
                      ).formatNumber()}
                    </TableCell>
                    <TableCell>{budget.purchaseData?.origin}</TableCell>
                    <TableCell>{budget.purchaseData?.destination}</TableCell>
                    <TableCell>
                      {budget.purchaseData?.deliveryTime} días
                    </TableCell>
                    <TableCell>{budget.purchaseData?.incoterm}</TableCell>
                    <TableCell>
                      {budget.purchaseData?.additionalObservations || "-"}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center">
                        <div
                          onClick={(e) => handlePurchaseSelection(e, budget)}
                          className={`w-5 h-5 rounded border ${
                            selectedPurchases.some(
                              (b) => b.numbering === budget.numbering,
                            )
                              ? "bg-primary border-primary"
                              : "border-gray-300"
                          } flex items-center justify-center cursor-pointer ${
                            selectedPurchases.some(
                              (b) =>
                                b.purchaseData?.item?.detail === itemDetail,
                            ) &&
                            !selectedPurchases.some(
                              (b) => b.numbering === budget.numbering,
                            )
                              ? "opacity-50 cursor-not-allowed"
                              : "hover:border-primary"
                          } transition-colors`}
                        >
                          {selectedPurchases.some(
                            (b) => b.numbering === budget.numbering,
                          ) && <Check className="w-4 h-4 text-white" />}
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )),
              )
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
