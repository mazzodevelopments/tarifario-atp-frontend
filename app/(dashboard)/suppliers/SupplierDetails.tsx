import React, { useCallback, useState } from "react";
import { Supplier } from "@/types/Supplier";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Button from "@/components/Button";
import { CatalogService } from "@/services/CatalogService";
import { adaptToDropdown } from "@/app/adapters/adaptToDropdown";
import Dropdown from "@/components/Dropdown";

interface SupplierDetailsProps {
  supplier: Supplier;
  onClose: () => void;
  onFamilyAdded: () => void;
}

export default function SupplierDetails({
  supplier,
  onClose,
  onFamilyAdded,
}: SupplierDetailsProps) {
  const [selectedFamily, setSelectedFamily] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const fetchFamilies = useCallback(async () => {
    const families = await CatalogService.listFamilies();
    return adaptToDropdown(families, "id", "name");
  }, []);

  const handleSelectFamily = (item: { id: number; name: string }) => {
    setSelectedFamily(item);
  };

  const handleAddFamily = async () => {
    if (selectedFamily) {
      const existingFamilyIds = supplier.families!.map((family) =>
        Number(family.id),
      );
      const updatedFamilyIds = [...existingFamilyIds, selectedFamily.id];

      const editedSupplier = {
        id: supplier.id,
        familyIds: updatedFamilyIds,
      };

      await CatalogService.editSupplier(editedSupplier);

      setSelectedFamily(null);
      onFamilyAdded();
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Detalles del Proveedor</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
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
          <div className="mt-4">
            <h4 className="font-semibold">Familias que provee:</h4>
            <ul className="list-disc list-inside">
              {supplier.families!.map((family) => (
                <li key={family.id} className="text-sm text-gray-600">
                  {family.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full mt-4">
            <h4 className="font-semibold">Agregar Familia:</h4>
            <div className="flex w-full gap-2 justify-between">
              <div className="w-full">
                <Dropdown
                  value={selectedFamily ? selectedFamily.name : ""}
                  fetchItems={fetchFamilies}
                  addItem={CatalogService.addFamily}
                  onSelect={handleSelectFamily}
                  required
                />
              </div>
              <Button
                variant="primary"
                onClick={handleAddFamily}
                className="text-white"
              >
                Agregar
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
