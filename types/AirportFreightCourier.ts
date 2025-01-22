/*** DESTINO – MARÍTIMO -TERRESTRE ***/
export interface AirportFreightCourier {
  id: string;
  edcadassaStayCostPerDay: number; // ESTADÍA EN EDCADASSA SON USD 70 X DÍA
  edcadassaStayDuration: number;
  edcadassaTotal: number;
  internationalFreightCost: number;
  internationalInsurance: number; // PORCENTAJE DESDE 0,4% a 1%
  administrativeCharges: number;
  airwayBillCuttingFee: number;
  total: number;
}
