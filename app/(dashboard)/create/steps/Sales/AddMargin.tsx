import type React from "react";
import { useState } from "react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import type { SalesData } from "@/types/SalesData";

interface AddMarginProps {
  onSalesDataCreated: (salesData: SalesData) => void;
  onCancel?: () => void;
}

export default function AddMargin({
  onSalesDataCreated,
  onCancel,
}: AddMarginProps) {
  const [formData, setFormData] = useState<SalesData>({
    unitSalePrice: 0,
    margin: 0,
    totalPrice: 0,
    paymentCondition: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSalesDataCreated(formData);
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

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="number"
        name="margin"
        value={formData.margin}
        onChange={handleChange}
        label="Margen (%)"
        required
        min="0"
        max="100"
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
