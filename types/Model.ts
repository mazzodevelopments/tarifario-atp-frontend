export interface Model {
  id: number;
  name: string;
  brand?: Brand;
}

export interface Brand {
  id: number;
  name: string;
}
