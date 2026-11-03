import { Calculator } from "lucide-react";
import { COMISION_INICIAL_PCT, calcularComisionInicial, formatUSD } from "@/lib/calculos";
import { WHATSAPP_URL } from "@/lib/contacto";

interface CostosHonorariosProps {
  montoSolicitado: number;
}

function CardComision({ montoSolicitado }: { montoSolicitado: number }) {
  return (
    <article className="flex flex-col rounded-2xl border border-violet-lighter bg-linear-to-br from-surface to-violet-light p-6 md:p-8">
      <div className="flex flex-col gap-2">
        <h4 className="text-xl font-bold text-violet-dark">Comisión Lendar</h4>
        <p className="text-base leading-relaxed text-text-secondary">
          <span className="font-bold text-text">{COMISION_INICIAL_PCT * 100}%</span> + IVA sobre{" "}
          <span className="font-bold text-text">{formatUSD(montoSolicitado)}</span>
        </p>
        <p className="text-sm italic leading-relaxed text-text-muted">
          La comisión no se paga por separado: se suma al préstamo y se devuelve junto con la cuota
          mensual.
        </p>
      </div>

      <div className="mt-auto flex items-center justify-between gap-4 rounded-xl border border-border bg-surface pt-6 p-4 md:p-5">
        <p className="text-sm text-text-muted md:text-base">Comisión total con IVA</p>
        <p className="text-lg font-bold tabular-nums text-violet-dark md:text-xl">
          {formatUSD(calcularComisionInicial(montoSolicitado))}
        </p>
      </div>
    </article>
  );
}

function CardEscribania() {
  return (
    <article className="flex flex-col rounded-2xl border border-teal-lighter bg-linear-to-br from-surface to-teal-light p-6 md:p-8">
      <h4 className="text-xl font-bold text-teal-dark">Previsión de costos de escribanía</h4>

      <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <p className="text-sm leading-relaxed text-text md:text-base">
          Compra con financiamiento Lendar{" "}
          <span className="text-text-muted">(incluye compra-venta e hipoteca)</span>
        </p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 font-bold text-teal-dark underline hover:text-text"
        >
          Consultá por WhatsApp
        </a>
      </div>

      <p className="mt-auto pt-6 text-sm italic leading-relaxed text-text-muted">
        El costo varía según cada caso y plaza. No es un presupuesto ni una cotización, y Lendar no lo
        garantiza. Confirmalo siempre con la escribanía a cargo de tu operación.
      </p>
    </article>
  );
}

export function CostosHonorarios({ montoSolicitado }: CostosHonorariosProps) {
  return (
    <section aria-label="Costos y honorarios" className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Calculator className="h-5 w-5 text-inversor-dark" aria-hidden />
        <h3 className="text-xl font-bold text-inversor-dark md:text-2xl">Costos y honorarios</h3>
      </div>

      <div className="grid gap-4 lg:grid-cols-[35fr_65fr] lg:items-stretch">
        <CardComision montoSolicitado={montoSolicitado} />
        <CardEscribania />
      </div>
    </section>
  );
}
