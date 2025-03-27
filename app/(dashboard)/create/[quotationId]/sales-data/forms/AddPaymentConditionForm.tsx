import { useState } from "react";
import Button from "@/components/Button";
import Dropdown from "@/components/Dropdown";
import { CatalogService } from "@/services/CatalogService";
import { adaptToDropdown } from "@/app/adapters/adaptToDropdown";

interface AddPaymentConditionProps {
  onPaymentConditionCreated: (
    paymentConditionId: number,
    paymentCondition: string,
  ) => void;
  onCancel: () => void;
}

export default function AddPaymentConditionForm({
  onPaymentConditionCreated,
  onCancel,
}: AddPaymentConditionProps) {
  const [selectedPaymentCondition, setSelectedPaymentCondition] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPaymentCondition) {
      onPaymentConditionCreated(
        selectedPaymentCondition.id,
        selectedPaymentCondition.name,
      );
    }
  };

  const fetchPaymentConditions = async () => {
    const paymentConditions = await CatalogService.listPaymentConditions();
    return adaptToDropdown(paymentConditions, "id", "name");
  };

  const handleSelect = (item: { id: number; name: string }) => {
    setSelectedPaymentCondition(item);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-4">
        <Dropdown
          label="Condición de Pago"
          fetchItems={fetchPaymentConditions}
          addItem={CatalogService.addPaymentCondition}
          onSelect={handleSelect}
          required
        />
      </div>
      <div className="flex justify-end gap-2">
        <Button
          type="button"
          onClick={onCancel}
          variant="secondary"
          className="px-4"
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          className="text-sm bg-primary text-white"
          disabled={!selectedPaymentCondition}
        >
          Guardar
        </Button>
      </div>
    </form>
  );
}
