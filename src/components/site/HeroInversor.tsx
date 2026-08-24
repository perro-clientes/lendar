const ctaBase =
  "inline-flex h-12 items-center justify-center rounded-full px-8 text-sm font-semibold transition-colors";

const ctaPrimary = `${ctaBase} bg-surface text-inversor-dark hover:bg-inversor-light`;
const ctaSecondary = `${ctaBase} border-2 border-white text-white hover:bg-white hover:text-inversor-dark`;

export function HeroInversor() {
  return (
    <section
      className="relative bg-auto bg-center bg-inversor-dark text-white"
      style={{ backgroundImage: "url('/miscelaneous/bg-shape-v29.png')" }}
    >
      <div aria-hidden className="absolute inset-0 bg-inversor-dark/80" />
      <div className="relative mx-auto flex max-w-7xl flex-col items-start gap-8 px-4 py-24 md:py-36">
        <h1 className="max-w-3xl font-serif text-4xl font-semibold tracking-wide md:text-6xl">
          Invertí en dólares financiando hipotecas reales
        </h1>

        <p className="max-w-2xl text-lg leading-relaxed text-white/90 md:text-xl">
          Con Lendar, tu capital financia créditos hipotecarios de clientes de la red RE/MAX
          Argentina. Cobrás una renta mensual fija en dólares, con garantía hipotecaria de primer
          grado sobre la propiedad.
        </p>

        <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
          <a href="#simulador" className={ctaPrimary}>
            Simulá tu inversión
          </a>
          <a href="#marco-legal" className={ctaSecondary}>
            Conocé el marco legal
          </a>
        </div>
      </div>
    </section>
  );
}
