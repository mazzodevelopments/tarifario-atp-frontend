"use client";

import type React from "react";
import { useState, useEffect } from "react";
import Dropdown, { type DropdownItem } from "@/components/Dropdown";
import Input from "@/components/Input";
import type { QuotationData } from "@/app/(dashboard)/create/types";

interface QuotationDetailsProps {
  onFormDataChange: (formData: QuotationData) => void;
  initialData: QuotationData | null;
}

// SIMULACIÓN
const fetchClients = async (): Promise<DropdownItem[]> => {
  return [
    { id: "1", name: "Client 1" },
    { id: "2", name: "Client 2" },
    { id: "3", name: "Client 3" },
  ];
};

const fetchBuyers = async (): Promise<DropdownItem[]> => {
  return [
    { id: "1", name: "Buyer 1" },
    { id: "2", name: "Buyer 2" },
    { id: "3", name: "Buyer 3" },
  ];
};

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
  const [formData, setFormData] = useState<QuotationData>(
    initialData || {
      name: "",
      client: "",
      buyer: "",
      receptionDate: new Date().toISOString().split("T")[0],
      uploadDate: new Date().toISOString().split("T")[0],
      expirationDateTime: `${new Date().toISOString().split("T")[0]}T00:00`,
      materialsNeededDate: new Date().toISOString().split("T")[0],
      customerRequestNumber: "",
      atpInternRequestNumber: "",
    },
  );

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
        id="name"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Enter name"
        label="Nombre"
      />

      <div className="grid grid-cols-2 gap-4">
        <Dropdown
          fetchItems={fetchClients}
          addItem={addClient}
          onSelect={handleDropdownSelect("client")}
          value={formData.client}
          label="Cliente"
        />
        <Dropdown
          fetchItems={fetchBuyers}
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
        placeholder="Enter customer request number"
        label="Número de Solicitud del Cliente"
      />
      <Input
        id="atpInternRequestNumber"
        name="atpInternRequestNumber"
        value={formData.atpInternRequestNumber}
        onChange={handleInputChange}
        placeholder="Enter ATP intern request number"
        label="Número de Solicitud Interna ATP"
      />
    </div>
  );
}
