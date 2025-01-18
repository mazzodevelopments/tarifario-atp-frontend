"use client";

import { useState } from "react";
import { Custom } from "@/app/(dashboard)/create/types";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { DialogClose } from "@/components/ui/dialog";

interface CreateCustomProps {
  onCustomCreated: (custom: Custom) => void;
}

export default function CreateCustom({ onCustomCreated }: CreateCustomProps) {
  const [formData, setFormData] = useState<Omit<Custom, "id">>({
    oficializacionSedi: 0,
    gastosDespachosAduanero: 0,
    gastosOperativos: 0,
    seguridadElectrica: 0,
    senasa: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCustom: Custom = {
      id: Math.random().toString(36).slice(2, 9),
      ...formData,
    };
    onCustomCreated(newCustom);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? parseFloat(value) || 0 : value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="oficializacionSedi"
            className="block text-sm font-semibold text-gray-700"
          >
            Oficialización SEDI
          </label>
          <Input
            type="number"
            name="oficializacionSedi"
            value={formData.oficializacionSedi}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
          />
        </div>

        <div>
          <label
            htmlFor="gastosDespachosAduanero"
            className="block text-sm font-semibold text-gray-700"
          >
            Gastos Despachos Aduanero
          </label>
          <Input
            type="number"
            name="gastosDespachosAduanero"
            value={formData.gastosDespachosAduanero}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
          />
        </div>

        <div>
          <label
            htmlFor="gastosOperativos"
            className="block text-sm font-semibold text-gray-700"
          >
            Gastos Operativos
          </label>
          <Input
            type="number"
            name="gastosOperativos"
            value={formData.gastosOperativos}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
          />
        </div>

        <div>
          <label
            htmlFor="seguridadElectrica"
            className="block text-sm font-semibold text-gray-700"
          >
            Seguridad Eléctrica
          </label>
          <Input
            type="number"
            name="seguridadElectrica"
            value={formData.seguridadElectrica}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
          />
        </div>

        <div>
          <label
            htmlFor="senasa"
            className="block text-sm font-semibold text-gray-700"
          >
            SENASA
          </label>
          <Input
            type="number"
            name="senasa"
            value={formData.senasa}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
          />
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <DialogClose asChild>
          <Button type="button" variant="secondary" className="text-sm">
            Cancelar
          </Button>
        </DialogClose>
        <DialogClose asChild>
          <Button type="submit" className="text-sm bg-primary text-white">
            Crear Gasto de Aduana
          </Button>
        </DialogClose>
      </div>
    </form>
  );
}
