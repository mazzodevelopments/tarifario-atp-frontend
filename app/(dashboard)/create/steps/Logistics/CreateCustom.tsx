import React, { useEffect, useState } from "react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import type { Custom } from "@/types/Custom";

interface CreateCustomProps {
  onCustomCreated: (custom: Custom | null) => void;
  onCancel: () => void;
  existingCustom?: Custom | null;
}

export default function CreateCustom({
  onCustomCreated,
  onCancel,
  existingCustom,
}: CreateCustomProps) {
  const [formData, setFormData] = useState<Custom>(
    existingCustom || {
      sediLegalizationFee: 50,
      invoiceValueFOB: 0,
      internationalFreightCost: 0,
      taxableBase: 0,
      importDutyRate: 0,
      statisticsRate: 0,
      ivaRate: 0,
      additionalIvaRate: 0,
      incomeTaxRate: 0,
      grossIncomeRate: 0,
      simFee: 10,
      minimumCustomsDispatchCost: 250,
      customsOperationalCharges: 210,
      optionalElectricalSecurity: 150,
      optionalSenasaFee: 50,
      total: 0,
    },
  );

  const [includeElectricalSecurity, setIncludeElectricalSecurity] = useState(
    existingCustom?.optionalElectricalSecurity ? true : false,
  );
  const [includeSenasaFee, setIncludeSenasaFee] = useState(
    existingCustom?.optionalSenasaFee ? true : false,
  );

  useEffect(() => {
    const calculateCustoms = () => {
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
  }, [includeElectricalSecurity, includeSenasaFee, formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: Number(value),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onCustomCreated(formData);
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onCancel();
  };

  const handleDelete = () => {
    onCustomCreated(null);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <Input
          type="number"
          name="invoiceValueFOB"
          value={formData.invoiceValueFOB}
          label=" FOB (Valor de la INVOICE)"
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setIncludeElectricalSecurity(e.target.checked)
            }
          />
          <label htmlFor="electricalSecurity" className="text-sm font-[600]">
            Incluir Seguridad Eléctrica (${formData.optionalElectricalSecurity})
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
          <label htmlFor="senasaFee" className="text-sm font-[600]">
            Incluir SENASA (${formData.optionalSenasaFee})
          </label>
        </div>
      </div>
      <div className="text-xl font-bold mt-4">
        Total: ${formData.total.toFixed(2)}
      </div>

      <div className="flex justify-end gap-2">
        {existingCustom && (
          <Button
            type="button"
            className="bg-red-100 text-red-500"
            onClick={handleDelete}
          >
            Eliminar
          </Button>
        )}
        <Button type="button" variant="secondary" onClick={handleCancel}>
          Cancelar
        </Button>
        <Button type="submit" className="bg-primary text-white">
          {existingCustom ? "Actualizar" : "Guardar"}
        </Button>
      </div>
    </form>
  );
}
