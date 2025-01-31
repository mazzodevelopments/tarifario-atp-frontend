import { useState } from "react";
import Button from "@/components/Button";
import CreatePurchase from "./CreatePurchase";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Budget } from "@/types/Budget";
import type { Item } from "@/types/Item";
import type { PurchaseData } from "@/types/PurchaseData";
import { X } from "react-feather";
import "@/app/utils/formatNumber";

interface BudgetListProps {
  budgets: Budget[];
  setBudgets: (budgets: Budget[]) => void;
  items: Item[];
  setSelectedBudgets: (selectedBudgets: Budget[]) => void;
}

export default function PurchaseList({
  budgets,
  setBudgets,
  items,
}: BudgetListProps) {
  const [showCreateModal, setShowCreateModal] = useState(false);

  const onPurchaseCreated = (newPurchase: PurchaseData) => {
    const newBudget = {
      numbering: `00000000${Math.floor(Math.random() * 100)
        .toString()
        .padStart(2, "0")}`,
      purchaseData: newPurchase,
      transport: null,
      custom: null,
      delivery: null,
      salesData: null,
      originExpenses: null,
      destinationExpenses: null,
      stage: "COTI",
    };
    setBudgets([...budgets, newBudget]);
    setShowCreateModal(false);
  };

  const handleDeleteBudget = async (numbering: string) => {
    setBudgets(budgets.filter((budget) => budget.numbering !== numbering));
  };

  return (
    <div className="w-full mx-auto overflow-hidden">
      <div className="border rounded-md max-h-[30vw]">
        <Table className="w-full">
          <TableHeader className="border-b border-gray-200">
            <TableRow>
              <TableHead>Numeración</TableHead>
              <TableHead>Item</TableHead>
              <TableHead>Proveedor</TableHead>
              <TableHead>Precio Unitario</TableHead>
              <TableHead>Extendido</TableHead>
              <TableHead>Origen</TableHead>
              <TableHead>L. Entrega</TableHead>
              <TableHead>T. Producción</TableHead>
              <TableHead>Incoterm</TableHead>
              <TableHead>Observaciones Adicionales</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white divide-y divide-gray-200">
            {budgets.length === 0 ? (
              <TableRow className="h-24">
                <TableCell
                  colSpan={12}
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
                  <TableCell>
                    {budget.purchaseData?.appliedUnitPrice.formatNumber() +
                      " " +
                      budget.purchaseData?.currency}
                  </TableCell>
                  <TableCell>
                    {(
                      (budget.purchaseData?.appliedUnitPrice ?? 0) *
                      (budget.purchaseData?.item?.quantity ?? 1)
                    ).formatNumber() +
                      " " +
                      budget.purchaseData?.currency}
                  </TableCell>
                  <TableCell>{budget.purchaseData?.origin}</TableCell>
                  <TableCell>{budget.purchaseData?.destination}</TableCell>
                  <TableCell>
                    {budget.purchaseData?.deliveryTime} días
                  </TableCell>
                  <TableCell>{budget.purchaseData?.incoterm}</TableCell>
                  <TableCell>
                    {budget.purchaseData?.additionalObservations !== ""
                      ? budget.purchaseData?.additionalObservations
                      : "-"}
                  </TableCell>
                  <TableCell>
                    <button
                      onClick={() => handleDeleteBudget(budget.numbering)}
                      className="text-black hover:text-red-600 mx-2"
                    >
                      <X className="w-4" />
                    </button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
        <div className="flex justify-center items-center w-full mt-6">
          <DialogTrigger asChild>
            <Button className="text-sm px-4 py-2 bg-primary text-white flex items-center gap-2">
              <span className="text-md mr-2">+</span>
              Agregar Datos De Compra
            </Button>
          </DialogTrigger>
        </div>

        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Agregar compra</DialogTitle>
          </DialogHeader>
          <div className="bg-white rounded-lg w-full">
            <CreatePurchase
              onPurchaseCreated={onPurchaseCreated}
              items={items}
              onCancel={() => setShowCreateModal(false)}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
