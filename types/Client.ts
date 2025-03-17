export interface Client {
  id: number;
  name: string;
  buyers?: {
    id: string;
    name: string;
    lastname?: string;
    email?: string;
    phone?: string;
    birthDate?: string;
    street?: string;
    streetNumber?: string;
    country?: string;
    city?: string;
    zipCode?: string;
  }[];
}

export interface CreateClient {
  name: string;
  buyers?: {
    id: string;
    name: string;
    lastname?: string;
    email?: string;
    phone?: string;
    birthDate?: string;
    street?: string;
    streetNumber?: string;
    country?: string;
    city?: string;
    zipCode?: string;
  }[];
}

export interface EditClient {
  id?: number;
  name?: string;
  buyers?: {
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
  }[];
}
