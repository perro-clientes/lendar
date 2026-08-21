import { formatUSD } from "@/lib/calculos";
import type { FilaAmortizacion } from "@/types/simulador";

interface TablaAmortizacionProps {
  filas: FilaAmortizacion[];
}

export function TablaAmortizacion({ filas }: TablaAmortizacionProps) {
  return (
    <details className="group rounded-2xl border border-border bg-surface">
      <summary className="flex cursor-pointer list-none select-none items-center justify-between px-5 py-4 text-sm font-semibold text-solicitante-dark">
        Ver tabla de cuotas mes a mes
        <span aria-hidden className="transition-transform group-open:rotate-180">
          ▾
        </span>
      </summary>
      <div className="max-h-55 overflow-y-auto px-3 pb-4">
        <table className="max-h-50 w-full min-w-[480px] border-collapse text-sm tabular-nums">
          <thead>
            <tr className="text-xs uppercase tracking-wide text-text-muted">
              <th className="px-3 py-2 text-left font-medium">N°</th>
              <th className="px-3 py-2 text-right font-medium">Amortización</th>
              <th className="px-3 py-2 text-right font-medium">Interés</th>
              <th className="px-3 py-2 text-right font-medium">IVA</th>
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
                <td className="px-3 py-2 text-right">{formatUSD(fila.iva)}</td>
                <td className="px-3 py-2 text-right font-semibold">{formatUSD(fila.cuotaTotal)}</td>
                <td className="px-3 py-2 text-right">{formatUSD(fila.saldoDeudor)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </details>
  );
}
