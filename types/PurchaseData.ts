import { Item } from "@/types/Item";

export interface PurchaseData {
  date: string;
  item: Item | null;
  origin: string;
  destination: string;
  supplier: string;
  currency: string;
  unitPrice: number;
  margin: number;
  appliedUnitPrice: number;
  productionTime: number;
  unitWeight: number;
  totalWeight: number;
  unit: string;
  incoterm: string;
  offeredCondition: string;
  additionalObservations: string;
}

export interface CreatePurchaseData {
  date: string;
  unitPrice: number;
  margin: number;
  appliedUnitPrice: number;
  unitWeight: number;
  totalWeight: number;
  additionalObservations: string;
  productionTime: number;
  itemId: number | null;
  origin: string;
  destination: string;
  supplierId: number | null;
  currencyId: number | null;
  weightUnitId: number | null;
  incotermId: number | null;
  offeredConditionId: number | null;
}
