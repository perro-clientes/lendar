# Plan de implementación — Simulador de préstamo

> **Estado: IMPLEMENTADO (2026-08-21)**
> Este documento se conserva como registro del diseño original. Desvíos de la implementación final:
> - El contacto post-simulador es un formulario Nombre/Email/Teléfono (no el switcher Email/Teléfono de §5.5).
> - El montaje no fue temporal en `page.tsx`: vive en la ruta `/simulador-prestamos` (§5.7).
> - `MedioContacto` se eliminó de `types/simulador.ts` al quedar sin uso.
> Estado consolidado ver `docs/CONTEXT.md` y `docs/PRD.md`.

> **Estado: diseñado, pendiente de ejecución (2026-08-21)**
> Componente aislado, sin páginas nuevas ni backend. Documento operativo: contiene decisiones aprobadas y el código completo listo para aplicar.

## 1. OBJETIVO

Crear `SimuladorPrestamo` como componente reutilizable (futuro hogar: landing `/solicitantes` y ruta dedicada `/simular-prestamo`), con lógica de cálculo separada en funciones puras y CTA post-simulador UI-only. Se prueba montándolo temporalmente en `app/page.tsx`.

## 2. ALCANCE

### Sí incluye

| Archivo | Acción | Rol |
|---|---|---|
| `src/components/ui/Card.tsx` | Editar | Normalizar zinc → tokens neutros |
| `src/components/ui/Field.tsx` | Editar | Normalizar zinc → tokens neutros |
| `src/components/ui/Input.tsx` | Editar | Normalizar zinc → tokens neutros |
| `src/components/ui/Button.tsx` | Editar | Normalizar zinc → tokens neutros |
| `src/components/ui/Slider.tsx` | Editar | Normalizar + props `accent` y `className` |
| `src/types/simulador.ts` | Crear | Tipos compartidos |
| `src/lib/calculos.ts` | Crear | Funciones puras + constantes de negocio |
| `src/components/simuladores/SimuladorPrestamo.tsx` | Crear | UI principal (Client Component) |
| `src/components/simuladores/TablaAmortizacion.tsx` | Crear | Tabla expandible (`<details>`) |
| `src/components/simuladores/ContactoPostSimulador.tsx` | Crear | CTA post-cuota UI-only |
| `src/app/page.tsx` | Editar (temporal) | Montaje de prueba — **revertir antes del commit** |

### No incluye

- Páginas `/solicitantes` ni `/simular-prestamo`
- Supabase ni `/api/leads` (el submit queda aislado en `handleContactoSubmit`)
- Simulador de inversión
- Navbar/Footer u otras páginas existentes
- Regla de negocio del checkbox "vivienda única y permanente"

## 3. DECISIONES APROBADAS

1. **Comisión inicial 5%:** línea informativa en el resultado (`Comisión inicial: USD X (5%)`), no afecta cuota ni desembolso.
2. **Rangos sliders:** propiedad USD 30.000–500.000 step 5.000 (min 30k garantiza 35% ≥ mínimo de préstamo); monto min 10.000, max dinámico = 35% del valor, step 1.000.
3. **División en subcomponentes:** `SimuladorPrestamo` + `TablaAmortizacion` + `ContactoPostSimulador` para respetar máx. 150 líneas.
4. **Primitivos ui/:** se normalizan a tokens neutros ahora y se extiende `Slider` (prop `accent`, default `accent-text`) — evita mezclar zinc con tokens de marca.

No bloqueantes acordados: checkbox UI-only con TODO; `IVA_PCT` constante explícita + TODO; tasas como export `PLAZOS`; regex teléfono laxa; montaje temporal en `page.tsx` revirtiéndolo pre-commit.

## 4. INPUTS DEL SIMULADOR

