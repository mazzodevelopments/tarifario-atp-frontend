import React, { useState, useEffect } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";

interface WeightUnitFormProps {
  onSubmit: (data: { name: string; kgValue: number }) => void;
  isLoading: boolean;
  closeDialog?: () => void;
  initialData?: {
    name: string;
    kgValue: number;
  };
}

export default function WeightUnitForm({
  onSubmit,
  isLoading,
  closeDialog,
  initialData,
}: WeightUnitFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    kgValue: 0,
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: field === "kgValue" ? parseFloat(value as string) : value,
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
        placeholder="Nombre de la Unidad de Peso"
        label="Nombre"
        required
      />
      <Input
        type="number"
        value={formData.kgValue}
        onChange={(
          e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        ) => handleChange("kgValue", e.target.value)}
        placeholder="Valor Kilogramo"
        label="Valor Kilogramo"
        step={0.1}
        min={0}
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
