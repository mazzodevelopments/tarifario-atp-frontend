import type { AirportFreightCourier } from "@/types/AirportFreightCourier";
import type { PortBondedWarehouse } from "@/types/PortBondedWarehouse";
import type { Custom } from "@/types/Custom";
import type { Delivery } from "@/types/Delivery";
import { PurchaseData } from "@/types/PurchaseData";
import { SalesData } from "@/types/SalesData";
import { OriginExpenses } from "@/types/OriginExpenses";
import Transport from "@/types/Transport";

export interface Budget {
  numbering: string;
  purchaseData: PurchaseData | null;
  originExpenses: OriginExpenses | null;
  transport: Transport | null;
  custom: Custom | null;
  delivery: Delivery | null;
  salesData: SalesData | null;
  stage: string;
}

// transport: AirportFreightCourier | PortBondedWarehouse | null;
