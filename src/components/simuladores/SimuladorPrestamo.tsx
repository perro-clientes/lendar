"use client";

import { useMemo, useState } from "react";
import { CTAContacto } from "@/components/simuladores/CTAContacto";
import { CostosHonorarios } from "@/components/simuladores/CostosHonorarios";
import { TablaAmortizacion } from "@/components/simuladores/TablaAmortizacion";
import { Card } from "@/components/ui/Card";
import { Field } from "@/components/ui/Field";
import { Slider } from "@/components/ui/Slider";
import {
  COMISION_INICIAL_PCT,
  MONTO_MINIMO_USD,
  PLAZOS,
  PORCENTAJE_MAXIMO_PROPIEDAD,
  calcularAmortizacionPrestamo,
  calcularComisionInicial,
  calcularCuotaPrestamo,
  calcularMontoMaximo,
  formatUSD,
} from "@/lib/calculos";

const VALOR_PROPIEDAD_MIN = 30000;
const VALOR_PROPIEDAD_MAX = 500000;
const VALOR_PROPIEDAD_STEP = 5000;
const MONTO_STEP = 1000;

interface SimuladorPrestamoProps {
  mostrarContacto?: boolean;
}

export function SimuladorPrestamo({ mostrarContacto = true }: SimuladorPrestamoProps) {
  const [valorPropiedad, setValorPropiedad] = useState(100000);
  const [montoSolicitado, setMontoSolicitado] = useState(35000);
  const [plazoAnios, setPlazoAnios] = useState(3);
  // TODO: confirmar con Lendar el impacto de "vivienda única y permanente" en el costo — no inventar una regla de negocio.
  const [viviendaUnica, setViviendaUnica] = useState(false);

  const plazoActual = PLAZOS.find((plazo) => plazo.anios === plazoAnios) ?? PLAZOS[0];
  const montoMaximo = calcularMontoMaximo(valorPropiedad);
  const comisionInicial = calcularComisionInicial(montoSolicitado);

  const cuotaMensual = useMemo(
    () => calcularCuotaPrestamo(montoSolicitado, plazoActual.anios, plazoActual.tna),
    [montoSolicitado, plazoActual],
  );
  const filasAmortizacion = useMemo(
    () => calcularAmortizacionPrestamo(montoSolicitado, plazoActual.anios, plazoActual.tna),
    [montoSolicitado, plazoActual],
  );

  function handleValorPropiedadChange(valor: number) {
    setValorPropiedad(valor);
    setMontoSolicitado((previo) => Math.min(previo, calcularMontoMaximo(valor)));
  }

  return (
    <section aria-label="Simulador de préstamo" className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 md:flex-row overflow-y-hidden">
        <Card className="w-full basis-[40%] gap-5 p-6">
          <Slider
            label="Valor real de propiedad a hipotecar"
            value={valorPropiedad}
            min={VALOR_PROPIEDAD_MIN}
            max={VALOR_PROPIEDAD_MAX}
            step={VALOR_PROPIEDAD_STEP}
            display={formatUSD(valorPropiedad)}
            onChange={handleValorPropiedadChange}
            accent="accent-solicitante"
          />

          <div className="flex flex-col gap-1">
            <Slider
              label="Monto solicitado"
              value={montoSolicitado}
              min={MONTO_MINIMO_USD}
              max={montoMaximo}
              step={MONTO_STEP}
              display={formatUSD(montoSolicitado)}
              onChange={setMontoSolicitado}
              accent="accent-solicitante"
            />
            <p className="px-1 text-xs text-text-light">
              Hasta el {PORCENTAJE_MAXIMO_PROPIEDAD * 100}% del valor de la propiedad · mínimo{" "}
              {formatUSD(MONTO_MINIMO_USD)}
            </p>
          </div>

          <Field label="Plazo de devolución">
            <div className="grid grid-cols-5 gap-2">
              {PLAZOS.map((plazo) => {
                const seleccionado = plazo.anios === plazoAnios;
                return (
                  <button
                    key={plazo.anios}
                    type="button"
                    aria-pressed={seleccionado}
                    onClick={() => setPlazoAnios(plazo.anios)}
                    className={`flex h-16 flex-col items-center justify-center gap-1 rounded-xl border-2 transition-colors ${seleccionado
                      ? "border-solicitante bg-solicitante-light text-solicitante-dark"
                      : "border-border bg-surface text-text-muted"
                      }`}
                  >
                    <span className="text-sm font-bold leading-none">
                      {plazo.anios} año{plazo.anios > 1 ? "s" : ""}
                    </span>
                    <span className="text-xs leading-none">{(plazo.tna * 100).toFixed(1).replace(".", ",")}%</span>
                  </button>
                );
              })}
            </div>
          </Field>

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
          <div className="rounded-2xl border border-solicitante/40 bg-solicitante-light p-6">
            <p className="text-sm font-medium text-text-secondary">Cuota mensual estimada</p>
            <p className="mt-1 flex flex-wrap items-baseline gap-x-2">
              <span className="text-4xl font-bold tabular-nums text-solicitante-dark sm:text-5xl">
                {formatUSD(cuotaMensual)}
              </span>
              <span className="text-base text-text-muted">USD/mes</span>
            </p>
            <p className="mt-2 text-xs leading-relaxed text-text-muted max-w-md">
              Capital e interés · Comisión inicial: {formatUSD(comisionInicial)} (
              {COMISION_INICIAL_PCT * 100}% + IVA) · El IVA sobre intereses se detalla en la tabla.
            </p>
          </div>

          <TablaAmortizacion filas={filasAmortizacion} />
        </div>
      </div>

      <CostosHonorarios montoSolicitado={montoSolicitado} />

      {mostrarContacto && <CTAContacto accent="solicitante" />}
    </section>
  );
}
