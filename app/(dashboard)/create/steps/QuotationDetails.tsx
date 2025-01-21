"use client";

import type React from "react";
import { useState, useEffect } from "react";
import Dropdown, { type DropdownItem } from "@/components/Dropdown";
import Input from "@/components/Input";
import type { QuotationData } from "@/app/(dashboard)/create/types";

interface QuotationDetailsProps {
  onFormDataChange: (formData: QuotationData) => void;
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
}: QuotationDetailsProps) {
  const [formData, setFormData] = useState<QuotationData>({
    name: "",
    client: "",
    buyer: "",
    receptionDate: new Date().toISOString().split("T")[0],
    uploadDate: new Date().toISOString().split("T")[0],
    expirationDateTime: `${new Date().toISOString().split("T")[0]}T00:00`,
    materialsNeededDate: new Date().toISOString().split("T")[0],
    customerRequestNumber: "",
    atpInternRequestNumber: "",
  });

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
      {/* INPUT NAME */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-[600] text-gray-700"
        >
          Nombre
        </label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Enter name"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        {/* INPUT CLIENT */}
        <div>
          <label
            htmlFor="client"
            className="block text-sm font-[600] text-gray-700"
          >
            Cliente
          </label>
          <Dropdown
            fetchItems={fetchClients}
            addItem={addClient}
            onSelect={handleDropdownSelect("client")}
          />
        </div>

        {/* INPUT BUYER */}
        <div>
          <label
            htmlFor="buyer"
            className="block text-sm font-[600] text-gray-700"
          >
            Comprador
          </label>
          <Dropdown
            fetchItems={fetchBuyers}
            addItem={addBuyer}
            onSelect={handleDropdownSelect("buyer")}
          />
        </div>

        {/* INPUT RECEPTION DATE */}
        <div>
          <label
            htmlFor="receptionDate"
            className="block text-sm font-[600] text-gray-700"
          >
            Fecha de Recepción
          </label>
          <Input
            id="receptionDate"
            name="receptionDate"
            type="date"
            value={formData.receptionDate}
            onChange={handleInputChange}
          />
        </div>

        {/* INPUT UPLOAD DATE */}
        <div>
          <label
            htmlFor="uploadDate"
            className="block text-sm font-[600] text-gray-700"
          >
            Fecha de Carga
          </label>
          <Input
            id="uploadDate"
            name="uploadDate"
            type="date"
            value={formData.uploadDate}
            onChange={handleInputChange}
          />
        </div>

        {/* INPUT EXPIRATION DATE AND TIME */}
        <div>
          <label
            htmlFor="expirationDateTime"
            className="block text-sm font-[600] text-gray-700"
          >
            Fecha y Hora de Expiración
          </label>
          <Input
            id="expirationDateTime"
            name="expirationDateTime"
            type="datetime-local"
            value={formData.expirationDateTime}
            onChange={handleInputChange}
          />
        </div>

        {/* INPUT MATERIALS NEEDED DATE */}
        <div>
          <label
            htmlFor="materialsNeededDate"
            className="block text-sm font-[600] text-gray-700"
          >
            Fecha de Necesidad de Materiales
          </label>
          <Input
            id="materialsNeededDate"
            name="materialsNeededDate"
            type="date"
            value={formData.materialsNeededDate}
            onChange={handleInputChange}
          />
        </div>
      </div>

      {/* INPUT CUSTOMER REQUEST NUMBER */}
      <div>
        <label
          htmlFor="customerRequestNumber"
          className="block text-sm font-[600] text-gray-700"
        >
          Número de Solicitud del Cliente
        </label>
        <Input
          id="customerRequestNumber"
          name="customerRequestNumber"
          value={formData.customerRequestNumber}
          onChange={handleInputChange}
          placeholder="Enter customer request number"
        />
      </div>

      {/* INPUT ATP INTERN REQUEST NUMBER */}
      <div>
        <label
          htmlFor="atpInternRequestNumber"
          className="block text-sm font-[600] text-gray-700"
        >
          Número de Solicitud Interna ATP
        </label>
        <Input
          id="atpInternRequestNumber"
          name="atpInternRequestNumber"
          value={formData.atpInternRequestNumber}
          onChange={handleInputChange}
          placeholder="Enter ATP intern request number"
        />
      </div>
    </div>
  );
}
