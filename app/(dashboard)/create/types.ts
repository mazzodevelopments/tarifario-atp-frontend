export interface Item {
  id: string;
  detail: string;
  brand: string;
  quantity: number;
  unit: string;
  partNumber: string;
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
  currency: number;
  margin: number;
  totalPrice: number;
  unitWeight: number;
  totalWeight: number;
  unit: string;
  incoterm: string;
}

export interface Transport {
  id: string;
  via: string;
  pickUp: boolean;
  pickUpPrice: number;
  repackaging: boolean;
  fumigation: boolean;
}

/*** DESTINO – MARÍTIMO -TERRESTRE ***/
export interface AirportFreightCourier {
  edcadassaStayCost: number; // ESTADÍA EN EDCADASSA SON USD 70 X DÍA
  internationalFreightCost: number;
  internationalInsurance: number; // PORCENTAJE DESDE 0,4% a 1%
  administrativeCharges: number;
  airwayBillCuttingFee: number;
}

/*** DESTINO – MARÍTIMO -TERRESTRE ***/
// PUERTO
export interface PortBondedWarehouse {
  transferToCustomsWarehouse: number;
  deconsolidation: number;
  movement: number;
  administrativeCharges: number;
  electronicSeal: number;
  emptyContainerReturnBeforeDeadline: number;
  lateReturnFee: number; // 12 USD X DÍA DESDE EL PRIMER DÍA
  storageDays: number;
  containerCleaning: number;
  optionalCustody: number;
  senasaVerification: number;
}

// FORWARDER
export interface ForwarderInternationalFreight {
  originCharges: number;
  internationalFreightCost: number;
  agpFee: number; // AGP (General Port Administration) fee
  localCharges: number;
  deconsolidationFee: number;
  billOfLadingPayment: number;
  providerPriceList: Record<string, number>;
}

/*** ADUANA ***/
export interface Custom {
  sediLegalizationFee: number; // USD 50
  invoiceValueFOB: number; //
  internationalFreightValue: number; // VALOR DEL PASO ANTERIOR
  insuranceValue: number; // 1%
  taxableBase: number; // BASE IMPONIBLE
  importDutyRate: number; // DERECHOS DE IMPORTACIÓN
  statisticsRate: number; // 3%
  ivaBase: number; // DERECHOS + ESTADISITCAS
  ivaRate: number; // VAT rate (21%)
  additionalIvaRate: number; // Additional VAT rate (10.5%)
  incomeTaxRate: number; // 6%
  grossIncomeRate: number; // 2.5%
  simFee: number; // USD 10
  minimumCustomsDispatchCost: number; // Minimum customs dispatch cost (USD 250 or 0.8% of CIF value)
  cifValue: number; // CIF value (INVOICE + INTERNATIONAL FREIGHT + INSURANCE)
  customsOperationalCharges: number; // Operational charges (USD 210)
  optionalElectricalSecurity: number; //  USD 150
  optionalSenasaFee: number; // USD 50
}

/*** ENTREGA ***/
export interface InternalFreightLogistics {
  internalFreightCost: number;
}
