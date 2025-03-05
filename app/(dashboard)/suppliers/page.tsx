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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil } from "lucide-react";

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

  const getTypeStyles = (isNational: boolean, isInternational: boolean) => {
    if (isNational && isInternational) {
      return "bg-green-100 text-green-600";
    } else if (isNational) {
      return "bg-blue-100 text-blue-600";
    } else if (isInternational) {
      return "bg-purple-100 text-purple-600";
    }
    return "bg-gray-100 text-gray-600";
  };

  return (
    <div className="flex justify-start w-full h-full flex-col bg-transparent">
      <Header title="Proveedores" description="Lista de suppliers oficiales" />
      <div className="mt-6 px-6">
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="primary"
              className="py-2 px-4 rounded-lg font-semibold text-sm border bg-primary/5 text-primary"
            >
              Agregar Proveedor
            </Button>
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

      <div className="w-full px-6 pb-6 pt-4">
        <div className="w-auto h-auto overflow-hidden rounded-[12px] shadow-sm shadow-cyan-500/20">
          <div className="border rounded-[12px] overflow-auto max-h-[70vh] relative w-full">
            <Table className="w-full">
              <TableHeader>
                <TableRow className="bg-primary/5">
                  <TableHead className="text-primary font-[600] text-center">
                    Nombre
                  </TableHead>
                  <TableHead className="text-primary font-[600] text-center">
                    Email
                  </TableHead>
                  <TableHead className="text-primary font-[600] text-center">
                    Teléfono
                  </TableHead>
                  <TableHead className="text-primary font-[600] text-center">
                    Tipo
                  </TableHead>
                  <TableHead className="text-primary font-[600] text-center">
                    Acciones
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {suppliers.length > 0 ? (
                  suppliers.map((supplier) => (
                    <TableRow
                      key={supplier.id}
                      className="text-sm text-center bg-white/50"
                    >
                      <TableCell className="font-[600] text-black">
                        {supplier.name}
                      </TableCell>
                      <TableCell>{supplier.email}</TableCell>
                      <TableCell>{supplier.phone}</TableCell>
                      <TableCell>
                        <div
                          className={`py-1 px-3 rounded-3xl inline-block ${getTypeStyles(
                            supplier.isNational,
                            supplier.isInternational
                          )}`}
                        >
                          {supplier.isNational && supplier.isInternational
                            ? "Ambas"
                            : supplier.isNational
                            ? "Nacional"
                            : "Internacional"}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-center gap-2">
                          <Button
                            variant="secondary"
                            onClick={() => handleEdit(supplier)}
                          >
                            <Pencil className="w-4 h-4 text-primary" />
                          </Button>
                          <Button
                            variant="secondary"
                            className="p-1 h-auto hover:bg-gray-100"
                            onClick={() => handleViewDetails(supplier)}
                          >
                            Detalles
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow className="h-36">
                    <TableCell
                      colSpan={5}
                      className="text-sm m-auto h-full text-center text-gray-500"
                    >
                      No hay proveedores registrados
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
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
