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

export default function OriginExpensesForm({
  onOriginExpensesCreated,
  onCancel,
  existingExpenses,
}: CreateOriginExpensesProps) {
  const [formData, setFormData] = useState<OriginExpenses>(
    existingExpenses || {
      pickUpValue: 0,
      repackagingValue: 0,
      palletFumigationValue: 0,
      certificatesValue: 0,
      haulageValue: 0,
      customExpenses: [],
      total: 0,
    },
  );

  const [includePickup, setIncludePickup] = useState(
    existingExpenses?.pickUpValue ? existingExpenses.pickUpValue > 0 : false,
  );
  const [includeHaulage, setIncludeHaulage] = useState(
    existingExpenses?.haulageValue ? existingExpenses.haulageValue > 0 : false,
  );
  const [includeCertificates, setIncludeCertificates] = useState(
    existingExpenses?.certificatesValue
      ? existingExpenses.certificatesValue > 0
      : false,
  );
  const [newExpenseName, setNewExpenseName] = useState("");
  const [newExpenseValue, setNewExpenseValue] = useState("");

  useEffect(() => {
    if (includePickup && formData.pickUpValue === 0) {
      setFormData((prev) => ({ ...prev, pickUpValue: 180 }));
    } else if (!includePickup) {
      setFormData((prev) => ({ ...prev, pickUpValue: 0 }));
    }
  }, [includePickup, formData.pickUpValue]);

  useEffect(() => {
    if (includeHaulage && formData.haulageValue === 0) {
      setFormData((prev) => ({ ...prev, haulageValue: 0 }));
    } else if (!includeHaulage) {
      setFormData((prev) => ({ ...prev, haulageValue: 0 }));
    }
  }, [includeHaulage, formData.haulageValue]);

  useEffect(() => {
    if (includeCertificates && formData.certificatesValue === 0) {
      setFormData((prev) => ({ ...prev, certificatesValue: 0 }));
    } else if (!includeCertificates) {
      setFormData((prev) => ({ ...prev, certificatesValue: 0 }));
    }
  }, [includeCertificates, formData.certificatesValue]);

  useEffect(() => {
    const calculateTotal = () => {
      let total = 0;

      total += formData.pickUpValue;
      total += formData.repackagingValue;
      total += formData.palletFumigationValue;
      total += formData.certificatesValue;
      total += formData.haulageValue;

      formData.customExpenses.forEach((expense) => {
        total += expense.value;
      });

      setFormData((prev) => ({ ...prev, total }));
    };

    calculateTotal();
  }, [
    formData.pickUpValue,
    formData.repackagingValue,
    formData.palletFumigationValue,
    formData.certificatesValue,
    formData.haulageValue,
    formData.customExpenses,
  ]);

  const handlePickupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value >= 180 && value <= 650) {
      setFormData((prev) => ({ ...prev, pickUpValue: value }));
    }
  };

  const handleHaulageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value >= 0) {
      setFormData((prev) => ({ ...prev, haulageValue: value }));
    }
  };

  const handleCertificatesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value >= 0) {
      setFormData((prev) => ({ ...prev, certificatesValue: value }));
    }
  };

  const handleRepackagingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      repackagingValue: e.target.checked ? 190 : 0,
    }));
  };

  const handlePalletFumigationChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      palletFumigationValue: e.target.checked ? 250 : 0,
    }));
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
            checked={formData.repackagingValue > 0}
            onChange={handleRepackagingChange}
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
            checked={formData.palletFumigationValue > 0}
            onChange={handlePalletFumigationChange}
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
            value={formData.pickUpValue}
            onChange={handlePickupChange}
            min={180}
            max={650}
            placeholder="USD 180 - 650"
            className="w-40"
          />
        )}
      </div>

      <div className="flex items-center space-x-4">
        <input
          type="checkbox"
          id="haulage"
          checked={includeHaulage}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setIncludeHaulage(e.target.checked)
          }
          className="rounded"
        />
        <label htmlFor="haulage" className="font-[600]">
          Acarreo
        </label>
        {includeHaulage && (
          <Input
            type="number"
            value={formData.haulageValue}
            onChange={handleHaulageChange}
            min={0}
            placeholder="Valor acarreo"
            className="w-40"
          />
        )}
      </div>

      <div className="flex items-center space-x-4">
        <input
          type="checkbox"
          id="certificates"
          checked={includeCertificates}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setIncludeCertificates(e.target.checked)
          }
          className="rounded"
        />
        <label htmlFor="certificates" className="font-[600]">
          Certificados
        </label>
        {includeCertificates && (
          <Input
            type="number"
            value={formData.certificatesValue}
            onChange={handleCertificatesChange}
            min={0}
            placeholder="Valor certificados"
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
            className="bg-primary/5 border border-primary/20 text-primary items-center gap-1"
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
                className="flex justify-between items-center bg-primary/5 p-2 rounded"
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
        Total: USD {formData.total.toFixed(2)}
      </div>

      <div className="flex justify-end gap-2">
        {existingExpenses && (
          <Button type="button" variant="danger" onClick={handleDelete}>
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
