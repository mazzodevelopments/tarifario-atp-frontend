"use client";

import React, { useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";

interface FamilyFormProps {
  onSubmit: (data: { name: string }) => void;
  isLoading: boolean;
  closeDialog?: () => void;
}

export default function FamilyForm({
  onSubmit,
  isLoading,
  closeDialog,
}: FamilyFormProps) {
  const [formData, setFormData] = useState({
    name: "",
  });

  const [errors, setErrors] = useState({
    name: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = { name: "" };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "El nombre de la familia es requerido";
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

    try {
      const result = await onSubmit(formData);
      closeDialog?.();
      return result; // Devuelve el resultado para que Dropdown lo maneje
    } catch (error) {
      console.error("Error submitting family form:", error);
      throw error;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <Input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Nombre de la familia"
        label="Nombre"
        error={errors.name}
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
