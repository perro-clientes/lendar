import { FinanzasColaborativas } from "@/components/site/FinanzasColaborativas";
import { Hero } from "@/components/site/Hero";
import { SeccionAudiencia } from "@/components/site/SeccionAudiencia";

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
