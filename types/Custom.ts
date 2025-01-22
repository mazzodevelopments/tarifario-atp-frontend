/*** ADUANA ***/
export interface Custom {
  id: string;
  sediLegalizationFee: number; // USD 50
  // CALCULO DE BASE IMPONIBLE
  invoiceValueFOB: number; //
  internationalFreightCost: number; // VALOR DEL PASO ANTERIOR
  taxableBase: number; // BASE IMPONIBLE --> FOB + Flete Internacional + (FOB x 0.01) === CIF
  // IMPUESTOS
  importDutyRate: number; // DERECHOS DE IMPORTACIÓN (Varía según la mercaderia y el arancel)
  statisticsRate: number; // ESTADISTICAS = BASE IMPONIBLE x 0.03
  ivaRate: number; // IVA = (DERECHOS DE IMPORTACION + ESTADISITCA) x 0.21
  additionalIvaRate: number; // IVA ADICIONAL = (DERECHOS DE IMPORTACION + ESTADISITCA) x 0.105
  incomeTaxRate: number; // GANANCIAS = BASE IMPONIBLE x 0.06
  grossIncomeRate: number; // INGRESOS BRUTOS = BASE IMPONIBLE x 0.025
  simFee: number; // USD 10
  // OTROS GASTOS
  minimumCustomsDispatchCost: number; // PARA GASTOS DESPACHOS ADUANEROS SE USA EL MAX DE HONORARIOS MINIMOS (250 USD) O EL 0.8% DEL VALOR DEL CIF
  customsOperationalCharges: number; // USD 210
  optionalElectricalSecurity: number; //  USD 150
  optionalSenasaFee: number; // USD 50
  total: number;
}
