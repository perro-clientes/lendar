import type { Metadata } from "next";
import Link from "next/link";
import { CTAButton } from "@/components/site/CTAButton";

export const metadata: Metadata = {
  title: "Página no encontrada",
};

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-4 py-24 md:py-36">
      <h1 className="font-serif text-4xl leading-tight font-medium tracking-tight text-text md:text-5xl">
        Página no <em className="font-normal">encontrada</em>
      </h1>
      <p className="text-lg leading-relaxed text-text-secondary">
        La página que buscás no existe o cambió de dirección.
      </p>
      <Link href="/">
        <CTAButton>Volver al inicio</CTAButton>
      </Link>
    </section>
  );
}
