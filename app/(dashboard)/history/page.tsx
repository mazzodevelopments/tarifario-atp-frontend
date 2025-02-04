"use client";

import { Search } from "react-feather";
import Header from "@/app/(dashboard)/components/Header";
import QuotationCard from "./QuotationCard";
import type { QuotationData } from "@/types/QuotationData";
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
    items: [
      {
        numbering: "ITEM-001A",
        family: "Industrial",
        subfamily: "Maquinaria",
        detail: "Maquinaria industrial de alto rendimiento para manufactura",
        brand: "TecnoIndustrial",
        quantity: 3,
        unit: "unidad",
        partNumber: "TI-2025-001A",
      },
      {
        numbering: "ITEM-001B",
        family: "Industrial",
        subfamily: "Herramientas",
        detail: "Set de herramientas de precisión para mantenimiento",
        brand: "PrecisionTools",
        quantity: 5,
        unit: "set",
        partNumber: "PT-2025-001B",
      },
      {
        numbering: "ITEM-001C",
        family: "Industrial",
        subfamily: "Seguridad",
        detail: "Equipos de protección personal para entornos industriales",
        brand: "SafetyFirst",
        quantity: 20,
        unit: "kit",
        partNumber: "SF-2025-001C",
      },
    ],
    budgets: [
      {
        numbering: "COTI 0000000001",
        purchaseData: {
          date: "2025-01-15",
          item: {
            numbering: "ITEM-001A",
            family: "Industrial",
            subfamily: "Maquinaria",
            detail:
              "Maquinaria industrial de alto rendimiento para manufactura",
            brand: "TecnoIndustrial",
            quantity: 3,
            unit: "unidad",
            partNumber: "TI-2025-001A",
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
    client: "Constructora Edificios SA",
    buyer: "María González",
    receptionDate: "2025-01-20",
    uploadDate: "2025-01-21",
    expirationDateTime: "2025-02-20T23:59:59",
    materialsNeededDate: "2025-02-05",
    customerRequestNumber: "REQ-2025-002",
    items: [
      {
        numbering: "ITEM-002A",
        family: "Construcción",
        subfamily: "Materiales",
        detail: "Cemento de alta resistencia",
        brand: "CementoFuerte",
        quantity: 1000,
        unit: "bolsa",
        partNumber: "CF-2025-002A",
      },
      {
        numbering: "ITEM-002B",
        family: "Construcción",
        subfamily: "Herramientas",
        detail: "Mezcladora de concreto industrial",
        brand: "MixMaster",
        quantity: 2,
        unit: "unidad",
        partNumber: "MM-2025-002B",
      },
      {
        numbering: "ITEM-002C",
        family: "Construcción",
        subfamily: "Seguridad",
        detail: "Arneses de seguridad para trabajo en altura",
        brand: "SafetyFirst",
        quantity: 15,
        unit: "unidad",
        partNumber: "SF-2025-002C",
      },
    ],
    budgets: [
      {
        numbering: "COTI 0000000002",
        purchaseData: {
          date: "2025-01-21",
          item: {
            numbering: "ITEM-002A",
            family: "Construcción",
            subfamily: "Materiales",
            detail: "Cemento de alta resistencia",
            brand: "CementoFuerte",
            quantity: 1000,
            unit: "bolsa",
            partNumber: "CF-2025-002A",
          },
          origin: "Hamburgo, Alemania",
          destination: "Buenos Aires, Argentina",
          supplier: "Hamburg Building Materials GmbH",
          currency: "USD",
          unitPrice: 10,
          margin: 0.3,
          appliedUnitPrice: 13,
          deliveryTime: 30,
          unitWeight: 50,
          totalWeight: 50000,
          unit: "kg",
          incoterm: "CIF",
          additionalObservations: "Almacenar en lugar seco",
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
          total: 5000,
        },
        custom: {
          sediLegalizationFee: 50,
          invoiceValueFOB: 10000,
          internationalFreightCost: 5000,
          taxableBase: 15150,
          importDutyRate: 1818,
          statisticsRate: 454.5,
          ivaRate: 4767.225,
          additionalIvaRate: 2383.6125,
          incomeTaxRate: 909,
          grossIncomeRate: 378.75,
          simFee: 10,
          minimumCustomsDispatchCost: 250,
          customsOperationalCharges: 210,
          optionalElectricalSecurity: 0,
          optionalSenasaFee: 0,
          total: 1150,
        },
        destinationExpenses: {
          type: "Entrega Express",
          total: 1200,
        },
        salesData: {
          unitSalePrice: 15,
          margin: 0.15,
          totalPrice: 15000,
          paymentCondition: "30% adelanto, 70% contra entrega",
        },
        stage: "Cotización Enviada",
      },
    ],
  },
  {
    taskNumber: "A25R-0003",
    client: "Electrónica Avanzada SA",
    buyer: "Carlos Rodríguez",
    receptionDate: "2025-02-01",
    uploadDate: "2025-02-02",
    expirationDateTime: "2025-03-02T23:59:59",
    materialsNeededDate: "2025-02-15",
    customerRequestNumber: "REQ-2025-003",
    items: [
      {
        numbering: "ITEM-003A",
        family: "Electrónica",
        subfamily: "Componentes",
        detail: "Microcontroladores de alta velocidad",
        brand: "TechChip",
        quantity: 5000,
        unit: "unidad",
        partNumber: "TC-2025-003A",
      },
      {
        numbering: "ITEM-003B",
        family: "Electrónica",
        subfamily: "Sensores",
        detail: "Sensores de temperatura de precisión",
        brand: "SensorTech",
        quantity: 1000,
        unit: "unidad",
        partNumber: "ST-2025-003B",
      },
      {
        numbering: "ITEM-003C",
        family: "Electrónica",
        subfamily: "Herramientas",
        detail: "Estaciones de soldadura profesionales",
        brand: "SolderPro",
        quantity: 10,
        unit: "unidad",
        partNumber: "SP-2025-003C",
      },
    ],
    budgets: [
      {
        numbering: "COTI 0000000003",
        purchaseData: {
          date: "2025-02-02",
          item: {
            numbering: "ITEM-003A",
            family: "Electrónica",
            subfamily: "Componentes",
            detail: "Microcontroladores de alta velocidad",
            brand: "TechChip",
            quantity: 5000,
            unit: "unidad",
            partNumber: "TC-2025-003A",
          },
          origin: "Taipei, Taiwán",
          destination: "Buenos Aires, Argentina",
          supplier: "Taipei Semiconductor Co.",
          currency: "USD",
          unitPrice: 5,
          margin: 0.2,
          appliedUnitPrice: 6,
          deliveryTime: 20,
          unitWeight: 0.01,
          totalWeight: 50,
          unit: "kg",
          incoterm: "EXW",
          additionalObservations:
            "Componentes sensibles a la electricidad estática",
        },
        originExpenses: {
          pickup: 200,
          repackaging: true,
          palletFumigation: false,
          customExpenses: [
            { name: "Embalaje antiestático", value: 300 },
            { name: "Certificación de origen", value: 150 },
          ],
          total: 650,
        },
        transport: {
          type: "TRANSPORTE-003",
          total: 2500,
        },
        custom: {
          sediLegalizationFee: 50,
          invoiceValueFOB: 25000,
          internationalFreightCost: 2500,
          taxableBase: 27750,
          importDutyRate: 3330,
          statisticsRate: 832.5,
          ivaRate: 8734.125,
          additionalIvaRate: 4367.0625,
          incomeTaxRate: 1665,
          grossIncomeRate: 693.75,
          simFee: 10,
          minimumCustomsDispatchCost: 250,
          customsOperationalCharges: 210,
          optionalElectricalSecurity: 150,
          optionalSenasaFee: 0,
          total: 1150,
        },
        destinationExpenses: {
          type: "Entrega Estándar",
          total: 500,
        },
        salesData: {
          unitSalePrice: 7,
          margin: 0.17,
          totalPrice: 35000,
          paymentCondition: "50% adelanto, 50% a 30 días",
        },
        stage: "Cotización Enviada",
      },
    ],
  },
  {
    taskNumber: "A25R-0004",
    client: "Hospital Metropolitano",
    buyer: "Ana Martínez",
    receptionDate: "2025-02-10",
    uploadDate: "2025-02-11",
    expirationDateTime: "2025-03-10T23:59:59",
    materialsNeededDate: "2025-02-25",
    customerRequestNumber: "REQ-2025-004",
    items: [
      {
        numbering: "ITEM-004A",
        family: "Médico",
        subfamily: "Diagnóstico",
        detail: "Resonador magnético de última generación",
        brand: "MediTech",
        quantity: 1,
        unit: "unidad",
        partNumber: "MT-2025-004A",
      },
      {
        numbering: "ITEM-004B",
        family: "Médico",
        subfamily: "Mobiliario",
        detail: "Camas de hospital eléctricas",
        brand: "ComfortCare",
        quantity: 50,
        unit: "unidad",
        partNumber: "CC-2025-004B",
      },
      {
        numbering: "ITEM-004C",
        family: "Médico",
        subfamily: "Insumos",
        detail: "Kit de insumos quirúrgicos desechables",
        brand: "SurgicalPro",
        quantity: 1000,
        unit: "kit",
        partNumber: "SP-2025-004C",
      },
    ],
    budgets: [
      {
        numbering: "COTI 0000000004",
        purchaseData: {
          date: "2025-02-11",
          item: {
            numbering: "ITEM-004A",
            family: "Médico",
            subfamily: "Diagnóstico",
            detail: "Resonador magnético de última generación",
            brand: "MediTech",
            quantity: 1,
            unit: "unidad",
            partNumber: "MT-2025-004A",
          },
          origin: "Boston, Estados Unidos",
          destination: "Buenos Aires, Argentina",
          supplier: "MediTech International",
          currency: "USD",
          unitPrice: 1500000,
          margin: 0.15,
          appliedUnitPrice: 1725000,
          deliveryTime: 90,
          unitWeight: 10000,
          totalWeight: 10000,
          unit: "kg",
          incoterm: "DDP",
          additionalObservations:
            "Equipo médico de alta complejidad, requiere instalación especializada",
        },
        originExpenses: {
          pickup: 5000,
          repackaging: false,
          palletFumigation: false,
          customExpenses: [
            { name: "Embalaje especial", value: 10000 },
            { name: "Certificación FDA", value: 5000 },
          ],
          total: 20000,
        },
        transport: {
          type: "TRANSPORTE-004",
          total: 50000,
        },
        custom: {
          sediLegalizationFee: 50,
          invoiceValueFOB: 1500000,
          internationalFreightCost: 50000,
          taxableBase: 1565000,
          importDutyRate: 187800,
          statisticsRate: 46950,
          ivaRate: 492757.5,
          additionalIvaRate: 246378.75,
          incomeTaxRate: 93900,
          grossIncomeRate: 39125,
          simFee: 10,
          minimumCustomsDispatchCost: 12520,
          customsOperationalCharges: 210,
          optionalElectricalSecurity: 150,
          optionalSenasaFee: 0,
          total: 1150000,
        },
        destinationExpenses: {
          type: "Entrega e Instalación Especializada",
          total: 25000,
        },
        salesData: {
          unitSalePrice: 2000000,
          margin: 0.16,
          totalPrice: 2000000,
          paymentCondition: "30% adelanto, 40% al embarque, 30% contra entrega",
        },
        stage: "Cotización Enviada",
      },
    ],
  },
  {
    taskNumber: "A25R-0005",
    client: "Automotriz del Sur",
    buyer: "Roberto Gómez",
    receptionDate: "2025-02-20",
    uploadDate: "2025-02-21",
    expirationDateTime: "2025-03-20T23:59:59",
    materialsNeededDate: "2025-03-05",
    customerRequestNumber: "REQ-2025-005",
    items: [
      {
        numbering: "ITEM-005A",
        family: "Automotriz",
        subfamily: "Motores",
        detail: "Motor eléctrico de alto rendimiento",
        brand: "ElectroDrive",
        quantity: 100,
        unit: "unidad",
        partNumber: "ED-2025-005A",
      },
      {
        numbering: "ITEM-005B",
        family: "Automotriz",
        subfamily: "Baterías",
        detail: "Baterías de litio de larga duración",
        brand: "LithiumPower",
        quantity: 200,
        unit: "unidad",
        partNumber: "LP-2025-005B",
      },
      {
        numbering: "ITEM-005C",
        family: "Automotriz",
        subfamily: "Electrónica",
        detail: "Sistema de control de tracción",
        brand: "TractionTech",
        quantity: 100,
        unit: "kit",
        partNumber: "TT-2025-005C",
      },
    ],
    budgets: [
      {
        numbering: "COTI 0000000005",
        purchaseData: {
          date: "2025-02-21",
          item: {
            numbering: "ITEM-005A",
            family: "Automotriz",
            subfamily: "Motores",
            detail: "Motor eléctrico de alto rendimiento",
            brand: "ElectroDrive",
            quantity: 100,
            unit: "unidad",
            partNumber: "ED-2025-005A",
          },
          origin: "Stuttgart, Alemania",
          destination: "Buenos Aires, Argentina",
          supplier: "ElectroDrive GmbH",
          currency: "USD",
          unitPrice: 5000,
          margin: 0.2,
          appliedUnitPrice: 6000,
          deliveryTime: 60,
          unitWeight: 100,
          totalWeight: 10000,
          unit: "kg",
          incoterm: "FCA",
          additionalObservations:
            "Motores requieren embalaje especial anti-vibración",
        },
        originExpenses: {
          pickup: 2000,
          repackaging: true,
          palletFumigation: true,
          customExpenses: [
            { name: "Embalaje anti-vibración", value: 5000 },
            { name: "Certificación de origen", value: 1000 },
          ],
          total: 8000,
        },
        transport: {
          type: "TRANSPORTE-005",
          total: 15000,
        },
        custom: {
          sediLegalizationFee: 50,
          invoiceValueFOB: 500000,
          internationalFreightCost: 15000,
          taxableBase: 520000,
          importDutyRate: 62400,
          statisticsRate: 15600,
          ivaRate: 163800,
          additionalIvaRate: 81900,
          incomeTaxRate: 31200,
          grossIncomeRate: 13000,
          simFee: 10,
          minimumCustomsDispatchCost: 4160,
          customsOperationalCharges: 210,
          optionalElectricalSecurity: 150,
          optionalSenasaFee: 0,
          total: 380000,
        },
        destinationExpenses: {
          type: "Entrega en planta",
          total: 5000,
        },
        salesData: {
          unitSalePrice: 7000,
          margin: 0.17,
          totalPrice: 700000,
          paymentCondition: "40% adelanto, 60% contra entrega",
        },
        stage: "Cotización Enviada",
      },
    ],
  },
];

export { quotations };

export default function History() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredQuotations = quotations.filter((quotation) =>
    quotation.taskNumber.toLowerCase().includes(searchTerm.toLowerCase()),
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
