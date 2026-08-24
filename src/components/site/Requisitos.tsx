type Acento = "solicitante" | "inversor";

interface Tarjeta {
  numero: string;
  titulo: string;
  acento: Acento;
  items: string[];
}

const TARJETAS: Tarjeta[] = [
  {
    numero: "1",
    titulo: "Información del solicitante",
    acento: "solicitante",
    items: [
      "DNI (frente y dorso)",
      "CUIL",
      "3 meses de recibos de sueldo o estados de cuenta",
      "Contrato de alquiler vigente (si aplica)",
      "Detalle de otras deudas, si las hubiere",
    ],
  },
  {
    numero: "2",
    titulo: "Información del inmueble",
    // Excepción documentada: violeta como neutro de categorización, no como audiencia Inversor.
    acento: "inversor",
    items: [
      "Copia de la escritura del inmueble",
      "Plano de la estructura",
      "Documentación para escritura (IIBB, API, libre deuda municipal)",
      "Informe de dominio y condiciones de restricción",
      "Informe de deuda o estado de cuenta del acreedor (si hay deuda)",
    ],
  },
];

const ACENTO_CLASSES: Record<Acento, { fondo: string; circulo: string }> = {
  solicitante: { fondo: "from-solicitante-light", circulo: "bg-solicitante-dark" },
  inversor: { fondo: "from-inversor-light", circulo: "bg-inversor-dark" },
};

function TarjetaRequisitos({ tarjeta }: { tarjeta: Tarjeta }) {
  const clases = ACENTO_CLASSES[tarjeta.acento];

  return (
    <article
      className={`flex flex-col gap-6 rounded-3xl border border-border bg-linear-to-br ${clases.fondo} to-surface p-6 md:p-8`}
    >
      <div className="flex items-center gap-4">
        <span
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-lg font-bold text-white ${clases.circulo}`}
        >
          {tarjeta.numero}
        </span>
        <h3 className="text-xl font-bold md:text-2xl">{tarjeta.titulo}</h3>
      </div>

      <ul className="flex flex-col gap-3">
        {tarjeta.items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <span
              aria-hidden
              className={`mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full ${clases.circulo}`}
            />
            <p className="leading-relaxed text-text-secondary">{item}</p>
          </li>
        ))}
      </ul>
    </article>
  );
}

export function Requisitos() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:py-24">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col items-start gap-4">
          <span className="rounded-full bg-solicitante-light px-4 py-1.5 text-xs font-bold tracking-widest text-solicitante-dark">
            REQUISITOS
          </span>
          <h2 className="font-serif text-3xl font-bold tracking-wide md:text-5xl">
            ¿Qué necesito para pedir un Lendar?
          </h2>
          <p className="leading-relaxed text-text-muted">
            Documentación personal y del inmueble que vas a hipotecar.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          {TARJETAS.map((tarjeta) => (
            <TarjetaRequisitos key={tarjeta.numero} tarjeta={tarjeta} />
          ))}
        </div>
      </div>
    </section>
  );
}
