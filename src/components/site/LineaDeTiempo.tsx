import type { ReactNode } from "react";

type Accent = "solicitante" | "inversor";

export interface PasoLinea {
  titulo: string;
  subtitulo: string;
  descripcion: string;
  detalle?: ReactNode;
}

const ACENTO_CLASES: Record<Accent, { etiqueta: string; circulo: string }> = {
  solicitante: {
    etiqueta: "bg-solicitante-light text-solicitante-dark",
    circulo: "bg-solicitante-dark",
  },
  inversor: {
    etiqueta: "bg-inversor-light text-inversor-dark",
    circulo: "bg-inversor-dark",
  },
};

interface LineaDeTiempoProps {
  accent: Accent;
  pasos: PasoLinea[];
}

export function LineaDeTiempo({ accent, pasos }: LineaDeTiempoProps) {
  const clases = ACENTO_CLASES[accent];

  return (
    <ol className="flex flex-col">
      {pasos.map((paso, i) => (
        <li key={paso.titulo} className="flex gap-5">
          <div className="flex flex-col items-center">
            <span
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-bold text-white ${clases.circulo}`}
            >
              {i + 1}
            </span>
            {i < pasos.length - 1 && <span aria-hidden className="w-px flex-1 bg-border" />}
          </div>
          <div className="flex min-w-0 flex-1 flex-col items-start gap-2 pb-8 pt-1.5">
            <h3 className="text-lg leading-snug font-bold text-text md:text-xl">{paso.titulo}</h3>
            <p className={`rounded-full px-3 py-1 text-xs font-semibold ${clases.etiqueta}`}>
              {paso.subtitulo}
            </p>
            <p className="leading-relaxed text-text-muted">{paso.descripcion}</p>
            {paso.detalle}
          </div>
        </li>
      ))}
    </ol>
  );
}
