import type { Metadata } from "next";
import { FinanzasColaborativas } from "@/components/site/FinanzasColaborativas";
import { Hero } from "@/components/site/Hero";
import { SeccionAudiencia } from "@/components/site/SeccionAudiencia";

export const metadata: Metadata = {
  title: { absolute: "Préstamos hipotecarios e inversión en dólares | Lendar" },
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <SeccionAudiencia accent="solicitante" />
      <SeccionAudiencia accent="inversor" />
      <FinanzasColaborativas />
    </>
  );
}
