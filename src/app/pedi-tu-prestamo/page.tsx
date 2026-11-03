import type { Metadata } from "next";
import { HeroSolicitante } from "@/components/site/HeroSolicitante";
import { MarcoLegal } from "@/components/site/MarcoLegal";
import { Requisitos } from "@/components/site/Requisitos";
import { Proceso } from "@/components/site/Proceso";
import { Beneficios } from "@/components/site/Beneficios";
import { SimuladorPrestamo } from "@/components/simuladores/SimuladorPrestamo";
import { Banner } from "@/components/site/Banner";
import { LugaresFirma } from "@/components/site/LugaresFirma";

export const metadata: Metadata = {
  title: "Préstamo hipotecario en dólares sin bancos",
  description:
    "Cuota fija en dólares, financiamiento de hasta el 35% del valor de la propiedad y preaprobación estimada en menos de 7 días hábiles.",
  alternates: { canonical: "/pedi-tu-prestamo" },
};

export default function PediTuPrestamoPage() {
  return (
    <>
      <HeroSolicitante />
      <MarcoLegal accent="solicitante" />
      <Requisitos />
      <Proceso accent="solicitante" />
      <Beneficios />
      <section
        id="simulador"
        className="mx-auto flex w-full max-w-[1200px] scroll-mt-[77px] flex-col gap-8 px-4 pb-16 md:pb-24"
      >
        <div className="flex flex-col items-start gap-4 md:items-center md:text-center">
          <h2 className="font-serif text-3xl font-bold tracking-wide md:text-5xl">
            Simulá tu préstamo
          </h2>
          <p className="leading-relaxed text-text-muted">
            Ajustá el valor de la propiedad, el monto y el plazo para ver tu cuota mensual estimada.
          </p>
        </div>
        <SimuladorPrestamo mostrarContacto={false} />
      </section>
      <LugaresFirma />
      <div className="pt-16 md:pt-24">
        <Banner accent="solicitante" />
      </div>
    </>
  );
}
