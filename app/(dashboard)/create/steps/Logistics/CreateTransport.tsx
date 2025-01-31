import { useState } from "react";
import Button from "@/components/Button";
import Dropdown, { type DropdownItem } from "@/components/Dropdown";
import type { Transport } from "@/types/Transport";

interface CreateTransportProps {
  onTransportCreated: (transport: Transport) => void;
  onCancel: () => void;
}

export default function CreateTransport({
  onTransportCreated,
  onCancel,
}: CreateTransportProps) {
  const [selectedTransport, setSelectedTransport] = useState<string>("");
  const [transportValue, setTransportValue] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTransport) {
      const newTransport: Transport = {
        type: selectedTransport,
        total: transportValue,
      };
      onTransportCreated(newTransport);
    }
  };

  const fetchTransportOptions = async (): Promise<DropdownItem[]> => {
    return [
      { id: "1", name: "Air" },
      { id: "2", name: "DHL" },
      { id: "3", name: "DHL #" },
      { id: "4", name: "LCL" },
      { id: "5", name: "FCL 20'" },
      { id: "6", name: "FCL 40'" },
      { id: "7", name: "Road" },
    ];
  };

  const handleTransportChange = (item: DropdownItem) => {
    setSelectedTransport(item.name);

    // Ajusta los valores basándote en las categorías
    switch (item.name) {
      case "Air":
      case "DHL":
      case "DHL #":
        setTransportValue(1500); // Aéreo
        break;
      case "LCL":
      case "FCL 20'":
      case "FCL 40'":
        setTransportValue(1000); // Marítimo
        break;
      case "Road":
        setTransportValue(500); // Terrestre
        break;
      default:
        setTransportValue(0); // Valor por defecto
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Dropdown
        label="Opción de Transporte"
        fetchItems={fetchTransportOptions}
        onSelect={handleTransportChange}
        required
      />
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
          disabled={!selectedTransport}
        >
          Guardar
        </Button>
      </div>
    </form>
  );
}
