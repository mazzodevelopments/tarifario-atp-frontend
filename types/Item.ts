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

export interface ListedItem {
  id: number;
  numbering: string;
  family: string;
  subfamily: { id: number; name: string };
  detail: string;
  brand: string;
  model: { id: number; name: string };
  quantity: number;
  unit: { id: number; name: string };
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

export interface CreateMassiveLoadItems {
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
