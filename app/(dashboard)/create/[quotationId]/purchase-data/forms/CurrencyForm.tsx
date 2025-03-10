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

  const [errors, setErrors] = useState({
    name: "",
    abbreviation: "",
    dollarValue: "",
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
    // Limpiar el error cuando el usuario comienza a escribir
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateForm = () => {
    const newErrors = { name: "", abbreviation: "", dollarValue: "" };
    let isValid = true;

    if (!formData.name) {
      newErrors.name = "El nombre es requerido";
      isValid = false;
    } else if (formData.name.length < 2) {
      newErrors.name = "El nombre debe tener al menos 2 caracteres";
      isValid = false;
    }

    if (!formData.abbreviation) {
      newErrors.abbreviation = "La abreviación es requerida";
      isValid = false;
    } else if (formData.abbreviation.length !== 3) {
      newErrors.abbreviation =
        "La abreviación debe tener exactamente 3 caracteres";
      isValid = false;
    }

    if (!formData.dollarValue) {
      newErrors.dollarValue = "El valor en dólares es requerido";
      isValid = false;
    } else if (formData.dollarValue <= 0) {
      newErrors.dollarValue = "El valor en dólares debe ser mayor que 0";
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
        placeholder="Nombre de la Moneda"
        label="Nombre"
        error={errors.name}
      />
      <Input
        type="text"
        value={formData.abbreviation}
        onChange={(
          e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        ) => handleChange("abbreviation", e.target.value)}
        placeholder="Abreviación"
        label="Abreviación"
        error={errors.abbreviation}
      />
      <Input
        type="number"
        value={formData.dollarValue}
        onChange={(
          e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        ) => handleChange("dollarValue", e.target.value)}
        placeholder="Valor Dolar"
        label="Valor Dolar"
        step={0.000001}
        min={0}
        error={errors.dollarValue}
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
