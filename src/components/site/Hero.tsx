import Link from "next/link";
import { CTAButton } from "./CTAButton";

export function Hero() {
  return (
    <section className="bg-[linear-gradient(135deg,var(--color-teal)_0%,var(--color-violet)_100%)] px-4 py-24 md:py-36">
      <div className="mx-auto flex max-w-3xl flex-col md:items-center gap-6 md:text-center">
        <h1 className="font-serif text-4xl font-semibold text-surface md:text-7xl">
          Mejores préstamos, juntos
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-surface/90 md:text-lg">
          Conectamos a quienes necesitan un préstamo hipotecario con inversores privados. Lendar
          coordina toda la gestión legal, administrativa y escritural.
        </p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <Link href="/pedi-tu-prestamo">
            <CTAButton variant="solid-white" accent="solicitante">Quiero pedir un préstamo</CTAButton>
          </Link>
          <Link href="/inverti-en-lendar">
            <CTAButton variant="outline-white" accent="inversor">Quiero invertir en Lendar</CTAButton>
          </Link>
        </div>
      </div>
    </section>
  );
}
