import type { Metadata } from "next";
import { PaginaLegal } from "@/components/site/PaginaLegal";
import { URL_PRIVACIDAD, obtenerDocumentoLegal } from "@/lib/legales";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: "Cómo trata Lendar la información de sus usuarios.",
};

export default async function PrivacidadPage() {
  const bloques = await obtenerDocumentoLegal(URL_PRIVACIDAD);
  return <PaginaLegal titulo="Política de" destacado="privacidad" urlOficial={URL_PRIVACIDAD} bloques={bloques} />;
}
