import type {
  InversionInputs,
  InversionResultado,
  PrestamoInputs,
  PrestamoResultado,
  TablaFila,
} from "@/types/simulador";

export const IVA_PCT = 21;

export function tasaMensual(tasaAnualPct: number): number {
  return tasaAnualPct / 100 / 12;
}

export function calcularCuotaFrancesa(
  monto: number,
  tasaAnualPct: number,
  plazoMeses: number,
): number {
  const i = tasaMensual(tasaAnualPct);
  if (i === 0) return monto / plazoMeses;
  return (monto * i) / (1 - Math.pow(1 + i, -plazoMeses));
}

export function calcularTablaAmortizacion(
  monto: number,
  tasaAnualPct: number,
  plazoMeses: number,
): TablaFila[] {
  const i = tasaMensual(tasaAnualPct);
  const cuota = calcularCuotaFrancesa(monto, tasaAnualPct, plazoMeses);
  const tabla: TablaFila[] = [];
  let saldo = monto;
  for (let periodo = 1; periodo <= plazoMeses; periodo++) {
    const interes = saldo * i;
    const capital = cuota - interes;
    saldo = Math.max(0, saldo - capital);
    tabla.push({ periodo, cuota, capital, interes, saldo });
  }
  return tabla;
}

export function calcularResumenPrestamo(inputs: PrestamoInputs): PrestamoResultado {
  const { monto, plazoMeses, tasaAnual, comisionInicialPct = 0, ivaPct = IVA_PCT } = inputs;
  const cuotaMensual = calcularCuotaFrancesa(monto, tasaAnual, plazoMeses);
  const totalPagado = cuotaMensual * plazoMeses;
  const totalIntereses = totalPagado - monto;
  const comision = (monto * comisionInicialPct) / 100;
  const totalIva = (comision * ivaPct) / 100;
  const totalComisiones = comision + totalIva;
  const costoTotal = totalPagado + totalComisiones;
  return { cuotaMensual, totalPagado, totalIntereses, totalComisiones, totalIva, costoTotal };
}

export function calcularValorFuturo(
  capitalInicial: number,
  aporteMensual: number,
  tasaAnualPct: number,
  plazoMeses: number,
): number {
  const i = tasaMensual(tasaAnualPct);
  if (i === 0) return capitalInicial + aporteMensual * plazoMeses;
  const factor = Math.pow(1 + i, plazoMeses);
  const capital = capitalInicial * factor;
  const aportes = aporteMensual * ((factor - 1) / i);
  return capital + aportes;
}

export function calcularResumenInversion(inputs: InversionInputs): InversionResultado {
  const { capitalInicial, aporteMensual, plazoMeses, tasaAnual } = inputs;
  const montoFinal = calcularValorFuturo(capitalInicial, aporteMensual, tasaAnual, plazoMeses);
  const totalAportado = capitalInicial + aporteMensual * plazoMeses;
  return { montoFinal, totalAportado, interesesGanados: montoFinal - totalAportado };
}

export function aplicarIva(valor: number, ivaPct: number = IVA_PCT): number {
  return valor * (1 + ivaPct / 100);
}

export function formatearMoneda(valor: number, moneda: "ARS" | "USD" = "ARS"): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: moneda,
    maximumFractionDigits: 0,
  }).format(valor);
}
