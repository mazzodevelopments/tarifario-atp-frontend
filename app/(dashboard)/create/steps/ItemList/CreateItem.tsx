"use client";

import { useState } from "react";
import Button from "@/components/Button";
import { Item } from "@/app/(dashboard)/create/steps/ItemList/ItemList";
import Input from "@/components/Input";
import Dropdown, { DropdownItem } from "@/components/Dropdown";

const UNITS = ["Unidad", "Metro", "Kilogramo", "Litro", "Pieza"];

interface CreateItemProps {
  onItemCreated: (item: Item) => void;
  onCancel: () => void;
}

export default function CreateItem({
  onItemCreated,
  onCancel,
}: CreateItemProps) {
  const [formData, setFormData] = useState({
    detail: "",
    brand: "",
    quantity: "",
    unit: "",
    partNumber: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: Item = {
      id: Math.random().toString(36).substr(2, 9),
      ...formData,
      quantity: Number(formData.quantity),
    };
    onItemCreated(newItem);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBrandSelect = (item: DropdownItem) => {
    setFormData((prev) => ({ ...prev, brand: item.name }));
  };

  const fetchBrands = async (): Promise<DropdownItem[]> => {
    // Simular la obtención de marcas desde un servicio
    return [
      { id: "1", name: "Marca A" },
      { id: "2", name: "Marca B" },
      { id: "3", name: "Marca C" },
    ];
  };

  const addBrand = async (name: string): Promise<DropdownItem> => {
    // Simular la adición de una nueva marca
    return { id: Math.random().toString(36).substr(2, 9), name };
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="detail"
          className="block text-sm font-medium text-gray-700"
        >
          Detalle
        </label>
        <Input
          type="text"
          id="detail"
          name="detail"
          value={formData.detail}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label
          htmlFor="brand"
          className="block text-sm font-medium text-gray-700"
        >
          Marca
        </label>
        <Dropdown
          fetchItems={fetchBrands}
          addItem={addBrand}
          onSelect={handleBrandSelect}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="quantity"
            className="block text-sm font-medium text-gray-700"
          >
            Cantidad
          </label>
          <Input
            type="number"
            id="quantity"
            name="quantity"
            min="1"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label
            htmlFor="unit"
            className="block text-sm font-medium text-gray-700"
          >
            Unidad de Medida
          </label>
          <select
            id="unit"
            name="unit"
            value={formData.unit}
            onChange={handleChange}
            required
            className="w-full px-2 py-2 border rounded-md focus:outline-none text-sm"
          >
            <option value="">Seleccionar unidad</option>
            {UNITS.map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor="partNumber"
          className="block text-sm font-medium text-gray-700"
        >
          Part Number (PN)
        </label>
        <Input
          type="text"
          id="partNumber"
          name="partNumber"
          value={formData.partNumber}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <Button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm bg-gray-200 text-gray-800 hover:bg-gray-300"
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          className="px-4 py-2 text-sm bg-primary text-white"
        >
          Agregar Item
        </Button>
      </div>
    </form>
  );
}
