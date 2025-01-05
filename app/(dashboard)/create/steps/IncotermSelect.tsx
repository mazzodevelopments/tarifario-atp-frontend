import { useState } from "react";

export default function IncotermSelect() {
  const incoterms = [
    { value: "EXW", label: "EXW - Ex Works" },
    { value: "FCA", label: "FCA - Free Carrier" },
    { value: "CPT", label: "CPT - Carriage Paid To" },
    { value: "CIP", label: "CIP - Carriage and Insurance Paid To" },
    { value: "DAP", label: "DAP - Delivered At Place" },
    { value: "DPU", label: "DPU - Delivered at Place Unloaded" },
    { value: "DDP", label: "DDP - Delivered Duty Paid" },
    { value: "FAS", label: "FAS - Free Alongside Ship" },
    { value: "FOB", label: "FOB - Free On Board" },
    { value: "CFR", label: "CFR - Cost and Freight" },
    { value: "CIF", label: "CIF - Cost, Insurance, and Freight" },
  ];

  const [selectedValue, setSelectedValue] = useState("");

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-center text-xl font-medium text-secondary mb-4">
        Seleccionar que Incoterm desea cotizar
      </h2>
      <select
        className="w-full p-2 border-2 border-gray-200 rounded-md text-sm focus:outline-none"
        value={selectedValue}
        onChange={(e) => setSelectedValue(e.target.value)}
      >
        <option value="" disabled>
          Seleccione un Incoterm
        </option>
        {incoterms.map((incoterm) => (
          <option key={incoterm.value} value={incoterm.value}>
            {incoterm.label}
          </option>
        ))}
      </select>
      {selectedValue && (
        <p className="mt-4 text-sm text-gray-600">
          Incoterm seleccionado: <strong>{selectedValue}</strong>
        </p>
      )}
    </div>
  );
}
