import type { FilaAmortizacion, FilaAmortizacionInversion, Plazo } from "@/types/simulador";

export const COMISION_INICIAL_PCT = 0.05;
export const IVA_PCT = 0.21;
export const MONTO_MINIMO_USD = 10000;
export const PORCENTAJE_MAXIMO_PROPIEDAD = 0.35;
export const VALOR_PROPIEDAD_STEP = 500;
export const PENALIDAD_CANCELACION_PCT = 0.05;
export const COMISION_INVERSOR_PCT = 0.015;
export const COMISION_INVERSOR_GOLD_PCT = 0.01;
export const MONTO_INVERSOR_GOLD_USD = 40000;
export const RECARGO_PUNITORIO_PCT = 0.5;

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

export function formatPorcentaje(tasa: number, decimales = 1): string {
  return `${(tasa * 100).toFixed(decimales).replace(".", ",")}%`;
}

// Sistema Francés: cuota fija = (monto * i) / (1 - (1 + i)^-n), con i = TNA/12 y n = cantidad de cuotas.
function calcularCuotaFrancesa(monto: number, plazoAnios: number, tasaTNA: number): number {
  const cantidadCuotas = Math.round(plazoAnios * 12);
  if (cantidadCuotas <= 0 || monto <= 0) {
    return 0;
  }
  const tasaMensual = tasaTNA / 12;
  if (tasaMensual === 0) {
    return monto / cantidadCuotas;
  }
  return (monto * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -cantidadCuotas));
}

export function calcularCuotaPrestamo(
  montoSolicitado: number,
  plazoAnios: number,
  tasaTNA: number,
): number {
  return calcularCuotaFrancesa(calcularCapitalFinanciado(montoSolicitado), plazoAnios, tasaTNA);
}

export function calcularCobroInversion(
  montoInvertido: number,
  plazoAnios: number,
  tasaTNA: number,
): number {
  return calcularCuotaFrancesa(montoInvertido, plazoAnios, tasaTNA);
}

export function calcularAmortizacionPrestamo(
  montoSolicitado: number,
  plazoAnios: number,
  tasaTNA: number,
  viviendaUnica: boolean,
): FilaAmortizacion[] {
  const cantidadCuotas = Math.round(plazoAnios * 12);
  const cuotaBase = calcularCuotaPrestamo(montoSolicitado, plazoAnios, tasaTNA);
  const tasaMensual = tasaTNA / 12;
  const filas: FilaAmortizacion[] = [];
  let saldoDeudor = calcularCapitalFinanciado(montoSolicitado);

  for (let numeroCuota = 1; numeroCuota <= cantidadCuotas; numeroCuota++) {
    const interes = saldoDeudor * tasaMensual;
    // Vivienda única y permanente: los intereses no tributan IVA.
    const iva = viviendaUnica ? 0 : interes * IVA_PCT;
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

export function calcularValorMinimoPropiedad(montoSolicitado: number): number {
  const valorMinimo = montoSolicitado / PORCENTAJE_MAXIMO_PROPIEDAD;
  return Math.ceil(valorMinimo / VALOR_PROPIEDAD_STEP) * VALOR_PROPIEDAD_STEP;
}

export function calcularComisionInicial(montoSolicitado: number): number {
  const comisionBase = montoSolicitado * COMISION_INICIAL_PCT;
  // IVA confirmado con Lendar: la comisión se informa con IVA incluido (5% + 21%).
  return comisionBase * (1 + IVA_PCT);
}

// La comisión no se paga aparte: se suma al préstamo y se devuelve con la cuota.
export function calcularCapitalFinanciado(montoSolicitado: number): number {
  return montoSolicitado + calcularComisionInicial(montoSolicitado);
}

export function calcularPrecancelacion(filas: FilaAmortizacion[], cuota: number) {
  const capitalPendiente = filas[cuota - 1].saldoDeudor;
  const penalidad = capitalPendiente * PENALIDAD_CANCELACION_PCT * (1 + IVA_PCT);
  const interesesEvitados = filas
    .slice(cuota)
    .reduce((suma, fila) => suma + fila.interes + fila.iva, 0);
  return { capitalPendiente, penalidad, total: capitalPendiente + penalidad, interesesEvitados };
}

export function calcularAmortizacionInversion(
  montoInvertido: number,
  plazoAnios: number,
  tasaTNA: number,
): FilaAmortizacionInversion[] {
  const cantidadCuotas = Math.round(plazoAnios * 12);
  const cobroBase = calcularCobroInversion(montoInvertido, plazoAnios, tasaTNA);
  const tasaMensual = tasaTNA / 12;
  const filas: FilaAmortizacionInversion[] = [];
  let saldoDeudor = montoInvertido;

  for (let numeroCuota = 1; numeroCuota <= cantidadCuotas; numeroCuota++) {
    const interes = saldoDeudor * tasaMensual;
    const esUltimaCuota = numeroCuota === cantidadCuotas;
    const amortizacion = esUltimaCuota ? saldoDeudor : cobroBase - interes;
    saldoDeudor -= amortizacion;
    filas.push({
      numeroCuota,
      amortizacion,
      interes,
      cuotaTotal: amortizacion + interes,
      saldoDeudor,
    });
  }

  return filas;
}

export function obtenerComisionInversorPct(montoInvertido: number): number {
  return montoInvertido >= MONTO_INVERSOR_GOLD_USD ? COMISION_INVERSOR_GOLD_PCT : COMISION_INVERSOR_PCT;
}

export function calcularComisionInversor(montoInvertido: number): number {
  return montoInvertido * obtenerComisionInversorPct(montoInvertido);
}

export function calcularTasaPunitoria(tasaTNA: number): number {
  return tasaTNA * (1 + RECARGO_PUNITORIO_PCT);
}
