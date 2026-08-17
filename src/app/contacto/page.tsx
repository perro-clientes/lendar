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
      <section className="bg-violet bg-auto bg-center"
        style={{ backgroundImage: "url('/miscelaneous/bg-shape-v29.png')" }}>
        <div className="flex flex-col md:flex-row md:items-center min-h-[80vh] max-w-7xl mx-auto">
          <ContactoHero />
          <ContactoForm />
        </div>
      </section>
      <LugaresFirma />
    </>
  );
}
