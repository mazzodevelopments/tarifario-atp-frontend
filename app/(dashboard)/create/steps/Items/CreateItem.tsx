"use client";

import { useState } from "react";
import { UNITS } from "@/app/(dashboard)/create/data";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Dropdown, { DropdownItem } from "@/components/Dropdown";
import { Item } from "@/app/(dashboard)/create/types";
import { DialogClose } from "@/components/ui/dialog";

interface CreateItemProps {
  onItemCreated: (item: Item) => void;
}

export default function CreateItem({ onItemCreated }: CreateItemProps) {
  const [formData, setFormData] = useState<Omit<Item, "id">>({
    family: "",
    subfamily: "",
    detail: "",
    brand: "",
    quantity: 0,
    unit: "",
    partNumber: "",
    numbering: "",
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

  const fetchFamilies = async (): Promise<DropdownItem[]> => {
    // Simular la obtención de marcas desde un servicio
    return [
      { id: "1", name: "Familia A" },
      { id: "2", name: "Familia B" },
      { id: "3", name: "Familia C" },
    ];
  };

  const fetchSubfamilies = async (): Promise<DropdownItem[]> => {
    // Simular la obtención de marcas desde un servicio
    return [
      { id: "1", name: "Subfamilia A" },
      { id: "2", name: "Subfamilia B" },
      { id: "3", name: "Subfamilia C" },
    ];
  };

  const addBrand = async (name: string): Promise<DropdownItem> => {
    // Simular la adición de una nueva marca
    return { id: Math.random().toString(36).substr(2, 9), name };
  };
  const addFamily = async (name: string): Promise<DropdownItem> => {
    // Simular la adición de una nueva marca
    return { id: Math.random().toString(36).substr(2, 9), name };
  };
  const addSubfamily = async (name: string): Promise<DropdownItem> => {
    // Simular la adición de una nueva marca
    return { id: Math.random().toString(36).substr(2, 9), name };
  };

  const fetchUnits = async (): Promise<DropdownItem[]> => {
    // Simular la obtención de marcas desde un servicio
    return UNITS;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Dropdown
          value={formData.family}
          fetchItems={fetchFamilies}
          addItem={addFamily}
          onSelect={handleSelect("family")}
          label="Familia"
          required
        />
        <Dropdown
          value={formData.subfamily}
          fetchItems={fetchSubfamilies}
          addItem={addSubfamily}
          onSelect={handleSelect("subfamily")}
          label="Subfamilia"
          required
        />
      </div>
      <Input
        type="text"
        id="detail"
        name="detail"
        value={formData.detail}
        onChange={handleChange}
        placeholder="Detalle"
        label="Detalle"
        required
      />
      <Dropdown
        value={formData.brand}
        fetchItems={fetchBrands}
        addItem={addBrand}
        onSelect={handleSelect("brand")}
        label="Marca"
        required
      />
      <div className="grid grid-cols-2 gap-4">
        <Input
          type="number"
          id="quantity"
          name="quantity"
          min="1"
          value={formData.quantity}
          onChange={handleChange}
          label="Cantidad"
          required
        />
        <Dropdown
          value={formData.unit}
          fetchItems={fetchUnits}
          onSelect={handleSelect("unit")}
          label="Unidad de Medida"
          required
        />
      </div>
      <Input
        type="text"
        id="partNumber"
        name="partNumber"
        value={formData.partNumber}
        onChange={handleChange}
        placeholder="Part Number"
        label="Part Number (PN)"
        required
      />
      <Input
        type="text"
        id="numbering"
        name="numbering"
        value={formData.numbering}
        onChange={handleChange}
        placeholder="Numeración"
        label="Numeración"
        required
      />

      <div className="flex justify-end gap-3 mt-6">
        <DialogClose asChild>
          <Button type="button" variant="secondary">
            Cancelar
          </Button>
        </DialogClose>
        <DialogClose asChild>
          <Button type="submit" className="bg-primary text-white">
            Agregar Item
          </Button>
        </DialogClose>
      </div>
    </form>
  );
}
