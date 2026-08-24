import Link from "next/link";

const ctaContacto =
  "inline-flex h-12 items-center justify-center rounded-full bg-surface px-8 text-sm font-semibold text-inversor-dark transition-colors hover:bg-inversor-light";

export function BannerInversor() {
  return (
    <section className="flex w-full justify-center pb-16 md:pb-24">
      <div
        className="flex w-[90%] max-w-[1440px] flex-col items-start gap-6 rounded-xl bg-violet bg-auto bg-center p-8 text-white md:p-16"
        style={{ backgroundImage: "url('/miscelaneous/bg-shape-v29.png')" }}
      >
        <h2 className="font-serif text-3xl font-semibold tracking-wide md:text-5xl">
          ¿Listo para empezar a invertir?
        </h2>
        <p className="max-w-xl leading-relaxed text-white/90">
          Tomá el primer paso y ponete en contacto con uno de nuestros asesores.
        </p>
        <Link href="/contacto" className={ctaContacto}>
          Contactanos
        </Link>
      </div>
    </section>
  );
}
