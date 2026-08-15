import type { Metadata } from "next";
import { SimuladorPrestamo } from "@/components/simuladores/SimuladorPrestamo";
import { SimuladorInversion } from "@/components/simuladores/SimuladorInversion";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col gap-16 px-4 py-16">
      <section aria-label="Simulador de préstamo" className="flex flex-col gap-4">
        <SimuladorPrestamo />
      </section>
      <section aria-label="Simulador de inversión" className="flex flex-col gap-4">
        <SimuladorInversion />
      </section>
    </main>
  );
}
