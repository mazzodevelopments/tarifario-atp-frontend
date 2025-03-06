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

  const [errors, setErrors] = useState({
    name: "",
    kgValue: "",
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
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateForm = () => {
    const newErrors = { name: "", kgValue: "" };
    let isValid = true;

    if (!formData.name) {
      newErrors.name = "El nombre es requerido";
      isValid = false;
    } else if (formData.name.length < 2) {
      newErrors.name = "El nombre debe tener al menos 2 caracteres";
      isValid = false;
    }

    if (!formData.kgValue) {
      newErrors.kgValue = "El valor en kilogramos es requerido";
      isValid = false;
    } else if (formData.kgValue <= 0) {
      newErrors.kgValue = "El valor en kilogramos debe ser mayor que 0";
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
        error={errors.name}
      />
      <Input
        type="number"
        value={formData.kgValue}
        onChange={(
          e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        ) => handleChange("kgValue", e.target.value)}
        placeholder="Valor Kilogramo"
        label="Valor Kilogramo"
        error={errors.kgValue}
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
