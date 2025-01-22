import type { AirportFreightCourier } from "@/types/AirportFreightCourier";
import type { PortBondedWarehouse } from "@/types/PortBondedWarehouse";
import type { Custom } from "@/types/Custom";
import type { Delivery } from "@/types/Delivery";

export interface Budget {
  id: string;
  date: string;
  item: string;
  origin: string;
  destination: string;
  supplier: string;
  deliveryTime: number;
  unitPrice: number;
  currency: string;
  margin: number;
  totalPrice: number;
  unitWeight: number;
  totalWeight: number;
  unit: string;
  incoterm: string;
  transport: AirportFreightCourier | PortBondedWarehouse | null;
  custom: Custom | null;
  delivery: Delivery | null;
  numbering: string;
  stage: string;
}
