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
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Button from "@/components/Button";
import { CatalogService } from "@/services/CatalogService";
import { Supplier } from "@/types/Supplier";

export default function Proveedores() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [newSupplier, setNewSupplier] = useState<Supplier>({
    id: 0,
    name: "",
    isNational: false,
    isInternational: false,
    email: "",
    phone: "",
  });
  const [editedSupplier, setEditedSupplier] = useState<Supplier | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const fetchedSuppliers = await CatalogService.listSuppliers();
        setSuppliers(fetchedSuppliers);
      } catch (error) {
        console.error("Error fetching quotation items:", error);
      }
    };

    fetchSuppliers();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editedSupplier) {
      setSuppliers(
        suppliers.map((p) =>
          p.id === editedSupplier.id ? { ...editedSupplier } : p,
        ),
      );
      setEditedSupplier(null);
      setEditDialogOpen(false);
    } else {
      console.log(newSupplier);
      setSuppliers([...suppliers, { ...newSupplier, id: Date.now() }]);
      setNewSupplier({
        id: 0,
        name: "",
        isNational: false,
        isInternational: false,
        email: "",
        phone: "",
      });
      setDialogOpen(false);
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
            <Button className="text-white">Agregar Supplier</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Agregar Nuevo Supplier</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name">Nombre</label>
                <Input
                  id="name"
                  value={newSupplier.name}
                  onChange={(e) =>
                    setNewSupplier({
                      ...newSupplier,
                      name: e.target.value,
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
                  value={newSupplier.email}
                  onChange={(e) =>
                    setNewSupplier({
                      ...newSupplier,
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
                  value={newSupplier.phone}
                  onChange={(e) =>
                    setNewSupplier({
                      ...newSupplier,
                      phone: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div>
                <label>Tipo</label>
                <div className="flex flex-col space-y-2">
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
              {supplier.isNational ? "Nacional" : ""}{" "}
              {supplier.isInternational ? "Internacional" : ""}
            </p>
            <p className="text-sm text-gray-600">{supplier.email}</p>
            <p className="text-sm text-gray-600">{supplier.phone}</p>
            <div className="flex justify-end w-full gap-2 mt-2">
              <Button variant="secondary" onClick={() => handleEdit(supplier)}>
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
            <DialogTitle>Editar Supplier</DialogTitle>
          </DialogHeader>
          {editedSupplier && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="edit-name">Nombre</label>
                <Input
                  id="edit-name"
                  value={editedSupplier.name}
                  onChange={(e) =>
                    setEditedSupplier({
                      ...editedSupplier,
                      name: e.target.value,
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
                  value={editedSupplier.email}
                  onChange={(e) =>
                    setEditedSupplier({
                      ...editedSupplier,
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
                  value={editedSupplier.phone}
                  onChange={(e) =>
                    setEditedSupplier({
                      ...editedSupplier,
                      phone: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div>
                <label>Tipo</label>
                <div className="flex flex-col space-y-2">
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
