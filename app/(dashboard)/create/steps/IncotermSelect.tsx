export interface Incoterm {
  value: string;
  label: string;
  steps: number;
}

export interface IncotermSelectProps {
  incoterms: Incoterm[];
  selectedValue: string;
  setSelectedValue: (value: string) => void;
}

export default function IncotermSelect({
  incoterms,
  selectedValue,
  setSelectedValue,
}: IncotermSelectProps) {
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
