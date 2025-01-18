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

export interface Custom {
  id: string;
  oficializacionSedi: number;
  gastosDespachosAduanero: number;
  gastosOperativos: number;
  seguridadElectrica: number;
  senasa: number;
}

export interface Transport {
  id: string;
  via: string;
  pickUp: boolean;
  pickUpPrice: number;
  repackaging: boolean;
  fumigation: boolean;
}

export interface AirOrCourier extends Transport {
  edcadassa: number; // ESTADÍA EN EDCADASSA SON USD 70 X DÍA
  internationalFreight: number;
  internationalInsurance: number; // PORCENTAJE DESDE 0,4% a 1%
  administrativeCharges: number;
  airWayBillCut: number;
}

export interface SeaOrLand extends Transport {
  // PUERTO
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
  //FORDWARDER
  originExpenses: number;
  internationalFreight: number;
  generalPortAdministration: number;
  localExpenses: number; //
  deconsolidation: number; //
  blPaymentForOriginalDocumentRetrieval: number;
}
