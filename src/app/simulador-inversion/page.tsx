import type { Metadata } from "next";
import { SimuladorInversion } from "@/components/simuladores/SimuladorInversion";

export const metadata: Metadata = {
  title: "Simulador de inversión en dólares",
  description:
    "Simulá tu inversión con garantía hipotecaria: cobro mensual estimado, costos y tabla de cuotas mes a mes.",
  robots: { index: false, follow: true },
};

export default function SimularInversionPage() {
  return (
    <div className="mx-auto flex w-full max-w-[1000px] flex-1 flex-col px-4 py-10">
      <h1 className="mb-6 font-serif text-3xl leading-tight font-medium tracking-tight text-text md:text-5xl">
        Simulá tu <em className="font-normal">inversión</em>
      </h1>
      <SimuladorInversion />
    </div>
  );
}
