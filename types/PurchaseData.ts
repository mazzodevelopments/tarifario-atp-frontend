import { Item } from "@/types/Item";

export interface PurchaseData {
  date: string;
  item: Item | null;
  origin: string;
  destination: string;
  supplier: string;
  currency: string;
  unitPrice: number;
  deliveryTime: number;
  unitWeight: number;
  totalWeight: number;
  unit: string;
  incoterm: string;
}
