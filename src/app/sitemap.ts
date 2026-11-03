import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/sitio";

// Los simuladores independientes quedan afuera: son destino de QR y llevan noindex.
const RUTAS = [
  "",
  "/pedi-tu-prestamo",
  "/inverti-en-lendar",
  "/contacto",
  "/terminos-y-condiciones",
  "/politica-de-privacidad",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return RUTAS.map((ruta) => ({ url: `${SITE_URL}${ruta}` }));
}
