import type { Metadata } from "next";
import { HeroInversor } from "@/components/site/HeroInversor";
import { Banner } from "@/components/site/Banner";
import { MarcoLegal } from "@/components/site/MarcoLegal";
import { Proceso } from "@/components/site/Proceso";
import { SimuladorInversion } from "@/components/simuladores/SimuladorInversion";

export const metadata: Metadata = {
  title: "Invertí en Lendar",
  description:
    "Financiá hipotecas reales de clientes de la red RE/MAX Argentina y cobrá una renta mensual fija en dólares con Lendar.",
};

export default function InvertiEnLendarPage() {
  return (
    <>
      <HeroInversor />
      <MarcoLegal />
      <Proceso accent="inversor" />
      <section
        id="simulador"
        className="mx-auto flex w-full max-w-[1200px] scroll-mt-[77px] flex-col gap-8 px-4 pb-16 md:pb-24"
      >
        <div className="flex flex-col items-start gap-4 md:items-center md:text-center">
          <h2 className="text-3xl font-bold tracking-wide md:text-5xl font-serif">Simulá tu inversión</h2>
          <p className="leading-relaxed text-text-muted">
            Ajustá el monto y el plazo para ver tu cobro mensual estimado.
          </p>
        </div>
        <SimuladorInversion mostrarContacto={false} />
      </section>
      <Banner accent="inversor" />
    </>
  );
}
