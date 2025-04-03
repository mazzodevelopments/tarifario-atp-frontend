export interface OriginExpenses {
  pickUpValue: number;
  repackagingValue: number;
  palletFumigationValue: number;
  certificatesValue: number;
  haulageValue: number;
  customExpenses: CustomExpense[];
  total: number;
}

export interface CustomExpense {
  name: string;
  value: number;
}
