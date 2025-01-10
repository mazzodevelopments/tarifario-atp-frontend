export interface DropdownOption {
  value: string;
  label: string;
}

export interface SelectorUbicacionProps {
  vias: DropdownOption[];
  origenes: DropdownOption[];
  destinos: DropdownOption[];
  selectedLocation: {
    via: string;
    origen: string;
    destino: string;
  };
  setSelectedLocation: (location: {
    via: string;
    origen: string;
    destino: string;
  }) => void;
}

export default function LocationSelect({
  vias,
  origenes,
  destinos,
  selectedLocation,
  setSelectedLocation,
}: SelectorUbicacionProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      <h2 className="text-center text-xl font-medium text-secondary mb-4">
        Seleccione las opciones de ubicación
      </h2>

      {/* Dropdown para Vías */}
      <div className="w-full">
        <label
          htmlFor="vias"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Vía
        </label>
        <select
          id="vias"
          className="w-full p-2 border-2 border-gray-200 rounded-md text-sm focus:outline-none"
          value={selectedLocation.via}
          onChange={(e) =>
            setSelectedLocation({ ...selectedLocation, via: e.target.value })
          }
        >
          <option value="" disabled>
            Seleccione una vía
          </option>
          {vias.map((via) => (
            <option key={via.value} value={via.value}>
              {via.label}
            </option>
          ))}
        </select>
      </div>

      {/* Dropdown para Orígenes */}
      <div className="w-full">
        <label
          htmlFor="origenes"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Origen
        </label>
        <select
          id="origenes"
          className="w-full p-2 border-2 border-gray-200 rounded-md text-sm focus:outline-none"
          value={selectedLocation.origen}
          onChange={(e) =>
            setSelectedLocation({ ...selectedLocation, origen: e.target.value })
          }
        >
          <option value="" disabled>
            Seleccione un origen
          </option>
          {origenes.map((origen) => (
            <option key={origen.value} value={origen.value}>
              {origen.label}
            </option>
          ))}
        </select>
      </div>

      {/* Dropdown para Destinos */}
      <div className="w-full">
        <label
          htmlFor="destinos"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Destino
        </label>
        <select
          id="destinos"
          className="w-full p-2 border-2 border-gray-200 rounded-md text-sm focus:outline-none"
          value={selectedLocation.destino}
          onChange={(e) =>
            setSelectedLocation({
              ...selectedLocation,
              destino: e.target.value,
            })
          }
        >
          <option value="" disabled>
            Seleccione un destino
          </option>
          {destinos.map((destino) => (
            <option key={destino.value} value={destino.value}>
              {destino.label}
            </option>
          ))}
        </select>
      </div>

      {/* Resumen de selección */}
      {selectedLocation.via ||
      selectedLocation.origen ||
      selectedLocation.destino ? (
        <div className="mt-4 text-sm text-gray-600">
          <p>
            Vía seleccionada:{" "}
            <strong>{selectedLocation.via || "Ninguna"}</strong>
          </p>
          <p>
            Origen seleccionado:{" "}
            <strong>{selectedLocation.origen || "Ninguno"}</strong>
          </p>
          <p>
            Destino seleccionado:{" "}
            <strong>{selectedLocation.destino || "Ninguno"}</strong>
          </p>
        </div>
      ) : null}
    </div>
  );
}
