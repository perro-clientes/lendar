import { PORCENTAJE_MAXIMO_PROPIEDAD } from "@/lib/calculos";

const PORCENTAJE_PRESTAMO = Math.round(PORCENTAJE_MAXIMO_PROPIEDAD * 100);
const PORCENTAJE_COBERTURA = 100 - PORCENTAJE_PRESTAMO;

export function RespaldoInversion() {
  return (
    <section id="respaldo" className="scroll-mt-[77px] bg-inversor-light py-16 md:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 lg:grid-cols-2 lg:gap-20">
        <div className="flex flex-col gap-4">
          <h2 className="font-serif text-3xl leading-tight font-medium tracking-tight text-text md:text-5xl">
            Respaldo de <em className="font-normal">tu inversión</em>
          </h2>
          <p className="text-lg leading-relaxed text-text-secondary">
            Con Lendar se autorizan préstamos por hasta el {PORCENTAJE_PRESTAMO}% del valor real de la
            propiedad. Esto significa que tu inversión está aforada casi 3 veces.
          </p>
        </div>

        <div className="flex flex-col gap-4 rounded-2xl bg-surface p-6 md:p-8">
          <p className="font-semibold text-text">Lo que se presta frente a lo que vale la propiedad</p>
          <div className="flex h-12 overflow-hidden rounded-xl" aria-hidden>
            <div className="bg-inversor-dark" style={{ width: `${PORCENTAJE_PRESTAMO}%` }} />
            <div className="flex-1 bg-violet-lighter" />
          </div>
          <dl className="flex justify-between gap-6">
            <div>
              <dd className="font-serif text-3xl font-medium text-text">{PORCENTAJE_PRESTAMO}%</dd>
              <dt className="text-sm text-text-muted">El préstamo</dt>
            </div>
            <div className="text-right">
              <dd className="font-serif text-3xl font-medium text-text">{PORCENTAJE_COBERTURA}%</dd>
              <dt className="text-sm text-text-muted">Margen de cobertura</dt>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
