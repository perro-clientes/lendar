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

export type MedioContacto = "email" | "telefono";
