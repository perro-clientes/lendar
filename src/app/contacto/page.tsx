import type { Metadata } from "next";
import { ContactoHero } from "@/components/site/ContactoHero";
import { ContactoForm } from "@/components/site/ContactoForm";
import { LugaresFirma } from "@/components/site/LugaresFirma";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Contactanos para consultas sobre préstamos hipotecarios o inversiones P2P en Lendar.",
};

export default function ContactoPage() {
  return (
    <>
      <section className="flex flex-col md:flex-row min-h-[80vh]">
        <ContactoHero />
        <ContactoForm />
      </section>
      <LugaresFirma />
    </>
  );
}
