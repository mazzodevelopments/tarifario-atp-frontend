"use client";

import { useCallback, useState, useEffect } from "react";
import type { Supplier } from "@/types/Supplier";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import Button from "@/components/Button";
import { CatalogService } from "@/services/CatalogService";
import { adaptToDropdown } from "@/app/adapters/adaptToDropdown";
import Dropdown from "@/components/Dropdown";
import { AlertTriangle, Trash } from "lucide-react";

interface SupplierDetailsProps {
  supplier: Supplier;
  onClose: () => void;
  onFamilyAdded: () => void;
  open: boolean;
}

export default function SupplierDetails({
  supplier: initialSupplier,
  onClose,
  onFamilyAdded,
  open,
}: SupplierDetailsProps) {
  const [supplier, setSupplier] = useState<Supplier>(initialSupplier);
  const [selectedFamily, setSelectedFamily] = useState<{
    id: number;
    name: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [familyToDelete, setFamilyToDelete] = useState<{
    id: number;
    name: string;
  } | null>(null);

  useEffect(() => {
    setSupplier(initialSupplier);
  }, [initialSupplier]);

  const fetchFamilies = useCallback(async () => {
    const families = await CatalogService.listFamilies();
    return adaptToDropdown(families, "id", "name");
  }, []);

  const handleSelectFamily = (item: { id: number; name: string }) => {
    setSelectedFamily(item);
  };

  const handleAddFamily = async () => {
    if (selectedFamily) {
      setIsLoading(true);
      try {
        const existingFamilyIds = supplier.families!.map((family) =>
          Number(family.id),
        );

        if (existingFamilyIds.includes(selectedFamily.id)) {
          alert("Esta familia ya está asociada a este proveedor");
          setIsLoading(false);
          return;
        }

        const updatedFamilyIds = [...existingFamilyIds, selectedFamily.id];

        const editedSupplier = {
          id: supplier.id,
          familyIds: updatedFamilyIds,
        };

        await CatalogService.editSupplier(editedSupplier);

        const updatedSupplier = {
          ...supplier,
          families: [
            ...(supplier.families || []),
            {
              id: selectedFamily.id.toString(),
              name: selectedFamily.name,
            },
          ],
        };

        setSupplier(updatedSupplier);
        setSelectedFamily(null);

        onFamilyAdded();
      } catch (error) {
        console.error("Error adding family:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const openDeleteDialog = (family: { id: string; name: string }) => {
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

      // Update local state by removing the family
      const updatedSupplier = {
        ...supplier,
        families: supplier.families!.filter(
          (family) => Number(family.id) !== familyToDelete.id,
        ),
      };

      setSupplier(updatedSupplier);

      onFamilyAdded();

      closeDeleteDialog();
    } catch (error) {
      console.error("Error deleting family:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getSupplierTypeColors = () => {
    if (supplier.isNational && supplier.isInternational) {
      return {
        bg: "bg-green-600/10",
        text: "text-green-600",
      };
    } else if (supplier.isNational) {
      return {
        bg: "bg-primary/10",
        text: "text-primary",
      };
    } else {
      return {
        bg: "bg-purple-600/10",
        text: "text-purple-600",
      };
    }
  };

  const colors = getSupplierTypeColors();
  const supplierType =
    supplier.isNational && supplier.isInternational
      ? "Nacional e Internacional"
      : supplier.isNational
        ? "Nacional"
        : "Internacional";

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-md sm:max-w-lg">
          <DialogHeader className="space-y-3 pb-4 border-b">
            <div
              className={`inline-flex w-fit px-3 py-1 rounded-full ${colors.bg}`}
            >
              <p className={`text-sm font-semibold ${colors.text}`}>
                {supplierType}
              </p>
            </div>
            <DialogTitle className="text-2xl font-extrabold tracking-tight">
              {supplier.name}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 mb-1">Email</span>
                <p className="text-sm font-medium">{supplier.email}</p>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 mb-1">Teléfono</span>
                <p className="text-sm font-medium">{supplier.phone}</p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-3 text-sm">
                Familias que provee
              </h4>
              {supplier.families && supplier.families.length > 0 ? (
                <div className="space-y-2">
                  {supplier.families.map((family) => (
                    <div
                      className="flex items-center justify-between h-6"
                      key={family.id}
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-gray-700 mr-1"></div>
                        <span className="text-gray-700 text-sm">
                          {family.name}
                        </span>
                      </div>
                      <button
                        onClick={() => openDeleteDialog(family)}
                        className="text-red-500 hover:text-red-700 text-sm px-2 py-1 rounded hover:bg-red-50 transition-colors"
                        disabled={isLoading}
                        type="button"
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">
                  No hay familias asociadas a este proveedor.
                </p>
              )}
            </div>

            <div className="border-t pt-4">
              <h4 className="font-semibold text-gray-800 mb-2 text-sm">
                Agregar Familia
              </h4>
              <div className="flex gap-3 items-end">
                <div className="flex-1">
                  <Dropdown
                    value={selectedFamily ? selectedFamily.name : ""}
                    fetchItems={fetchFamilies}
                    addItem={CatalogService.addFamily}
                    onSelect={handleSelectFamily}
                    required
                    disabled={isLoading}
                  />
                </div>
                <Button
                  variant="primary"
                  onClick={handleAddFamily}
                  className="px-4 items-center h-10 border bg-primary/5 text-primary"
                  disabled={!selectedFamily || isLoading}
                >
                  {isLoading ? "Agregando..." : "Agregar"}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* DELETE */}
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
              ¿Estás seguro de eliminar la familia{" "}
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
    </>
  );
}
