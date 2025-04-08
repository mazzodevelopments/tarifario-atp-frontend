import { Budget } from "@/types/Budget";
import { Item } from "@/types/Item";

export interface QuotationData {
  id?: number;
  taskNumber: string;
  client: string;
  buyer: string;
  receptionDate: string;
  uploadDate: string;
  expirationDateTime: string;
  materialsNeededDate: string;
  customerRequestNumber: string;
  step?: number;
  budgets: Budget[] | null;
  items: Item[] | null;
}

export interface CreateQuotationData {
  taskNumber: string;
  buyerId: number;
  receptionDate: string;
  uploadDate: string;
  expirationDateTime: string;
  materialsNeededDate: string;
  customerRequestNumber: string;
}
