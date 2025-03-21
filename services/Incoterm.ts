export interface Incoterm {
  id: number;
  name: string;
  abbreviation: string;
}

export interface CreateIncoterm {
  name: string;
  abbreviation: string;
}
