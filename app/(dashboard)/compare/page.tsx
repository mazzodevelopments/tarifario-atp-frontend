"use client";

import React, { useState } from "react";
import Header from "@/app/(dashboard)/components/Header";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface Transport {
  id: string;
  edcadassaStayCostPerDay: number;
  edcadassaStayDuration: number;
  edcadassaTotal: number;
  internationalFreightCost: number;
  internationalInsurance: number;
  administrativeCharges: number;
  airwayBillCuttingFee: number;
  total: number;
}

export interface Custom {
  id: string;
  sediLegalizationFee: number;
  invoiceValueFOB: number;
  internationalFreightCost: number;
  taxableBase: number;
  importDutyRate: number;
  statisticsRate: number;
  ivaRate: number;
  additionalIvaRate: number;
  incomeTaxRate: number;
  grossIncomeRate: number;
  simFee: number;
  minimumCustomsDispatchCost: number;
  customsOperationalCharges: number;
  optionalElectricalSecurity: number;
  optionalSenasaFee: number;
  total: number;
}

export interface Delivery {
  total: number;
}

export interface Budget {
  id: string;
  date: string;
  item: string;
  origin: string;
  destination: string;
  supplier: string;
  deliveryTime: number;
  unitPrice: number;
  currency: string;
  margin: number;
  totalPrice: number;
  unitWeight: number;
  totalWeight: number;
  unit: string;
  incoterm: string;
  transport: Transport | null;
  custom: Custom | null;
  delivery: Delivery | null;
  numbering: string;
  stage: string;
}

export interface Quote {
  taskNumber: string;
  client: string;
  buyer: string;
  receptionDate: string;
  uploadDate: string;
  expirationDateTime: string;
  materialsNeededDate: string;
  customerRequestNumber: string;
  atpInternRequestNumber: string;
  budgets: Budget[];
}

