export interface Family {
  id: number;
  name: string;
}

export interface Subfamily {
  id: number;
  name: string;
  family?: Family;
}
