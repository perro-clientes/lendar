"use client";

import { useMemo, useState } from "react";
import { CTAContacto } from "@/components/simuladores/CTAContacto";
import { ResultadoInversion } from "@/components/simuladores/ResultadoInversion";
import { SelectorFormato, type OpcionFormato } from "@/components/simuladores/SelectorFormato";
import { SelectorPlazo } from "@/components/simuladores/SelectorPlazo";
import { TablaAmortizacionInversion } from "@/components/simuladores/TablaAmortizacionInversion";
import { Card } from "@/components/ui/Card";
import { Slider } from "@/components/ui/Slider";
import {
  MONTO_MINIMO_USD,
  PLAZOS,
  calcularAmortizacionInversion,
  calcularCobroInversion,
  formatUSD,
} from "@/lib/calculos";
import type { FormatoDinero } from "@/types/simulador";

const INVERSION_MAXIMA_USD = 300000;
const INVERSION_STEP_USD = 1000;
const MONTOS_RAPIDOS = [10000, 50000, 100000, 300000];

const FORMATOS_ENTREGA: readonly OpcionFormato[] = [
  { valor: "efectivo", titulo: "Efectivo", descripcion: "Llevás el dinero en efectivo al momento de la firma." },
  { valor: "transferencia", titulo: "Transferencia", descripcion: "Asistís a la firma y en vivo hacés la transferencia del dinero." },
];

const FORMATOS_COBRO: readonly OpcionFormato[] = [
  { valor: "efectivo", titulo: "Efectivo", descripcion: "Te pagan la cuota mensual en efectivo en el domicilio que determines cercano al lugar de firma." },
  { valor: "transferencia", titulo: "Transferencia", descripcion: "Te pagan mensualmente al CBU que definas." },
];

interface SimuladorInversionProps {
  mostrarContacto?: boolean;
}

export function SimuladorInversion({ mostrarContacto = true }: SimuladorInversionProps) {
  const [montoInvertido, setMontoInvertido] = useState(MONTO_MINIMO_USD);
  const [plazoAnios, setPlazoAnios] = useState(5);
  const [entregaCapital, setEntregaCapital] = useState<FormatoDinero>("efectivo");
  const [cobroCuota, setCobroCuota] = useState<FormatoDinero>("efectivo");

  const plazoActual = PLAZOS.find((plazo) => plazo.anios === plazoAnios) ?? PLAZOS[0];

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
          <div className="flex flex-col gap-2">
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
            <div className="flex flex-wrap gap-2">
              {MONTOS_RAPIDOS.map((monto) => (
                <button
                  key={monto}
                  type="button"
                  aria-pressed={monto === montoInvertido}
                  onClick={() => setMontoInvertido(monto)}
                  className={`h-9 cursor-pointer rounded-full border px-3 text-xs font-semibold transition-colors ${
                    monto === montoInvertido
                      ? "border-inversor bg-inversor-light text-inversor-dark"
                      : "border-border bg-surface text-text-muted hover:text-text-secondary"
                  }`}
                >
                  {formatUSD(monto)}
                </button>
              ))}
            </div>
          </div>

          <SelectorPlazo
            label="Plazo de inversión"
            accent="inversor"
            plazoAnios={plazoAnios}
            onChange={setPlazoAnios}
          />

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
          <ResultadoInversion
            cobroMensual={cobroMensual}
            montoInvertido={montoInvertido}
            plazo={plazoActual}
          />
          <TablaAmortizacionInversion filas={filasAmortizacion} />
        </div>
      </div>
      {mostrarContacto && <CTAContacto accent="inversor" />}
    </section>
  );
}
