import { Budget } from "@/types/Budget";

export interface QuotationData {
  taskNumber: string;
  client: string;
  buyer: string;
  receptionDate: string;
  uploadDate: string;
  expirationDateTime: string;
  materialsNeededDate: string;
  customerRequestNumber: string;
  budgets: Budget[] | null;
}
