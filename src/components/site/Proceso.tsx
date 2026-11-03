type Accent = "solicitante" | "inversor";

interface Paso {
  titulo: string;
  subtitulo: string;
  descripcion: string;
}

interface Contenido {
  titulo: string;
  bajada?: string;
  pasos: Paso[];
}

const CONTENIDO: Record<Accent, Contenido> = {
  solicitante: {
    titulo: "El paso a paso de tu solicitud",
    bajada: "Cinco pasos, con plazos estimados.",
    pasos: [
      {
        titulo: "Solicitá tu préstamo online",
        subtitulo: "Instantáneo",
        descripcion:
          "Simulás tu préstamo y nos dejás tus datos. Te llamamos en 1 a 3 días hábiles.",
      },
      {
        titulo: "Reuní y enviá la documentación",
        subtitulo: "A tu ritmo",
        descripcion:
          "DNI, ingresos, escritura, impuesto inmobiliario y reserva de compraventa o ACM del gestor RE/MAX.",
      },
      {
        titulo: "Aprobación y firma del contrato",
        subtitulo: "Hasta 7 días hábiles",
        descripcion:
          "Validamos tu capacidad crediticia y la propiedad. Firmás el contrato digital con Lendar.",
      },
      {
        titulo: "Escribanía, firma e hipoteca",
        subtitulo: "15 a 45 días, según documentación del inmueble",
        descripcion:
          "La escribanía revisa la propiedad. Con el mutuo firmado, el inversor te presta el dinero y se constituye la hipoteca.",
      },
      {
        titulo: "Pagá tus cuotas y listo",
        subtitulo: "Todo el plazo",
        descripcion:
          "Cada mes pagás una cuota fija en dólares al inversor, en efectivo o por transferencia, según lo acordado antes de la firma.",
      },
    ],
  },
  inversor: {
    titulo: "¿Cómo funciona para el inversor?",
    bajada: "Cinco pasos desde que aportás tu capital hasta que cobrás cada mes.",
    pasos: [
      {
        titulo: "Registrá tu capital disponible",
        subtitulo: "Completá tus datos de inversor",
        descripcion:
          "Indicás el monto disponible y el plazo que preferís. Te contactamos en 24–48 hs hábiles.",
      },
      {
        titulo: "Lendar te presenta una operación",
        subtitulo: "Revisión del expediente",
        descripcion:
          "Recibís el legajo del solicitante, la valuación del inmueble y los términos del contrato para revisar.",
      },
      {
        titulo: "Firmás el contrato de mutuo",
        subtitulo: "Ante escribano público",
        descripcion:
          "Firmás el contrato con hipoteca de 1er grado a tu nombre. Se registra en el Registro Inmobiliario.",
      },
      {
        titulo: "Entregás el capital",
        subtitulo: "En la fecha pactada",
        descripcion:
          "Entregás el capital en efectivo o por transferencia, según lo acordado, en presencia del escribano.",
      },
      {
        titulo: "Cobrás tu cuota mensual",
        subtitulo: "Cada mes, sin interrupciones",
        descripcion:
          "Recibís tu cuota mensual en efectivo o por transferencia, en el domicilio o lugar que determinen.",
      },
    ],
  },
};

const ACENTO_CLASSES: Record<Accent, { etiqueta: string; circulo: string }> = {
  solicitante: {
    etiqueta: "bg-solicitante-light text-solicitante-dark",
    circulo: "bg-solicitante-dark",
  },
  inversor: {
    etiqueta: "bg-inversor-light text-inversor-dark",
    circulo: "bg-inversor-dark",
  },
};

interface ProcesoProps {
  accent: Accent;
}

export function Proceso({ accent }: ProcesoProps) {
  const contenido = CONTENIDO[accent];
  const clases = ACENTO_CLASSES[accent];

  return (
    <section id="paso-a-paso" className="mx-auto max-w-7xl scroll-mt-[77px] px-4 py-16 md:py-24">
      <div className="grid gap-10 lg:grid-cols-[35fr_65fr] lg:gap-16">
        <div className="flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start">
          <h2 className="font-serif text-3xl leading-tight font-medium tracking-tight md:text-5xl">
            {contenido.titulo}
          </h2>
          {contenido.bajada && (
            <p className="text-lg leading-relaxed text-text-secondary">{contenido.bajada}</p>
          )}
        </div>

        <ol className="flex flex-col">
          {contenido.pasos.map((paso, i) => (
            <li key={paso.titulo} className="flex gap-5">
              <div className="flex flex-col items-center">
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-bold text-white ${clases.circulo}`}
                >
                  {i + 1}
                </span>
                {i < contenido.pasos.length - 1 && (
                  <span aria-hidden className="w-px flex-1 bg-border" />
                )}
              </div>
              <div className="flex flex-col items-start gap-2 pb-8 pt-1.5">
                <h3 className="text-lg leading-snug font-bold text-text md:text-xl">{paso.titulo}</h3>
                <p className={`rounded-full px-3 py-1 text-xs font-semibold ${clases.etiqueta}`}>
                  {paso.subtitulo}
                </p>
                <p className="leading-relaxed text-text-muted">{paso.descripcion}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
