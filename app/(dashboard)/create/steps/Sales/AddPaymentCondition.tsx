import { useState } from "react";
import Button from "@/components/Button";
import Dropdown from "@/components/Dropdown";
import { CatalogService } from "@/services/CatalogService";
import { adaptToDropdown } from "@/app/adapters/adaptToDropdown";

interface AddPaymentConditionProps {
  onPaymentConditionCreated: (paymentCondition: string) => void;
  onCancel: () => void;
}

export default function AddPaymentCondition({
  onPaymentConditionCreated,
  onCancel,
}: AddPaymentConditionProps) {
  const [selectedPaymentCondition, setSelectedPaymentCondition] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPaymentCondition) {
      onPaymentConditionCreated(selectedPaymentCondition);
    }
  };

  const fetchPaymentConditions = async () => {
    const paymentConditions = await CatalogService.listPaymentConditions();
    return adaptToDropdown(paymentConditions, "id", "name");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-4">
        <Dropdown
          label="Condición de Pago"
          fetchItems={fetchPaymentConditions}
          addItem={CatalogService.addPaymentCondition}
          onSelect={(item) => setSelectedPaymentCondition(item.name)}
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
