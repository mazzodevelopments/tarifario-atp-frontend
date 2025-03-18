export interface Supplier {
  id: number;
  name: string;
  isNational: boolean;
  isInternational: boolean;
  email: string;
  phone: string;
  families?: { id: number; name: string }[];
}

export interface CreateSupplier {
  name: string;
  isNational: boolean;
  isInternational: boolean;
  email: string;
  phone: string;
  families?: { id: string; name: string }[];
}

export interface EditSupplier {
  id?: number;
  name?: string;
  isNational?: boolean;
  isInternational?: boolean;
  email?: string;
  phone?: string;
  familyIds?: number[];
}
