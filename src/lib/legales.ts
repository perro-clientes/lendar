import type { BloqueLegal, FragmentoLegal } from "@/types/legales";

export const URL_TERMINOS = "https://www.lendar.com.ar/terminos-y-condiciones-generales/";
export const URL_PRIVACIDAD = "https://www.lendar.com.ar/politica-privacidad/";

const REVALIDAR_SEGUNDOS = 60 * 60 * 24;
const MINIMO_BLOQUES = 10;

const ENTIDADES: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };

function decodificarEntidades(texto: string): string {
  return texto.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (original, codigo: string) => {
    if (codigo.startsWith("#")) {
      const esHexa = codigo[1].toLowerCase() === "x";
      return String.fromCodePoint(parseInt(codigo.slice(esHexa ? 2 : 1), esHexa ? 16 : 10));
    }
    return ENTIDADES[codigo.toLowerCase()] ?? original;
  });
}

// Se generan datos, no HTML: solo pasan negrita y enlaces http(s), nunca markup de la página de origen.
function parsearFragmentos(html: string): FragmentoLegal[] {
  const fragmentos: FragmentoLegal[] = [];
  let negrita = false;
  let href: string | undefined;

  for (const parte of html.split(/(<[^>]+>)/)) {
    if (parte.startsWith("<")) {
      const etiqueta = parte.toLowerCase();
      if (/^<(strong|b)[\s>]/.test(etiqueta)) negrita = true;
      else if (/^<\/(strong|b)>/.test(etiqueta)) negrita = false;
      else if (/^<a[\s>]/.test(etiqueta)) {
        const destino = decodificarEntidades(/href="([^"]*)"/i.exec(parte)?.[1] ?? "");
        href = /^https?:\/\//i.test(destino) ? destino : undefined;
      } else if (etiqueta === "</a>") href = undefined;
      else if (/^<br\s*\/?>/.test(etiqueta)) fragmentos.push({ texto: " ", negrita, href });
      continue;
    }
    const texto = decodificarEntidades(parte).replace(/\s+/g, " ");
    if (texto) fragmentos.push({ texto, negrita, href });
  }

  return fragmentos;
}

function textoDe(fragmentos: FragmentoLegal[]): string {
  return fragmentos
    .map((fragmento) => fragmento.texto)
    .join("")
    .replace(/\s+/g, " ")
    .trim();
}

export function parsearDocumentoLegal(html: string): BloqueLegal[] {
  const principal = /<main[^>]*>([\s\S]*?)<\/main>/i.exec(html)?.[1] ?? "";
  const limpio = principal.replace(/<(style|script)[\s\S]*?<\/\1>/gi, "");
  const bloques: BloqueLegal[] = [];

  for (const [, etiqueta, contenido] of limpio.matchAll(/<(p|li)(?:\s[^>]*)?>([\s\S]*?)<\/\1>/gi)) {
    const fragmentos = parsearFragmentos(contenido);
    const texto = textoDe(fragmentos);
    if (!texto) continue;

    if (etiqueta.toLowerCase() === "li") {
      const ultimo = bloques[bloques.length - 1];
      if (ultimo?.tipo === "lista") ultimo.items.push(fragmentos);
      else bloques.push({ tipo: "lista", items: [fragmentos] });
      continue;
    }

    const esTitulo = fragmentos.every((fragmento) => fragmento.negrita || !fragmento.texto.trim());
    if (esTitulo) {
      const nivel = /^\d+\.\d+/.test(texto) ? 3 : 2;
      bloques.push({ tipo: "titulo", nivel, texto, id: `seccion-${bloques.length}` });
    } else {
      bloques.push({ tipo: "parrafo", fragmentos });
    }
  }

  return bloques;
}

// El texto vigente lo publica Lendar: se lee de su sitio para que no haya dos versiones legales.
export async function obtenerDocumentoLegal(url: string): Promise<BloqueLegal[] | null> {
  try {
    const respuesta = await fetch(url, { next: { revalidate: REVALIDAR_SEGUNDOS } });
    if (!respuesta.ok) return null;
    const bloques = parsearDocumentoLegal(await respuesta.text());
    return bloques.length >= MINIMO_BLOQUES ? bloques : null;
  } catch {
    return null;
  }
}