| Input | Control | Rango | Notas |
|---|---|---|---|
| Valor real de propiedad | Slider USD | 30.000 – 500.000, step 5.000 | Default 100.000 |
| Monto solicitado | Slider USD | 10.000 – 35% dinámico, step 1.000 | Default 35.000. Al bajar la propiedad, el monto se clampea al nuevo máximo |
| Plazo de devolución | 5 botones | 1 año (9,5%) · 2 (10,5%) · 3 (11,5%) · 4 (12,5%) · 5 (13,5%) TNA | Cada botón muestra su TNA. Default 3 años |
| Vivienda única y permanente | Checkbox | — | Sin efecto en cálculo (TODO Lendar) |

## 5. CÓDIGO

### 5.1 Normalización primitivos `ui/`

Cambiar clases zinc por tokens neutros (`border`, `surface`, `text`, `text-muted`, `text-secondary`). Extensión de `Slider`: props opcionales `accent` (default `accent-text`) y `className`.

```tsx
// Card.tsx — línea de clases:
<div className={`flex flex-col gap-3 rounded-2xl border border-border bg-surface p-5 ${className}`}>

// Field.tsx — label:
<span className="text-sm text-text-muted">{label}</span>

// Input.tsx — línea de clases:
className={`h-12 w-full rounded-xl border border-border bg-surface px-4 text-base text-text outline-none transition-colors focus:border-text ${className}`}

// Button.tsx — línea de clases (bg-zinc-900→bg-text, active→bg-text-secondary, text-white→text-surface):
className={`flex h-14 w-full items-center justify-center rounded-full bg-text text-base font-semibold text-surface transition-colors active:bg-text-secondary disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
```

`Slider.tsx` completo:

```tsx
import { useId } from "react";

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (value: number) => void;
  accent?: string;
  className?: string;
}

export function Slider({
  label,
  value,
  min,
  max,
  step,
  display,
  onChange,
  accent = "accent-text",
  className = "",
}: SliderProps) {
  const id = useId();
  return (
    <div className={`flex flex-col gap-2 py-2 ${className}`}>
      <div className="flex items-center justify-between gap-4">
        <label htmlFor={id} className="text-sm text-text-muted">
          {label}
        </label>
        <output htmlFor={id} className="text-lg font-semibold tabular-nums text-text">
          {display}
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={`h-12 w-full cursor-pointer ${accent}`}
      />
    </div>
  );
}
```

### 5.2 `types/simulador.ts`

```ts
export interface Plazo {
  anios: number;
  tna: number;
}

export interface FilaAmortizacion {
  numeroCuota: number;
  amortizacion: number;
  interes: number;
  iva: number;
  cuotaTotal: number;
  saldoDeudor: number;
}

export type MedioContacto = "email" | "telefono";
```

### 5.3 `lib/calculos.ts`

Funciones puras sin dependencias de UI. Constantes exportadas, sin números sueltos.

```ts
import type { FilaAmortizacion, Plazo } from "@/types/simulador";

export const COMISION_INICIAL_PCT = 0.05;
// TODO: confirmar con Lendar si el IVA aplica sobre el interés u otro concepto antes de producción.
export const IVA_PCT = 0.21;
export const MONTO_MINIMO_USD = 10000;
export const PORCENTAJE_MAXIMO_PROPIEDAD = 0.35;

export const PLAZOS: readonly Plazo[] = [
  { anios: 1, tna: 0.095 },
  { anios: 2, tna: 0.105 },
  { anios: 3, tna: 0.115 },
  { anios: 4, tna: 0.125 },
  { anios: 5, tna: 0.135 },
];

const usdFormatter = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function formatUSD(valor: number): string {
  return usdFormatter.format(valor);
}

export function calcularCuotaPrestamo(
  montoSolicitado: number,
  plazoAnios: number,
  tasaTNA: number,
): number {
  const cantidadCuotas = Math.round(plazoAnios * 12);
  if (cantidadCuotas <= 0 || montoSolicitado <= 0) {
    return 0;
  }
  const tasaMensual = tasaTNA / 12;
  if (tasaMensual === 0) {
    return montoSolicitado / cantidadCuotas;
  }
  return (montoSolicitado * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -cantidadCuotas));
}

