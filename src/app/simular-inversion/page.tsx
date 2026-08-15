import type { Metadata } from "next";
import { SimuladorInversion } from "@/components/simuladores/SimuladorInversion";

export const metadata: Metadata = {
  title: "Simulador de inversión en hipotecas P2P online",
  description:
    "Descubrí cuánto podés ganar invirtiendo en hipotecas P2P: capital inicial, aporte mensual y plazo. Simulá en segundos y un asesor te contacta.",
  alternates: {
    canonical: "/simular-inversion",
  },
  openGraph: {
    title: "Simulador de inversión en hipotecas P2P online - Lendar",
    description:
      "Descubrí cuánto podés ganar invirtiendo en hipotecas P2P: capital inicial, aporte mensual y plazo. Simulá en segundos y un asesor te contacta.",
    url: "/simular-inversion",
  },
};

export default async function SimularInversionPage(props: PageProps<"/simular-inversion">) {
  const searchParams = await props.searchParams;
  const evento = typeof searchParams.evento === "string" ? searchParams.evento : undefined;
  const vendedor = typeof searchParams.vendedor === "string" ? searchParams.vendedor : undefined;

  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col px-4 py-12">
      <SimuladorInversion tracking={{ evento, vendedor }} />
    </main>
  );
}
