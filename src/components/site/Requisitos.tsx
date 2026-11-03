type Acento = "solicitante" | "inversor";

interface Item {
  texto: string;
  detalle?: string[];
}

interface Tarjeta {
  numero: string;
  titulo: string;
  acento: Acento;
  items: Item[];
}

const TARJETAS: Tarjeta[] = [
  {
    numero: "1",
    titulo: "Información de quien solicita el dinero",
    acento: "solicitante",
    items: [
      { texto: "DNI en PDF" },
      {
        texto: "Ingresos en PDF",
        detalle: [
          "En relación de dependencia: últimos 3 recibos de sueldo",
          "Monotributista: facturación de los últimos 6 meses",
          "Responsable inscripto: facturación de los últimos 6 meses",
        ],
      },
    ],
  },
  {
    numero: "2",
    titulo: "Información del inmueble a hipotecar",
    // Excepción documentada: violeta como neutro de categorización, no como audiencia Inversor.
    acento: "inversor",
    items: [
      { texto: "Escritura del inmueble" },
      { texto: "Impuesto Inmobiliario y Catastro" },
      { texto: "Planos de mensura, verificación de estado parcelario" },
      { texto: "Reserva de la compra-venta conformada con cláusulas Lendar" },
      { texto: "Si la vende RE/MAX: ficha de publicación" },
      { texto: "Si no la vende RE/MAX: ACM con detalles, fotos y firma del corredor inmobiliario" },
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
        {tarjeta.items.map(({ texto, detalle }) => (
          <li key={texto} className="flex items-start gap-3">
            <span
              aria-hidden
              className={`mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full ${clases.circulo}`}
            />
            <div className="flex flex-col gap-2 leading-relaxed text-text-secondary">
              <p>{texto}</p>
              {detalle && (
                <ul className="flex list-disc flex-col gap-1 pl-4 text-sm text-text-muted">
                  {detalle.map((linea) => (
                    <li key={linea}>{linea}</li>
                  ))}
                </ul>
              )}
            </div>
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
            ¿Qué necesito para pedir un préstamo Lendar?
          </h2>
          <p className="leading-relaxed text-text-muted">
            Dos grupos de papeles: los tuyos y los de la propiedad.
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
