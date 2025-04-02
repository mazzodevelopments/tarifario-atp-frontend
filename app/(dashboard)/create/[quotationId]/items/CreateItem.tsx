"use client";

import type React from "react";

import { useState, useCallback, useEffect } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Dropdown, { type DropdownItem } from "@/components/Dropdown";
import type { Item, CreateItem, ListedItem } from "@/types/Item";
import { CatalogService } from "@/services/CatalogService";
import { adaptToDropdown } from "@/app/adapters/adaptToDropdown";
import FamilyForm from "@/app/(dashboard)/create/[quotationId]/items/forms/FamilyForm";
import SubfamilyForm from "@/app/(dashboard)/create/[quotationId]/items/forms/SubfamilyForm";

interface CreateItemProps {
  onItemCreated: (item: CreateItem) => void;
  onItemUpdated: (item: CreateItem) => void;
  editingItem: ListedItem | null;
  setEditingItem: (item: ListedItem | null) => void;
  onDialogClose: () => void;
}

interface CreateItemForm {
  detail: string;
  quantity: number;
  partNumber: string;
  productNumber: string;
  subfamilyId: number | null;
  brandId: number | null;
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
  onDialogClose,
}: CreateItemProps) {
  const [formData, setFormData] = useState<CreateItemForm>({
    family: "",
    subfamily: "",
    subfamilyId: null,
    detail: "",
    brand: "",
    brandId: null,
    model: "",
    modelId: null,
    quantity: 0,
    unit: "",
    unitId: null,
    partNumber: "",
    productNumber: "",
  });
  const [errors, setErrors] = useState({
    family: "",
    subfamily: "",
    detail: "",
    brand: "",
    model: "",
    quantity: "",
    unit: "",
    productNumber: "",
    partNumber: "",
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
        brandId: editingItem.brand?.id || null,
        modelId: editingItem.model?.id || null,
        unitId: editingItem.unit.id,
        family: editingItem.family,
        subfamily: editingItem.subfamily.name,
        brand: editingItem.brand?.name || "",
        model: editingItem.model?.name || "",
        unit: editingItem.unit.name,
      });
      setSelectedBrandId(editingItem.brand?.id || null);
    }
  }, [editingItem]);

  const validateForm = () => {
    const newErrors = {
      family: "",
      subfamily: "",
      detail: "",
      brand: "",
      model: "",
      quantity: "",
      unit: "",
      productNumber: "",
      partNumber: "",
    };
    let isValid = true;

    if (!formData.family) {
      newErrors.family = "La familia es requerida";
      isValid = false;
    }

    if (!formData.subfamilyId) {
      newErrors.subfamily = "La subfamilia es requerida";
      isValid = false;
    }

    if (!formData.detail) {
      newErrors.detail = "El detalle es requerido";
      isValid = false;
    }

    // Validar que si hay modelo, debe haber marca
    if (formData.modelId && !formData.brandId) {
      newErrors.brand = "Debe seleccionar una marca si especifica un modelo";
      isValid = false;
    }

    if (formData.quantity <= 0) {
      newErrors.quantity = "La cantidad debe ser mayor a 0";
      isValid = false;
    }

    if (!formData.unitId) {
      newErrors.unit = "La unidad de medida es requerida";
      isValid = false;
    }

    if (!formData.productNumber) {
      newErrors.productNumber = "El número de producto es requerido";
      isValid = false;
    }

    if (!formData.partNumber) {
      newErrors.partNumber = "El part number es requerido";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!validateForm()) {
      return;
    }

    const itemData: CreateItem = {
      detail: formData.detail,
      quantity: Number(formData.quantity),
      partNumber: formData.partNumber,
      productNumber: formData.productNumber,
      subfamilyId: formData.subfamilyId!,
      brandId: formData.brandId || null, // Permitir null
      modelId: formData.modelId || null, // Permitir null
      unitId: formData.unitId!,
    };

    if (editingItem) {
      onItemUpdated(itemData);
    } else {
      onItemCreated(itemData);
    }

    setEditingItem(null);
    onDialogClose();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleSelect = (field: keyof Item) => (item: DropdownItem | null) => {
    // Permitir null para borrar la selección
    if (item === null) {
      if (field === "brand") {
        setFormData((prev) => ({
          ...prev,
          brandId: null,
          brand: "",
          modelId: null,
          model: "",
        }));
        setSelectedBrandId(null);
      } else if (field === "model") {
        setFormData((prev) => ({
          ...prev,
          modelId: null,
          model: "",
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          [`${field}Id`]: null,
          [field]: "",
        }));
      }
      return;
    }

    if (field === "subfamily") {
      setFormData((prev) => ({
        ...prev,
        subfamilyId: item.id,
        subfamily: item.name,
      }));
    } else if (field === "brand") {
      setFormData((prev) => ({
        ...prev,
        brandId: item.id,
        brand: item.name,
        modelId: null,
        model: "",
      }));
      setSelectedBrandId(item.id);
    } else if (field === "model") {
      setFormData((prev) => ({ ...prev, modelId: item.id, model: item.name }));
    } else if (field === "unit") {
      setFormData((prev) => ({ ...prev, unitId: item.id, unit: item.name }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: item.name }));
    }

    if (field === "family") {
      setSelectedFamilyId(item.id);
      setFormData((prev) => ({ ...prev, subfamilyId: null, subfamily: "" }));
    }

    setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
  };

  const handleAddFamily = async (newFamily: {
    name: string;
    identifier: string;
  }) => {
    try {
      const addedFamily = await CatalogService.addFamily(newFamily);

      setFormData((prev) => ({
        ...prev,
        family: addedFamily.name,
      }));

      setSelectedFamilyId(addedFamily.id);

      return addedFamily;
    } catch (error) {
      console.error("Error adding new family:", error);
      throw error;
    }
  };

  const handleAddSubfamily = async (newSubfamily: {
    name: string;
    identifier: string;
  }) => {
    try {
      if (!selectedFamilyId) {
        throw new Error("Debes seleccionar una familia primero");
      }

      const addedSubfamily = await CatalogService.addSubfamily(
        newSubfamily,
        selectedFamilyId,
      );

      setFormData((prev) => ({
        ...prev,
        subfamily: addedSubfamily.name,
        subfamilyId: addedSubfamily.id,
      }));

      return addedSubfamily;
    } catch (error) {
      console.error("Error adding new subfamily:", error);
      throw error;
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
          customForm={
            <FamilyForm onSubmit={handleAddFamily} isLoading={false} />
          }
          onSelect={handleSelect("family")}
          label="Familia"
          error={errors.family}
        />
        <Dropdown
          value={formData.subfamily}
          fetchItems={fetchSubfamilies}
          customForm={
            <SubfamilyForm onSubmit={handleAddSubfamily} isLoading={false} />
          }
          onSelect={handleSelect("subfamily")}
          label="Subfamilia"
          error={errors.subfamily}
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
        error={errors.detail}
      />
      <Dropdown
        value={formData.brand}
        fetchItems={fetchBrands}
        addItem={CatalogService.addBrand}
        onSelect={handleSelect("brand")}
        label="Marca"
        error={errors.brand}
        placeholder="Seleccione o deje vacío"
      />
      <Dropdown
        value={formData.model}
        fetchItems={fetchModels}
        addItem={(name: string) =>
          selectedBrandId
            ? CatalogService.addModel(name, selectedBrandId)
            : Promise.reject("Seleccione una marca primero")
        }
        onSelect={handleSelect("model")}
        label="Modelo"
        error={errors.model}
        disabled={!selectedBrandId}
        placeholder={
          !selectedBrandId
            ? "Seleccione una marca primero"
            : "Seleccione o deje vacío"
        }
      />
      <div className="grid grid-cols-2 gap-4">
        <Input
          type="number"
          id="quantity"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          label="Cantidad"
          error={errors.quantity}
        />
        <Dropdown
          value={formData.unit}
          fetchItems={fetchUnits}
          addItem={CatalogService.addUnit}
          onSelect={handleSelect("unit")}
          label="Unidad de Medida"
          error={errors.unit}
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
        error={errors.productNumber}
      />
      <Input
        type="text"
        id="partNumber"
        name="partNumber"
        value={formData.partNumber}
        onChange={handleChange}
        placeholder="Part Number"
        label="Part Number (PN)"
        error={errors.partNumber}
      />

      <div className="flex justify-end gap-3 mt-6">
        <Button
          type="button"
          variant="secondary"
          onClick={() => {
            setEditingItem(null);
            onDialogClose();
          }}
        >
          Cancelar
        </Button>
        <Button type="submit" variant="primary" className="text-white">
          {editingItem ? "Actualizar Item" : "Agregar Item"}
        </Button>
      </div>
    </form>
  );
}
