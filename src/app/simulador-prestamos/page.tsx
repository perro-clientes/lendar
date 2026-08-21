import type { Metadata } from "next";
import { SimuladorPrestamo } from "@/components/simuladores/SimuladorPrestamo";

export const metadata: Metadata = {
  title: "Simulador de préstamo",
  description: "Simulá tu préstamo hipotecario P2P de Lendar: cuota mensual estimada y tabla de cuotas mes a mes.",
};

export default function SimuladorPrestamosPage() {
  return (
    <main className="mx-auto flex w-full max-w-[1000px] flex-1 flex-col px-4 py-10">
      <SimuladorPrestamo />
    </main>
  );
}
