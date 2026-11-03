"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/Slider";
import { calcularPrecancelacion, formatPorcentaje, formatUSD } from "@/lib/calculos";
import { EMAIL_SANTA_FE } from "@/lib/contacto";
import type { FilaAmortizacion, Plazo } from "@/types/simulador";

const CUOTA_MINIMA = 2;
const CUOTA_INICIAL = 24;

interface PrecancelacionPrestamoProps {
  filas: FilaAmortizacion[];
  plazo: Plazo;
  montoSolicitado: number;
  capitalFinanciado: number;
}

export function PrecancelacionPrestamo({
  filas,
  plazo,
  montoSolicitado,
  capitalFinanciado,
}: PrecancelacionPrestamoProps) {
  const [cuotaElegida, setCuotaElegida] = useState(CUOTA_INICIAL);
  const cuotaMaxima = filas.length - 1;
  const cuota = Math.min(Math.max(cuotaElegida, CUOTA_MINIMA), cuotaMaxima);
  const { capitalPendiente, penalidad, total, interesesEvitados } = calcularPrecancelacion(filas, cuota);

  const resultado = [
    { etiqueta: "Capital que te queda por pagar", valor: capitalPendiente },
    { etiqueta: "Penalidad (5% + IVA sobre ese capital)", valor: penalidad },
  ];

  return (
    <section id="cancelar" aria-label="Adelanto y precancelación" className="flex scroll-mt-[77px] flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h3 className="text-xl font-bold text-text md:text-2xl">Adelanto de cuotas y precancelación</h3>
        <p className="text-text-muted">Si cambian tus planes, podés adelantar cuotas o cancelar todo antes de término.</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[35fr_65fr] lg:items-stretch">
        <div className="flex flex-col gap-6 rounded-2xl border border-border bg-background p-6 md:p-8">
          <div className="flex flex-col gap-2">
            <h4 className="font-bold text-text">Adelanto parcial</h4>
            <p className="text-sm leading-relaxed text-text-secondary">
              Podés hacerlo cuando quieras. No tiene penalidad, pero tampoco genera descuento ni ahorro de intereses.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="font-bold text-text">Cancelación total</h4>
            <p className="text-sm leading-relaxed text-text-secondary">
              Disponible desde la cuota 2, avisando con 30 días de anticipación a{" "}
              <a href={`mailto:${EMAIL_SANTA_FE}`} className="font-medium text-solicitante-dark underline hover:text-text">
                {EMAIL_SANTA_FE}
              </a>
              . La penalidad es de 5% + IVA sobre el capital pendiente, sin contar intereses.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-6 md:p-8">
          <p className="text-sm leading-relaxed text-text-muted">
            Según tu simulación: {formatUSD(montoSolicitado)} + {formatUSD(capitalFinanciado - montoSolicitado)} de comisión ={" "}
            <span className="font-semibold text-text">{formatUSD(capitalFinanciado)}</span>, en {filas.length} cuotas
            al {formatPorcentaje(plazo.tna)} TNA.
          </p>
          <Slider
            label="Deslizá para elegir en qué cuota cancelarías"
            value={cuota}
            min={CUOTA_MINIMA}
            max={cuotaMaxima}
            step={1}
            display={`Cuota ${cuota} de ${filas.length}`}
            onChange={setCuotaElegida}
            accent="accent-solicitante"
          />
          <dl className="flex flex-col gap-3 tabular-nums">
            {resultado.map(({ etiqueta, valor }) => (
              <div key={etiqueta} className="flex items-baseline justify-between gap-4 text-sm md:text-base">
                <dt className="text-text-secondary">{etiqueta}</dt>
                <dd className="shrink-0 font-semibold text-text">{formatUSD(valor)}</dd>
              </div>
            ))}
            <div className="flex items-baseline justify-between gap-4 border-t border-border pt-3">
              <dt className="font-bold text-text">Total para cancelar</dt>
              <dd className="shrink-0 text-xl font-bold text-solicitante-dark">{formatUSD(total)}</dd>
            </div>
          </dl>
          <p className="text-sm leading-relaxed text-text-secondary">
            Lo pagás junto con la cuota {cuota}. A cambio, dejás de pagar{" "}
            <span className="font-semibold text-text">{formatUSD(interesesEvitados)}</span> de intereses{" "}
            {cuota + 1 === filas.length ? `de la cuota ${filas.length}` : `de las cuotas ${cuota + 1} a ${filas.length}`}.
          </p>
          <p className="text-xs italic leading-relaxed text-text-muted">
            Estimación orientativa que no incluye otros gastos posibles, como los de escribanía para levantar la
            hipoteca. El monto exacto lo confirma Lendar cuando pedís la cancelación.
          </p>
        </div>
      </div>
    </section>
  );
}
