const pasos = [
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
];

const INTRO_STICKY =
  "md:sticky md:top-[77px] md:h-[calc(100vh_-_77px)] md:self-start";
const PASO_STICKY = "md:sticky md:top-[77px] md:h-screen";
const PASO_Z = ["z-[1]", "z-[2]", "z-[3]", "z-[4]", "z-[5]"];

export function ProcesoInversor() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="grid gap-12 lg:grid-cols-[35fr_65fr] lg:gap-16">
        <div className={`flex flex-col items-start gap-6 ${INTRO_STICKY} md:justify-center`}>
          <span className="rounded-full bg-border px-4 py-1.5 text-xs font-bold tracking-widest text-text-muted">
            PROCESO
          </span>
          <h2 className="text-3xl font-bold tracking-wide md:text-5xl font-serif">
            ¿Cómo funciona para el inversor?
          </h2>
          <p className="leading-relaxed text-text-muted">
            Cinco pasos desde que aportás tu capital hasta que cobrás cada mes.
          </p>
        </div>

        <ol className="flex flex-col">
          {pasos.map((paso, i) => (
            <li key={paso.titulo} className={`${PASO_STICKY} ${PASO_Z[i]} pb-6 last:pb-0`}>
              <div className="bg-surface pl-8 md:mt-[30%]">
                <div className="flex h-full items-start gap-5 md:items-center">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-inversor-dark text-lg font-bold text-white">
                    {i + 1}
                  </span>
                  <div className="flex max-w-2xl flex-col gap-1">
                    <h3 className="text-xl font-bold text-text md:text-2xl">{paso.titulo}</h3>
                    <p className="text-sm font-medium text-inversor-dark md:text-base">
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