export function calcularAmortizacionPrestamo(
  montoSolicitado: number,
  plazoAnios: number,
  tasaTNA: number,
): FilaAmortizacion[] {
  const cantidadCuotas = Math.round(plazoAnios * 12);
  const cuotaBase = calcularCuotaPrestamo(montoSolicitado, plazoAnios, tasaTNA);
  const tasaMensual = tasaTNA / 12;
  const filas: FilaAmortizacion[] = [];
  let saldoDeudor = montoSolicitado;

  for (let numeroCuota = 1; numeroCuota <= cantidadCuotas; numeroCuota++) {
    const interes = saldoDeudor * tasaMensual;
    const iva = interes * IVA_PCT;
    const esUltimaCuota = numeroCuota === cantidadCuotas;
    const amortizacion = esUltimaCuota ? saldoDeudor : cuotaBase - interes;
    saldoDeudor -= amortizacion;
    filas.push({
      numeroCuota,
      amortizacion,
      interes,
      iva,
      cuotaTotal: amortizacion + interes + iva,
      saldoDeudor,
    });
  }

  return filas;
}

export function calcularMontoMaximo(valorPropiedad: number): number {
  return Math.max(MONTO_MINIMO_USD, valorPropiedad * PORCENTAJE_MAXIMO_PROPIEDAD);
}

export function calcularComisionInicial(montoSolicitado: number): number {
  return montoSolicitado * COMISION_INICIAL_PCT;
}
```

Notas de diseño:
- Amortización francesa: cuota fija capital+interés; la última fila fuerza `amortizacion = saldo` para cierre exacto (saldo final = 0).
- `saldoDeudor` de cada fila es el saldo **posterior** al pago de esa cuota.
- `cuotaTotal = amortización + interés + IVA` (decrece mes a mes porque decrece el interés).

### 5.4 `components/simuladores/TablaAmortizacion.tsx`

Server-compatible (sin estado). `<details>/<summary>` nativo = cero JS extra.

```tsx
import { formatUSD } from "@/lib/calculos";
import type { FilaAmortizacion } from "@/types/simulador";

interface TablaAmortizacionProps {
  filas: FilaAmortizacion[];
}

