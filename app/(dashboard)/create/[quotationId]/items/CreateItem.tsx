"use client";

import type React from "react";

import { useState, useCallback, useEffect } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Dropdown, { type DropdownItem } from "@/components/Dropdown";
import { DialogClose } from "@/components/ui/dialog";
import type { Item, CreateItem, ListedItem } from "@/types/Item";
import { CatalogService } from "@/services/CatalogService";
import { adaptToDropdown } from "@/app/adapters/adaptToDropdown";

interface CreateItemProps {
  onItemCreated: (item: CreateItem) => void;
  onItemUpdated: (item: CreateItem) => void;
  editingItem: ListedItem | null;
  setEditingItem: (item: ListedItem | null) => void;
}

interface CreateItemForm {
  detail: string;
  quantity: number;
  partNumber: string;
  productNumber: string;
  subfamilyId: number | null;
  modelId: number | null;
  unitId: number | null;
  model?: string;
  brand?: string;
  family?: string;
  subfamily?: string;
  unit?: string;
}

export default function CreateItem({
  onItemCreated,
  onItemUpdated,
  editingItem,
  setEditingItem,
}: CreateItemProps) {
  const [formData, setFormData] = useState<CreateItemForm>({
    family: "",
    subfamily: "",
    subfamilyId: null,
    detail: "",
    brand: "",
    model: "",
    modelId: null,
    quantity: 0,
    unit: "",
    unitId: null,
    partNumber: "",
    productNumber: "",
  });

  const [selectedBrandId, setSelectedBrandId] = useState<number | null>(null);
  const [selectedFamilyId, setSelectedFamilyId] = useState<number | null>(null);

  useEffect(() => {
    if (editingItem) {
      setFormData({
        detail: editingItem.detail,
        quantity: editingItem.quantity,
        partNumber: editingItem.partNumber,
        productNumber: editingItem.productNumber,
        subfamilyId: editingItem.subfamily.id,
        modelId: editingItem.model.id,
        unitId: editingItem.unit.id,
        family: editingItem.family,
        subfamily: editingItem.subfamily.name,
        brand: editingItem.brand,
        model: editingItem.model.name,
        unit: editingItem.unit.name,
      });
    }
  }, [editingItem]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (editingItem) {
      const updatedItem: CreateItem = {
        detail: formData.detail,
        quantity: Number(formData.quantity),
        partNumber: formData.partNumber,
        productNumber: formData.productNumber,
        subfamilyId: formData.subfamilyId!,
        modelId: formData.modelId!,
        unitId: formData.unitId!,
      };

      onItemUpdated(updatedItem);
      setEditingItem(null);
    } else {
      const newItem: CreateItem = {
        detail: formData.detail,
        quantity: Number(formData.quantity),
        partNumber: formData.partNumber,
        productNumber: formData.productNumber,
        subfamilyId: formData.subfamilyId!,
        modelId: formData.modelId!,
        unitId: formData.unitId!,
      };
      onItemCreated(newItem);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSelect = (field: keyof Item) => (item: DropdownItem) => {
    if (field === "subfamily") {
      setFormData((prev) => ({ ...prev, subfamilyId: item.id }));
    } else if (field === "model") {
      setFormData((prev) => ({ ...prev, modelId: item.id }));
    } else if (field === "unit") {
      setFormData((prev) => ({ ...prev, unitId: item.id }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: item.name }));
    }

    if (field === "brand") {
      setSelectedBrandId(item.id);
      setFormData((prev) => ({ ...prev, modelId: null }));
    }

    if (field === "family") {
      setSelectedFamilyId(item.id);
      setFormData((prev) => ({ ...prev, subfamilyId: null }));
    }
  };

  const fetchFamilies = useCallback(async () => {
    const families = await CatalogService.listFamilies();
    return adaptToDropdown(families, "id", "name");
  }, []);

  const fetchSubfamilies = useCallback(async () => {
    if (!selectedFamilyId) return [];
    const subfamilies = await CatalogService.listSubfamilies(selectedFamilyId);
    return adaptToDropdown(subfamilies, "id", "name");
  }, [selectedFamilyId]);

  const fetchBrands = useCallback(async () => {
    const brands = await CatalogService.listBrands();
    return adaptToDropdown(brands, "id", "name");
  }, []);

  const fetchModels = useCallback(async () => {
    if (!selectedBrandId) return [];
    const models = await CatalogService.listModels(selectedBrandId);
    return adaptToDropdown(models, "id", "name");
  }, [selectedBrandId]);

  const fetchUnits = useCallback(async () => {
    const units = await CatalogService.listUnits();
    return adaptToDropdown(units, "id", "name");
  }, []);

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
          addItem={(name: string) =>
            CatalogService.addSubfamily(name, selectedFamilyId!)
          }
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
        addItem={(name: string) =>
          CatalogService.addModel(name, selectedBrandId!)
        }
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
          addItem={CatalogService.addUnit}
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
            {editingItem ? "Actualizar Item" : "Agregar Item"}
          </Button>
        </DialogClose>
      </div>
    </form>
  );
}
