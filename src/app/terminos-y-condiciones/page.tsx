import type { Metadata } from "next";
import { PaginaLegal } from "@/components/site/PaginaLegal";
import { URL_TERMINOS, obtenerDocumentoLegal } from "@/lib/legales";

export const metadata: Metadata = {
  title: "Términos y condiciones",
  description: "Términos y condiciones generales de uso de Lendar.",
};

export default async function TerminosPage() {
  const bloques = await obtenerDocumentoLegal(URL_TERMINOS);
  return <PaginaLegal titulo="Términos y" destacado="condiciones" urlOficial={URL_TERMINOS} bloques={bloques} />;
}
