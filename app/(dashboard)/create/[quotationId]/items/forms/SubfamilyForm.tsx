"use client";

import React, { useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";

interface SubfamilyFormProps {
  onSubmit: (data: { name: string; identifier: string }) => void;
  isLoading: boolean;
  closeDialog?: () => void;
}

export default function SubfamilyForm({
  onSubmit,
  isLoading,
  closeDialog,
}: SubfamilyFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    identifier: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    identifier: "",
  });

  const handleIdentifierChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const filteredValue = value
      .replace(/[^a-zA-Z]/g, "")
      .toUpperCase()
      .slice(0, 2);
    setFormData((prev) => ({ ...prev, identifier: filteredValue }));
    setErrors((prev) => ({ ...prev, identifier: "" }));
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, name: value }));
    setErrors((prev) => ({ ...prev, name: "" }));
  };

  const validateForm = () => {
    const newErrors = { name: "", identifier: "" };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "El nombre de la subfamilia es requerido";
      isValid = false;
    }

    if (!formData.identifier.trim()) {
      newErrors.identifier = "El identificador es requerido";
      isValid = false;
    } else if (formData.identifier.length > 2) {
      newErrors.identifier = "Máximo 2 caracteres";
      isValid = false;
    } else if (!/^[A-Z]+$/.test(formData.identifier)) {
      newErrors.identifier = "Solo letras mayúsculas (A-Z)";
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
      return result;
    } catch (error) {
      console.error("Error submitting subfamily form:", error);
      throw error;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <Input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleNameChange}
        placeholder="Nombre de la subfamilia"
        label="Nombre"
        error={errors.name}
      />

      <Input
        type="text"
        name="identifier"
        value={formData.identifier}
        onChange={handleIdentifierChange}
        placeholder="Identificador (1-2 letras mayúsculas)"
        label="Identificador"
        error={errors.identifier}
        maxLength={2}
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
