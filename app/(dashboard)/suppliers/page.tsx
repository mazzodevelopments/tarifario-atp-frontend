"use client";

import type React from "react";

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
import { X } from "lucide-react";

interface Proveedor {
  id: number;
  nombre: string;
  tipo: "Nacional" | "Internacional" | "Ambos";
  email: string;
  phone: string;
  familias: string[];
}

export default function Proveedores() {
  const [proveedores, setProveedores] = useState<Proveedor[]>([
    {
      id: 1,
      nombre: "Proveedor A",
      tipo: "Nacional",
      email: "proveedora@email.com",
      phone: "1134567890",
      familias: ["Familia 1", "Familia 2"],
    },
    {
      id: 2,
      nombre: "Proveedor B",
      tipo: "Internacional",
      email: "proveedorb@email.com",
      phone: "1187654321",
      familias: ["Familia 3"],
    },
    {
      id: 3,
      nombre: "Proveedor C",
      tipo: "Ambos",
      email: "proveedorc@email.com",
      phone: "1122334455",
      familias: ["Familia 4", "Familia 5", "Familia 6"],
    },
  ]);
  const [nuevoProveedor, setNuevoProveedor] = useState<Proveedor>({
    id: 0,
    nombre: "",
    tipo: "Nacional",
    email: "",
    phone: "",
    familias: [],
  });
  const [proveedorEditando, setProveedorEditando] = useState<Proveedor | null>(
    null
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentFamilia, setCurrentFamilia] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (proveedorEditando) {
      setProveedores(
        proveedores.map((p) =>
          p.id === proveedorEditando.id ? { ...proveedorEditando } : p
        )
      );
      setProveedorEditando(null);
      setEditDialogOpen(false);
    } else {
      setProveedores([...proveedores, { ...nuevoProveedor, id: Date.now() }]);
      setNuevoProveedor({
        id: 0,
        nombre: "",
        tipo: "Nacional",
        email: "",
        phone: "",
        familias: [],
      });
      setDialogOpen(false);
    }
  };

  const handleEdit = (proveedor: Proveedor) => {
    setProveedorEditando(proveedor);
    setEditDialogOpen(true);
  };

  const addFamilia = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentFamilia.trim() !== "") {
      if (proveedorEditando) {
        setProveedorEditando({
          ...proveedorEditando,
          familias: [...proveedorEditando.familias, currentFamilia.trim()],
        });
      } else {
        setNuevoProveedor({
          ...nuevoProveedor,
          familias: [...nuevoProveedor.familias, currentFamilia.trim()],
        });
      }
      setCurrentFamilia("");
    }
  };

  const removeFamilia = (index: number) => {
    if (proveedorEditando) {
      setProveedorEditando({
        ...proveedorEditando,
        familias: proveedorEditando.familias.filter((_, i) => i !== index),
      });
    } else {
      setNuevoProveedor({
        ...nuevoProveedor,
        familias: nuevoProveedor.familias.filter((_, i) => i !== index),
      });
    }
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
                <label htmlFor="email">Email</label>
                <Input
                  id="email"
                  type="email"
                  value={nuevoProveedor.email}
                  onChange={(e) =>
                    setNuevoProveedor({
                      ...nuevoProveedor,
                      email: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div>
                <label htmlFor="phone">Teléfono</label>
                <Input
                  id="phone"
                  type="tel"
                  value={nuevoProveedor.phone}
                  onChange={(e) =>
                    setNuevoProveedor({
                      ...nuevoProveedor,
                      phone: e.target.value,
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
              <div>
                <label htmlFor="familia">Familias de Items</label>
                <div className="flex space-x-2">
                  <Input
                    id="familia"
                    value={currentFamilia}
                    onChange={(e) => setCurrentFamilia(e.target.value)}
                    placeholder="Agregar familia de items"
                  />
                  <Button
                    className="flex px-3 justify-center items-center text-white"
                    type="button"
                    onClick={addFamilia}
                  >
                    Agregar
                  </Button>
                </div>
                <div className="mt-2 space-y-2">
                  {nuevoProveedor.familias.map((familia, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-gray-100 p-2 rounded"
                    >
                      <span>{familia}</span>
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => removeFamilia(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-2">
                <label htmlFor="pais">Familias de Items</label>
                <div className="flex space-x-2">
                  <Input
                    id="familia"
                    value={currentFamilia}
                    onChange={(e) => setCurrentFamilia(e.target.value)}
                    placeholder="Agregar familia de items"
                  />
                  <Button
                    className="flex px-3 justify-center items-center text-white"
                    type="button"
                    onClick={addFamilia}
                  >
                    Agregar
                  </Button>
                </div>
                <div className="mt-2 space-y-2">
                  {nuevoProveedor.familias.map((familia, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-gray-100 p-2 rounded"
                    >
                      <span>{familia}</span>
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => removeFamilia(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
              <Button type="submit" className="text-white">
                Guardar
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 px-6">
        {proveedores.map((proveedor) => (
          <div
            key={proveedor.id}
            className="bg-white p-4 rounded-[16px] border border-neutral-200 shadow-sm"
          >
            <h3 className="font-semibold">{proveedor.nombre}</h3>
            <p className="text-sm text-gray-600">{proveedor.tipo}</p>
            <p className="text-sm text-gray-600">{proveedor.email}</p>
            <p className="text-sm text-gray-600">{proveedor.phone}</p>
            <div className="mt-2">
              <p className="text-sm font-semibold">Familias de Items:</p>
              <ul className="text-sm text-gray-600 list-disc list-inside">
                {proveedor.familias.map((familia, index) => (
                  <li key={index}>{familia}</li>
                ))}
              </ul>
            </div>
            <div className="flex justify-end w-full gap-2 mt-2">
              <Button variant="secondary" onClick={() => handleEdit(proveedor)}>
                Editar
              </Button>
              <Button variant="primary" className="text-white">
                Cotizaciones
              </Button>
            </div>
          </div>
        ))}
      </div>
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Proveedor</DialogTitle>
          </DialogHeader>
          {proveedorEditando && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="edit-nombre">Nombre</label>
                <Input
                  id="edit-nombre"
                  value={proveedorEditando.nombre}
                  onChange={(e) =>
                    setProveedorEditando({
                      ...proveedorEditando,
                      nombre: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div>
                <label htmlFor="edit-email">Email</label>
                <Input
                  id="edit-email"
                  type="email"
                  value={proveedorEditando.email}
                  onChange={(e) =>
                    setProveedorEditando({
                      ...proveedorEditando,
                      email: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div>
                <label htmlFor="edit-phone">Teléfono</label>
                <Input
                  id="edit-phone"
                  type="tel"
                  value={proveedorEditando.phone}
                  onChange={(e) =>
                    setProveedorEditando({
                      ...proveedorEditando,
                      phone: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div>
                <label>Tipo</label>
                <RadioGroup
                  value={proveedorEditando.tipo}
                  onValueChange={(value) =>
                    setProveedorEditando({
                      ...proveedorEditando,
                      tipo: value as "Nacional" | "Internacional" | "Ambos",
                    })
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Nacional" id="edit-nacional" />
                    <label htmlFor="edit-nacional">Nacional</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="Internacional"
                      id="edit-internacional"
                    />
                    <label htmlFor="edit-internacional">Internacional</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Ambos" id="edit-ambos" />
                    <label htmlFor="edit-ambos">Ambos</label>
                  </div>
                </RadioGroup>
              </div>
              <div>
                <label htmlFor="edit-familia">Familias de Items</label>
                <div className="flex space-x-2">
                  <Input
                    id="edit-familia"
                    value={currentFamilia}
                    onChange={(e) => setCurrentFamilia(e.target.value)}
                    placeholder="Agregar familia de items"
                  />
                  <Button type="button" onClick={addFamilia}>
                    Agregar
                  </Button>
                </div>
                <div className="mt-2 space-y-2">
                  {proveedorEditando.familias.map((familia, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-gray-100 p-2 rounded"
                    >
                      <span>{familia}</span>
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => removeFamilia(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
              <Button type="submit" className="text-white">
                Guardar Cambios
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
