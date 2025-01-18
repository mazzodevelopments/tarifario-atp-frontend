"use client";

import { useState } from "react";
import { UNITS } from "@/app/(dashboard)/create/data";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Dropdown, { DropdownItem } from "@/components/Dropdown";
import { Item } from "@/app/(dashboard)/create/types";

interface CreateItemProps {
  onItemCreated: (item: Item) => void;
  onCancel: () => void;
}

export default function CreateItem({
  onItemCreated,
  onCancel,
}: CreateItemProps) {
  const [formData, setFormData] = useState<Omit<Item, "id">>({
    detail: "",
    brand: "",
    quantity: 0,
    unit: "",
    partNumber: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: Item = {
      id: Math.random().toString(36).slice(2, 9),
      ...formData,
      quantity: Number(formData.quantity),
    };
    onItemCreated(newItem);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSelect = (field: keyof Item) => (item: DropdownItem) => {
    setFormData((prev) => ({ ...prev, [field]: item.name }));
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

  const fetchUnits = async (): Promise<DropdownItem[]> => {
    // Simular la obtención de marcas desde un servicio
    return UNITS;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="detail"
          className="block text-sm font-[600] text-gray-700"
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
          className="block text-sm font-[600] text-gray-700"
        >
          Marca
        </label>
        <Dropdown
          fetchItems={fetchBrands}
          addItem={addBrand}
          onSelect={handleSelect("brand")}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="quantity"
            className="block text-sm font-[600] text-gray-700"
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
            className="block text-sm font-[600] text-gray-700"
          >
            Unidad de Medida
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
          htmlFor="partNumber"
          className="block text-sm font-[600] text-gray-700"
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
        <Button type="button" onClick={onCancel} variant="secondary">
          Cancelar
        </Button>
        <Button type="submit" variant="primary">
          Agregar Item
        </Button>
      </div>
    </form>
  );
}
