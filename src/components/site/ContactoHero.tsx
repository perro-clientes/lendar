import {
  EMAIL_SANTA_FE,
  INSTAGRAM_URL,
  INSTAGRAM_USUARIO,
  WHATSAPP_NUMERO,
  WHATSAPP_URL,
} from "@/lib/contacto";

const CANALES = [
  {
    titulo: "WhatsApp",
    bajada: "La forma más rápida de consultarnos.",
    valor: WHATSAPP_NUMERO,
    href: WHATSAPP_URL,
  },
  {
    titulo: "Mail",
    bajada: "Para enviarnos documentación o consultas más largas.",
    valor: EMAIL_SANTA_FE,
    href: `mailto:${EMAIL_SANTA_FE}`,
  },
  {
    titulo: "Redes",
    bajada: "Novedades de Lendar en la región.",
    valor: INSTAGRAM_USUARIO,
    href: INSTAGRAM_URL,
  },
];

export function ContactoHero() {
  return (
    <div
      className="relative text-white p-8 md:p-12 flex flex-col items-start gap-8">

      <div className="relative z-10 flex flex-col items-start gap-8">
        <h1 className="text-5xl md:text-7xl font-serif font-semibold tracking-wide">
          Contactate
        </h1>

        <div className="flex flex-col gap-6">
          {CANALES.map(({ titulo, bajada, valor, href }) => (
            <div key={titulo} className="flex flex-col gap-1">
              <h2 className="text-lg font-bold">{titulo}</h2>
              <p className="text-white/80">{bajada}</p>
              <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="font-medium underline transition-colors hover:text-teal-light"
              >
                {valor}
              </a>
            </div>
          ))}
        </div>

        <a
          href="#lugares-de-firma"
          className="text-md font-medium underline hover:text-teal-dark transition-colors"
        >
          Ver lugares de firma Litoral
        </a>
      </div>
    </div>
  );
}
