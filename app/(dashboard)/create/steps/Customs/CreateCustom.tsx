"use client";

import { useState, useEffect } from "react";
import { Custom } from "@/app/(dashboard)/create/types";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { DialogClose } from "@/components/ui/dialog";

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
  });

  const [includeElectricalSecurity, setIncludeElectricalSecurity] =
    useState(false);
  const [includeSenasaFee, setIncludeSenasaFee] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const calculateCustoms = () => {
      // BASE IMPONIBLE === CIF
      const taxableBase =
        formData.invoiceValueFOB +
        formData.internationalFreightValue +
        (formData.invoiceValueFOB + formData.internationalFreightValue) * 0.01;

      // ESTADISTICA
      const statisticsRate = taxableBase * 0.03;

      // IVA
      const ivaBase = formData.importDutyRate + statisticsRate;
      const ivaRate = ivaBase * 0.21;
      const additionalIvaRate = ivaBase * 0.105;

      // GANANCIAS E INGRESOS BRUTOS
      const incomeTaxRate = taxableBase * 0.06;
      const grossIncomeRate = taxableBase * 0.025;

      // Calculate minimum customs dispatch cost
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
          key !== "optionalSenasaFee"
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

    setTotal(calculatedTotal + optionalTotal);
  }, [formData, includeElectricalSecurity, includeSenasaFee]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
            <Input type="number" name={key} value={value} disabled />
          </div>
        ))}
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="electricalSecurity"
          checked={includeElectricalSecurity}
          onChange={(e) => setIncludeElectricalSecurity(e.target.checked)}
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
          onChange={(e) => setIncludeSenasaFee(e.target.checked)}
        />
        <label htmlFor="senasaFee">Include Senasa Fee (50)</label>
      </div>

      <div className="text-xl font-bold mt-4">Total: {total.toFixed(2)}</div>

      <div className="flex justify-end gap-2">
        <DialogClose asChild>
          <Button type="button" variant="secondary" className="text-sm">
            Cancelar
          </Button>
        </DialogClose>
        <DialogClose asChild>
          <Button type="submit" className="text-sm bg-primary text-white">
            Crear Gasto de Aduana
          </Button>
        </DialogClose>
      </div>
    </form>
  );
}
