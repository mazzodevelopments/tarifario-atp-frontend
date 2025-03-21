export interface Currency {
  id: number;
  name: string;
  abbreviation: string;
  dollarValue: number;
}

export interface CreateCurrency {
  name: string;
  abbreviation: string;
  dollarValue: number;
}
