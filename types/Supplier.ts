export interface Supplier {
  id?: number;
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
