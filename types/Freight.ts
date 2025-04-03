import { OriginExpenses } from "@/types/OriginExpenses";
import { Transport } from "@/types/Transport";
import type { Custom } from "@/types/Custom";
import { DestinationExpenses } from "@/types/DestinationExpenses";

export interface Freight {
  id: string;
  name: string;
  originExpenses?: OriginExpenses | null;
  transport?: Transport | null;
  destinationExpenses?: DestinationExpenses | null;
  taxWarehouse?: TaxWarehouse | null;
  custom?: Custom | null;
  customBroker?: CustomBroker | null;
  localTransport?: LocalTransport | null;
  total: number;
}

interface TaxWarehouse {
  total: number;
}

interface CustomBroker {
  total: number;
}

interface LocalTransport {
  total: number;
}
