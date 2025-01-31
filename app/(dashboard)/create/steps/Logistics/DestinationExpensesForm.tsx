import React, { useState, useEffect } from "react";
import Button from "@/components/Button";
import Dropdown, { type DropdownItem } from "@/components/Dropdown";
import type { Transport } from "@/types/Transport";
import { DestinationExpenses } from "@/types/DestinationExpenses";

interface DestinationExpensesFormProps {
  onDestinationExpensesCreated: (
    destinationExpenses: DestinationExpenses | null,
  ) => void;
  onCancel: () => void;
  existingDestinationExpenses?: DestinationExpenses | null;
}

export default function DestinationExpensesForm({
  onDestinationExpensesCreated,
  onCancel,
  existingDestinationExpenses,
}: DestinationExpensesFormProps) {
  const [selectedType, setSelectedType] = useState<string>(
    existingDestinationExpenses?.type || "",
  );
  const [destinationExpensesValue, setDestinationExpensesValue] =
    useState<number>(existingDestinationExpenses?.total || 0);

  useEffect(() => {
    if (existingDestinationExpenses) {
      setSelectedType(existingDestinationExpenses.type);
      setDestinationExpensesValue(existingDestinationExpenses.total);
    }
  }, [existingDestinationExpenses]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedType) {
      const newDestinationExpenses: Transport = {
        type: selectedType,
        total: destinationExpensesValue,
      };
      onDestinationExpensesCreated(newDestinationExpenses);
    }
  };

  const handleDelete = () => {
    onDestinationExpensesCreated(null);
  };

  const fetchTransportOptions = async (): Promise<DropdownItem[]> => {
    return [
      { id: "1", name: "Moto" },
      { id: "2", name: "Camión hasta 3.000 kg" },
      { id: "3", name: "Camión hasta 7.000 kg" },
      { id: "4", name: "Semi" },
      { id: "5", name: "Contenedor" },
    ];
  };

  const handleTransportChange = (item: DropdownItem) => {
    setSelectedType(item.name);
    switch (item.name) {
      case "Moto":
        setDestinationExpensesValue(24);
        break;
      case "Camión hasta 3.000 kg":
        setDestinationExpensesValue(180);
        break;
      case "Camión hasta 7.000 kg":
        setDestinationExpensesValue(210);
        break;
      case "Semi":
        setDestinationExpensesValue(270);
        break;
      case "Contenedor":
        setDestinationExpensesValue(380);
        break;
      default:
        setDestinationExpensesValue(0);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Dropdown
        label="Seleccionar Gastos Destino"
        fetchItems={fetchTransportOptions}
        onSelect={handleTransportChange}
        required
        value={selectedType}
      />
      <div className="flex justify-end gap-2">
        {existingDestinationExpenses && (
          <Button
            type="button"
            onClick={handleDelete}
            className="px-4 bg-red-100 text-red-500"
          >
            Eliminar
          </Button>
        )}
        <Button
          type="button"
          onClick={onCancel}
          variant="secondary"
          className="px-4"
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          variant="primary"
          className="px-4 bg-primary text-white"
          disabled={!selectedType}
        >
          {existingDestinationExpenses ? "Actualizar" : "Guardar"}
        </Button>
      </div>
    </form>
  );
}
