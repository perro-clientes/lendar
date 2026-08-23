"use client";

import { useMemo, useState } from "react";
import { CTAContacto } from "@/components/simuladores/CTAContacto";
import { TablaAmortizacionInversion } from "@/components/simuladores/TablaAmortizacionInversion";
import { Card } from "@/components/ui/Card";
import { Field } from "@/components/ui/Field";
import { Slider } from "@/components/ui/Slider";
import {
  COMISION_INVERSOR_PCT,
  MONTO_MINIMO_USD,
  PLAZOS,
  calcularAmortizacionInversion,
  calcularCobroInversion,
  calcularComisionInversor,
  formatUSD,
} from "@/lib/calculos";
import type { FormatoDinero } from "@/types/simulador";

// TODO: confirmar con Lendar el máximo de inversión; se toma el tope del universo de simuladores.
const INVERSION_MAXIMA_USD = 500000;
const INVERSION_STEP_USD = 1000;

interface OpcionFormato {
  valor: FormatoDinero;
  titulo: string;
  descripcion: string;
}

const FORMATOS_ENTREGA: readonly OpcionFormato[] = [
  { valor: "efectivo", titulo: "Efectivo", descripcion: "Llevás el dinero en efectivo al momento de la firma." },
  // TODO: confirmar con Lendar el copy exacto del caso transferencia.
  { valor: "transferencia", titulo: "Transferencia", descripcion: "Transferís el dinero a la cuenta indicada al momento de la firma." },
];

const FORMATOS_COBRO: readonly OpcionFormato[] = [
  { valor: "efectivo", titulo: "Efectivo", descripcion: "Te pagan la cuota mensual en efectivo en el domicilio que determines cercano al lugar de firma." },
  // TODO: confirmar con Lendar el copy exacto del caso transferencia.
  { valor: "transferencia", titulo: "Transferencia", descripcion: "Recibís la cuota mensual por transferencia a la cuenta que indiques." },
];

interface SelectorFormatoProps {
  label: string;
  opciones: readonly OpcionFormato[];
  valor: FormatoDinero;
  onChange: (valor: FormatoDinero) => void;
}

function SelectorFormato({ label, opciones, valor, onChange }: SelectorFormatoProps) {
  return (
    <Field label={label}>
      <div className="grid grid-cols-2 gap-2">
        {opciones.map((opcion) => {
          const seleccionado = opcion.valor === valor;
          return (
            <button
              key={opcion.valor}
              type="button"
              aria-pressed={seleccionado}
              onClick={() => onChange(opcion.valor)}
              className={`flex flex-col items-start gap-1 rounded-xl border-2 p-3 text-left transition-colors ${seleccionado
                ? "border-inversor bg-inversor-light text-inversor-dark"
                : "border-border bg-surface text-text-muted"
                }`}
            >
              <span className="text-sm font-bold leading-none">{opcion.titulo}</span>
              <span className="text-xs leading-snug">{opcion.descripcion}</span>
            </button>
          );
        })}
      </div>
    </Field>
  );
}

interface SimuladorInversionProps {
  mostrarContacto?: boolean;
}

export function SimuladorInversion({ mostrarContacto = true }: SimuladorInversionProps) {
  const [montoInvertido, setMontoInvertido] = useState(MONTO_MINIMO_USD);
  const [plazoAnios, setPlazoAnios] = useState(3);
  const [entregaCapital, setEntregaCapital] = useState<FormatoDinero>("efectivo");
  const [cobroCuota, setCobroCuota] = useState<FormatoDinero>("efectivo");

  const plazoActual = PLAZOS.find((plazo) => plazo.anios === plazoAnios) ?? PLAZOS[0];
  const comisionInversor = calcularComisionInversor(montoInvertido);

  const cobroMensual = useMemo(
    () => calcularCobroInversion(montoInvertido, plazoActual.anios, plazoActual.tna),
    [montoInvertido, plazoActual],
  );
  const filasAmortizacion = useMemo(
    () => calcularAmortizacionInversion(montoInvertido, plazoActual.anios, plazoActual.tna),
    [montoInvertido, plazoActual],
  );

  return (
    <section aria-label="Simulador de inversión" className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 md:flex-row">
        <Card className="w-full basis-[40%] gap-5 p-6">
          <Slider
            label="Monto a invertir"
            value={montoInvertido}
            min={MONTO_MINIMO_USD}
            max={INVERSION_MAXIMA_USD}
            step={INVERSION_STEP_USD}
            display={formatUSD(montoInvertido)}
            onChange={setMontoInvertido}
            accent="accent-inversor"
          />

          <Field label="Plazo de inversión">
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
                      ? "border-inversor bg-inversor-light text-inversor-dark"
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

          <SelectorFormato
            label="Formato de entrega del capital"
            opciones={FORMATOS_ENTREGA}
            valor={entregaCapital}
            onChange={setEntregaCapital}
          />
          <SelectorFormato
            label="Formato de cobro de la cuota"
            opciones={FORMATOS_COBRO}
            valor={cobroCuota}
            onChange={setCobroCuota}
          />
        </Card>

        <div className="flex w-full flex-col gap-4 md:basis-[60%]">
          <div className="rounded-2xl border border-inversor/40 bg-inversor-light p-6">
            <p className="text-sm font-medium text-text-secondary">Cobro mensual estimado</p>
            <p className="mt-1 flex flex-wrap items-baseline gap-x-2">
              <span className="text-4xl font-bold tabular-nums text-inversor-dark sm:text-5xl">
                {formatUSD(cobroMensual)}
              </span>
              <span className="text-base text-text-muted">USD/mes</span>
            </p>
            <p className="mt-2 text-xs leading-relaxed text-text-muted max-w-md">
              Calculado mediante Sistema Francés directo en dólares billete.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-5">
            <p className="text-sm font-semibold text-text-secondary">Costos</p>
            <p className="mt-2 flex flex-wrap items-baseline justify-between gap-x-2 text-sm">
              <span className="text-text-secondary">Comisión Lendar</span>
              <span className="font-semibold tabular-nums text-text">
                {formatUSD(comisionInversor)} ({COMISION_INVERSOR_PCT * 100}% del monto invertido)
              </span>
            </p>
            <p className="mt-1 text-xs leading-relaxed text-text-muted">
              Se paga por única vez, en efectivo, el día de la firma en la escribanía.
            </p>
          </div>

          <TablaAmortizacionInversion filas={filasAmortizacion} />
        </div>
      </div>
      {mostrarContacto && <CTAContacto accent="inversor" />}
    </section>
  );
}
