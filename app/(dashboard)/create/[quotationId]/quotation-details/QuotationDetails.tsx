"use client";

import type React from "react";
import { useState, useEffect, useCallback } from "react";
import Dropdown, { type DropdownItem } from "@/components/Dropdown";
import Input from "@/components/Input";
import type { QuotationData, CreateQuotationData } from "@/types/QuotationData";
import { QuoteService } from "@/services/QuoteService";
import { CatalogService } from "@/services/CatalogService";
import { adaptToDropdown } from "@/app/adapters/adaptToDropdown";
import BuyerForm from "@/app/(dashboard)/create/[quotationId]/quotation-details/forms/BuyerForm";
import ClientForm from "@/app/(dashboard)/create/[quotationId]/quotation-details/forms/ClientForm";
import Button from "@/components/Button";

interface QuotationDetailsProps {
  onSubmitSuccess: (quotationId: number) => void;
}

export default function QuotationDetails({
  onSubmitSuccess,
}: QuotationDetailsProps) {
  const [formData, setFormData] = useState<Omit<QuotationData, "id">>({
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
  });

  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);
  const [selectedBuyerId, setSelectedBuyerId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isClientLoading, setIsClientLoading] = useState(false);
  const [errors, setErrors] = useState({
    client: "",
    buyer: "",
    receptionDate: "",
    uploadDate: "",
    expirationDateTime: "",
    materialsNeededDate: "",
    customerRequestNumber: "",
  });

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleDropdownSelect =
    (field: keyof QuotationData) => (item: DropdownItem) => {
      setFormData((prevData) => ({
        ...prevData,
        [field]: item.name,
      }));
      setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));

      if (field === "client") {
        setSelectedClientId(item.id);
        setFormData((prevData) => ({ ...prevData, buyer: "" }));
      }

      if (field === "buyer") {
        setSelectedBuyerId(item.id);
      }
    };

  const validateForm = () => {
    const newErrors = {
      client: "",
      buyer: "",
      receptionDate: "",
      uploadDate: "",
      expirationDateTime: "",
      materialsNeededDate: "",
      customerRequestNumber: "",
    };
    let isValid = true;

    if (!formData.client) {
      newErrors.client = "El cliente es requerido";
      isValid = false;
    }

    if (!formData.buyer) {
      newErrors.buyer = "El comprador es requerido";
      isValid = false;
    }

    if (!formData.receptionDate) {
      newErrors.receptionDate = "La fecha de recepción es requerida";
      isValid = false;
    }

    if (!formData.uploadDate) {
      newErrors.uploadDate = "La fecha de carga es requerida";
      isValid = false;
    }

    if (!formData.expirationDateTime) {
      newErrors.expirationDateTime =
        "La fecha y hora de expiración es requerida";
      isValid = false;
    }

    if (!formData.materialsNeededDate) {
      newErrors.materialsNeededDate =
        "La fecha de necesidad de materiales es requerida";
      isValid = false;
    }

    if (!formData.customerRequestNumber) {
      newErrors.customerRequestNumber =
        "El número de solicitud del cliente es requerido";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    if (!validateForm()) {
      return;
    }

    if (!selectedBuyerId) {
      console.error("El id del comprador es requerido");
      return;
    }

    try {
      const createQuotationData: CreateQuotationData = {
        taskNumber: formData.taskNumber,
        buyerId: selectedBuyerId,
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

  const handleAddClient = async (data: { name: string }) => {
    try {
      setIsClientLoading(true);
      const clientId = await CatalogService.addClient(data);
      const newClient = { name: data.name, id: clientId };

      setFormData((prevData) => ({
        ...prevData,
        client: newClient.name,
      }));
      setSelectedClientId(clientId);

      setIsClientLoading(false);
    } catch (error) {
      console.error("Error adding new client:", error);
      setIsClientLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl space-y-4">
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
          onSelect={handleDropdownSelect("client")}
          value={formData.client}
          label="Cliente"
          error={errors.client}
          customForm={
            <ClientForm
              onSubmit={handleAddClient}
              isLoading={isClientLoading}
            />
          }
        />
        <Dropdown
          fetchItems={fetchBuyers}
          onSelect={handleDropdownSelect("buyer")}
          value={formData.buyer}
          label="Comprador"
          error={errors.buyer}
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
          error={errors.receptionDate}
        />
        <Input
          id="uploadDate"
          name="uploadDate"
          type="date"
          value={formData.uploadDate}
          onChange={handleInputChange}
          label="Fecha de Carga"
          error={errors.uploadDate}
        />
        <Input
          id="expirationDateTime"
          name="expirationDateTime"
          type="datetime-local"
          value={formData.expirationDateTime}
          onChange={handleInputChange}
          label="Fecha y Hora de Expiración"
          error={errors.expirationDateTime}
        />
        <Input
          id="materialsNeededDate"
          name="materialsNeededDate"
          type="date"
          value={formData.materialsNeededDate}
          onChange={handleInputChange}
          label="Fecha de Necesidad de Materiales"
          error={errors.materialsNeededDate}
        />
      </div>
      <Input
        id="customerRequestNumber"
        name="customerRequestNumber"
        value={formData.customerRequestNumber}
        onChange={handleInputChange}
        placeholder="Número de Solicitud del Cliente"
        label="Número de Solicitud del Cliente"
        error={errors.customerRequestNumber}
      />

      <Button
        type="submit"
        variant="primary"
        className="flex w-full mt-4 text-white items-center justify-center"
      >
        Iniciar Cotización
      </Button>
    </form>
  );
}
