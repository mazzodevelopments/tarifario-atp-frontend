import { Client } from "@/types/Client";
import { Address } from "@/types/Address";

export interface Buyer {
  id: number;
  name: string;
  lastname: string;
  email: string;
  birthDate: string;
  phone: string;
  address: Address;
  client: Client;
}

export interface CreateBuyer {
  name: string;
  lastname: string;
  email: string;
  phone: string;
  birthDate: string;
  street: string;
  streetNumber: string;
  country: string;
  city: string;
  zipCode: string;
  clientId: number;
}
