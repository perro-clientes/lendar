import { Field } from "@/components/ui/Field";
import { PLAZOS, formatPorcentaje } from "@/lib/calculos";

type Accent = "solicitante" | "inversor";

const SELECCIONADO_CLASES: Record<Accent, string> = {
  solicitante: "border-solicitante bg-solicitante-light text-solicitante-dark",
  inversor: "border-inversor bg-inversor-light text-inversor-dark",
};

interface SelectorPlazoProps {
  plazoAnios: number;
  onChange: (anios: number) => void;
  label?: string;
  accent?: Accent;
}

export function SelectorPlazo({
  plazoAnios,
  onChange,
  label = "Plazo de devolución",
  accent = "solicitante",
}: SelectorPlazoProps) {
  return (
    <Field label={label}>
      <div className="grid grid-cols-5 gap-2">
        {PLAZOS.map((plazo) => {
          const seleccionado = plazo.anios === plazoAnios;
          return (
            <button
              key={plazo.anios}
              type="button"
              aria-pressed={seleccionado}
              onClick={() => onChange(plazo.anios)}
              className={`flex h-16 cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border-2 transition-colors ${
                seleccionado ? SELECCIONADO_CLASES[accent] : "border-border bg-surface text-text-muted"
              }`}
            >
              <span className="text-sm font-bold leading-none">
                {plazo.anios} año{plazo.anios > 1 ? "s" : ""}
              </span>
              <span className="text-xs leading-none">{formatPorcentaje(plazo.tna)}</span>
            </button>
          );
        })}
      </div>
    </Field>
  );
}
