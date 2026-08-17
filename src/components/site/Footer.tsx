import Image from "next/image";
import { FaLinkedinIn, FaInstagram } from "react-icons/fa";

const socialLinks = [
  { icon: FaLinkedinIn, href: "https://www.linkedin.com/company/lendar", label: "LinkedIn" },
  { icon: FaInstagram, href: "https://www.instagram.com/lendarsantafe_arg/", label: "Instagram" },
];

export function Footer() {
  return (
    <footer>
      <div className="bg-surface border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-4 py-12 sm:flex-row">
          <div className="flex flex-col items-start">
            <Image
              src="/brand/isologo-lendar.svg"
              alt="Lendar"
              width={100}
              height={28}
            />

            <p className="mt-4 text-[10px] text-text-muted max-w-xl">Toda la información de esta página —montos, tasas, comisiones, plazos y rangos de costos— es orientativa y no constituye una oferta vinculante, un compromiso contractual ni asesoramiento financiero o legal. Los montos y plazos finales quedan sujetos a evaluación crediticia y se establecen exclusivamente en el contrato firmado con Lendar. Tasas y comisiones pueden modificarse sin previo aviso. La rentabilidad estimada para inversores depende del cumplimiento de pago del solicitante y no está garantizada por Lendar. Las escribanías listadas son estudios profesionales independientes; Lendar no garantiza sus plazos, disponibilidad ni el resultado de su gestión.</p>
          </div>


          <div className="flex flex-col gap-3">
            <span className="text-sm font-medium text-text-secondary">
              Seguinos
            </span>
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="text-text-muted hover:text-teal transition-colors"
                >
                  <link.icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-6 text-center text-xs text-text-muted">
          <p>Copyright 2026 Lendar ® - Mejores Préstamos Juntos | Diseñado y mantenido por{" "}
            <a
              href="https://www.perroagency.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[#885de3] hover:text-teal transition-colors hover:cursor-pointer underline"
            >
              PERRO Agency
            </a></p>

        </div>
      </div>
    </footer>
  );
}
