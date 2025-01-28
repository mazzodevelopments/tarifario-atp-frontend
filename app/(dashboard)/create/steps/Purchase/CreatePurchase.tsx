import type React from "react";
import { useState, useEffect } from "react";
import {
  COUNTRIES,
  INCOTERMS,
  UNITS,
  CURRENCIES,
} from "@/app/(dashboard)/create/data";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Dropdown, { type DropdownItem } from "@/components/Dropdown";
import type { Item } from "@/types/Item";
import type { PurchaseData } from "@/types/PurchaseData";

interface CreatePurchaseProps {
  onPurchaseCreated: (purchaseData: PurchaseData) => void;
  items: Item[];
  onCancel?: () => void;
}

export default function CreatePurchase({
  onPurchaseCreated,
  items,
  onCancel,
}: CreatePurchaseProps) {
  const [formData, setFormData] = useState<PurchaseData>({
    date: new Date().toISOString().split("T")[0],
    item: null,
    origin: "",
    destination: "",
    supplier: "",
    currency: "",
    unitPrice: 0,
    margin: 0,
    appliedUnitPrice: 0,
    deliveryTime: 0,
    unitWeight: 0,
    totalWeight: 0,
    unit: "",
    incoterm: "",
    additionalObservations: "",
  });

  const isWithinArgentina =
    formData.origin === "Argentina" && formData.destination === "Argentina";

  // CALCULO DEL PESO
  useEffect(() => {
    if (formData.item && formData.unitWeight) {
      setFormData((prev) => ({
        ...prev,
        totalWeight: prev.unitWeight * (formData.item?.quantity || 1),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        totalWeight: 0,
      }));
    }
  }, [formData.item, formData.unitWeight]);

  // CALCULO TOTAL PRECIO UNITARIO
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      appliedUnitPrice: prev.unitPrice * (1 + prev.margin / 100),
    }));
  }, [formData.unitPrice, formData.margin]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPurchaseCreated(formData);
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

  const handleSelect = (field: keyof PurchaseData) => (item: DropdownItem) => {
    if (field === "item") {
      const selectedItem = items.find((i) => i.id === item.id);
      setFormData((prev) => ({
        ...prev,
        [field]: selectedItem || null,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: item.name }));
    }
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
      <Input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        label="Fecha"
        required
      />
      <Dropdown
        value={formData.item?.detail}
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
        addItem={addSupplier}
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
          value={formData.unit}
          fetchItems={fetchUnits}
          onSelect={handleSelect("unit")}
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
