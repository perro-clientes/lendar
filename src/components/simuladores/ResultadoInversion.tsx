import Link from "next/link";
import { CTAButton } from "@/components/site/CTAButton";
import {
  calcularComisionInversor,
  formatPorcentaje,
  formatUSD,
  obtenerComisionInversorPct,
} from "@/lib/calculos";
import type { Plazo } from "@/types/simulador";

interface ResultadoInversionProps {
  cobroMensual: number;
  montoInvertido: number;
  plazo: Plazo;
}

export function ResultadoInversion({ cobroMensual, montoInvertido, plazo }: ResultadoInversionProps) {
  const datos = [
    { etiqueta: "Plazo", valor: `${plazo.anios} año${plazo.anios > 1 ? "s" : ""}` },
    { etiqueta: "Tasa anual", valor: formatPorcentaje(plazo.tna) },
  ];

  return (
    <>
      <div className="flex flex-col gap-5 rounded-2xl border border-inversor/40 bg-inversor-light p-6">
        <div>
          <p className="text-sm font-medium text-text-secondary">Cobro mensual estimado</p>
          <p className="mt-1 flex flex-wrap items-baseline gap-x-2">
            <span className="text-4xl font-bold tabular-nums text-inversor-dark sm:text-5xl">
              {formatUSD(cobroMensual)}
            </span>
            <span className="text-base text-text-muted">USD/mes</span>
          </p>
          <p className="mt-2 max-w-md text-xs leading-relaxed text-text-muted">
            Calculado mediante Sistema Francés directo en dólares billete.
          </p>
        </div>

        <dl className="grid grid-cols-2 gap-3 sm:max-w-sm">
          {datos.map((dato) => (
            <div key={dato.etiqueta} className="flex flex-col-reverse justify-end gap-1">
              <dt className="text-xs text-text-muted">{dato.etiqueta}</dt>
              <dd className="text-sm font-semibold tabular-nums text-text sm:text-base">{dato.valor}</dd>
            </div>
          ))}
        </dl>

        <Link href="/contacto" className="self-start">
          <CTAButton variant="solid-inversor-dark">Quiero invertir: charlemos</CTAButton>
        </Link>
      </div>

      <div className="rounded-2xl border border-border bg-surface p-5">
        <p className="text-sm font-semibold text-text-secondary">Costos</p>
        <p className="mt-2 flex flex-wrap items-baseline justify-between gap-x-2 text-sm">
          <span className="text-text-secondary">Comisión Lendar</span>
          <span className="font-semibold tabular-nums text-text">
            {formatUSD(calcularComisionInversor(montoInvertido))} (
            {formatPorcentaje(obtenerComisionInversorPct(montoInvertido))} del monto invertido)
          </span>
        </p>
        <p className="mt-1 text-xs leading-relaxed text-text-muted">
          Se paga por única vez, en efectivo, el día de la firma en la escribanía.
        </p>
      </div>
    </>
  );
}
