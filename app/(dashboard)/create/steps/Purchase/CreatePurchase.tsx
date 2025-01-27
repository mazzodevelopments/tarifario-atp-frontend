import React from "react";
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
import { Item } from "@/types/Item";
import { PurchaseData } from "@/types/PurchaseData";

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
    item: "",
    origin: "",
    destination: "",
    supplier: "",
    currency: "",
    deliveryTime: 0,
    unitWeight: 0,
    totalWeight: 0,
    unit: "",
    incoterm: "",
  });
  const [selectedItemQuantity, setSelectedItemQuantity] = useState<number>(0);

  const isWithinArgentina =
    formData.origin === "Argentina" && formData.destination === "Argentina";

  // CALCULO TOTAL DEL PESO
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      totalWeight: prev.unitWeight * selectedItemQuantity,
    }));
  }, [formData.unitWeight, selectedItemQuantity]);

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
    setFormData((prev) => ({ ...prev, [field]: item.name }));

    if (field === "item") {
      const selectedItem = items.find((i) => i.detail === item.name);
      if (selectedItem) {
        setSelectedItemQuantity(selectedItem.quantity);
      }
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
          label="Destino"
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
      <Dropdown
        value={formData.currency}
        fetchItems={fetchCurrencies}
        onSelect={handleSelect("currency")}
        label="Moneda"
        required
      />

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
