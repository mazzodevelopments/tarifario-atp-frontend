"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Button from "@/components/Button";
import CreateCustom from "./CreateCustom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface Custom {
  id: string;
  oficializacionSedi: number;
  gastosDespachosAduanero: number;
  gastosOperativos: number;
  seguridadElectrica: number;
  senasa: number;
}

interface CustomListProps {
  customs: Custom[];
  setCustoms: (customs: Custom[]) => void;
}

export default function CustomList({ customs, setCustoms }: CustomListProps) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedCustoms, setSelectedCustoms] = useState<string[]>([]);

  const handleCustomCreated = (newCustom: Custom) => {
    setCustoms([...customs, newCustom]);
    setShowCreateModal(false);
  };

  const handleDeleteCustom = (id: string) => {
    setCustoms(customs.filter((custom) => custom.id !== id));
    setSelectedCustoms(selectedCustoms.filter((customId) => customId !== id));
  };

  const handleSelectCustom = (id: string) => {
    setSelectedCustoms((prev) =>
      prev.includes(id)
        ? prev.filter((customId) => customId !== id)
        : [...prev, id],
    );
  };

  return (
    <div className="w-full mx-auto">
      <div className="border rounded-md overflow-x-auto max-h-[18vw]">
        <Table className="w-full">
          <TableHeader className="border-b border-gray-200">
            <TableRow>
              <TableHead>Oficialización SEDI</TableHead>
              <TableHead>Gastos Despachos Aduanero</TableHead>
              <TableHead>Gastos Operativos</TableHead>
              <TableHead>Seguridad Eléctrica</TableHead>
              <TableHead>SENASA</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white divide-y divide-gray-200">
            {customs.length === 0 ? (
              <TableRow className="h-24">
                <TableCell
                  colSpan={8}
                  className="text-sm m-auto h-full text-center text-gray-500"
                >
                  No hay gastos de aduana agregados
                </TableCell>
              </TableRow>
            ) : (
              customs.map((custom) => (
                <TableRow
                  key={custom.id}
                  onClick={() => handleSelectCustom(custom.id)}
                  className={`text-sm cursor-pointer transition-colors duration-200 ease-in-out ${
                    selectedCustoms.includes(custom.id)
                      ? "bg-sky-100 hover:bg-sky-200"
                      : "hover:bg-sky-50"
                  }`}
                  role="row"
                  aria-selected={selectedCustoms.includes(custom.id)}
                >
                  <TableCell>${custom.oficializacionSedi.toFixed(2)}</TableCell>
                  <TableCell>
                    ${custom.gastosDespachosAduanero.toFixed(2)}
                  </TableCell>
                  <TableCell>${custom.gastosOperativos.toFixed(2)}</TableCell>
                  <TableCell>${custom.seguridadElectrica.toFixed(2)}</TableCell>
                  <TableCell>${custom.senasa.toFixed(2)}</TableCell>
                  <TableCell>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteCustom(custom.id);
                      }}
                      className="text-black hover:text-red-600"
                      aria-label="Delete custom expense"
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
          Agregar Gastos de Aduana
        </Button>
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white p-6 rounded-lg w-full max-w-xl">
            <CreateCustom
              onCustomCreated={handleCustomCreated}
              onCancel={() => setShowCreateModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
