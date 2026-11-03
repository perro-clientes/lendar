import { Field } from "@/components/ui/Field";
import type { FormatoDinero } from "@/types/simulador";

export interface OpcionFormato {
  valor: FormatoDinero;
  titulo: string;
  descripcion: string;
}

interface SelectorFormatoProps {
  label: string;
  opciones: readonly OpcionFormato[];
  valor: FormatoDinero;
  onChange: (valor: FormatoDinero) => void;
}

export function SelectorFormato({ label, opciones, valor, onChange }: SelectorFormatoProps) {
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
              className={`flex cursor-pointer flex-col items-start gap-1 rounded-xl border-2 p-3 text-left transition-colors ${seleccionado
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
