import { useState } from "react";
import Button from "@/components/Button";
import Dropdown from "@/components/Dropdown";
import { SalesDataService } from "@/services/SalesDataService";

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

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-4">
        <Dropdown
          label="Condición de Pago"
          fetchItems={SalesDataService.fetchPaymentConditions}
          addItem={SalesDataService.addPaymentCondition}
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
