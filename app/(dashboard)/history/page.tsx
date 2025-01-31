"use client";

import { Search } from "react-feather";
import Header from "@/app/(dashboard)/components/Header";
import QuotationCard from "./QuotationCard";
import { QuotationData } from "@/types/QuotationData";
import { useState } from "react";

const quotations: QuotationData[] = [
  {
    taskNumber: "A25R-0001",
    client: "Inmobiliaria Soluciones SA",
    buyer: "Juan Pérez",
    receptionDate: "2025-01-15",
    uploadDate: "2025-01-16",
    expirationDateTime: "2025-02-15T23:59:59",
    materialsNeededDate: "2025-01-30",
    customerRequestNumber: "REQ-2025-001",
    budgets: [
      {
        transport: {
          type: "TRANSPORT-001",
          total: 3700,
        },
        custom: {
          sediLegalizationFee: 50,
          invoiceValueFOB: 15000,
          internationalFreightCost: 3000,
          taxableBase: 18300,
          importDutyRate: 2196,
          statisticsRate: 549,
          ivaRate: 5757,
          additionalIvaRate: 2878,
          incomeTaxRate: 1098,
          grossIncomeRate: 457.5,
          simFee: 10,
          minimumCustomsDispatchCost: 250,
          customsOperationalCharges: 210,
          optionalElectricalSecurity: 150,
          optionalSenasaFee: 50,
          total: 1150,
        },
        numbering: "COTI 0000000001",
        stage: "Quote Sent",
      },
    ],
  },
  {
    taskNumber: "B25R-0002",
    client: "Inmobiliaria Soluciones SA",
    buyer: "Juan Pérez",
    receptionDate: "2025-01-15",
    uploadDate: "2025-01-16",
    expirationDateTime: "2025-02-15T23:59:59",
    materialsNeededDate: "2025-01-30",
    customerRequestNumber: "REQ-2025-002",
    budgets: [
      {
        transport: {
          type: "TRANSPORT-002",
          total: 3700,
        },
        custom: {
          sediLegalizationFee: 50,
          invoiceValueFOB: 15000,
          internationalFreightCost: 3000,
          taxableBase: 18300,
          importDutyRate: 2196,
          statisticsRate: 549,
          ivaRate: 5757,
          additionalIvaRate: 2878,
          incomeTaxRate: 1098,
          grossIncomeRate: 457.5,
          simFee: 10,
          minimumCustomsDispatchCost: 250,
          customsOperationalCharges: 210,
          optionalElectricalSecurity: 150,
          optionalSenasaFee: 50,
          total: 1150,
        },
        numbering: "COTI 0000000002",
        stage: "Quote Sent",
      },
    ],
  },
  {
    taskNumber: "B35R-0003",
    client: "Inmobiliaria Soluciones SA",
    buyer: "Juan Pérez",
    receptionDate: "2025-01-15",
    uploadDate: "2025-01-16",
    expirationDateTime: "2025-02-15T23:59:59",
    materialsNeededDate: "2025-01-30",
    customerRequestNumber: "REQ-2025-003",
    budgets: [
      {
        transport: {
          type: "TRANSPORT-003",
          total: 3700,
        },
        custom: {
          sediLegalizationFee: 50,
          invoiceValueFOB: 15000,
          internationalFreightCost: 3000,
          taxableBase: 18300,
          importDutyRate: 2196,
          statisticsRate: 549,
          ivaRate: 5757,
          additionalIvaRate: 2878,
          incomeTaxRate: 1098,
          grossIncomeRate: 457.5,
          simFee: 10,
          minimumCustomsDispatchCost: 250,
          customsOperationalCharges: 210,
          optionalElectricalSecurity: 150,
          optionalSenasaFee: 50,
          total: 1150,
        },
        numbering: "COTI 0000000003",
        stage: "Quote Sent",
      },
    ],
  },
  {
    taskNumber: "C25R-0004",
    client: "Inmobiliaria Soluciones SA",
    buyer: "Juan Pérez",
    receptionDate: "2025-01-15",
    uploadDate: "2025-01-16",
    expirationDateTime: "2025-02-15T23:59:59",
    materialsNeededDate: "2025-01-30",
    customerRequestNumber: "REQ-2025-004",
    budgets: [
      {
        transport: {
          type: "TRANSPORT-004",
          total: 3700,
        },
        custom: {
          sediLegalizationFee: 50,
          invoiceValueFOB: 15000,
          internationalFreightCost: 3000,
          taxableBase: 18300,
          importDutyRate: 2196,
          statisticsRate: 549,
          ivaRate: 5757,
          additionalIvaRate: 2878,
          incomeTaxRate: 1098,
          grossIncomeRate: 457.5,
          simFee: 10,
          minimumCustomsDispatchCost: 250,
          customsOperationalCharges: 210,
          optionalElectricalSecurity: 150,
          optionalSenasaFee: 50,
          total: 1150,
        },
        numbering: "COTI 0000000004",
        stage: "Quote Sent",
      },
    ],
  },
  {
    taskNumber: "C75R-0005",
    client: "Inmobiliaria Soluciones SA",
    buyer: "Juan Pérez",
    receptionDate: "2025-01-15",
    uploadDate: "2025-01-16",
    expirationDateTime: "2025-02-15T23:59:59",
    materialsNeededDate: "2025-01-30",
    customerRequestNumber: "REQ-2025-005",
    budgets: [
      {
        transport: {
          type: "TRANSPORT-005",
          total: 3700,
        },
        custom: {
          sediLegalizationFee: 50,
          invoiceValueFOB: 15000,
          internationalFreightCost: 3000,
          taxableBase: 18300,
          importDutyRate: 2196,
          statisticsRate: 549,
          ivaRate: 5757,
          additionalIvaRate: 2878,
          incomeTaxRate: 1098,
          grossIncomeRate: 457.5,
          simFee: 10,
          minimumCustomsDispatchCost: 250,
          customsOperationalCharges: 210,
          optionalElectricalSecurity: 150,
          optionalSenasaFee: 50,
          total: 1150,
        },
        numbering: "COTI 0000000005",
        stage: "Quote Sent",
      },
    ],
  },
];

export default function History() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredQuotations = quotations.filter((quotation) =>
    quotation.taskNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex justify-start w-full h-full flex-col bg-neutral-50">
      <div className="w-full h-auto  rounded-[18px] mb-2 flex-shrink-0">
        <Header
          title="Cotizaciones"
          description="Historial de cotizaciones realizadas"
        />
      </div>
      <div className="w-full px-6 pb-6">
        <div className="flex mb-2 items-center ">
          <div className="flex items-center gap-2 h-14 hover:cursor-pointer">
            <div className="relative w-[12vw]">
              <Search
                size={20}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                className="w-full h-10 rounded-[18px] pl-10 pr-4 bg-white shadow-sm border border-neutral-200  text-md focus:outline-none"
                placeholder="Buscar cotización"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-start mt-2">
            {filteredQuotations.map((cotizacion) => (
              <QuotationCard
                key={cotizacion.customerRequestNumber}
                {...cotizacion}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
