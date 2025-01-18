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
