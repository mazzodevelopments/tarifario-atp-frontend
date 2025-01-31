import type React from "react";
import { useState, useEffect } from "react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import type { OriginExpenses } from "@/types/OriginExpenses";

interface CreateOriginExpensesProps {
  onOriginExpensesCreated: (expenses: OriginExpenses | null) => void;
  onCancel: () => void;
  existingExpenses?: OriginExpenses | null;
}

export default function CreateOriginExpenses({
  onOriginExpensesCreated,
  onCancel,
  existingExpenses,
}: CreateOriginExpensesProps) {
  const [formData, setFormData] = useState<OriginExpenses>(
    existingExpenses || {
      pickup: 180,
      repackaging: false,
      palletFumigation: false,
      customExpenses: [],
      total: 0,
    },
  );

  const [includePickup, setIncludePickup] = useState(
    existingExpenses?.pickup ? true : false,
  );
  const [newExpenseName, setNewExpenseName] = useState("");
  const [newExpenseValue, setNewExpenseValue] = useState("");

  useEffect(() => {
    const calculateTotal = () => {
      let total = 0;

      if (includePickup) {
        total += formData.pickup;
      }
      if (formData.repackaging) {
        total += 190;
      }
      if (formData.palletFumigation) {
        total += 250;
      }

      formData.customExpenses.forEach((expense) => {
        total += expense.value;
      });

      setFormData((prev) => ({ ...prev, total }));
    };

    calculateTotal();
  }, [
    formData.pickup,
    formData.repackaging,
    formData.palletFumigation,
    formData.customExpenses,
    includePickup,
  ]);

  const handlePickupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value >= 180 && value <= 650) {
      setFormData((prev) => ({ ...prev, pickup: value }));
    }
  };

  const addCustomExpense = () => {
    if (newExpenseName && newExpenseValue) {
      const value = Number(newExpenseValue);
      if (!isNaN(value) && value > 0) {
        setFormData((prev) => ({
          ...prev,
          customExpenses: [
            ...prev.customExpenses,
            { name: newExpenseName, value },
          ],
        }));
        setNewExpenseName("");
        setNewExpenseValue("");
      }
    }
  };

  const removeCustomExpense = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      customExpenses: prev.customExpenses.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOriginExpensesCreated(formData);
  };

  const handleDelete = () => {
    onOriginExpensesCreated(null);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <input
            type="checkbox"
            id="repackaging"
            checked={formData.repackaging}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormData((prev) => ({
                ...prev,
                repackaging: e.target.checked,
              }))
            }
            className="rounded"
          />
          <label htmlFor="repackaging" className="font-[600]">
            Reembalaje (USD 190)
          </label>
        </div>

        <div className="flex items-center space-x-4">
          <input
            type="checkbox"
            id="palletFumigation"
            checked={formData.palletFumigation}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormData((prev) => ({
                ...prev,
                palletFumigation: e.target.checked,
              }))
            }
            className="rounded"
          />
          <label htmlFor="palletFumigation" className="font-[600]">
            Fumigación Pallet (USD 250)
          </label>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <input
          type="checkbox"
          id="pickup"
          checked={includePickup}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setIncludePickup(e.target.checked)
          }
          className="rounded"
        />
        <label htmlFor="pickup" className="font-[600]">
          PickUp (USD 180 - 650)
        </label>
        {includePickup && (
          <Input
            type="number"
            value={formData.pickup}
            onChange={handlePickupChange}
            min={180}
            max={650}
            placeholder="USD 180 - 650"
            className="w-40"
          />
        )}
      </div>

      <div className="border-t pt-4 mt-4">
        <h3 className="font-[600] mb-2">Gastos Personalizados</h3>
        <div className="flex gap-2 mb-4">
          <Input
            type="text"
            value={newExpenseName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNewExpenseName(e.target.value)
            }
            placeholder="Nombre del gasto"
            className="flex-1"
          />
          <Input
            type="number"
            value={newExpenseValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNewExpenseValue(e.target.value)
            }
            placeholder="Valor (USD)"
            className="w-40"
          />
          <Button
            type="button"
            onClick={addCustomExpense}
            variant="secondary"
            disabled={!newExpenseName || !newExpenseValue}
          >
            Agregar
          </Button>
        </div>

        {formData.customExpenses.length > 0 && (
          <div className="space-y-2">
            {formData.customExpenses.map((expense, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-gray-50 p-2 rounded"
              >
                <span>{expense.name}</span>
                <div className="flex items-center gap-2">
                  <span className="font-[600]">USD {expense.value}</span>
                  <button
                    type="button"
                    onClick={() => removeCustomExpense(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="text-xl font-bold mt-4">
        Total: {formData.total.toFixed(2)}
      </div>

      <div className="flex justify-end gap-2">
        {existingExpenses && (
          <Button
            type="button"
            className="bg-red-100 text-red-500"
            onClick={handleDelete}
          >
            Eliminar
          </Button>
        )}
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button
          type="submit"
          className="bg-primary text-white"
          disabled={formData.total === 0}
        >
          {existingExpenses ? "Actualizar" : "Guardar"}
        </Button>
      </div>
    </form>
  );
}
