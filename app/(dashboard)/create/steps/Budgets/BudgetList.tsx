"use client";

import { useState } from "react";
import { Trash } from "react-feather";
import { Item } from "@/app/(dashboard)/create/steps/Items/ItemList";
import Button from "@/components/Button";
import CreateBudget from "./CreateBudget";

interface BudgetListProps {
  budgets: Budget[];
  setBudgets: (budgets: Budget[]) => void;
  items: Item[];
}

export interface Budget {
  id: string;
  item: string;
  supplier: string;
  origin: string;
  destination: string;
  unitPrice: number;
  unitWeight: number;
  deliveryTime: string;
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
        : [...prev, id]
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-regular">Presupuestos</h3>
      </div>

      <div className="border rounded-md overflow-x-auto max-h-[18vw]">
        <table className="w-full">
          <thead className="border-b border-gray-200">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-[600] text-gray-500 uppercase tracking-wider">
                Item
              </th>
              <th className="px-4 py-2 text-left text-xs font-[600] text-gray-500 uppercase tracking-wider">
                Proveedor
              </th>
              <th className="px-4 py-2 text-left text-xs font-[600] text-gray-500 uppercase tracking-wider">
                Origen
              </th>
              <th className="px-4 py-2 text-left text-xs font-[600] text-gray-500 uppercase tracking-wider">
                Destino
              </th>
              <th className="px-4 py-2 text-left text-xs font-[600] text-gray-500 uppercase tracking-wider">
                Precio Unitario
              </th>
              <th className="px-4 py-2 text-left text-xs font-[600] text-gray-500 uppercase tracking-wider">
                Peso Unitario
              </th>
              <th className="px-4 py-2 text-left text-xs font-[600] text-gray-500 uppercase tracking-wider">
                Tiempo de Entrega
              </th>
              <th className="px-4 py-2 text-left text-xs font-[600] text-gray-500 uppercase tracking-wider">
                Incoterm
              </th>
              <th className="px-4 py-2 text-left text-xs font-[600] text-gray-500 uppercase tracking-wider">
                Seleccionar
              </th>
              <th className="px-4 py-2 text-left text-xs font-[600] text-gray-500 uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {budgets.length === 0 ? (
              <tr className="h-36">
                <td
                  colSpan={10}
                  className="text-sm m-auto h-full text-center text-gray-500"
                >
                  No hay presupuestos agregados
                </td>
              </tr>
            ) : (
              budgets.map((budget) => (
                <tr key={budget.id} className="text-sm">
                  <td className="px-4 py-2 whitespace-nowrap">{budget.item}</td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {budget.supplier}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {budget.origin}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {budget.destination}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {budget.unitPrice}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {budget.unitWeight}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {budget.deliveryTime}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {budget.incoterm}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedBudgets.includes(budget.id)}
                      onChange={() => handleSelectBudget(budget.id)}
                      className="form-checkbox h-4 w-4 text-blue-600"
                    />
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <button
                      onClick={() => handleDeleteBudget(budget.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash className="w-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
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
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
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
