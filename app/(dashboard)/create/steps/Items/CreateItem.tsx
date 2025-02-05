"use client";

import { useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Dropdown, { DropdownItem } from "@/components/Dropdown";
import { DialogClose } from "@/components/ui/dialog";
import { Item } from "@/types/Item";
import { ItemsService } from "@/services/ItemsService";

interface CreateItemProps {
  onItemCreated: (item: Item) => void;
}

export default function CreateItem({ onItemCreated }: CreateItemProps) {
  const [formData, setFormData] = useState<Omit<Item, "numbering">>({
    family: "",
    subfamily: "",
    detail: "",
    model: "",
    brand: "",
    quantity: 0,
    unit: "",
    partNumber: "",
    productNumber: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: Item = {
      numbering: `P${Math.floor(Math.random() * 100)
        .toString()
        .padStart(9, "0")}`,
      ...formData,
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

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Dropdown
          value={formData.family}
          fetchItems={ItemsService.fetchFamilies}
          addItem={ItemsService.addFamily}
          onSelect={handleSelect("family")}
          label="Familia"
          required
        />
        <Dropdown
          value={formData.subfamily}
          fetchItems={ItemsService.fetchSubfamilies}
          addItem={ItemsService.addSubfamily}
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
        fetchItems={ItemsService.fetchBrands}
        addItem={ItemsService.addBrand}
        onSelect={handleSelect("brand")}
        label="Marca"
        required
      />
      <Dropdown
        value={formData.model}
        fetchItems={ItemsService.fetchModels}
        addItem={ItemsService.addModel}
        onSelect={handleSelect("model")}
        label="Modelo"
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
          fetchItems={ItemsService.fetchUnits}
          onSelect={handleSelect("unit")}
          label="Unidad de Medida"
          required
        />
      </div>
      <Input
        type="text"
        id="productNumber"
        name="productNumber"
        value={formData.productNumber}
        onChange={handleChange}
        placeholder="Numero Producto Cliente"
        label="Numero Producto Cliente"
        required
      />
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
