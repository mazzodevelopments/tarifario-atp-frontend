export interface OriginExpenses {
  pickup: number;
  repackaging: boolean;
  palletFumigation: boolean;
  customExpenses: CustomExpense[];
  total: number;
}

export interface CustomExpense {
  name: string;
  value: number;
}
