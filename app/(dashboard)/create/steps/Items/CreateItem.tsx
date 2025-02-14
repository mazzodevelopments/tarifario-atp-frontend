"use client";

import { useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Dropdown, { DropdownItem } from "@/components/Dropdown";
import { DialogClose } from "@/components/ui/dialog";
import { Item } from "@/types/Item";
import { CatalogService } from "@/services/CatalogService";
import { adaptToDropdown } from "@/app/adapters/adaptToDropdown";

interface CreateItemProps {
  onItemCreated: (item: Item) => void;
}

export default function CreateItem({ onItemCreated }: CreateItemProps) {
  const [formData, setFormData] = useState<Omit<Item, "id">>({
    numbering: "",
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

  const [selectedBrandId, setSelectedBrandId] = useState<number | null>(null);
  const [selectedFamilyId, setSelectedFamilyId] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newItem = {
      ...formData,
      numbering: `P${Math.floor(Math.random() * 100)
        .toString()
        .padStart(9, "0")}`,
    };
    onItemCreated({ ...newItem, id: 1 });
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

    if (field === "brand") {
      setSelectedBrandId(item.id); // Guardar el ID de la marca seleccionada
      setFormData((prev) => ({ ...prev, model: "" }));
    }

    if (field === "family") {
      setSelectedFamilyId(item.id); // Guardar el ID de la familia seleccionada
      setFormData((prev) => ({ ...prev, subfamily: "" }));
    }
  };

  const fetchFamilies = async () => {
    const families = await CatalogService.listFamilies();
    return adaptToDropdown(families, "id", "name");
  };

  const fetchSubfamilies = async () => {
    if (!selectedFamilyId) return [];
    const subfamilies = await CatalogService.listSubfamilies(selectedFamilyId);
    return adaptToDropdown(subfamilies, "id", "name");
  };

  const fetchBrands = async () => {
    const brands = await CatalogService.listBrands();
    return adaptToDropdown(brands, "id", "name");
  };

  const fetchModels = async () => {
    if (!selectedBrandId) return [];
    const models = await CatalogService.listModels(selectedBrandId);
    return adaptToDropdown(models, "id", "name");
  };

  const fetchUnits = async () => {
    const units = await CatalogService.listUnits();
    return adaptToDropdown(units, "id", "name");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Dropdown
          value={formData.family}
          fetchItems={fetchFamilies}
          addItem={CatalogService.addFamily}
          onSelect={handleSelect("family")}
          label="Familia"
          required
        />
        <Dropdown
          value={formData.subfamily}
          fetchItems={fetchSubfamilies}
          addItem={CatalogService.addSubfamily}
          onSelect={handleSelect("subfamily")}
          label="Subfamilia"
          required
          disabled={!selectedFamilyId}
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
        addItem={CatalogService.addBrand}
        onSelect={handleSelect("brand")}
        label="Marca"
        required
      />
      <Dropdown
        value={formData.model}
        fetchItems={fetchModels}
        addItem={CatalogService.addModel}
        onSelect={handleSelect("model")}
        label="Modelo"
        required
        disabled={!selectedBrandId}
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
