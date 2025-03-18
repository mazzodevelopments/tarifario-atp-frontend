import React, { useCallback, useState } from "react";
import Button from "@/components/Button";
import Dropdown, { type DropdownItem } from "@/components/Dropdown";
import { adaptToDropdown } from "@/app/adapters/adaptToDropdown";
import { CatalogService } from "@/services/CatalogService";
import type { Item } from "@/types/Item";

interface FamilyFormProps {
  onSubmit: (data: { id: number; name: string }) => void;
  isLoading: boolean;
  closeDialog?: () => void;
}

interface CreateFamilyForm {
  familyId: number | null;
  family: string;
}

export default function FamilyForm({
  onSubmit,
  isLoading,
  closeDialog,
}: FamilyFormProps) {
  const [formData, setFormData] = useState<CreateFamilyForm>({
    family: "",
    familyId: null,
  });

  const [errors, setErrors] = useState({
    family: "",
  });

  const handleSelect = (field: keyof Item) => (item: DropdownItem) => {
    setFormData({ familyId: item.id, family: item.name });
    setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
  };

  const validateForm = () => {
    const newErrors = {
      family: "",
    };
    let isValid = true;

    if (!formData.familyId) {
      newErrors.family = "La familia es requerida";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!validateForm()) {
      return;
    }

    const family = {
      id: formData.familyId!,
      name: formData.family,
    };
    await onSubmit(family);
    closeDialog?.();
  };

  const fetchFamilies = useCallback(async () => {
    const families = await CatalogService.listFamilies();
    return adaptToDropdown(families, "id", "name");
  }, []);

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <Dropdown
        value={formData.family}
        fetchItems={fetchFamilies}
        addItem={CatalogService.addFamily}
        onSelect={handleSelect("family")}
        label="Familia"
        error={errors.family}
      />

      <div className="flex justify-end gap-2 mt-4">
        <Button
          type="submit"
          variant="primary"
          className="px-2 text-white"
          disabled={isLoading}
        >
          {isLoading ? "Agregando..." : "Agregar"}
        </Button>
      </div>
    </form>
  );
}
