import Image from "next/image";
import Link from "next/link";
import { CTAButton } from "./CTAButton";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-foto-fondo min-[1180px]:flex min-[1180px]:h-[560px] min-[1180px]:items-center">
      {/* La foto trae un degradé hacia foto-fondo en su lado derecho: se ancla siempre a la izquierda. */}
      <Image
        src="/miscelaneous/home-2020-c.jpg"
        alt="Pareja mirando una computadora en el living de su casa"
        width={1920}
        height={500}
        sizes="(min-width: 1180px) 1920px, 1100px"
        preload
        className="aspect-4/3 w-full object-cover object-left min-[1180px]:absolute min-[1180px]:top-0 min-[1180px]:left-0 min-[1180px]:aspect-auto min-[1180px]:h-full min-[1180px]:w-auto min-[1180px]:max-w-none"
      />
      <div className="relative flex flex-col items-start gap-6 px-4 pt-10 pb-14 min-[1180px]:ml-[max(740px,50%)] min-[1180px]:max-w-150 min-[1180px]:p-0 min-[1180px]:pr-12">
        <h1 className="font-serif text-4xl leading-tight font-medium tracking-tight text-text md:text-5xl xl:text-6xl">
          Préstamos hipotecarios <em className="font-normal">entre personas</em>
        </h1>
        <p className="text-lg leading-relaxed text-text-secondary">
          Lendar conecta a personas que necesitan fondos para comprar o refaccionar su casa con
          personas que tienen fondos disponibles para invertir.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/pedi-tu-prestamo">
            <CTAButton>Quiero un préstamo</CTAButton>
          </Link>
          <Link href="/inverti-en-lendar">
            <CTAButton variant="solid-inversor-dark">Quiero invertir</CTAButton>
          </Link>
        </div>
      </div>
    </section>
  );
}
