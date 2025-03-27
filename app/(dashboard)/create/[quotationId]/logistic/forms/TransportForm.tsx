import React, { useState, useEffect } from "react";
import Button from "@/components/Button";
import Dropdown, { type DropdownItem } from "@/components/Dropdown";
import type { Transport } from "@/types/Transport";
import { LogisticDataService } from "@/services/LogisticDataService";
import Input from "@/components/Input";

interface CreateTransportProps {
  onTransportCreated: (transport: Transport | null) => void;
  onCancel: () => void;
  existingTransport?: Transport | null;
}

export default function TransportForm({
  onTransportCreated,
  onCancel,
  existingTransport,
}: CreateTransportProps) {
  const [selectedTransport, setSelectedTransport] = useState<string>(
    existingTransport?.type || "",
  );
  const [transportValue, setTransportValue] = useState<number>(
    existingTransport?.total || 0,
  );

  useEffect(() => {
    if (existingTransport) {
      setSelectedTransport(existingTransport.type);
      setTransportValue(existingTransport.total);
    }
  }, [existingTransport]);

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

  const handleDelete = () => {
    onTransportCreated(null);
  };

  const handleTransportChange = (item: DropdownItem) => {
    setSelectedTransport(item.name);
    switch (item.name) {
      case "Air":
      case "DHL":
      case "DHL #":
        setTransportValue(1500);
        break;
      case "LCL":
      case "FCL 20'":
      case "FCL 40'":
        setTransportValue(1000);
        break;
      case "Road":
        setTransportValue(500);
        break;
      default:
        setTransportValue(2000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Dropdown
        label="Opción de Transporte"
        fetchItems={LogisticDataService.fetchTransportOptions}
        onSelect={handleTransportChange}
        required
        value={selectedTransport}
      />
      {/*CODIGO EJEMPLO*/}
      <Input
        type="number"
        name="value"
        value={10000}
        label="Valor Flete"
        placeholder="Valor Flete"
      />
      <div className="ml-2 flex items-center space-x-2">
        <input type="checkbox" id="pickup" className="rounded" />
        <label htmlFor="pickup" className="font-[600]">
          Seguro
        </label>
        <Input
          type="number"
          min={0}
          value={200}
          placeholder="Valor Seguro"
          className="w-40"
        />
      </div>
      {/* CODIGO EJEMPLO*/}
      <div className="flex justify-end gap-2">
        {existingTransport && (
          <Button type="button" onClick={handleDelete} variant="danger">
            Eliminar
          </Button>
        )}
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
          className="px-4 bg-primary text-white"
          disabled={!selectedTransport}
        >
          {existingTransport ? "Actualizar" : "Guardar"}
        </Button>
      </div>
    </form>
  );
}
