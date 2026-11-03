"use client";

import { useMemo, useState } from "react";
import { CTAContacto } from "@/components/simuladores/CTAContacto";
import { CostosHonorarios } from "@/components/simuladores/CostosHonorarios";
import { PrecancelacionPrestamo } from "@/components/simuladores/PrecancelacionPrestamo";
import { ResultadoPrestamo } from "@/components/simuladores/ResultadoPrestamo";
import { SelectorPlazo } from "@/components/simuladores/SelectorPlazo";
import { TablaAmortizacion } from "@/components/simuladores/TablaAmortizacion";
import { Card } from "@/components/ui/Card";
import { Slider } from "@/components/ui/Slider";
import {
  MONTO_MINIMO_USD,
  PLAZOS,
  PORCENTAJE_MAXIMO_PROPIEDAD,
  VALOR_PROPIEDAD_STEP,
  calcularAmortizacionPrestamo,
  calcularCapitalFinanciado,
  calcularCuotaPrestamo,
  calcularValorMinimoPropiedad,
  formatUSD,
} from "@/lib/calculos";

const VALOR_PROPIEDAD_MIN = 29000;
const VALOR_PROPIEDAD_MAX = 450000;
const MONTO_MAXIMO_USD = 150000;
const MONTO_STEP = 1000;
const MONTOS_RAPIDOS = [25000, 50000, 100000, 150000];

interface SimuladorPrestamoProps {
  mostrarContacto?: boolean;
}

export function SimuladorPrestamo({ mostrarContacto = true }: SimuladorPrestamoProps) {
  const [valorPropiedad, setValorPropiedad] = useState(75000);
  const [montoSolicitado, setMontoSolicitado] = useState(25000);
  const [plazoAnios, setPlazoAnios] = useState(5);
  const [viviendaUnica, setViviendaUnica] = useState(true);

  const plazoActual = PLAZOS.find((plazo) => plazo.anios === plazoAnios) ?? PLAZOS[0];
  const valorMinimo = calcularValorMinimoPropiedad(montoSolicitado);
  const capitalFinanciado = calcularCapitalFinanciado(montoSolicitado);

  const cuotaMensual = useMemo(
    () => calcularCuotaPrestamo(montoSolicitado, plazoActual.anios, plazoActual.tna),
    [montoSolicitado, plazoActual],
  );
  const filasAmortizacion = useMemo(
    () => calcularAmortizacionPrestamo(montoSolicitado, plazoActual.anios, plazoActual.tna, viviendaUnica),
    [montoSolicitado, plazoActual, viviendaUnica],
  );

  function handleMontoChange(monto: number) {
    setMontoSolicitado(monto);
    setValorPropiedad(calcularValorMinimoPropiedad(monto));
  }

  return (
    <section aria-label="Simulador de préstamo" className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 md:flex-row overflow-y-hidden">
        <Card className="w-full basis-[40%] gap-5 p-6">
          <div className="flex flex-col gap-1">
            <Slider
              label="Valor real de propiedad a hipotecar"
              value={valorPropiedad}
              min={VALOR_PROPIEDAD_MIN}
              max={VALOR_PROPIEDAD_MAX}
              step={VALOR_PROPIEDAD_STEP}
              display={formatUSD(valorPropiedad)}
              onChange={(valor) => setValorPropiedad(Math.max(valorMinimo, valor))}
              accent="accent-solicitante"
            />
            {valorPropiedad === valorMinimo && (
              <p className="px-1 text-xs text-text-muted">
                Es el valor mínimo para este monto: se presta hasta el{" "}
                {PORCENTAJE_MAXIMO_PROPIEDAD * 100}% del valor real.
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Slider
              label={`Monto solicitado (hasta el ${PORCENTAJE_MAXIMO_PROPIEDAD * 100}%)`}
              value={montoSolicitado}
              min={MONTO_MINIMO_USD}
              max={MONTO_MAXIMO_USD}
              step={MONTO_STEP}
              display={formatUSD(montoSolicitado)}
              onChange={handleMontoChange}
              accent="accent-solicitante"
            />
            <div className="flex flex-wrap gap-2">
              {MONTOS_RAPIDOS.map((monto) => (
                <button
                  key={monto}
                  type="button"
                  aria-pressed={monto === montoSolicitado}
                  onClick={() => handleMontoChange(monto)}
                  className={`h-9 cursor-pointer rounded-full border px-3 text-xs font-semibold transition-colors ${
                    monto === montoSolicitado
                      ? "border-solicitante bg-solicitante-light text-solicitante-dark"
                      : "border-border bg-surface text-text-muted hover:text-text-secondary"
                  }`}
                >
                  {formatUSD(monto)}
                </button>
              ))}
            </div>
          </div>

          <SelectorPlazo plazoAnios={plazoAnios} onChange={setPlazoAnios} />

          <label className="flex cursor-pointer items-center gap-3 py-1">
            <input
              type="checkbox"
              checked={viviendaUnica}
              onChange={(e) => setViviendaUnica(e.target.checked)}
              className="h-5 w-5 accent-solicitante"
            />
            <span className="text-sm text-text-secondary">Vivienda única y permanente</span>
          </label>
        </Card>

        <div className="flex flex-col gap-4 md:basis-[60%]">
          <ResultadoPrestamo
            cuotaMensual={cuotaMensual}
            filas={filasAmortizacion}
            plazo={plazoActual}
            capitalFinanciado={capitalFinanciado}
            montoSolicitado={montoSolicitado}
            valorPropiedad={valorPropiedad}
            viviendaUnica={viviendaUnica}
          />
          <TablaAmortizacion filas={filasAmortizacion} />
        </div>
      </div>

      <CostosHonorarios montoSolicitado={montoSolicitado} />

      <PrecancelacionPrestamo
        filas={filasAmortizacion}
        plazo={plazoActual}
        montoSolicitado={montoSolicitado}
        capitalFinanciado={capitalFinanciado}
      />

      {mostrarContacto && <CTAContacto accent="solicitante" />}
    </section>
  );
}
