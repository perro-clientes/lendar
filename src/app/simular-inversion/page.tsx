import type { Metadata } from "next";
import { SimuladorInversion } from "@/components/simuladores/SimuladorInversion";

export const metadata: Metadata = {
  title: "Simulador de inversión | Lendar",
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