const QuoteComparison = () => {
  const quotes = [
    {
      taskNumber: "A25R-0001",
      client: "Inmobiliaria Soluciones SA",
      buyer: "Juan Pérez",
      receptionDate: "2025-01-15",
      uploadDate: "2025-01-16",
      expirationDateTime: "2025-02-15T23:59:59",
      materialsNeededDate: "2025-01-30",
      customerRequestNumber: "REQ-2025-001",
      atpInternRequestNumber: "ATP-INT-9001",
      budgets: [
        {
          id: "1",
          date: "2025-01-17",
          item: "Motor eléctrico",
          origin: "China",
          destination: "Argentina",
          supplier: "China Steel Corp",
          deliveryTime: 20,
          unitPrice: 1500,
          currency: "USD",
          margin: 0.1,
          totalPrice: 1650,
          unitWeight: 50,
          totalWeight: 1000,
          unit: "kg",
          incoterm: "CIP",
          transport: {
            id: "TRANSPORT-001",
            edcadassaStayCostPerDay: 70,
            edcadassaStayDuration: 3,
            edcadassaTotal: 210,
            internationalFreightCost: 3000,
            internationalInsurance: 60,
            administrativeCharges: 200,
            airwayBillCuttingFee: 50,
            total: 3700,
          },
          custom: {
            id: "CUSTOM-001",
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
          delivery: null,
          numbering: "COTI 0000000001",
          stage: "Quote Sent",
        },
        {
          id: "2",
          date: "2025-01-12",
          item: "Bomba hidráulica",
          origin: "Alemania",
          destination: "Argentina",
          supplier: "EuroMetal GmbH",
          deliveryTime: 15,
          unitPrice: 250,
          currency: "USD",
          margin: 0.15,
          totalPrice: 287.5,
          unitWeight: 10,
          totalWeight: 500,
          unit: "kg",
          incoterm: "FOB",
          transport: null,
          custom: null,
          delivery: {
            total: 300,
          },
          numbering: "COTI 0000000002",
          stage: "Quote Sent",
        },
      ],
    },
    {
      taskNumber: "A25R-0001 (V2)",
      client: "Inmobiliaria Soluciones SA",
      buyer: "Juan Pérez",
      receptionDate: "2025-01-15",
      uploadDate: "2025-01-16",
      expirationDateTime: "2025-02-15T23:59:59",
      materialsNeededDate: "2025-02-15",
      customerRequestNumber: "REQ-2025-001",
      atpInternRequestNumber: "ATP-INT-9001",
      budgets: [
        {
          id: "1",
          date: "2025-01-17",
          item: "Motor eléctrico",
          origin: "China",
          destination: "Argentina",
          supplier: "China Steel Corp",
          deliveryTime: 25,
          unitPrice: 1500,
          currency: "USD",
          margin: 0.1,
          totalPrice: 1650,
          unitWeight: 50,
          totalWeight: 1000,
          unit: "kg",
          incoterm: "CIP",
          transport: {
            id: "TRANSPORT-001",
            edcadassaStayCostPerDay: 70,
            edcadassaStayDuration: 5,
            edcadassaTotal: 350,
            internationalFreightCost: 3200,
            internationalInsurance: 60,
            administrativeCharges: 200,
            airwayBillCuttingFee: 50,
            total: 4000,
          },
          custom: {
            id: "CUSTOM-001",
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
          delivery: null,
          numbering: "COTI 0000000001",
          stage: "Quote Sent",
        },
        {
          id: "2",
          date: "2025-01-12",
          item: "Bomba hidráulica",
          origin: "Alemania",
          destination: "Argentina",
          supplier: "EuroMetal GmbH",
          deliveryTime: 15,
          unitPrice: 250,
          currency: "USD",
          margin: 0.15,
          totalPrice: 287.5,
          unitWeight: 10,
          totalWeight: 500,
          unit: "kg",
          incoterm: "FOB",
          transport: null,
          custom: null,
          delivery: {
            total: 300,
          },
          numbering: "COTI 0000000002",
          stage: "Quote Sent",
        },
      ],
    },
  ];
  const [leftQuote, setLeftQuote] = useState<Quote | null>(null);
  const [rightQuote, setRightQuote] = useState<Quote | null>(null);

  const calculateBudgetTotal = (budget: Budget): number => {
    let total = budget.totalPrice;
    if (budget.transport) {
      total += budget.transport.total;
    }
    if (budget.custom) {
      total += budget.custom.total;
    }
    if (budget.delivery) {
      total += budget.delivery.total;
    }
    return total;
  };

  const calculateQuoteTotal = (quote: Quote): number => {
    return quote.budgets.reduce(
      (acc, budget) => acc + calculateBudgetTotal(budget),
      0
    );
  };

  const compareValues = (
    key: string,
    value1: string | number,
    value2: string | number
  ) => {
    if (value1 === value2) return false;
    return true;
  };

  const renderComparisonRow = (
    label: string,
    value1: string | number,
    value2: string | number
  ) => {
    const hasChanged = compareValues(label, value1, value2);
    return (
      <TableRow>
        <TableCell className="font-medium w-1/3">{label}</TableCell>
        <TableCell className={`w-1/3 ${hasChanged ? "text-red-600" : ""}`}>
          {value1}
        </TableCell>
        <TableCell className={`w-1/3 ${hasChanged ? "text-green-600" : ""}`}>
          {value2}
        </TableCell>
      </TableRow>
    );
  };

  const renderBudgetComparison = (leftBudget: Budget, rightBudget: Budget) => {
    const leftTotal = calculateBudgetTotal(leftBudget);
    const rightTotal = calculateBudgetTotal(rightBudget);

    return (
      <div
        key={leftBudget.id}
        className="bg-gray-50 p-6 rounded-lg border border-neutral-200 shadow-sm mb-6"
      >
        <h4 className="font-semibold mb-4 text-lg">{leftBudget.numbering}</h4>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/3">Campo</TableHead>
              <TableHead className="w-1/3">Original</TableHead>
              <TableHead className="w-1/3">Final</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {renderComparisonRow("Fecha", leftBudget.date, rightBudget.date)}
            {renderComparisonRow("Artículo", leftBudget.item, rightBudget.item)}
            {renderComparisonRow(
              "Origen",
              leftBudget.origin,
              rightBudget.origin
            )}
            {renderComparisonRow(
              "Destino",
              leftBudget.destination,
              rightBudget.destination
            )}
            {renderComparisonRow(
              "Proveedor",
              leftBudget.supplier,
              rightBudget.supplier
            )}
            {renderComparisonRow(
              "Tiempo de entrega",
              `${leftBudget.deliveryTime} días`,
              `${rightBudget.deliveryTime} días`
            )}
            {renderComparisonRow(
              "Precio unitario",
              `${leftBudget.currency} ${leftBudget.unitPrice}`,
              `${rightBudget.currency} ${rightBudget.unitPrice}`
            )}
            {renderComparisonRow(
              "Margen",
              `${leftBudget.margin * 100}%`,
              `${rightBudget.margin * 100}%`
            )}
            {renderComparisonRow(
              "Precio total",
              `${leftBudget.currency} ${leftBudget.totalPrice}`,
              `${rightBudget.currency} ${rightBudget.totalPrice}`
            )}
            {renderComparisonRow(
              "Peso unitario",
              `${leftBudget.unitWeight} ${leftBudget.unit}`,
              `${rightBudget.unitWeight} ${leftBudget.unit}`
            )}
            {renderComparisonRow(
              "Peso total",
              `${leftBudget.totalWeight} ${leftBudget.unit}`,
              `${rightBudget.totalWeight} ${leftBudget.unit}`
            )}
            {renderComparisonRow(
              "Incoterm",
              leftBudget.incoterm,
              rightBudget.incoterm
            )}
          </TableBody>
        </Table>

        {/* Transport comparison */}
        {(leftBudget.transport || rightBudget.transport) && (
          <>
            <h5 className="font-semibold mt-6 mb-3 text-md">Transporte</h5>
            <Table>
              <TableBody>
                {renderComparisonRow(
                  "Costo estadía Edcadassa por día",
                  leftBudget.transport?.edcadassaStayCostPerDay || "N/A",
                  rightBudget.transport?.edcadassaStayCostPerDay || "N/A"
                )}
                {renderComparisonRow(
                  "Duración estadía Edcadassa",
                  leftBudget.transport?.edcadassaStayDuration || "N/A",
                  rightBudget.transport?.edcadassaStayDuration || "N/A"
                )}
                {renderComparisonRow(
                  "Total Edcadassa",
                  leftBudget.transport?.edcadassaTotal || "N/A",
                  rightBudget.transport?.edcadassaTotal || "N/A"
                )}
                {renderComparisonRow(
                  "Flete internacional",
                  leftBudget.transport?.internationalFreightCost || "N/A",
                  rightBudget.transport?.internationalFreightCost || "N/A"
                )}
                {renderComparisonRow(
                  "Total transporte",
                  leftBudget.transport?.total || "N/A",
                  rightBudget.transport?.total || "N/A"
                )}
              </TableBody>
            </Table>
          </>
        )}

        {/* Customs comparison */}
        {(leftBudget.custom || rightBudget.custom) && (
          <>
            <h5 className="font-semibold mt-6 mb-3 text-md">Aduana</h5>
            <Table>
              <TableBody>
                {renderComparisonRow(
                  "Base imponible",
                  leftBudget.custom?.taxableBase || "N/A",
                  rightBudget.custom?.taxableBase || "N/A"
                )}
                {renderComparisonRow(
                  "Tasa de importación",
                  leftBudget.custom?.importDutyRate || "N/A",
                  rightBudget.custom?.importDutyRate || "N/A"
                )}
                {renderComparisonRow(
                  "Tasa estadística",
                  leftBudget.custom?.statisticsRate || "N/A",
                  rightBudget.custom?.statisticsRate || "N/A"
                )}
                {renderComparisonRow(
                  "Total aduana",
                  leftBudget.custom?.total || "N/A",
                  rightBudget.custom?.total || "N/A"
                )}
              </TableBody>
            </Table>
          </>
        )}

        {/* DestinationExpenses comparison */}
        {(leftBudget.delivery || rightBudget.delivery) && (
          <>
            <h5 className="font-semibold mt-6 mb-3 text-md">Entrega</h5>
            <Table>
              <TableBody>
                {renderComparisonRow(
                  "Total entrega",
                  leftBudget.delivery?.total || "N/A",
                  rightBudget.delivery?.total || "N/A"
                )}
              </TableBody>
            </Table>
          </>
        )}

        {/* Budget Total */}
        <div className="mt-6 pt-4 border-t-2 border-gray-300">
          <Table>
            <TableBody>
              {renderComparisonRow(
                "Total del Presupuesto",
                `${leftBudget.currency} ${leftTotal.toFixed(2)}`,
                `${rightBudget.currency} ${rightTotal.toFixed(2)}`
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  };

  return (
    <div className="flex justify-start w-full h-full flex-col bg-transparent">
      <Header
        title="Comparar"
        description="Sección para comparar cotizaciones"
      />
      <div className="flex w-full h-full p-6">
        <div className="flex flex-col gap-6 w-full h-full p-6 border border-neutral-200 shadow-sm bg-white rounded-[18px]">
          <div className="flex flex-col w-full h-full">
            <div className="flex gap-4 mb-6">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cotización Original
                </label>
                <select
                  className="w-full p-2 border rounded-lg"
                  onChange={(e) =>
                    setLeftQuote(
                      quotes.find((q) => q.taskNumber === e.target.value) ||
                        null
                    )
                  }
                  value={leftQuote?.taskNumber || ""}
                >
                  <option value="">Seleccionar cotización</option>
                  {quotes.map((quote, index) => (
                    <option
                      key={`left-${quote.taskNumber}-${index}`}
                      value={quote.taskNumber}
                    >
                      {quote.taskNumber} - {quote.client}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cotización Final
                </label>
                <select
                  className="w-full p-2 border rounded-lg"
                  onChange={(e) =>
                    setRightQuote(
                      quotes.find((q) => q.taskNumber === e.target.value) ||
                        null
                    )
                  }
                  value={rightQuote?.taskNumber || ""}
                >
                  <option value="">Seleccionar cotización</option>
                  {quotes.map((quote, index) => (
                    <option
                      key={`right-${quote.taskNumber}-${index}`}
                      value={quote.taskNumber}
                    >
                      {quote.taskNumber} - {quote.client}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {leftQuote && rightQuote && (
              <ScrollArea className="flex-1">
                <div className="bg-white rounded-lg shadow-sm mb-6">
                  <h3 className="text-xl font-semibold mb-4">
                    Información General
                  </h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-1/3">Campo</TableHead>
                        <TableHead className="w-1/3">Original</TableHead>
                        <TableHead className="w-1/3">Final</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {renderComparisonRow(
                        "Número de tarea",
                        leftQuote.taskNumber,
                        rightQuote.taskNumber
                      )}
                      {renderComparisonRow(
                        "Cliente",
                        leftQuote.client,
                        rightQuote.client
                      )}
                      {renderComparisonRow(
                        "Comprador",
                        leftQuote.buyer,
                        rightQuote.buyer
                      )}
                      {renderComparisonRow(
                        "Fecha de recepción",
                        leftQuote.receptionDate,
                        rightQuote.receptionDate
                      )}
                      {renderComparisonRow(
                        "Fecha de carga",
                        leftQuote.uploadDate,
                        rightQuote.uploadDate
                      )}
                      {renderComparisonRow(
                        "Fecha de vencimiento",
                        leftQuote.expirationDateTime,
                        rightQuote.expirationDateTime
                      )}
                      {renderComparisonRow(
                        "Fecha necesaria de materiales",
                        leftQuote.materialsNeededDate,
                        rightQuote.materialsNeededDate
                      )}
                      {renderComparisonRow(
                        "Número de solicitud del cliente",
                        leftQuote.customerRequestNumber,
                        rightQuote.customerRequestNumber
                      )}
                      {renderComparisonRow(
                        "Número de solicitud ATP Intern",
                        leftQuote.atpInternRequestNumber,
                        rightQuote.atpInternRequestNumber
                      )}
                    </TableBody>
                  </Table>

                  {/* Quote Total */}
                  <div className="mt-6 pt-4 border-t-2 border-gray-300">
                    <Table>
                      <TableBody>
                        {renderComparisonRow(
                          "Total de la Cotización",
                          `USD ${calculateQuoteTotal(leftQuote).toFixed(2)}`,
                          `USD ${calculateQuoteTotal(rightQuote).toFixed(2)}`
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>

                <h3 className="text-xl font-semibold mb-4">Presupuestos</h3>
                {leftQuote.budgets.map((leftBudget) => {
                  const rightBudget = rightQuote.budgets.find(
                    (b) => b.id === leftBudget.id
                  );
                  if (rightBudget) {
                    return renderBudgetComparison(leftBudget, rightBudget);
                  }
                  return null;
                })}
              </ScrollArea>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteComparison;
