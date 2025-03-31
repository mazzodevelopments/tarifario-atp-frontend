export interface SalesData {
  unitSalePrice: number;
  margin?: number;
  totalPrice: number;
  paymentCondition: { id: number; name: string };
}
