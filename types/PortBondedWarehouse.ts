/*** DESTINO – MARÍTIMO -TERRESTRE ***/
// PUERTO
export interface PortBondedWarehouse {
  id: string;
  transferToCustomsWarehouse: number;
  deconsolidation: number; // DESCONSOLIDACIÓN
  movementCharges: number; // COSTOS DE MOVIMIENTO
  administrativeCharges: number; // COSTOS ADMINISTRATIVOS
  electronicSeal: number; // PRECINTO ELECTRONICO
  emptyContainerReturnDaysBeforeDeadline: number; // CANTIDAD DE DÍAS LIBRES SEGÚN FORDWARDER - PUERTO
  lateReturnFee: number; // 12 USD X DÍA DESDE EL PRIMER DÍA
  // DIAS DE ALMACENAJE
  storageDays: number;
  storageDayPrice: number;
  storageDaysTotal: number;
  containerCleaning: number; // LIMPIEZA CONTENEDOR
  optionalCustody: number;
  senasaVerification: number;
  forwarder: ForwarderInternationalFreight;
  total: number;
}

// FORWARDER
export interface ForwarderInternationalFreight {
  originCharges: number; // GASTOS EN ORIGEN
  internationalFreightCost: number; // FLETE INTERNACIONAL
  agpFee: number; // AGP (General Port Administration) CUOTA
  localCharges: number; // CARGOS LOCALES
  deconsolidationFee: number; // DESCONSOLIDACIÓN
  billOfLadingPayment: number; // PAGO DE BL
}
