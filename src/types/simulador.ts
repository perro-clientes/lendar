export type TipoSimulador = "prestamo" | "inversion";

export interface Tracking {
  evento?: string;
  vendedor?: string;
}

export interface PrestamoInputs {
  monto: number;
  plazoMeses: number;
  tasaAnual: number;
  comisionInicialPct?: number;
  ivaPct?: number;
}

export interface PrestamoResultado {
  cuotaMensual: number;
  totalPagado: number;
  totalIntereses: number;
  totalComisiones: number;
  totalIva: number;
  costoTotal: number;
}

export interface TablaFila {
  periodo: number;
  cuota: number;
  capital: number;
  interes: number;
  saldo: number;
}

export interface InversionInputs {
  capitalInicial: number;
  aporteMensual: number;
  plazoMeses: number;
  tasaAnual: number;
}

export interface InversionResultado {
  montoFinal: number;
  totalAportado: number;
  interesesGanados: number;
}

export interface LeadContacto {
  nombre: string;
  telefono?: string;
  email?: string;
}

export interface LeadPayload {
  tipo: TipoSimulador;
  inputs: PrestamoInputs | InversionInputs;
  resultado: PrestamoResultado | InversionResultado;
  contacto?: LeadContacto | null;
  evento?: string | null;
  vendedor?: string | null;
}
