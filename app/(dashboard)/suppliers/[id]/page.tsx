"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { CatalogService } from "@/services/CatalogService";
import { AlertTriangle, Trash } from "lucide-react";
import FamilyForm from "@/app/(dashboard)/suppliers/forms/FamilyForm";
import Button from "@/components/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import Header from "@/app/(dashboard)/components/Header";
import { Supplier } from "@/types/Supplier";

export default function SupplierDetailsPage() {
  const { id } = useParams();
  const [supplier, setSupplier] = useState<Supplier | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [familyToDelete, setFamilyToDelete] = useState<{
    id: number;
    name: string;
  } | null>(null);
  const [isFamilyFormOpen, setIsFamilyFormOpen] = useState(false);

  useEffect(() => {
    const fetchSupplier = async () => {
      setIsLoading(true);
      try {
        console.log(id);
        const fetchedSupplier = await CatalogService.getSupplierById(
          Number(id),
        );
        setSupplier(fetchedSupplier);
      } catch (error) {
        console.error("Error fetching client:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSupplier();
  }, [id]);

  const handleAddFamily = async (family: { id: number; name: string }) => {
    setIsLoading(true);
    try {
      if (supplier) {
        const updatedFamilies = [
          ...(supplier.families || []),
          { id: family.id, name: family.name },
        ];

        const updatedSupplier = {
          ...supplier,
          families: updatedFamilies,
        };

        await CatalogService.editSupplier({
          id: supplier.id,
          familyIds: updatedFamilies.map((family) => family.id),
        });

        setSupplier(updatedSupplier);
        setIsFamilyFormOpen(false);
      }
    } catch (error) {
      console.error("Error agregando familia:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const openDeleteDialog = (family: { id: number; name: string }) => {
    setFamilyToDelete({
      id: Number(family.id),
      name: family.name,
    });
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setFamilyToDelete(null);
  };

  const handleDeleteFamily = async () => {
    if (!familyToDelete) return;

    setIsLoading(true);
    try {
      if (supplier) {
        const existingFamilyIds = supplier.families!.map((family) =>
          Number(family.id),
        );
        const updatedFamilyIds = existingFamilyIds.filter(
          (id) => id !== familyToDelete.id,
        );

        const editedSupplier = {
          id: supplier.id,
          familyIds: updatedFamilyIds,
        };

        await CatalogService.editSupplier(editedSupplier);

        const updatedSupplier = {
          ...supplier,
          families: supplier.families!.filter(
            (family) => Number(family.id) !== familyToDelete.id,
          ),
        };

        setSupplier(updatedSupplier);
        closeDeleteDialog();
      }
    } catch (error) {
      console.error("Error deleting family:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (supplier)
    return (
      <div className="flex justify-start w-full h-full flex-col bg-transparent">
        <Header title="Clients" description="" />
        <div className="flex flex-col mt-6 px-6 gap-1">
          <h2 className="text-xl font-[800]">{supplier.name}</h2>
          <p className="text-sm font-[400] text-gray-600">{supplier.email}</p>
          <p className="text-sm font-[400] text-gray-600">{supplier.phone}</p>
          <div>
            <div
              className={`py-0.5 px-1.5 text-xs rounded-3xl inline-block ${getTypeStyles(
                supplier.isNational,
                supplier.isInternational,
              )}`}
            >
              {supplier.isNational && supplier.isInternational
                ? "Ambas"
                : supplier.isNational
                  ? "Nacional"
                  : "Internacional"}
            </div>
          </div>
        </div>
        <div className="mt-3 px-6">
          <Button
            variant="primary"
            className="py-2 px-4 rounded-lg font-semibold text-sm border bg-primary/5 text-primary"
            onClick={() => setIsFamilyFormOpen(true)}
          >
            Agregar Familias
          </Button>
        </div>

        <div className="w-full px-6 pb-6 pt-4">
          <div className="w-auto h-auto overflow-hidden rounded-[12px] shadow-sm shadow-cyan-500/20">
            <div className="border rounded-[12px] overflow-auto max-h-[70vh] relative w-full">
              <Table className="w-full bg-white">
                <TableHeader>
                  <TableRow className="bg-primary/5">
                    <TableHead className="w-1/2 text-primary font-[600] text-center">
                      Nombre
                    </TableHead>
                    <TableHead className="w-1/2 text-primary font-[600] text-center">
                      Acciones
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {supplier.families!.length > 0 ? (
                    supplier.families!.map((family) => (
                      <TableRow key={family.id} className="text-sm text-center">
                        <TableCell className="font-[600] text-black">
                          {family.name}
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-center gap-2">
                            <Button
                              variant="secondary"
                              onClick={() => openDeleteDialog(family)}
                            >
                              <Trash className="w-4 h-4 text-red-500" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow className="h-36">
                      <TableCell
                        colSpan={3}
                        className="text-sm m-auto h-full text-center text-gray-500"
                      >
                        No hay familias registradas
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>

        {/* BUYER FORM */}
        <Dialog open={isFamilyFormOpen} onOpenChange={setIsFamilyFormOpen}>
          <DialogContent className="max-w-md sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Agregar Comprador</DialogTitle>
            </DialogHeader>
            <FamilyForm onSubmit={handleAddFamily} isLoading={isLoading} />
          </DialogContent>
        </Dialog>

        {/* DELETE DIALOG */}
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-red-100">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <DialogTitle className="text-center">
                Confirmar eliminación
              </DialogTitle>
              <DialogDescription className="text-center">
                ¿Estás seguro de eliminar el comprador{" "}
                <span className="font-medium">{familyToDelete?.name}</span> de
                este proveedor?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex flex-row justify-center gap-2 sm:gap-0 mt-2">
              <Button
                variant="secondary"
                onClick={closeDeleteDialog}
                className="flex-1 sm:flex-none"
                disabled={isLoading}
              >
                Cancelar
              </Button>
              <Button
                variant="primary"
                onClick={handleDeleteFamily}
                className="flex-1 sm:flex-none bg-red-100 text-red-500"
                disabled={isLoading}
              >
                {isLoading ? "Eliminando..." : "Eliminar"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
}

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
