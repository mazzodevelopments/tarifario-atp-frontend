import React, { useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";

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
}

export default function SupplierForm({
  onSubmit,
  isLoading,
  closeDialog,
}: SupplierFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    isNational: false,
    isInternational: false,
  });

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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
        placeholder="Nombre del proveedor"
        label="Nombre"
        required
      />
      <Input
        type="email"
        value={formData.email}
        onChange={(
          e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        ) => handleChange("email", e.target.value)}
        placeholder="Email"
        label="Email"
        required
      />
      <Input
        type="phone"
        value={formData.phone}
        onChange={(
          e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        ) => handleChange("phone", e.target.value)}
        placeholder="Teléfono"
        label="Teléfono"
        required
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
          {isLoading ? "Agregando..." : "Agregar"}
        </Button>
      </div>
    </form>
  );
}
