import { formatUSD } from "@/lib/calculos";
import type { FilaAmortizacionInversion } from "@/types/simulador";

interface TablaAmortizacionInversionProps {
  filas: FilaAmortizacionInversion[];
}

export function TablaAmortizacionInversion({ filas }: TablaAmortizacionInversionProps) {
  return (
    <section className="flex min-h-0 md:max-h-[280px] flex-1 flex-col rounded-2xl border border-border bg-surface">
      <p className="px-5 py-4 text-sm font-semibold text-inversor-dark">Cuotas mes a mes</p>
      <div className="max-h-80 min-h-0 flex-1 overflow-y-auto px-3 md:max-h-none">
        <table className="w-full min-w-[400px] border-collapse text-sm tabular-nums">
          <thead>
            <tr className="text-xs uppercase tracking-wide text-text-muted">
              <th className="px-3 py-2 text-left font-medium">N°</th>
              <th className="px-3 py-2 text-right font-medium">Amortización</th>
              <th className="px-3 py-2 text-right font-medium">Interés</th>
              <th className="px-3 py-2 text-right font-medium">Cuota total</th>
              <th className="px-3 py-2 text-right font-medium">Saldo</th>
            </tr>
          </thead>
          <tbody>
            {filas.map((fila) => (
              <tr key={fila.numeroCuota} className="border-t border-border">
                <td className="px-3 py-2 text-left text-text-muted">{fila.numeroCuota}</td>
                <td className="px-3 py-2 text-right">{formatUSD(fila.amortizacion)}</td>
                <td className="px-3 py-2 text-right">{formatUSD(fila.interes)}</td>
                <td className="px-3 py-2 text-right font-semibold">{formatUSD(fila.cuotaTotal)}</td>
                <td className="px-3 py-2 text-right">{formatUSD(fila.saldoDeudor)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
