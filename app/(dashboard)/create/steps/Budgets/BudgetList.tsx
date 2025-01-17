"use client";

import { useState } from "react";
import { X } from "react-feather";
import { Item } from "@/app/(dashboard)/create/steps/Items/ItemList";
import Button from "@/components/Button";
import CreateBudget from "./CreateBudget";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface BudgetListProps {
  budgets: Budget[];
  setBudgets: (budgets: Budget[]) => void;
  items: Item[];
}

export interface Budget {
  id: string;
  date: string;
  item: string;
  origin: string;
  destination: string;
  supplier: string;
  deliveryTime: number;
  unitPrice: number;
  currency: number;
  margin: number;
  unitWeight: number;
  totalWeight: number;
  unit: string;
  incoterm: string;
}

export default function BudgetList({
  budgets,
  setBudgets,
  items,
}: BudgetListProps) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedBudgets, setSelectedBudgets] = useState<string[]>([]);

  const handleBudgetCreated = (newBudget: Budget) => {
    setBudgets([...budgets, newBudget]);
    setShowCreateModal(false);
  };

  const handleDeleteBudget = (id: string) => {
    setBudgets(budgets.filter((budget) => budget.id !== id));
    setSelectedBudgets(selectedBudgets.filter((budgetId) => budgetId !== id));
  };

  const handleSelectBudget = (id: string) => {
    setSelectedBudgets((prev) =>
      prev.includes(id)
        ? prev.filter((budgetId) => budgetId !== id)
        : [...prev, id],
    );
  };

  return (
    <div className="w-full mx-auto">
      <div className="border rounded-md overflow-x-auto max-h-[18vw]">
        <Table className="w-full">
          <TableHeader className="border-b border-gray-200">
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead>Proveedor</TableHead>
              <TableHead>Origen</TableHead>
              <TableHead>Destino</TableHead>
              <TableHead>Precio Unitario</TableHead>
              <TableHead>Peso Unitario</TableHead>
              <TableHead>Tiempo de Entrega</TableHead>
              <TableHead>Incoterm</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white divide-y divide-gray-200">
            {budgets.length === 0 ? (
              <TableRow className="h-24">
                <TableCell
                  colSpan={10}
                  className="text-sm m-auto h-full text-center text-gray-500"
                >
                  No hay presupuestos agregados
                </TableCell>
              </TableRow>
            ) : (
              budgets.map((budget) => (
                <TableRow
                  key={budget.id}
                  onClick={() => handleSelectBudget(budget.id)}
                  className={`text-sm cursor-pointer transition-colors duration-200 ease-in-out ${
                    selectedBudgets.includes(budget.id)
                      ? "bg-sky-100 hover:bg-sky-200"
                      : "hover:bg-sky-50"
                  }`}
                  role="row"
                  aria-selected={selectedBudgets.includes(budget.id)}
                >
                  <TableCell>{budget.item}</TableCell>
                  <TableCell>{budget.supplier}</TableCell>
                  <TableCell>{budget.origin}</TableCell>
                  <TableCell>{budget.destination}</TableCell>
                  <TableCell>{budget.unitPrice}</TableCell>
                  <TableCell>{budget.unitWeight}</TableCell>
                  <TableCell>{budget.deliveryTime}</TableCell>
                  <TableCell>{budget.incoterm}</TableCell>
                  <TableCell>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteBudget(budget.id);
                      }}
                      className="text-black hover:text-red-600"
                      aria-label={`Delete budget for ${budget.item}`}
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
      <div className="flex justify-center items-center w-full mt-6">
        <Button
          onClick={() => setShowCreateModal(true)}
          className="text-sm px-4 py-2 bg-primary text-white flex items-center gap-2"
        >
          <span className="text-md">+</span>
          Agregar Presupuesto
        </Button>
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white p-6 rounded-lg w-full max-w-xl">
            <CreateBudget
              onBudgetCreated={handleBudgetCreated}
              onCancel={() => setShowCreateModal(false)}
              items={items}
            />
          </div>
        </div>
      )}
    </div>
  );
}
