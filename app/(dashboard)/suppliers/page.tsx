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
import Button from "@/components/Button";
import { CatalogService } from "@/services/CatalogService";
import { Supplier } from "@/types/Supplier";
import SupplierForm from "@/app/(dashboard)/create/[quotationId]/purchase-data/forms/SupplierForm";
import SupplierDetails from "@/app/(dashboard)/suppliers/SupplierDetails";

export default function Proveedores() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [editedSupplier, setEditedSupplier] = useState<Supplier | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(
    null
  );
  const [shouldFetch, setShouldFetch] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const fetchedSuppliers = await CatalogService.listSuppliers();
        setSuppliers(fetchedSuppliers);
        setShouldFetch(false);
      } catch (error) {
        console.error("Error fetching suppliers:", error);
      }
    };

    if (shouldFetch) {
      fetchSuppliers();
    }
  }, [shouldFetch]);

  const handleSubmit = async (data: {
    name: string;
    email: string;
    phone: string;
    isNational: boolean;
    isInternational: boolean;
  }) => {
    setIsLoading(true);
    try {
      if (editedSupplier) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { families, ...supplierData } = editedSupplier;
        await CatalogService.editSupplier({ ...supplierData, ...data });
      } else {
        await CatalogService.addSupplier(data);
      }
      setEditedSupplier(null);
      setEditDialogOpen(false);
      setDialogOpen(false);
    } catch (error) {
      console.error("Error saving supplier:", error);
    } finally {
      setIsLoading(false);
      setShouldFetch(true);
    }
  };

  const handleEdit = (supplier: Supplier) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { families, ...supplierData } = supplier;
    setEditedSupplier(supplierData as Supplier);
    setEditDialogOpen(true);
  };

  const handleViewDetails = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
    setDetailDialogOpen(true);
  };

  const handleFamilyAdded = () => {
    setShouldFetch(true);
  };

  const handleCloseDetails = () => {
    setDetailDialogOpen(false);
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
            <SupplierForm
              onSubmit={handleSubmit}
              isLoading={isLoading}
              closeDialog={() => setDialogOpen(false)}
            />
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
              <Button
                variant="primary"
                className="text-white"
                onClick={() => handleViewDetails(supplier)}
              >
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
          <SupplierForm
            onSubmit={handleSubmit}
            isLoading={isLoading}
            initialData={editedSupplier || undefined}
            closeDialog={() => setEditDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
      {selectedSupplier && (
        <SupplierDetails
          supplier={selectedSupplier}
          onClose={handleCloseDetails}
          onFamilyAdded={handleFamilyAdded}
          open={detailDialogOpen}
        />
      )}
    </div>
  );
}
