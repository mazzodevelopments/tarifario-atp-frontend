import { useState } from "react";
import Button from "@/components/Button";
import Dropdown, { DropdownItem } from "@/components/Dropdown";

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
    return [
      { id: "1", name: "A Convenir" },
      { id: "2", name: "50% Ant. | 50% Deliv." },
      { id: "3", name: "30% Ant. | 70% Deliv." },
      { id: "4", name: "30% Ant. | 70% 15 días." },
      { id: "5", name: "30% Ant. | 70% 30 días." },
      { id: "6", name: "50% Ant. | 50% 30 días." },
      { id: "7", name: "40% Ant. | 60% 30 días." },
      { id: "8", name: "50% Ant. | 50% 15 días." },
      { id: "9", name: "50% F/F | 50% 30 días." },
      { id: "10", name: "50% Deliv. | 50% 30 días." },
      { id: "11", name: "50% Ant. | 50% Previo despacho" },
      { id: "12", name: "50% Ant. | 50% Previo embarque" },
      { id: "13", name: "50% Aprob. SIRA | 50% Pre-embarque" },
      { id: "14", name: "30% Aprov. SIRA | 70% Deliv." },
      { id: "15", name: "100% Ant. Cheque 30 días" },
      { id: "16", name: "100% Ant." },
      { id: "17", name: "100% Deliv." },
      { id: "18", name: "7 Días F/F" },
      { id: "19", name: "15 días F/F" },
      { id: "20", name: "20 días F/F" },
      { id: "21", name: "30 días F/F" },
      { id: "22", name: "60 días F/F" },
      { id: "23", name: "90 días F/F" },
      { id: "24", name: "Echeck 30 días" },
      { id: "25", name: "Echeck 60 días" },
    ];
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
          variant="primary"
          className="px-4 text-white"
          disabled={!selectedPaymentCondition}
        >
          Guardar
        </Button>
      </div>
    </form>
  );
}
