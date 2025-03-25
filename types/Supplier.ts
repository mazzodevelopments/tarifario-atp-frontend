export interface Supplier {
  id: number;
  name: string;
  isNational: boolean;
  isInternational: boolean;
  email: string;
  phone: string;
  origin: string;
  families?: { id: number; name: string }[];
  familyIds?: number[];
}

export interface CreateSupplier {
  name: string;
  isNational: boolean;
  isInternational: boolean;
  email: string;
  phone: string;
  origin: string;
}
