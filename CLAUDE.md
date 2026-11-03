@AGENTS.md

# Lendar

Sitio de préstamos hipotecarios P2P (sin bancos) para clientes de la red RE/MAX Argentina, desarrollado por PERRO Agency. Etapa actual: landings informativas y simuladores de préstamo e inversión, pensados para usar desde el celular en eventos presenciales. El objetivo es generar leads con origen rastreable (`?evento=` y `?vendedor=`).

Audiencias: **solicitante** (teal) e **inversor** (violeta). El vendedor RE/MAX solo comparte links/QR y no accede al sistema.

## Documentación

Leé el documento correspondiente antes de tocar una feature; este archivo no los reemplaza:

- `docs/CONTEXT.md`: estado técnico, design system, detalle de cada componente y registro de decisiones (sección 9). Revisalo antes de proponer algo que parezca una inconsistencia: muchas están confirmadas con el cliente.
- `docs/PRD.md`: alcance, flujos, reglas de negocio y roadmap.
- `docs/PLAN-IMPLEMENTACION-SIMULADOR.md`: registro histórico del diseño original. No lo uses como referencia del estado actual.

Al terminar una feature o tomar una decisión de producto, actualizá `CONTEXT.md` (estado, componentes, decisiones) y `PRD.md` (alcance).

## Comandos

Usar siempre `pnpm`.

```bash
pnpm dev                 # servidor local en http://localhost:3000
pnpm exec tsc --noEmit   # typecheck
pnpm lint                # eslint
pnpm build               # build de producción
```

No hay tests ni test runner. Para verificar un cambio: typecheck, lint y, si afecta la UI, probarlo en el navegador en mobile y desktop.

## Stack

Next.js 16 (App Router), React 19, TypeScript strict, Tailwind CSS v4 (theme vía `@theme` en `src/app/globals.css`), Supabase (solo Postgres, sin Auth), Vercel. Iconos: `lucide-react`.

## Estructura

- `src/app/`: rutas `/`, `/contacto`, `/pedi-tu-prestamo`, `/inverti-en-lendar`, `/simulador-prestamos`, `/simulador-inversion`, `/terminos-y-condiciones`, `/politica-de-privacidad`. `/simulador-inversion` es destino de QR y no se enlaza desde Navbar ni Footer.
- `src/components/site/`: componentes propios del sitio.
- `src/components/simuladores/`: simuladores, tablas de cuotas y formulario post-simulador.
- `src/components/ui/`: primitivos genéricos con tokens neutros.
- `src/lib/calculos.ts`: funciones financieras puras y constantes de negocio.
- `src/lib/supabase.ts`: cliente server con service role.
- `src/lib/legales.ts`: lee los textos legales vigentes de lendar.com.ar; no copiarlos al repo.
- `src/types/simulador.ts`: tipos compartidos.

## Convenciones de código

- Sin `any` ni `@ts-ignore` sin justificación.
- Server Components por defecto; `"use client"` solo cuando sea imprescindible.
- Un componente por archivo, máximo 150 líneas; si supera, dividir.
- Export nombrado en componentes. El default export queda para lo que Next exige en `src/app/` (como `page.tsx` y `layout.tsx`).
- Identificadores y copy en español (`calcularCuotaPrestamo`, `montoSolicitado`); el copy usa voseo rioplatense.
- Errores: capturarlos siempre y nunca mostrar al frontend mensajes técnicos de la base de datos.
- Mobile-first y bundle liviano: en los eventos la señal puede ser mala. Evitá sumar dependencias sin necesidad.

## Design system

- Solo utilidades de Tailwind y tokens de `globals.css`; nunca colores hardcodeados.
- Por audiencia, usá los tokens semánticos: `solicitante`, `inversor` y sus variantes `-light` y `-dark`.
- Títulos de sección: siempre `font-serif`, `text-3xl md:text-5xl`, aunque una referencia puntual pida sans. En el home van con peso medio y una frase en itálica, sin eyebrow; las landings siguen en bold hasta migrarlas.
- Dentro de la landing de préstamos, teal y violeta también se alternan como diferenciación neutra de categorías, sin aludir al inversor. Es un patrón confirmado con el cliente, no un error.
- Secciones compartidas entre audiencias (`MarcoLegal`, `Proceso`, `Banner`): prop `accent` más mapa de copy interno; no duplicar componentes por audiencia.
- Botones de acción: reutilizar `CTAButton` y sus variantes (ver `CONTEXT.md` 7.1).
- Tailwind solo detecta clases escritas completas: no armes nombres de clase por concatenación, como `bg-${accent}`.

## Reglas de negocio

- `src/lib/calculos.ts` es la única fuente de verdad financiera: tasas, comisiones y topes viven ahí, sin números sueltos en la UI.
- **Nunca inventar reglas de negocio.** Lo que no esté confirmado por Lendar va como `TODO` en el código y se le avisa al humano.
- Préstamo e inversión usan amortización francesa, con TNA / 12 como tasa mensual.
- Comisión del solicitante: se informa con IVA incluido (5% × 1,21). Ejemplo verificado con el cliente: USD 127.000 → USD 7.684.
- La tabla de préstamo lleva columna de IVA; la de inversión no, y es a propósito.

### Pendientes de confirmar con Lendar

- Efecto del checkbox "Vivienda única y permanente" (hoy no afecta el cálculo).
- Concepto gravado por el IVA en la tabla de cuotas.
- Máximo de inversión (hoy USD 500.000) y escalón Inversor Gold (más de USD 40.000).
- Copy de las opciones de transferencia en el simulador de inversión.

## Seguridad

- `SUPABASE_SERVICE_ROLE_KEY` es solo server-side: nunca usarla en Client Components ni con prefijo `NEXT_PUBLIC_`.
- `.env.local` no se commitea; las variables nuevas se agregan a `.env.example`.
- Los formularios van a recibir datos personales: en la futura `/api/leads`, validar del lado del servidor.

## Alcance

**Próximo:** tracking por query params, `/api/leads` con su migración SQL y Google Analytics. Hoy los formularios son solo UI; para `CTAContacto`, la conexión se hace dentro de `handleContactoSubmit`.

**Fuera de alcance salvo pedido explícito:** autenticación, flujo real de solicitud de lendar.com.ar, iframe/embed, variantes de landing por evento, panel de leads, emails y pagos.

## Subagentes

`agents/` tiene instrucciones de analista, docwriter, reviewer y security. Son de solo lectura y entregan su resultado para que lo apruebe el humano. Están fuera de `.claude/agents/`, así que Claude Code no los carga solo: hay que indicarle que lea el archivo correspondiente.

## Desfasajes conocidos

Ante una contradicción, el código y `docs/CONTEXT.md` mandan sobre estos archivos:

- `README.md` está desactualizado: menciona Zod (no instalado), `src/lib/env.ts` (no existe) y las rutas `/simular-prestamo` y `/simular-inversion`.
- Los encabezados de `agents/*.md` todavía dicen que el proyecto está reseteado.
- Incumplen las convenciones: `SimuladorInversion.tsx` (185 líneas), `Proceso.tsx` (157 líneas). No los corrijas de paso; proponelo como cambio aparte.
