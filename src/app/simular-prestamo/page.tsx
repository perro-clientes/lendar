import type { Metadata } from "next";
import { SimuladorPrestamo } from "@/components/simuladores/SimuladorPrestamo";

export const metadata: Metadata = {
  title: "Simulador de préstamo hipotecario online gratis",
  description:
    "Calculá en segundos la cuota mensual, los intereses y el costo total de un préstamo hipotecario P2P sin bancos. Simulá desde tu celular y dejá tus datos.",
  alternates: {
    canonical: "/simular-prestamo",
  },
  openGraph: {
    title: "Simulador de préstamo hipotecario online gratis - Lendar",
    description:
      "Calculá en segundos la cuota mensual, los intereses y el costo total de un préstamo hipotecario P2P sin bancos. Simulá desde tu celular y dejá tus datos.",
    url: "/simular-prestamo",
  },
};

export default async function SimularPrestamoPage(props: PageProps<"/simular-prestamo">) {
  const searchParams = await props.searchParams;
  const evento = typeof searchParams.evento === "string" ? searchParams.evento : undefined;
  const vendedor = typeof searchParams.vendedor === "string" ? searchParams.vendedor : undefined;

  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col px-4 py-12">
      <SimuladorPrestamo tracking={{ evento, vendedor }} />
    </main>
  );
}
