"use client";

import { useCallback, useState } from "react";
import type { Supplier } from "@/types/Supplier";
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
  open: boolean;
}

export default function SupplierDetails({
  supplier,
  onClose,
  onFamilyAdded,
  open,
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
        Number(family.id)
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
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader className="flex flex-col gap-2">
          <div
            className={`inline-flex w-fit px-2 py-1 rounded-full ${
              supplier.isNational && supplier.isInternational
                ? "bg-green-600/10"
                : supplier.isNational
                ? "bg-primary/10"
                : "bg-purple-600/10"
            }`}
          >
            <p
              className={`text-sm font-[600] ${
                supplier.isNational && supplier.isInternational
                  ? "text-green-600"
                  : supplier.isNational
                  ? "text-primary"
                  : "text-purple-600"
              }`}
            >
              {supplier.isNational && supplier.isInternational
                ? "Nacional e Internacional"
                : supplier.isNational
                ? "Nacional"
                : "Internacional"}
            </p>
          </div>
          <DialogTitle className="text-3xl font-[800]">
            {supplier.name}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex gap-1">
            <span className="text-black font-[600]">Email:</span>
            <p className="text-md text-gray-600">{supplier.email}</p>
          </div>
          <div className="flex gap-1">
            <span className="text-black font-[600]">Teléfono:</span>
            <p className="text-md text-gray-600">{supplier.phone}</p>
          </div>{" "}
          <div className="mt-4">
            <h4 className="font-semibold">Familias que provee:</h4>
            <ul className="list-disc list-inside">
              {supplier.families!.map((family) => (
                <div className="flex items-center gap-1" key={family.id}>
                  <div
                    className={`w-[6px] h-[6px] rounded-full ${
                      supplier.isNational && supplier.isInternational
                        ? "bg-green-600"
                        : supplier.isNational
                        ? "bg-primary"
                        : "bg-purple-600"
                    }`}
                  ></div>
                  <li className="text-sm text-gray-600 list-none">
                    {family.name}
                  </li>
                </div>
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
