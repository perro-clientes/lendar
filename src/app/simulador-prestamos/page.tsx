import type { Metadata } from "next";
import { SimuladorPrestamo } from "@/components/simuladores/SimuladorPrestamo";

export const metadata: Metadata = {
  title: "Simulador de préstamo hipotecario",
  description:
    "Simulá tu préstamo hipotecario en dólares: cuota mensual estimada, costos y tabla de cuotas mes a mes.",
  robots: { index: false, follow: true },
};

export default function SimuladorPrestamosPage() {
  return (
    <div className="mx-auto flex w-full max-w-[1000px] flex-1 flex-col px-4 py-10">
      <h1 className="mb-6 font-serif text-3xl leading-tight font-medium tracking-tight text-text md:text-5xl">
        Simulá tu <em className="font-normal">préstamo</em>
      </h1>
      <h2 className="sr-only">Tu simulación</h2>
      <SimuladorPrestamo />
    </div>
  );
}
