import type { Custom } from "@/types/Custom";
import { PurchaseData } from "@/types/PurchaseData";
import { SalesData } from "@/types/SalesData";
import { OriginExpenses } from "@/types/OriginExpenses";
import { Transport } from "@/types/Transport";
import { DestinationExpenses } from "@/types/DestinationExpenses";

export interface Budget {
  numbering: string;
  purchaseData: PurchaseData | null;
  originExpenses: OriginExpenses | null;
  transport: Transport | null;
  custom: Custom | null;
  destinationExpenses: DestinationExpenses | null;
  salesData: SalesData | null;
  stage: string;
}
