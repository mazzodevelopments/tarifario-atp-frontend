"use client";

import { useState } from "react";
import Button from "@/components/Button";
import CreateItem from "./CreateItem";
import { X } from "react-feather";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Detalle</TableHead>
              <TableHead>Marca</TableHead>
              <TableHead>Cantidad</TableHead>
              <TableHead>Unidad</TableHead>
              <TableHead>Part Number</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.length === 0 ? (
              <TableRow className="h-36">
                <TableCell
                  colSpan={8}
                  className="text-sm m-auto h-full  text-center text-gray-500"
                >
                  No hay items agregados
                </TableCell>
              </TableRow>
            ) : (
              items.map((item) => (
                <TableRow key={item.id} className="text-sm">
                  <TableCell>{item.detail}</TableCell>
                  <TableCell>{item.brand}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.unit}</TableCell>
                  <TableCell>{item.partNumber}</TableCell>
                  <TableCell>
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="text-black hover:text-red-600"
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
