"use client";

import { useState } from "react";
import Button from "@/components/Button";
import { Item } from "@/app/(dashboard)/create/steps/ItemList/ItemList";

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

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="detail"
          className="block text-sm font-medium text-gray-700"
        >
          Detalle
        </label>
        <input
          type="text"
          id="detail"
          name="detail"
          value={formData.detail}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
        />
      </div>

      <div>
        <label
          htmlFor="brand"
          className="block text-sm font-medium text-gray-700"
        >
          Marca
        </label>
        <input
          type="text"
          id="brand"
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
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
          <input
            type="number"
            id="quantity"
            name="quantity"
            min="1"
            value={formData.quantity}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
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
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
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
        <input
          type="text"
          id="partNumber"
          name="partNumber"
          value={formData.partNumber}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
        />
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <Button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-200 text-gray-800 hover:bg-gray-300"
        >
          Cancelar
        </Button>
        <Button type="submit" className="px-4 py-2 bg-primary text-white">
          Agregar Item
        </Button>
      </div>
    </form>
  );
}
