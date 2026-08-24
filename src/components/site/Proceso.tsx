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
    pasos: [
      {
        titulo: "Solicitá online",
        subtitulo: "Completá tus datos",
        descripcion:
          "Llenás el formulario online. Te contactamos en no más de 24–48 horas hábiles.",
      },
      {
        titulo: "Reuní la documentación",
        subtitulo: "3 a 5 días hábiles",
        descripcion:
          "Juntás la documentación personal y del inmueble. Nuestro equipo te acompaña en el proceso.",
      },
      {
        titulo: "Aprobación y firma del contrato",
        subtitulo: "Firmá el contrato digital con el inversor",
        descripcion:
          "El inversor revisa y aprueba. Firmás el contrato de mutuo ante escribano público.",
      },
      {
        titulo: "Escrituría, firma e hipoteca",
        subtitulo: "3 a 5 días hábiles luego de la aprobación",
        descripcion:
          "La escribanía recibe el pago en efectivo al momento de la firma. Se inscribe la hipoteca en el Registro.",
      },
      {
        titulo: "Pagá tus cuotas y listo",
        subtitulo: "Pagás el monto mensual pactado",
        descripcion:
          "Abonás en efectivo o por transferencia en el domicilio o lugar que acuerden con el inversor.",
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

const ACENTO_CLASSES: Record<Accent, { badge: string; circulo: string; texto: string }> = {
  solicitante: {
    badge: "bg-solicitante-light text-solicitante-dark",
    circulo: "bg-solicitante-dark",
    texto: "text-solicitante-dark",
  },
  inversor: {
    badge: "bg-border text-text-muted",
    circulo: "bg-inversor-dark",
    texto: "text-inversor-dark",
  },
};

const INTRO_STICKY =
  "lg:sticky lg:top-[77px] lg:h-[calc(100vh_-_77px)] lg:self-start";
const PASO_STICKY = "lg:sticky lg:top-[77px] lg:h-screen";
const PASO_Z = ["z-[1]", "z-[2]", "z-[3]", "z-[4]", "z-[5]"];

interface ProcesoProps {
  accent: Accent;
}

export function Proceso({ accent }: ProcesoProps) {
  const contenido = CONTENIDO[accent];
  const clases = ACENTO_CLASSES[accent];

  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="grid gap-12 lg:grid-cols-[35fr_65fr] lg:gap-16">
        <div className={`flex flex-col items-start gap-6 ${INTRO_STICKY} md:justify-center`}>
          <span className={`rounded-full px-4 py-1.5 text-xs font-bold tracking-widest ${clases.badge}`}>
            PROCESO
          </span>
          <h2 className="font-serif text-3xl font-bold tracking-wide md:text-5xl">
            {contenido.titulo}
          </h2>
          {contenido.bajada && (
            <p className="leading-relaxed text-text-muted">{contenido.bajada}</p>
          )}
        </div>

        <ol className="flex flex-col">
          {contenido.pasos.map((paso, i) => (
            <li key={paso.titulo} className={`${PASO_STICKY} ${PASO_Z[i]} pb-6 last:pb-0`}>
              <div className="bg-surface pl-8 lg:mt-[40%]">
                <div className="flex h-full items-start gap-5 md:items-center">
                  <span
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-lg font-bold text-white ${clases.circulo}`}
                  >
                    {i + 1}
                  </span>
                  <div className="flex max-w-2xl flex-col gap-1">
                    <h3 className="text-xl font-bold text-text md:text-2xl">{paso.titulo}</h3>
                    <p className={`text-sm font-medium md:text-base ${clases.texto}`}>
                      {paso.subtitulo}
                    </p>
                    <p className="pt-2 text-sm leading-relaxed text-text-muted md:text-base">
                      {paso.descripcion}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
