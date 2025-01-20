import { useState, useEffect } from "react";
import type { Custom } from "@/app/(dashboard)/create/types";
import Button from "@/components/Button";
import Input from "@/components/Input";

interface CreateCustomProps {
  onCustomCreated: (custom: Custom) => void;
}

export default function CreateCustom({ onCustomCreated }: CreateCustomProps) {
  const [formData, setFormData] = useState<Omit<Custom, "id">>({
    sediLegalizationFee: 50,
    invoiceValueFOB: 0,
    internationalFreightValue: 0,
    taxableBase: 0,
    importDutyRate: 0,
    statisticsRate: 0,
    ivaRate: 0,
    additionalIvaRate: 0,
    incomeTaxRate: 0,
    grossIncomeRate: 0,
    simFee: 10,
    cifValue: 0,
    minimumCustomsDispatchCost: 250,
    customsOperationalCharges: 210,
    optionalElectricalSecurity: 150,
    optionalSenasaFee: 50,
    total: 0,
  });

  const [includeElectricalSecurity, setIncludeElectricalSecurity] =
    useState(false);
  const [includeSenasaFee, setIncludeSenasaFee] = useState(false);

  useEffect(() => {
    const calculateCustoms = () => {
      const taxableBase =
        formData.invoiceValueFOB +
        formData.internationalFreightValue +
        (formData.invoiceValueFOB + formData.internationalFreightValue) * 0.01;

      const statisticsRate = taxableBase * 0.03;
      const ivaBase = formData.importDutyRate + statisticsRate;
      const ivaRate = ivaBase * 0.21;
      const additionalIvaRate = ivaBase * 0.105;
      const incomeTaxRate = taxableBase * 0.06;
      const grossIncomeRate = taxableBase * 0.025;
      const minimumCustomsDispatchCost = Math.max(250, taxableBase * 0.008);

      setFormData((prevData) => ({
        ...prevData,
        taxableBase,
        statisticsRate,
        ivaRate,
        additionalIvaRate,
        incomeTaxRate,
        grossIncomeRate,
        minimumCustomsDispatchCost,
      }));
    };

    calculateCustoms();
  }, [
    formData.invoiceValueFOB,
    formData.internationalFreightValue,
    formData.importDutyRate,
  ]);

  useEffect(() => {
    const calculatedTotal = Object.entries(formData).reduce(
      (sum, [key, value]) => {
        if (
          typeof value === "number" &&
          key !== "optionalElectricalSecurity" &&
          key !== "optionalSenasaFee" &&
          key !== "total"
        ) {
          return sum + value;
        }
        return sum;
      },
      0,
    );

    const optionalTotal =
      (includeElectricalSecurity ? formData.optionalElectricalSecurity : 0) +
      (includeSenasaFee ? formData.optionalSenasaFee : 0);

    const newTotal = calculatedTotal + optionalTotal;

    if (newTotal !== formData.total) {
      setFormData((prevData) => ({
        ...prevData,
        total: newTotal,
      }));
    }
  }, [
    includeElectricalSecurity,
    includeSenasaFee,
    formData.optionalElectricalSecurity,
    formData.optionalSenasaFee,
    formData.sediLegalizationFee,
    formData.invoiceValueFOB,
    formData.internationalFreightValue,
    formData.taxableBase,
    formData.importDutyRate,
    formData.statisticsRate,
    formData.ivaRate,
    formData.additionalIvaRate,
    formData.incomeTaxRate,
    formData.grossIncomeRate,
    formData.simFee,
    formData.cifValue,
    formData.minimumCustomsDispatchCost,
    formData.customsOperationalCharges,
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent event from bubbling up
    const newCustom: Custom = {
      id: Math.random().toString(36).slice(2, 9),
      ...formData,
    };
    onCustomCreated(newCustom);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(formData).map(([key, value]) => (
          <div key={key}>
            <label
              htmlFor={key}
              className="block text-sm font-semibold text-gray-700"
            >
              {key.charAt(0).toUpperCase() +
                key.slice(1).replace(/([A-Z])/g, " $1")}
            </label>
            <Input
              type="number"
              name={key}
              value={value}
              disabled={
                key !== "invoiceValueFOB" &&
                key !== "internationalFreightValue" &&
                key !== "importDutyRate"
              }
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (
                  key === "invoiceValueFOB" ||
                  key === "internationalFreightValue" ||
                  key === "importDutyRate"
                ) {
                  setFormData((prevData) => ({
                    ...prevData,
                    [key]: Number.parseFloat(e.target.value) || 0,
                  }));
                }
              }}
            />
          </div>
        ))}
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="electricalSecurity"
          checked={includeElectricalSecurity}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setIncludeElectricalSecurity(e.target.checked)
          }
        />
        <label htmlFor="electricalSecurity">
          Include Electrical Security (150)
        </label>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="senasaFee"
          checked={includeSenasaFee}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setIncludeSenasaFee(e.target.checked)
          }
        />
        <label htmlFor="senasaFee">Include Senasa Fee (50)</label>
      </div>

      <div className="text-xl font-bold mt-4">
        Total: ${formData.total.toFixed(2)}
      </div>

      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant="secondary"
          onClick={() => onCustomCreated({ id: "", ...formData })}
        >
          Cancelar
        </Button>
        <Button type="submit" className="bg-primary text-white">
          Crear Gasto de Aduana
        </Button>
      </div>
    </form>
  );
}
