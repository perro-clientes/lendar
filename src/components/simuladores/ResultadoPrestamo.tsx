import Link from "next/link";
import { CTAButton } from "@/components/site/CTAButton";
import { formatPorcentaje, formatUSD } from "@/lib/calculos";
import type { FilaAmortizacion, Plazo } from "@/types/simulador";

interface ResultadoPrestamoProps {
  cuotaMensual: number;
  filas: FilaAmortizacion[];
  plazo: Plazo;
  capitalFinanciado: number;
  montoSolicitado: number;
  valorPropiedad: number;
  viviendaUnica: boolean;
}

export function ResultadoPrestamo({
  cuotaMensual,
  filas,
  plazo,
  capitalFinanciado,
  montoSolicitado,
  valorPropiedad,
  viviendaUnica,
}: ResultadoPrestamoProps) {
  const cuotas = filas.map((fila) => fila.cuotaTotal);
  const porcentajePrestamo = Math.round((montoSolicitado / valorPropiedad) * 100);
  const datos = [
    { etiqueta: "Plazo", valor: `${plazo.anios} año${plazo.anios > 1 ? "s" : ""}` },
    { etiqueta: "Tasa anual", valor: formatPorcentaje(plazo.tna) },
    { etiqueta: "Capital financiado", valor: formatUSD(capitalFinanciado) },
  ];

  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-solicitante/40 bg-solicitante-light p-6">
      <div>
        <p className="text-sm font-medium text-text-secondary">Cuota mensual estimada</p>
        <p className="mt-1 flex flex-wrap items-baseline gap-x-2 font-bold tabular-nums text-solicitante-dark">
          {viviendaUnica ? (
            <span className="text-4xl sm:text-5xl">{formatUSD(cuotaMensual)}</span>
          ) : (
            <span className="text-3xl sm:text-4xl">
              {formatUSD(Math.min(...cuotas))} a {formatUSD(Math.max(...cuotas))}
            </span>
          )}
          <span className="text-base font-normal text-text-muted">USD/mes</span>
        </p>
        <p className="mt-2 max-w-md text-xs leading-relaxed text-text-muted">
          {!viviendaUnica && "El préstamo tributa IVA sobre los intereses. "}
          Ya incluye la devolución de la comisión Lendar, financiada dentro del préstamo.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex h-2 overflow-hidden rounded-full bg-surface">
          <div className="bg-solicitante-dark" style={{ width: `${porcentajePrestamo}%` }} />
        </div>
        <div className="flex justify-between text-xs text-text-secondary">
          <span>Préstamo {porcentajePrestamo}%</span>
          <span>Tu aporte {100 - porcentajePrestamo}%</span>
        </div>
      </div>

      <dl className="grid grid-cols-3 gap-3">
        {datos.map((dato) => (
          <div key={dato.etiqueta} className="flex flex-col-reverse justify-end gap-1">
            <dt className="text-xs text-text-muted">{dato.etiqueta}</dt>
            <dd className="text-sm font-semibold tabular-nums text-text sm:text-base">{dato.valor}</dd>
          </div>
        ))}
      </dl>

      <Link href="/contacto" className="self-start">
        <CTAButton>Solicitá tu préstamo</CTAButton>
      </Link>
    </div>
  );
}
