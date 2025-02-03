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
        numbering: "COTI 0000000001",
        purchaseData: {
          date: "2025-01-15",
          item: {
            numbering: "ITEM-001",
            family: "Industrial",
            subfamily: "Maquinaria",
            detail:
              "Maquinaria industrial de alto rendimiento para manufactura",
            brand: "TecnoIndustrial",
            quantity: 3,
            unit: "unidad",
            partNumber: "TI-2025-001",
          },
          origin: "Shanghai, China",
          destination: "Buenos Aires, Argentina",
          supplier: "Shanghai Industrial Co., Ltd",
          currency: "USD",
          unitPrice: 5000,
          margin: 0.25,
          appliedUnitPrice: 6250,
          deliveryTime: 45,
          unitWeight: 500,
          totalWeight: 1500,
          unit: "kg",
          incoterm: "FOB",
          additionalObservations: "Manipular con cuidado, equipo sensible",
        },
        originExpenses: {
          pickup: 300,
          repackaging: true,
          palletFumigation: true,
          customExpenses: [
            { name: "Documentación", value: 150 },
            { name: "Manipulación Especial", value: 200 },
          ],
          total: 650,
        },
        transport: {
          type: "TRANSPORTE-001",
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
        destinationExpenses: {
          type: "Entrega Local",
          total: 800,
        },
        salesData: {
          unitSalePrice: 7500,
          margin: 0.2,
          totalPrice: 22500,
          paymentCondition: "50% adelanto, 50% contra entrega",
        },
        stage: "Cotización Enviada",
      },
    ],
  },
  {
    taskNumber: "A25R-0002",
    client: "Inmobiliaria Soluciones SA",
    buyer: "Juan Pérez",
    receptionDate: "2025-01-15",
    uploadDate: "2025-01-16",
    expirationDateTime: "2025-02-15T23:59:59",
    materialsNeededDate: "2025-01-30",
    customerRequestNumber: "REQ-2025-002",
    budgets: [
      {
        numbering: "COTI 0000000002",
        purchaseData: {
          date: "2025-01-15",
          item: {
            numbering: "ITEM-002",
            family: "Construcción",
            subfamily: "Materiales",
            detail:
              "Materiales de construcción de alta calidad para edificios comerciales",
            brand: "ConstruMaster",
            quantity: 5,
            unit: "conjunto",
            partNumber: "CM-2025-002",
          },
          origin: "Hamburgo, Alemania",
          destination: "Buenos Aires, Argentina",
          supplier: "Hamburg Building Materials GmbH",
          currency: "USD",
          unitPrice: 4500,
          margin: 0.3,
          appliedUnitPrice: 5850,
          deliveryTime: 30,
          unitWeight: 750,
          totalWeight: 2250,
          unit: "kg",
          incoterm: "CIF",
          additionalObservations: "Materiales sensibles a la temperatura",
        },
        originExpenses: {
          pickup: 400,
          repackaging: false,
          palletFumigation: true,
          customExpenses: [
            { name: "Documentación de Exportación", value: 180 },
            { name: "Inspección de Calidad", value: 250 },
          ],
          total: 830,
        },
        transport: {
          type: "TRANSPORTE-002",
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
        destinationExpenses: {
          type: "Entrega Express",
          total: 950,
        },
        salesData: {
          unitSalePrice: 7000,
          margin: 0.25,
          totalPrice: 21000,
          paymentCondition: "30% adelanto, 70% contra entrega",
        },
        stage: "Cotización Enviada",
      },
    ],
  },
  {
    taskNumber: "A25R-0003",
    client: "Inmobiliaria Soluciones SA",
    buyer: "Juan Pérez",
    receptionDate: "2025-01-15",
    uploadDate: "2025-01-16",
    expirationDateTime: "2025-02-15T23:59:59",
    materialsNeededDate: "2025-01-30",
    customerRequestNumber: "REQ-2025-003",
    budgets: [
      {
        numbering: "COTI 0000000003",
        purchaseData: {
          date: "2025-01-15",
          item: {
            numbering: "ITEM-003",
            family: "Electrónica",
            subfamily: "Componentes",
            detail:
              "Componentes electrónicos de precisión para automatización industrial",
            brand: "ElectroCore",
            quantity: 100,
            unit: "pieza",
            partNumber: "EC-2025-003",
          },
          origin: "Seúl, Corea del Sur",
          destination: "Buenos Aires, Argentina",
          supplier: "Seoul Electronics Corp.",
          currency: "USD",
          unitPrice: 3800,
          margin: 0.28,
          appliedUnitPrice: 4864,
          deliveryTime: 25,
          unitWeight: 200,
          totalWeight: 600,
          unit: "kg",
          incoterm: "EXW",
          additionalObservations: "Componentes electrónicos frágiles",
        },
        originExpenses: {
          pickup: 250,
          repackaging: true,
          palletFumigation: false,
          customExpenses: [
            { name: "Embalaje Especial", value: 300 },
            { name: "Seguro", value: 200 },
          ],
          total: 750,
        },
        transport: {
          type: "TRANSPORTE-003",
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
        destinationExpenses: {
          type: "Entrega Premium",
          total: 1100,
        },
        salesData: {
          unitSalePrice: 6500,
          margin: 0.22,
          totalPrice: 19500,
          paymentCondition: "100% pago anticipado",
        },
        stage: "Cotización Enviada",
      },
    ],
  },
  {
    taskNumber: "A25R-0004",
    client: "Inmobiliaria Soluciones SA",
    buyer: "Juan Pérez",
    receptionDate: "2025-01-15",
    uploadDate: "2025-01-16",
    expirationDateTime: "2025-02-15T23:59:59",
    materialsNeededDate: "2025-01-30",
    customerRequestNumber: "REQ-2025-004",
    budgets: [
      {
        numbering: "COTI 0000000004",
        purchaseData: {
          date: "2025-01-15",
          item: {
            numbering: "ITEM-004",
            family: "Médico",
            subfamily: "Equipamiento",
            detail:
              "Dispositivos médicos de diagnóstico avanzado con sensores de precisión",
            brand: "MedTech",
            quantity: 2,
            unit: "sistema",
            partNumber: "MT-2025-004",
          },
          origin: "Boston, Estados Unidos",
          destination: "Buenos Aires, Argentina",
          supplier: "Boston Medical Technologies Inc.",
          currency: "USD",
          unitPrice: 6200,
          margin: 0.32,
          appliedUnitPrice: 8184,
          deliveryTime: 35,
          unitWeight: 300,
          totalWeight: 900,
          unit: "kg",
          incoterm: "DDP",
          additionalObservations:
            "Equipo médico, requiere manipulación especial",
        },
        originExpenses: {
          pickup: 450,
          repackaging: true,
          palletFumigation: true,
          customExpenses: [
            { name: "Certificación Médica", value: 400 },
            { name: "Control de Temperatura", value: 350 },
          ],
          total: 1200,
        },
        transport: {
          type: "TRANSPORTE-004",
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
        destinationExpenses: {
          type: "Transporte Médico Especializado",
          total: 1500,
        },
        salesData: {
          unitSalePrice: 9000,
          margin: 0.3,
          totalPrice: 27000,
          paymentCondition: "40% adelanto, 60% contra inspección",
        },
        stage: "Cotización Enviada",
      },
    ],
  },
  {
    taskNumber: "A25R-0005",
    client: "Inmobiliaria Soluciones SA",
    buyer: "Juan Pérez",
    receptionDate: "2025-01-15",
    uploadDate: "2025-01-16",
    expirationDateTime: "2025-02-15T23:59:59",
    materialsNeededDate: "2025-01-30",
    customerRequestNumber: "REQ-2025-005",
    budgets: [
      {
        numbering: "COTI 0000000005",
        purchaseData: {
          date: "2025-01-15",
          item: {
            numbering: "ITEM-005",
            family: "Automotriz",
            subfamily: "Repuestos",
            detail:
              "Componentes automotrices de alto rendimiento para vehículos de lujo",
            brand: "AutoElite",
            quantity: 50,
            unit: "conjunto",
            partNumber: "AE-2025-005",
          },
          origin: "Turín, Italia",
          destination: "Buenos Aires, Argentina",
          supplier: "Turin Auto Parts SpA",
          currency: "USD",
          unitPrice: 4200,
          margin: 0.27,
          appliedUnitPrice: 5334,
          deliveryTime: 40,
          unitWeight: 400,
          totalWeight: 1200,
          unit: "kg",
          incoterm: "FCA",
          additionalObservations: "Piezas certificadas OEM",
        },
        originExpenses: {
          pickup: 350,
          repackaging: false,
          palletFumigation: true,
          customExpenses: [
            { name: "Pruebas de Calidad", value: 280 },
            { name: "Licencia de Exportación", value: 220 },
          ],
          total: 850,
        },
        transport: {
          type: "TRANSPORTE-005",
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
        destinationExpenses: {
          type: "Entrega Estándar",
          total: 900,
        },
        salesData: {
          unitSalePrice: 6800,
          margin: 0.24,
          totalPrice: 20400,
          paymentCondition: "60% adelanto, 40% contra entrega",
        },
        stage: "Cotización Enviada",
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
