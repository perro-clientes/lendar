import type { Metadata } from "next";
import { PaginaLegal } from "@/components/site/PaginaLegal";
import { URL_PRIVACIDAD, obtenerDocumentoLegal } from "@/lib/legales";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description:
    "Cómo recolecta, usa, almacena y protege Lendar la información personal de sus usuarios, y cómo hacer consultas sobre tus datos.",
  alternates: { canonical: "/politica-de-privacidad" },
};

export default async function PrivacidadPage() {
  const bloques = await obtenerDocumentoLegal(URL_PRIVACIDAD);
  return <PaginaLegal titulo="Política de" destacado="privacidad" urlOficial={URL_PRIVACIDAD} bloques={bloques} />;
}
