"use client";

import { useState } from "react";
import Header from "@/app/(dashboard)/components/Header";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Button from "@/components/Button";

interface Proveedor {
  id: number;
  nombre: string;
  tipo: "Nacional" | "Internacional" | "Ambos";
}

export default function Proveedores() {
  const [proveedores, setProveedores] = useState<Proveedor[]>([
    { id: 1, nombre: "Proveedor A", tipo: "Nacional" },
    { id: 2, nombre: "Proveedor B", tipo: "Internacional" },
    { id: 3, nombre: "Proveedor C", tipo: "Ambos" },
  ]);
  const [nuevoProveedor, setNuevoProveedor] = useState({
    nombre: "",
    tipo: "Nacional" as "Nacional" | "Internacional" | "Ambos",
  });
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProveedores([...proveedores, { id: Date.now(), ...nuevoProveedor }]);
    setNuevoProveedor({ nombre: "", tipo: "Nacional" });
    setDialogOpen(false);
  };

  return (
    <div className="flex justify-start w-full h-full flex-col bg-transparent">
      <Header
        title="Proveedores"
        description="Lista de proveedores oficiales"
      />
      <div className="mt-6 px-6">
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="text-white">Agregar Proveedor</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Agregar Nuevo Proveedor</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="nombre">Nombre</label>
                <Input
                  id="nombre"
                  value={nuevoProveedor.nombre}
                  onChange={(e) =>
                    setNuevoProveedor({
                      ...nuevoProveedor,
                      nombre: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div>
                <label>Tipo</label>
                <RadioGroup
                  value={nuevoProveedor.tipo}
                  onValueChange={(value) =>
                    setNuevoProveedor({
                      ...nuevoProveedor,
                      tipo: value as "Nacional" | "Internacional" | "Ambos",
                    })
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Nacional" id="nacional" />
                    <label htmlFor="nacional">Nacional</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Internacional" id="internacional" />
                    <label htmlFor="internacional">Internacional</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Ambos" id="ambos" />
                    <label htmlFor="ambos">Ambos</label>
                  </div>
                </RadioGroup>
              </div>
              <Button type="submit" className="text-white">
                Guardar
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 px-6">
        {proveedores.map((proveedor) => (
          <div
            key={proveedor.id}
            className="bg-white p-4 rounded-[16px] border border-neutral-200 shadow-sm"
          >
            <h3 className="font-semibold">{proveedor.nombre}</h3>
            <p className="text-sm text-gray-600">{proveedor.tipo}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
