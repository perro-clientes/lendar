import type { FilaAmortizacion, Plazo } from "@/types/simulador";

export const COMISION_INICIAL_PCT = 0.05;
// TODO: confirmar con Lendar si el IVA aplica sobre el interés u otro concepto antes de producción.
export const IVA_PCT = 0.21;
export const MONTO_MINIMO_USD = 10000;
export const PORCENTAJE_MAXIMO_PROPIEDAD = 0.35;

export const PLAZOS: readonly Plazo[] = [
  { anios: 1, tna: 0.095 },
  { anios: 2, tna: 0.105 },
  { anios: 3, tna: 0.115 },
  { anios: 4, tna: 0.125 },
  { anios: 5, tna: 0.135 },
];

const usdFormatter = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function formatUSD(valor: number): string {
  return usdFormatter.format(valor);
}

export function calcularCuotaPrestamo(
  montoSolicitado: number,
  plazoAnios: number,
  tasaTNA: number,
): number {
  const cantidadCuotas = Math.round(plazoAnios * 12);
  if (cantidadCuotas <= 0 || montoSolicitado <= 0) {
    return 0;
  }
  const tasaMensual = tasaTNA / 12;
  if (tasaMensual === 0) {
    return montoSolicitado / cantidadCuotas;
  }
  return (montoSolicitado * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -cantidadCuotas));
}

export function calcularAmortizacionPrestamo(
  montoSolicitado: number,
  plazoAnios: number,
  tasaTNA: number,
): FilaAmortizacion[] {
  const cantidadCuotas = Math.round(plazoAnios * 12);
  const cuotaBase = calcularCuotaPrestamo(montoSolicitado, plazoAnios, tasaTNA);
  const tasaMensual = tasaTNA / 12;
  const filas: FilaAmortizacion[] = [];
  let saldoDeudor = montoSolicitado;

  for (let numeroCuota = 1; numeroCuota <= cantidadCuotas; numeroCuota++) {
    const interes = saldoDeudor * tasaMensual;
    const iva = interes * IVA_PCT;
    const esUltimaCuota = numeroCuota === cantidadCuotas;
    const amortizacion = esUltimaCuota ? saldoDeudor : cuotaBase - interes;
    saldoDeudor -= amortizacion;
    filas.push({
      numeroCuota,
      amortizacion,
      interes,
      iva,
      cuotaTotal: amortizacion + interes + iva,
      saldoDeudor,
    });
  }

  return filas;
}

export function calcularMontoMaximo(valorPropiedad: number): number {
  return Math.max(MONTO_MINIMO_USD, valorPropiedad * PORCENTAJE_MAXIMO_PROPIEDAD);
}

export function calcularComisionInicial(montoSolicitado: number): number {
  return montoSolicitado * COMISION_INICIAL_PCT;
}
