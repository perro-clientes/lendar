import Link from "next/link";

type Accent = "solicitante" | "inversor";

const COPY: Record<Accent, { titulo: string; bajada: string; cta: string }> = {
  solicitante: {
    titulo: "¿Listo para pedir tu préstamo?",
    bajada: "Tomá el primer paso y ponete en contacto con uno de nuestros asesores.",
    cta: "Contactanos",
  },
  inversor: {
    titulo: "¿Listo para empezar a invertir?",
    bajada: "Tomá el primer paso y ponete en contacto con uno de nuestros asesores.",
    cta: "Contactanos",
  },
};

const ACENTO_CLASSES: Record<Accent, { fondo: string; cta: string }> = {
  solicitante: {
    fondo: "bg-teal",
    cta: "bg-surface text-solicitante-dark hover:bg-solicitante-light",
  },
  inversor: {
    fondo: "bg-violet",
    cta: "bg-surface text-inversor-dark hover:bg-inversor-light",
  },
};

interface BannerProps {
  accent: Accent;
}

export function Banner({ accent }: BannerProps) {
  const copy = COPY[accent];
  const clases = ACENTO_CLASSES[accent];

  return (
    <section className="flex w-full justify-center pb-16 md:pb-24">
      <div
        className={`flex w-[90%] max-w-[1440px] flex-col items-start gap-6 rounded-xl ${clases.fondo} bg-auto bg-center p-8 text-white md:p-16`}
        style={{ backgroundImage: "url('/miscelaneous/bg-shape-v29.png')" }}
      >
        <h2 className="font-serif text-3xl font-semibold tracking-wide md:text-5xl">
          {copy.titulo}
        </h2>
        <p className="max-w-xl leading-relaxed text-white/90">{copy.bajada}</p>
        <Link
          href="/contacto"
          className={`inline-flex h-12 items-center justify-center rounded-full px-8 text-sm font-semibold transition-colors ${clases.cta}`}
        >
          {copy.cta}
        </Link>
      </div>
    </section>
  );
}
