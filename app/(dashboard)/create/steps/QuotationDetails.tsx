"use client";

import React, { useState, useEffect, useCallback } from "react"; // Importa useCallback
import Dropdown, { type DropdownItem } from "@/components/Dropdown";
import Input from "@/components/Input";
import { QuotationData } from "@/types/QuotationData";
import { CreateQuotationService } from "@/services/CreateQuotationService";
import { CatalogService } from "@/services/CatalogService";
import { adaptToDropdown } from "@/app/adapters/adaptToDropdown";

interface QuotationDetailsProps {
  onFormDataChange: (formData: QuotationData) => void;
  initialData: QuotationData | null;
}

export default function QuotationDetails({
  onFormDataChange,
  initialData,
}: QuotationDetailsProps) {
  const [formData, setFormData] = useState<Omit<QuotationData, "id">>(
    initialData || {
      taskNumber: "",
      client: "",
      buyer: "",
      receptionDate: new Date().toISOString().split("T")[0],
      uploadDate: new Date().toISOString().split("T")[0],
      expirationDateTime: `${new Date().toISOString().split("T")[0]}T00:00`,
      materialsNeededDate: new Date().toISOString().split("T")[0],
      customerRequestNumber: "",
      items: null,
      budgets: null,
    },
  );

  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      taskNumber: CreateQuotationService.fetchQuotationTaskNumber(),
    }));
  }, []);

  useEffect(() => {
    onFormDataChange(formData);
  }, [formData, onFormDataChange]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDropdownSelect =
    (field: keyof QuotationData) => (item: DropdownItem) => {
      setFormData((prevData) => ({
        ...prevData,
        [field]: item.name,
      }));

      if (field === "client") {
        setSelectedClientId(item.id);
        setFormData((prevData) => ({ ...prevData, buyer: "" }));
      }
    };

  const fetchClients = useCallback(async () => {
    const clients = await CatalogService.listClients();
    return adaptToDropdown(clients, "id", "name");
  }, []);

  const fetchBuyers = useCallback(async () => {
    if (!selectedClientId) return [];
    const buyers = await CatalogService.listBuyers(selectedClientId);
    return adaptToDropdown(buyers, "id", "name");
  }, [selectedClientId]);

  return (
    <div className="w-full max-w-2xl space-y-4">
      <Input
        id="taskNumber"
        name="taskNumber"
        value={formData.taskNumber}
        onChange={handleInputChange}
        placeholder="N# Tarea"
        label="N# Tarea"
        disabled
      />

      <div className="grid grid-cols-2 gap-4">
        <Dropdown
          fetchItems={fetchClients}
          addItem={CatalogService.addClient}
          onSelect={handleDropdownSelect("client")}
          value={formData.client}
          label="Cliente"
          required
        />
        <Dropdown
          fetchItems={fetchBuyers}
          addItem={(name: string) =>
            CatalogService.addBuyer(name, selectedClientId!)
          }
          onSelect={handleDropdownSelect("buyer")}
          value={formData.buyer}
          label="Comprador"
          required
          disabled={!selectedClientId}
        />
        <Input
          id="receptionDate"
          name="receptionDate"
          type="date"
          value={formData.receptionDate}
          onChange={handleInputChange}
          label="Fecha de Recepción"
          required
        />
        <Input
          id="uploadDate"
          name="uploadDate"
          type="date"
          value={formData.uploadDate}
          onChange={handleInputChange}
          label="Fecha de Carga"
          required
        />
        <Input
          id="expirationDateTime"
          name="expirationDateTime"
          type="datetime-local"
          value={formData.expirationDateTime}
          onChange={handleInputChange}
          label="Fecha y Hora de Expiración"
          required
        />
        <Input
          id="materialsNeededDate"
          name="materialsNeededDate"
          type="date"
          value={formData.materialsNeededDate}
          onChange={handleInputChange}
          label="Fecha de Necesidad de Materiales"
          required
        />
      </div>
      <Input
        id="customerRequestNumber"
        name="customerRequestNumber"
        value={formData.customerRequestNumber}
        onChange={handleInputChange}
        placeholder="Número de Solicitud del Cliente"
        label="Número de Solicitud del Cliente"
        required
      />
    </div>
  );
}
