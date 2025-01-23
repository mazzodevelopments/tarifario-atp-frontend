import { Search } from "react-feather";
import Header from "@/app/(dashboard)/components/Header";
import QuotationCard from "./QuotationCard";
import { QuotationData } from "@/types/QuotationData";

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
    atpInternRequestNumber: "ATP-INT-9001",
    budgets: [
      {
        id: "BUD-001",
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
        numbering: "NUM-001",
        stage: "Quote Sent",
      },
      {
        id: "BUD-002",
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
        numbering: "NUM-002",
        stage: "Quote Sent",
      },
    ],
  },
];

export default function History() {
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
                className="w-full h-[2.25vw] rounded-[18px] pl-10 pr-4 bg-white shadow-sm border border-neutral-200  text-md focus:outline-none"
                placeholder="Buscar cotización"
              />
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-start mt-2">
            {quotations.map((cotizacion) => (
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
