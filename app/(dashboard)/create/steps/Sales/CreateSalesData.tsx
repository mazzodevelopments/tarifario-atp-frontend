import type React from "react";
import { useState } from "react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Dropdown, { type DropdownItem } from "@/components/Dropdown";
import type { SalesData } from "@/types/SalesData";

interface CreateSalesDataProps {
  onSalesDataCreated: (salesData: SalesData) => void;
  onCancel?: () => void;
}

export default function CreateSalesData({
  onSalesDataCreated,
  onCancel,
}: CreateSalesDataProps) {
  const [formData, setFormData] = useState<SalesData>({
    unitPrice: 0,
    currency: "",
    margin: 0,
    totalPrice: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const totalPrice = formData.unitPrice * (1 + formData.margin / 100);
    onSalesDataCreated({ ...formData, totalPrice });
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

  const handleSelect = (field: keyof SalesData) => (item: DropdownItem) => {
    setFormData((prev) => ({ ...prev, [field]: item.name }));
  };

  const fetchCurrencies = async (): Promise<DropdownItem[]> => {
    return [
      { id: "1", name: "USD" },
      { id: "2", name: "EUR" },
      { id: "3", name: "ARS" },
    ];
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Input
          type="number"
          name="unitPrice"
          value={formData.unitPrice}
          onChange={handleChange}
          label="Precio Unitario"
          required
          min="0"
          step="0.01"
        />
        <Dropdown
          value={formData.currency}
          fetchItems={fetchCurrencies}
          onSelect={handleSelect("currency")}
          label="Moneda"
          required
        />
      </div>
      <Input
        type="number"
        name="margin"
        value={formData.margin}
        onChange={handleChange}
        label="Margen (%)"
        required
        min="0"
        max="100"
        step="0.1"
      />
      <Input
        type="number"
        name="totalPrice"
        value={formData.unitPrice * (1 + formData.margin / 100)}
        onChange={handleChange}
        label="Precio Total"
        disabled
      />
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
          Cargar Datos De Venta
        </Button>
      </div>
    </form>
  );
}
