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

  const handleBudgetCreated = (newBudget: Budget) => {
    setBudgets([...budgets, newBudget]);
    setShowCreateModal(false);
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
              <TableHead>T. Entrega</TableHead>
              <TableHead>Incoterm</TableHead>
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
                <TableRow key={budget.id} className="h-12">
                  <TableCell>{budget.stage + " " + budget.numbering}</TableCell>
                  <TableCell>{budget.item}</TableCell>
                  <TableCell>{budget.supplier}</TableCell>
                  <TableCell>{budget.origin}</TableCell>
                  <TableCell>{budget.destination}</TableCell>
                  <TableCell>{budget.deliveryTime} días</TableCell>
                  <TableCell>{budget.incoterm}</TableCell>
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
              Agregar Presupuesto
            </Button>
          </DialogTrigger>
        </div>

        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Agregar compra</DialogTitle>
          </DialogHeader>
          <div className="bg-white rounded-lg w-full">
            <CreatePurchase
              onBudgetCreated={handleBudgetCreated}
              items={items}
              onCancel={() => setShowCreateModal(false)}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
