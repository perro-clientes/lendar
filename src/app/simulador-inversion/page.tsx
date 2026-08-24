import type { Metadata } from "next";
import { SimuladorInversion } from "@/components/simuladores/SimuladorInversion";

export const metadata: Metadata = {
  title: "Simulador de inversión",
  description: "Simulá tu inversión P2P de Lendar: cobro mensual estimado y tabla de cuotas mes a mes.",
};

export default function SimularInversionPage() {
  return (
    <main className="mx-auto flex w-full max-w-[1000px] flex-1 flex-col px-4 py-10">
      <SimuladorInversion />
    </main>
  );
}
