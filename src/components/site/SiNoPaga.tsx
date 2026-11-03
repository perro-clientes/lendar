import { PLAZOS, calcularTasaPunitoria, formatPorcentaje } from "@/lib/calculos";
import { LineaDeTiempo, type PasoLinea } from "./LineaDeTiempo";

const TNA_EJEMPLO = PLAZOS[PLAZOS.length - 1].tna;
const TASA_PUNITORIA = formatPorcentaje(calcularTasaPunitoria(TNA_EJEMPLO), 2);

const PUNITORIO = [
  { valor: "100%", etiqueta: "Punitorio que cobrás vos" },
  { valor: "USD 0", etiqueta: "Costo de la gestión de mora para vos: la paga el deudor" },
];

const PASOS: PasoLinea[] = [
  {
    titulo: "Filtro previo",
    subtitulo: "Antes de la firma",
    descripcion:
      "Solo se aprueban solicitantes con buen historial de pago y cuota acorde a sus ingresos. La propiedad se verifica y cuenta con apto hipotecario de la escribanía.",
  },
  {
    titulo: "Se atrasa una cuota",
    subtitulo: "Si vos lo pedís",
    descripcion:
      "Le avisás a Lendar y nos ocupamos del mensaje, el seguimiento, la llamada y el aviso de gestión legal.",
  },
  {
    titulo: "Corre el interés punitorio",
    subtitulo: "Desde el primer día de mora",
    descripcion: `El interés pactado sube un 50%. Sobre ${formatPorcentaje(TNA_EJEMPLO)} TNA, la mora rinde ${TASA_PUNITORIA} TNA.`,
    detalle: (
      <dl className="mt-2 grid w-full gap-3 sm:grid-cols-2">
        {PUNITORIO.map(({ valor, etiqueta }) => (
          <div key={etiqueta} className="flex flex-col-reverse justify-end gap-1 rounded-xl bg-inversor-light p-4">
            <dt className="text-sm text-text-secondary">{etiqueta}</dt>
            <dd className="font-serif text-2xl font-medium text-inversor-dark">{valor}</dd>
          </div>
        ))}
      </dl>
    ),
  },
  {
    titulo: "Ejecución de la hipoteca",
    subtitulo: "Último recurso",
    descripcion:
      "Si la mora no se resuelve, se ejecuta la hipoteca. La vía ya está firmada, los costos son a cargo del deudor y Lendar gestiona el proceso.",
  },
];

export function SiNoPaga() {
  return (
    <section id="si-no-pagan" className="mx-auto max-w-7xl scroll-mt-[77px] px-4 py-16 md:py-24">
      <div className="grid gap-10 lg:grid-cols-[35fr_65fr] lg:gap-16">
        <div className="flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start">
          <h2 className="font-serif text-3xl leading-tight font-medium tracking-tight text-text md:text-5xl">
            ¿Y si el solicitante <em className="font-normal">no paga?</em>
          </h2>
          <p className="text-lg leading-relaxed text-text-secondary">
            Desde 2018, más de 2.000 familias compraron su casa con Lendar en todo el país. Nunca tuvimos
            que ejecutar una propiedad por mora.
          </p>
        </div>
        <LineaDeTiempo accent="inversor" pasos={PASOS} />
      </div>
    </section>
  );
}
