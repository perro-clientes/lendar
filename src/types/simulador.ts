export interface Plazo {
  anios: number;
  tna: number;
}

export interface FilaAmortizacion {
  numeroCuota: number;
  amortizacion: number;
  interes: number;
  iva: number;
  cuotaTotal: number;
  saldoDeudor: number;
}

// Sin columna de IVA: la tabla de inversión no la lleva, a diferencia de la de préstamo.
export type FilaAmortizacionInversion = Omit<FilaAmortizacion, "iva">;

export type FormatoDinero = "efectivo" | "transferencia";
