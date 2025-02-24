"use client";

import type React from "react";
import { useState, useEffect, useCallback } from "react";
import Dropdown, { type DropdownItem } from "@/components/Dropdown";
import Input from "@/components/Input";
import type { QuotationData, CreateQuotationData } from "@/types/QuotationData";
import { QuoteService } from "@/services/QuoteService";
import { CatalogService } from "@/services/CatalogService";
import { adaptToDropdown } from "@/app/adapters/adaptToDropdown";
import { BuyerForm } from "@/app/(dashboard)/create/steps/QuotationDetails/BuyerForm";

interface QuotationDetailsProps {
  onFormDataChange: (formData: QuotationData) => void;
  onSubmitSuccess: (quotationId: number) => void;
  initialData: QuotationData | null;
}

export default function QuotationDetails({
  onFormDataChange,
  onSubmitSuccess,
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
      stageId: 1,
      items: null,
      budgets: null,
    },
  );

  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);
  const [selectedBuyerId, setSelectedBuyerId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTaskNumber = async () => {
      try {
        const taskNumber = await QuoteService.fetchQuotationTaskNumber();
        setFormData((prevData) => ({
          ...prevData,
          taskNumber,
        }));
      } catch (error) {
        console.error("Error al traer el task-number:", error);
      }
    };

    fetchTaskNumber();
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

      if (field === "buyer") {
        setSelectedBuyerId(item.id);
      }
    };

  const handleSubmit = async () => {
    try {
      const createQuotationData: CreateQuotationData = {
        taskNumber: formData.taskNumber,
        buyerId: selectedBuyerId!,
        receptionDate: formData.receptionDate,
        uploadDate: formData.uploadDate,
        expirationDateTime: formData.expirationDateTime,
        materialsNeededDate: formData.materialsNeededDate,
        customerRequestNumber: formData.customerRequestNumber,
        stageId: formData.stageId,
      };

      const quotationId =
        await QuoteService.createQuotation(createQuotationData);
      onSubmitSuccess(quotationId);
    } catch (error) {
      console.error("Error creating quotation:", error);
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

  const handleAddBuyer = async (data: {
    phone: string;
    name: string;
    lastname: string;
    email: string;
    birthDate: string;
    street: string;
    streetNumber: string;
    country: string;
    city: string;
    zipCode: string;
  }) => {
    if (!selectedClientId) return;

    try {
      setIsLoading(true);
      const buyerId = await CatalogService.addBuyer({
        name: data.name,
        lastname: data.lastname,
        email: data.email,
        phone: data.phone,
        birthDate: data.birthDate,
        street: data.street,
        streetNumber: data.streetNumber,
        country: data.country,
        city: data.city,
        zipCode: data.zipCode,
        clientId: selectedClientId,
      });

      const newBuyer = { name: `${data.name} ${data.lastname}`, id: buyerId };

      setFormData((prevData) => ({
        ...prevData,
        buyer: newBuyer.name,
      }));
      setSelectedBuyerId(buyerId);
      setSelectedClientId(selectedClientId);

      setIsLoading(false);
    } catch (error) {
      console.error("Error adding new buyer:", error);
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await handleSubmit();
      }}
      className="w-full max-w-2xl space-y-4"
    >
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
          onSelect={handleDropdownSelect("buyer")}
          value={formData.buyer}
          label="Comprador"
          required
          disabled={!selectedClientId}
          customForm={
            <BuyerForm onSubmit={handleAddBuyer} isLoading={isLoading} />
          }
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
    </form>
  );
}
