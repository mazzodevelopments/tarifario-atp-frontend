import React, { useState, useEffect, useCallback, ChangeEvent } from "react";
import Button from "@/components/Button";
import Dropdown, { type DropdownItem } from "@/components/Dropdown";
import type { Transport } from "@/types/Transport";
import Input from "@/components/Input";
import { adaptToDropdown } from "@/app/adapters/adaptToDropdown";
import { QuoteService } from "@/services/QuoteService";

interface CreateTransportProps {
  onTransportCreated: (transport: Transport | null) => void;
  onCancel: () => void;
  existingTransport?: Transport | null;
}

interface TranslatedDropdownItem extends DropdownItem {
  originalValue?: string;
}

export default function TransportForm({
  onTransportCreated,
  onCancel,
  existingTransport,
}: CreateTransportProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    existingTransport?.transportType.type || "",
  );
  const [selectedTransportType, setSelectedTransportType] = useState<{
    id: number;
    type: string;
    category: string;
  }>(existingTransport?.transportType || { id: 0, type: "", category: "" });
  const [transportValue, setTransportValue] = useState<number>(
    existingTransport?.total || 0,
  );
  const [transportOptions, setTransportOptions] = useState<
    { id: number; type: string; category: string }[]
  >([]);

  useEffect(() => {
    if (existingTransport) {
      setSelectedCategory(existingTransport.transportType.type);
      setSelectedTransportType(existingTransport.transportType);
      setTransportValue(existingTransport.total);
    }
  }, [existingTransport]);

  useEffect(() => {
    const fetchOptions = async () => {
      const options = await QuoteService.getTransportTypes();
      setTransportOptions(options);
    };
    fetchOptions();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTransportType.id && selectedTransportType.category) {
      const newTransport: Transport = {
        transportType: selectedTransportType,
        total: transportValue,
      };
      onTransportCreated(newTransport);
    }
  };

  const handleDelete = () => {
    onTransportCreated(null);
  };

  const handleCategoryChange = (item: TranslatedDropdownItem) => {
    const originalValue = item.originalValue || item.name;
    setSelectedCategory(originalValue);
    setSelectedTransportType({ id: 0, type: originalValue, category: "" });
    setTransportValue(0);
  };

  const handleTransportTypeChange = (item: DropdownItem) => {
    const selectedOption = transportOptions.find((opt) => opt.id === item.id);
    if (selectedOption) {
      const newTransportType = {
        id: selectedOption.id,
        type: selectedOption.type,
        category: selectedOption.category,
      };
      setSelectedTransportType(newTransportType);
    }
  };

  const fetchTransportOptions = useCallback(async () => {
    if (!selectedCategory) return [];

    const filteredOptions = transportOptions.filter(
      (option) => option.type === selectedCategory,
    );

    return adaptToDropdown(filteredOptions, "id", "category");
  }, [selectedCategory, transportOptions]);

  const fetchCategoryOptions = useCallback(async () => {
    const types = Array.from(new Set(transportOptions.map((opt) => opt.type)));

    const typeTranslations: Record<string, string> = {
      National: "Nacional",
      International: "Internacional",
    };

    return types.map((type, index) => ({
      id: index + 1,
      name: typeTranslations[type] || type,
      originalValue: type,
    }));
  }, [transportOptions]);

  const getTranslatedCategory = (type: string) => {
    const translations: Record<string, string> = {
      National: "Nacional",
      International: "Internacional",
    };
    return translations[type] || type;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Dropdown
        label="Tipo de Transporte"
        fetchItems={fetchCategoryOptions}
        onSelect={handleCategoryChange}
        required
        value={getTranslatedCategory(selectedCategory)}
      />

      <Dropdown
        label="Categoría de Transporte"
        onSelect={handleTransportTypeChange}
        fetchItems={fetchTransportOptions}
        required
        value={selectedTransportType.category}
        disabled={!selectedCategory}
      />

      <Input
        type="number"
        name="total"
        value={transportValue}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setTransportValue(Number(e.target.value))
        }
        label="Valor Total"
        placeholder="Ingrese el valor"
        required
        min={0}
      />

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
          disabled={!selectedTransportType.category || transportValue <= 0}
        >
          {existingTransport ? "Actualizar" : "Guardar"}
        </Button>
      </div>
    </form>
  );
}
