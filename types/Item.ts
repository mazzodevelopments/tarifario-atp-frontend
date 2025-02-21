export interface Item {
  id: number;
  numbering: string;
  family: string;
  subfamily: string;
  detail: string;
  brand: string;
  model: string;
  quantity: number;
  unit: string;
  partNumber: string;
  productNumber: string;
}

export interface CreateItem {
  detail: string;
  quantity: number;
  partNumber: string;
  productNumber: string;
  subfamilyId: number | null;
  modelId: number | null;
  unitId: number | null;
}
