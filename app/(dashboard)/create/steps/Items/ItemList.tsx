"use client";

import { useState } from "react";
import Button from "@/components/Button";
import CreateItem from "./CreateItem";
import { Trash } from "react-feather";

export interface Item {
  id: string;
  detail: string;
  brand: string;
  quantity: number;
  unit: string;
  partNumber: string;
}

interface ItemsListProps {
  items: Item[];
  setItems: (items: Item[]) => void;
}

export default function ItemsList({ items, setItems }: ItemsListProps) {
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleItemCreated = async (newItem: Item) => {
    setItems([...items, newItem]);
    setShowCreateModal(false);
  };

  const handleDeleteItem = async (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-regular">Items de la Cotización</h3>
      </div>

      <div className="border rounded-md overflow-x-hidden max-h-[18vw]">
        <table className="w-full">
          <thead className="border-b border-gray-200">
            <tr>
              <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Detalle
              </th>
              <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Marca
              </th>
              <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cantidad
              </th>
              <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Unidad
              </th>
              <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Part Number
              </th>
              <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.length === 0 ? (
              <tr className="h-36">
                <td
                  colSpan={8}
                  className="text-sm m-auto h-full  text-center text-gray-500"
                >
                  No hay items agregados
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item.id} className="text-sm">
                  <td className="px-6 py-2 whitespace-nowrap font-medium">
                    {item.detail}
                  </td>
                  <td className="px-6 py-2 whitespace-nowrap">{item.brand}</td>
                  <td className="px-6 py-2 whitespace-nowrap">
                    {item.quantity}
                  </td>
                  <td className="px-6 py-2 whitespace-nowrap">{item.unit}</td>
                  <td className="px-6 py-2 whitespace-nowrap">
                    {item.partNumber}
                  </td>
                  <td className="px-6 py-2 whitespace-nowrap">
                    <button
                      onClick={() => handleDeleteItem(item.id)}
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
          Agregar Item
        </Button>
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <CreateItem
              onItemCreated={handleItemCreated}
              onCancel={() => setShowCreateModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
