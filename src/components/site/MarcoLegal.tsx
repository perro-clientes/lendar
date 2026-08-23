import { Check } from "lucide-react";

const items = [
  "Contrato de mutuo firmado ante escribano público",
  "Hipoteca de 1er grado sobre la propiedad del solicitante",
  "Documentación registrada en el Registro de Propiedad Inmueble",
  "Poder legal para ejecutar la garantía si es necesario",
];

export function MarcoLegal() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:py-24">
      <div className="rounded-3xl bg-linear-to-br from-inversor-light to-surface p-8 md:p-14">
        <div className="grid gap-10 lg:grid-cols-5 lg:gap-16">
          <div className="flex flex-col items-start gap-6 lg:col-span-2">
            <span className="rounded-full bg-surface px-4 py-1.5 text-xs font-bold tracking-widest text-inversor-dark shadow-sm">
              MARCO LEGAL
            </span>
            <h2 className="font-serif text-3xl font-semibold tracking-wide md:text-4xl">
              Tu inversión, protegida por ley
            </h2>
            <p className="leading-relaxed text-text-secondary">
              Cuando operás con Lendar, tu dinero y tus derechos se formalizan a través de un
              contrato ante escribano público. La propiedad queda hipotecada en primer grado, lo
              que te da prioridad ante cualquier otro acreedor. Si algo sale mal, el marco legal
              permite ejecutar la garantía y recuperar tu inversión.
            </p>
          </div>

          <ul className="flex flex-col gap-4 lg:col-span-3">
            {items.map((item) => (
              <li
                key={item}
                className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-5 shadow-sm"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-inversor-light">
                  <Check className="h-5 w-5 text-inversor-dark" aria-hidden />
                </span>
                <p className="text-sm md:text-base">{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
