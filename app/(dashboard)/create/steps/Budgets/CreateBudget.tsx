"use client";

import { useState } from "react";
import { Item } from "@/app/(dashboard)/create/steps/Items/ItemList";
import { Budget } from "@/app/(dashboard)/create/steps/Budgets/BudgetList";
import {
  COUNTRIES,
  INCOTERMS,
  UNITS,
  CURRENCIES,
} from "@/app/(dashboard)/create/data";
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
    date: new Date().toISOString().split("T")[0],
    item: "",
    origin: "",
    destination: "",
    supplier: "",
    deliveryTime: 0,
    unitPrice: 0,
    currency: 0,
    margin: 0,
    unitWeight: 0,
    totalWeight: 0,
    unit: "",
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
    return [
      { id: "1", name: "Proveedor A" },
      { id: "2", name: "Proveedor B" },
      { id: "3", name: "Proveedor C" },
    ];
  };

  const addSupplier = async (name: string): Promise<DropdownItem> => {
    return { id: Math.random().toString(36).substr(2, 9), name };
  };

  const fetchItems = async (): Promise<DropdownItem[]> => {
    return items.map((item) => {
      return { id: item.id, name: item.detail };
    });
  };

  const fetchLocations = async (): Promise<DropdownItem[]> => {
    return COUNTRIES;
  };

  const fetchIncoterms = async (): Promise<DropdownItem[]> => {
    return INCOTERMS;
  };

  const fetchUnits = async (): Promise<DropdownItem[]> => {
    return UNITS;
  };

  const fetchCurrencies = async (): Promise<DropdownItem[]> => {
    return CURRENCIES;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="margin"
          className="block text-sm font-semibold text-gray-700"
        >
          Fecha
        </label>
        <Input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label
          htmlFor="item"
          className="block text-sm font-semibold text-gray-700"
        >
          Item
        </label>
        <Dropdown
          fetchItems={fetchItems}
          onSelect={handleSelect("item")}
          required
        />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label
            htmlFor="origin"
            className="block text-sm font-semibold text-gray-700"
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
            className="block text-sm font-semibold text-gray-700"
          >
            Destino
          </label>
          <Dropdown
            fetchItems={fetchLocations}
            onSelect={handleSelect("destination")}
            required
          />
        </div>

        <div>
          <label
            htmlFor="deliveryTime"
            className="block text-sm font-semibold text-gray-700"
          >
            Tiempo de Entrega (Días)
          </label>
          <Input
            type="number"
            name="deliveryTime"
            value={formData.deliveryTime}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="supplier"
          className="block text-sm font-semibold text-gray-700"
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

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label
            htmlFor="unitPrice"
            className="block text-sm font-semibold text-gray-700"
          >
            Precio Unitario
          </label>
          <Input
            type="number"
            name="unitPrice"
            value={formData.unitPrice}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label
            htmlFor="currency"
            className="block text-sm font-semibold text-gray-700"
          >
            Moneda
          </label>
          <Dropdown
            fetchItems={fetchCurrencies}
            onSelect={handleSelect("currency")}
            required
          />
        </div>

        <div>
          <label
            htmlFor="margin"
            className="block text-sm font-semibold text-gray-700"
          >
            Margen (%)
          </label>
          <Input
            type="number"
            name="margin"
            value={formData.margin}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label
            htmlFor="unitWeight"
            className="block text-sm font-semibold text-gray-700"
          >
            Peso Unitario
          </label>
          <Input
            type="number"
            name="unitWeight"
            value={formData.unitWeight}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label
            htmlFor="totalWeight"
            className="block text-sm font-semibold text-gray-700"
          >
            Peso Total
          </label>
          <Input
            type="number"
            name="totalWeight"
            value={formData.totalWeight}
            onChange={handleChange}
            disabled
          />
        </div>

        <div>
          <label
            htmlFor="unit"
            className="block text-sm font-semibold text-gray-700"
          >
            Unidad
          </label>
          <Dropdown
            fetchItems={fetchUnits}
            onSelect={handleSelect("unit")}
            required
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="incoterm"
          className="block text-sm font-semibold text-gray-700"
        >
          Incoterm
        </label>
        <Dropdown
          fetchItems={fetchIncoterms}
          onSelect={handleSelect("incoterm")}
          required
        />
      </div>

      <div className="flex justify-center items-center">
        <div className="flex gap-3">
          <Button type="button" className="text-sm">
            Agregar Transporte
          </Button>
          <Button type="button" className="text-sm">
            Agregar Aduana
          </Button>
          <Button type="button" className="text-sm">
            Agregar Entrega
          </Button>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" onClick={onCancel} className="text-sm">
          Cancelar
        </Button>
        <Button type="submit" className="text-sm bg-primary text-white">
          Crear Presupuesto
        </Button>
      </div>
    </form>
  );
}
