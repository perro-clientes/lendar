import { Home, KeyRound, Shield, TrendingUp, type LucideIcon } from "lucide-react";

type Acento = "teal" | "violeta";

interface Beneficio {
  icono: LucideIcon;
  acento: Acento;
  titulo: string;
  descripcion: string;
}

// Acentos teal/violeta alternados como diferenciación visual neutra,
// no como audiencia (mismo patrón que Requisitos en esta landing).
const BENEFICIOS: Beneficio[] = [
  {
    icono: Home,
    acento: "teal",
    titulo: "Comprá Hoy",
    descripcion:
      "Avanzá en la compra sin necesitar el 100% del valor en efectivo. Financiás hasta el 50% del inmueble.",
  },
  {
    icono: Shield,
    acento: "violeta",
    titulo: "Operación Blindada",
    descripcion:
      "Contrato ante escribano, hipoteca registrada y documentación legal completa respaldan cada operación.",
  },
  {
    icono: KeyRound,
    acento: "teal",
    titulo: "Avanzá con Certeza",
    descripcion:
      "Lendar coordina toda la gestión: escribanía, documentación, registro. Vos solo firmás.",
  },
  {
    icono: TrendingUp,
    acento: "violeta",
    titulo: "Más Compradores",
    descripcion:
      "Sin depender de bancos ni créditos tradicionales, accedés a más propiedades y cerrás más rápido.",
  },
];

const ACENTO_CLASSES: Record<Acento, { fondoIcono: string; icono: string }> = {
  teal: { fondoIcono: "bg-teal-light", icono: "text-teal-dark" },
  violeta: { fondoIcono: "bg-violet-light", icono: "text-violet-dark" },
};

function CardBeneficio({ beneficio }: { beneficio: Beneficio }) {
  const clases = ACENTO_CLASSES[beneficio.acento];
  const Icono = beneficio.icono;

  return (
    <article className="flex flex-col gap-4 rounded-3xl border border-border bg-surface p-6 shadow-sm">
      <span className={`flex h-12 w-12 items-center justify-center rounded-xl ${clases.fondoIcono}`}>
        <Icono className={`h-6 w-6 ${clases.icono}`} aria-hidden />
      </span>
      <h3 className="text-lg font-bold md:text-xl">{beneficio.titulo}</h3>
      <p className="leading-relaxed text-text-muted">{beneficio.descripcion}</p>
    </article>
  );
}

export function Beneficios() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:py-24">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col items-start gap-4">
          <span className="rounded-full bg-violet-light px-4 py-1.5 text-xs font-bold tracking-widest text-violet-dark">
            BENEFICIOS
          </span>
          <h2 className="font-serif text-3xl font-bold tracking-wide md:text-5xl">
            ¿Por qué elegir Lendar?
          </h2>
          <p className="leading-relaxed text-text-muted">
            Comprá hoy, con certeza y sin depender de los bancos.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFICIOS.map((beneficio) => (
            <CardBeneficio key={beneficio.titulo} beneficio={beneficio} />
          ))}
        </div>
      </div>
    </section>
  );
}
