"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import Header from "@/app/(dashboard)/components/Header";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Input from "@/components/Input";
import { Checkbox } from "@/components/ui/checkbox";
import Button from "@/components/Button";
import { CatalogService } from "@/services/CatalogService";
import { Supplier } from "@/types/Supplier";

export default function Proveedores() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [newSupplier, setNewSupplier] = useState<Supplier>({
    name: "",
    isNational: false,
    isInternational: false,
    email: "",
    phone: "",
  });
  const [editedSupplier, setEditedSupplier] = useState<Supplier | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [shouldFetch, setShouldFetch] = useState(true); // Nuevo estado

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const fetchedSuppliers = await CatalogService.listSuppliers();
        setSuppliers(fetchedSuppliers);
        setShouldFetch(false);
      } catch (error) {
        console.error("Error fetching quotation items:", error);
      }
    };

    if (shouldFetch) {
      fetchSuppliers();
    }
  }, [shouldFetch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editedSupplier) {
      try {
        await CatalogService.editSupplier(editedSupplier);
        setShouldFetch(true);
        setEditedSupplier(null);
        setEditDialogOpen(false);
      } catch (error) {
        console.error("Error editing supplier:", error);
        // MOSTRAR ERROR AL USUARIO
      }
    } else {
      try {
        await CatalogService.addSupplier(newSupplier);
        setShouldFetch(true);
        setNewSupplier({
          name: "",
          isNational: false,
          isInternational: false,
          email: "",
          phone: "",
        });
        setDialogOpen(false);
      } catch (error) {
        console.error("Error adding supplier:", error);
        // MOSTRAR ERROR AL USUARIO
      }
    }
  };

  const handleEdit = (supplier: Supplier) => {
    setEditedSupplier(supplier);
    setEditDialogOpen(true);
  };

  return (
    <div className="flex justify-start w-full h-full flex-col bg-transparent">
      <Header title="Proveedores" description="Lista de suppliers oficiales" />
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
              <Input
                label="Nombre"
                id="name"
                value={newSupplier.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNewSupplier({
                    ...newSupplier,
                    name: e.target.value,
                  })
                }
                required
              />
              <Input
                label="Email"
                id="email"
                type="email"
                value={newSupplier.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNewSupplier({
                    ...newSupplier,
                    email: e.target.value,
                  })
                }
                required
              />
              <Input
                label="Teléfono"
                id="phone"
                type="phone"
                value={newSupplier.phone}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNewSupplier({
                    ...newSupplier,
                    phone: e.target.value,
                  })
                }
                required
              />
              <div>
                <label className="block text-sm font-[600] text-gray-700">
                  Tipo
                </label>
                <div className="flex flex-col space-y-2 mt-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="nacional"
                      checked={newSupplier.isNational}
                      onCheckedChange={(checked) =>
                        setNewSupplier({
                          ...newSupplier,
                          isNational: checked as boolean,
                        })
                      }
                    />
                    <label htmlFor="nacional">Nacional</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="internacional"
                      checked={newSupplier.isInternational}
                      onCheckedChange={(checked) =>
                        setNewSupplier({
                          ...newSupplier,
                          isInternational: checked as boolean,
                        })
                      }
                    />
                    <label htmlFor="internacional">Internacional</label>
                  </div>
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
        {suppliers.map((supplier) => (
          <div
            key={supplier.id}
            className="bg-white p-4 rounded-[16px] border border-neutral-200 shadow-sm"
          >
            <h3 className="font-semibold">{supplier.name}</h3>
            <p className="text-sm text-gray-600">
              {supplier.isNational && supplier.isInternational
                ? "Nacional e Internacional"
                : supplier.isNational
                  ? "Nacional"
                  : "Internacional"}
            </p>
            <p className="text-sm text-gray-600">{supplier.email}</p>
            <p className="text-sm text-gray-600">{supplier.phone}</p>
            <div className="flex justify-end w-full gap-2 mt-2">
              <Button variant="secondary" onClick={() => handleEdit(supplier)}>
                Editar
              </Button>
              <Button variant="primary" className="text-white">
                Detalles
              </Button>
            </div>
          </div>
        ))}
      </div>
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Supplier</DialogTitle>
          </DialogHeader>
          {editedSupplier && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Nombre"
                id="edit-name"
                value={editedSupplier.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEditedSupplier({
                    ...editedSupplier,
                    name: e.target.value,
                  })
                }
                required
              />
              <Input
                label="Email"
                id="edit-email"
                type="email"
                value={editedSupplier.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEditedSupplier({
                    ...editedSupplier,
                    email: e.target.value,
                  })
                }
                required
              />
              <Input
                label="Teléfono"
                id="edit-phone"
                type="phone"
                value={editedSupplier.phone}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEditedSupplier({
                    ...editedSupplier,
                    phone: e.target.value,
                  })
                }
                required
              />
              <div>
                <label className="block text-sm font-[600] text-gray-700">
                  Tipo
                </label>
                <div className="flex flex-col space-y-2 mt-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="edit-nacional"
                      checked={editedSupplier.isNational}
                      onCheckedChange={(checked) =>
                        setEditedSupplier({
                          ...editedSupplier,
                          isNational: checked as boolean,
                        })
                      }
                    />
                    <label htmlFor="edit-nacional">Nacional</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="edit-internacional"
                      checked={editedSupplier.isInternational}
                      onCheckedChange={(checked) =>
                        setEditedSupplier({
                          ...editedSupplier,
                          isInternational: checked as boolean,
                        })
                      }
                    />
                    <label htmlFor="edit-internacional">Internacional</label>
                  </div>
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
