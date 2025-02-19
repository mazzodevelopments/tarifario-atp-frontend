"use client";

import type React from "react";
import { useState, useEffect, useCallback } from "react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Dropdown, { type DropdownItem } from "@/components/Dropdown";
import type { Item } from "@/types/Item";
import type { CreatePurchaseData } from "@/types/PurchaseData";
import { CatalogService } from "@/services/CatalogService";
import { adaptToDropdown } from "@/app/adapters/adaptToDropdown";

interface CreatePurchaseProps {
  onPurchaseCreated: (purchaseData: CreatePurchaseData) => void;
  items: Item[];
  onCancel?: () => void;
}

interface CreatePurchaseDataForm {
  date: string;
  unitPrice: number;
  margin: number;
  appliedUnitPrice: number;
  unitWeight: number;
  totalWeight: number;
  additionalObservations: string;
  item: string;
  itemId: number | null;
  origin: string;
  deliveryTime: number;
  originId: number | null;
  destination: string;
  destinationId: number | null;
  supplier: string;
  supplierId: number | null;
  currency: string;
  currencyId: number | null;
  weightUnit: string;
  weightUnitId: number | null;
  incoterm: string;
  incotermId: number | null;
}

export default function CreatePurchase({
  onPurchaseCreated,
  items,
  onCancel,
}: CreatePurchaseProps) {
  const [formData, setFormData] = useState<CreatePurchaseDataForm>({
    date: new Date().toISOString().split("T")[0],
    item: "",
    itemId: null,
    origin: "",
    originId: null,
    destination: "",
    destinationId: null,
    supplier: "",
    supplierId: null,
    currency: "",
    currencyId: null,
    unitPrice: 0,
    margin: 0,
    appliedUnitPrice: 0,
    deliveryTime: 0,
    unitWeight: 0,
    totalWeight: 0,
    weightUnit: "",
    weightUnitId: null,
    incoterm: "",
    incotermId: null,
    additionalObservations: "",
  });

  const isWithinArgentina =
    formData.origin === "Argentina" && formData.destination === "Argentina";

  // CALCULO DEL PESO
  useEffect(() => {
    if (formData.itemId && formData.unitWeight) {
      const selectedItem = items.find((item) => item.id === formData.itemId);
      setFormData((prev) => ({
        ...prev,
        totalWeight: prev.unitWeight * (selectedItem?.quantity || 1),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        totalWeight: 0,
      }));
    }
  }, [formData.itemId, formData.unitWeight, items]);

  // CALCULO TOTAL PRECIO UNITARIO
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      appliedUnitPrice: prev.unitPrice * (1 + prev.margin / 100),
    }));
  }, [formData.unitPrice, formData.margin]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const purchaseData: CreatePurchaseData = {
      date: formData.date,
      unitPrice: formData.unitPrice,
      margin: formData.margin,
      appliedUnitPrice: formData.appliedUnitPrice,
      unitWeight: formData.unitWeight,
      totalWeight: formData.totalWeight,
      additionalObservations: formData.additionalObservations,
      deliveryTime: formData.deliveryTime,
      itemId: formData.itemId,
      originId: formData.originId,
      destinationId: formData.destinationId,
      supplierId: formData.supplierId,
      currencyId: formData.currencyId,
      weightUnitId: formData.weightUnitId,
      incotermId: formData.incotermId,
    };
    onPurchaseCreated(purchaseData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "number" && value !== "" ? Math.max(0, Number(value)) : value,
    }));
  };

  const handleSelect =
    (field: keyof CreatePurchaseDataForm) => (item: DropdownItem) => {
      setFormData((prev) => ({
        ...prev,
        [field]: item.name,
        [`${field}Id`]: item.id,
      }));
    };

  const fetchSuppliers = useCallback(async () => {
    const suppliers = await CatalogService.listSuppliers();
    return adaptToDropdown(suppliers, "id", "name");
  }, []);

  const fetchCurrencies = useCallback(async () => {
    const currencies = await CatalogService.listCurrencies();
    return adaptToDropdown(currencies, "id", "name");
  }, []);

  const fetchWeightUnits = useCallback(async () => {
    const weightUnits = await CatalogService.listWeightUnits();
    return adaptToDropdown(weightUnits, "id", "name");
  }, []);

  const fetchLocations = useCallback(async () => {
    const locations = await CatalogService.listLocations();
    return adaptToDropdown(locations, "id", "name");
  }, []);

  const fetchIncoterms = useCallback(async () => {
    const incoterms = await CatalogService.listIncoterms();
    return adaptToDropdown(incoterms, "id", "name");
  }, []);

  const fetchItems = useCallback(async () => {
    return adaptToDropdown(items, "id", "detail");
  }, [items]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        label="Fecha"
        required
      />
      <Dropdown
        value={formData.item}
        fetchItems={fetchItems}
        onSelect={handleSelect("item")}
        label="Item"
        required
      />
      <div className="grid grid-cols-3 gap-4">
        <Dropdown
          value={formData.origin}
          fetchItems={fetchLocations}
          onSelect={handleSelect("origin")}
          label="Origen"
          required
        />
        <Dropdown
          value={formData.destination}
          fetchItems={fetchLocations}
          onSelect={handleSelect("destination")}
          label="L. Entrega"
          required
        />
        <Input
          type="number"
          name="deliveryTime"
          value={formData.deliveryTime}
          onChange={handleChange}
          label="Tiempo de Producción (Días)"
          required
          min="0"
        />
      </div>
      <Dropdown
        value={formData.supplier}
        fetchItems={fetchSuppliers}
        onSelect={handleSelect("supplier")}
        label="Proovedor"
        required
      />
      <div className="grid grid-cols-2 gap-4">
        <Dropdown
          value={formData.currency}
          fetchItems={fetchCurrencies}
          onSelect={handleSelect("currency")}
          label="Moneda"
          required
        />
        <Input
          type="number"
          name="unitPrice"
          value={formData.unitPrice.toFixed(2)}
          onChange={handleChange}
          label="Precio Unitario Proovedor"
          min="0"
          required
        />
        {!isWithinArgentina && (
          <>
            <Input
              type="number"
              name="margin"
              value={formData.margin}
              onChange={handleChange}
              label="Margen (%)"
              min="0"
              max="100"
              required
            />
            <Input
              type="number"
              name="appliedUnitPrice"
              value={formData.appliedUnitPrice.toFixed(2)}
              onChange={handleChange}
              label="Precio Unitario Aplicado"
              min="0"
              required
              disabled
            />
          </>
        )}
      </div>
      <div className="grid grid-cols-3 gap-4">
        <Input
          type="number"
          name="unitWeight"
          value={formData.unitWeight}
          onChange={handleChange}
          label="Peso Unitario"
          required
          min="0"
        />
        <Dropdown
          value={formData.weightUnit}
          fetchItems={fetchWeightUnits}
          addItem={CatalogService.addWeightUnit}
          onSelect={handleSelect("weightUnit")}
          label="Unidad"
          required
        />
        <Input
          type="number"
          name="totalWeight"
          value={formData.totalWeight}
          onChange={handleChange}
          label="Peso Total"
          disabled
        />
      </div>
      <Dropdown
        value={formData.incoterm}
        fetchItems={fetchIncoterms}
        onSelect={handleSelect("incoterm")}
        label="Incoterm"
        required
        disabled={isWithinArgentina}
      />
      <Input
        type="text"
        name="additionalObservations"
        value={formData.additionalObservations}
        onChange={handleChange}
        label="Observaciones Adicionales"
        placeholder="Observaciones Adicionales"
        isTextArea
      />

      {isWithinArgentina && (
        <div className="flex items-center justify-center">
          <span className="text-sm font-[600] text-orange-500">Nacional</span>
        </div>
      )}

      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant="secondary"
          className="text-sm"
          onClick={onCancel}
        >
          Cancelar
        </Button>
        <Button type="submit" className="text-sm bg-primary text-white">
          Cargar Datos De Compra
        </Button>
      </div>
    </form>
  );
}
