"use client";

import { useState } from "react";
import { Item } from "@/app/(dashboard)/create/steps/Items/ItemList";
import { Budget } from "@/app/(dashboard)/create/steps/Budgets/BudgetList";
import { COUNTRIES, INCOTERMS } from "@/app/(dashboard)/create/data";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Dropdown, { DropdownItem } from "@/components/Dropdown";

interface CreateBudgetProps {
  onBudgetCreated: (budget: Budget) => void;
  onCancel: () => void;
  items: Item[];
}

export default function CreateBudget({
  onBudgetCreated,
  onCancel,
  items,
}: CreateBudgetProps) {
  const [formData, setFormData] = useState<Omit<Budget, "id">>({
    item: "",
    supplier: "",
    origin: "",
    destination: "",
    unitPrice: 0,
    unitWeight: 0,
    deliveryTime: "",
    incoterm: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBudget: Budget = {
      id: Math.random().toString(36).slice(2, 9),
      ...formData,
    };
    onBudgetCreated(newBudget);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? parseFloat(value) : value,
    }));
  };

  const handleSelect = (field: keyof Budget) => (item: DropdownItem) => {
    setFormData((prev) => ({ ...prev, [field]: item.name }));
  };

  const fetchSuppliers = async (): Promise<DropdownItem[]> => {
    // Simular la obtención de proveedores desde un servicio
    return [
      { id: "1", name: "Proveedor A" },
      { id: "2", name: "Proveedor B" },
      { id: "3", name: "Proveedor C" },
    ];
  };

  const addSupplier = async (name: string): Promise<DropdownItem> => {
    // Simular la adición de una nueva marca
    return { id: Math.random().toString(36).substr(2, 9), name };
  };

  const fetchItems = async (): Promise<DropdownItem[]> => {
    return items.map((item) => {
      return { id: item.id, name: item.detail };
    });
  };

  const fetchLocations = async (): Promise<DropdownItem[]> => {
    // Simular la obtención de ubicaciones desde un servicio
    return COUNTRIES;
  };

  const fetchIncoterms = async (): Promise<DropdownItem[]> => {
    return INCOTERMS;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="item"
          className="block text-sm font-medium text-gray-700"
        >
          Item
        </label>
        <Dropdown
          fetchItems={fetchItems}
          onSelect={handleSelect("item")}
          required
        />
      </div>

      <div>
        <label
          htmlFor="supplier"
          className="block text-sm font-medium text-gray-700"
        >
          Proveedor
        </label>
        <Dropdown
          addItem={addSupplier}
          fetchItems={fetchSuppliers}
          onSelect={handleSelect("supplier")}
          required
        />
      </div>

      <div>
        <label
          htmlFor="origin"
          className="block text-sm font-medium text-gray-700"
        >
          Origen
        </label>
        <Dropdown
          fetchItems={fetchLocations}
          onSelect={handleSelect("origin")}
          required
        />
      </div>

      <div>
        <label
          htmlFor="destination"
          className="block text-sm font-medium text-gray-700"
        >
          Destino
        </label>
        <Dropdown
          fetchItems={fetchLocations}
          onSelect={handleSelect("destination")}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="unitPrice"
            className="block text-sm font-medium text-gray-700"
          >
            Precio Unitario
          </label>
          <Input
            type="number"
            id="unitPrice"
            name="unitPrice"
            value={formData.unitPrice}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label
            htmlFor="unitWeight"
            className="block text-sm font-medium text-gray-700"
          >
            Peso Unitario
          </label>
          <Input
            type="number"
            id="unitWeight"
            name="unitWeight"
            value={formData.unitWeight}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="deliveryTime"
          className="block text-sm font-medium text-gray-700"
        >
          Tiempo de Entrega
        </label>
        <Input
          type="text"
          id="deliveryTime"
          name="deliveryTime"
          value={formData.deliveryTime}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label
          htmlFor="incoterm"
          className="block text-sm font-medium text-gray-700"
        >
          Incoterm
        </label>
        <Dropdown
          fetchItems={fetchIncoterms}
          onSelect={handleSelect("incoterm")}
          required
        />
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <Button type="button" onClick={onCancel} variant="secondary">
          Cancelar
        </Button>
        <Button type="submit" variant="primary">
          Agregar Presupuesto
        </Button>
      </div>
    </form>
  );
}
