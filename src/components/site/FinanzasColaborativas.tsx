import Image from "next/image";
import { BadgeCheck, FileSearch, Scale, ShieldCheck, Stamp, Users, type LucideIcon } from "lucide-react";

interface Servicio {
  icono: LucideIcon;
  titulo: string;
}

const SERVICIOS: Servicio[] = [
  { icono: Users, titulo: "Coordinación entre las partes" },
  { icono: Scale, titulo: "Gestión administrativa y legal" },
  { icono: FileSearch, titulo: "Análisis de documentación respaldatoria" },
  { icono: BadgeCheck, titulo: "Calificación crediticia" },
  { icono: Stamp, titulo: "Gestión notarial" },
  { icono: ShieldCheck, titulo: "Gestión de recupero de crédito" },
];

export function FinanzasColaborativas() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 md:gap-16">
        <div className="grid items-center gap-10 lg:grid-cols-[6fr_4fr] lg:gap-20">
          <div className="flex flex-col items-start gap-5">
            <h2 className="font-serif text-3xl leading-tight font-medium tracking-tight text-text md:text-5xl">
              Confiable, transparente y <em className="font-normal">justo</em>
            </h2>
            <p className="text-lg leading-relaxed text-text-secondary">
              Las finanzas colaborativas permiten que las personas inviertan directamente en otras
              personas, sin la intermediación de bancos o instituciones financieras. La tasa que paga
              el solicitante la cobra 100% el inversor.
            </p>
            <p className="leading-relaxed text-text-secondary">
              Lendar conecta a ambas partes y se ocupa de que la operación sea resuelta, coordinando y
              realizando todas las gestiones administrativas, legales y escriturales necesarias.
            </p>
          </div>
          <Image
            src="/miscelaneous/finanzas-colaborativas-home.png"
            alt="Dos personas se dan la mano para cerrar un acuerdo"
            width={500}
            height={460}
            sizes="(min-width: 1024px) 400px, 100vw"
            className="w-full max-w-100 lg:justify-self-end"
          />
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICIOS.map(({ icono: Icono, titulo }) => (
            <li key={titulo} className="flex items-center gap-4 rounded-2xl bg-background p-5">
              <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-surface">
                <Icono className="h-5 w-5 text-violet-dark" aria-hidden />
              </span>
              <span className="leading-snug font-semibold text-text">{titulo}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
