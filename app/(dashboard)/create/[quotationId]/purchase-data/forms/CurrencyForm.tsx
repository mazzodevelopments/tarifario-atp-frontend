import React, { useState, useEffect } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";

interface CurrencyFormProps {
  onSubmit: (data: {
    name: string;
    abbreviation: string;
    dollarValue: number;
  }) => void;
  isLoading: boolean;
  closeDialog?: () => void;
  initialData?: {
    name: string;
    abbreviation: string;
    dollarValue: number;
  };
}

export default function CurrencyForm({
  onSubmit,
  isLoading,
  closeDialog,
  initialData,
}: CurrencyFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    abbreviation: "",
    dollarValue: 0,
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: field === "dollarValue" ? parseFloat(value as string) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await onSubmit(formData);
    closeDialog?.();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <Input
        type="text"
        value={formData.name}
        onChange={(
          e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        ) => handleChange("name", e.target.value)}
        placeholder="Nombre de la Moneda"
        label="Nombre"
        required
      />
      <Input
        type="text"
        value={formData.abbreviation}
        onChange={(
          e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        ) => handleChange("abbreviation", e.target.value)}
        placeholder="Abreviación"
        label="Abreviación"
        required
      />
      <Input
        type="number"
        value={formData.dollarValue}
        onChange={(
          e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        ) => handleChange("dollarValue", e.target.value)}
        placeholder="Valor Dolar"
        label="Valor Dolar"
        step={0.1}
        required
      />

      <div className="flex justify-end gap-2 mt-4">
        <Button
          type="submit"
          variant="primary"
          className="px-2 text-white"
          disabled={isLoading}
        >
          {isLoading ? "Guardando..." : "Guardar"}
        </Button>
      </div>
    </form>
  );
}
