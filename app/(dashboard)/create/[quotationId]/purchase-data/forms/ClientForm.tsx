import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import Button from "@/components/Button";
import { Client } from "@/types/Client";

interface ClientFormProps {
  onSubmit: (data: { name: string }) => void;
  isLoading: boolean;
  initialData?: Client;
  closeDialog: () => void;
}

export default function ClientForm({
  onSubmit,
  isLoading,
  initialData,
  closeDialog,
}: ClientFormProps) {
  const [name, setName] = useState(initialData?.name || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          Nombre
        </label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
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
