import React, { useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { Client } from "@/types/Client";

interface ClientFormProps {
  onSubmit: (data: { name: string }) => void;
  isLoading: boolean;
  initialData?: Client;
  closeDialog?: () => void;
}

export default function ClientForm({
  onSubmit,
  isLoading,
  initialData,
  closeDialog,
}: ClientFormProps) {
  const [name, setName] = useState(initialData?.name || "");
  const [error, setError] = useState("");

  const validateForm = () => {
    if (!name.trim()) {
      setError("El nombre es requerido");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!validateForm()) {
      return;
    }

    onSubmit({ name });
    closeDialog?.();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input
          label="Nombre"
          id="name"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setName(e.target.value);
            setError("");
          }}
          error={error}
        />
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="secondary" onClick={closeDialog}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isLoading} className="px-2 text-white">
          {isLoading ? "Guardando..." : "Guardar"}
        </Button>
      </div>
    </form>
  );
}
