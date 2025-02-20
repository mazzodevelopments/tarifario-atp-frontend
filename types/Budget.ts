import { PurchaseData } from "@/types/PurchaseData";
import { SalesData } from "@/types/SalesData";
import { Freight } from "@/types/Freight";

export interface Budget {
  id: number;
  numbering: string;
  purchaseData?: PurchaseData | null;
  salesData?: SalesData | null;
  freight: Freight | null;
  stage: string;
}
