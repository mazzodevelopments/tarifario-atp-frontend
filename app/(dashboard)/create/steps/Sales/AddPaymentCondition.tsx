import { useState } from "react";
import Button from "@/components/Button";
import Dropdown, { DropdownItem } from "@/components/Dropdown";
import { PAYMENT_CONDITIONS } from "@/app/(dashboard)/create/data";

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
    return PAYMENT_CONDITIONS;
  };

  const addPaymentCondition = async (name: string): Promise<DropdownItem> => {
    return { id: Math.random().toString(36).substr(2, 9), name };
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-4">
        <Dropdown
          label="Condición de Pago"
          fetchItems={fetchPaymentConditions}
          addItem={addPaymentCondition}
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
