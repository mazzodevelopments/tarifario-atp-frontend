import { OriginExpenses } from "@/types/OriginExpenses";
import { Transport } from "@/types/Transport";
import type { Custom } from "@/types/Custom";
import { DestinationExpenses } from "@/types/DestinationExpenses";

export interface Freight {
  id: string;
  name: string;
  originExpenses?: OriginExpenses | null;
  transport: Transport | null;
  custom: Custom | null;
  destinationExpenses?: DestinationExpenses | null;
  total: number;
}
