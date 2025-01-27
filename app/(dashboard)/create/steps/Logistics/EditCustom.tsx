import type React from "react";
import { useEffect, useState, useCallback } from "react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import type { Custom } from "@/types/Custom";

interface EditCustomProps {
  custom: Custom;
  onCustomUpdated: (custom: Custom) => void;
  onCustomDeleted: () => void;
  onCancel: () => void;
}

export default function EditCustom({
  custom,
  onCustomUpdated,
  onCustomDeleted,
  onCancel,
}: EditCustomProps) {
  const [formData, setFormData] = useState<Custom>(custom);
  const [includeElectricalSecurity, setIncludeElectricalSecurity] = useState(
    custom.optionalElectricalSecurity > 0,
  );
  const [includeSenasaFee, setIncludeSenasaFee] = useState(
    custom.optionalSenasaFee > 0,
  );

  const calculateCustoms = useCallback(() => {
    const taxableBase =
      formData.invoiceValueFOB +
      formData.internationalFreightCost +
      (formData.invoiceValueFOB + formData.internationalFreightCost) * 0.01;

    const importDuty = taxableBase * formData.importDutyRate;
    const statisticsRate = taxableBase * 0.03;
    const ivaBase = importDuty + statisticsRate;
    const ivaRate = ivaBase * 0.21;
    const additionalIvaRate = ivaBase * 0.105;
    const incomeTaxRate = taxableBase * 0.06;
    const grossIncomeRate = taxableBase * 0.025;
    const minimumCustomsDispatchCost = Math.max(250, taxableBase * 0.008);

    return {
      taxableBase,
      statisticsRate,
      ivaRate,
      additionalIvaRate,
      incomeTaxRate,
      grossIncomeRate,
      minimumCustomsDispatchCost,
    };
  }, [
    formData.invoiceValueFOB,
    formData.internationalFreightCost,
    formData.importDutyRate,
  ]);

  useEffect(() => {
    const calculatedValues = calculateCustoms();
    setFormData((prevData) => ({
      ...prevData,
      ...calculatedValues,
    }));
  }, [
    formData.invoiceValueFOB,
    formData.internationalFreightCost,
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
      (includeElectricalSecurity ? 150 : 0) + (includeSenasaFee ? 50 : 0);

    const newTotal = calculatedTotal + optionalTotal;

    if (newTotal !== formData.total) {
      setFormData((prevData) => ({
        ...prevData,
        optionalElectricalSecurity: includeElectricalSecurity ? 150 : 0,
        optionalSenasaFee: includeSenasaFee ? 50 : 0,
        total: newTotal,
      }));
    }
  }, [formData, includeElectricalSecurity, includeSenasaFee]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: Number(value),
    }));
  };

  const handleCheckboxChange = (
    checkboxName: "includeElectricalSecurity" | "includeSenasaFee",
    isChecked: boolean,
  ) => {
    if (checkboxName === "includeElectricalSecurity") {
      setIncludeElectricalSecurity(isChecked);
    } else {
      setIncludeSenasaFee(isChecked);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCustomUpdated(formData);
  };

  const handleDelete = () => {
    onCustomDeleted();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <Input
          type="number"
          name="invoiceValueFOB"
          value={formData.invoiceValueFOB}
          label="FOB (Valor de la INVOICE)"
          onChange={handleInputChange}
        />
        <Input
          type="number"
          name="internationalFreightCost"
          value={formData.internationalFreightCost}
          label="Flete internacional"
          onChange={handleInputChange}
        />
        <Input
          type="number"
          name="importDutyRate"
          value={formData.importDutyRate}
          label="Tasa de Derechos de Importación (%)"
          onChange={handleInputChange}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Input
          type="number"
          name="sediLegalizationFee"
          value={formData.sediLegalizationFee}
          label="Oficialización SEDI"
          disabled
        />
        <Input
          type="number"
          name="taxableBase"
          value={formData.taxableBase}
          label="Base Imponible"
          disabled
        />
        <Input
          type="number"
          name="statisticsRate"
          value={formData.statisticsRate}
          label="Estadística"
          disabled
        />
        <Input
          type="number"
          name="ivaRate"
          value={formData.ivaRate}
          label="IVA"
          disabled
        />
        <Input
          type="number"
          name="additionalIvaRate"
          value={formData.additionalIvaRate}
          label="IVA Adicional"
          disabled
        />
        <Input
          type="number"
          name="incomeTaxRate"
          value={formData.incomeTaxRate}
          label="Ganancias"
          disabled
        />
        <Input
          type="number"
          name="grossIncomeRate"
          value={formData.grossIncomeRate}
          label="Ingresos Brutos"
          disabled
        />
        <Input
          type="number"
          name="simFee"
          value={formData.simFee}
          disabled
          label="Arancel SIM"
        />
        <Input
          type="number"
          name="minimumCustomsDispatchCost"
          value={formData.minimumCustomsDispatchCost}
          label="Gastos despacho aduanero mínimo"
          disabled
        />
        <Input
          type="number"
          name="customsOperationalCharges"
          value={formData.customsOperationalCharges}
          label="Gastos operativos"
          disabled
        />
      </div>
      <div className="grid grid-cols-2">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="electricalSecurity"
            checked={includeElectricalSecurity}
            onChange={(e) =>
              handleCheckboxChange(
                "includeElectricalSecurity",
                e.target.checked,
              )
            }
          />
          <label htmlFor="electricalSecurity" className="text-sm font-[600]">
            Incluir Seguridad Eléctrica ($150)
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="senasaFee"
            checked={includeSenasaFee}
            onChange={(e) =>
              handleCheckboxChange("includeSenasaFee", e.target.checked)
            }
          />
          <label htmlFor="senasaFee" className="text-sm font-[600]">
            Incluir SENASA ($50)
          </label>
        </div>
      </div>
      <div className="text-xl font-bold mt-4">
        Total: ${formData.total.toFixed(2)}
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          type="button"
          className="bg-red-100 text-red-500"
          onClick={handleDelete}
        >
          Delete
        </Button>
        <Button type="submit" className="bg-primary text-white">
          Update Custom
        </Button>
      </div>
    </form>
  );
}
