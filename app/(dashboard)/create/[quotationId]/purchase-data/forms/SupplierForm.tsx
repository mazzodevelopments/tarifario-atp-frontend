import React, { useState, useEffect } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import parsePhoneNumberFromString from "libphonenumber-js";

interface SupplierFormProps {
  onSubmit: (data: {
    name: string;
    email: string;
    phone: string;
    isNational: boolean;
    isInternational: boolean;
  }) => void;
  isLoading: boolean;
  closeDialog?: () => void;
  initialData?: {
    name: string;
    email: string;
    phone: string;
    isNational: boolean;
    isInternational: boolean;
  };
}

export default function SupplierForm({
  onSubmit,
  isLoading,
  closeDialog,
  initialData,
}: SupplierFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    isNational: false,
    isInternational: false,
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateForm = () => {
    const newErrors = { name: "", email: "", phone: "" };
    let isValid = true;

    if (!formData.name) {
      newErrors.name = "El nombre es requerido";
      isValid = false;
    }

    if (!formData.email) {
      newErrors.email = "El email es requerido";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "El email no es válido";
      isValid = false;
    }

    if (!formData.phone) {
      newErrors.phone = "El teléfono es requerido";
      isValid = false;
    } else {
      const phoneNumber = parsePhoneNumberFromString(formData.phone);
      if (!phoneNumber || !phoneNumber.isValid()) {
        newErrors.phone =
          "El teléfono debe ser válido e incluir un código de región (ej: +52)";
        isValid = false;
      }
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
        placeholder="Nombre del proveedor"
        label="Nombre"
        error={errors.name}
      />
      <Input
        type="email"
        value={formData.email}
        onChange={(
          e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        ) => handleChange("email", e.target.value)}
        placeholder="Email"
        label="Email"
        error={errors.email}
      />
      <Input
        type="phone"
        value={formData.phone}
        onChange={(
          e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        ) => handleChange("phone", e.target.value)}
        placeholder="Teléfono"
        label="Teléfono"
        error={errors.phone}
      />
      <div className="flex flex-col space-y-2">
        <label className="block text-sm font-[600] text-gray-700">Tipo</label>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="isNational"
            checked={formData.isNational}
            onChange={(e) => handleChange("isNational", e.target.checked)}
          />
          <label htmlFor="isNational">Nacional</label>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="isInternational"
            checked={formData.isInternational}
            onChange={(e) => handleChange("isInternational", e.target.checked)}
          />
          <label htmlFor="isInternational">Internacional</label>
        </div>
      </div>

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
