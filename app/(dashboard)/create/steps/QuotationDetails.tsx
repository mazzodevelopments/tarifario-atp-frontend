"use client";

import React, { useState, useEffect } from "react";
import Dropdown, { type DropdownItem } from "@/components/Dropdown";
import Input from "@/components/Input";
import { QuotationData } from "@/types/QuotationData";
import { CreateQuotationService } from "@/services/CreateQuotationService";
import { QuotationDataService } from "@/services/QuotationDataService";

interface QuotationDetailsProps {
  onFormDataChange: (formData: QuotationData) => void;
  initialData: QuotationData | null;
}

const addClient = async (name: string): Promise<DropdownItem> => {
  return { id: Date.now().toString(), name };
};

const addBuyer = async (name: string): Promise<DropdownItem> => {
  return { id: Date.now().toString(), name };
};

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

  const handleDropdownSelect = (field: string) => (item: DropdownItem) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: item.name,
    }));
  };

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
          fetchItems={QuotationDataService.fetchClients}
          addItem={addClient}
          onSelect={handleDropdownSelect("client")}
          value={formData.client}
          label="Cliente"
        />
        <Dropdown
          fetchItems={QuotationDataService.fetchBuyers}
          addItem={addBuyer}
          onSelect={handleDropdownSelect("buyer")}
          value={formData.buyer}
          label="Comprador"
        />
        <Input
          id="receptionDate"
          name="receptionDate"
          type="date"
          value={formData.receptionDate}
          onChange={handleInputChange}
          label="Fecha de Recepción"
        />
        <Input
          id="uploadDate"
          name="uploadDate"
          type="date"
          value={formData.uploadDate}
          onChange={handleInputChange}
          label="Fecha de Carga"
        />
        <Input
          id="expirationDateTime"
          name="expirationDateTime"
          type="datetime-local"
          value={formData.expirationDateTime}
          onChange={handleInputChange}
          label="Fecha y Hora de Expiración"
        />
        <Input
          id="materialsNeededDate"
          name="materialsNeededDate"
          type="date"
          value={formData.materialsNeededDate}
          onChange={handleInputChange}
          label="Fecha de Necesidad de Materiales"
        />
      </div>
      <Input
        id="customerRequestNumber"
        name="customerRequestNumber"
        value={formData.customerRequestNumber}
        onChange={handleInputChange}
        placeholder="Número de Solicitud del Cliente"
        label="Número de Solicitud del Cliente"
      />
    </div>
  );
}
