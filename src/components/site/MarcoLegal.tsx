import { Check } from "lucide-react";

type Accent = "solicitante" | "inversor";

const items = [
  "Contrato de mutuo firmado ante escribano público",
  "Hipoteca de 1er grado sobre la propiedad del solicitante",
  "Documentación registrada en el Registro de Propiedad Inmueble",
  "Poder legal para ejecutar la garantía si es necesario",
];

const COPY: Record<Accent, { titulo: string; descripcion: string }> = {
  solicitante: {
    titulo: "Tu préstamo, protegido por ley",
    descripcion:
      "Cuando operás con Lendar, tu préstamo se formaliza a través de un contrato de mutuo ante escribano público. La propiedad queda hipotecada en primer grado y toda la documentación se registra oficialmente, con reglas claras para ambas partes durante toda la operación.",
  },
  inversor: {
    titulo: "Tu inversión, protegida por ley",
    descripcion:
      "Cuando operás con Lendar, tu dinero y tus derechos se formalizan a través de un contrato ante escribano público. La propiedad queda hipotecada en primer grado, lo que te da prioridad ante cualquier otro acreedor. Si algo sale mal, el marco legal permite ejecutar la garantía y recuperar tu inversión.",
  },
};

const ACCENT_CLASSES: Record<Accent, { gradiente: string; texto: string; fondoIcono: string }> = {
  solicitante: {
    gradiente: "from-solicitante-light",
    texto: "text-solicitante-dark",
    fondoIcono: "bg-solicitante-light",
  },
  inversor: {
    gradiente: "from-inversor-light",
    texto: "text-inversor-dark",
    fondoIcono: "bg-inversor-light",
  },
};

interface MarcoLegalProps {
  accent?: Accent;
}

export function MarcoLegal({ accent = "inversor" }: MarcoLegalProps) {
  const copy = COPY[accent];
  const clases = ACCENT_CLASSES[accent];

  return (
    <section
      id="marco-legal"
      className="mx-auto max-w-7xl scroll-mt-[77px] px-4 py-16 md:py-24"
    >
      <div className={`rounded-3xl bg-linear-to-br ${clases.gradiente} to-surface p-8 md:p-14`}>
        <div className="grid gap-10 lg:grid-cols-5 lg:gap-16">
          <div className="flex flex-col items-start gap-6 lg:col-span-2">
            <span
              className={`rounded-full bg-surface px-4 py-1.5 text-xs font-bold tracking-widest shadow-sm ${clases.texto}`}
            >
              MARCO LEGAL
            </span>
            <h2 className="font-serif text-3xl font-semibold tracking-wide md:text-4xl">
              {copy.titulo}
            </h2>
            <p className="leading-relaxed text-text-secondary">{copy.descripcion}</p>
          </div>

          <ul className="flex flex-col gap-4 lg:col-span-3">
            {items.map((item) => (
              <li
                key={item}
                className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-5 shadow-sm"
              >
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${clases.fondoIcono}`}
                >
                  <Check className={`h-5 w-5 ${clases.texto}`} aria-hidden />
                </span>
                <p className="text-sm md:text-base">{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
