import Image from "next/image";
import Link from "next/link";
import { MONTO_MINIMO_USD, PLAZOS, formatPorcentaje, formatUSD } from "@/lib/calculos";
import { CTAButton } from "./CTAButton";

type Accent = "solicitante" | "inversor";

const PLAZO_MIN = PLAZOS[0];
const PLAZO_MAX = PLAZOS[PLAZOS.length - 1];
const RANGO_PLAZOS = `${PLAZO_MIN.anios} a ${PLAZO_MAX.anios} años`;
const TNA_DESDE = formatPorcentaje(PLAZO_MIN.tna);

const CONTENIDO = {
  solicitante: {
    id: "prestamos",
    titulo: "Pedí un préstamo para comprar tu casa en la",
    destacado: "red RE/MAX",
    bajada: "Sin bancos. Mínimos requisitos. Rápido y fácil.",
    imagen: "/miscelaneous/nino-padre-jugando-caja-sala-estar_23-2148574081.jpg",
    alt: "Padre jugando con su hijo en el living de su casa",
    datos: [
      { valor: formatUSD(MONTO_MINIMO_USD), etiqueta: "Monto mínimo" },
      { valor: RANGO_PLAZOS, etiqueta: "Plazo" },
      { valor: TNA_DESDE, etiqueta: "TNA desde" },
    ],
    cta: "Conocé los préstamos",
    href: "/pedi-tu-prestamo",
    variante: "solid",
    seccion: "",
    grilla: "lg:grid-cols-[5fr_6fr]",
    foto: "",
    borde: "border-border",
  },
  inversor: {
    id: "inversiones",
    titulo: "Invertí prestando a otra persona,",
    destacado: "con garantía hipotecaria",
    bajada: "Hipoteca con ingreso mensual en dólares.",
    imagen: "/miscelaneous/inverti-tu-dinero2.jpg",
    alt: "Hombre sonriendo de brazos cruzados en una oficina",
    datos: [
      { valor: formatUSD(MONTO_MINIMO_USD), etiqueta: "Inversión mínima" },
      { valor: RANGO_PLAZOS, etiqueta: "Plazo" },
      { valor: "Mensual", etiqueta: "Cobro en dólares" },
    ],
    cta: "Conocé las inversiones",
    href: "/inverti-en-lendar",
    variante: "solid-inversor-dark",
    seccion: "bg-inversor-light",
    grilla: "lg:grid-cols-[6fr_5fr]",
    foto: "lg:order-2",
    borde: "border-violet-lighter",
  },
} as const;

interface SeccionAudienciaProps {
  accent: Accent;
}

export function SeccionAudiencia({ accent }: SeccionAudienciaProps) {
  const contenido = CONTENIDO[accent];

  return (
    <section id={contenido.id} className={`scroll-mt-[77px] py-16 md:py-24 ${contenido.seccion}`}>
      <div className={`mx-auto grid max-w-7xl items-center gap-10 px-4 lg:gap-20 ${contenido.grilla}`}>
        <div className={`relative aspect-square overflow-hidden rounded-2xl ${contenido.foto}`}>
          {/* Algunas fotos traen un degradé a la derecha: el recorte se ancla a la izquierda. */}
          <Image
            src={contenido.imagen}
            alt={contenido.alt}
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover object-left"
          />
        </div>
        <div className="flex flex-col items-start gap-6">
          <h2 className="font-serif text-3xl leading-tight font-medium tracking-tight text-text md:text-5xl">
            {contenido.titulo} <em className="font-normal">{contenido.destacado}</em>
          </h2>
          <p className="text-lg text-text-secondary">{contenido.bajada}</p>
          <dl className={`grid w-full grid-cols-3 gap-4 border-y py-5 ${contenido.borde}`}>
            {contenido.datos.map((dato) => (
              <div key={dato.etiqueta} className="flex flex-col-reverse justify-end gap-1">
                <dt className="text-xs text-text-muted md:text-sm">{dato.etiqueta}</dt>
                <dd className="font-serif text-lg leading-snug font-medium text-text md:text-2xl">
                  {dato.valor}
                </dd>
              </div>
            ))}
          </dl>
          <Link href={contenido.href}>
            <CTAButton variant={contenido.variante}>{contenido.cta}</CTAButton>
          </Link>
        </div>
      </div>
    </section>
  );
}
