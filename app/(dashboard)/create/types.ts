export interface QuotationData {
  name: string;
  client: string;
  buyer: string;
  receptionDate: string;
  uploadDate: string;
  expirationDateTime: string;
  materialsNeededDate: string;
  customerRequestNumber: string;
  atpInternRequestNumber: string;
}

export interface Item {
  id: string;
  family: string;
  subfamily: string;
  detail: string;
  brand: string;
  quantity: number;
  unit: string;
  partNumber: string;
  numbering: string;
  stage: string;
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
  transport: AirportFreightCourier | PortBondedWarehouse | null;
  custom: Custom | null;
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
  id: string;
  edcadassaStayCostPerDay: number; // ESTADÍA EN EDCADASSA SON USD 70 X DÍA
  edcadassaStayDuration: number;
  internationalFreightCost: number;
  internationalInsurance: number; // PORCENTAJE DESDE 0,4% a 1%
  administrativeCharges: number;
  airwayBillCuttingFee: number;
  total: number;
}

/*** DESTINO – MARÍTIMO -TERRESTRE ***/
// PUERTO
export interface PortBondedWarehouse {
  id: string;
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
  forwarder: ForwarderInternationalFreight;
  total: number;
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
  id: string;
  sediLegalizationFee: number; // USD 50
  // CALCULO DE BASE IMPONIBLE
  invoiceValueFOB: number; //
  internationalFreightValue: number; // VALOR DEL PASO ANTERIOR
  taxableBase: number; // BASE IMPONIBLE --> FOB + Flete Internacional + (FOB x 0.01) === CIF
  // IMPUESTOS
  importDutyRate: number; // DERECHOS DE IMPORTACIÓN (Varía según la mercaderia y el arancel)
  statisticsRate: number; // ESTADISTICAS = BASE IMPONIBLE x 0.03
  ivaRate: number; // IVA = (DERECHOS DE IMPORTACION + ESTADISITCA) x 0.21
  additionalIvaRate: number; // IVA ADICIONAL = (DERECHOS DE IMPORTACION + ESTADISITCA) x 0.105
  incomeTaxRate: number; // GANANCIAS = BASE IMPONIBLE x 0.06
  grossIncomeRate: number; // INGRESOS BRUTOS = BASE IMPONIBLE x 0.025
  simFee: number; // USD 10
  // OTROS GASTOS
  minimumCustomsDispatchCost: number; // PARA GASTOS DESPACHOS ADUANEROS SE USA EL MAX DE HONORARIOS MINIMOS (250 USD) O EL 0.8% DEL VALOR DEL CIF
  customsOperationalCharges: number; // USD 210
  optionalElectricalSecurity: number; //  USD 150
  optionalSenasaFee: number; // USD 50
  total: number;
}

/*** ENTREGA ***/
export interface InternalFreightLogistics {
  internalFreightCost: number;
}
