import type { Metadata } from "next";
import { ContactoHero } from "@/components/site/ContactoHero";
import { ContactoForm } from "@/components/site/ContactoForm";
import { LugaresFirma } from "@/components/site/LugaresFirma";

export const metadata: Metadata = {
  title: "Contacto en Santa Fe y Entre Ríos",
  description:
    "Consultanos por préstamos hipotecarios o inversiones en dólares por WhatsApp o mail, y encontrá las escribanías donde se firma en Santa Fe y Entre Ríos.",
  alternates: { canonical: "/contacto" },
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
