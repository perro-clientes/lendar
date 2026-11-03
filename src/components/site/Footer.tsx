import Image from "next/image";
import Link from "next/link";

const LENDAR_OFICIAL = "https://www.lendar.com.ar";

interface FooterLink {
  label: string;
  href: string;
  externo?: boolean;
}

const COLUMNAS: { titulo: string; links: FooterLink[] }[] = [
  {
    titulo: "Navegá",
    links: [
      { label: "Pedir un préstamo", href: "/pedi-tu-prestamo" },
      { label: "Invertir", href: "/inverti-en-lendar" },
      { label: "Contacto", href: "/contacto" },
      { label: "lendar.com.ar", href: LENDAR_OFICIAL, externo: true },
    ],
  },
  {
    titulo: "Seguinos",
    links: [
      { label: "Instagram", href: "https://www.instagram.com/lendarsantafe_arg/", externo: true },
      { label: "LinkedIn", href: "https://www.linkedin.com/company/lendar", externo: true },
      { label: "WhatsApp", href: "https://api.whatsapp.com/send?phone=5491141666056", externo: true },
    ],
  },
  {
    titulo: "Legal",
    links: [
      { label: "Términos y condiciones", href: "/terminos-y-condiciones" },
      { label: "Política de privacidad", href: "/politica-de-privacidad" },
    ],
  },
];

const LINK_CLASES = "text-surface/80 transition-colors hover:text-teal";

function LinkFooter({ label, href, externo }: FooterLink) {
  if (externo) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={LINK_CLASES}>
        {label}
      </a>
    );
  }
  return (
    <Link href={href} className={LINK_CLASES}>
      {label}
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="bg-footer">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-12 md:py-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:gap-12">
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-[minmax(0,1fr)_auto_auto_auto] lg:gap-12 xl:gap-20">
            <div className="col-span-2 flex max-w-xs flex-col gap-4 sm:col-span-3 lg:col-span-1">
              {/* El isologo es a color: se pasa a blanco con filtro para el fondo oscuro. */}
              <Image
                src="/brand/isologo-lendar.svg"
                alt="Lendar"
                width={134}
                height={80}
                className="brightness-0 invert"
              />
              <p className="leading-relaxed text-surface/70">
                Lendar Santa Fe y Entre Ríos. Mejores préstamos juntos.
              </p>
            </div>

            {COLUMNAS.map(({ titulo, links }) => (
              <nav key={titulo} aria-label={titulo} className="flex flex-col gap-4">
                <h2 className="text-sm font-bold tracking-widest text-teal uppercase">{titulo}</h2>
                <ul className="flex flex-col gap-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      <LinkFooter {...link} />
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          <div className="self-start justify-self-start rounded-xl bg-surface px-3 py-2">
            <Image
              src="/miscelaneous/logo_remax_proveedor_exclusivo.png"
              alt="RE/MAX Proveedor Exclusivo"
              width={134}
              height={80}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-surface/20 pt-8 text-sm leading-relaxed text-surface/60">
          <p>
            Esta página es una adaptación informativa, para Santa Fe y Entre Ríos, de lo publicado en{" "}
            <a
              href={LENDAR_OFICIAL}
              target="_blank"
              rel="noopener noreferrer"
              className="underline transition-colors hover:text-teal"
            >
              lendar.com.ar
            </a>
            . La información original y definitiva es la de lendar.com.ar, y ante cualquier diferencia
            prevalece lo que dice allí. Montos, tasas, plazos y costos son orientativos y no constituyen
            oferta, promesa ni compromiso, ni asesoramiento financiero o legal. Los montos y plazos
            finales quedan sujetos a evaluación crediticia y se establecen exclusivamente en el contrato
            firmado con Lendar. Tasas y comisiones pueden modificarse sin previo aviso.
          </p>
          <p className="text-xs">
            Copyright 2026 Lendar ® | Diseñado y mantenido por{" "}
            <a
              href="https://www.perroagency.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline transition-colors hover:text-teal"
            >
              PERRO Agency
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