export function TablaAmortizacion({ filas }: TablaAmortizacionProps) {
  return (
    <details className="group rounded-2xl border border-border bg-surface">
      <summary className="flex cursor-pointer list-none select-none items-center justify-between px-5 py-4 text-sm font-semibold text-solicitante-dark">
        Ver tabla de cuotas mes a mes
        <span aria-hidden className="transition-transform group-open:rotate-180">
          ▾
        </span>
      </summary>
      <div className="overflow-x-auto px-3 pb-4">
        <table className="w-full min-w-[480px] border-collapse text-sm tabular-nums">
          <thead>
            <tr className="text-xs uppercase tracking-wide text-text-muted">
              <th className="px-3 py-2 text-left font-medium">N°</th>
              <th className="px-3 py-2 text-right font-medium">Amortización</th>
              <th className="px-3 py-2 text-right font-medium">Interés</th>
              <th className="px-3 py-2 text-right font-medium">IVA</th>
              <th className="px-3 py-2 text-right font-medium">Cuota total</th>
              <th className="px-3 py-2 text-right font-medium">Saldo</th>
            </tr>
          </thead>
          <tbody>
            {filas.map((fila) => (
              <tr key={fila.numeroCuota} className="border-t border-border">
                <td className="px-3 py-2 text-left text-text-muted">{fila.numeroCuota}</td>
                <td className="px-3 py-2 text-right">{formatUSD(fila.amortizacion)}</td>
                <td className="px-3 py-2 text-right">{formatUSD(fila.interes)}</td>
                <td className="px-3 py-2 text-right">{formatUSD(fila.iva)}</td>
                <td className="px-3 py-2 text-right font-semibold">{formatUSD(fila.cuotaTotal)}</td>
                <td className="px-3 py-2 text-right">{formatUSD(fila.saldoDeudor)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </details>
  );
}
```

### 5.5 `components/simuladores/ContactoPostSimulador.tsx`

UI-only. Copy y comportamiento tal cual spec: selector Email/Teléfono excluyente, input con validación, submit sin POST, confirmación con el medio elegido. `handleContactoSubmit` aislado: conectar `/api/leads` será un cambio acotado a esa función.

```tsx
"use client";

import { useState, type FormEvent } from "react";
import { CTAButton } from "@/components/site/CTAButton";
import { Input } from "@/components/ui/Input";
import type { MedioContacto } from "@/types/simulador";

interface MedioOpcion {
  valor: MedioContacto;
  label: string;
}

const MEDIOS: readonly MedioOpcion[] = [
  { valor: "email", label: "Email" },
  { valor: "telefono", label: "Teléfono" },
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Laxa a propósito: acepta +54, espacios, guiones y paréntesis.
const TELEFONO_REGEX = /^\+?[0-9\s()-]{7,20}$/;

export function ContactoPostSimulador() {
  const [medio, setMedio] = useState<MedioContacto>("email");
  const [contacto, setContacto] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [enviado, setEnviado] = useState(false);

  function validarContacto(valor: string): boolean {
    const dato = valor.trim();
    if (medio === "email") {
      return EMAIL_REGEX.test(dato);
    }
    return TELEFONO_REGEX.test(dato);
  }

  function handleContactoSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validarContacto(contacto)) {
      setError(medio === "email" ? "Ingresá un email válido." : "Ingresá un teléfono válido.");
      return;
    }
    // Futura etapa: POST /api/leads con contacto, simulación y origen (evento/vendedor).
    setEnviado(true);
  }

  function handleMedioChange(valor: MedioContacto) {
    setMedio(valor);
    setError(null);
  }

  if (enviado) {
    return (
      <section aria-live="polite" className="rounded-2xl bg-solicitante-light p-6 text-center">
        <p className="font-semibold text-solicitante-dark">¡Listo!</p>
        <p className="mt-1 text-sm text-text-secondary">
          Un asesor te va a contactar por {medio === "email" ? "email" : "teléfono"} a la brevedad.
        </p>
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-4 rounded-2xl bg-solicitante-light p-5">
      <p className="text-sm leading-relaxed text-text-secondary">
        ¿Querés que te contactemos para ampliarte la información? Dejanos tus datos y un asesor te va a contactar por
        el medio que elijas.
      </p>
      <div role="group" aria-label="Medio de contacto preferido" className="grid grid-cols-2 gap-2">
        {MEDIOS.map(({ valor, label }) => (
          <button
            key={valor}
            type="button"
            aria-pressed={medio === valor}
            onClick={() => handleMedioChange(valor)}
            className={`h-12 rounded-xl border-2 font-semibold transition-colors ${
              medio === valor
                ? "border-solicitante bg-surface text-solicitante-dark"
                : "border-transparent bg-surface/60 text-text-muted hover:text-text-secondary"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <form onSubmit={handleContactoSubmit} noValidate className="flex flex-col gap-3">
        <Input
          type={medio === "email" ? "email" : "tel"}
          inputMode={medio === "email" ? "email" : "tel"}
          autoComplete={medio === "email" ? "email" : "tel"}
          placeholder={medio === "email" ? "tu@email.com" : "+54 341 555-0000"}
          aria-label={medio === "email" ? "Email" : "Teléfono"}
          value={contacto}
          onChange={(e) => {
            setContacto(e.target.value);
            setError(null);
          }}
          className="focus:border-solicitante-dark"
        />
        {error && (
          <p role="alert" className="text-sm text-red-600">
            {error}
          </p>
        )}
        <CTAButton type="submit" className="w-full">
          Quiero que me contacten
        </CTAButton>
      </form>
    </section>
  );
}
```

### 5.6 `components/simuladores/SimuladorPrestamo.tsx`

~135 líneas. Orden vertical: inputs → resultado destacado → contacto → tabla (el CTA queda visible tras ver la cuota y la tabla no lo tapa).

```tsx
"use client";

import { useMemo, useState } from "react";
import { ContactoPostSimulador } from "@/components/simuladores/ContactoPostSimulador";
import { TablaAmortizacion } from "@/components/simuladores/TablaAmortizacion";
import { Card } from "@/components/ui/Card";
import { Field } from "@/components/ui/Field";
import { Slider } from "@/components/ui/Slider";
import {
  COMISION_INICIAL_PCT,
  MONTO_MINIMO_USD,
  PLAZOS,
  PORCENTAJE_MAXIMO_PROPIEDAD,
  calcularAmortizacionPrestamo,
  calcularComisionInicial,
  calcularCuotaPrestamo,
  calcularMontoMaximo,
  formatUSD,
} from "@/lib/calculos";

const VALOR_PROPIEDAD_MIN = 30000;
const VALOR_PROPIEDAD_MAX = 500000;
const VALOR_PROPIEDAD_STEP = 5000;
const MONTO_STEP = 1000;

export function SimuladorPrestamo() {
  const [valorPropiedad, setValorPropiedad] = useState(100000);
  const [montoSolicitado, setMontoSolicitado] = useState(35000);
  const [plazoAnios, setPlazoAnios] = useState(3);
  // TODO: confirmar con Lendar el impacto de "vivienda única y permanente" en el costo — no inventar una regla de negocio.
  const [viviendaUnica, setViviendaUnica] = useState(false);

  const plazoActual = PLAZOS.find((plazo) => plazo.anios === plazoAnios) ?? PLAZOS[0];
  const montoMaximo = calcularMontoMaximo(valorPropiedad);
  const comisionInicial = calcularComisionInicial(montoSolicitado);

  const cuotaMensual = useMemo(
    () => calcularCuotaPrestamo(montoSolicitado, plazoActual.anios, plazoActual.tna),
    [montoSolicitado, plazoActual],
  );
  const filasAmortizacion = useMemo(
    () => calcularAmortizacionPrestamo(montoSolicitado, plazoActual.anios, plazoActual.tna),
    [montoSolicitado, plazoActual],
  );

  function handleValorPropiedadChange(valor: number) {
    setValorPropiedad(valor);
    setMontoSolicitado((previo) => Math.min(previo, calcularMontoMaximo(valor)));
  }

  return (
    <section aria-label="Simulador de préstamo" className="flex flex-col gap-4">
      <Card className="gap-5 p-6">
        <Slider
          label="Valor real de propiedad a hipotecar"
          value={valorPropiedad}
          min={VALOR_PROPIEDAD_MIN}
          max={VALOR_PROPIEDAD_MAX}
          step={VALOR_PROPIEDAD_STEP}
          display={formatUSD(valorPropiedad)}
          onChange={handleValorPropiedadChange}
          accent="accent-solicitante"
        />
        <div className="flex flex-col gap-1">
          <Slider
            label="Monto solicitado"
            value={montoSolicitado}
            min={MONTO_MINIMO_USD}
            max={montoMaximo}
            step={MONTO_STEP}
            display={formatUSD(montoSolicitado)}
            onChange={setMontoSolicitado}
            accent="accent-solicitante"
          />
          <p className="px-1 text-xs text-text-light">
            Hasta el {PORCENTAJE_MAXIMO_PROPIEDAD * 100}% del valor de la propiedad · mínimo{" "}
            {formatUSD(MONTO_MINIMO_USD)}
          </p>
        </div>
        <Field label="Plazo de devolución">
          <div className="grid grid-cols-5 gap-2">
            {PLAZOS.map((plazo) => {
              const seleccionado = plazo.anios === plazoAnios;
              return (
                <button
                  key={plazo.anios}
                  type="button"
                  aria-pressed={seleccionado}
                  onClick={() => setPlazoAnios(plazo.anios)}
                  className={`flex h-16 flex-col items-center justify-center gap-1 rounded-xl border-2 transition-colors ${
                    seleccionado
                      ? "border-solicitante bg-solicitante-light text-solicitante-dark"
                      : "border-border bg-surface text-text-muted"
                  }`}
                >
                  <span className="text-sm font-bold leading-none">
                    {plazo.anios} año{plazo.anios > 1 ? "s" : ""}
                  </span>
                  <span className="text-xs leading-none">{(plazo.tna * 100).toFixed(1).replace(".", ",")}%</span>
                </button>
              );
            })}
          </div>
        </Field>
        <label className="flex cursor-pointer items-center gap-3 py-1">
          <input
            type="checkbox"
            checked={viviendaUnica}
            onChange={(e) => setViviendaUnica(e.target.checked)}
            className="h-5 w-5 accent-solicitante"
          />
          <span className="text-sm text-text-secondary">Vivienda única y permanente</span>
        </label>
      </Card>

      <div className="rounded-2xl border border-solicitante/40 bg-solicitante-light p-6">
        <p className="text-sm font-medium text-text-secondary">Cuota mensual estimada</p>
        <p className="mt-1 flex flex-wrap items-baseline gap-x-2">
          <span className="text-4xl font-bold tabular-nums text-solicitante-dark sm:text-5xl">
            {formatUSD(cuotaMensual)}
          </span>
          <span className="text-base text-text-muted">USD/mes</span>
        </p>
        <p className="mt-2 text-xs leading-relaxed text-text-muted">
          Capital e interés · Comisión inicial: {formatUSD(comisionInicial)} ({COMISION_INICIAL_PCT * 100}%) · El IVA
          sobre intereses se detalla en la tabla.
        </p>
      </div>

      <ContactoPostSimulador />

      <TablaAmortizacion filas={filasAmortizacion} />
    </section>
  );
}
```

### 5.7 Montaje temporal `app/page.tsx`

```tsx
import { SimuladorPrestamo } from "@/components/simuladores/SimuladorPrestamo";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col px-4 py-10">
      <SimuladorPrestamo />
    </main>
  );
}
```

⚠️ Temporal solo para prueba local. **Revertir antes del commit/PR** (`git checkout src/app/page.tsx`): la landing final es otra etapa.

## 6. PENDIENTES DE CONFIRMACIÓN CON LENDAR

1. **Checkbox "vivienda única y permanente":** efecto en el costo (exención, bonificación). Hoy: UI-only + TODO.
2. **IVA (21%):** confirmar si grava el interés únicamente u otro componente. Constante `IVA_PCT` lista para ajustar.
3. **Comisión inicial (5%):** hoy informativa; confirmar si algún día descuenta del desembolso o se financia.

## 7. VERIFICACIÓN

```bash
pnpm exec tsc --noEmit   # typecheck strict
pnpm lint                # eslint
pnpm build               # build Next.js
pnpm dev                 # prueba manual en http://localhost:3000
```

Sanity numérico esperado (USD 100.000, 3 años, TNA 11,5%):
- Cuota fija ≈ US$ 3.305/mes (capital + interés)
- Suma de amortización = monto solicitado; saldo de última fila = 0
- Máximo dinámico: propiedad 30.000 → monto máx 10.500; propiedad 20.000 → clampa a 10.000 (no ocurre con rango actual)

Casos manuales: mover propiedad hacia abajo clampea el monto · cambiar plazo recalcula todo · acordeón abre/cierra · email inválido muestra error · teléfono con +54 pasa · confirmación nombra el medio elegido.

## 8. POST-IMPLEMENTACIÓN

- Actualizar checklist "Simuladores" en `docs/CONTEXT.md` y sección 3.2 de `docs/PRD.md`.
- Etapa siguiente: landings `/solicitantes` e inversión; luego tracking `?evento=&vendedor=` y `/api/leads` (conectar dentro de `handleContactoSubmit`).
